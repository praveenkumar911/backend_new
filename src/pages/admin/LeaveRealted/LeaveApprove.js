import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  IconButton,
} from '@mui/material';
import { DataGrid , GridToolbar, GridToolbarExport, GridToolbarContainer} from '@mui/x-data-grid';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const headingStyle = {
  textAlign: 'center',
  margin: '20px',
};

function CoordinatorLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { currentUser, response, error } = useSelector((state) => state.user);
  const [studentsData, setStudentsData] = useState({});
  const [thumbsUpClicked, setThumbsUpClicked] = useState({});

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://10.10.10.2:5000/LeaveRequests');
      setLeaveRequests(response.data);
      const coderIds = response.data.map((request) => request.CoderID);
      fetchStudentsData(coderIds);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const fetchStudentsData = async (coderIds) => {
    try {
      const promises = coderIds.map((coderId) =>
        axios.get(`http://10.10.10.2:5000/Student/${coderId}`)
      );

      const responses = await Promise.all(promises);
      const studentsData = {};

      responses.forEach((response) => {
        const student = response.data;
        studentsData[student._id] = {
          name: student.name,
          rollNum: student.rollNum,
          sclassName: student.sclassName?.sclassName,
          schoolName: student.school?.schoolName,
        };
      });

      setStudentsData(studentsData);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      const response = await axios.put(
        `http://10.10.10.2:5000/UpdateCoordinatorApproval/${requestId}`,
        {
          approval: 'Approved',
          name: currentUser.name,
        }
      );

      console.log('Leave request approved:', response.data);
      fetchLeaveRequests();
      setThumbsUpClicked((prevState) => ({ ...prevState, [requestId]: true }));
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await axios.put(
        `http://10.10.10.2:5000/UpdateCoordinatorApproval/${requestId}`,
        {
          approval: 'Not Approved',
          name: currentUser.name,
        }
      );

      console.log('Leave request rejected:', response.data);
      fetchLeaveRequests();
      setThumbsUpClicked((prevState) => ({ ...prevState, [requestId]: false }));
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };

  const columns = [
    { field: 'Subject', headerName: 'Subject', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'date', headerName: 'Date', width: 150 },
    {
      field: 'approval',
      headerName: 'Coordinator-Approval',
      width: 200,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex' }}>
            <div>
              {params.row.approval === 'Approved' ? (
                <IconButton style={{ color: 'green' }}>
                  <ThumbUp />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => handleApprove(params.row.id)}
                  disabled={thumbsUpClicked[params.row.id]}
                  style={
                    params.row.Coordinator?.Approval === 'Approved'
                      ? { color: 'green' }
                      : null
                  }
                >
                  <ThumbUp />
                </IconButton>
              )}
            </div>
            <div>
              {params.row.approval === 'Not Approved' ? (
                <IconButton style={{ color: 'red' }}>
                  <ThumbDown />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => handleReject(params.row.id)}
                  disabled={thumbsUpClicked[params.row.id]}
                  style={
                    params.row.Coordinator?.Approval === 'Not Approved'
                      ? { color: 'red' }
                      : null
                  }
                >
                  <ThumbDown />
                </IconButton>
              )}
            </div>
          </div>
        );
      },
    },
    {
      field: 'FinalStatus',
      headerName: 'Final Status',
      width: 150,
      renderCell: (params) => {
        const coordinatorApproval = params.row.Coordinator?.Approval || 'Not Approved';
        const facultyApproval = params.row.Faculty?.Approval || 'Not Approved';
  
        if (coordinatorApproval === 'Approved' && facultyApproval === 'Approved') {
          return <span style={{ color: 'green' }}>Approved</span>;
        } else {
          return <span style={{ color: 'orange' }}>Pending</span>;
        }
      },
    },
    {
      field: 'studentDetails',
      headerName: 'Student Details',
      width: 300,
      renderCell: (params) => (
        <div>
          {studentsData[params.row.CoderID] ? (
            <div>
              <p>
                <strong>Name:</strong> {studentsData[params.row.CoderID].name}
              </p>
              <p>
                <strong>Roll Number:</strong> {studentsData[params.row.CoderID].rollNum}
              </p>
              <p>
                <strong>Class:</strong> {studentsData[params.row.CoderID].sclassName}
              </p>
              <p>
                <strong>School:</strong> {studentsData[params.row.CoderID].schoolName}
              </p>
            </div>
          ) : (
            <p>No student data found</p>
          )}
        </div>
      ),
    },
  ];

  const rows = leaveRequests.map((request, index) => ({
    id: request._id,
    ...request,
  }));

  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={headingStyle} gutterBottom>
        Approve Leaves
      </Typography>

      <div style={{ height: 400, width: '150%', marginLeft:'-30%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick
          disableColumnMenu
          getRowHeight={() => 'auto'}
          components={{
            Toolbar: GridToolbar,
            export: GridToolbarExport,
            container: GridToolbarContainer,
          }}/>
      </div>
    </Container>
  );
}

export default CoordinatorLeaveRequests;

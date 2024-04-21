import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Paper } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const ShowAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [classData, setClassData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assessment data from the API
    axios
      .get("http://10.10.10.2:5000/assessments")
      .then((response) => {
        setAssessments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assessments: ', error);
      });

    // Fetch class data from the API
    axios
      .get("http://10.10.10.2:5000/sclassLists")
      .then((response) => {
        setClassData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching class data: ', error);
      });
  }, []);

  const deleteAssessment = (id) => {
    axios
      .delete(`http://10.10.10.2:5000/Assessment/${id}`)
      .then(() => {
        // Refresh the page or update the data in another way
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting assessment: ', error);
      });
  };

  // Map class data to a dictionary for easy lookup
  const classDataMap = classData.reduce((acc, classItem) => {
    acc[classItem._id] = classItem.sclassName;
    return acc;
  }, {});

  const assessmentColumns = [
    { field: 'Name', headerName: 'Name', flex: 1 },
    { field: 'Description', headerName: 'Description', flex: 2 },
    { field: 'created_at', headerName: 'Created At', flex: 1 },
    { field: 'deadline', headerName: 'Deadline', flex: 1 },
    {
      field: 'class',
      headerName: 'Batch',
      flex: 1,
      valueGetter: (params) => classDataMap[params.row.class] || 'N/A',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const deleteRow = () => {
          deleteAssessment(params.row.id);
        };
        return (
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={deleteRow}
          >
          </Button>
        );
      },
    },
  ];

  const assessmentRows = assessments.map((assessment) => ({
    id: assessment._id,
    Name: assessment.Name,
    Description: assessment.Description,
    created_at: new Date(assessment.created_at).toLocaleString(),
    deadline: new Date(assessment.deadline).toLocaleString(),
    class: assessment.class,
  }));

  return (
    <div style={{ height: 400, width: '80%', marginTop: "19vh", marginLeft: '5vw' }}>
      <Button
        startIcon={<NoteAddIcon />}
        variant="contained"
        color="primary"
        onClick={() => navigate('/Admin/addassessment')}
      >
        Add Assessment
      </Button>
      <Button
        startIcon={<NoteAddIcon />}
        variant="contained"
        color="primary"
        onClick={() => navigate('/Admin/submissions')}
        style={{marginLeft:"10px"}}
      >
        Show Submissions
      </Button>
      <div style={{ marginTop: '16px' }}>
        <DataGrid
          rows={assessmentRows}
          columns={assessmentColumns}
          pageSize={10} 
          rowsPerPageOptions={[5, 10, 25]}
          disableSelectionOnClick
          disableColumnMenu
          getRowHeight={() => 'auto'}
          components={{
            Toolbar: GridToolbar,
            export: GridToolbarExport,
            container: GridToolbarContainer,
          }}
          onSelectionModelChange={(selection) => {
            setSelectedRow(selection);
          }}
          selectionModel={selectedRow}
        />
      </div>
    </div>
  );
};

export default ShowAssessments;

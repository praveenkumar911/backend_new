import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';

const FacultyAnalsys = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    // Fetch the list of students from your API endpoint (update the URL)
    fetch('http://10.10.10.2:5000/Students') // Update the URL as needed
      .then((response) => response.json())
      .then((data) => {
        // Add a unique ID to each student and calculate attendance
        const studentsWithIds = data.map((student, index) => ({
          id: index + 1,
          name: student.name,
          rollNum: student.rollNum,
          BranchName: student.BranchName,
          attendanceCount: student.attendance.filter((a) => a.status === 'Present').length,
          totalDays: student.attendance.length,
        }));
        setStudents(studentsWithIds);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const assessmentColumns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'rollNum', headerName: 'Roll Number', width: 200 },
    { field: 'BranchName', headerName: 'BranchName', width: 200 },
    {
      field: 'attendanceCount',
      headerName: 'Present',
      width: 150,
    },
    {
      field: 'totalDays',
      headerName: 'Total Days',
      width: 150,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Student List</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={students}
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
      )}
    </div>
  );
};

export default FacultyAnalsys;

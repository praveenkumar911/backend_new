import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
const AssessmentSubmissionsTable = () => {
    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
   // console.log(currentUser.name)
  const [assessmentSubmissions, setAssessmentSubmissions] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [students, setStudents] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [scoreToSubmit, setScoreToSubmit] = useState('');
  const [scoreRowId, setScoreRowId] = useState('');

  useEffect(() => {
    // Fetch assessment submissions data from the API
    axios
      .get("http://10.10.10.2:5000/AssessmentSubmission/getallass")
      .then((response) => {
        setAssessmentSubmissions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assessment submissions: ', error);
      });

    // Fetch students data from the API
    axios
      .get("http://10.10.10.2:5000/Students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students data: ', error);
      });

    // Fetch assessments data from the API
    axios
      .get("http://10.10.10.2:5000/assessments")
      .then((response) => {
        setAssessments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assessments data: ', error);
      });
  }, []);

  const assessmentColumns = [
    {
      field: 'Assessment',
      headerName: 'Assessment',
      flex: 1,
      valueGetter: (params) => {
        const assessment = assessments.find((a) => a._id === params.value);
        return assessment ? assessment.Name : '';
      },
    },
    { field: 'githubURL', headerName: 'GitHub URL', flex: 2 },
    {
      field: 'student',
      headerName: 'Student',
      flex: 1,
      valueGetter: (params) => {
        const student = students.find((s) => s._id === params.value);
        return student ? student.name : '';
      },
    },
    {
      field: 'score',
      headerName: 'Score',
      flex: 1,
      renderCell: (params) => {
        const isScoreGiven = typeof params.row.score === 'number';
        return isScoreGiven ? params.row.score : (
          <input
            type="number"
            value={params.row.id === scoreRowId ? scoreToSubmit : params.row.score || ''}
            onChange={(e) => handleScoreChange(params.id, e.target.value)}
          />
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const isScoreGiven = typeof params.row.score === 'number';
        return isScoreGiven ? 'Score Given' : (
          <button onClick={() => handleSubmissionUpdate(params.row.id)}>Submit</button>
        );
      },
    },
    { field: 'submittedAt', headerName: 'Submitted At', flex: 1 },
  ];

  const assessmentRows = assessmentSubmissions.map((submission) => ({
    id: submission._id,
    Assessment: submission.Assessment,
    githubURL: submission.githubURL,
    student: submission.student,
    score: submission.score,
    submittedAt: new Date(submission.submittedAt).toLocaleString(),
  }));

  const handleScoreChange = (id, score) => {
    setScoreToSubmit(score);
    setScoreRowId(id);
  };

  const handleSubmissionUpdate = (submissionId) => {
    const data = {
      score: scoreToSubmit,
      evaluatedBy:currentUser.name
    };

    axios
      .put(`http://10.10.10.2:5000/AssessmentSubmission/update/${submissionId}`, data)
      .then((response) => {
        console.log('Submission updated successfully');
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error updating submission: ', error);
      });

    setScoreToSubmit('');
    setScoreRowId('');
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
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
  );
};

export default AssessmentSubmissionsTable

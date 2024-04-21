/* import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Paper } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const ShowCoderAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [classData, setClassData] = useState([]);
  const navigate = useNavigate();
  const { currentUser, response, error } = useSelector((state) => state.user);
  console.log(currentUser.sclassName);

  useEffect(() => {
    // Fetch assessment data from the API
    axios
      .get("http://10.10.10.2:5000/assessments")
      .then((response) => {
        // Filter assessments based on the user's teachSclass sclassName
        const filteredAssessments = response.data.filter((assessment) => {
          return assessment.class === currentUser.sclassName._id; // Compare by class name
        });
        setAssessments(filteredAssessments);
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
  }, [currentUser.sclassName]);

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
    }
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
      <div style={{ marginTop: '16px' }}>
        <DataGrid
          rows={assessmentRows}
          columns={assessmentColumns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 25]}
          disableSelectionOnClick 
          disableColumnMenu
          getRowHeight={() => 'auto'}
          onSelectionModelChange={(selection) => {
            setSelectedRow(selection);
          }}
          selectionModel={selectedRow}
        />
      </div>
    </div>
  );
};

export default ShowCoderAssessments;
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const ShowCoderAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [classData, setClassData] = useState([]);
  const [githubUrl, setGithubUrl] = useState('');
  const [assessmentSubmissions, setAssessmentSubmissions] = useState([]);
  const { currentUser, response, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assessment data from the API
    axios
      .get("http://10.10.10.2:5000/assessments")
      .then((response) => {
        const filteredAssessments = response.data.filter((assessment) => {
          return assessment.class === currentUser.sclassName._id;
        });
        setAssessments(filteredAssessments);
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

    // Fetch assessment submissions by student
    axios
      .get("http://10.10.10.2:5000/AssessmentSubmission/getallass")
      .then((response) => {
        setAssessmentSubmissions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assessment submissions: ', error);
      });
  }, [currentUser.sclassName]);

  const deleteAssessment = (id) => {
    axios
      .delete(`http://10.10.10.2:5000/Assessment/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting assessment: ', error);
      });
  };

  const isAssessmentSubmitted = (assessmentId) => {
    return assessmentSubmissions.some(submission => submission.Assessment === assessmentId);
  };

  const getSubmissionScore = (assessmentId) => {
    const submission = assessmentSubmissions.find(sub => sub.Assessment === assessmentId);
    return submission ? submission.score : "Score Pending";
  };

  const getEvaluator = (assessmentId) => {
    const submission = assessmentSubmissions.find(sub => sub.Assessment === assessmentId);
    return submission && submission.evaluatedBy ? `Evaluated by: ${submission.evaluatedBy}` : "Evaluation Pending";
  };

  const classDataMap = classData.reduce((acc, classItem) => {
    acc[classItem._id] = classItem.sclassName;
    return acc;
  }, {});

  const submitAssessment = (id) => {
    axios
      .post(`http://10.10.10.2:5000/AssessmentSubmission`, { Assessment: id, githubURL: githubUrl, student: currentUser._id })
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error submitting assessment: ', error);
      });
  };

  return (
    <div style={{ width: '80%', marginTop: "19vh", marginLeft: '5vw' }}>
      <h1>Assessments and submissions</h1>
      <div style={{ marginTop: '16px' }}>
        {assessments.map((assessment) => (
          <Accordion key={assessment._id}>
            <AccordionSummary>
              <Typography variant="h6">{assessment.Name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Description:</strong> {assessment.Description}
              </Typography>
              <br />
              <Typography>
                <strong>Created At:</strong> {new Date(assessment.created_at).toLocaleString()}
              </Typography>
              <br />
              <Typography>
                <strong>Deadline:</strong> {new Date(assessment.deadline).toLocaleString()}
              </Typography>
              <br />
              <Typography>
                <strong>Batch:</strong> {classDataMap[assessment.class] || 'N/A'}
              </Typography>
              <br />
              <Typography>
                <strong>Score:</strong> {getSubmissionScore(assessment._id)}
              </Typography>
              <Typography>
                {getEvaluator(assessment._id)}
              </Typography>
              <br />
              {!isAssessmentSubmitted(assessment._id) && (
                <div>
                  <TextField
                    label="GitHub URL"
                    variant="outlined"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => submitAssessment(assessment._id)}
                    style={{marginLeft:"1vw",marginTop:"1vh"}}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default ShowCoderAssessments;

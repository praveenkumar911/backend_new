import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useSelector } from 'react-redux';

const cardStyle = {
  marginBottom: '20px',
};

const headingStyle = {
  textAlign: 'center',
  margin: '20px',
};

const paperStyle = {
  padding: '20px',
  marginBottom: '20px',
};

function CoderLeaveApply() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { currentUser, response, error } = useSelector((state) => state.user);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://10.10.10.2:5000/CreateLeaveRequest', {
        Subject: subject,
        description,
        date: selectedDate,
        CoderID: currentUser._id,
        BranchName:currentUser.BranchName
      });

      console.log('Leave request submitted:', response.data);
      window.location.reload()
    } catch (error) {
      console.error('Error submitting leave request:', error);
    }
  };

  useEffect(() => {
    async function fetchLeaveRequests() {
      try {
        const response = await axios.get('http://10.10.10.2:5000/LeaveRequests');
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    }

    fetchLeaveRequests();
  }, []);

  const currentUserLeaveRequests = leaveRequests.filter(
    (request) => request.CoderID === currentUser._id
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={headingStyle} gutterBottom>
        Student Leave Request
      </Typography>

      <Paper style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{marginTop:"2vh"}}>
            Submit Leave Request
          </Button>
        </form>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Your Leave Requests
      </Typography>
      {currentUserLeaveRequests.length > 0 ? (
        currentUserLeaveRequests.map((request) => (
          <Card key={request._id} style={cardStyle}>
            <CardContent>
              <Typography variant="h6">
                Subject: {request.Subject}
              </Typography>
              <Typography variant="body1">
                Reason: {request.description}
              </Typography>
              <Typography variant="body1">
                Date: {new Date(request.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                Status: {request.FinalStatus}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">
          No leave requests found.
        </Typography>
      )}
    </Container>
  );
}

export default CoderLeaveApply;

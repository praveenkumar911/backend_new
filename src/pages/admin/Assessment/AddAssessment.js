import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const AddAssessment = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [classId, setClassId] = useState('');
  const [deadline, setDeadline] = useState(''); // New field: deadline
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to create a new assessment
    axios.post("http://10.10.10.2:5000/Assessment", {
  Name: name,
  Description: description,
  classID: classId,
  Deadline: deadline, // Include the deadline field
})
.then(() => {
  // Handle success and navigate to the assessments page or any other route.
  navigate('Admin/assessment');
})
.catch((error) => {
  console.error('Error creating assessment: ', error);
});

  };

  useEffect(() => {
    // Fetch the class list from the API
    axios.get('http://10.10.10.2:5000/SclassLists')
      .then((response) => {
        setClassList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching class list: ', error);
      });
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <h2>ADD Assessment</h2>
        <Box p={3} component={Paper} elevation={3}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  minRows={4}
                  fullWidth
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Deadline"
                  type="date" // Date input type
                  variant="outlined"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Batch ID</InputLabel>
                  <Select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>Select a Batch</em>
                    </MenuItem>
                    {classList.map((cls) => (
                      <MenuItem key={cls._id} value={cls._id}>
                        {cls.sclassName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddAssessment;

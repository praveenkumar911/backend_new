import axios from 'axios';

const REACT_APP_BASE_URL = "http://10.10.10.2:5000";

// Function to register a faculty member
export const facultyRegister = async (facultyData) => {
  try {
    const response = await axios.post(`${REACT_APP_BASE_URL}/FacultyReg`, facultyData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to log in a faculty member
export const facultyLogIn = async (facultyCredentials) => {
  try {
    const response = await axios.post(`${REACT_APP_BASE_URL}/FacultyLogin`, facultyCredentials);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to get faculty details by ID
export const getFacultyDetail = async (facultyId) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}/Faculty/${facultyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to get faculty details by ID
export const getFacultyById = async (facultyId) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}/FacultyById/${facultyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to get faculty details by branch name
export const getFacultyByBranch = async (branchName) => {
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}/FacultyByBranch/${branchName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

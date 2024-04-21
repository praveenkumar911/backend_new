import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    facultyList: [],
    facultyDetails: [],
    loading: false,
    error: null,
    response: null,
};

const facultySlice = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        getFacultyRequest: (state) => {
            state.loading = true;
        },
        getFacultySuccess: (state, action) => {
            state.facultyList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFacultyFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getFacultyError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getFacultyDetailsSuccess: (state, action) => {
            state.facultyDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        postFacultyDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
        }
    },
});

export const {
    getFacultyRequest,
    getFacultySuccess,
    getFacultyFailed,
    getFacultyError,
    getFacultyDetailsSuccess,
    postFacultyDone
} = facultySlice.actions;

export const facultyReducer = facultySlice.reducer;

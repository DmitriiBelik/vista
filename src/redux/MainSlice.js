import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    presentList: [],
    quittingList: [],
    patientInfo: {}
}


const MainSlice = createSlice({
    name:'main',
    initialState,
    reducers:{
        presentFetched:(state, action) => {
            state.presentList = action.payload
        }, 
        quittingFetched:(state, action) => {
            state.quittingList = action.payload
        },
        patientInfoFetched:(state, action) => {
            state.patientInfo = action.payload
        }
    }
})

const {reducer, actions} = MainSlice;
export const {
    presentFetched,
    quittingFetched,
    patientInfoFetched
} = actions

export default reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const HomeSlice = createSlice({
    name : "tableData",
    initialState,
    reducers:{
        addData :(state,action)=>{
            state.data.push({...action.payload})
        }
    }
})

export const {addData}=HomeSlice.actions

export default HomeSlice.reducer
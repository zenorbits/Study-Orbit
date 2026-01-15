import { createSlice } from "@reduxjs/toolkit";

const toggleTheme = createSlice({
    name: 'toggleTheme',
    initialState: {value:'Dark'},
    reducers: {
      toggleMode:(state)=>{
        state.value = state.value === 'Dark'?'Light':'Dark';
      }
    }
})

export const {toggleMode} = toggleTheme.actions
export const toggleThemeReducer = toggleTheme.reducer
import { createSlice } from "@reduxjs/toolkit";

const toggleTheme = createSlice({
    name: 'toggleTheme',
    initialState: {
      value:localStorage.getItem('theme') || 'Dark'
    },
    reducers: {
      toggleMode:(state,action)=>{
        state.value = state.value === 'Dark'?'Light':'Dark';
        localStorage.setItem('theme',state.value);
      },
      setTheme:(state)=>{
        state.value= action.payload;
        localStorage.setItem('theme',state.value)
      }
    }
})

export const {toggleMode} = toggleTheme.actions
export const toggleThemeReducer = toggleTheme.reducer
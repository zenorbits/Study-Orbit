    import { createSlice } from "@reduxjs/toolkit";


    export const searchInputFilter = createSlice({
        name: 'searchFilter',
        initialState: {
            input: ''
        },
        reducers: {
            searchFilter: (state, action) => {
                state.input = action.payload;
            }
        }
    });

    export const { searchFilter } = searchInputFilter.actions;
    export default searchInputFilter.reducer;
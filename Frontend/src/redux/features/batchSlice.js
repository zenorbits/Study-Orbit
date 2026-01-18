import { createSlice } from '@reduxjs/toolkit';

const batchSlice = createSlice({
    name: 'batch',
    initialState: {
        batchName: localStorage.getItem('batchName') || '',
        batchDescription: localStorage.getItem('batchDescription') || '',
        batchStatus: localStorage.getItem('batchStatus') || 'pending',
    },
    reducers: {
        setBatchInfo: (state, action) => {
            const { batchName, batchDescription, batchStatus } = action.payload;

            state.batchName = batchName;
            state.batchDescription = batchDescription;
            state.batchStatus = batchStatus;

            localStorage.setItem('batchName', batchName);
            localStorage.setItem('batchDescription', batchDescription);
            localStorage.setItem('batchStatus', batchStatus);
        },
        removeBatchInfo: (state) => {
            state.batchName = '';
            state.batchDescription = '';
            state.batchStatus = 'pending';

            localStorage.removeItem('batchName');
            localStorage.removeItem('batchDescription');
            localStorage.removeItem('batchStatus');
        },
        hydrateBatchInfo: (state) => {
            state.batchName = localStorage.getItem('batchName') || '';
            state.batchDescription = localStorage.getItem('batchDescription') || '';
            state.batchStatus = localStorage.getItem('batchStatus') || 'pending';
        },
    },
});

export const { setBatchInfo, removeBatchInfo, hydrateBatchInfo } = batchSlice.actions;
export default batchSlice.reducer;
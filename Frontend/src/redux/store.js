import {configureStore} from '@reduxjs/toolkit'
import { toggleThemeReducer } from './features/darkModeSlice'

export const store = configureStore({
    reducer:{
        toggleTheme:toggleThemeReducer,
    },
})
import {configureStore} from '@reduxjs/toolkit'
import { toggleThemeReducer } from './features/toggleThemeSlice'

export const store = configureStore({
    reducer:{
        toggleTheme:toggleThemeReducer,
    },
})
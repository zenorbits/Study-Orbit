import { configureStore } from '@reduxjs/toolkit'
import { toggleThemeReducer } from './features/toggleThemeSlice'
import { authApi } from './api/authApi'
import { authReducer } from './features/authApiSlice'

export const store = configureStore({
    reducer: {
        toggleTheme: toggleThemeReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})
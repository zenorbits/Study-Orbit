import { configureStore } from '@reduxjs/toolkit'
import { toggleThemeReducer } from './features/toggleThemeSlice'
import { authApi } from './api/authApi'
import { authReducer } from './features/authApiSlice'
import batchReducer from './features/batchSlice'
import { batchApi } from './api/batchApi'
import { userApi } from './api/userApi'


export const store = configureStore({
    reducer: {
        toggleTheme: toggleThemeReducer,
        auth: authReducer,
        batch: batchReducer,
        [authApi.reducerPath]: authApi.reducer,
        [batchApi.reducerPath]: batchApi.reducer,
        [userApi.reducerPath]: userApi.reducer

    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, batchApi.middleware,userApi.middleware)
})
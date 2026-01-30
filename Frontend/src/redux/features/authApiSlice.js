import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    phoneNumber: localStorage.getItem('phoneNumber') || '',
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") || "",
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { username, email, phoneNumber, role, token } = action.payload;
            state.username = username;
            state.email = email;
            state.phoneNumber = phoneNumber;
            state.role = role;
            state.token = token;
            state.isAuthenticated = true;

            // persist to localStorage
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem('phoneNumber', phoneNumber);
            localStorage.setItem("role", role);
            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.username = "";
            state.email = "";
            state.phoneNumber = ''
            state.role = "";
            state.token = "";
            state.isAuthenticated = false;

            // clear localStorage
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem('phoneNumber');
            localStorage.removeItem("role");
            localStorage.removeItem("token");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
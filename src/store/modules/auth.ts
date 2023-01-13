import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
    isAuth: boolean;
    email: string | null;
    fullName: string | null;
    userKey: string | null;
    token: string | null;
    permissions: {
        companyBranchCode: string;
        CompanyBranchPermissions: string[]
    };

}


const initialState: IAuthState = {
    isAuth: false,
    email: null,
    fullName: null,
    userKey: null,
    token: null,
    permissions: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authlogin: (state, action) => {

            console.log(action)
            state.isAuth = true;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.userKey = action.payload.userKey;
            state.token = action.payload.token;
            state.permissions = action.payload.permissions;
        },
        authlogout: (state) => {
            state.isAuth = false;
            state.email = null;
            state.fullName = null;
            state.userKey = null;
            state.token = null;
            state.permissions = null;
        }
    },
});

export const { authlogin, authlogout } = authSlice.actions;

export const auth = authSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

export interface IAuthState {
    isAuth: boolean;
    email: string | null;
    fullName: string | null;
    userKey: string | null;
    token: string | null;
    branchesPermissions: Record<string, string[]>;
    companiesPermissions: Record<string, string[]>;
    organizationsPermissions: Record<string, string[]>;
    branches:  Record<string, string>;
    companies: Record<string, string>;
    organizations: Record<string, string>;
}

export interface IAuthLoginPayload  extends Omit<IAuthState, 'isAuth'> {}


const initialState: IAuthState = {
    isAuth: false,
    email: null,
    fullName: null,
    userKey: null,
    token: null,
    branchesPermissions: null,
    companiesPermissions: null,
    organizationsPermissions: null,
    branches:  null,
    companies: null,
    organizations: null,

};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authlogin: (state: IAuthState, action: {payload: IAuthLoginPayload}) => {

            console.log(action)
            state.isAuth = true;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.userKey = action.payload.userKey;
            state.token = action.payload.token;
            state.branchesPermissions = action.payload.branchesPermissions;
            state.companiesPermissions = action.payload.companiesPermissions;
            state.organizationsPermissions = action.payload.organizationsPermissions;
            state.branches = action.payload.branches;
            state.companies = action.payload.companies;
            state.organizations = action.payload.organizations;

        },
        authlogout: (state) => {
            state.isAuth = false;
            state.email = null;
            state.fullName = null;
            state.userKey = null;
            state.token = null;
            state.branchesPermissions = null;
            state.companiesPermissions = null;
            state.organizationsPermissions = null;
            state.branches = null;
            state.companies = null;
            state.organizations = null;

        }
    },
});

export const { authlogin, authlogout } = authSlice.actions;

export const auth = authSlice.reducer
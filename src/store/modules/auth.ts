import { createSelector, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/users/IUser";
import { IState } from ".";

export interface IAuthState extends IUser {
  isAuth: boolean;
}

export interface IAuthLoginPayload extends Omit<IAuthState, "isAuth"> {}

const initialState: IAuthState = {
  isAuth: false,
  email: null,
  fullName: null,
  userKey: null,
  token: null,
  company: null,
  permissions: [],
  availableCustomers: [],
  availablePayers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authlogin: (state: IAuthState, action: { payload: IAuthLoginPayload }) => {
      state.isAuth = true;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.userKey = action.payload.userKey;
      state.token = action.payload.token;
      state.company = action.payload.company;
      state.permissions = action.payload.permissions;
      state.availableCustomers = action.payload.availableCustomers;
      state.availablePayers = action.payload.availablePayers;
    },
    authlogout: (state) => {
      state.isAuth = false;
      state.email = null;
      state.fullName = null;
      state.userKey = null;
      state.token = null;
      state.permissions = null;
      state.availableCustomers = [];
      state.availablePayers = [];
    },
  },
});

export const { authlogin, authlogout } = authSlice.actions;

export const auth = authSlice.reducer;

export const getCustomers = createSelector(
  [(state: IState) => state.auth.availableCustomers],
  (availableCustomers) => availableCustomers,
);

export const getPayers = createSelector(
  [(state: IState) => state.auth.availablePayers],
  (availablePayers) => availablePayers ?? [],
);

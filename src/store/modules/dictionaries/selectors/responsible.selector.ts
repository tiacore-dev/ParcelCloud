import { createSelector } from "@reduxjs/toolkit";
import { IState } from "../..";

export const getResponsible = createSelector(
  [(state: IState) => state.dictionaries.responsible.data],
  (responsible) => responsible,
);

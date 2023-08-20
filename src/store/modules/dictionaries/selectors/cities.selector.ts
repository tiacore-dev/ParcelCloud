import { createSelector } from "@reduxjs/toolkit";
import { IState } from "../..";

export const getCities = createSelector([(state: IState) => state.dictionaries.cities.data], (cities) => cities)
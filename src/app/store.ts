import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pokeReducer from "../features/pokeSlice";

export const store = configureStore({
	reducer: {
		poke: pokeReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

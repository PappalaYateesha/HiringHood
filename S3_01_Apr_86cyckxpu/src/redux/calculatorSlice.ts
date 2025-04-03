import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalculatorState {
    result: number | string;
}

const initialState: CalculatorState = { result: "" };

const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        setResult: (state, action: PayloadAction<number | string>) => {
            state.result = action.payload;
        },
    },
});

export const { setResult } = calculatorSlice.actions;
export default calculatorSlice.reducer;

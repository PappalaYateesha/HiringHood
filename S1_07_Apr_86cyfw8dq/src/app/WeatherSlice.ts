import { createSlice, PayloadAction} from "@reduxjs/toolkit";


interface WeatherState{
    currentWeather :any;
    forecast: any;
}

const initialState: WeatherState ={
    currentWeather: null,
    forecast: null,
};

const weatherSlice =createSlice({
    name:"weather",
    initialState,
    reducers:{
        setCurrentWeather: (state, action: PayloadAction<any>) =>{
            state.currentWeather =action.payload;
        },
        setForecast:(state, action:PayloadAction<any>) =>{
            state.forecast =action.payload;
        },
    },
});

export const{ setCurrentWeather, setForecast} = weatherSlice.actions;
export default weatherSlice.reducer; 
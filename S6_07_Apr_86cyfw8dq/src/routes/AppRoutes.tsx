import {Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";


const AppRoutes =() =>{
    return (
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "*" element ={<div> Page not Found</div>} />
        </Routes>

    );
};

export default AppRoutes;
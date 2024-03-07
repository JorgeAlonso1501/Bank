import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../pages/Login";
import Home from "../pages/Home";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/Home" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

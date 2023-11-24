import {Route, Routes} from "react-router";
import LoginPage from "../pages/authorization/LoginPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import RegistrationPage from "../pages/authorization/RegistrationPage";
import React from 'react';
import ChatPage from "../pages/chat/ChatPage";
import PrivateRoute from "./PrivateRoute";

export default function Router() {

    return (
        <Routes>
            <Route path="/" element={<DashboardPage/>}/>
            <Route path="/signup" element={<RegistrationPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/chat" element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}
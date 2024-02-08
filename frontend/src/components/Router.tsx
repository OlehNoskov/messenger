import { Route, Routes } from "react-router";
import React from 'react';

import RegistrationPage from "../pages/authorization/registration/RegistrationPage";
import ContentPage from "../pages/dashboard/content/ContentPage";
import LoginPage from "../pages/authorization/login/LoginPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import ChatPage from "../pages/chat/ChatPage";
import PrivateRoute from "./PrivateRoute";

export default function Router() {

    return (
        <Routes>
            <Route path="/" element={<ContentPage/>}/>
            <Route path="/signup" element={<RegistrationPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/chat" element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
            {/*<Route path="/chat" element={<PrivateRoute><ChatRoom/></PrivateRoute>}/>*/}
            {/*<Route path="/chat" element={<PrivateRoute><Test/></PrivateRoute>}/>*/}
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}
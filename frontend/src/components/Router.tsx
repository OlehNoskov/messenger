import {Route, Routes} from "react-router";
import LoginPage from "../pages/authorization/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import RegistrationPage from "../pages/authorization/RegistrationPage";
import ChatPage from "../pages/chat/ChatPage";
import {useState} from "react";
import React from 'react';
import {User} from "../dto/User";

const loginUser: User = {
    firstName: 'Oleg',
    lastName: 'Noskov',
    isLogin: true
};

export default function Router() {
    const [user, setUser] = useState({loginUser});
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <Routes>
            <Route path="/" element={<DashboardPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<RegistrationPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
            {/*{user.isLogin &&*/}
            {/*<Route path="/chat" element={<ChatPage/>}/>*/}
            {/*<Route path="/chat" element={isLoggedIn ? <ChatPage currentUser={user}/> : <LoginPage/>}/>*/}
            <Route path="/chat" element={<ChatPage/>}/>
            {/*}*/}
        </Routes>
    );
}
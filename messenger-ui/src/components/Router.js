import {Route, Routes} from "react-router";
import LoginPage from "../pages/authorization/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import RegistrationPage from "../pages/authorization/RegistrationPage";
import ChatPage from "../pages/chat/ChatPage";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<RegistrationPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
        </Routes>
    );
}
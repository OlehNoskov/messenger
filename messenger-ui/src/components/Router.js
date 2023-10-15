import {Route, Routes} from "react-router";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/DashboardPage";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}
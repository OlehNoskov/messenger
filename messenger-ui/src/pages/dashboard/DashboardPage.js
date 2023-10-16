import React from "react";
import "./Dashboard.css"
import Header from "./Header";
import Footer from "./Footer";
import {Typography} from "@mui/material";

export default function DashboardPage() {
    return (
        <>
            <Header/>
            <div className={"content"}>
                <Typography className="welcome">Welcome visitor!</Typography>
            </div>
            <Footer/>
        </>
    );
}
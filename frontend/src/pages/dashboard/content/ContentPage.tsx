import { Typography } from "@mui/material";
import React from "react";

import HeaderPage from "../header/HeaderPage";
import FooterPage from "../footer/FooterPage";

import "./Dashboard.css"

export default function ContentPage() {
    return (
        <>
            <HeaderPage/>
            <div className={"content"}>
                <Typography className="welcome">Welcome visitor!</Typography>
            </div>
            <FooterPage/>
        </>
    );
}
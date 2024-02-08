import { Divider, Typography } from "@mui/material";
import React from "react";

import "./FooterPage.css"

export default function FooterPage() {
    return (
        <div className={"footer"}>
            <Divider className={"divider"}/>
            <Typography className="copyright">Copyright © 2023-2024 Noskov Oleh</Typography>
        </div>
    );
}
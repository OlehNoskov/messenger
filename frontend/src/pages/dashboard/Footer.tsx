import React from "react";
import { Divider, Typography } from "@mui/material";

import "./Footer.css"

export default function Footer() {
    return (
        <div className={"footer"}>
            <Divider className={"divider"}/>
            <Typography className="copyright">Copyright © 2023 Noskov Oleh</Typography>
        </div>
    );
}
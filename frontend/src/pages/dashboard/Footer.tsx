import React from "react";
import "./Footer.css"
import {Divider, Typography} from "@mui/material";

export default function Footer() {
    return (
        <div className={"footer"}>
            <Divider className={"divider"}/>
            <Typography className="copyright">Copyright © 2023 Noskov Oleh</Typography>
        </div>
    );
}
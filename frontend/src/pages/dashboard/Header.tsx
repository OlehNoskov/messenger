import React from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import "./Header.css"

export default function Header() {
    return (
        <div>
            <div className={"header"}>
                <div className="messenger-label">
                    <img className={"icon-messenger"} src={"./images/messenger-big.png"} alt={"messenger-icon"}></img>
                    <Typography className="title-icon">Messenger</Typography>
                </div>
                <div className="authorization">
                    <Button variant="outlined" component={Link} to="/login">Login</Button>
                    <Button className={"sign-up"} variant="outlined" component={Link} to="/signup">Sign up</Button>
                </div>
            </div>
            <Divider/>
        </div>
    );
}
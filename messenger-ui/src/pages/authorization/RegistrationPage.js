import React from "react";
import {Button, Card, Link, TextField, Typography} from "@mui/material";
import "./RegistrationPage.css";

export default function RegistrationPage() {
    return (
        <div className={"registration-page"}>
            <Card variant="outlined" className={"sign-up-card"}>
                <Typography className={"title"}>
                    Messenger
                </Typography>
                <img className={"messenger-label"} src={"./images/messenger-big.png"} alt={"messenger-icon"}></img>
                <TextField margin="normal" required fullWidth
                           id="email" label="Email Address" name="email" autoFocus
                />
                <TextField margin="normal" required fullWidth
                           id="first-name" label="First name" name="first-name"
                />
                <TextField margin="normal" required fullWidth
                           id="last-name" label="Last name" name="last-name"
                />
                <TextField
                    margin="normal" required fullWidth name="password"
                    label="Password" type="password" id="password"
                />
                <Button className={"sign-in"} type="submit"
                        fullWidth variant="contained">
                    Sign In
                </Button>
            </Card>
            <Card variant="outlined" className={"sign-in-card"}>
                <Typography component="h5">
                    Have an account?
                </Typography>
                <Link href="/login" underline="none" className={"sign-in-link"}>
                    Log in
                </Link>
            </Card>
        </div>
    );
}
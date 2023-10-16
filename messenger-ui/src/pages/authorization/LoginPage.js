import React from "react";
import {Avatar, Button, Card, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import "./LoginPage.css";

export default function LoginPage() {
    return (
        <div className={"login-page"}>
            <Card variant="outlined" className={"sign-in-card"}>
                <Avatar className={"avatar"}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField margin="normal" required fullWidth
                           id="email" label="Email Address" name="email"
                           autoComplete="email" autoFocus
                />
                <TextField
                    margin="normal" required fullWidth name="password"
                    label="Password" type="password" id="password"
                    autoComplete="current-password"
                />
                <Button className={"sign-in"} type="submit"
                        fullWidth variant="contained">
                    Sign In
                </Button>
            </Card>
            <Card variant="outlined" className={"sign-up-card"}>
                <Typography component="h5">
                    Don't have an account?
                </Typography>
                <Link href="/signup" underline="none" className={"sign-up-link"}>
                    Sign up
                </Link>
            </Card>
        </div>
    );
}
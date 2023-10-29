import React, {useEffect, useState} from "react";
import {Avatar, Button, Card, FormControl, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import "./LoginPage.css";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        window.localStorage.setItem("email", email);
    }, [email]);

    const isEmailInvalid = (): boolean => {
        return !/\S+@\S+\.\S+/.test(email);
    }

    const isPasswordInvalid = (): boolean => {
        return password.length < 8 || password.length > 16;
    }

    const isSignInButtonDisable = (): boolean => {
        return !isEmailInvalid() && !isPasswordInvalid();
    }

    return (
        <div className={"login-page"}>
            <Card variant="outlined" className={"sign-in-card"}>
                <Avatar className={"avatar"}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <FormControl className={"form-login"}>
                    <TextField margin="normal" required fullWidth error={isEmailInvalid()}
                               id="email" label="Email Address" name="email"
                               autoComplete="email" autoFocus
                               onChange={(value) => {
                                   setEmail(value.target.value);
                               }}
                    />
                    <TextField
                        margin="normal" required fullWidth name="password"
                        label="Password" type="password" id="password"
                        autoComplete="current-password" error={isPasswordInvalid()}
                        onChange={(value) => {
                            setPassword(value.target.value);
                        }}
                    />
                    <Button className={"sign-in-button"} type="submit"
                            fullWidth variant="contained" disabled={!isSignInButtonDisable()}>
                        Sign In
                    </Button>
                </FormControl>
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
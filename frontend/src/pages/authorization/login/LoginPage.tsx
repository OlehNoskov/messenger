import { Alert, Avatar, Button, Card, FormControl, Link, TextField, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";

import { handleLogError } from "../../../service/HendlerErrors";
import {UserSignInDto} from "../../../dto/UserSignIn.dto";
import { useAuth } from "../../../service/AuthContext";
import { parseJwt } from "../../../service/ParserJwt";
import { login } from "../../../service/Service";

import "./LoginPage.css";

export default function LoginPage() {
    const Auth = useAuth();
    const isLoggedIn = Auth.userIsAuthenticated();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        window.localStorage.setItem("username", username);
    }, [username]);

    const handleLogin = async () => {

        try {
            const userSignIn: UserSignInDto = {username: username, password: password}

            const response = await login(userSignIn);
            const {accessToken} = response.data;
            const data = parseJwt(accessToken);
            const authenticatedUser = {data, accessToken};

            Auth.userLogin(authenticatedUser);

            setUsername('');
            setPassword('');
            setIsError(false);

        } catch (error) {
            handleLogError(error);
            setIsError(true);
        }
    }

    if (isLoggedIn) {
        return <Navigate to={'/chat'}/>
    }

    return (
        <div className={"login-page"}>
            {isError &&
                <Alert className={"alertMessage"} severity="error"
                       sx={{display: "flex", justifyContent: "center"}}>
                    Username or password is incorrect!
                </Alert>}
            <Card variant="outlined" className={"sign-in-card"}>
                <Avatar className={"avatar"}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <FormControl className={"form-login"}>
                    <TextField margin="normal" required fullWidth
                               id="username" label="Username" name="username" autoFocus
                               onChange={(value) => {
                                   setUsername(value.target.value);
                               }}
                    />
                    <TextField
                        margin="normal" required fullWidth name="password"
                        label="Password" type="password" id="password"
                        onChange={(value) => {
                            setPassword(value.target.value);
                        }}
                    />
                    <Button className={"sign-in-button"} type="submit"
                            onClick={handleLogin}
                            fullWidth variant="contained">
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
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, FormControl, Link, TextField, Typography } from "@mui/material";
import { useAuth } from "../../service/AuthContext";
import { Navigate } from "react-router-dom";
import { signup } from "../../service/Service";
import { UserSignUpDto } from "../../dto/UserSignUpDto";
import { parseJwt } from "../../service/ParserJwt";
import { handleLogError } from "../../service/HendlerErrors";

import "./RegistrationPage.css";

export default function RegistrationPage() {

    const Auth = useAuth();
    const isLoggedIn = Auth.userIsAuthenticated();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("email", email);
    }, [username, email]);

    const isUsernameInvalid = (): boolean => {
        return username.length < 2;
    }

    const isEmailInvalid = (): boolean => {
        return !/\S+@\S+\.\S+/.test(email);
    }

    const isPasswordInvalid = (): boolean => {
        return password.length < 8 || password.length > 16;
    }

    const isRepeatPasswordInvalid = (): boolean => {
        return password != repeatPassword;
    }

    const isSignInButtonDisable = (): boolean => {
        return isUsernameInvalid() || isEmailInvalid() || isPasswordInvalid() || isRepeatPasswordInvalid();
    }

    const handleSubmit = async () => {
        const user: UserSignUpDto = {username, password, email};

        try {
            const response = await signup(user);
            const {accessToken} = response.data;
            const data = parseJwt(accessToken);
            const authenticatedUser = {data, accessToken};

            Auth.userLogin(authenticatedUser)

            setUsername('');
            setPassword('');
            setEmail('');

        } catch (error) {
            handleLogError(error);
            setIsError(true);
        }
    }

    if (isLoggedIn) {
        return <Navigate to='/chat'/>
    }

    return (
        <div className={"registration-page"}>
            {isError &&
                <Alert className={"unsuccessful-sign-up-message"} severity="error"
                       sx={{display: "flex", justifyContent: "center"}}>
                    Username or email is already registered!
                    <p>Please, try another user name or email!</p>
                </Alert>}
            <Card variant="outlined" className={"sign-up-card"}>
                <Typography className={"title"}>
                    Messenger
                </Typography>
                <img className={"messenger-label"} src={"./images/messenger-big.png"}
                     alt={"messenger-icon"}></img>
                <FormControl className={"form-registration"}>

                    <TextField error={isUsernameInvalid()} margin="normal" required fullWidth type="text"
                               helperText={isUsernameInvalid() && password.length > 0
                                   ? "Length of Username must be more than 2 characters!"
                                   : null}
                               onChange={(value) => {
                                   setUsername(value.target.value);
                               }}
                               id="username" label="Username" name="username" value={username} autoFocus
                    />
                    <TextField error={isEmailInvalid()} margin="normal" required fullWidth type="email"
                               helperText={isEmailInvalid() && email.length > 0
                                   ? "Please enter a valid email address."
                                   : null}
                               onChange={(value) => {
                                   setEmail(value.target.value);
                               }}
                               id="email" label="Email Address" name="email" value={email} autoFocus
                    />
                    <TextField error={isPasswordInvalid()}
                               margin="normal" required fullWidth name="password" value={password}
                               label="Password" type="password" id="password"
                               helperText={isPasswordInvalid() && password.length > 0
                                   ? "Length of password must be more than 8 or less than 16 characters!"
                                   : null}
                               onChange={(value) => {
                                   setPassword(value.target.value);
                               }}
                    />
                    <TextField error={isRepeatPasswordInvalid()}
                               margin="normal" required fullWidth name="repeatPasswordInput" value={repeatPassword}
                               label="Repeat password" type="password" id="repeatPassword"
                               helperText={password != repeatPassword
                                   ? "Password does not match!"
                                   : null}
                               onChange={(value) => {
                                   setRepeatPassword(value.target.value);
                               }}
                    />
                    <Button className={"sign-in-button"} type="submit" fullWidth
                            variant="contained" disabled={isSignInButtonDisable()} onClick={handleSubmit}>
                        Sign In
                    </Button>
                </FormControl>
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
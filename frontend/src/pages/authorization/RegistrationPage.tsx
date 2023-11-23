import React, {useEffect, useState} from "react";
import {Button, Card, FormControl, Link, TextField, Typography} from "@mui/material";
import "./RegistrationPage.css";
import {useAuth} from "../../service/AuthContext";
import {Navigate} from "react-router-dom";
import {signup} from "../../service/Service";
import {UserSignUpDto} from "../../dto/UserSignUpDto";
import {parseJwt} from "../../service/ParserJwt";
import {handleLogError} from "../../service/HendlerErrors";

export default function RegistrationPage() {

    const Auth = useAuth();
    const isLoggedIn = Auth.userIsAuthenticated();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("name", name);
    }, [username, email, name]);

    const isUsernameInvalid = (): boolean => {
        return username.length < 2;
    }

    const isEmailInvalid = (): boolean => {
        return !/\S+@\S+\.\S+/.test(email);
    }

    const isPasswordInvalid = (): boolean => {
        return password.length < 8 || password.length > 16;
    }

    const isSignInButtonDisable = (): boolean => {
        return isUsernameInvalid() || isEmailInvalid() || isPasswordInvalid();
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
            setName('');
            setEmail('');

        } catch (error) {
            handleLogError(error);
        }
    }

    if (isLoggedIn) {
        return <Navigate to='/chat'/>
    }

    return (
        <div className={"registration-page"}>
            <Card variant="outlined" className={"sign-up-card"}>
                <Typography className={"title"}>
                    Messenger
                </Typography>
                <img className={"messenger-label"} src={"./images/messenger-big.png"}
                     alt={"messenger-icon"}></img>
                <FormControl className={"form-registration"}>

                    <TextField error={isUsernameInvalid()} margin="normal" required fullWidth type="text"
                               helperText={isUsernameInvalid() && password.length > 0
                                   ? "Length of password must be more than 2 characters!"
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
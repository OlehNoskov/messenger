import React, {useEffect, useState} from "react";
import {Button, Card, FormControl, Link, TextField, Typography} from "@mui/material";
import "./RegistrationPage.css";
import {registration} from "../../service/Service";
import {HttpStatusCode} from "axios";
import {useNavigate} from "react-router";

export default function RegistrationPage() {

    const userSignUpDto = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(userSignUpDto);
    const navigate = useNavigate();

    useEffect(() => {
        window.localStorage.setItem("firstName", firstName);
        window.localStorage.setItem("lastName", lastName);
        window.localStorage.setItem("email", email);
    }, [firstName, lastName, email]);

    const getUserSignUDto = () => {
        userSignUpDto.firstName = firstName;
        userSignUpDto.lastName = lastName;
        userSignUpDto.email = email;
        userSignUpDto.password = password;

        return userSignUpDto;
    };


    const createUserSignUDto = () => {
        registration(getUserSignUDto()).then((response) => {
            if (response.status === HttpStatusCode.Created) {
                setUser(response);
                navigate('/chat');
            }
        })
    };

    const isEmailInvalid = (): boolean => {
        return !/\S+@\S+\.\S+/.test(email);
    }

    const isFirstNameInvalid = (): boolean => {
        return firstName.length < 2;
    }

    const isLastNameInvalid = (): boolean => {
        return lastName.length < 2;
    }

    const isPasswordInvalid = (): boolean => {
        return password.length < 8 || password.length > 16;
    }

    const isSignInButtonDisable = (): boolean => {
        return !isEmailInvalid() || !isFirstNameInvalid() || !isLastNameInvalid() || !isPasswordInvalid();
    }


    return (
        <div className={"registration-page"}>
            <Card variant="outlined" className={"sign-up-card"}>
                <Typography className={"title"}>
                    Messenger
                </Typography>
                <img className={"messenger-label"} src={"./images/messenger-big.png"} alt={"messenger-icon"}></img>
                <FormControl className={"form-registration"}>
                    <TextField error={isEmailInvalid()} margin="normal" required fullWidth type="email"
                               onChange={(value) => {
                                   setEmail(value.target.value);
                               }}
                               id="email" label="Email Address" name="email" value={email} autoFocus
                    />
                    <TextField error={isFirstNameInvalid()} margin="normal" required fullWidth type="text"
                               id="firstName" label="First name" name="firstName" value={firstName}
                               onChange={(value) => {
                                   setFirstName(value.target.value);
                               }}
                    />
                    <TextField error={isLastNameInvalid()} margin="normal" required fullWidth type="text"
                               id="lalastName" label="Last name" name="lastName" value={lastName}
                               onChange={(value) => {
                                   setLastName(value.target.value);
                               }}
                    />
                    <TextField error={isPasswordInvalid()}
                               margin="normal" required fullWidth name="password" value={password}
                               label="Password" type="password" id="password"
                               onChange={(value) => {
                                   setPassword(value.target.value);
                               }}
                    />
                    <Button className={"sign-in-button"} type="submit" onClick={createUserSignUDto} fullWidth
                            variant="contained">
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
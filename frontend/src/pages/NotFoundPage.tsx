import React from "react";
import {Button} from "@mui/material";
import "./NotFoundPage.css";

export default function NotFoundPage() {
    return (
        <div className="App">
            <div className={"not-found-page"}>
                <h1>Ooooops! Page not found!</h1>
                <Button className={"button-home"} variant="contained" href="/" size={"large"} color="warning">
                    Dashboard
                </Button>
            </div>
        </div>
    );
}
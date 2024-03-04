import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./service/AuthContext";
import Router from "./components/Router";

import './App.css';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

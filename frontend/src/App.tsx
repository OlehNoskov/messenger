import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import { AuthProvider } from "./service/AuthContext";

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

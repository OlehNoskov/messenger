import './App.css';
import {BrowserRouter} from "react-router-dom";
import Router from "./components/Router";
import {AuthProvider} from "./service/AuthContext";

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

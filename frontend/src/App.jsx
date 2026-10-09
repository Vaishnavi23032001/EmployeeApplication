// import React from 'react';
import './index.css'
import Employees from './components/pages/Employee';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Signup from "./components/pages/signup";
function App() {

    return (
         <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <Employees />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
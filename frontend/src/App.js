import React from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Routers from "./routers/Routers";
import {useSelector} from "react-redux";


function App() {
    const user = useSelector(state => state.users.user);
    return (
        <>
            <ToastContainer autoClose={1000}/>
            <CssBaseline/>
            <Routers user={user}/>
        </>
    );
}

export default App;

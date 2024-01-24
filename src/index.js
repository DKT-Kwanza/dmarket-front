import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import ScrollToTop from "./user/components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop/>
            <App basename="/member/login"/>
        </BrowserRouter>
    </React.StrictMode>
);

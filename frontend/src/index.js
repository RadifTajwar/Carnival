import React from 'react';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App';
import Chat from './component/Chat';
import store from "./store";


const options = {
    timeout:5000,
    positions:positions.BOTTOM_CENTER,
    transitions:transitions.SCALE
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
        <Chat/>
            <App/>
        </AlertProvider>
    </Provider>
);


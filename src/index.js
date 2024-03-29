import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import 'react-quill/dist/quill.snow.css';
import 'react-photo-view/dist/react-photo-view.css';
import Provider from './stores/Provider';
import { createBrowserHistory } from 'history';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NotificationSocketProvider from './components/NotificationSocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider>
        <NotificationSocketProvider>
            <App />
        </NotificationSocketProvider>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

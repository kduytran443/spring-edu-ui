import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { ThemeContext } from 'styled-components';
import { API_BASE_URL } from '~/constants';
import { getUserJWT } from '~/services/config';

export const NotificationSocketContext = createContext();

let stompClient = null;
function NotificationSocketProvider({ children }) {
    const [connectedState, setConnectedState] = useState(false);
    const [notificationEvent, setNotificationEvent] = useState(() => {
        const event = new CustomEvent('onNotificationEvent');
        return event;
    });

    const onConnected = () => {
        console.log('SOCKET CONNECTED!!!');
        stompClient.subscribe(`/web-socket/notification`, onMessageReceived);
    };

    function onMessageReceived(messagePayload) {
        const message = JSON.parse(messagePayload.body);
        switch (message.type) {
            case 'NOTIFICATION': {
                console.log('notificationEvent', notificationEvent);
                window.dispatchEvent(notificationEvent);
                break;
            }
            default: {
            }
        }
    }

    useEffect(() => {
        console.log('notificationEvent', notificationEvent);
    }, [notificationEvent]);

    const onError = () => {};

    function register() {
        let socket = new SockJS(`${API_BASE_URL}/ws`);
        stompClient = over(socket);
        var headers = {
            Authorization: 'Bearer ' + getUserJWT(),
        };
        stompClient.debug = null;
        stompClient.connect(headers, onConnected, onError);
        setConnectedState(true);
    }

    useEffect(() => {
        if (!connectedState) {
            register();
            setConnectedState(true);
        }
    }, [connectedState]);

    const send = (message) => {
        const chatMessage = {
            type: 'NOTIFICATION',
        };
        stompClient.send(`/app/notification.send`, {}, JSON.stringify(chatMessage));
    };

    return <NotificationSocketContext.Provider value={send}>{children}</NotificationSocketContext.Provider>;
}

export default NotificationSocketProvider;

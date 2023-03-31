import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { ThemeContext } from 'styled-components';
import { API_BASE_URL } from '~/constants';
import { getUserJWT } from '~/services/config';
import { useUser } from '~/stores/UserStore';

export const NotificationSocketContext = createContext();

let stompClient = null;
function NotificationSocketProvider({ children }) {
    const [connectedState, setConnectedState] = useState(false);
    const [userData, userDataDispatch] = useUser();
    const [notificationEvent, setNotificationEvent] = useState(() => {
        const event = new CustomEvent('onNotificationEvent');
        return event;
    });

    const onConnected = () => {
        console.log('SOCKET CONNECTED!!!');
        stompClient.subscribe(`/web-socket/notification`, onMessageReceived);
    };

    const isIn = (arr = []) => {
        return arr.includes(userData.id);
    };

    console.log('userData', userData);

    function onMessageReceived(messagePayload) {
        const message = JSON.parse(messagePayload.body);
        console.log('message', message, userData.id, isIn(message.receivers));
        if (message.receivers.length === 0 || isIn(message.receivers)) {
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
        if (!connectedState && userData.id) {
            register();
            setConnectedState(true);
        }
    }, [userData]);

    const send = (receivers = []) => {
        const chatMessage = {
            type: 'NOTIFICATION',
            receivers: receivers,
        };
        stompClient.send(`/app/notification.send`, {}, JSON.stringify(chatMessage));
    };

    return <NotificationSocketContext.Provider value={send}>{children}</NotificationSocketContext.Provider>;
}

export default NotificationSocketProvider;

import { Avatar, Badge } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { useRef, useState } from 'react';
import HeaderAccountOptions from '../HeaderAccountOptions';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HeaderNotifierBox from '../HeaderNotifierBox';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { notificationService } from '~/services/notificationService';
import { useContext } from 'react';
import { NotificationSocketContext } from '../NotificationSocketProvider';
import audios from '~/assets/audios';
import CustomSnackbar from '../CustomSnackbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function HeaderNotifier() {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const location = useLocation();
    const [notificationList, setNotificationList] = useState([]);
    const [previousLength, setPreviousLength] = useState(0);
    const audioRef = useRef();
    const [notificationSnackbar, setNotificationSnackbar] = useState(false);

    const loadNotification = () => {
        notificationService.getAllByUser().then((data) => {
            if (data.length >= 0) {
                setNotificationList(data);
            }
        });
    };

    useEffect(() => {
        loadNotification();
        const trigger = (e) => {
            loadNotification();
        };
        window.addEventListener('onNotificationEvent', trigger);
        return () => {
            window.removeEventListener('onNotificationEvent', trigger);
        };
    }, [location]);

    useEffect(() => {
        if (notificationList.length !== previousLength) {
            console.log('previousLength', notificationList.length, previousLength);
            //thong bao am thanh
            audioRef.current.play();
            setNotificationSnackbar(true);
            setPreviousLength(notificationList.length);
            setTimeout(() => {
                setNotificationSnackbar(false);
            }, 4000);
        }
    }, [notificationList]);

    useEffect(() => {
        if (visible) {
            notificationService.readAll().then((data) => {
                loadNotification();
            });
        }
    }, [visible]);

    const notReadedNotification = notificationList.reduce((previous, current) => {
        return current.read === 0 ? previous + 1 : previous + 0;
    }, 0);

    return (
        <Tippy
            content="Tooltip"
            visible={visible}
            onClickOutside={hide}
            render={(attrs) => (
                <div className="box max-h-[560px] overflow-y-auto" tabIndex="-1" {...attrs}>
                    <HeaderNotifierBox dataList={notificationList} />
                </div>
            )}
            interactive
        >
            <div
                onClick={(e) => {
                    setVisible(!visible);
                }}
                className={`cursor-pointer ${visible && ' outline outline-4 shadow-md outline-sky-500 rounded-full'}`}
            >
                {notificationSnackbar && notReadedNotification > 0 && (
                    <CustomSnackbar
                        open={notificationSnackbar}
                        content={
                            <div>
                                <FontAwesomeIcon className="mr-2" icon={faBell} /> Bạn có thông báo mới
                            </div>
                        }
                    />
                )}
                <audio ref={audioRef} src={audios.notificationSound} />
                <Badge badgeContent={notReadedNotification} color="primary">
                    <NotificationsNoneIcon color="action" />
                </Badge>
            </div>
        </Tippy>
    );
}

export default HeaderNotifier;

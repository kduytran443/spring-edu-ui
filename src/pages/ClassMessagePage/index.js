import { faDoorOpen, faFile, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, IconButton, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import FullScreenDialog from '~/components/FullScreenDialog';
import SidebarMenu from '~/components/SidebarMenu';

function ClassMessagePage() {
    const dateNow = new Date();

    const [messageListState, setMessageListState] = useState([
        {
            id: 1,
            content: 'Tin nhắn nè asd asd asd asd asd asd as dasdadsasd asdasd',
            date: `${dateNow.getDate()}/${
                dateNow.getMonth() + 1
            }/${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
            private: false,
            userAvatar: 'https://pbs.twimg.com/media/Ej5qyryX0AI_lc7?format=jpg&name=large',
            username: 'Messi',
        },
        {
            id: 2,
            content: 'Tin nhắn nè',
            date: `${dateNow.getDate()}/${
                dateNow.getMonth() + 1
            }/${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
            private: false,
            fromMe: true,
        },
        {
            id: 3,
            content: 'Tin nhắn nè',
            date: `${dateNow.getDate()}/${
                dateNow.getMonth() + 1
            }/${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
            private: false,
            userAvatar: 'https://pbs.twimg.com/media/Ej5qyryX0AI_lc7?format=jpg&name=large',
            username: 'Messi',
        },
        {
            id: 4,
            content: 'Tin nhắn nè',
            date: `${dateNow.getDate()}/${
                dateNow.getMonth() + 1
            }/${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
            private: false,
            userAvatar: 'https://pbs.twimg.com/media/Ej5qyryX0AI_lc7?format=jpg&name=large',
            username: 'Messi',
        },
        {
            id: 5,
            content: 'Tin nhắn nè',
            date: `${dateNow.getDate()}/${
                dateNow.getMonth() + 1
            }/${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
            private: false,
            userAvatar: 'https://pbs.twimg.com/media/Ej5qyryX0AI_lc7?format=jpg&name=large',
            username: 'Messi',
        },
        {
            id: 6,
            content: 'Tin nhắn nè',
            date: `${dateNow.getDate()}/${
                dateNow.getMonth() + 1
            }/${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
            private: false,
            userAvatar: 'https://pbs.twimg.com/media/Ej5qyryX0AI_lc7?format=jpg&name=large',
            username: 'Messi',
        },
    ]);

    const [messageState, setMessageState] = useState('');
    const scrollRef = useRef();
    const [openChat, setOpenChat] = useState(false);
    const handleClickOpen = () => {
        setOpenChat(true);
    };

    const handleClose = () => {
        setOpenChat(false);
    };

    const onInputMessage = (e) => {
        setMessageState(e.target.value);
    };

    const submit = () => {
        const dateNow = new Date();
        let messageList = [...messageListState];
        messageList.push({
            id: 2,
            content: messageState,
            date: `${dateNow.getDate()}/${
                dateNow.getMonth() + 1
            }/${dateNow.getFullYear()} - ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
            private: false,
            fromMe: true,
        });
        setMessageState('');
        setMessageListState(messageList);
    };

    const onSubmit = (e) => {
        if (messageState) submit();
    };

    const onKeyUp = (e) => {
        if (e.key === 'Enter') {
            if (messageState) submit();
        }
    };

    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }, 100);
    }, [messageListState]);

    const heightEx = 170;

    return (
        <div>
            <div>
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleClickOpen}>
                    <FontAwesomeIcon icon={faDoorOpen} />
                </IconButton>
                <FullScreenDialog openState={openChat} handleClose={handleClose} headerTitle="Chat nhóm">
                    <div className="flex flex-col w-full">
                        <div
                            className={`overflow-scroll min-h-[calc(100vh-240px)] md:min-h-[calc(100vh-180px)] max-h-[calc(100vh-240px)] md:max-h-[calc(100vh-180px)] flex-1`}
                        >
                            <ul className="p-2">
                                {messageListState.map((message) => {
                                    return (
                                        <li
                                            key={message.id}
                                            className={`md:my-2 flex flex-row items-start ${
                                                message.fromMe ? 'justify-end' : 'justify-start'
                                            } `}
                                        >
                                            {message.userAvatar && !message.fromMe && (
                                                <Avatar src={message.userAvatar} />
                                            )}
                                            <div className={`flex flex-col group ml-2`}>
                                                <div
                                                    className={`border max-w-[260px] md:max-w-[600px] ${
                                                        message.fromMe
                                                            ? 'border-blue-400 bg-blue-500 text-white'
                                                            : 'border-slate-200 bg-gray-100'
                                                    }  p-4 rounded-lg shadow`}
                                                >
                                                    <div>{message.content}</div>
                                                </div>
                                                <div className="group-hover:opacity-100 duration-200 opacity-0">
                                                    {message.date}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                                <div ref={scrollRef}></div>
                            </ul>
                        </div>
                        <div className="flex border border-slate-200 p-4 py-6 shadow rounded-lg flex-row items-center">
                            <div className="mr-2">
                                <IconButton color="primary">
                                    <FontAwesomeIcon icon={faFile} />
                                </IconButton>
                            </div>
                            <div className="mr-2">
                                <IconButton color="primary">
                                    <FontAwesomeIcon icon={faSmile} />
                                </IconButton>
                            </div>
                            <div className="flex-1">
                                <TextField
                                    onKeyUp={onKeyUp}
                                    value={messageState}
                                    onInput={onInputMessage}
                                    className="w-full"
                                    label="Tin nhắn"
                                />
                            </div>
                            <div className="ml-2" onClick={onSubmit}>
                                <IconButton color="primary">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </FullScreenDialog>
            </div>
        </div>
    );
}

export default ClassMessagePage;

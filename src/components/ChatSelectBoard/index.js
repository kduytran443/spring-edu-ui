import {
    faArrowDown,
    faArrowLeft,
    faArrowUp,
    faDownLong,
    faFile,
    faPaperPlane,
    faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { classService } from '~/services/classService';
import { messageService } from '~/services/messageService';
import ChatMessage from '../ChatMessage';
import { classMemberService } from '~/services/classMemberService';
import { NotificationSocketContext } from '../NotificationSocketProvider';
import { useContext } from 'react';
import { useRef } from 'react';
import { useUser } from '~/stores/UserStore';
import LoadingProcess from '../LoadingProcess';

function ChatSelectBoard() {
    const [classListState, setClassListState] = useState([]);
    const location = useLocation();
    useEffect(() => {
        classService.getClassReviewCardByUserId().then((data) => {
            if (data.length >= 0) {
                setClassListState(data);
            }
        });
    }, [location]);
    const [filterclassListState, setFilterClassListState] = useState([]);

    const sendContext = useContext(NotificationSocketContext);
    const [selectedClassId, setSelectedClassId] = useState();
    const [classData, setClassData] = useState({});

    const [chatText, setChatText] = useState('');

    const [chatMessageList, setChatMessageList] = useState([]);

    const [classMembers, setClassMembers] = useState([]);
    const [read, setRead] = useState(1);
    const [userState, userDispatch] = useUser();

    const loadClassMembers = () => {
        if (selectedClassId) {
            classMemberService.getClassMemberByClassId(selectedClassId).then((data) => {
                if (data.length >= 0) {
                    const arr = data.map((item) => item.userId);
                    setClassMembers(arr);
                }
            });
        }
    };

    const loadMessage = () => {
        if (selectedClassId) {
            messageService.getAllByClassId(selectedClassId).then((data) => {
                if (data.length >= 0) {
                    setChatMessageList(data);
                }
            });
        }
    };

    useEffect(() => {
        loadMessage();
        loadClassMembers();
    }, [selectedClassId]);

    const sendMessage = (type = 'text', content = '') => {
        const obj = { content: content, classId: selectedClassId, type: type };
        messageService.post(obj).then((data) => {
            if (data.id) {
                sendContext(classMembers, 'CHAT');
                setChatText('');
                setTimeout(() => {
                    scrollRef.current.scrollIntoView({
                        behavior: 'smooth',
                    });
                }, 100);
            }
        });
    };

    useEffect(() => {
        const trigger = (e) => {
            loadMessage();
        };
        window.addEventListener('onChatEvent', trigger);
        return () => {
            window.removeEventListener('onChatEvent', trigger);
        };
    }, [location, selectedClassId]);

    useEffect(() => {
        setRead(1);
        if (selectedClassId) {
            setTimeout(() => {
                scrollRef.current.scrollIntoView({
                    behavior: 'smooth',
                });
            }, 100);
        }
    }, [selectedClassId]);

    const fileRef = useRef();

    const uploadAvatar = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    sendMessage('file', reader.result);
                    fileRef.current.value = '';
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };

    const [searchClass, setSearchClass] = useState('');

    useEffect(() => {
        const arr = [...classListState];
        const filterArr = arr.filter((item) => item.name.toLowerCase().includes(searchClass.toLowerCase().trim()));
        setFilterClassListState(filterArr);
    }, [searchClass, classListState]);

    const scrollRef = useRef();
    const readRef = useRef();
    const navigate = useNavigate();
    const boxRef = useRef();

    return (
        <div className="w-[320px] h-[480px] md:w-[480px] md:h-[520px] bg-white rounded shadow-lg outline outline-slate-200 p-2 flex flex-col overflow-y-auto">
            {!selectedClassId ? (
                <div className="w-full flex flex-col">
                    <div className="w-full">
                        <TextField
                            value={searchClass}
                            onInput={(e) => {
                                setSearchClass(e.target.value);
                            }}
                            className="w-full"
                            size="small"
                            placeholder="Tên lớp"
                        />
                    </div>
                    {filterclassListState.map((classItem, index) => {
                        return (
                            <div
                                className="my-2 flex flex-row items-center select-none cursor-pointer hover:bg-blue-500 hover:shadow hover:shadow-blue-400 hover:text-white p-4"
                                key={index}
                                onClick={(e) => {
                                    setSelectedClassId(classItem.id);
                                    setClassData(classItem);
                                }}
                            >
                                <div className="mr-2">
                                    <Avatar variant="square" src={classItem.avatar} />
                                </div>
                                <div className="max-w-full flex-1 overflow-hidden truncate">{classItem.name}</div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="w-full flex flex-col">
                    <div className="flex flex-row items-center border-b-2 border-slate-200">
                        <div className="mr-2 md:mr-4">
                            <Button
                                onClick={(e) => {
                                    setSelectedClassId();
                                }}
                                startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                            >
                                Back
                            </Button>
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="mr-2 hidden md:block">
                                <Avatar variant="square" src={classData.avatar} />
                            </div>
                            <div
                                onClick={(e) => {
                                    navigate('/class/' + classData.id);
                                }}
                                className="max-w-[210px] select-none cursor-pointer hover:text-blue-500 md:max-w-[260px] flex-1 overflow-hidden truncate"
                            >
                                {classData.name}
                            </div>
                        </div>
                    </div>
                    <div
                        ref={boxRef}
                        onScroll={(e) => {
                            let element = e.target;
                            if (element.scrollTop === 0 && read * 10 < chatMessageList.length) {
                                const height = boxRef.current.offsetHeight;
                                setRead(read + 1);
                                boxRef.current.scrollTop = height;
                            }
                        }}
                        className="w-full flex flex-col items-center flex-1 min-h-[calc(480px-100px)] md:min-h-[calc(520px-100px)] max-h-[calc(480px-100px)] md:max-h-[calc(520px-100px)] overflow-y-auto"
                    >
                        {read * 10 < chatMessageList.length && (
                            <div ref={readRef}>
                                <LoadingProcess />
                            </div>
                        )}
                        <div className="w-full flex flex-col-reverse items-start flex-1">
                            <div ref={scrollRef}></div>
                            {chatMessageList.map((item, index) => {
                                return index + 1 < read * 10 ? (
                                    <ChatMessage owner={userState.username === item?.user.username} message={item} />
                                ) : (
                                    <></>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full relative">
                        <div className="flex flex-row items-center">
                            <input onChange={uploadAvatar} style={{ display: 'none' }} type="file" ref={fileRef} />
                            <IconButton
                                onClick={(e) => {
                                    fileRef.current.click();
                                }}
                                color="primary"
                            >
                                <FontAwesomeIcon icon={faFile} />
                            </IconButton>
                            <div className="flex-1">
                                <TextField
                                    className="w-full"
                                    size="small"
                                    value={chatText}
                                    onInput={(e) => {
                                        setChatText(e.target.value);
                                    }}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter' && chatText.trim()) {
                                            sendMessage('text', chatText);
                                        }
                                    }}
                                    placeholder="Message"
                                />
                            </div>
                            <IconButton
                                onClick={(e) => {
                                    sendMessage('text', chatText);
                                }}
                                disabled={!chatText}
                                color="primary"
                            >
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatSelectBoard;

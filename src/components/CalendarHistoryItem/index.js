import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton, TextField } from '@mui/material';
import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import AlertDialogSlide from '../AlertDialogSlide';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { renderToTime } from '~/utils';
import LinearWithValueLabel from '../LinearWithValueLabel';
import HistoryLinearWithValueLabel from '../HistoryLinearWithValueLabel';
import { TextFields } from '@mui/icons-material';
import CalendarHistoryDialog from '../CalendarHistoryDialog';
import { classMemberService } from '~/services/classMemberService';

export default function CalendarHistoryItem({
    data = {
        id: 0,
        title: 'Tiêu đề',
        description: 'Mô tả',
        start: new Date(),
        end: new Date(),
        img: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
    },
    onRemove = () => {},
    onUpdate = () => {},
    setData = () => {},
    close = () => {},
    memberList = [],
    historyList = [],
}) {
    const [enableEditingState, setEnableEditingState] = useState(false);
    const [removeAlertState, setRemoveAlertState] = useState(false);
    const [dataState, setDataState] = useState(data);
    const { classId } = useParams();

    const [calendarObj, setCalendarObj] = useState({});

    if (!dataState.img) {
        dataState.img = 'https://mui.com/static/images/cards/contemplative-reptile.jpg';
    }

    const startEditing = () => {
        setEnableEditingState(true);
    };

    useEffect(() => {
        setEnableEditingState(false);
    }, [data.id]);

    useEffect(() => {
        setDataState(data);
    }, [data]);

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function convertMsToTime(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    }

    const getMemberByUsername = (username) => {
        const arr = [...memberList];

        let index = arr.map((item) => item.username).indexOf(username);
        return arr[index];
    };

    useEffect(() => {
        const obj = historyList.reduce((x, y) => {
            (x[y.username] = x[y.username] || []).push(y);
            return x;
        }, {});

        const stack = [];

        const result = {};

        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            //loop of user
            const username = keys[i];
            const array = obj[username];

            let time = 0; //long

            for (let j = 0; j < array.length; j++) {
                const historyItem = array[j];
                if (historyItem.action == 'join') {
                    stack.push(historyItem);
                }
            }
            for (let j = 0; j < array.length; j++) {
                const historyItem = array[j];
                if (historyItem.action == 'leave') {
                    const popHistoryItem = stack.pop();
                    time += historyItem.time - popHistoryItem.time;
                }
            }
            const member = getMemberByUsername(username);
            result[username] = {
                ...member,
                time: time,
            };
        }

        setCalendarObj(result);
    }, [historyList]);

    const [searchName, setSearchName] = useState('');
    const search = (username = '') => {
        let result = false;
        if (username.toLowerCase().includes(searchName.toLowerCase())) {
            result = true;
        }
        return result;
    };

    const location = useLocation();

    const [classMemberState, setClassMemberState] = useState({});
    const loadUserData = () => {
        classMemberService.getClassMemberByUserAndClassId(classId).then((data) => {
            if (isValidRole(data.classRole) && data.memberAccepted === 1 && data.classAccepted === 1) {
                setClassMemberState(data);
            }
        });
    };

    const isValidRole = (role) => {
        if (role === 'teacher' || role === 'supporter' || role === 'student') {
            return true;
        }
        return false;
    };

    useEffect(() => {
        loadUserData();
    }, [location]);

    return (
        <Card className="relative w-full h-full flex flex-col">
            <div className="absolute top-0 right-0 bg-white opacity-50">
                <IconButton onClick={close}>
                    <FontAwesomeIcon icon={faXmarkCircle} />
                </IconButton>
            </div>
            <CardContent className="flex-1">
                <Typography variant="body2" color="text.secondary">
                    <div className="flex flex-col">
                        <div className="w-full mb-2">
                            <TextField
                                size="small"
                                className="w-[96%]"
                                label="Người dùng"
                                placeholder="Người dùng"
                                value={searchName}
                                onInput={(e) => {
                                    setSearchName(e.target.value);
                                }}
                            />
                        </div>
                        <p className="flex flex-row justify-between items-center">
                            <b>Bắt đầu</b>
                            {enableEditingState ? (
                                <DateTimePicker
                                    className="h-[40px] w-full md:w-auto flex-1 pl-4"
                                    value={dataState.start}
                                    onChange={(e) => {
                                        setDataState({ ...dataState, start: new Date(e.getTime()) });
                                    }}
                                />
                            ) : (
                                <span className="flex-1 ml-4">{dataState.start.toLocaleString()}</span>
                            )}
                        </p>
                        <p className="flex flex-row justify-between items-center">
                            <b>Kết thúc</b>
                            {enableEditingState ? (
                                <DateTimePicker
                                    className="h-[40px] w-full md:w-auto flex-1 pl-4"
                                    value={dataState.end}
                                    onChange={(e) => {
                                        setDataState({ ...dataState, end: new Date(e.getTime()) });
                                    }}
                                />
                            ) : (
                                <span className="flex-1 ml-4">{dataState.end.toLocaleString()}</span>
                            )}
                        </p>
                        <div>
                            <b className="mr-2">Thời gian</b>{' '}
                            {convertMsToTime(dataState.end.getTime() - dataState.start.getTime())}
                        </div>
                    </div>
                    <ul className="mt-2 flex flex-col w-full overflow-y-scroll">
                        {Object.keys(calendarObj).map((key, index) => {
                            const object = calendarObj[key];
                            if (!search(key)) {
                                return <></>;
                            }

                            if (classMemberState.classRole === 'student' && classMemberState.username !== key) {
                                return <></>;
                            }

                            if (object.classRole !== 'student') {
                                return <></>;
                            }

                            return (
                                <li
                                    className="w-full my-6 flex flex-col rounded-lg bg-slate-50 shadow border border-slate-200 p-4"
                                    key={index}
                                >
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center">
                                            <Avatar src={object.avatar} />
                                            <div className="ml-2 md:ml-4">
                                                {object.fullname || 'username'} ({object.username})
                                            </div>
                                        </div>
                                        <div className="">
                                            <span className="md:block hidden">Thời lượng: </span>
                                            <b>{convertMsToTime(object.time)}</b>
                                        </div>
                                    </div>
                                    <div className="w-full mt-4">
                                        <HistoryLinearWithValueLabel
                                            progress={
                                                (object.time / (dataState.end.getTime() - dataState.start.getTime())) *
                                                100
                                            }
                                        />
                                    </div>
                                    <div className="w-full mt-2 flex flex-col items-end">
                                        <CalendarHistoryDialog
                                            historyList={historyList.filter(
                                                (item) => item.username === object.username,
                                            )}
                                            username={object.username}
                                            date={dataState.start.getTime()}
                                            total={convertMsToTime(object.time)}
                                            progress={
                                                (object.time / (dataState.end.getTime() - dataState.start.getTime())) *
                                                100
                                            }
                                        />
                                    </div>
                                </li>
                            );
                        })}
                        {Object.keys(calendarObj).length === 0 && <div className="">Không có lịch sử</div>}
                    </ul>
                </Typography>
            </CardContent>
        </Card>
    );
}

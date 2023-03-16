import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NormalAccordion from '~/components/NormalAccordion';
import UploadWidget from '~/components/UploadWidget';
import { API_BASE_URL } from '~/constants';
import { classScheduleService } from '~/services/classScheduleService';
import { classService } from '~/services/classService';
import { getConfig } from '~/services/config';
import { weeklyClassScheduleService } from '~/services/weeklyClassScheduleService';

function ClassSettingPage() {
    const location = useLocation();
    const { classId } = useParams();
    const [classDataState, setClassDataState] = useState({});
    const navigate = useNavigate();
    const [uploadFileState, setUploadFileState] = useState(false);

    const [imageState, setImageState] = useState('https://www.gstatic.com/classroom/themes/img_graduation.jpg');

    const columns = [
        { field: 'dateName', headerName: 'Thứ', width: 100 },
        { field: 'startHours', headerName: 'Giờ bắt đầu', width: 130 },
        { field: 'startMinutes', headerName: 'Phút bắt đầu', width: 130 },
        { field: 'endHours', headerName: 'Giờ kết thúc', width: 130 },
        { field: 'endMinutes', headerName: 'Phút kết thúc', width: 130 },
        {
            field: 'id',
            headerName: 'Thao tác',
            width: 160,
            renderCell: (param) => {
                return (
                    <>
                        <Button
                            onClick={(e) => {
                                navigate(`/class/${classId}/schedule-edit/${param.value}`);
                            }}
                        >
                            Sửa
                        </Button>
                        <Button
                            color="error"
                            onClick={(e) => {
                                deleteItem(param.value);
                            }}
                        >
                            Xóa
                        </Button>
                    </>
                );
            },
        },
    ];
    const loadClassData = () => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/public/api/class-intro/${classId}`, config)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 500) {
                    navigate('/class/' + classId);
                } else setClassDataState(data);
            });
    };

    useEffect(() => {
        loadClassData();
    }, [location]);
    const editButtonOnClick = () => {};

    const [classScheduleListState, setClassScheduleListState] = useState([]);

    const loadSchedule = () => {
        classScheduleService.getClassSchedules(classId).then((data) => {
            setClassScheduleListState(data);
        });
    };

    useEffect(() => {
        loadSchedule();
    }, [location]);

    const deleteItem = (id) => {
        classScheduleService.deleteClassSchedule(id).then((data) => {
            loadSchedule();
        });
    };

    useEffect(() => {
        loadWeeklyClassSchedule();
    }, [location]);

    const loadWeeklyClassSchedule = () => {
        weeklyClassScheduleService.getWeeklyClassSchedules().then((data) => {
            if (data.length > 0) {
                setWeeklyClassScheduleState(data);
            }
        });
    };

    const [weeklyClassScheduleState, setWeeklyClassScheduleState] = useState([]);
    const [selectedWeeklyClassSchedule, setSelectedWeeklyClassSchedule] = useState();
    const handleChangeWeeklyClassSchedule = (event) => {
        setSelectedWeeklyClassSchedule(event.target.value);
    };

    const [classScheduleState, setClassScheduleState] = useState({});

    const onInputSchedule = (key, value) => {
        setClassScheduleState((pre) => {
            return { ...pre, [key]: value };
        });
    };

    const addNewClassSchedule = () => {
        let obj = {};
        obj = { ...classScheduleState, weeklyClassScheduleId: selectedWeeklyClassSchedule, classId: classId };
        console.log('THÀNH CÔNG NÈ', obj);
        classScheduleService.postClassSchedule(obj).then((data) => {
            loadSchedule();
            setClassScheduleState({});
        });
    };

    const [startTimeState, setStartTimeState] = useState(new Date());
    const [endTimeState, setEndTimeState] = useState(new Date());

    const [changeDateState, setChangeDateState] = useState(false);
    useEffect(() => {
        if (classDataState.startTime && classDataState.endTime) {
            setStartTimeState(new Date(classDataState.startTime));
            setEndTimeState(new Date(classDataState.endTime));
        }
    }, [classDataState]);

    const changeDateOfClass = () => {
        if (classDataState.startTime && classDataState.endTime) {
            setStartTimeState(new Date(classDataState.startTime));
            setEndTimeState(new Date(classDataState.endTime));
        }
    };

    const [dateError, setDateError] = useState(false);
    const submitChangeTimeOfClass = () => {
        if (startTimeState && endTimeState && startTimeState < endTimeState) {
            const obj = { startTime: startTimeState, endTime: endTimeState, id: classId };
            classService.changeClassTime(obj).then((data) => {
                loadClassData();
                setChangeDateState(false);
                setDateError(false);
            });
        } else {
            setDateError(true);
        }
    };

    const [classVisibleState, setClassVisibleState] = useState(0);
    useEffect(() => {
        if (classDataState) {
            setClassVisibleState(classDataState.visible);
        }
    }, [classDataState]);

    const changeVisible = (state) => {
        if (classVisibleState === 1) {
            setClassVisibleState(0);
            classService.changeClassVisible({ id: classId, visible: classVisibleState }).then((data) => {});
            console.log('??? OK OK');
        } else if (classVisibleState === 0) {
            setClassVisibleState(1);
            classService.changeClassVisible({ id: classId, visible: classVisibleState }).then((data) => {});
            console.log('??? OK OK');
        }
    };

    const changeAvatar = () => {};

    return (
        <div className="p-2 md:p-0">
            <h1 className="font-bold text-xl my-2">Cài đặt</h1>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            onChange={(e) => {
                                changeVisible(e.target.value);
                            }}
                            defaultChecked={classVisibleState === 0}
                        />
                    }
                    label="Ẩn lớp học khỏi trang chính"
                />
            </FormGroup>
            <div className="mt-8">
                <div className="flex flex-row items-center mb-2">
                    <h2 className="text-xl font-bold">Hình nền chủ đề</h2>
                    <div className="ml-6">
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                setUploadFileState(!uploadFileState);
                            }}
                        >
                            <FontAwesomeIcon icon={faPen} />
                        </IconButton>
                    </div>
                </div>
            </div>
            {uploadFileState && (
                <div>
                    <UploadWidget multiple={false} />
                </div>
            )}
            <div className="my-12">
                <h2 className="text-xl font-bold mb-2">Thời gian mở lớp</h2>
                <div className="flex lg:flex-row items-center flex-col">
                    {startTimeState && (
                        <div className="z-[40] w-full md:w-auto md:ml-4">
                            <div className="font-bold">Bắt đầu:</div>
                            <DateTimePicker
                                className="h-[40px] w-full md:w-auto"
                                onChange={(e) => {
                                    setStartTimeState(new Date(e.getTime()));
                                    setChangeDateState(true);
                                }}
                                value={startTimeState}
                            />
                        </div>
                    )}
                    {endTimeState && (
                        <div className="z-[41] w-full md:w-auto md:ml-4">
                            <div className="font-bold">Kết thúc:</div>
                            <DateTimePicker
                                className="h-[40px] w-full md:w-auto"
                                onChange={(e) => {
                                    setEndTimeState(new Date(e.getTime()));
                                    setChangeDateState(true);
                                }}
                                value={endTimeState}
                            />
                        </div>
                    )}
                    {changeDateState && <Button onClick={submitChangeTimeOfClass}>Thay đổi ngày</Button>}
                </div>
                {dateError && <div className="text-red-500">*Ngày nhập không hợp lệ</div>}
            </div>
            <div className="my-4 mt-8">
                <h2 className="text-xl font-bold mb-2">Lịch học</h2>
                <div>
                    <NormalAccordion name="Tạo lịch học">
                        <div className="flex flex-col">
                            <div className="flex flex-col lg:flex-row items-center mb-4">
                                <div className="w-full flex flex-col md:flex-row items-center">
                                    <div className="w-full flex flex-row items-center">
                                        <TextField
                                            value={classScheduleState.startHours}
                                            onInput={(e) => {
                                                onInputSchedule('startHours', e.target.value);
                                            }}
                                            className="w-full"
                                            label="Giờ bắt đầu"
                                        />
                                        <TextField
                                            value={classScheduleState.startMinutes}
                                            onInput={(e) => {
                                                onInputSchedule('startMinutes', e.target.value);
                                            }}
                                            className="w-full"
                                            label="Phút bắt đầu"
                                        />
                                    </div>
                                    <div className="w-full flex flex-row items-center">
                                        <TextField
                                            value={classScheduleState.endHours}
                                            onInput={(e) => {
                                                onInputSchedule('endHours', e.target.value);
                                            }}
                                            className="w-full"
                                            label="Giờ kết thúc"
                                        />
                                        <TextField
                                            value={classScheduleState.endMinutes}
                                            onInput={(e) => {
                                                onInputSchedule('endMinutes', e.target.value);
                                            }}
                                            className="w-full"
                                            label="Phút kết thúc"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Box sx={{ minWidth: 220 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Thứ trong tuần</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedWeeklyClassSchedule}
                                                label="Chủ đề"
                                                onChange={handleChangeWeeklyClassSchedule}
                                            >
                                                {weeklyClassScheduleState.map((weeklyClassSchedule) => (
                                                    <MenuItem
                                                        key={weeklyClassSchedule.id}
                                                        value={weeklyClassSchedule.id}
                                                    >
                                                        {weeklyClassSchedule.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>
                            <Button onClick={addNewClassSchedule} variant="contained" size="large">
                                Thêm
                            </Button>
                        </div>
                    </NormalAccordion>
                </div>
                {classScheduleListState.length > 0 && (
                    <div>
                        <div style={{ height: 280, width: '100%' }}>
                            <DataGrid rows={classScheduleListState} columns={columns} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClassSettingPage;

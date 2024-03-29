import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { classScheduleService } from '~/services/classScheduleService';
import { weeklyClassScheduleService } from '~/services/weeklyClassScheduleService';

function ClassScheduleEditPage() {
    const { classId, scheduleId } = useParams();
    const location = useLocation();

    useEffect(() => {
        loadWeeklyClassSchedule();
    }, [location]);

    const loadSchedule = () => {
        classScheduleService.getClassScheduleByClassScheduleId(scheduleId).then((data) => {
            if (data) {
                setClassScheduleState(data);
                console.log('data.weeklyClassScheduleId', data.weeklyClassScheduleId);
                setSelectedWeeklyClassSchedule(data.weeklyClassScheduleId);
            }
        });
    };

    const loadWeeklyClassSchedule = () => {
        weeklyClassScheduleService.getWeeklyClassSchedules().then((data) => {
            if (data.length > 0) {
                setWeeklyClassScheduleState(data);
            }
        });
    };

    useEffect(() => {
        loadSchedule();
    }, [location]);

    const [weeklyClassScheduleState, setWeeklyClassScheduleState] = useState([]);
    const [selectedWeeklyClassSchedule, setSelectedWeeklyClassSchedule] = useState();
    const handleChangeWeeklyClassSchedule = (event) => {
        setSelectedWeeklyClassSchedule(event.target.value);
    };

    const [classScheduleState, setClassScheduleState] = useState({
        id: 0,
        startHours: 0,
        startMinutes: 0,
        endHours: 0,
        endMinutes: 0,
    });

    const onInputSchedule = (key, value) => {
        setClassScheduleState((pre) => {
            return { ...pre, [key]: value };
        });
    };

    useEffect(() => {}, [classScheduleState]);

    const [minutesError, setMinutesError] = useState('');
    const editClassSchedule = () => {
        let obj = {};

        let valid = true;

        if (classScheduleState.startHours > classScheduleState.endHours) {
            valid = false;
        } else if (classScheduleState.startHours === classScheduleState.endHours) {
            if (classScheduleState.startMinutes >= classScheduleState.endMinutes) {
                valid = false;
            }
        }

        if (
            classScheduleState.startHours < 0 ||
            classScheduleState.startHours > 23 ||
            classScheduleState.endHours < 0 ||
            classScheduleState.endHours > 23
        ) {
            valid = false;
        }

        if (
            classScheduleState.endMinutes < 0 ||
            classScheduleState.endMinutes > 59 ||
            classScheduleState.startMinutes < 0 ||
            classScheduleState.startMinutes > 59
        ) {
            valid = false;
        }

        if (!selectedWeeklyClassSchedule) {
            valid = false;
        }

        obj = { ...classScheduleState, weeklyClassScheduleId: selectedWeeklyClassSchedule, classId: classId };
        if (valid) {
            classScheduleService.putClassSchedule(obj).then((data) => {
                setClassScheduleState({});
                navigate('/class/' + classId + '/setting');
            });
        } else {
            setMinutesError('Thời gian không hợp lệ');
        }
    };

    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/class/' + classId + '/setting');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Trang cài đặt
                </Button>
            </div>
            <div className="flex flex-col lg:flex-row items-center mb-4">
                <div className="w-full flex flex-col md:flex-row items-center">
                    <div className="w-full flex flex-row items-center">
                        <TextField
                            value={classScheduleState.startHours}
                            onInput={(e) => {
                                if (e.target.value >= 0 && e.target.value < 24) {
                                    onInputSchedule('startHours', e.target.value);
                                }
                            }}
                            className="w-full"
                            type="number"
                            label="Giờ bắt đầu"
                        />
                        <TextField
                            value={classScheduleState.startMinutes}
                            onInput={(e) => {
                                if (e.target.value >= 0 && e.target.value < 60) {
                                    onInputSchedule('startMinutes', e.target.value);
                                }
                            }}
                            className="w-full"
                            type="number"
                            label="Phút bắt đầu"
                        />
                    </div>
                    <div className="w-full flex flex-row mt:6 md:mt-0 items-center">
                        <TextField
                            value={classScheduleState.endHours}
                            onInput={(e) => {
                                if (e.target.value >= 0 && e.target.value < 24) {
                                    onInputSchedule('endHours', e.target.value);
                                }
                            }}
                            className="w-full"
                            type="number"
                            label="Giờ kết thúc"
                        />
                        <TextField
                            value={classScheduleState.endMinutes}
                            onInput={(e) => {
                                if (e.target.value >= 0 && e.target.value < 60) {
                                    onInputSchedule('endMinutes', e.target.value);
                                }
                            }}
                            className="w-full"
                            type="number"
                            label="Phút kết thúc"
                        />
                    </div>
                </div>
                <div>
                    {selectedWeeklyClassSchedule && (
                        <Box sx={{ minWidth: 220 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Thứ trong tuần</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedWeeklyClassSchedule}
                                    defaultValue={selectedWeeklyClassSchedule}
                                    label="Chủ đề"
                                    onChange={handleChangeWeeklyClassSchedule}
                                >
                                    {weeklyClassScheduleState.map((weeklyClassSchedule) => (
                                        <MenuItem key={weeklyClassSchedule.id} value={weeklyClassSchedule.id}>
                                            {weeklyClassSchedule.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </div>
            </div>
            {minutesError && <div className="text-red-500">*{minutesError}</div>}
            <Button onClick={editClassSchedule} variant="contained" size="large">
                Sửa
            </Button>
        </div>
    );
}

export default ClassScheduleEditPage;

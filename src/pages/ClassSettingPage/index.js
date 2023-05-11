import { faMoneyBill, faMoneyCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
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
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import DiscountTable from '~/components/DiscountTable';
import AddDiscountDialog from '~/components/DiscountTable/AddDiscountDialog';
import NormalAccordion from '~/components/NormalAccordion';
import UploadWidget from '~/components/UploadWidget';
import { API_BASE_URL } from '~/constants';
import { classMemberService } from '~/services/classMemberService';
import { classScheduleService } from '~/services/classScheduleService';
import { classService } from '~/services/classService';
import { getConfig } from '~/services/config';
import { discountService } from '~/services/discountService';
import { weeklyClassScheduleService } from '~/services/weeklyClassScheduleService';
import ClassDeleteDialog from './ClassDeleteDialog';
import { renderToVND } from '~/utils';
import RevenueTable from '~/components/RevenueTable';
import DeleteScheduleDialog from '~/components/DeleteScheduleDialog';
import UpdatePercentDialog from '~/components/UpdatePercentDialog';

function ClassSettingPage() {
    const location = useLocation();
    const { classId } = useParams();
    const [classDataState, setClassDataState] = useState({});
    const navigate = useNavigate();
    const [uploadFileState, setUploadFileState] = useState(false);

    const [alertSuccess, setAlertSuccess] = useState(false);
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
                        <DeleteScheduleDialog id={param.value} reload={loadSchedule} />
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
                } else {
                    console.log('data.minimumCompletionRate', data, data.minimumCompletionRate);
                    setClassDataState(data);
                    setMinimumCompletionRate(data.minimumCompletionRate);
                }
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
        if (!isNaN(value) && !value.includes(' ')) {
            setClassScheduleState((pre) => {
                return { ...pre, [key]: value };
            });
        }
    };

    const [minutesError, setMinutesError] = useState('');
    const addNewClassSchedule = () => {
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

        if (valid) {
            obj = { ...classScheduleState, weeklyClassScheduleId: selectedWeeklyClassSchedule, classId: classId };
            classScheduleService.postClassSchedule(obj).then((data) => {
                if (data) {
                    loadSchedule();
                    setAlertSuccess(true);
                    setTimeout(() => {
                        setAlertSuccess(false);
                    }, 1000);
                }
            });
        } else {
            setMinutesError('Thời gian không hợp lệ');
        }
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

    const [classVisibleState, setClassVisibleState] = useState();
    useEffect(() => {
        if (classDataState) {
            setClassVisibleState(classDataState.visiable);
        }
    }, [classDataState]);

    const changeVisible = (state) => {
        console.log('classVisibleState', classVisibleState);
        if (classVisibleState === 1) {
            classService.changeClassVisible({ id: classId, visiable: classVisibleState ? 0 : 1 }).then((data) => {
                setClassVisibleState(data.visiable);
            });
        } else if (classVisibleState === 0) {
            classService.changeClassVisible({ id: classId, visiable: classVisibleState ? 0 : 1 }).then((data) => {
                setClassVisibleState(data.visiable);
            });
        }
    };

    const deleteClass = () => {
        const obj = {
            status: 0,
            id: classId,
        };
        classService.changeClassStatus(obj).then((data) => {
            navigate('/home');
        });
    };

    const [userRole, setUserRole] = useState();
    const loadUserData = () => {
        classMemberService.getClassMemberByUserAndClassId(classId).then((data) => {
            if (isValidRole(data.classRole)) {
                setUserRole(data.classRole);
            } else {
                navigate('/class/' + classId);
            }
        });
    };

    const isValidRole = (role) => {
        if (role === 'teacher') {
            return true;
        }
        return false;
    };

    useEffect(() => {
        loadUserData();
    }, [location]);

    const [discountListState, setDiscountListState] = useState([]);
    const loadDiscounts = () => {
        discountService.getAllByClassId(classId).then((data) => {
            if (data.length >= 0) {
                const arr = data.map((item) => {
                    const obj = { ...item };
                    const date = new Date();
                    obj.effective = date.getTime() >= item.startDate && date.getTime() <= item.endDate;
                    return obj;
                });
                setDiscountListState(arr);
            }
        });
    };
    useEffect(() => {
        loadDiscounts();
        loadAllMember();
    }, [location]);

    const [allMember, setAllMember] = useState([]);
    const [allTransaction, setAllTransaction] = useState([]);
    const loadAllMember = () => {
        classMemberService.getClassMemberByClassId(classId).then((data) => {
            if (data.length > 0) {
                setAllMember(data);
                const arr = data
                    .filter((item) => item.transaction)
                    .map((item) => {
                        return item.transaction;
                    });
                setAllTransaction(arr);
            }
        });
    };

    const loadRevenue = () => {
        const tempRevenue = allMember.reduce((pre, cur) => {
            return cur.transaction ? pre + cur.transaction.fee : pre;
        }, 0);
        setRevenue(tempRevenue);
    };

    useEffect(() => {
        loadRevenue();
    }, [allMember]);

    const [revenue, setRevenue] = useState(0);

    const [minimumCompletionRate, setMinimumCompletionRate] = useState();

    return (
        <div className="p-2 md:p-0">
            <h1 className="font-bold text-xl my-2">Cài đặt</h1>
            <AlertSuccessDialog open={alertSuccess} />
            {classVisibleState >= 0 && (
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                onChange={(e) => {
                                    changeVisible(e.target.value);
                                }}
                                value={classVisibleState === 0}
                                defaultChecked={classVisibleState === 0}
                            />
                        }
                        label="Ẩn lớp học khỏi trang chính"
                    />
                </FormGroup>
            )}
            <div className="mt-8 mb-16 w-full">
                <div>Tỉ lệ điểm cần đạt để được cấp chứng nhận</div>
                <TextField
                    className="w-full"
                    type="number"
                    value={minimumCompletionRate}
                    onInput={(e) => {
                        if (e.target.value >= 0 && e.target.value <= 100) {
                            setMinimumCompletionRate(e.target.value);
                        }
                    }}
                    disabled
                />
                <UpdatePercentDialog percent={minimumCompletionRate} setData={setMinimumCompletionRate} />
            </div>
            <div className="my-12 p-4 bg-slate-100 rounded">
                <div className="mb-4">
                    <FontAwesomeIcon icon={faMoneyCheck} className="mr-4" /> Doanh thu: <b>{renderToVND(revenue)}</b>
                </div>
                <RevenueTable data={allTransaction} />
            </div>
            {classDataState.paypalAccount && (
                <div className="my-4">
                    <FontAwesomeIcon className="mr-2" icon={faMoneyBill} />
                    Tài khoản nhận phí: <b>{classDataState.paypalAccount}</b>
                </div>
            )}
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
            <div className="my-12 p-4 bg-slate-100 rounded">
                <div className="flex flex-row items-center mb-2">
                    <h2 className="text-xl font-bold">Giảm giá</h2>
                    <div className="ml-4">
                        <AddDiscountDialog classId={classId} reload={loadDiscounts} />
                    </div>
                </div>
                <DiscountTable data={discountListState} reload={loadDiscounts} />
            </div>
            <div className="my-12 p-4 bg-slate-100 rounded">
                <h2 className="text-xl font-bold mb-2">Thời gian mở lớp</h2>
                <div className="flex lg:flex-row flex-wrap w-full items-center flex-col">
                    {startTimeState && (
                        <div className="z-[40] w-full md:w-[50%]">
                            <div className="font-bold">Bắt đầu:</div>
                            <DateTimePicker
                                className="h-[40px] min-w-full w-full md:w-auto"
                                onChange={(e) => {
                                    setStartTimeState(new Date(e.getTime()));
                                    setChangeDateState(true);
                                }}
                                value={startTimeState}
                            />
                        </div>
                    )}
                    {endTimeState && (
                        <div className="z-[41] w-full md:w-[50%] md:pl-4">
                            <div className="font-bold">Kết thúc:</div>
                            <DateTimePicker
                                className="h-[40px] min-w-full w-full md:w-auto"
                                onChange={(e) => {
                                    setEndTimeState(new Date(e.getTime()));
                                    setChangeDateState(true);
                                }}
                                value={endTimeState}
                            />
                        </div>
                    )}
                    {changeDateState && (
                        <div className="mt-4">
                            <Button variant="contained" onClick={submitChangeTimeOfClass}>
                                Thay đổi ngày
                            </Button>
                        </div>
                    )}
                </div>
                {dateError && <div className="text-red-500">*Ngày nhập không hợp lệ</div>}
            </div>
            <div className="my-4 mt-8 bg-slate-100 rounded p-4">
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
                                    <div className="w-full flex flex-row items-center">
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
                            {minutesError && <div className="text-red-500">*{minutesError}</div>}
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
            <div className="mt-16 mb-4 flex flex-row items-center">
                <Button
                    onClick={(e) => {
                        navigate(`/class/${classId}/setting/edit`);
                    }}
                    variant="outlined"
                    startIcon={<FontAwesomeIcon icon={faPen} />}
                >
                    Thay đổi thông tin cơ bản
                </Button>
                <ClassDeleteDialog />
            </div>
        </div>
    );
}

export default ClassSettingPage;

/*

<div className="my-12 p-4 bg-slate-100 rounded">
                <div className="flex flex-row items-center mb-2">
                    <h2 className="text-xl font-bold">Giảm giá</h2>
                    <div className="ml-4">
                        <AddDiscountDialog classId={classId} reload={loadDiscounts} />
                    </div>
                </div>
                <DiscountTable data={discountListState} reload={loadDiscounts} />
            </div>

*/

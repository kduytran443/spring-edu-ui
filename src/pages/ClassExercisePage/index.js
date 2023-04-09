import {
    Alert,
    AlertTitle,
    Avatar,
    Breadcrumbs,
    Button,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ClassTopic from '~/components/ClassTopic';
import SimpleAccordion from '~/components/SimpleAccordion';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { classMemberService } from '~/services/classMemberService';
import { useState } from 'react';
import { useEffect } from 'react';
import QuestionBankShowList from '~/components/QuestionBankShowList';
import { exerciseService } from '~/services/exerciseService';
import { renderToTime } from '~/utils';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { blue, green, grey, orange } from '@mui/material/colors';
import { useMemo } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';

function ClassExercisePage() {
    const { classId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const navigateToExercise = (exerciseId) => {
        navigate('/class/' + classId + '/exercise/' + exerciseId);
    };
    const [userRole, setUserRole] = useState();
    const loadUserData = () => {
        classMemberService.getClassMemberByUserAndClassId(classId).then((data) => {
            if (data.classRole) {
                setUserRole(data.classRole);
            }
        });
    };

    useEffect(() => {
        loadUserData();
    }, [location]);

    const isValidRole = (role) => {
        if (role === 'teacher' || role === 'supporter') {
            return true;
        }
        return false;
    };

    const [classExerciseList, setClassExerciseList] = useState([]);
    const loadData = () => {
        exerciseService.getExercisesByClassId(classId).then((data) => {
            if (data.length > 0) {
                setClassExerciseList(data);
            }
        });
    };

    const [submittedExercises, setSubmittedExercises] = useState([]);
    const loadSubmittedExerciseData = () => {
        submittedExerciseService.getSubmittedExercisesByUserAndClass(classId).then((data) => {
            if (data.length >= 0) {
                const arr = data.map((item) => {
                    const obj = {
                        ...item.classExcercise,
                        ...item,
                    };

                    obj.mark = {
                        mark: item.mark,
                        max: item.classExcercise.mark,
                    };

                    return obj;
                });
                setSubmittedExercises(arr);
            }
        });
    };

    const getStatus = (obj) => {
        if (obj) {
            if (obj.submitTime) {
                return 1; //1 = đã nộp bài
            } else {
                return -1; //-1 = đã làm nhưng chưa nộp
            }
        } else {
            return 0; //0 = chưa làm
        }
    };

    const checkStatus = (exerciseDataId) => {
        const obj = submittedExercises.find((item) => {
            return item.classExcercise.id === exerciseDataId;
        });

        return getStatus(obj);
    };
    const count = () => {
        const complete = classExerciseList.filter((classExercise) => {
            return checkStatus(classExercise.id) === 1;
        }).length;
        const doing = classExerciseList.filter((classExercise) => {
            return date.getTime() < classExercise.endTime && checkStatus(classExercise.id) === -1;
        }).length;
        const notComplete = classExerciseList.filter((classExercise) => {
            const status = checkStatus(classExercise.id);
            const isAvailable = date.getTime() > classExercise.endTime && (status === 0 || status === -1);
            return isAvailable;
        }).length;
        const opening = classExerciseList.filter((classExercise) => {
            const isAvailable = date.getTime() < classExercise.endTime && checkStatus(classExercise.id) === 0;
            return isAvailable;
        }).length;

        setCountComplete(complete);
        setCountDoing(doing);
        setCountNotComplete(notComplete);
        setCountOpening(opening);
    };
    useEffect(() => {
        loadData();
        loadSubmittedExerciseData();
        count();
        setTimeout(() => {
            setLoadingState(false);
        }, 1000);
    }, [location]);

    useEffect(() => {
        count();
    }, [classExerciseList]);

    const date = new Date();

    const [loadingState, setLoadingState] = useState(true);
    const [countOpening, setCountOpening] = useState(0);
    const [countComplete, setCountComplete] = useState(0);
    const [countDoing, setCountDoing] = useState(0);
    const [countNotComplete, setCountNotComplete] = useState(0);
    const filterParam = searchParams.get('filter');
    const getFilterParam = () => {
        const number = Number(filterParam);
        if (typeof number === 'number') {
            return number;
        } else return 0;
    };
    const [filterSelect, setFilterSelect] = useState(getFilterParam()); //0: all, 1: opening, 2:complete, 3:doing, 4:not complete

    useEffect(() => {
        setFilterSelect(getFilterParam());
    }, [filterParam]);

    return (
        <div>
            {loadingState && <LoadingPageProcess />}
            <div>
                {isValidRole(userRole) && (
                    <div className="bg-slate-100 rounded p-4">
                        <QuestionBankShowList />
                    </div>
                )}
            </div>
            <div className="my-8">
                {isValidRole(userRole) && (
                    <Button
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise-create`);
                        }}
                        size="large"
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon={faFileCirclePlus} />}
                    >
                        Tạo bài tập
                    </Button>
                )}
            </div>
            {isValidRole(userRole) ? (
                <div className="flex md:flex-row flex-col items-stretch">
                    <div
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise?filter=0`);
                        }}
                        className={`flex text-center select-none cursor-pointer flex-col hover:bg-blue-100 duration-200 items-center w-[100%] lg:min-w-[200px]  justify-center p-2 border rounded ${
                            filterSelect === 0 && 'bg-blue-100 shadow shadow-blue-100 border-blue-100'
                        }`}
                    >
                        <Avatar sx={{ bgcolor: blue[500] }}>
                            <AppsIcon />
                        </Avatar>
                        <div>Tất cả ({countOpening + countComplete + countDoing + countNotComplete})</div>
                    </div>
                    <div
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise?filter=1`);
                        }}
                        className={`flex select-none text-center cursor-pointer flex-col hover:bg-blue-100 duration-200 items-center w-[100%] lg:min-w-[200px]  justify-center p-2 border rounded ${
                            filterSelect === 1 && 'bg-blue-100 shadow shadow-blue-100 border-blue-100'
                        }`}
                    >
                        <Avatar sx={{ bgcolor: blue[500] }}>
                            <FactCheckIcon />
                        </Avatar>
                        <div>Đang mở ({countOpening})</div>
                    </div>
                    <div
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise?filter=4`);
                        }}
                        className={`flex select-none text-center cursor-pointer flex-col hover:bg-blue-100 duration-200 items-center w-[100%] lg:min-w-[200px]  justify-center p-2 border rounded ${
                            filterSelect === 4 && 'bg-blue-100 shadow shadow-blue-100 border-blue-100'
                        }`}
                    >
                        <Avatar sx={{ bgcolor: grey[500] }}>
                            <FactCheckIcon />
                        </Avatar>
                        <div>Đã hết thời gian ({countNotComplete})</div>
                    </div>
                </div>
            ) : (
                <div className="flex md:flex-row flex-col items-stretch">
                    <div
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise?filter=0`);
                        }}
                        className={`flex text-center select-none cursor-pointer flex-col hover:bg-blue-100 duration-200 items-center w-[100%] lg:min-w-[200px]  justify-center p-2 border rounded ${
                            filterSelect === 0 && 'bg-blue-100 shadow shadow-blue-100 border-blue-100'
                        }`}
                    >
                        <Avatar sx={{ bgcolor: blue[500] }}>
                            <AppsIcon />
                        </Avatar>
                        <div>Tất cả ({countOpening + countComplete + countDoing + countNotComplete})</div>
                    </div>
                    <div
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise?filter=1`);
                        }}
                        className={`flex select-none text-center cursor-pointer flex-col hover:bg-blue-100 duration-200 items-center w-[100%] lg:min-w-[200px]  justify-center p-2 border rounded ${
                            filterSelect === 1 && 'bg-blue-100 shadow shadow-blue-100 border-blue-100'
                        }`}
                    >
                        <Avatar sx={{ bgcolor: blue[500] }}>
                            <FactCheckIcon />
                        </Avatar>
                        <div>Đang mở ({countOpening})</div>
                    </div>
                    <div
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise?filter=2`);
                        }}
                        className={`flex select-none text-center cursor-pointer flex-col hover:bg-blue-100 duration-200 items-center w-[100%] lg:min-w-[200px]  justify-center p-2 border rounded ${
                            filterSelect === 2 && 'bg-blue-100 shadow shadow-blue-100 border-blue-100'
                        }`}
                    >
                        <Avatar sx={{ bgcolor: green[500] }}>
                            <FactCheckIcon />
                        </Avatar>
                        <div>Đã hoàn thành ({countComplete})</div>
                    </div>
                    <div
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise?filter=3`);
                        }}
                        className={`flex select-none text-center cursor-pointer flex-col hover:bg-blue-100 duration-200 items-center w-[100%] lg:min-w-[200px]  justify-center p-2 border rounded ${
                            filterSelect === 3 && 'bg-blue-100 shadow shadow-blue-100 border-blue-100'
                        }`}
                    >
                        <Avatar sx={{ bgcolor: orange[500] }}>
                            <FactCheckIcon />
                        </Avatar>
                        <div>Đang thực hiện ({countDoing})</div>
                    </div>
                    <div
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise?filter=4`);
                        }}
                        className={`flex select-none text-center cursor-pointer flex-col hover:bg-blue-100 duration-200 items-center w-[100%] lg:min-w-[200px]  justify-center p-2 border rounded ${
                            filterSelect === 4 && 'bg-blue-100 shadow shadow-blue-100 border-blue-100'
                        }`}
                    >
                        <Avatar sx={{ bgcolor: grey[500] }}>
                            <FactCheckIcon />
                        </Avatar>
                        <div>Không hoàn thành ({countNotComplete})</div>
                    </div>
                </div>
            )}
            <div className="my-8">
                {classExerciseList &&
                    classExerciseList.map((classExercise) => {
                        const colorAvatar = {};
                        const isAvailable = date.getTime() < classExercise.endTime;

                        if (isAvailable) {
                            colorAvatar.bgcolor = blue[500];
                        } else {
                            colorAvatar.bgcolor = grey[500];
                        }

                        const resultStatus = checkStatus(classExercise.id);
                        if (resultStatus === 1) {
                            colorAvatar.bgcolor = green[500];
                        } else if (resultStatus === 1) {
                            colorAvatar.bgcolor = orange[500];
                        }

                        let filter = false;
                        if (filterSelect === 0) filter = true;
                        if (filterSelect === 1 && colorAvatar.bgcolor == blue[500]) {
                            filter = true;
                        } else if (filterSelect === 2 && colorAvatar.bgcolor == green[500]) {
                            filter = true;
                        } else if (filterSelect === 3 && colorAvatar.bgcolor == orange[500]) {
                            filter = true;
                        } else if (filterSelect === 4 && colorAvatar.bgcolor == grey[500]) {
                            filter = true;
                        }

                        if (!filter) return <></>;

                        return (
                            <ListItem
                                className={`cursor-pointer ${isAvailable ? 'hover:bg-blue-100' : 'hover:bg-gray-100'}`}
                                onClick={(e) => {
                                    navigate('/class/' + classId + '/exercise/' + classExercise.id);
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={colorAvatar}>
                                        <FactCheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={classExercise.name}
                                    secondary={`Bắt đầu: ${renderToTime(
                                        classExercise.startTime,
                                    )} | Kết thúc: ${renderToTime(classExercise.endTime)}`}
                                />
                            </ListItem>
                        );
                    })}
                {classExerciseList.length === 0 && <div className="text-xl my-4">Không có bài tập nào</div>}
            </div>
        </div>
    );
}

export default ClassExercisePage;

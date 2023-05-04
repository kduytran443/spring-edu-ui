import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { blue, green, grey, orange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { exerciseService } from '~/services/exerciseService';
import { renderToTime } from '~/utils';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { useUser } from '~/stores/UserStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

function WorkPage() {
    const location = useLocation();
    const [classExerciseList, setClassExerciseList] = useState([]);
    const [userData, userDispatch] = useUser();

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
    const [submittedExercises, setSubmittedExercises] = useState([]);
    const [submittedExercisesOfTeacher, setSubmittedExercisesOfTeacher] = useState([]);
    const loadSubmittedExerciseData = () => {
        submittedExerciseService.getSubmittedExercisesByUserId(userData.id).then((data) => {
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
    const loadSubmittedExerciseOfTeacher = () => {
        submittedExerciseService.getSubmittedExercisesForTeacher().then((data) => {
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
                console.log('Teacher ', arr);
                setSubmittedExercisesOfTeacher(arr);
            }
        });
    };

    const load = () => {
        exerciseService.getExercisesByUser().then((data) => {
            if (data.length >= 0) {
                console.log(data);
                setClassExerciseList(data);
            }
        });
    };
    const navigate = useNavigate();
    useEffect(() => {
        load();
    }, [location]);

    useEffect(() => {
        if (userData.id) {
            loadSubmittedExerciseData();
            loadSubmittedExerciseOfTeacher();
        }
    }, [userData]);

    const checkNumber = (exerciseId) => {
        const arr = [...submittedExercisesOfTeacher];
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.isConstructedResponseTest && !item.mark.mark && item.classExcercise.id == exerciseId) {
                count++;
            }
        }
        return count;
    };

    const date = new Date();
    return (
        <div className="w-full">
            <h1 className="font-bold text-2xl mb-10">
                <FontAwesomeIcon icon={faBriefcase} className="mr-4" />
                Việc cần làm
            </h1>
            <div className="w-full">
                <h2 className="font-bold text-xl">Bài cần làm</h2>
                <div className="my-16">
                    {classExerciseList &&
                        classExerciseList.map((classExercise) => {
                            const colorAvatar = {};
                            const resultStatus = checkStatus(classExercise.id);
                            const isAvailable = date.getTime() < classExercise.endTime && resultStatus !== 1;
                            console.log('resultStatus', resultStatus);
                            if (isAvailable) {
                                colorAvatar.bgcolor = blue[500];
                            } else {
                                colorAvatar.bgcolor = grey[500];
                            }

                            if (resultStatus === 1) {
                                colorAvatar.bgcolor = green[500];
                            } else if (resultStatus === 1) {
                                colorAvatar.bgcolor = orange[500];
                            }

                            return isAvailable && classExercise.role === 'student' ? (
                                <ListItem
                                    className={`cursor-pointer ${
                                        isAvailable ? 'hover:bg-blue-100' : 'hover:bg-gray-100'
                                    }`}
                                    onClick={(e) => {
                                        navigate('/class/' + classExercise.classId + '/exercise/' + classExercise.id);
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
                            ) : (
                                <></>
                            );
                        })}
                    {classExerciseList.length === 0 && <div className="text-xl my-4">Không có bài tập nào</div>}
                </div>
            </div>
            <div className="w-full mt-16">
                <h2 className="font-bold text-xl">Bài làm cần chấm</h2>
                <div className="my-8">
                    {classExerciseList &&
                        classExerciseList.map((classExercise) => {
                            const colorAvatar = {};
                            const resultStatus = checkStatus(classExercise.id);
                            let isAvailable = date.getTime() < classExercise.endTime;
                            if (isAvailable) {
                                colorAvatar.bgcolor = blue[500];
                            } else {
                                colorAvatar.bgcolor = grey[500];
                            }

                            if (resultStatus === 1) {
                                colorAvatar.bgcolor = green[500];
                            } else if (resultStatus === 1) {
                                colorAvatar.bgcolor = orange[500];
                            }
                            let number = 0;
                            if (classExercise.role === 'teacher') {
                                number = checkNumber(classExercise.id);
                            }

                            return classExercise.role === 'teacher' && number > 0 ? (
                                <ListItem
                                    className={`cursor-pointer ${
                                        isAvailable ? 'hover:bg-blue-100' : 'hover:bg-gray-100'
                                    }`}
                                    onClick={(e) => {
                                        navigate('/class/' + classExercise.classId + '/exercise/' + classExercise.id);
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={colorAvatar}>
                                            <FactCheckIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={classExercise.name + ` (${number} bài cần chấm)`}
                                        secondary={`Bắt đầu: ${renderToTime(
                                            classExercise.startTime,
                                        )} | Kết thúc: ${renderToTime(classExercise.endTime)}`}
                                    />
                                </ListItem>
                            ) : (
                                <></>
                            );
                        })}
                    {classExerciseList.length === 0 && <div className="text-xl my-4">Không có bài tập nào</div>}
                </div>
            </div>
        </div>
    );
}

export default WorkPage;

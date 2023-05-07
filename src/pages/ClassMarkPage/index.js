import { faCertificate, faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Autocomplete,
    Avatar,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LinearWithValueLabel from '~/components/LinearWithValueLabel';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import { classMemberService } from '~/services/classMemberService';
import { classService } from '~/services/classService';
import { exerciseService } from '~/services/exerciseService';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { renderToTime, showScore } from '~/utils';

const columns = [
    { field: 'name', headerName: 'Bài', width: 260 },
    {
        field: 'isQuizTest',
        headerName: 'Hình thức',
        width: 100,
        renderCell: (param) => {
            return <>{param.value ? 'Trắc nghiệm' : 'Tự luận'}</>;
        },
    },
    {
        field: 'submitTime',
        headerName: 'Thời gian nộp bài',
        width: 180,
        renderCell: (param) => {
            return <>{param.value ? renderToTime(param.value) : 'Chưa nộp'}</>;
        },
    },
    {
        field: 'mark',
        headerName: 'Điểm',
        width: 128,
        renderCell: (param) => {
            return (
                <>
                    {param.value.mark === null ? (
                        ''
                    ) : (
                        <div>
                            {showScore(param.value.mark, 1)} / {param.value.max}
                        </div>
                    )}
                </>
            );
        },
    },
    {
        field: 'effective',
        headerName: 'Tính điểm',
        width: 100,
        renderCell: (param) => {
            return <>{param.value === 1 ? 'Có' : 'Không'}</>;
        },
    },
];

function ClassMarkPage() {
    const { classId } = useParams();
    const [loadingState, setLoadingState] = useState(true);

    const location = useLocation();
    const [submittedExercises, setSubmittedExercises] = useState([]);
    const [exercises, setExercises] = useState([]);

    const loadData = () => {
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

    const loadExercises = () => {
        exerciseService.getExercisesByClassId(classId).then((data) => {
            if (data.length >= 0) {
                setExercises(data);
            }
        });
    };

    const [userRole, setUserRole] = useState({});
    const loadRole = () => {
        classMemberService.getClassMemberByUserAndClassId(classId).then((data) => {
            setUserRole(data);
        });
    };

    const isTeacherRole = () => {
        if (userRole && (userRole.classRole === 'teacher' || userRole.classRole === 'supporter')) {
            return true;
        }
        return false;
    };

    const [classMemberList, setClassMemberList] = useState([]);
    const [classMemberInfoList, setClassMemberInfoList] = useState({});
    const loadAllMember = () => {
        classMemberService.getClassMemberByClassId(classId).then((data) => {
            const arr = data.filter((item) => item.classRole === 'student');
            data.forEach((item) => {
                setClassMemberInfoList((pre) => {
                    return { ...pre, [item.userId]: item };
                });
            });
            setClassMemberList(arr);
        });
    };

    const [submittedExercisesAllMember, setSubmittedExercisesAllMember] = useState({});
    const loadSubmittedExercises = () => {
        setSubmittedExercisesAllMember([]);
        classMemberList.forEach((classMember) => {
            submittedExerciseService
                .getSubmittedExercisesByUserIdAndClassId(classMember.userId, classId)
                .then((data) => {
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
                    setSubmittedExercisesAllMember((pre) => {
                        return { ...pre, [classMember.userId]: arr };
                    });
                });
        });
    };
    const [classDataState, setClassDataState] = useState(null);

    useEffect(() => {
        classService.getClassIntroById(classId).then((data) => {
            if (data.id) {
                setClassDataState(data);
            }
        });
    }, [classId]);

    useEffect(() => {
        loadRole();
        loadData();
        loadExercises();
        setTimeout(() => {
            setLoadingState(false);
        }, 1000);
    }, [location]);

    useEffect(() => {
        if (isTeacherRole()) {
            loadSubmittedExercises();
        }
    }, [classMemberList]);

    useEffect(() => {
        if (isTeacherRole()) {
            loadAllMember();
        }
    }, [userRole]);

    const avargeExerciseMark = useMemo(() => {
        if (exercises) {
            return exercises.reduce((pre, cur) => {
                return pre + cur.mark;
            }, 0);
        } else {
            return 0;
        }
    }, [exercises]);

    const avargeMark = useMemo(() => {
        if (exercises) {
            return submittedExercises.reduce((pre, cur) => {
                return cur.mark.mark ? pre + cur.mark.mark : pre;
            }, 0);
        } else {
            return 0;
        }
    }, [submittedExercises]);

    const avargeEffectiveExerciseMark = useMemo(() => {
        if (exercises) {
            return exercises.reduce((pre, cur) => {
                return cur.effective ? pre + cur.mark : pre;
            }, 0);
        } else {
            return 0;
        }
    }, [exercises]);

    const avargeEffectiveMark = useMemo(() => {
        if (exercises) {
            return submittedExercises
                .filter((item) => item.effective)
                .reduce((pre, cur) => {
                    return cur.mark.mark ? pre + cur.mark.mark : pre;
                }, 0);
        } else {
            return 0;
        }
    }, [submittedExercises]);

    const getAvargeMark = (submittedExercises) => {
        if (exercises) {
            return submittedExercises.reduce((pre, cur) => {
                return cur.mark.mark ? pre + cur.mark.mark : pre;
            }, 0);
        } else {
            return 0;
        }
    };
    const getAvargeEffectiveMark = (submittedExercises) => {
        if (exercises) {
            return submittedExercises
                .filter((item) => item.effective)
                .reduce((pre, cur) => {
                    return cur.mark.mark ? pre + cur.mark.mark : pre;
                }, 0);
        } else {
            return 0;
        }
    };

    const [filterState, setFilterState] = useState({
        grade: 0,
        username: '',
        fullname: '',
    });

    const handleChangeFilter = (e) => {
        setFilterState((pre) => {
            return { ...pre, grade: e.target.value };
        });
    };

    const isSuitableName = (username = '', fullname = '') => {
        let valid = false;
        if (username.includes(filterState.username) || fullname.includes(filterState.fullname)) {
            valid = true;
        }
        return valid;
    };

    return (
        <div className="p-4 md:p-0">
            {loadingState && <LoadingPageProcess />}
            {classDataState && (
                <div className="text-lg text-blue-500 my-4">
                    <FontAwesomeIcon icon={faCertificate} className="mr-2" /> Tỉ lệ tối thiểu đạt chứng nhận:{' '}
                    <b>{classDataState.minimumCompletionRate}%</b>
                </div>
            )}
            {!isTeacherRole() ? (
                <>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={submittedExercises} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                    </div>
                    <div className="w-full mt-6 flex items-center justify-end md:flex-row flex-col">
                        {!!avargeEffectiveExerciseMark && (
                            <div className="w-full p-2">
                                <LinearWithValueLabel
                                    minimumCompletionRate={classDataState.minimumCompletionRate}
                                    progress={showScore((avargeEffectiveMark / avargeEffectiveExerciseMark) * 100, 1)}
                                />
                            </div>
                        )}
                        <div className="p-6  border-slate-300 shadow border rounded text-sm w-full md:w-auto">
                            <div className="mb-2">
                                Điểm trung bình: {showScore(avargeMark)} / {avargeExerciseMark} (
                                {showScore((avargeMark / avargeExerciseMark) * 100, 1)}%)
                            </div>
                            {!!avargeEffectiveExerciseMark && (
                                <div>
                                    Điểm tích lũy: {avargeEffectiveMark} / {avargeEffectiveExerciseMark} (
                                    {showScore((avargeEffectiveMark / avargeEffectiveExerciseMark) * 100, 1)}%)
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full mt-4 flex items-start flex-col">
                    <div className="w-full">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Bộ lọc</FormLabel>
                            <RadioGroup
                                defaultValue="0"
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    defaultChecked
                                    onClick={handleChangeFilter}
                                    value="0"
                                    control={<Radio defaultChecked checked={filterState.grade == 0} />}
                                    label="Tất cả"
                                />
                                <FormControlLabel
                                    value="1"
                                    onClick={handleChangeFilter}
                                    control={<Radio checked={filterState.grade == 1} />}
                                    label="Đạt"
                                />
                                <FormControlLabel
                                    value="2"
                                    onClick={handleChangeFilter}
                                    control={<Radio checked={filterState.grade == 2} />}
                                    label="Không đạt"
                                />
                            </RadioGroup>
                        </FormControl>
                        <div className="w-full mt-2">
                            <TextField
                                className="w-full"
                                label="Tên"
                                placeholder="Username hoặc họ tên"
                                value={filterState.username}
                                onInput={(e) => {
                                    setFilterState((pre) => {
                                        return { ...pre, fullname: e.target.value, username: e.target.value };
                                    });
                                }}
                            />
                        </div>
                    </div>
                    {Object.keys(submittedExercisesAllMember).length > 0 &&
                        Object.keys(submittedExercisesAllMember).map((key) => {
                            const list = submittedExercisesAllMember[key];
                            const obj = classMemberInfoList[key];

                            const avargeEffective = getAvargeEffectiveMark(list);
                            const avargeMark = getAvargeMark(list);

                            let suitableFilter = isSuitableName(obj.username, obj.fullname);
                            if (filterState.grade == 1) {
                                suitableFilter = suitableFilter && avargeEffective >= 50;
                            }
                            if (filterState.grade == 2) {
                                suitableFilter = suitableFilter && avargeEffective < 50;
                            }

                            return suitableFilter ? (
                                <div className="w-full my-4">
                                    <div className="w-full p-4 flex flex-row items-center">
                                        <Avatar src={obj.avatar} />
                                        <div className="ml-4">{obj.fullname}</div>
                                    </div>
                                    <div style={{ height: 320, width: '100%' }}>
                                        <DataGrid rows={list} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                                    </div>
                                    <div className="w-full mt-6 flex items-center justify-end md:flex-row flex-col">
                                        {!!avargeEffectiveExerciseMark && (
                                            <div className="w-full p-2">
                                                <LinearWithValueLabel
                                                    minimumCompletionRate={classDataState.minimumCompletionRate}
                                                    progress={showScore(
                                                        (avargeEffective / avargeEffectiveExerciseMark) * 100,
                                                        1,
                                                    )}
                                                />
                                            </div>
                                        )}
                                        <div className="p-6  border-slate-300 shadow border rounded text-sm w-full md:w-auto">
                                            <div className="mb-2">
                                                Điểm trung bình: {showScore(avargeMark)} / {avargeExerciseMark} (
                                                {showScore((avargeMark / avargeExerciseMark) * 100, 1)}%)
                                            </div>
                                            {!!avargeEffectiveExerciseMark && (
                                                <div>
                                                    Điểm tích lũy: {avargeEffective} / {avargeEffectiveExerciseMark} (
                                                    {showScore(
                                                        (avargeEffective / avargeEffectiveExerciseMark) * 100,
                                                        1,
                                                    )}
                                                    %)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            );
                        })}
                </div>
            )}
        </div>
    );
}

export default ClassMarkPage;

/*
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
];
<div className="my-4">
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Bài tập" />}
    />
</div>
*/

import { faCertificate, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { questionBankService } from '~/services/questionBankService';
import { useUser } from '~/stores/UserStore';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { DataGrid } from '@mui/x-data-grid';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { renderToTime, showScore } from '~/utils';
import { exerciseService } from '~/services/exerciseService';
import LinearWithValueLabel from '../LinearWithValueLabel';
import { certificationService } from '~/services/certificationService';

const columns = [
    { field: 'name', headerName: 'Bài', width: 130 },
    {
        field: 'isQuizTest',
        headerName: 'Hình thức',
        width: 150,
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
        width: 160,
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
        width: 120,
        renderCell: (param) => {
            return <>{param.value === 1 ? 'Có' : 'Không'}</>;
        },
    },
];

export default function CertificationDialog({
    id,
    minimumCompletionRate,
    username,
    fullname,
    userId,
    reload = () => {},
}) {
    const [open, setOpen] = useState(false);
    const [userState, dispatchUserState] = useUser();
    const { classId } = useParams();
    const [grade, setGrade] = useState();
    const [teacherComment, setTeacherComment] = useState('');
    const [submittedExercises, setSubmittedExercises] = useState([]);
    const [exercises, setExercises] = useState([]);

    const loadData = () => {
        submittedExerciseService.getSubmittedExercisesByUserIdAndClassId(userId, classId).then((data) => {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [alert, setAlert] = useState(false);
    const loadCertification = () => {
        if (id) {
        }
    };
    useEffect(() => {
        loadData();
        loadExercises();
        loadCertification();
    }, [open]);

    const handleAgree = () => {
        const obj = {
            avg: (avargeEffectiveMark / avargeEffectiveExerciseMark) * 100,
            comment: teacherComment,
            classDTO: {
                id: classId,
            },
            userId: userId,
        };

        certificationService.post(obj).then((data) => {
            setAlert(true);
            reload();
            setTimeout(() => {
                setAlert(false);
                handleClose();
            }, 1500);
        });
    };

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

    const avargeMark = useMemo(() => {
        if (exercises) {
            return submittedExercises.reduce((pre, cur) => {
                return cur.mark.mark ? pre + cur.mark.mark : pre;
            }, 0);
        } else {
            return 0;
        }
    }, [submittedExercises]);
    const avargeExerciseMark = useMemo(() => {
        if (exercises) {
            return exercises.reduce((pre, cur) => {
                return pre + cur.mark;
            }, 0);
        } else {
            return 0;
        }
    }, [exercises]);

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button startIcon={<FontAwesomeIcon icon={faCertificate} />}>Cấp chứng nhận</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Cấp chứng nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <AlertSuccessDialog open={alert} />
                        <div className="mt-4 md:w-[500px] flex flex-col">
                            <div className="mb-2">
                                Học viên: <b>{fullname}</b> ({username})
                            </div>
                            <div className="flex flex-col items-center">
                                <>
                                    <div style={{ height: 300, width: '100%' }}>
                                        <DataGrid
                                            rows={submittedExercises}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                        />
                                    </div>
                                    <div className="w-full mt-6 flex items-center justify-end flex-col">
                                        {!!avargeEffectiveExerciseMark && (
                                            <div className="w-full p-2">
                                                <LinearWithValueLabel
                                                    progress={showScore(
                                                        (avargeEffectiveMark / avargeEffectiveExerciseMark) * 100,
                                                        1,
                                                    )}
                                                />
                                            </div>
                                        )}
                                        <div className="p-6  border-slate-300 shadow border rounded text-sm w-full w-full">
                                            <div className="mb-2">
                                                Điểm trung bình: {showScore(avargeMark)} / {avargeExerciseMark} (
                                                {showScore((avargeMark / avargeExerciseMark) * 100, 1)}%)
                                            </div>
                                            {!!avargeEffectiveExerciseMark && (
                                                <div>
                                                    Điểm tích lũy: {avargeEffectiveMark} / {avargeEffectiveExerciseMark}{' '}
                                                    (
                                                    {showScore(
                                                        (avargeEffectiveMark / avargeEffectiveExerciseMark) * 100,
                                                        1,
                                                    )}
                                                    %)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            </div>
                            <div className="w-full mt-4">
                                <TextField
                                    className="w-full"
                                    value={teacherComment}
                                    onInput={(e) => {
                                        setTeacherComment(e.target.value);
                                    }}
                                    multiline
                                    minRows={2}
                                    maxRows={4}
                                    label="Nhận xét (optional)"
                                />
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Hủy</Button>
                    </div>
                    <div className="select-none cursor-pointer" autoFocus>
                        {(avargeEffectiveMark / avargeEffectiveExerciseMark) * 100 >= minimumCompletionRate ? (
                            <Button color="primary" onClick={handleAgree} variant="contained">
                                Cấp chứng nhận
                            </Button>
                        ) : (
                            <Button color="error" variant="contained">
                                Không đủ điều kiện cấp chứng nhận
                            </Button>
                        )}
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

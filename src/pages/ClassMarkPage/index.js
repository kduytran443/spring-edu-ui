import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete, TextField } from '@mui/material';
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LinearWithValueLabel from '~/components/LinearWithValueLabel';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import { exerciseService } from '~/services/exerciseService';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { renderToTime, showScore } from '~/utils';

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
            console.log('param.value', param.value);
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

    useEffect(() => {
        loadData();
        loadExercises();
        setTimeout(() => {
            setLoadingState(false);
        }, 1000);
    }, [location]);

    const avargeExerciseMark = useMemo(() => {
        if (exercises) {
            console.log(exercises);
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

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={submittedExercises} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </div>
            {loadingState && <LoadingPageProcess />}
            <div className="w-full mt-6 flex items-center justify-end md:flex-row flex-col">
                {!!avargeEffectiveExerciseMark && (
                    <div className="w-full p-2">
                        <LinearWithValueLabel
                            progress={showScore((avargeEffectiveMark / avargeEffectiveExerciseMark) * 100, 1)}
                        />
                    </div>
                )}
                <div className="p-6  border-slate-300 shadow border rounded">
                    <div className="mb-2">
                        Điểm trung bình: {showScore(avargeMark)} / {avargeExerciseMark} (
                        {showScore((avargeMark / avargeExerciseMark) * 100, 1)}%)
                    </div>
                    {!!avargeEffectiveExerciseMark && (
                        <div>
                            Điểm tích lũy: {avargeEffectiveMark} / {avargeEffectiveExerciseMark} (
                            {showScore((avargeEffectiveMark / avargeEffectiveExerciseMark) * 100, 1)}% )
                        </div>
                    )}
                </div>
            </div>
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

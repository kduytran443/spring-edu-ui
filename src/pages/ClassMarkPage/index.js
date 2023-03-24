import { Autocomplete, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { renderToTime } from '~/utils';

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
            return <>{renderToTime(param.value)}</>;
        },
    },
    {
        field: 'mark',
        headerName: 'Điểm',
        width: 120,
        renderCell: (param) => {
            return (
                <>
                    {param.value.mark === null ? (
                        'Chưa chấm điểm'
                    ) : (
                        <div>
                            {param.value.mark}/{param.value.max}
                        </div>
                    )}
                </>
            );
        },
    },
    {
        field: 'effective',
        headerName: 'Tính điểm',
        width: 160,
        renderCell: (param) => {
            return <>{param.value === 1 ? 'Có' : 'Không'}</>;
        },
    },
];

function ClassMarkPage() {
    const { classId } = useParams();

    const location = useLocation();
    const [submittedExercises, setSubmittedExercises] = useState([]);

    const loadData = () => {
        submittedExerciseService.getSubmittedExercisesByUserAndClassExercise(classId).then((data) => {
            if (data.length >= 0) {
                const arr = data.map((item) => {
                    const obj = {
                        ...item.classExcercise,
                        ...item,
                    };
                    if (obj.isQuizTest) {
                        obj.mark = { mark: obj.quizMark, max: item.classExcercise.mark };
                    } else {
                        obj.mark = { mark: obj.constructedResponseMark, max: item.classExcercise.mark };
                    }

                    return obj;
                });
                setSubmittedExercises(arr);
            }
        });
    };

    useEffect(() => {
        loadData();
    }, [location]);

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={submittedExercises} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
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

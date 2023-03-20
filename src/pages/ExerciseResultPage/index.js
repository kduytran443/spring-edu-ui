import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import { faClock, faMarker, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { exerciseService } from '~/services/exerciseService';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { renderToTime } from '~/utils';

function ExerciseResultPage() {
    const navigate = useNavigate();
    const { classId, exerciseId, submittedExerciseId } = useParams();

    const [submittedExercise, setSubmittedExercise] = useState();
    const loadSubmittedExercise = () => {
        submittedExerciseService.getSubmittedExerciseById(submittedExerciseId).then((data) => {
            if (data) {
                console.log('data', data);
                setSubmittedExercise(data);
            }
        });
    };
    const [exerciseData, setExerciseData] = useState({});
    const loadData = () => {
        exerciseService.getExerciseById(exerciseId).then((data) => {
            if (data.id) {
                setExerciseData(data);
                console.log(data);
            }
        });
    };
    const location = useLocation();
    useEffect(() => {
        loadData();
        loadSubmittedExercise();
    }, [location]);

    return (
        <div className="p-2">
            <div className="mb-[6px]">
                <Button
                    onClick={(e) => {
                        navigate('/class/' + classId + '/exercise');
                    }}
                    startIcon={<FontAwesomeIcon icon={faReply} />}
                >
                    Quay lại
                </Button>
            </div>
            {exerciseData && <h2 className="font-bold mt-2 mb-6 text-2xl">Tên bài thi: {exerciseData.name}</h2>}
            {submittedExercise && exerciseData && (
                <div className="p-4 rounded-lg bg-slate-100 shadow">
                    {exerciseData && submittedExercise && (
                        <div className="font-bold text-xl my-2">
                            Điểm thi: {submittedExercise.quizMark} / {exerciseData.mark}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <div className="my-2">
                            <FontAwesomeIcon icon={faClock} /> Thời gian bắt đầu:{' '}
                            {renderToTime(submittedExercise.startTime)}
                        </div>
                        <div className="my-2">
                            <FontAwesomeIcon icon={faClock} /> Thời gian nộp bài:{' '}
                            {renderToTime(submittedExercise.submitTime)}
                        </div>
                        <div className="my-2">
                            <FontAwesomeIcon icon={faMarker} /> Tính điểm:{' '}
                            {submittedExercise.effective ? 'Có' : 'Không'}
                        </div>
                        <div className="my-2">
                            <FontAwesomeIcon icon={faWpforms} /> Hình thức:{' '}
                            {exerciseData.isQuizTest ? 'Trắc nghiệm' : 'Tự luận'}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExerciseResultPage;

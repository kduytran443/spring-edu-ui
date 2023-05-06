import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import { faClock, faHistory, faMarker, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import { drawQuizService } from '~/services/drawQuizService';
import { exerciseService } from '~/services/exerciseService';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { useUser } from '~/stores/UserStore';
import { renderToTime } from '~/utils';

function GradeTestPage() {
    const navigate = useNavigate();
    const { classId, exerciseId } = useParams();

    const location = useLocation();
    const [exerciseData, setExerciseData] = useState({});
    const loadData = () => {
        exerciseService.getExerciseById(exerciseId).then((data) => {
            if (data.id) {
                setExerciseData(data);
                setTimeout(() => {
                    setLoadingState(false);
                }, 1000);
            }
        });
    };

    const [userState, dispatchUserState] = useUser();
    const [loadingState, setLoadingState] = useState(true);

    const [submittedExerciseList, setSubmittedExerciseList] = useState([]);
    const [submittedExercise, setSubmittedExercise] = useState();
    const [finished, setFinished] = useState(false);
    const loadSubmittedExercise = () => {
        submittedExerciseService.getSubmittedExercisesByUserAndClassExercise(exerciseId).then((data) => {
            if (data.length > 0) {
                const lastestSubmittedExercise = data[data.length - 1];
                if (!lastestSubmittedExercise.submitTime) {
                    setSubmittedExercise(lastestSubmittedExercise);
                } else {
                    setFinished(true);
                    setTimeout(() => {
                        navigate(`/class/${classId}/exercise/${exerciseId}/result/${lastestSubmittedExercise.id}`);
                    }, 800);
                }
                setSubmittedExerciseList(data);
            }
        });
    };
    useEffect(() => {
        loadData();
        loadSubmittedExercise();
    }, [location]);

    const [alertSuccess, setAlertSuccess] = useState(false);
    const continueSubmit = () => {
        navigate(`/class/${classId}/exercise/${exerciseId}/do/${submittedExercise.id}`);
    };
    const submitNewSubmittedExercise = () => {
        const submittedExerciseObj = {
            classExcercise: { id: exerciseId },
        };

        submittedExerciseService.postSubmittedExercise(submittedExerciseObj).then((data) => {
            if (data) {
                if (exerciseData.isQuizTest) {
                    const drawQuizObj = {
                        classExerciseId: exerciseId,
                        quizNumberOfQuestion: exerciseData.quizNumberOfQuestion,
                        submittedExerciseId: data.id,
                    };
                    drawQuizService.post(drawQuizObj).then((drawQuizzes) => {
                        if (drawQuizzes.length > 0) {
                            setAlertSuccess(true);
                            setTimeout(() => {
                                setAlertSuccess(false);
                                navigate(`/class/${classId}/exercise/${exerciseId}/do/${data.id}`);
                            }, 2000);
                        }
                    });
                } else {
                    setAlertSuccess(true);
                    setTimeout(() => {
                        setAlertSuccess(false);
                        navigate(`/class/${classId}/exercise/${exerciseId}/do/${data.id}`);
                    }, 2000);
                }
                setSubmittedExercise(data);
            }
        });
    };

    const calMark = (quizMark, constructedResponseMark) => {
        let result = 0;

        if (quizMark) result += quizMark;
        if (constructedResponseMark) result += constructedResponseMark;

        return result;
    };

    return (
        <div>
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
            <AlertSuccessDialog open={alertSuccess} />

            {loadingState && <LoadingPageProcess />}
            <div>
                <h1 className="font-bold text-2xl my-6">
                    {exerciseData.effective ? 'Bài kiểm tra' : 'Bài tập'}: {exerciseData.name}
                </h1>
                <div className="min-h-[420px] flex flex-col items-center justify-center">
                    <div className="mb-4">
                        <b>Điểm</b>: {exerciseData.mark}
                    </div>
                    <div className="mb-4">
                        {submittedExercise ? (
                            <Button onClick={continueSubmit} variant="contained">
                                Tiếp tục thực hiện
                            </Button>
                        ) : (
                            <>
                                {!finished ? (
                                    <Button onClick={submitNewSubmittedExercise} variant="contained">
                                        Bắt đầu thực hiện
                                    </Button>
                                ) : (
                                    <Button variant="contained" disabled>
                                        Đã hoàn thành
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                    {exerciseData.timeLimit && (
                        <div className="mb-4">
                            <b>
                                <FontAwesomeIcon icon={faClock} /> Thời gian làm bài
                            </b>
                            : {exerciseData.timeLimit} phút
                        </div>
                    )}
                    <div className="mb-4">
                        <b>
                            <FontAwesomeIcon icon={faClock} /> Thời gian bắt đầu:
                        </b>{' '}
                        {renderToTime(exerciseData.startTime)}
                    </div>
                    <div className="mb-4">
                        <b>
                            <FontAwesomeIcon icon={faClock} /> Thời gian kết thúc:
                        </b>{' '}
                        {renderToTime(exerciseData.endTime)}
                    </div>
                    <div className="mb-4">
                        <b>
                            <FontAwesomeIcon icon={faWpforms} /> Hình thức kiểm tra:
                        </b>{' '}
                        {exerciseData.isQuizTest && `Trắc nghiệm (${exerciseData.quizNumberOfQuestion} câu)`}{' '}
                        {exerciseData.isConstructedResponseTest && 'Tự luận'}
                    </div>
                    <div className="mb-4">
                        <b>
                            <FontAwesomeIcon icon={faMarker} /> Tính điểm
                        </b>
                        : {exerciseData.effective === 1 ? 'Có' : 'Không'}
                    </div>
                    {submittedExerciseList.length > 0 && (
                        <div>
                            <h2>
                                <FontAwesomeIcon icon={faHistory} /> Lịch sử làm bài
                            </h2>
                            <div>
                                {submittedExerciseList.map((item, index) => {
                                    return (
                                        <div>
                                            Lần thứ: {index + 1}: Điểm{' '}
                                            {calMark(item.quizMark, item.constructedResponseMark)}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GradeTestPage;

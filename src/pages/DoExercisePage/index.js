import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Countdown from 'react-countdown';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import ChoiceQuestionDetails from '~/components/ChoiceQuestionDetails';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import RichTextEditor from '~/components/RichTextEditor';
import { choiceAnswerSerivce } from '~/services/choiceAnswerSerivce';
import { constructedResponseTestService } from '~/services/constructedResponseTestService';
import { drawQuizService } from '~/services/drawQuizService';
import { exerciseService } from '~/services/exerciseService';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { renderToTime } from '~/utils';

function DoExercisePage() {
    const navigate = useNavigate();
    const { classId, exerciseId, submittedExerciseId } = useParams();
    const location = useLocation();
    const [loadingState, setLoadingState] = useState(true);

    const [exerciseData, setExerciseData] = useState({});
    const loadData = () => {
        exerciseService.getExerciseById(exerciseId).then((data) => {
            if (data.id) {
                setExerciseData(data);
                console.log(data);
            }
        });
    };

    const [submittedExerciseList, setSubmittedExerciseList] = useState([]);
    const [submittedExercise, setSubmittedExercise] = useState();
    const loadSubmittedExercise = () => {
        submittedExerciseService.getSubmittedExercisesByUserAndClassExercise(exerciseId).then((data) => {
            if (data.length > 0) {
                const lastestSubmittedExercise = data[data.length - 1];
                setSubmittedExercise(lastestSubmittedExercise);
                console.log(lastestSubmittedExercise);
            }
        });
    };
    useEffect(() => {
        loadData();
        loadSubmittedExercise();
    }, [location]);

    const [timeLeft, setTimeLeft] = useState();
    useEffect(() => {
        if (submittedExercise) {
            const date = new Date();
            let left = date.getTime() - submittedExercise.startTime;
            left = exerciseData.timeLimit * 60000 - left;
            setTimeLeft(left);
        }
    }, [submittedExercise]);

    const [drawQuizzes, setDrawQuizzes] = useState([]);
    const loadQuiz = () => {
        if (submittedExercise) {
            drawQuizService.getAllBySubmittedExerciseId(submittedExercise.id).then((data) => {
                console.log('5', data);
                if (data.length) {
                    setDrawQuizzes(data);
                }
            });
        }
    };

    const [constructedResponse, setConstructedResponse] = useState({});
    const loadConstructedResponseTest = () => {
        if (submittedExercise) {
            constructedResponseTestService.getByClassExcerciseId(exerciseId).then((data) => {
                if (data.id) {
                    setConstructedResponse(data);
                }
            });
        }
    };

    const setTextData = (data) => {
        setSubmittedExercise((pre) => {
            return {
                ...pre,
                content: data,
            };
        });
    };

    useEffect(() => {
        if (exerciseData.isQuizTest) {
            loadQuiz();
        } else if (exerciseData.isConstructedResponseTest) {
            loadConstructedResponseTest();
        }
    }, [submittedExercise]);

    const endTime = () => {
        console.log('END');
    };

    const [choiceQuestion, setChoiceQuestion] = useState();
    const [selectedChoiceAnswerIds, setSelectedChoiceAnswerIds] = useState([]);
    const selectChoiceQuestion = (choiceQuestionId) => {};
    const [drawQuizId, setDrawQuizId] = useState();

    const selectAnswer = (drawQuizId, answerId) => {
        const ids = [...selectedChoiceAnswerIds];
        let index = ids.find(answerId);
        if (index !== -1) {
            ids.splice(index, 1);
        } else {
            //chưa chọn
            ids.push(answerId);
        }
    };

    const [answeredQuizList, setAnsweredQuizList] = useState([]);
    const isAnswered = async (drawQuizId) => {
        console.log('drawQuizId', drawQuizId);
        let result = false;
        result = await choiceAnswerSerivce.getChoiceAnswerByDrawQuizId(drawQuizId).then((data) => {
            if (data.length > 0) {
                return true;
            }
        });
        return result;
    };

    const [alertSuccess, setAlertSuccess] = useState(false);
    const submit = () => {
        submittedExerciseService
            .submit({ id: submittedExerciseId, content: submittedExercise.content })
            .then((data) => {
                if (data) {
                    setAlertSuccess(true);
                    setTimeout(() => {
                        setAlertSuccess(false);
                        navigate(`/class/${classId}/exercise/${exerciseId}/result/${submittedExerciseId}`);
                    }, 2000);
                }
            });
    };

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
            <div className="w-full flex flex-row items-center justify-between">
                <h1 className="font-bold text-2xl my-6">
                    {exerciseData.effective ? 'Bài kiểm tra' : 'Bài tập'}: {exerciseData.name}
                </h1>
                <div>{timeLeft && <Countdown onComplete={endTime} date={Date.now() + timeLeft} />}</div>
            </div>
            <AlertSuccessDialog open={alertSuccess} />
            <div className="flex flex-row items-start w-full justify-between flex-wrap-reverse md:flex-wrap">
                {choiceQuestion && (
                    <ChoiceQuestionDetails
                        drawQuizId={drawQuizId}
                        selectAnswer={selectAnswer}
                        choiceQuestionId={choiceQuestion}
                    />
                )}
                <div className="flex flex-col items-center w-full">
                    <div className="w-full">
                        {drawQuizzes.map((drawQuiz, index) => {
                            return (
                                <Button
                                    variant={drawQuiz.choiceQuestion.id === choiceQuestion ? 'contained' : 'outlined'}
                                    onClick={
                                        drawQuiz.choiceQuestion.id === choiceQuestion
                                            ? () => {}
                                            : (e) => {
                                                  setChoiceQuestion(drawQuiz.choiceQuestion.id);
                                                  setDrawQuizId(drawQuiz.id);
                                              }
                                    }
                                >
                                    {index + 1}
                                </Button>
                            );
                        })}
                    </div>
                    {exerciseData.isConstructedResponseTest && (
                        <>
                            <div className="w-full">
                                {constructedResponse.content && (
                                    <RichTextEditor disabled data={constructedResponse.content} />
                                )}
                            </div>
                            <div className="w-full">
                                <h3 className="font-bold text-xl mt-10 mb-2">Bài làm của bạn</h3>
                                {submittedExercise && (
                                    <RichTextEditor setData={setTextData} data={submittedExercise.content} />
                                )}
                            </div>
                        </>
                    )}
                    <div className="mt-8">
                        <Button onClick={submit}>Kết thúc làm bài</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoExercisePage;

import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import { faClock, faComment, faHistory, faMarker, faPen, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import { classMemberService } from '~/services/classMemberService';
import { drawQuizService } from '~/services/drawQuizService';
import { exerciseService } from '~/services/exerciseService';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import { useUser } from '~/stores/UserStore';
import { renderToTime } from '~/utils';
import PersonIcon from '@mui/icons-material/Person';
import UserAccordion from '~/components/UserAccordion';
import UserItemCard from '~/components/UserItemCard';
import RichTextEditor from '~/components/RichTextEditor';
import { constructedResponseTestService } from '~/services/constructedResponseTestService';
import GradeDialog from '~/components/GradeDialog';
import { quizService } from '~/services/quizService';
import ClassExerciseDeleteDialog from './ClassExerciseDeleteDialog';
import images from '~/assets/images';

function ClassSpecificExercisePage() {
    const navigate = useNavigate();
    const { classId, exerciseId } = useParams();

    const location = useLocation();
    const [exerciseData, setExerciseData] = useState({});
    const loadData = () => {
        exerciseService.getExerciseById(exerciseId).then((data) => {
            if (data.id) {
                console.log('data', data);
                setExerciseData(data);
                setTimeout(() => {
                    setLoadingState(false);
                }, 1000);
            }
        });
    };

    const [classMembers, setClassMembers] = useState([]);
    const [classRole, setClassRole] = useState();

    const loadClassMembers = () => {
        classMemberService.getClassMemberByClassId(classId).then((data) => {
            if (data.length >= 0) {
                const arr = data.filter((item) => item.classRole === 'student');
                setClassMembers(arr);
            }
        });
    };

    const loadRole = () => {
        classMemberService.getClassMemberByUserAndClassId(classId).then((data) => {
            if (data) {
                setClassRole(data.classRole);
            }
        });
    };

    const [userState, dispatchUserState] = useUser();
    const [loadingState, setLoadingState] = useState(true);

    const [submittedExerciseList, setSubmittedExerciseList] = useState([]);
    const [submittedExercise, setSubmittedExercise] = useState();
    const [finished, setFinished] = useState(false);

    const date = new Date();
    const checkUncomplete = () => {
        if (exerciseData.endTime >= date.getTime()) {
        }
    };

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

    const [submittedExercises, setSubmittedExercises] = useState([]);
    const loadSubmittedExercises = () => {
        submittedExerciseService.getSubmittedExercisesByClassExerciseId(exerciseId).then((data) => {
            if (data.length >= 0) {
                setSubmittedExercises(data);
            }
        });
    };
    const [constructedResponseTest, setConstructedResponseTest] = useState({});
    const loadConstructedResponseTest = () => {
        constructedResponseTestService.getByClassExcerciseId(exerciseId).then((data) => {
            if (data.id) {
                setConstructedResponseTest(data);
            }
        });
    };
    const [quizTest, setQuizTest] = useState({});
    const loadQuizTest = () => {
        quizService.getQuizByClassExcerciseId(exerciseId).then((data) => {
            if (data.id) {
                setQuizTest(data);
            }
        });
    };

    useEffect(() => {
        loadData();
        loadRole();
    }, [location]);

    useEffect(() => {
        console.log('submittedExercise', submittedExercise);
        console.log(
            exerciseData.endTime,
            date.getTime(),
            date.getTime() >= exerciseData.endTime,
            !submittedExercise || !submittedExercise.submitTime,
        );
    }, [submittedExercise]);

    useEffect(() => {
        if (classRole === 'teacher' || classRole === 'supporter') {
            loadClassMembers();
            loadSubmittedExercises();
            if (exerciseData.isQuizTest) {
                loadQuizTest();
            } else {
                loadConstructedResponseTest();
            }
        } else if (classRole === 'student') {
            loadSubmittedExercise();
        }
    }, [classRole]);

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
    const gradeTest = () => {};

    return (
        <div className="p-4 md:p-0">
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
                {!(classRole === 'supporter' || classRole === 'teacher') ? (
                    <div className="min-h-[420px] mt-0 flex md:flex-row md:items-center md:justify-between flex-col justify-evenly">
                        <div className="w-full">
                            <div className="mb-4">
                                <b>Điểm</b>: {exerciseData.mark}
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
                                                    Lần thứ: {index + 1}: Điểm {calMark(item.quizMark, item.mark)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-full flex flex-col items-center justify-center">
                            <div className="max-w-[300px] mb-4">
                                <img alt="" src={images.doTestImage} />
                            </div>
                            <div className="w-full flex flex-col items-center justify-center">
                                {date.getTime() >= exerciseData.endTime &&
                                (!submittedExercise || !submittedExercise.submitTime) ? (
                                    <Button variant="contained" disabled>
                                        Bạn chưa hoàn thành
                                    </Button>
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-full">
                            <div className="mb-4">
                                <b>Điểm</b>: {exerciseData.mark}
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
                        </div>
                        {constructedResponseTest.content && (
                            <div className="my-4">
                                <div className="text-lg font-bold">Đề bài:</div>
                                <RichTextEditor disabled data={constructedResponseTest.content} />
                            </div>
                        )}
                        <div className="flex flex-row items-center">
                            <div className="text-lg font-bold">
                                Số học viên đã làm bài: {submittedExercises.length} / {classMembers.length}
                            </div>
                        </div>
                        {exerciseData.isConstructedResponseTest && (
                            <ul className="w-full">
                                {submittedExercises.map((submittedItem) => {
                                    return (
                                        <li key={submittedItem.userId} className="my-2">
                                            <UserAccordion
                                                userInfo={
                                                    <UserItemCard
                                                        avatar={submittedItem.userAvatar}
                                                        name={submittedItem.username}
                                                        mark={
                                                            submittedItem.mark !== null
                                                                ? Math.round(submittedItem.mark, 3)
                                                                : submittedItem.mark
                                                        }
                                                        submitTime={submittedItem.submitTime}
                                                        maxMark={exerciseData.mark}
                                                    />
                                                }
                                            >
                                                {submittedItem.submitTime && (
                                                    <>
                                                        <div>
                                                            <h3 className="text-xl font-bold">Bài làm:</h3>
                                                            <RichTextEditor disabled data={submittedItem.content} />
                                                        </div>
                                                        <div className="my-4">
                                                            <b>
                                                                <FontAwesomeIcon icon={faComment} /> Lời phê:
                                                            </b>{' '}
                                                            {submittedItem.teacherComment}
                                                        </div>
                                                        {(classRole === 'teacher' || classRole === 'supporter') && (
                                                            <GradeDialog
                                                                submittedExerciseId={submittedItem.id}
                                                                maxMark={exerciseData.mark}
                                                                reload={loadSubmittedExercises}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </UserAccordion>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        {exerciseData.isQuizTest && (
                            <ul className="w-full">
                                {submittedExercises.map((submittedItem) => {
                                    return (
                                        <li key={submittedItem.userId} className="my-2">
                                            <UserAccordion
                                                userInfo={
                                                    <UserItemCard
                                                        avatar={submittedItem.userAvatar}
                                                        name={submittedItem.username}
                                                        mark={Math.round(submittedItem.mark, 3)}
                                                        maxMark={exerciseData.mark}
                                                        submitTime={submittedItem.submitTime}
                                                    />
                                                }
                                            >
                                                {submittedItem.submitTime && (
                                                    <div>
                                                        <FontAwesomeIcon icon={faClock} /> Thời gian nộp:{' '}
                                                        {renderToTime(submittedItem.submitTime)}
                                                    </div>
                                                )}
                                            </UserAccordion>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        <div className="flex flex-row items-center justify-end mt-8">
                            <div className="flex flex-row items-center">
                                <Button
                                    onClick={(e) => {
                                        navigate('/class/' + classId + '/exercise/' + exerciseId + '/edit');
                                    }}
                                    color="primary"
                                    startIcon={<FontAwesomeIcon icon={faPen} />}
                                >
                                    Sửa
                                </Button>
                                <ClassExerciseDeleteDialog />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ClassSpecificExercisePage;

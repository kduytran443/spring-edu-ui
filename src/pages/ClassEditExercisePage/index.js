import { faPen, faPlus, faReply, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UploadFile } from '@mui/icons-material';
import {
    Autocomplete,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AlertFailDialog from '~/components/AlertFailDialog';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { NotificationSocketContext } from '~/components/NotificationSocketProvider';
import RichTextEditor from '~/components/RichTextEditor';
import UploadWidget from '~/components/UploadWidget';
import { categoryService } from '~/services/categoryService';
import { classMemberService } from '~/services/classMemberService';
import { classService } from '~/services/classService';
import { constructedResponseTestService } from '~/services/constructedResponseTestService';
import { exerciseService } from '~/services/exerciseService';
import { notificationService } from '~/services/notificationService';
import { questionBankService } from '~/services/questionBankService';
import { quizService } from '~/services/quizService';

function ClassEditExercisePage() {
    const [nameState, setNameState] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [categoryState, setCategoryState] = useState();
    const [visibleState, setVisibleState] = useState();
    const [textData, setTextData] = useState();
    const [avatar, setAvatar] = useState();
    const [video, setVideo] = useState();
    const [note, setNote] = useState('');
    const { classId, exerciseId } = useParams();

    const location = useLocation();

    const navigate = useNavigate();

    const uploadFile = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setVideo(reader.result);
                    console.log('UPLOAD');
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };
    const uploadImage = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setAvatar(reader.result);
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };

    const [isConstructedResponseTest, setIsConstructedResponseTest] = useState(false);
    const [constructedResponseTestMark, setConstructedResponseTestMark] = useState(0);

    const [isQuizTest, setIsQuizTest] = useState(true);
    const [quizMark, setQuizMark] = useState(0);
    const [questionBankList, setQuestionBankList] = useState([]);
    const [questionBankId, setQuestionBankId] = useState();
    const [numberOfQuestion, setNumberOfQuestion] = useState();
    const [requiredMark, setRequiredMark] = useState();

    const [enableMinutes, setEnableMinutes] = useState(false);
    const [timeLimit, setTimeLimit] = useState();

    const [isEffective, setIsEffective] = useState();

    const onChangeCheckbox = (e, callback) => {
        if (e.target.checked) {
            callback(1);
        } else callback(0);
    };
    const [startTimeState, setStartTimeState] = useState(new Date());
    const [endTimeState, setEndTimeState] = useState(new Date());

    const [classMemberIds, setClassMemberIds] = useState([]);
    const loadClassMemberIds = () => {
        classMemberService.getClassMemberByClassId(classId).then((data) => {
            if (data.length >= 0) {
                const arr = data.filter((item) => item.classRole === 'student').map((item) => item.userId);
                setClassMemberIds(arr);
            }
        });
    };

    useEffect(() => {
        questionBankService.getQuestionBankByClassId(classId).then((data) => {
            if (data.length > 0) {
                setQuestionBankList(data);
            }
        });
        loadClassMemberIds();
    }, [location]);

    const [selectedQuestionBank, setSelectedQuestionBank] = useState({});
    useEffect(() => {
        if (questionBankId) {
            questionBankService.getQuestionBankById(questionBankId).then((data) => {
                if (data.id) {
                    setSelectedQuestionBank(data);
                }
            });
        }
    }, [questionBankId]);

    const clearError = () => {
        setNameError('');
        setConstructedResponseTestMarkError('');
        setTextDataError('');
        setQuizMarkError('');
        setQuestionBankError('');
        setNumberOfQuestionError('');
        setDateError('');
        setTimeLimitError('');
        setExcerciseType('');
        setRequiredMarkError('');
    };

    const [nameError, setNameError] = useState('');
    const [constructedResponseTestMarkError, setConstructedResponseTestMarkError] = useState('');
    const [textDataError, setTextDataError] = useState('');
    const [quizMarkError, setQuizMarkError] = useState('');
    const [questionBankError, setQuestionBankError] = useState('');
    const [numberOfQuestionError, setNumberOfQuestionError] = useState('');
    const [dateError, setDateError] = useState('');
    const [timeLimitError, setTimeLimitError] = useState('');
    const [requiredMarkError, setRequiredMarkError] = useState('');
    const [excerciseType, setExcerciseType] = useState('');
    const [classDataState, setClassDataState] = useState({});

    const [mark, setMark] = useState('');
    useEffect(() => {
        classService.getClassIntroById(classId).then((data) => {
            setClassDataState(data);
        });
        loadData();
    }, [location]);

    const sendContext = useContext(NotificationSocketContext);
    const [alertSuccess, setAlertSuccess] = useState(0);

    const submit = () => {
        if (check()) {
            const obj = {
                startTime: new Date(startTimeState),
                endTime: new Date(endTimeState),
                name: nameState,
                classId: classId,
                mark: mark,
                id: exerciseId,
                requiredMark: requiredMark || 0,
            };

            if (isEffective) {
                obj.effective = 1;
            } else {
                obj.effective = 0;
            }

            if (enableMinutes) {
                obj.timeLimit = timeLimit;
            }

            exerciseService.putExercise(obj).then((data) => {
                if (data.id) {
                    setAlertSuccess(1);
                    setTimeout(() => {
                        setAlertSuccess(0);
                        navigate('/class/' + classId + '/exercise/' + data.id);
                    }, 3000);
                }
            });
        } else {
            setAlertSuccess(-1);
            setTimeout(() => {
                setAlertSuccess(0);
            }, 1000);
        }
    };

    const loadData = () => {
        exerciseService.getExerciseById(exerciseId).then((data) => {
            if (data.id) {
                setIsEffective(data.effective);
                setStartTimeState(data.startTime);
                setEndTimeState(data.endTime);
                setNameState(data.name);
                setMark(data.mark);
                if (data.timeLimit) {
                    setEnableMinutes(true);
                    setTimeLimit(data.timeLimit);
                }
                if (data.isQuizTest) {
                    setIsQuizTest(true);
                    setQuestionBankId(data.questionBankId);
                    setNumberOfQuestion(data.quizNumberOfQuestion);
                    console.log('data.quizNumberOfQuestion', data.quizNumberOfQuestion);
                } else {
                    setIsConstructedResponseTest(true);
                }
            }
        });
    };

    const check = () => {
        let valid = true;

        if (!nameState.trim()) {
            setNameError('Tên không được bỏ trống!');
            valid = false;
        } else {
            setNameError('');
        }

        if (!mark || mark < 0 || mark > 10000) {
            setQuizMarkError('Điểm không hợp lệ');
            valid = false;
        } else {
            setQuizMarkError('');
        }

        if (isQuizTest) {
            if (
                !numberOfQuestion ||
                numberOfQuestion <= 0 ||
                numberOfQuestion > selectedQuestionBank.questionQuantity
            ) {
                setNumberOfQuestionError('Số câu hỏi không hợp lệ');
                valid = false;
            } else {
                setNumberOfQuestionError('');
            }
        }

        if ((enableMinutes && (timeLimit < 0 || timeLimit > 10000)) || (enableMinutes && !timeLimit)) {
            valid = false;
            setTimeLimitError('Thời gian không hợp lệ');
        } else {
            setTimeLimitError('');
        }

        if (
            startTimeState >= endTimeState ||
            (enableMinutes && timeLimit && (endTimeState - startTimeState) / 60000 < timeLimit)
        ) {
            setDateError('Ngày nhập không hợp lệ!');
            valid = false;
        } else {
            setDateError('');
        }

        if (valid) {
            clearError();
        }
        return valid;
    };

    console.log('isEffective', isEffective);

    return (
        <div className="p-2">
            <Button
                onClick={(e) => {
                    navigate('/class/' + classId + '/exercise/' + exerciseId);
                }}
                startIcon={<FontAwesomeIcon icon={faReply} />}
            >
                Quay lại
            </Button>
            <h1 className="font-bold text-2xl my-6">{isEffective ? 'Bài kiểm tra' : 'Bài tập'}</h1>
            <AlertSuccessDialog open={alertSuccess === 1} />
            <AlertFailDialog open={alertSuccess === -1} />
            <div>
                <div className="w-full">
                    {(isEffective === 0 || isEffective === 1) && (
                        <div className="my-6 select-none">
                            <FormControlLabel
                                value={isEffective}
                                onChange={(e) => {
                                    onChangeCheckbox(e, setIsEffective);
                                }}
                                control={<Checkbox defaultChecked={isEffective} />}
                                label="Tích lũy"
                            />
                        </div>
                    )}
                    <h3 className="text-xl font-bold">Tên bài</h3>
                    <div className="w-full">
                        <TextField
                            className="w-full"
                            value={nameState}
                            onInput={(e) => {
                                setNameState(e.target.value);
                            }}
                        />
                        {nameError && <div className="text-red-500">*{nameError}</div>}
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center mt-10 select-none">
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Hình thức kiểm tra</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="quiz"
                        name="radio-buttons-group"
                        onChange={(e) => {
                            if (e.target.value === 'quiz') {
                                setIsQuizTest(true);
                                setIsConstructedResponseTest(false);
                            } else if (e.target.value === 'constructedResponse') {
                                setIsQuizTest(false);
                                setIsConstructedResponseTest(true);
                            }
                        }}
                    >
                        <FormControlLabel disabled value="quiz" control={<Radio />} label="Trắc nghiệm" />
                        <FormControlLabel disabled value="constructedResponse" control={<Radio />} label="Tự luận" />
                    </RadioGroup>
                </FormControl>
            </div>

            <div className="mt-16">
                {isQuizTest && (
                    <>
                        <div className="my-4">
                            {questionBankList.length > 0 ? (
                                <div className="my-2">Chọn ngân hàng câu hỏi</div>
                            ) : (
                                <div className="my-2">Chưa có ngân hàng câu hỏi</div>
                            )}
                            {questionBankList.length > 0 && questionBankId && (
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Ngân hàng câu hỏi</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={questionBankId}
                                            defaultValue={questionBankId}
                                            label="Chủ đề"
                                            disabled
                                            onChange={(e) => {
                                                setQuestionBankId(e.target.value);
                                            }}
                                        >
                                            {questionBankList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </div>
                        {questionBankError && <div className="text-red-500">*{questionBankError}</div>}
                        <div className="my-6">
                            <div>Số câu hỏi kiểm tra</div>
                            <div className="flex flex-row items-center">
                                <TextField
                                    value={numberOfQuestion}
                                    disabled
                                    onChange={(e) => {
                                        setNumberOfQuestion(e.target.value);
                                    }}
                                    className="w-[120px]"
                                    variant="standard"
                                    type="number"
                                />
                                <div>/ {selectedQuestionBank.questionQuantity}</div>
                            </div>
                            {numberOfQuestionError && <div className="text-red-500">*{numberOfQuestionError}</div>}
                        </div>
                    </>
                )}
                <div className="flex flex-row items-center mt-8">
                    <div className="">
                        <TextField
                            value={mark}
                            disabled
                            onInput={(e) => {
                                setMark(e.target.value);
                            }}
                            id="standard-basic"
                            label="Điểm"
                            variant="standard"
                            type={'number'}
                        />
                        {quizMarkError && <div className="text-red-500">*{quizMarkError}</div>}
                    </div>
                </div>
                <div className="z-[41] w-full mt-8 flex flex-row flex-wrap items-center md:w-auto">
                    <div className="z-[40] w-full md:w-auto">
                        <div className="font-bold">Bắt đầu:</div>
                        <DateTimePicker
                            className="h-[40px] w-full md:w-auto"
                            onChange={(e) => {
                                setStartTimeState(new Date(e.getTime()));
                            }}
                            value={new Date(startTimeState)}
                        />
                    </div>
                    <div className="z-[40] w-full md:w-auto md:ml-4">
                        <div className="font-bold">Kết thúc:</div>
                        <DateTimePicker
                            className="h-[40px] w-full md:w-auto"
                            onChange={(e) => {
                                setEndTimeState(new Date(e.getTime()));
                            }}
                            value={new Date(endTimeState)}
                        />
                    </div>
                </div>
                {dateError && <div className="text-red-500">*{dateError}</div>}
                <div className="mt-10">
                    {timeLimit && (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={enableMinutes}
                                    onChange={(e) => {
                                        onChangeCheckbox(e, setEnableMinutes);
                                    }}
                                    defaultChecked={enableMinutes}
                                />
                            }
                            label="Bật số phút giới hạn làm bài"
                        />
                    )}
                    {enableMinutes && (
                        <TextField
                            value={timeLimit}
                            onChange={(e) => {
                                setTimeLimit(e.target.value);
                            }}
                            type={'number'}
                            className="w-[120px]"
                            variant="standard"
                        />
                    )}
                </div>
                {timeLimitError && <div className="text-red-500">*{timeLimitError}</div>}
            </div>

            {excerciseType && <div className="mt-10 text-red-500">*{excerciseType}</div>}
            <div className="mt-6">
                <Button
                    onClick={(e) => {
                        check();
                    }}
                    startIcon={<FontAwesomeIcon icon={faSearch} />}
                >
                    Kiểm tra dữ liệu
                </Button>
            </div>
            <div
                onClick={submit}
                className="w-full mt-10 p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
            >
                <FontAwesomeIcon icon={faPen} className="mr-2" /> Sửa
            </div>
        </div>
    );
}

export default ClassEditExercisePage;

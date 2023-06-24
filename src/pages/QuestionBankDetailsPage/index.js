import {
    faCircleQuestion,
    faEye,
    faFileCircleQuestion,
    faPlus,
    faQuestion,
    faReply,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Avatar,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ChoiceQuestionDetailsDeleteDialog from '~/components/ChoiceQuestionDetailsDeleteDialog';
import ChoiceQuestionDetailsDialog from '~/components/ChoiceQuestionDetailsDialog';
import ChoiceQuestionEditDetailsDialog from '~/components/ChoiceQuestionEditDetailsDialog';
import ChoiceQuestionViewDetailsDialog from '~/components/ChoiceQuestionViewDetailsDialog';
import CustomFilePreview from '~/components/CustomFilePreview';
import QuestionBankCreateDialog from '~/components/QuestionBankCreateDialog';
import QuestionBankDeleteDialog from '~/components/QuestionBankDeleteDialog';
import QuestionBankEditDialog from '~/components/QuestionBankEditDialog';
import QuestionBankItem from '~/components/QuestionBankItem';
import RichTextEditor from '~/components/RichTextEditor';
import ShowTextData from '~/components/ShowTextData';
import TableChoiceQuestion from '~/components/TableChoiceQuestion';
import { QUESTION_BANK_URL } from '~/constants';
import { choiceAnswerSerivce } from '~/services/choiceAnswerSerivce';
import { choiceQuestionSerivce } from '~/services/choiceQuestionSerivce';
import { questionBankService } from '~/services/questionBankService';
import { useUser } from '~/stores/UserStore';

function QuestionBankDetailsPage() {
    const location = useLocation();

    const { questionBankId } = useParams();
    const [questionBankState, setQuestionBankState] = useState([]);
    const navigate = useNavigate();
    const [userState, dispatchUserState] = useUser();

    const [choiceQuestionList, setChoiceQuestionList] = useState([]);

    const loadData = () => {
        questionBankService.getQuestionBankById(questionBankId).then((data) => {
            setQuestionBankState(data);
        });
    };

    useEffect(() => {
        if (userState.id) {
            loadData();
            loadQuestion();
        }
    }, [location, userState]);

    const loadQuestion = () => {
        choiceQuestionSerivce.getChoiceQuestionsByQuestionBankId(questionBankId).then((data) => {
            if (data.length > 0) {
                setChoiceQuestionList(data);
            }
        });
    };

    const [newQuestionName, setNewQuestionName] = useState('');
    const [newQuestionContent, setNewQuestionContent] = useState('');
    const [newQuestionImportant, setNewQuestionImportant] = useState(0);
    const [newQuestionFile, setNewQuestionFile] = useState();

    const setData = (data) => {
        setNewQuestionContent(data);
    };

    const [choiceAnswerController, setChoiceAnswerController] = useState([]);

    const [questionNameError, setQuestionNameError] = useState('');
    const [questionAnswerError, setQuestionAnswerError] = useState('');

    //text, image, audio
    const addNewAnswer = () => {
        const arr = [...choiceAnswerController];
        arr.push({
            content: '',
            correct: 0,
            type: 'text',
        });
        setChoiceAnswerController(arr);
        clear();
    };

    const handleChangeImportant = (e) => {
        if (e.target.checked) {
            setNewQuestionImportant(1);
        } else {
            setNewQuestionImportant(0);
        }
    };

    const handleChangeCorrect = (index, e) => {
        const arr = [...choiceAnswerController];
        const obj = arr[index];
        if (e.target.checked) {
            obj.correct = 1;
        } else {
            obj.correct = 0;
        }
        setChoiceAnswerController(arr);
    };

    const handleChangeType = (index, e) => {
        const arr = [...choiceAnswerController];
        const obj = arr[index];
        obj.type = e.target.value;
        obj.content = '';
        setChoiceAnswerController(arr);
    };

    const handleChangeContent = (index, e) => {
        const arr = [...choiceAnswerController];
        const obj = arr[index];
        obj.content = e.target.value;
        setChoiceAnswerController(arr);
    };

    const deleteByIndex = (index, e) => {
        const arr = [...choiceAnswerController];
        if (index > -1) {
            arr.splice(index, 1);
        }
        setChoiceAnswerController(arr);
        clear();
    };

    const uploadFile = (index, e) => {
        const files = e.target.files;
        const file = files[0];
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const arr = [...choiceAnswerController];
                const obj = arr[index];
                obj.content = reader.result;
                setChoiceAnswerController(arr);
            };
            reader.onerror = (error) => {
                console.log('error uploading!');
            };
        }
    };

    const clearDataNewQuestion = () => {
        setChoiceAnswerController([]);
        setNewQuestionContent('');
        setNewQuestionName('');
    };

    const clear = () => {
        setQuestionNameError('');
        setQuestionAnswerError('');
    };

    const [submitSuccessfully, setSubmitSuccessfully] = useState(false);
    const submitNewQuestion = () => {
        let valid = true;
        if (!newQuestionName.trim()) {
            setQuestionNameError('Tên không hợp lệ');
            valid = false;
        }

        let withoutCorrectAnswer = true;
        choiceAnswerController.forEach((item) => {
            if (item.correct) {
                withoutCorrectAnswer = false;
            }
        });
        if (withoutCorrectAnswer) {
            setQuestionAnswerError('Chưa có đáp án ĐÚNG nào!');
            valid = false;
        }

        if (choiceAnswerController.length === 0) {
            setQuestionAnswerError('Chưa có đáp án nào!');
            valid = false;
        }

        if (valid) {
            const choiceQuestionObj = {
                questionBank: questionBankId,
                name: newQuestionName.trim(),
                content: newQuestionContent,
                important: newQuestionImportant,
            };

            if (newQuestionFile) {
                choiceQuestionObj.file = newQuestionFile;
            }

            choiceQuestionSerivce.postChoiceQuestion(choiceQuestionObj).then((data) => {
                if (data.id) {
                    const choiceQuestionId = data.id;
                    choiceAnswerController.forEach((choiceAnswer) => {
                        const obj = {
                            choiceQuestionId: choiceQuestionId,
                            type: choiceAnswer.type,
                            correct: choiceAnswer.correct,
                            content: choiceAnswer.content,
                        };
                        choiceAnswerSerivce.postChoiceAnswer(obj).then((data) => {});
                    });
                    loadQuestion();
                    clearDataNewQuestion();
                    setSubmitSuccessfully(true);
                    setTimeout(() => {
                        setSubmitSuccessfully(false);
                    }, 2000);
                }
            });
        }
    };

    const columns = useMemo(() => {
        return [
            { field: 'name', headerName: 'Tên câu hỏi', width: 320 },
            {
                field: 'content',
                headerName: 'Nội dung',
                width: 320,
                renderCell: (param) => {
                    return (
                        <div>
                            <ShowTextData data={param.value} />
                        </div>
                    );
                },
            },
            {
                field: 'important',
                headerName: 'Quan trọng',
                width: 120,
                renderCell: (param) => {
                    return <div>{param.value === 1 ? 'Có' : 'Không'}</div>;
                },
            },
            {
                field: 'id',
                headerName: 'Thao tác',
                width: 300,
                renderCell: (param) => {
                    return (
                        <>
                            <div className="mr-4">
                                <ChoiceQuestionViewDetailsDialog choiceQuestionId={param.value} />
                            </div>
                            <div className="mr-4">
                                <ChoiceQuestionEditDetailsDialog reload={loadQuestion} choiceQuestionId={param.value} />
                            </div>
                            <div>
                                <ChoiceQuestionDetailsDeleteDialog
                                    reload={loadQuestion}
                                    choiceQuestionId={param.value}
                                />
                            </div>
                        </>
                    );
                },
            },
        ];
    }, []);

    const uploadFileQuestion = (e) => {
        const files = e.target.files;
        const file = files[0];
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const obj = {
                    type: file.type,
                    size: file.size,
                    name: file.name,
                    data: reader.result,
                };

                setNewQuestionFile(obj);
            };
            reader.onerror = (error) => {
                console.log('error uploading!');
            };
        }
    };

    return (
        <div className="p-4">
            <div className="mb-[6px]">
                <Button
                    onClick={(e) => {
                        navigate(QUESTION_BANK_URL);
                    }}
                    startIcon={<FontAwesomeIcon icon={faReply} />}
                >
                    Trang chủ
                </Button>
            </div>
            <h1 className="font-bold text-xl my-6 md:my-2">Ngân hàng câu hỏi</h1>
            <h1 className="my-4 font-bold text-gray-700 text-3xl flex flex-row items-center">
                <FontAwesomeIcon className="mr-4" icon={faFileCircleQuestion} />
                <div className="break-all flex-1">{questionBankState.name}</div>
                <div className="ml-8">
                    <QuestionBankEditDialog questionBankId={questionBankId} reload={loadData} />
                </div>
            </h1>
            <div className="w-full">
                <div
                    className={`w-full p-2 md:p-8 border duration-200 border-slate-200 shadow rounded-lg ${
                        submitSuccessfully ? 'bg-green-300' : ''
                    }`}
                >
                    <div className="font-bold text-xl mb-2 w-full">Câu hỏi mới</div>
                    <div className="w-full">
                        <div>Tên câu hỏi</div>
                        <TextField
                            value={newQuestionName}
                            onInput={(e) => {
                                clear();
                                setNewQuestionName(e.target.value);
                            }}
                            size="small"
                            className="w-full"
                        />
                        {questionNameError && <div className="text-red-500">*{questionNameError}</div>}
                    </div>
                    <div className="w-full mt-4">
                        <div>Nội dung</div>
                        <RichTextEditor data={newQuestionContent} setData={setData} />
                    </div>
                    <div className="w-full mt-4 mb-2">
                        <input className="w-full" onChange={uploadFileQuestion} type="file" />
                        {newQuestionFile && <CustomFilePreview fileData={newQuestionFile} />}
                    </div>
                    <div>
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeImportant} checked={newQuestionImportant === 1} />}
                            label="Quan trọng"
                        />
                    </div>
                    {choiceAnswerController.map((choiceAnswer, index) => {
                        return (
                            <div key={index} className="w-full bg-slate-100 p-4 rounded my-8 md:my-6">
                                <div className="flex flex-col-reverse md:flex-row items-center">
                                    <div className="flex flex-col w-full">
                                        {choiceAnswer.type === 'text' && (
                                            <TextField
                                                className="w-full"
                                                id="standard-basic"
                                                multiline
                                                rows={2}
                                                label={'Đáp án ' + (index + 1)}
                                                variant="standard"
                                                value={choiceAnswer.content}
                                                onInput={(e) => {
                                                    handleChangeContent(index, e);
                                                }}
                                            />
                                        )}
                                        {choiceAnswer.type === 'image' && (
                                            <>
                                                <input
                                                    className="w-full"
                                                    onChange={(e) => {
                                                        uploadFile(index, e);
                                                    }}
                                                    type="file"
                                                    accept="image/*"
                                                />
                                                {choiceAnswer.content && (
                                                    <div className="max-h-[240px] overflow-hidden">
                                                        <img alt="image" src={choiceAnswer.content} />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {choiceAnswer.type === 'audio' && (
                                            <>
                                                <input
                                                    className="w-full"
                                                    type="file"
                                                    onChange={(e) => {
                                                        uploadFile(index, e);
                                                    }}
                                                    accept="audio/mp3,audio/*;capture=microphone"
                                                />
                                                {choiceAnswer.content && (
                                                    <audio
                                                        className="w-full"
                                                        style={{ width: '100%' }}
                                                        controls
                                                        preload="auto"
                                                        autobuffer
                                                        src={choiceAnswer.content}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label-gender-signup">Loại</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="select-label-gender-signup"
                                            id="select-gender-signup"
                                            value={choiceAnswer.type}
                                            label="Loại"
                                            onChange={(e) => handleChangeType(index, e)}
                                        >
                                            <MenuItem value={'text'}>Text</MenuItem>
                                            <MenuItem value={'audio'}>Âm thanh</MenuItem>
                                            <MenuItem value={'image'}>Hình ảnh</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="w-full flex mt-4 flex-row items-center justify-between">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={(e) => {
                                                    handleChangeCorrect(index, e);
                                                }}
                                                checked={choiceAnswer.correct === 1}
                                            />
                                        }
                                        label="Đúng"
                                    />
                                    <div className="ml-8">
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={(e) => {
                                                deleteByIndex(index, e);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {questionAnswerError && <div className="text-red-500 my-4">*{questionAnswerError}</div>}
                    <div className="w-full flex flex-col justify-center">
                        <div className="flex flex-row items-center">
                            <IconButton onClick={addNewAnswer}>
                                <FontAwesomeIcon icon={faPlus} />
                            </IconButton>
                            Đáp án
                        </div>
                    </div>
                    <div className="w-full flex mt-16 md:mt-8 flex-col justify-center items-center">
                        <div
                            onClick={submitNewQuestion}
                            className="w-full md:w-[75%] p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Tạo câu hỏi
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="mt-10 font-bold text-xl">
                Danh sách <span className="text-blue-500">{choiceQuestionList.length}</span> câu hỏi:
            </h3>
            <div className="w-full mt-2">
                {choiceQuestionList && <TableChoiceQuestion rows={choiceQuestionList} columns={columns} />}
            </div>
            <div className="mt-12">
                <QuestionBankDeleteDialog questionBankId={questionBankId} />
            </div>
        </div>
    );
}

export default QuestionBankDetailsPage;

import {
    faCircleQuestion,
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
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import QuestionBankCreateDialog from '~/components/QuestionBankCreateDialog';
import QuestionBankItem from '~/components/QuestionBankItem';
import RichTextEditor from '~/components/RichTextEditor';
import ShowTextData from '~/components/ShowTextData';
import { QUESTION_BANK_URL } from '~/constants';
import { choiceAnswerSerivce } from '~/services/choiceAnswerSerivce';
import { choiceQuestionSerivce } from '~/services/choiceQuestionSerivce';
import { questionBankService } from '~/services/questionBankService';

function QuestionBankDetailsPage() {
    const location = useLocation();
    const { questionBankId } = useParams();
    const [questionBankState, setQuestionBankState] = useState([]);

    const [choiceQuestionList, setChoiceQuestionList] = useState([]);

    useEffect(() => {
        loadQuestion();
    }, [location]);

    const loadQuestion = () => {
        choiceQuestionSerivce.getChoiceQuestionsByQuestionBankId(questionBankId).then((data) => {
            if (data.length > 0) {
                setChoiceQuestionList(data);
            }
        });
    };

    const navigate = useNavigate();

    const [newQuestionName, setNewQuestionName] = useState('');
    const [newQuestionContent, setNewQuestionContent] = useState('');

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
        console.log('arr', arr);
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
                //reader.result file.size file.name
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

    const clear = () => {
        setQuestionNameError('');
        setQuestionAnswerError('');
    };

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
            };
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
                }
            });
        }
    };

    const columns = [
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
            field: 'id',
            headerName: 'Thao tác',
            width: 160,
            renderCell: (param) => {
                return (
                    <Link to={'/choice-question/' + param.value}>
                        <div className="font-bold text-blue-500 shadow-blue-300 underline">Chi tiết</div>
                    </Link>
                );
            },
        },
    ];

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
            <h1 className="my-4 font-bold text-gray-700 text-3xl">
                <FontAwesomeIcon icon={faFileCircleQuestion} /> {questionBankState.name}
            </h1>
            <div className="w-full">
                <div className="w-full p-8 border border-slate-200 shadow rounded-lg">
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
                        <RichTextEditor setData={setData} />
                    </div>
                    {choiceAnswerController.map((choiceAnswer, index) => {
                        return (
                            <div key={index} className="w-full bg-slate-100 p-4 rounded my-8 md:my-6">
                                <div className="flex flex-col-reverse md:flex-row items-center">
                                    {choiceAnswer.type === 'text' && (
                                        <TextField
                                            className="w-full"
                                            id="standard-basic"
                                            label={'Đáp án ' + (index + 1)}
                                            variant="standard"
                                            value={choiceAnswer.content}
                                            onInput={(e) => {
                                                handleChangeContent(index, e);
                                            }}
                                        />
                                    )}
                                    {choiceAnswer.type === 'image' && (
                                        <input
                                            className="w-full"
                                            onChange={(e) => {
                                                uploadFile(index, e);
                                            }}
                                            type="file"
                                            accept="image/*"
                                        />
                                    )}
                                    {choiceAnswer.type === 'audio' && (
                                        <input
                                            className="w-full"
                                            type="file"
                                            onChange={(e) => {
                                                uploadFile(index, e);
                                            }}
                                            accept="audio/mp3,audio/*;capture=microphone"
                                        />
                                    )}
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
                    <div className="w-full flex flex-col justify-center items-center">
                        <div
                            onClick={submitNewQuestion}
                            className="w-full md:w-[75%] mt-8 p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
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
                {choiceQuestionList && (
                    <div className="bg-white" style={{ height: 480, width: '100%' }}>
                        <DataGrid rows={choiceQuestionList} columns={columns} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionBankDetailsPage;

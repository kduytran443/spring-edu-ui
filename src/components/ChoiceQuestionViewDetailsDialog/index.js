import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { choiceAnswerSerivce } from '~/services/choiceAnswerSerivce';
import { choiceQuestionSerivce } from '~/services/choiceQuestionSerivce';
import { questionBankService } from '~/services/questionBankService';
import AlertFailDialog from '../AlertFailDialog';
import AlertSuccessDialog from '../AlertSuccessDialog';
import DialogProcessLoading from '../DialogProcessLoading';
import LoadingPageProcess from '../LoadingPageProcess';
import RichTextEditor from '../RichTextEditor';
import ShowTextData from '../ShowTextData';
import CustomFilePreview from '../CustomFilePreview';

export default function ChoiceQuestionViewDetailsDialog({ choiceQuestionId, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [loadingState, setLoadingState] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
        setDeletedChoiceAnswerId([]);
        setLoadingState(true);
        setAlert(0);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newQuestionName, setNewQuestionName] = useState('');
    const [newQuestionContent, setNewQuestionContent] = useState('');
    const [newQuestionFile, setNewQuestionFile] = useState();
    const [questionId, setQuestionId] = useState();

    const [questionNameError, setQuestionNameError] = useState('');
    const [questionAnswerError, setQuestionAnswerError] = useState('');
    const [deletedChoiceAnswerId, setDeletedChoiceAnswerId] = useState([]);
    const [newQuestionImportant, setNewQuestionImportant] = useState(0);

    const setData = (data) => {
        setNewQuestionContent(data);
    };

    const [choiceAnswerController, setChoiceAnswerController] = useState([]);

    const loadQuestion = () => {
        choiceQuestionSerivce.getChoiceQuestionsById(choiceQuestionId).then((data) => {
            if (data.id) {
                setQuestionId(data.id);
                setNewQuestionName(data.name);
                setNewQuestionContent(data.content);
                setNewQuestionImportant(data.important);
                if (data.file) setNewQuestionFile(data.file);
                setTimeout(() => {
                    setLoadingState(false);
                }, 500);
            }
        });
    };
    const [alert, setAlert] = useState(0);
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
                name: newQuestionName.trim(),
                content: newQuestionContent,
                id: questionId,
                important: newQuestionImportant,
            };

            choiceQuestionSerivce.putChoiceQuestion(choiceQuestionObj).then((data) => {
                if (data.id) {
                    let result = true;
                    const choiceQuestionId = data.id;
                    choiceAnswerController.forEach((choiceAnswer) => {
                        const obj = {
                            choiceQuestionId: choiceQuestionId,
                            id: choiceAnswer.id,
                            type: choiceAnswer.type,
                            correct: choiceAnswer.correct,
                            content: choiceAnswer.content,
                        };
                        choiceAnswerSerivce.putChoiceAnswer(obj).then((data) => {
                            if (!data.id) {
                                result = false;
                            }
                        });
                    });
                    deletedChoiceAnswerId.forEach((id) => {
                        choiceAnswerSerivce.deleteChoiceAnswer({ id: id }).then((data) => {});
                    });
                    if (result) {
                        setAlert(1);
                        loadQuestion();
                        handleClose();
                    } else {
                        setAlert(0);
                    }
                }
            });
        }
    };

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

    const loadAnswer = () => {
        choiceAnswerSerivce.getChoiceAnswersByChoiceQuestionId(choiceQuestionId).then((data) => {
            if (data.length > 0) {
                const arr = data.map((item) => {
                    if (item.type === 'audio' || item.type === 'image') {
                        return {
                            correct: item.correct,
                            content: item.file.data,
                            type: item.type,
                            id: item.id,
                        };
                    }
                    return {
                        correct: item.correct,
                        content: item.content,
                        type: item.type,
                        id: item.id,
                    };
                });
                setChoiceAnswerController(arr);
            }
        });
    };

    useEffect(() => {
        loadQuestion();
        loadAnswer();
    }, [open]);

    const handleChangeImportant = (e) => {
        if (e.target.checked) {
            setNewQuestionImportant(1);
        } else {
            setNewQuestionImportant(0);
        }
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button startIcon={<FontAwesomeIcon icon={faEye} />}>Xem</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Chi tiết câu hỏi</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {loadingState && <DialogProcessLoading />}
                        <div className="mt-4 w-full md:w-[500px]">
                            <div className="w-full">
                                <div className="font-bold">Tên câu hỏi</div>
                                <TextField
                                    onInput={(e) => {
                                        clear();
                                        setNewQuestionName(e.target.value);
                                    }}
                                    disabled
                                    value={newQuestionName}
                                    size="small"
                                    className="w-full"
                                />
                                {questionNameError && <div className="text-red-500">*{questionNameError}</div>}
                            </div>
                            <AlertSuccessDialog open={alert === 1} />
                            <AlertFailDialog open={alert === -1} />
                            <div className="w-full mt-4">
                                <div className="font-bold">Nội dung</div>
                                {<RichTextEditor data={newQuestionContent} disabled readOnly setData={setData} />}
                            </div>
                            {newQuestionFile && <CustomFilePreview fileData={newQuestionFile} />}
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={handleChangeImportant}
                                            checked={newQuestionImportant === 1}
                                        />
                                    }
                                    disabled
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
                                                        disabled
                                                        className="w-full"
                                                        id="standard-basic"
                                                        label={'Đáp án ' + (index + 1)}
                                                        variant="standard"
                                                        value={choiceAnswer.content}
                                                        multiline
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
                                                            accept="audio/*"
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
                                                    disabled
                                                    size="small"
                                                    labelId="select-label-gender-signup"
                                                    id="select-gender-signup"
                                                    value={choiceAnswer.type}
                                                    onChange={(e) => handleChangeType(index, e)}
                                                    label="Loại"
                                                >
                                                    <MenuItem value={'text'}>Text</MenuItem>
                                                    <MenuItem value={'audio'}>Âm thanh</MenuItem>
                                                    <MenuItem value={'image'}>Hình ảnh</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="w-full flex mt-4 flex-row items-center justify-start">
                                            <FormControlLabel
                                                disabled
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
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {questionAnswerError && <div className="text-red-500 my-4">*{questionAnswerError}</div>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Đóng</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

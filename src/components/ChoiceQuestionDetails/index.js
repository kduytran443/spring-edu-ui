import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Checkbox,
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
import { drawQuizService } from '~/services/drawQuizService';
import { questionBankService } from '~/services/questionBankService';
import ShowTextData from '../ShowTextData';

export default function ChoiceQuestionDetails({
    choiceQuestionId,
    drawQuizId,
    selectAnswer = () => {},
    reload = () => {},
}) {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newQuestionName, setNewQuestionName] = useState('');
    const [newQuestionContent, setNewQuestionContent] = useState('');

    const setData = (data) => {
        setNewQuestionContent(data);
    };

    const [choiceAnswerController, setChoiceAnswerController] = useState([]);

    const loadQuestion = () => {
        choiceQuestionSerivce.getChoiceQuestionsById(choiceQuestionId).then((data) => {
            if (data.id) {
                setNewQuestionName(data.name);
                setNewQuestionContent(data.content);
            }
        });
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

                let countCorrect = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].correct === 1) {
                        countCorrect += 1;
                    }
                }
                setNumberOfRightAnswer(countCorrect);
            }
        });
    };

    const [answeredList, setAnsweredList] = useState([]);
    const loadAnswered = () => {
        choiceAnswerSerivce.getChoiceAnswerByDrawQuizId(drawQuizId).then((data) => {
            if (data.length >= 0) {
                setAnsweredList(data);
            }
        });
    };

    useEffect(() => {
        loadQuestion();
        loadAnswer();
        loadAnswered();
    }, [choiceQuestionId]);

    const [numberOfRightAnswer, setNumberOfRightAnswer] = useState();

    const isAnswered = (choiceAnswerId) => {
        for (let i = 0; i < answeredList.length; i++) {
            if (answeredList[i].id === choiceAnswerId) {
                return true;
            }
        }
        return false;
    };

    const postAnswer = (choiceAnswerId) => {
        drawQuizService.answerChoiceAnswerByChoiceAnswerId(choiceAnswerId, { id: drawQuizId }).then((data) => {
            loadAnswered();
        });
    };

    return (
        <div>
            <div className="mt-4 w-full md:w-[500px]">
                <div className="w-full">
                    <div className="font-bold">
                        Tên câu hỏi: {newQuestionName} ({numberOfRightAnswer} đáp án đúng)
                    </div>
                </div>
                {newQuestionContent && (
                    <div className="w-full mt-4">
                        <div className="font-bold">Nội dung</div>
                        <ShowTextData data={newQuestionContent} />
                    </div>
                )}
                {choiceAnswerController.map((choiceAnswer, index) => {
                    return (
                        <div key={index} className="w-full select-none bg-slate-100 p-4 rounded my-8 md:my-6">
                            <div className="flex flex-col-reverse md:flex-row items-center">
                                <div className="flex flex-col w-full">
                                    {choiceAnswer.type === 'text' && (
                                        <TextField
                                            className="w-full"
                                            id="standard-basic"
                                            label={'Đáp án ' + (index + 1)}
                                            variant="standard"
                                            value={choiceAnswer.content}
                                        />
                                    )}
                                    {choiceAnswer.type === 'image' && choiceAnswer.content && (
                                        <div className="max-h-[240px] overflow-hidden">
                                            <img alt="image" src={choiceAnswer.content} />
                                        </div>
                                    )}
                                    {choiceAnswer.type === 'audio' && choiceAnswer.content && (
                                        <audio
                                            className="w-full"
                                            style={{ width: '100%' }}
                                            controls
                                            preload="auto"
                                            autobuffer
                                            src={choiceAnswer.content}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="w-full select-none flex mt-4 flex-row items-center justify-between">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onClick={(e) => {
                                                postAnswer(choiceAnswer.id);
                                            }}
                                            checked={isAnswered(choiceAnswer.id)}
                                        />
                                    }
                                    label="Chọn"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

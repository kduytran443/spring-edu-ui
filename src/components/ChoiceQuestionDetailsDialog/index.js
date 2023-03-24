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
import { questionBankService } from '~/services/questionBankService';
import RichTextEditor from '../RichTextEditor';
import ShowTextData from '../ShowTextData';

export default function ChoiceQuestionDetailsDialog({ choiceQuestionId, reload = () => {} }) {
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
                console.log('data.content', data.content);
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
                console.log(data);
                setChoiceAnswerController(arr);
            }
        });
    };

    useEffect(() => {
        loadQuestion();
        loadAnswer();
    }, [open]);

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button startIcon={<FontAwesomeIcon icon={faEye} />}>Xem chi tiết</Button>
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
                        <div className="mt-4 w-full md:w-[500px]">
                            <div className="w-full">
                                <div className="font-bold">Tên câu hỏi</div>
                                <TextField value={newQuestionName} disabled size="small" className="w-full" />
                            </div>
                            <div className="w-full mt-4">
                                <div className="font-bold">Nội dung</div>
                                {<RichTextEditor disabled data={newQuestionContent} />}
                            </div>
                            {choiceAnswerController.map((choiceAnswer, index) => {
                                console.log('choiceAnswer', choiceAnswer);
                                return (
                                    <div key={index} className="w-full bg-slate-100 p-4 rounded my-8 md:my-6">
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
                                            <FormControl fullWidth>
                                                <InputLabel id="select-label-gender-signup">Loại</InputLabel>
                                                <Select
                                                    disabled
                                                    size="small"
                                                    labelId="select-label-gender-signup"
                                                    id="select-gender-signup"
                                                    value={choiceAnswer.type}
                                                    label="Loại"
                                                >
                                                    <MenuItem value={'text'}>Text</MenuItem>
                                                    <MenuItem value={'audio'}>Âm thanh</MenuItem>
                                                    <MenuItem value={'image'}>Hình ảnh</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="w-full flex mt-4 flex-row items-center justify-between">
                                            <FormControlLabel
                                                control={<Checkbox checked={choiceAnswer.correct === 1} />}
                                                label="Đúng"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
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

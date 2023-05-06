import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { choiceQuestionSerivce } from '~/services/choiceQuestionSerivce';
import { questionBankService } from '~/services/questionBankService';
import { useUser } from '~/stores/UserStore';
import ChoiceQuestionDetailsDialog from '../ChoiceQuestionDetailsDialog';
import ShowTextData from '../ShowTextData';
import TableChoiceQuestion from '../TableChoiceQuestion';

export default function QuestionBankDetailsViewOnlyDialog({ button, questionBankId, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [userState, dispatchUserState] = useUser();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newQuestionBank, setNewQuestionBank] = useState('');
    const [error, setError] = useState(false);

    const [questionBankState, setQuestionBankState] = useState([]);

    const [choiceQuestionList, setChoiceQuestionList] = useState([]);

    const loadData = () => {
        questionBankService.getQuestionBankById(questionBankId).then((data) => {
            if (data.id) {
                setQuestionBankState(data);
            } else {
                handleClose();
            }
        });
    };

    const loadQuestion = () => {
        choiceQuestionSerivce.getChoiceQuestionsByQuestionBankId(questionBankId).then((data) => {
            if (data.length > 0) {
                setChoiceQuestionList(data);
            }
        });
    };

    useEffect(() => {
        loadData();
        loadQuestion();
    }, [open]);

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
            width: 220,
            renderCell: (param) => {
                return (
                    <>
                        <div className="mr-4">
                            <ChoiceQuestionDetailsDialog choiceQuestionId={param.value} />
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <div onClick={handleClickOpen}>{button}</div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Chi tiết ngân hàng câu hỏi</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-full md:w-[560px]">
                            <div>
                                <b className="mr-2">Tên:</b>
                                {questionBankState.name}
                            </div>
                            <div>
                                <b className="mr-2">Tác giả:</b> {questionBankState.username}
                            </div>
                            <div>
                                <b className="mr-2">Số lượng:</b> {choiceQuestionList.length}
                            </div>
                            <div className="w-full mt-2">
                                {choiceQuestionList && (
                                    <TableChoiceQuestion rows={choiceQuestionList} columns={columns} />
                                )}
                            </div>
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

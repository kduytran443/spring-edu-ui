import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { questionBankService } from '~/services/questionBankService';
import { useUser } from '~/stores/UserStore';
import AlertSuccessDialog from '../AlertSuccessDialog';

export default function AddQuestionBankToClassDialog({ alreadyList = [], reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const [userState, dispatchUserState] = useUser();
    const { classId } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedId();
        setQuestionBankList([]);
    };

    const [questionBankList, setQuestionBankList] = useState([]);
    const loadQuestionBanks = () => {
        questionBankService.getQuestionBankByUser().then((data) => {
            const arr = data.filter((item) => {
                return !checkExisted(item.id);
            });
            setQuestionBankList(arr);
        });
    };

    const checkExisted = (id) => {
        const index = alreadyList.findIndex((item) => item.id === id);
        return index === -1 ? false : true;
    };

    const [selectedId, setSelectedId] = useState();
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        loadQuestionBanks();
        setSelectedId();
    }, [open]);
    const handleAgree = () => {
        if (selectedId) {
            questionBankService.postQuestionBankToClass(classId, { id: selectedId }).then((data) => {
                if (data) {
                    setAlert(true);
                    setTimeout(() => {
                        reload();
                        handleClose();
                        setAlert(false);
                    }, 1200);
                }
            });
        }
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button startIcon={<FontAwesomeIcon icon={faPlus} />}>Thêm ngân hàng câu hỏi</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Thêm ngân hàng câu hỏi vào lớp học</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <AlertSuccessDialog open={alert} />
                        <div className="mt-4">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Ngân hàng câu hỏi</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedId}
                                        defaultValue={selectedId}
                                        label="Chủ đề"
                                        onChange={(e) => {
                                            setSelectedId(e.target.value);
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
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Hủy</Button>
                    </div>
                    <div className="select-none cursor-pointer" onClick={handleAgree} autoFocus>
                        <Button disabled={!selectedId} color="primary" variant="contained">
                            Thêm
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

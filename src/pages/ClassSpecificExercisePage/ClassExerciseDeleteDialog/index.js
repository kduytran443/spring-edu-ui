import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { exerciseService } from '~/services/exerciseService';
import { questionBankService } from '~/services/questionBankService';

export default function ClassExerciseDeleteDialog() {
    const [open, setOpen] = useState(false);
    const { classId, exerciseId } = useParams();
    const [alert, setAlert] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();

    const handleAgree = () => {
        const obj = {
            id: exerciseId,
        };
        console.log('obj', obj);

        exerciseService.deleteExercise(obj).then((data) => {
            navigate('/class/' + classId + '/exercise');
        });

        handleClose();
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button color="error" startIcon={<FontAwesomeIcon icon={faTrash} />}>
                    Xóa
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <AlertSuccessDialog open={alert === 1} />
                        <div className="mt-4 md:w-[300px]">
                            Sau khi xóa không thể phục hồi, xác nhận xóa bài tập này?
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Hủy</Button>
                    </div>
                    <div className="select-none cursor-pointer" onClick={handleAgree} autoFocus>
                        <Button color="error" variant="contained">
                            Xóa
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

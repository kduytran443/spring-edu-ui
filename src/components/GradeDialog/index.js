import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { questionBankService } from '~/services/questionBankService';
import { submittedExerciseService } from '~/services/submittedExerciseService';
import AlertFailDialog from '../AlertFailDialog';
import AlertSuccessDialog from '../AlertSuccessDialog';
import { faPen, faSchoolCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { notificationService } from '~/services/notificationService';
import { NotificationSocketContext } from '../NotificationSocketProvider';

export default function GradeDialog({ button, maxMark, submittedExerciseId, reload = () => {} }) {
    const [open, setOpen] = useState(false);
    const { classId, exerciseId } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
        loadSubmittedExercise();
    };

    const loadSubmittedExercise = () => {
        submittedExerciseService.getSubmittedExerciseById(submittedExerciseId).then((data) => {
            if (data.id) {
                setGrade(data.mark || 0);
            }
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [grade, setGrade] = useState(0);
    const [success, setSuccess] = useState(0);

    const sendContext = useContext(NotificationSocketContext);
    const handleAgree = () => {
        submittedExerciseService.grade(submittedExerciseId, grade).then((data) => {
            if (data.id) {
                setSuccess(1);
                const userIds = [data.userId];
                const obj = {
                    content: 'Bài làm của bạn đã được chấm điểm',
                    redirectUrl: `/class/${classId}/exercise/${exerciseId}`,
                    receiverIds: userIds,
                };

                notificationService.post(obj).then((data) => {
                    sendContext(userIds);
                });
                setTimeout(() => {
                    reload();
                    setSuccess(0);
                    handleClose();
                }, 1000);
            } else {
                setSuccess(-1);
                setTimeout(() => {
                    setSuccess(0);
                }, 1000);
            }
        });
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button startIcon={<FontAwesomeIcon icon={faPen} />}>Chấm điểm</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Chấm điểm</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4 md:w-[300px] flex flex-row items-center">
                            <TextField
                                className="w-full"
                                value={grade}
                                onInput={(e) => {
                                    if (e.target.value <= maxMark && e.target.value >= 0) {
                                        setGrade(e.target.value);
                                    }
                                }}
                                type="number"
                                label="Điểm"
                                variant="standard"
                            />
                            <div className="text-lg flex flex-row items-center">
                                <div className="mx-2">/</div>
                                <div>{maxMark}</div>
                            </div>
                        </div>

                        <AlertSuccessDialog open={success === 1} />
                        <AlertFailDialog open={success === -1} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Hủy</Button>
                    </div>
                    <div className="select-none cursor-pointer" onClick={handleAgree} autoFocus>
                        <Button
                            disabled={!grade || !(grade <= maxMark && grade >= 0)}
                            color="primary"
                            variant="contained"
                        >
                            Chấm điểm
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

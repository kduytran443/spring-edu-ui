import { faBug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { questionBankService } from '~/services/questionBankService';
import { reportService } from '~/services/reportService';
import AlertSuccessDialog from '../AlertSuccessDialog';
import RichTextEditor from '../RichTextEditor';

export default function ReportClassDialog({ classId, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        report();
    };

    const [error, setError] = useState(false);

    const [alertSuccess, setAlertSuccess] = useState(0);
    const [reportTextData, setReportTextData] = useState('');
    const report = () => {
        if (reportTextData) {
            const obj = {
                classId: classId,
                content: reportTextData,
            };
            reportService.postReport(obj).then((data) => {
                if (data.id) {
                    setAlertSuccess(1);
                    setTimeout(() => {
                        setAlertSuccess(0);
                        handleClose();
                    }, 1000);
                }
            });
        }
    };

    const setTextData = (data) => {
        setReportTextData(data);
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                <IconButton onClick={report}>
                    <FontAwesomeIcon icon={faBug} />
                </IconButton>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Báo cáo vi phạm</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4 w-full md:w-[500px]">
                            <AlertSuccessDialog open={alertSuccess === 1} />
                            <TextField
                                className="w-full"
                                multiline
                                rows={5}
                                label="Nội dung"
                                onChange={(e) => {
                                    setReportTextData(e.target.value);
                                }}
                            />
                            {error && <div className="text-red-600">*Nội dung không được bỏ trống</div>}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Hủy</Button>
                    </div>
                    <div className="select-none cursor-pointer" onClick={report} autoFocus>
                        <Button color="primary" variant="contained">
                            Báo cáo
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

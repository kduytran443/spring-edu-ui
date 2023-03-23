import { faCheckCircle, faEdit, faPen, faX } from '@fortawesome/free-solid-svg-icons';
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
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function AlertFailDialog({ open }) {
    return (
        <div className="w-full">
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Thông báo</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="lg:w-[400px] items-center justify-center flex flex-col">
                            <div className="bg-red-300 shadow-lg shadow-red-200 rounded-lg p-2">
                                <div className="animate-bounce">
                                    <IconButton color="default">
                                        <FontAwesomeIcon icon={faX} />
                                    </IconButton>
                                </div>
                            </div>
                            <div className="my-2 mt-6">Thao tác thất bại</div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AlertFailDialog;

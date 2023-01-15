import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function SpeechRecorder({ submitInput = () => {} }) {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleReset = () => {
        resetTranscript();
    };

    if (!browserSupportsSpeechRecognition) {
        console.log('Not support speech recognition in this browser!');
    }

    useEffect(() => {
        if (open) {
            SpeechRecognition.startListening({ language: 'vi-VN' });
        } else {
            SpeechRecognition.stopListening();
            submitInput(transcript.slice(0, -1));
        }

        return () => {
            SpeechRecognition.stopListening();
        };
    }, [open]);

    useEffect(() => {
        if (!listening) {
            const timeoutfunc = setTimeout(() => {
                submitInput(transcript.slice(0, -1));
                handleClose();
            }, 1000);
            return () => {
                clearTimeout(timeoutfunc);
            };
        }
    }, [listening]);

    return (
        <div>
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="Speech" onClick={handleClickOpen}>
                <FontAwesomeIcon icon={faMicrophone} />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <MicIcon />
                    <span> Nhận giọng nói</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{listening ? 'Đang nghe...' : 'Đang KHÔNG nghe...'}</DialogContentText>
                    <DialogContentText>{transcript}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Reset</Button>
                    <Button onClick={handleClose}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SpeechRecorder;

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({ content }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const buttonRef = React.useRef();

    if (content) {
        buttonRef.current.click();
    }

    return (
        <div>
            <div className="hidden">
                <Button ref={buttonRef} onClick={handleClick}>
                    Open simple snackbar
                </Button>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} message={content} action={action} />
        </div>
    );
}

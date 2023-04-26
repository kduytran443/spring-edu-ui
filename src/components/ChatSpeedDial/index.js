import { faMessage, faX, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import ChatSelectBoard from '../ChatSelectBoard';

function ChatSpeedDial() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-end" style={{ position: 'fixed', bottom: 24, right: 24 }}>
            {open && <ChatSelectBoard />}
            <div className="mt-2"></div>
            <Button
                onClick={(e) => {
                    setOpen(!open);
                }}
                sx={{ height: 48, width: 48 }}
                variant="contained"
                size="large"
                color="primary"
            >
                <FontAwesomeIcon className="text-xl" icon={open ? faX : faMessage} />
            </Button>
        </div>
    );
}

export default ChatSpeedDial;

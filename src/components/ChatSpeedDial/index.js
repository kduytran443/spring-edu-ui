import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import ChatSelectBoard from '../ChatSelectBoard';

function ChatSpeedDial() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-end" style={{ position: 'fixed', bottom: 16, right: 16 }}>
            {open && <ChatSelectBoard />}
            <div className="mt-2"></div>
            <Button
                onClick={(e) => {
                    setOpen(!open);
                }}
                variant="contained"
                size="large"
                color="primary"
            >
                <FontAwesomeIcon icon={faMessage} />
            </Button>
        </div>
    );
}

export default ChatSpeedDial;

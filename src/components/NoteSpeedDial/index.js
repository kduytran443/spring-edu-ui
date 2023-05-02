import { faMessage, faNoteSticky, faX, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import FolderSelectBoard from '../FolderSelectBoard';

function NoteSpeedDial() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-end" style={{ position: 'fixed', bottom: 24, right: 96 }}>
            <div>{open && <FolderSelectBoard />}</div>
            <div className="mt-2"></div>
            <Button
                onClick={(e) => {
                    setOpen(!open);
                }}
                sx={{ height: 48, width: 48 }}
                variant="contained"
                size="large"
                color="secondary"
            >
                <FontAwesomeIcon className="text-xl" icon={open ? faX : faNoteSticky} />
            </Button>
        </div>
    );
}

export default NoteSpeedDial;

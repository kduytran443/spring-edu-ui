import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserAccordion({ userInfo, children }) {
    const { classId } = useParams();
    const navigate = useNavigate();

    const [openState, setOpenState] = React.useState(false);

    const navigateToLesson = (lessonId) => {
        navigate('/class/' + classId + '/lesson/' + lessonId);
    };

    return (
        <div className="my-2">
            <Accordion expanded={openState}>
                <AccordionSummary
                    onClick={(e) => {
                        setOpenState(!openState);
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{userInfo}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>{children}</div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

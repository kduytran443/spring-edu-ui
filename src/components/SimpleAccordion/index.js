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

export default function SimpleAccordion() {
    const { classId } = useParams();
    const navigate = useNavigate();

    const navigateToLesson = (lessonId) => {
        navigate('/class/' + classId + '/lesson/' + lessonId);
    };

    return (
        <div className="my-2">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                        <div className="font-bold text-2xl">Topic 1</div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <ListItem
                                className="cursor-pointer hover:bg-blue-100"
                                onClick={(e) => {
                                    navigateToLesson(1);
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FactCheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Nộp Đồ án kiểm thử thủ công (Test plan, test scenario, testcases, video)"
                                    secondary="Jan 9, 2014"
                                />
                            </ListItem>
                            <ListItem
                                className="cursor-pointer hover:bg-blue-100"
                                onClick={(e) => {
                                    navigateToLesson(1);
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FactCheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Nộp Đồ án kiểm thử thủ công (Test plan, test scenario, testcases, video)"
                                    secondary="Jan 9, 2014"
                                />
                            </ListItem>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

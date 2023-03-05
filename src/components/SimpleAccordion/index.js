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
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function SimpleAccordion({ name, ordinalNumber, classLessons = [] }) {
    const { classId } = useParams();
    const navigate = useNavigate();

    const [openState, setOpenState] = React.useState(() => {
        return classLessons.length > 0;
    });

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
                    <Typography>
                        <div className="font-bold text-xl">
                            {ordinalNumber}. {name}
                        </div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            {classLessons !== null && classLessons.length > 0 ? (
                                classLessons.map((lesson, index) => {
                                    const dateNow = new Date(lesson.createdDate);
                                    const dateString = `${dateNow.getDate()}/${
                                        dateNow.getMonth() + 1
                                    }/${dateNow.getFullYear()}`;
                                    return (
                                        <ListItem
                                            className="cursor-pointer hover:bg-blue-400 rounded hover:text-white"
                                            onClick={(e) => {
                                                navigateToLesson(lesson.id);
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar sx={{ backgroundColor: 'white' }}>
                                                    <MenuBookIcon color="primary" />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={`${lesson.name}`} secondary={dateString} />
                                        </ListItem>
                                    );
                                })
                            ) : (
                                <div>Chưa có bài học nào</div>
                            )}
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

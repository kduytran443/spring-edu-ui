import {
    Alert,
    AlertTitle,
    Avatar,
    Breadcrumbs,
    Button,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClassTopic from '~/components/ClassTopic';
import SimpleAccordion from '~/components/SimpleAccordion';
import FactCheckIcon from '@mui/icons-material/FactCheck';

function ClassExercisePage() {
    const { classId } = useParams();
    const navigate = useNavigate();

    const navigateToExercise = (exerciseId) => {
        navigate('/class/' + classId + '/exercise/' + exerciseId);
    };
    return (
        <div>
            <ListItem
                className="cursor-pointer hover:bg-blue-100"
                onClick={(e) => {
                    navigateToExercise(1);
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
                    navigateToExercise(1);
                }}
            >
                <ListItemAvatar>
                    <Avatar>
                        <FactCheckIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Nộp Đồ án kiểm thử thủ công (Test plan, test scenario, testcases, video)"
                    secondary="Jan 9, 2014 Hết hạn ngày 4/2/2023"
                />
            </ListItem>
        </div>
    );
}

export default ClassExercisePage;

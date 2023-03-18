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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ClassTopic from '~/components/ClassTopic';
import SimpleAccordion from '~/components/SimpleAccordion';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { classMemberService } from '~/services/classMemberService';
import { useState } from 'react';
import { useEffect } from 'react';
import QuestionBankShowList from '~/components/QuestionBankShowList';

function ClassExercisePage() {
    const { classId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToExercise = (exerciseId) => {
        navigate('/class/' + classId + '/exercise/' + exerciseId);
    };
    const [userRole, setUserRole] = useState();
    const loadUserData = () => {
        classMemberService.getClassMemberByUserAndClassId(classId).then((data) => {
            console.log(data);
            if (data.classRole) {
                setUserRole(data.classRole);
            }
        });
    };

    useEffect(() => {
        loadUserData();
    }, [location]);

    const isValidRole = (role) => {
        if (role === 'teacher' || role === 'supporter') {
            return true;
        }
        return false;
    };

    return (
        <div>
            <div>
                {isValidRole(userRole) && (
                    <div>
                        <QuestionBankShowList />
                    </div>
                )}
            </div>
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
        </div>
    );
}

export default ClassExercisePage;

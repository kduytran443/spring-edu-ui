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
import { exerciseService } from '~/services/exerciseService';
import { renderToTime } from '~/utils';
import { submittedExerciseService } from '~/services/submittedExerciseService';

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

    const [classExerciseList, setClassExerciseList] = useState([]);
    const loadData = () => {
        exerciseService.getExercisesByClassId(classId).then((data) => {
            if (data.length > 0) {
                setClassExerciseList(data);
            }
        });
    };
    useEffect(() => {
        loadData();
    }, [location]);

    return (
        <div>
            <div>
                {isValidRole(userRole) && (
                    <div className="bg-slate-100 rounded p-4">
                        <QuestionBankShowList />
                    </div>
                )}
            </div>
            <div className="my-8">
                {isValidRole(userRole) && (
                    <Button
                        onClick={(e) => {
                            navigate(`/class/${classId}/exercise-create`);
                        }}
                    >
                        Tạo bài tập
                    </Button>
                )}
            </div>
            <div>
                {classExerciseList.map((classExercise) => {
                    return (
                        <ListItem
                            className="cursor-pointer hover:bg-blue-100"
                            onClick={(e) => {
                                navigate('/class/' + classId + '/exercise/' + classExercise.id);
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <FactCheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={classExercise.name}
                                secondary={`Bắt đầu: ${renderToTime(
                                    classExercise.startTime,
                                )} | Kết thúc: ${renderToTime(classExercise.endTime)}`}
                            />
                        </ListItem>
                    );
                })}
            </div>
        </div>
    );
}

export default ClassExercisePage;

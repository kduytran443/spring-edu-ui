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
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { blue, grey } from '@mui/material/colors';

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

    const date = new Date();

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
                    const colorAvatar = {};
                    const isAvailable = date.getTime() < classExercise.endTime;

                    if (isAvailable) {
                        colorAvatar.bgcolor = blue[500];
                    } else {
                        colorAvatar.bgcolor = grey[500];
                    }

                    return (
                        <ListItem
                            className={`cursor-pointer ${isAvailable ? 'hover:bg-blue-100' : 'hover:bg-gray-100'}`}
                            onClick={(e) => {
                                navigate('/class/' + classId + '/exercise/' + classExercise.id);
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={colorAvatar}>
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
                {classExerciseList.length === 0 && <div className="text-xl my-4">Không có bài tập nào</div>}
            </div>
        </div>
    );
}

export default ClassExercisePage;

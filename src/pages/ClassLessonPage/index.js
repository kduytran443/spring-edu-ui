import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBackspace, faBackward, faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '~/constants';
import parse from 'html-react-parser';

function ClassLessonPage() {
    const navigate = useNavigate();
    const { lessonId, classId } = useParams();
    const [lessonDataState, setLessonDataState] = useState(null);

    /*PRIVATE*/
    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/class-lesson/${lessonId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === 500) {
                    navigate('/page-not-found');
                } else setLessonDataState(data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);

    return (
        <div className="w-full p-4 md:p-0 text-justify">
            <Button
                onClick={(e) => {
                    navigate('/class/' + classId);
                }}
                startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            >
                Quay lại
            </Button>
            <h1 className="font-bold text-2xl my-4">{lessonDataState && lessonDataState.name}</h1>

            <div>
                <p>{lessonDataState && parse(lessonDataState.textData)}</p>
            </div>
        </div>
    );
}

export default ClassLessonPage;

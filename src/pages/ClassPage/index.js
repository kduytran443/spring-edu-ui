import { faArrowDown, faArrowUp, faEdit, faEyeSlash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, AlertTitle, Breadcrumbs, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AlertDialog from '~/components/AlertDialog';
import ClassTopic from '~/components/ClassTopic';
import LoadingProcess from '~/components/LoadingProcess';
import SimpleAccordion from '~/components/SimpleAccordion';
import { API_BASE_URL } from '~/constants';
import { useUser } from '~/stores/UserStore';

function ClassPage() {
    const { classId } = useParams();
    const [topicListState, setTopicListState] = useState([]);

    const [userState, userDispatch] = useUser();

    const [visibleAddTopicState, setVisibleAddTopicState] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/topic/${classId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 500) {
                } else setTopicListState(data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);

    /*PRIVATE*/
    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/topic/${classId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 500) {
                } else setTopicListState(data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);

    console.log('userState', userState);

    return (
        <>
            <div>
                <div>
                    <AlertDialog
                        title="Thêm chủ đề"
                        button={
                            <div className="flex flex-col text-lg select-none hover:bg-blue-100 active:bg-blue-200 items-center justify-center w-full p-6 border-2 border-blue-500 rounded-lg hover:shadow cursor-pointer text-blue-500">
                                <FontAwesomeIcon icon={faPlus} /> Thêm chủ đề
                            </div>
                        }
                    >
                        <div className="my-2">
                            <TextField label="Tên chủ đề" />
                        </div>
                    </AlertDialog>
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-col my-2 w-full">
                    {topicListState === null ? (
                        <LoadingProcess />
                    ) : (
                        topicListState?.map((topic, index) => {
                            return (
                                <div className="w-full flex flex-col">
                                    <div className="flex flex-row items-center mt-10 justify-between">
                                        <Button size="small" startIcon={<FontAwesomeIcon icon={faPlus} />}>
                                            Thêm bài học
                                        </Button>
                                        <Button size="small" startIcon={<FontAwesomeIcon icon={faEdit} />}>
                                            Thay đổi
                                        </Button>
                                        <Button size="small" startIcon={<FontAwesomeIcon icon={faEyeSlash} />}>
                                            Ẩn
                                        </Button>
                                        <div className="flex flex-row items-center mr-2">
                                            {index !== topicListState.length - 1 && (
                                                <div className="mr-2">
                                                    <IconButton color="primary" size="small">
                                                        <FontAwesomeIcon icon={faArrowDown} />
                                                    </IconButton>
                                                </div>
                                            )}
                                            {index !== 0 && (
                                                <div>
                                                    <IconButton color="primary" size="small">
                                                        <FontAwesomeIcon icon={faArrowUp} />
                                                    </IconButton>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <SimpleAccordion
                                        key={index}
                                        name={topic.name}
                                        ordinalNumber={topic.ordinalNumber}
                                        classLessons={topic.classLessonReviews}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default ClassPage;

import { Alert, AlertTitle, Breadcrumbs, Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClassTopic from '~/components/ClassTopic';
import LoadingProcess from '~/components/LoadingProcess';
import SimpleAccordion from '~/components/SimpleAccordion';
import { API_BASE_URL } from '~/constants';

function ClassPage() {
    const { classId } = useParams();
    const [topicListState, setTopicListState] = useState([]);

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

    return (
        <>
            <div>
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    This is an info alert — <strong>check it out!</strong>
                </Alert>
            </div>
            <div className="w-full">
                <div className="flex flex-col my-4 w-full">
                    {topicListState === null ? (
                        <LoadingProcess />
                    ) : (
                        topicListState?.map((topic, index) => {
                            return (
                                <SimpleAccordion
                                    key={index}
                                    name={topic.name}
                                    ordinalNumber={topic.ordinalNumber}
                                    classLessons={topic.classLessonReviews}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default ClassPage;

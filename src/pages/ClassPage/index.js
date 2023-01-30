import { Alert, AlertTitle, Breadcrumbs, Button, Divider, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClassTopic from '~/components/ClassTopic';
import SimpleAccordion from '~/components/SimpleAccordion';

function ClassPage() {
    console.log('Classpage ok');
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
                    <SimpleAccordion />
                    <SimpleAccordion />
                </div>
            </div>
        </>
    );
}

export default ClassPage;

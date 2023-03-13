import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, TextField } from '@mui/material';
import { CKEditor } from 'ckeditor4-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyEditor from '~/components/Editor';

function ClassLessonCreatePage() {
    const navigate = useNavigate();
    const { classId } = useParams();

    const [nameState, setNameState] = useState('');
    const [topicIdState, setTopicIdState] = useState();
    const [textDataState, setTextDataState] = useState('');
    const [fileListState, setFileListState] = useState('');

    const onInputName = (e) => {
        setNameState(e.target.value);
    };

    const onInputTextData = (e) => {
        setTextDataState(e.target.value);
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/class/' + classId);
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Giao diện chính
                </Button>
            </div>
            <h2 className="font-bold text-3xl">Tạo bài học</h2>
            <div className="w-full flex-col my-8">
                <div className="w-full my-6">
                    <TextField className="w-full" label="Tên bài học" value={nameState} onInput={onInputName} />
                </div>
                <div className="w-full my-6">
                    <h2>Using CKEditor 5 build in React</h2>
                    <CKEditor initData="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" />;
                </div>
                <div className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> Thêm
                </div>
            </div>
        </div>
    );
}

export default ClassLessonCreatePage;

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControlLabel, FormGroup, IconButton, Switch } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UploadWidget from '~/components/UploadWidget';
import { API_BASE_URL } from '~/constants';
import { getConfig } from '~/services/config';

function ClassSettingPage() {
    const { classId } = useParams();
    const [classDataState, setClassDataState] = useState({});
    const navigate = useNavigate();
    const [uploadFileState, setUploadFileState] = useState(false);

    const [imageState, setImageState] = useState('https://www.gstatic.com/classroom/themes/img_graduation.jpg');

    useEffect(() => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/public/api/class-intro/${classId}`, config)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 500) {
                    navigate('/page-not-found');
                } else setClassDataState(data);
            });
    }, [classId]);

    const editButtonOnClick = () => {};

    return (
        <div className="p-2 md:p-0">
            <h1 className="font-bold text-xl my-2">Cài đặt</h1>
            <FormGroup>
                <FormControlLabel
                    control={<Switch defaultChecked={classDataState.visible === 0} />}
                    label="Ẩn lớp học khỏi trang chính"
                />
            </FormGroup>
            <div className="mt-8">
                <div className="flex flex-row items-center mb-2">
                    <h2 className="text-xl font-bold">Hình nền chủ đề</h2>
                    <div className="ml-6">
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                setUploadFileState(!uploadFileState);
                            }}
                        >
                            <FontAwesomeIcon icon={faPen} />
                        </IconButton>
                    </div>
                </div>
            </div>
            {uploadFileState && (
                <div>
                    <UploadWidget multiple={false} />
                </div>
            )}
        </div>
    );
}

export default ClassSettingPage;

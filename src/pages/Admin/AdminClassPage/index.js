import { faAdd, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimpleAccordion from '~/components/SimpleAccordion';
import UserTable from '~/components/UserTable';
import { ADMIN_HOME_PAGE } from '~/constants';
import { userDataService } from '~/services/userDataService';
import ClassTable from '~/components/ClassTable';
import { classService } from '~/services/classService';

function AdminClassPage() {
    const [classListState, setClassListState] = useState([]);

    const loadData = () => {
        classService.getClasses().then((data) => {
            console.log(data);
            if (data.length >= 0) {
                const arr = data.map((item) => {
                    return {
                        ...item,
                        operation: { id: item.id, status: item.status },
                    };
                });
                setClassListState(arr);
            }
        });
    };

    const location = useLocation();

    useEffect(() => {
        loadData();
    }, [location]);
    const navigate = useNavigate();
    return (
        <div>
            <div className="mb-[6px]">
                <Button
                    onClick={(e) => {
                        navigate(ADMIN_HOME_PAGE);
                    }}
                    startIcon={<FontAwesomeIcon icon={faReply} />}
                >
                    Trang chủ
                </Button>
            </div>
            <h3 className="text-2xl font-bold my-4">Quản lý người dùng</h3>
            <div className="bg-white rounded">
                <h1 className="text-xl font-bold mt-8 p-2">Lớp học ({classListState.length})</h1>
                {classListState && <ClassTable rows={classListState} loadData={loadData} />}
            </div>
        </div>
    );
}

export default AdminClassPage;

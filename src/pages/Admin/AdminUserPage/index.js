import { faAdd, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimpleAccordion from '~/components/SimpleAccordion';
import UserTable from '~/components/UserTable';
import { ADMIN_HOME_PAGE } from '~/constants';
import { userDataService } from '~/services/userDataService';
import AdminCreateUserDialog from './AdminCreateUserDialog';
import { useUser } from '~/stores/UserStore';

function AdminUserPage() {
    const [adminListState, setAdminListState] = useState([
        {
            id: 1,
            username: 'b1906443',
            fullname: 'Trần Khánh Duy',
            avatar: 'https://lh3.googleusercontent.com/a/AGNmyxbF4s1VsKL_bt0LtB2rZyMcvQLi8zfEmY6Vlf1M=s50-c-k-no',
            gender: 'male',
            birthYear: 2001,
            usernameToBlock: 'b1906443',
        },
    ]);

    const [userListState, setUserListState] = useState([
        {
            id: 1,
        },
    ]);

    //avatar, username, fullname, password, gender, birthYear
    const [newAdminDataState, setNewAdminDataState] = useState({
        avatar: '',
        username: '',
        fullname: '',
        password: '',
        gender: '',
        birthYear: '',
    });

    const [repasswordState, setRepasswordState] = useState('');

    const onInputNewAdmin = (property, value) => {
        setNewAdminDataState((pre) => {
            return { ...pre, [property]: value };
        });
    };

    const loadData = () => {
        userDataService.getAllUser().then((data) => {
            if (data.length >= 0) {
                const adminArr = data
                    .filter((item) => item.role === 'ADMIN')
                    .map((item) => {
                        item.operation = { username: item.username, status: item.status };
                        return item;
                    });
                const userArr = data
                    .filter((item) => item.role === 'USER')
                    .map((item) => {
                        item.operation = { username: item.username, status: item.status };
                        return item;
                    });
                setAdminListState(adminArr);
                setUserListState(userArr);
            }
        });
    };

    const [userState, userDispatch] = useUser();

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
            {userState && userState.username === 'admin' && <AdminCreateUserDialog loadData={loadData} />}
            <div className="bg-white rounded">
                <h1 className="text-xl font-bold mt-8 p-2">Admin ({adminListState.length})</h1>
                {adminListState && (
                    <UserTable
                        rows={adminListState}
                        loadData={loadData}
                        rootAdmin={userState && userState.username === 'admin'}
                        isAdmin
                    />
                )}
            </div>
            <div className="bg-white rounded">
                <h1 className="text-xl font-bold mt-8 p-2">User ({userListState.length})</h1>
                {userListState && <UserTable rows={userListState} loadData={loadData} />}
            </div>
        </div>
    );
}

export default AdminUserPage;

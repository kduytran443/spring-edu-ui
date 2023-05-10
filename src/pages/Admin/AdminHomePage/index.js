import { faFlag, faList, faParagraph, faSchool, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CircularProgress, Divider } from '@mui/material';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import audios from '~/assets/audios';
import AdminStatics from '~/components/Admin/AdminStatics';
import UserChart from '~/components/Admin/UserChart';
import CategoryCard from '~/components/CategoryCard';
import CourseListIntro from '~/components/ClassListIntro';
import LoadingProcess from '~/components/LoadingProcess';
import { NotificationSocketContext } from '~/components/NotificationSocketProvider';
import SildeshowIntroduction from '~/components/SildeshowIntroduction';
import TeacherListIntro from '~/components/TeacherListIntro';
import { API_BASE_URL, CATEGORY_PAGE_URL } from '~/constants';

function AdminHomePage() {
    const [categoryListState, setCategoryListState] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/category`)
            .then((res) => res.json())
            .then((data) => {
                setCategoryListState(data);
            });
    }, []);

    const sendContext = useContext(NotificationSocketContext);

    return (
        <div className="w-full">
            <div className="w-full flex flex-col md:flex-row mt-4 items-center flex-wrap">
                <div className="w-full md:w-[50%] p-4">
                    <AdminStatics
                        color="bg-blue-500 shadow-blue-400"
                        data="Lớp học"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faSchool} />}
                        link="/admin/class"
                        description="Danh sách lớp học"
                    />
                </div>
                <div className="w-full md:w-[50%] p-4">
                    <AdminStatics
                        color="bg-green-500 shadow-green-400"
                        data="Người dùng"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faUserGroup} />}
                        link="/admin/user"
                        description="Danh sách Người dùng"
                    />
                </div>
                <div className="w-full md:w-[50%] p-4">
                    <AdminStatics
                        color="bg-lime-500 shadow-lime-400"
                        data="Danh mục"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faList} />}
                        description="Danh mục"
                        link="/admin/category"
                    />
                </div>
                <div className="w-full md:w-[50%] p-4">
                    <AdminStatics
                        color="bg-red-500 shadow-red-400"
                        data="Báo cáo vi phạm"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faFlag} />}
                        description="Báo cáo vi phạm"
                        link="/admin/report"
                    />
                </div>
            </div>
            <UserChart />
        </div>
    );
}

export default AdminHomePage;

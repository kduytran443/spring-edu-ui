import SidebarMenu from '~/components/SidebarMenu';
import Header from '../components/Header';
import SimpleFooter from '../components/SimpleFooter';
import AdminSidebarMenu from '~/components/Admin/AdminSidebarMenu';
import AdminHeader from '../components/AdminHeader';
import { useUser } from '~/stores/UserStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataService } from '~/services/userDataService';

function AdminLayout({ children }) {
    const [userState, userDispatch] = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        userDataService.getUser().then((data) => {
            if (!data.username || !data.role === 'ADMIN') {
                navigate('/login');
            }
        });
    }, [userState]);

    return (
        <div className="flex flex-col min-h-[100vh]">
            <AdminHeader />
            <div className="flex flex-row items-stretch flex-1">
                <div className="w-[96px] md:flex flex-col hidden items-center">
                    <div className="flex-1 fixed">
                        <AdminSidebarMenu />
                    </div>
                </div>
                <div className="flex flex-col max-w-full flex-1 w-full md:w-[calc(100%-96px)] p-0 md:p-6">
                    {children}
                </div>
            </div>
            <SimpleFooter />
        </div>
    );
}

export default AdminLayout;

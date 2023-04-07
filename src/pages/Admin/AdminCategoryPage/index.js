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
import { reportService } from '~/services/reportService';
import ReportTable from '~/components/ReportTable';
import CategoryTable from '~/components/CategoryTable';
import { categoryService } from '~/services/categoryService';
import UpdateCategoryDialog from '~/components/UpdateCategoryDialog';

function AdminCategoryPage() {
    const [categoryListState, setcategoryListState] = useState([]);
    const [alreadyList, setalreadyList] = useState([]);

    const loadData = () => {
        categoryService.getCategorys().then((data) => {
            if (data.length >= 0) {
                const arr = data.map((item) => {
                    return {
                        ...item,
                        operation: { id: item.id, status: item.status },
                    };
                });
                setalreadyList(data.map((item) => item.code));
                setcategoryListState(arr);
            }
        });
    };

    const location = useLocation();

    useEffect(() => {
        loadData();
    }, [location]);
    const navigate = useNavigate();
    return (
        <div className="p-4 md:p-0">
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
            <h3 className="text-2xl font-bold my-4">Quản lý danh mục</h3>
            <UpdateCategoryDialog reload={loadData} alreadyList={alreadyList} />
            <div className="bg-white rounded">
                <h1 className="text-xl font-bold mt-8 p-2">Danh mục ({categoryListState.length})</h1>
                {categoryListState && (
                    <CategoryTable rows={categoryListState} alreadyList={alreadyList} loadData={loadData} />
                )}
            </div>
        </div>
    );
}

export default AdminCategoryPage;

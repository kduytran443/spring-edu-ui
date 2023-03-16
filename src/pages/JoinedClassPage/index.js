import { faReply, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassListIntro from '~/components/ClassListIntro';
import LoadingProcess from '~/components/LoadingProcess';
import NoClassFound from '~/components/NoClassFound';
import { API_BASE_URL, HOME_PAGE_URL } from '~/constants';
import { classService } from '~/services/classService';

function JoinedClassPage() {
    const [categoryDataState, setCategoryDataState] = useState({
        title: 'Lập trình',
        icon: 'https://cdn-icons-png.flaticon.com/512/3662/3662830.png',
        description: `Lập trình là một công việc mà người lập trình viên thiết kế, xây dựng và bảo trì các chương trình máy tính (phần mềm). Những người làm nghề lập trình được gọi là lập trình viên.
        Bằng cách sử dụng các đoạn mã lệnh (code), ngôn ngữ lập trình, và các tiện ích có sẵn, họ xây dựng, sửa lỗi hay nâng cấp các chương trình, ứng dụng, trò chơi, phần mềm, các trang web, hệ thống xử lí,… Giúp người dùng tương tác với nhau thông qua các thiết bị điện tử hoặc thực hiện các mệnh lệnh với máy tính.`,
    });

    const [classListState, setClassListState] = useState([]);

    const [quantityState, setQuantityState] = useState(classListState.length);

    useEffect(() => {
        setQuantityState(classListState.length);
    }, [classListState.length]);

    const navigate = useNavigate();
    useEffect(() => {
        classService.getClassReviewCardByUserId().then((data) => {
            if (data.length >= 0) {
                setClassListState(data);
            }
        });
    }, []);

    return (
        <div className="flex flex-col p-4">
            <div className="mb-[6px]">
                <Button
                    onClick={(e) => {
                        navigate(HOME_PAGE_URL);
                    }}
                    startIcon={<FontAwesomeIcon icon={faReply} />}
                >
                    Trang chủ
                </Button>
            </div>
            {classListState === null ? (
                <LoadingProcess />
            ) : (
                <div className="w-full mt-6">
                    <ClassListIntro
                        listItem={classListState}
                        hiddenHeader
                        scroll={false}
                        title="Lập trình"
                        icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
                    />
                </div>
            )}
            {classListState !== null && classListState.length === 0 && <NoClassFound />}
        </div>
    );
}

export default JoinedClassPage;

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import ClassListIntro from '~/components/ClassListIntro';
import { API_BASE_URL } from '~/constants';

function JoinedClassPage() {
    const [categoryDataState, setCategoryDataState] = useState({
        title: 'Lập trình',
        icon: 'https://cdn-icons-png.flaticon.com/512/3662/3662830.png',
        description: `Lập trình là một công việc mà người lập trình viên thiết kế, xây dựng và bảo trì các chương trình máy tính (phần mềm). Những người làm nghề lập trình được gọi là lập trình viên.
        Bằng cách sử dụng các đoạn mã lệnh (code), ngôn ngữ lập trình, và các tiện ích có sẵn, họ xây dựng, sửa lỗi hay nâng cấp các chương trình, ứng dụng, trò chơi, phần mềm, các trang web, hệ thống xử lí,… Giúp người dùng tương tác với nhau thông qua các thiết bị điện tử hoặc thực hiện các mệnh lệnh với máy tính.`,
    });

    const [classListState, setClassListState] = useState(() => {
        return [
            {
                id: 1,
                name: 'Kiến Thức Nhập Môn IT',
                description: `Lập trình máy tính hay lập chương trình máy tính thường gọi tắt là lập trình (tiếng Anh: Computer programming, thường gọi tắt là programming) ...`,
                img: 'https://caodangbachkhoahanoi.edu.vn/wp-content/uploads/2022/04/hoc-lap-trinh-bat-dau-tu-dau2.jpg',
                registed: true,
            },
        ];
    });

    const [quantityState, setQuantityState] = useState(classListState.length);

    useEffect(() => {
        setQuantityState(classListState.length);
    }, [classListState.length]);

    return (
        <div className="flex flex-col p-4">
            <ClassListIntro
                listItem={classListState}
                hiddenHeader
                scroll={false}
                title="Lập trình"
                icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
            />
        </div>
    );
}

export default JoinedClassPage;

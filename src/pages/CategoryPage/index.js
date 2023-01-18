import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Pagination } from '@mui/material';
import { useState } from 'react';
import CourseListIntro from '~/components/CourseListIntro';

function CategoryPage() {
    const [categoryDataState, setCategoryDataState] = useState({
        title: 'Lập trình',
        icon: 'https://cdn-icons-png.flaticon.com/512/3662/3662830.png',
        description: `Lập trình là một công việc mà người lập trình viên thiết kế, xây dựng và bảo trì các chương trình máy tính (phần mềm). Những người làm nghề lập trình được gọi là lập trình viên.
        Bằng cách sử dụng các đoạn mã lệnh (code), ngôn ngữ lập trình, và các tiện ích có sẵn, họ xây dựng, sửa lỗi hay nâng cấp các chương trình, ứng dụng, trò chơi, phần mềm, các trang web, hệ thống xử lí,… Giúp người dùng tương tác với nhau thông qua các thiết bị điện tử hoặc thực hiện các mệnh lệnh với máy tính.`,
    });

    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-col">
                <div className="flex flex-row items-center ">
                    <div className="mr-4 w-[40px] select-none overflow-hidden rounded">
                        <img className="w-full" alt="logo" src={categoryDataState.icon} />
                    </div>
                    <span className="text-2xl md:text-4xl font-black">{categoryDataState.title}</span>
                </div>
                <p className="py-2 text-slate-700">{categoryDataState.description}</p>
                <p className="py-4">
                    <span>
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        <b>276.368+</b> người khác đã học
                    </span>
                </p>
            </div>
            <div className="flex flex-row justify-between items-center p-4 bg-slate-100 rounded-lg">
                <div className="flex flex-row items-center">
                    <span className="hidden md:block">Sắp xếp theo</span>
                    <div className="flex flex-row">
                        <div className="mr-4">
                            <Button variant="text">Mới nhất</Button>
                        </div>
                        <div className="">
                            <Button variant="text">Hot nhất</Button>
                        </div>
                    </div>
                </div>
                <div>240 lớp học</div>
            </div>
            <CourseListIntro
                hiddenHeader
                scroll={false}
                title="Lập trình"
                icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
            />
            <div className="my-8">
                <Pagination count={10} color="primary" />
            </div>
        </div>
    );
}

export default CategoryPage;

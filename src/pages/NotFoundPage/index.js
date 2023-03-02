import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE_URL } from '~/constants';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center">
            <img
                className="max-w-full"
                alt="not found"
                src={
                    'https://cdn.dribbble.com/users/1537480/screenshots/7199901/media/04f1bc09a3a16f5efc155fe9ea829cbc.png?compress=1&resize=400x300&vertical=top'
                }
            />
            <div className="flex flex-col justify-center items-center p-4">
                <h1 className="text-4xl font-bold my-4">Không thể tìm thấy trang này</h1>
                <p>
                    Xin lỗi, trang bạn yêu cầu không thể tìm thấy. Vui lòng trở lại <b>trang chủ</b> hoặc liên hệ chúng
                    tôi qua: trankhanhduy18@gmail.com
                </p>
                <div className="mt-6">
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            navigate(HOME_PAGE_URL);
                        }}
                    >
                        <b>Trang chủ</b>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;

import { faCartShopping, faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Rating, Tab } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CustomVideoPlayer from '~/components/CustomVideoPlayer';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '~/constants';
import LoadingProcess from '~/components/LoadingProcess';
import ReviewCard from '~/components/ReviewCard';
import Line from '~/components/Line';
import { Box } from '@mui/system';
import { TabContext, TabList } from '@mui/lab';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function ClassIntroPage() {
    const [classDataState, setClassDataState] = useState(() => {
        return {
            name: 'Lớp học piano StarsPluck',
            description: `Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System, tương tự Bootstrap 4.
            Bạn sẽ học được gì?
            Biết cách xây dựng website Responsive
            Hiểu được tư tưởng thiết kế với Grid system
            Tự tay xây dựng được thư viện CSS Grid
            Tự hiểu được Grid layout trong bootstrap`,
            price: '99000',
            creDate: '23/01/2023',
            startDate: '30/01/2023',
            endDate: '5/01/2023',
            schedule: '7h - 11h Thứ 3 hàng tuần',
            status: 'Đã bắt đầu',
        };
    });

    const [editorValueState, setEditorValueState] = useState('');
    const [visibleEdittingState, setVisibleEdittingState] = useState(false);
    const [reviewListState, setReviewListState] = useState(null);
    const { classId } = useParams();

    const [allTabsState, setAllTabsState] = useState([
        {
            id: 1,
            name: 'Đánh giá',
        },
        {
            id: 2,
            name: 'Bình luận',
            path: '',
        },
    ]);
    const [value, setValue] = useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/review/${classId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setReviewListState(data);
            });
    }, []);

    return (
        <div className="w-full p-4 md:p-6 flex-1 flex lg:flex-row flex-col-reverse relative top-0">
            <div className="flex-1">
                <h1 className="text-4xl font-black mb-4">{classDataState.name}</h1>
                <div className="my-4">
                    <Rating name="half-rating" readOnly defaultValue={2.5} precision={0.5} />
                </div>

                <div className="flex flex-row items-center mb-4 md:mb-0">
                    <Avatar
                        src="https://mui.com/static/images/avatar/2.jpg"
                        variant="circular"
                        style={{ width: '64px', height: '64px' }}
                    />
                    <h1 className="ml-2 font-bold text-xl">Alex Hunter</h1>
                </div>
                <div>
                    <div className="my-4">
                        <span>
                            <b>Mô tả ngắn:</b>
                        </span>
                        <p>{classDataState.description}</p>
                    </div>
                    <div className="h-full">
                        {visibleEdittingState ? (
                            <div>
                                <ReactQuill theme="snow" value={editorValueState} onChange={setEditorValueState} />
                                <div className="flex flex-row justify-end">
                                    <div>
                                        <Button
                                            onClick={(e) => {
                                                setVisibleEdittingState(false);
                                            }}
                                            variant="outlined"
                                            startIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                        >
                                            Thay đổi
                                        </Button>
                                    </div>
                                    <div className="ml-4">
                                        <Button
                                            color="error"
                                            onClick={(e) => {
                                                setVisibleEdittingState(false);
                                            }}
                                            startIcon={<FontAwesomeIcon icon={faX} />}
                                        >
                                            Hủy
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Button
                                    onClick={(e) => {
                                        setVisibleEdittingState(true);
                                    }}
                                    variant="outlined"
                                    startIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                >
                                    Sửa
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="mt-10">
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        {allTabsState.map((tab) => {
                                            return <Tab label={tab.name} value={tab.id} key={tab.id} />;
                                        })}
                                    </TabList>
                                </Box>
                            </TabContext>
                        </Box>
                        {reviewListState === null ? (
                            <LoadingProcess />
                        ) : (
                            <ul className="border border-slate-200 rounded-lg shadow">
                                {reviewListState.map((review, index) => {
                                    return (
                                        <li key={index}>
                                            <ReviewCard
                                                avatar={review.userAvatar}
                                                comment={review.comment}
                                                stars={review.stars}
                                                username={review.userName}
                                            />
                                            {index < reviewListState.length - 1 && <Line />}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full top-0 left-0 w-full xl:w-[480px] lg:w-[360px] relative flex flex-col">
                <div className="flex flex-col w-full xl:w-[480px] lg:w-[360px] items-center justify-start mb-6 lg:mb-0 lg:fixed">
                    <div className="w-full p-0 lg:p-4">
                        <CustomVideoPlayer />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className={'text-3xl font-bold text-orange-400 text-center'}>
                            {classDataState.price > 0 ? VND.format(classDataState.price) : 'Miễn phí'}
                        </span>
                        <div className="my-4">
                            <Button size="large" className="bg-orange-400" variant="contained">
                                Đăng ký học <FontAwesomeIcon className="ml-2" icon={faCartShopping} />
                            </Button>
                        </div>
                        <ul>
                            <li>
                                <span>
                                    Ngày bắt đầu: <b>{classDataState.startDate}</b>
                                </span>
                            </li>
                            <li>
                                <span>
                                    Ngày kết thúc: <b>{classDataState.endDate}</b>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <b>{classDataState.schedule}</b>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassIntroPage;

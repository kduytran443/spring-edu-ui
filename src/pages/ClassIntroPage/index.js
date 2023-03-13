import {
    faArrowLeft,
    faBug,
    faCartShopping,
    faDoorOpen,
    faPenToSquare,
    faReply,
    faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Rating, Tab } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CustomVideoPlayer from '~/components/CustomVideoPlayer';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL, HOME_PAGE_URL, LOGIN_PAGE_URL } from '~/constants';
import LoadingProcess from '~/components/LoadingProcess';
import ReviewCard from '~/components/ReviewCard';
import Line from '~/components/Line';
import { Box } from '@mui/system';
import { TabContext, TabList } from '@mui/lab';
import CommentCard from '~/components/CommentCard';
import parse from 'html-react-parser';
import { DataGrid } from '@mui/x-data-grid';
import { getConfig } from '~/services/config';
import { classMemberService } from '~/services/classMemberService';
import SimpleDialog from '~/components/SimpleDialog';
import GreatIconButton from '~/components/GreatIconButton';
import { useUser } from '~/stores/UserStore';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const columns = [
    { field: 'day', headerName: 'Thứ', width: 100 },
    { field: 'start', headerName: 'Giờ bắt đầu', width: 130 },
    { field: 'end', headerName: 'Giờ kết thúc', width: 130 },
];

function ClassIntroPage() {
    const [classDataState, setClassDataState] = useState(() => {
        return {
            name: 'Tên lớp học',
            description: `Mô tả ngắn`,
            price: '99000',
            creDate: 'dd/mm/yyyy',
            startDate: 'dd/mm/yyyy',
            endDate: 'dd/mm/yyyy',
            schedule: 'Lịch hàng tuần',
            status: 'Đã bắt đầu',
        };
    });
    const navigate = useNavigate();

    const [editorValueState, setEditorValueState] = useState('');
    const [visibleEdittingState, setVisibleEdittingState] = useState(false);
    const [reviewListState, setReviewListState] = useState(null);
    const [commentListState, setCommentListState] = useState(null);
    const { classId } = useParams();

    const [rowsState, setRowsState] = useState([]);

    const [allTabsState, setAllTabsState] = useState([
        {
            id: 1,
            name: 'Đánh giá',
            type: 'review',
        },
        {
            id: 2,
            name: 'Bình luận',
            type: 'comment',
        },
    ]);
    const [value, setValue] = useState('review');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (classDataState.classSchedules) {
            //classScheduleWeeklyClassSchedule
            const rows = classDataState.classSchedules.map((item, index) => {
                //{ id: 3, day: '6', start: '7:00', end: '11:00' },
                return {
                    id: item.id,
                    day: item.dateName,
                    start: `${item.startHours}:${item.startMinutes}`,
                    end: `${item.endHours}:${item.endMinutes}`,
                };
            });

            setRowsState(rows);
        }
    }, [classDataState]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/review/${classId}`)
            .then((res) => res.json())
            .then((data) => {
                setReviewListState(data);
            });
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/comment/${classId}`)
            .then((res) => res.json())
            .then((data) => {
                setCommentListState(data);
            });
    }, []);

    useEffect(() => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/public/api/class-intro/${classId}`, config)
            .then((res) => res.json())
            .then((data) => {
                setClassDataState(data);
            });
    }, []);

    /*
    private Long userId;
	private String username;
	private String fullname;
	private String avatar;
	private String email;
	private Long classId;
	private String classRole;
	private float fee;
	private Timestamp createdDate;
	private int memberAccepted;
	private int classAccepted;
	private int discount;
	private Long discountId;
    */

    const [successfulEnrollmentState, setSuccessfulEnrollmentState] = useState(0);

    const enrollClass = () => {
        const classMember = {
            classId: classId,
            classRole: 'student',
            memberAccepted: 1,
            classAccepted: 0,
        };

        console.log('???', classMember);

        classMemberService.postClassMember(classMember).then((data) => {
            if (data.status !== 500) {
                setSuccessfulEnrollmentState(1);
                console.log('???  ok ok ok ok', classMember);
                setTimeout(() => {
                    navigate('/class/' + classId);
                }, 4000);
            } else {
            }
        });
    };

    let startTime = null;
    let endTime = null;
    if (classDataState.startTime) {
        startTime = new Date(classDataState.startTime);
    }
    if (classDataState.endTime) {
        endTime = new Date(classDataState.endTime);
    }

    let discount = null;

    if (classDataState?.discount) {
        const timeNow = new Date().getTime();
        if (timeNow >= classDataState.discount.startDate && timeNow <= classDataState.discount.endDate) {
            console.log('phù hợp');
            discount = classDataState.discount.discountPercent;
            console.log(classDataState.fee, classDataState.discountPercent);
        }
    }

    const [userState, userDispatch] = useUser();

    return (
        <div className="w-full p-4 md:p-6 flex-1 flex lg:flex-row flex-col-reverse relative top-0">
            <div className="flex-1">
                <div className="mb-[6px] lg:block hidden">
                    <Button
                        onClick={(e) => {
                            navigate('/category/' + classDataState.categoryCode);
                        }}
                        startIcon={<FontAwesomeIcon icon={faReply} />}
                    >
                        {classDataState.categoryName}
                    </Button>
                </div>
                <h1 className="text-4xl font-black mb-4">{classDataState.name}</h1>
                <div className="my-4">
                    {classDataState.stars && (
                        <Rating name="half-rating" readOnly defaultValue={classDataState.stars} precision={0.5} />
                    )}
                </div>

                <div className="flex flex-row items-center mb-4 md:mb-0">
                    <Avatar
                        src={classDataState.userAvatar}
                        variant="circular"
                        style={{ width: '64px', height: '64px' }}
                    />
                    <h1 className="ml-2 font-bold text-xl">{classDataState.userFullname}</h1>
                </div>
                <div className="w-full">
                    <h3 className="text-xl font-bold mt-8 mb-2">Thời khóa biểu</h3>
                    <div style={{ height: 280, width: '100%' }}>
                        <DataGrid rows={rowsState} columns={columns} />
                    </div>
                    <div className="my-4">
                        <span>
                            <b>Mô tả ngắn:</b>
                        </span>
                        {classDataState.textData && <p>{parse(classDataState.textData)}</p>}
                    </div>
                    <div className="h-full">
                        {visibleEdittingState ? (
                            <div>
                                <ReactQuill
                                    theme="snow"
                                    value={classDataState.textData}
                                    onChange={setEditorValueState}
                                />
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
                                {classDataState.userRoleCode && (
                                    <Button
                                        onClick={(e) => {
                                            setVisibleEdittingState(true);
                                        }}
                                        variant="outlined"
                                        startIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                    >
                                        Sửa
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="mt-10 w-full">
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        {allTabsState.map((tab) => {
                                            return <Tab label={tab.name} value={tab.type} key={tab.id} />;
                                        })}
                                    </TabList>
                                </Box>
                            </TabContext>
                        </Box>
                        {value === 'review' ? (
                            <ul className="border border-slate-200 rounded-lg shadow ease-in">
                                {reviewListState === null ? (
                                    <LoadingProcess />
                                ) : (
                                    reviewListState.map((review, index) => {
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
                                    })
                                )}
                            </ul>
                        ) : (
                            <ul className="border border-slate-200 rounded-lg shadow ease-in">
                                {commentListState === null ? (
                                    <LoadingProcess />
                                ) : (
                                    commentListState.map((review, index) => {
                                        return (
                                            <li key={index}>
                                                <CommentCard
                                                    avatar={review.userAvatar}
                                                    comment={review.comment}
                                                    username={review.userName}
                                                    fullname={review.fullname}
                                                    date={review.createdDate}
                                                />
                                                {index < commentListState.length - 1 && <Line />}
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full top-0 left-0 w-full xl:w-[480px] lg:w-[360px] relative flex flex-col">
                <div className="flex flex-col w-full xl:w-[480px] lg:w-[360px] items-center justify-start mb-6 lg:mb-0 lg:fixed">
                    <div className="mb-[6px] lg:hidden block">
                        <Button
                            onClick={(e) => {
                                navigate(HOME_PAGE_URL);
                            }}
                            startIcon={<FontAwesomeIcon icon={faReply} />}
                        >
                            Trang chủ
                        </Button>
                    </div>
                    <div className="w-full p-0 lg:p-4">
                        <CustomVideoPlayer src={classDataState.video} />
                    </div>
                    <div className="flex flex-col items-center mt-4 sm:mt-0">
                        {classDataState && !classDataState.userRoleCode && (
                            <div>
                                {discount === null ? (
                                    <span className={'text-3xl font-bold text-orange-400 text-center'}>
                                        <div>{classDataState.fee > 0 ? classDataState.fee : 'Miễn phí'} usd</div>
                                    </span>
                                ) : (
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="text-lg">
                                            <del>{classDataState.fee}</del>
                                            <span className="ml-4 text-blue-500">
                                                <b>Giảm {discount}%</b>
                                            </span>
                                        </p>
                                        <span className={'text-3xl font-bold text-orange-400 text-center'}>
                                            {classDataState.fee - classDataState.fee * (discount / 100)} usd
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="my-4">
                            {classDataState && classDataState.userRoleCode ? (
                                <Button
                                    onClick={(e) => {
                                        navigate('/class/' + classId);
                                    }}
                                    size="large"
                                    className="bg-orange-400"
                                    variant="contained"
                                >
                                    Vào lớp <FontAwesomeIcon className="ml-2" icon={faDoorOpen} />
                                </Button>
                            ) : (
                                <>
                                    <SimpleDialog
                                        openButton={
                                            <Button
                                                onClick={(e) => {
                                                    if (!userState.username) {
                                                        navigate(LOGIN_PAGE_URL);
                                                    }
                                                }}
                                                size="large"
                                                className="bg-red-400"
                                                variant="contained"
                                            >
                                                Đăng ký học <FontAwesomeIcon className="ml-2" icon={faCartShopping} />
                                            </Button>
                                        }
                                        agreeAction={enrollClass}
                                        title={'Đăng ký học'}
                                        visibleButton={
                                            !(successfulEnrollmentState === 1 || successfulEnrollmentState === -1)
                                        }
                                        closeAftarAgree={false}
                                    >
                                        <>
                                            {successfulEnrollmentState === 1 && (
                                                <div className="flex flex-col items-center justify-center mt-4">
                                                    <GreatIconButton />
                                                    <p>Đã đăng ký thành công, đang chuyển hướng</p>
                                                </div>
                                            )}
                                            {successfulEnrollmentState === 0 && <div>Xác nhận đăng ký lớp này</div>}
                                            {successfulEnrollmentState === -1 && (
                                                <div className="flex flex-col items-center justify-center mt-4">
                                                    <GreatIconButton
                                                        icon={<FontAwesomeIcon icon={faBug} />}
                                                        color="bg-red-500 shadow-red-300"
                                                    />
                                                    <p>Không đăng ký thành công, hãy thử lại!</p>
                                                </div>
                                            )}
                                        </>
                                    </SimpleDialog>
                                </>
                            )}
                        </div>
                        {classDataState.classSchedules && (
                            <ul>
                                <li>
                                    <span>
                                        Ngày bắt đầu:{' '}
                                        <b>{`${startTime.getDate()}/${
                                            startTime.getMonth() + 1
                                        }/${startTime.getFullYear()}`}</b>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Ngày kết thúc:{' '}
                                        <b>{`${endTime.getDate()}/${
                                            endTime.getMonth() + 1
                                        }/${endTime.getFullYear()}`}</b>
                                    </span>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassIntroPage;

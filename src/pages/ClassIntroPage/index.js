import {
    faArrowLeft,
    faBug,
    faCalendar,
    faCartShopping,
    faDoorOpen,
    faPenToSquare,
    faReply,
    faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, Rating, Tab, TextField } from '@mui/material';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import CustomVideoPlayer from '~/components/CustomVideoPlayer';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import ShowTextData from '~/components/ShowTextData';
import { reviewService } from '~/services/reviewService';
import SimpleSnackbar from '~/components/SimpleSnackbar';
import { renderToDate } from '~/utils';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { reportService } from '~/services/reportService';
import ReportClassDialog from '~/components/ReportClassDialog';
import { discountService } from '~/services/discountService';
import LoadingPageProcess from '~/components/LoadingPageProcess';
import AlertFailDialog from '~/components/AlertFailDialog';
import { NotificationSocketContext } from '~/components/NotificationSocketProvider';
import { notificationService } from '~/services/notificationService';
import PaypalCheckout from '~/components/PaypalCheckout';

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
    const [classDataState, setClassDataState] = useState({});
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
    const location = useLocation();

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

    const loadReviews = () => {
        console.log('okokokokokokokok');
        fetch(`${API_BASE_URL}/public/api/review/${classId}`)
            .then((res) => res.json())
            .then((data) => {
                setReviewListState(data);
            });
    };
    useEffect(() => {
        loadReviews();
    }, [location]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/comment/${classId}`)
            .then((res) => res.json())
            .then((data) => {
                setCommentListState(data);
            });
    }, [location]);

    useEffect(() => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/public/api/class-intro/${classId}`, config)
            .then((res) => res.json())
            .then((data) => {
                setClassDataState(data);
                setYoutubeVideo(data.video);
                setTimeout(() => {
                    setLoadingState(false);
                }, 600);
            });
    }, [location]);

    const [successfulEnrollmentState, setSuccessfulEnrollmentState] = useState(0);

    const enrollClass = () => {
        const classMember = {
            classId: classId,
            classRole: 'student',
            memberAccepted: 1,
            classAccepted: 0,
        };

        classMemberService.postClassMember(classMember).then((data) => {
            if (data.status !== 500) {
                setSuccessfulEnrollmentState(2);
            } else {
            }
        });
    };

    const buyClass = () => {
        const classMember = {
            classId: classId,
            classRole: 'student',
            memberAccepted: 1,
            classAccepted: 0,
        };

        classMemberService.postClassMember(classMember).then((data) => {
            if (data.status !== 500) {
                setSuccessfulEnrollmentState(1);
                const obj = {
                    content: userState.username + ' đã yêu cầu tham gia: ' + classDataState.name,
                    redirectUrl: `/class/${classId}/everyone`,
                    receiverIds: [classDataState.userId],
                };

                notificationService.post(obj).then((data) => {
                    setTimeout(() => {
                        sendContext([classDataState.userId]);
                        loadMemberState();
                        setSuccessfulEnrollmentState(0);
                    }, 2000);
                });
            } else {
            }
        });
    };

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

    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11 ? match[2] : null;
    }

    const [loadingState, setLoadingState] = useState(true);
    const [alertSuccess, setAlertSuccess] = useState(0);
    const [youtubeVideo, setYoutubeVideo] = useState();

    const ratingClass = (rating) => {};

    const [reviewRatingState, setReviewRatingState] = useState({});

    useEffect(() => {
        reviewService.getReviewByUserAndClass(classId).then((data) => {
            console.log('chú ý', data);
            if (data.stars > 0) {
                setReviewRatingState(data);
            }
        });
    }, [location]);

    const changeReviewRating = (e) => {
        const obj = { ...reviewRatingState };
        obj.stars = e.target.value;
        setReviewRatingState(obj);
    };
    const changeReviewComment = (e) => {
        const obj = { ...reviewRatingState };
        obj.comment = e.target.value;
        setReviewRatingState(obj);
    };

    const [alertState, setAlertState] = useState('');
    const postReview = () => {
        const review = {
            stars: reviewRatingState.stars,
            classId: classId,
            comment: reviewRatingState.comment,
        };
        console.log(review);
        setAlertState('Đã gửi thành công');

        reviewService.postReview(review).then((data) => {
            if (data) {
                setAlertSuccess(1);
                setTimeout(() => {
                    loadReviews();
                    setAlertSuccess(0);
                }, 1000);
            } else {
                setAlertSuccess(-1);
                setTimeout(() => {
                    setAlertSuccess(0);
                }, 1000);
            }
        });
    };
    const sendContext = useContext(NotificationSocketContext);

    const [memberState, setMemberState] = useState({});
    const loadMemberState = () => {
        classMemberService.getClassMemberByUserAndClassId(classId).then((data) => {
            if (data.userId) {
                setMemberState(data);
            }
        });
    };
    useEffect(() => {
        loadMemberState();
    }, [location]);

    const acceptJoinClass = () => {
        const classMember = {
            classId: classId,
            classRole: 'student',
            memberAccepted: 1,
            classAccepted: 1,
            fee: 0,
        };
        //classDataState.userId
        classMemberService.putClassMember(classMember).then((data) => {
            if (data) {
                setAlertSuccess(1);
                setTimeout(() => {
                    const obj = {
                        content: userState.username + ' đã tham gia: ' + classDataState.name,
                        redirectUrl: `/class/${classId}/everyone`,
                        receiverIds: [classDataState.userId],
                    };

                    notificationService.post(obj).then((data) => {
                        sendContext([classDataState.userId]);
                        navigate('/class/' + classId);
                    });
                }, 2000);
            }
        });
    };

    const [discountList, setDiscountList] = useState([]);
    useEffect(() => {
        discountService.getAllByClassId(classId).then((data) => {
            if (data.length >= 0) {
                setDiscountList(data);
            }
        });
    }, [location]);

    const [commentPagination, setCommentPagination] = useState(1);

    return (
        <div className="w-full p-4 md:p-6 flex-1 flex lg:flex-row flex-col-reverse relative top-0">
            <div className="flex-1">
                <AlertSuccessDialog open={alertSuccess === 1} />
                <AlertFailDialog open={alertSuccess === -1} />
                {loadingState && <LoadingPageProcess />}
                {classDataState && (
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
                )}
                <div className="w-full flex flex-row items-center">
                    <h1 className="text-4xl font-black mb-4">{classDataState.name}</h1>
                    <ReportClassDialog />
                </div>
                <div className="flex flex-row items-center">
                    <b>
                        <FontAwesomeIcon className="mr-2" icon={faCalendar} /> Ngày khởi tạo lớp:{' '}
                    </b>
                    <div>{renderToDate(classDataState.createdDate)}</div>
                </div>
                <div className="my-4">
                    {reviewListState && (
                        <div>
                            <Rating
                                readOnly={true}
                                defaultValue={
                                    reviewListState.reduce((pre, cur) => {
                                        console.log('stars1', pre);
                                        return pre + cur.stars;
                                    }, 0) / reviewListState.length
                                }
                                value={
                                    reviewListState.reduce((pre, cur) => {
                                        console.log('stars2', pre);
                                        return pre + cur.stars;
                                    }, 0) / reviewListState.length
                                }
                                precision={1}
                            />
                        </div>
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
                <div>
                    <PaypalCheckout
                        username={'username'}
                        email="email@gmail.com"
                        orderDataId={1}
                        totalPrice={200000}
                        successAction={console.log('ok')}
                    />
                </div>
                <div className="w-full">
                    {rowsState.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mt-8 mb-2">Thời khóa biểu</h3>
                            <div style={{ height: 280, width: '100%' }}>
                                <DataGrid rows={rowsState} columns={columns} />
                            </div>
                        </div>
                    )}
                    <div className="my-4">
                        <div className="text-2xl mb-4 mt-2">
                            <b>Mô tả:</b>
                        </div>
                        {classDataState.textData && <ShowTextData data={classDataState.textData} />}
                    </div>
                    <div className="mt-12">
                        {reviewRatingState.stars && (
                            <>
                                <p className="font-bold">Review của bạn về lớp này:</p>
                                <Rating
                                    readOnly={false}
                                    defaultValue={reviewRatingState.stars}
                                    value={reviewRatingState.stars}
                                    precision={1}
                                    onChange={changeReviewRating}
                                />
                            </>
                        )}
                        {classDataState.userRoleCode && (
                            <>
                                <div className="w-full">
                                    <TextField
                                        label="Đánh giá"
                                        className="w-full"
                                        multiline
                                        rows={2}
                                        onInput={changeReviewComment}
                                        value={reviewRatingState.comment}
                                    />
                                </div>
                                <Button onClick={postReview}>Đánh giá</Button>
                            </>
                        )}
                    </div>
                    <div className="mt-2 w-full">
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
                                    <>
                                        {reviewListState.length > 0 ? (
                                            <>
                                                {reviewListState
                                                    .filter((review, index) => {
                                                        return index + 1 <= commentPagination * 5;
                                                    })
                                                    .map((review, index) => {
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
                                                {reviewListState.length > commentPagination * 5 && (
                                                    <Button
                                                        onClick={(e) => {
                                                            setCommentPagination((pre) => pre + 1);
                                                        }}
                                                    >
                                                        Xem thêm
                                                    </Button>
                                                )}
                                            </>
                                        ) : (
                                            <div className="p-6">Chưa có đánh giá nào</div>
                                        )}
                                    </>
                                )}
                            </ul>
                        ) : (
                            <ul className="border border-slate-200 rounded-lg shadow ease-in">
                                {commentListState === null ? (
                                    <LoadingProcess />
                                ) : (
                                    <>
                                        {commentListState.length > 0 ? (
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
                                        ) : (
                                            <div className="p-6">Chưa có bình luận nào</div>
                                        )}
                                    </>
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
                        {classDataState.video ? (
                            <iframe
                                width="100%"
                                height="360"
                                src={'https://www.youtube.com/embed/' + getId(classDataState.video)}
                                title="Con đường trở thành lập trình viên Front-end! Học gì? Thứ tự học ra sao? Nên tập trung vào cái nào?"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        ) : (
                            <iframe
                                width="100%"
                                height="360"
                                src="https://www.youtube.com/embed/HndV87XpkWg"
                                title="What&#39;s Education For?"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        )}
                    </div>
                    <div className="flex flex-col items-center mt-4 sm:mt-0">
                        {classDataState && !classDataState.userRoleCode && (
                            <div>
                                {discount === null ? (
                                    <span className={'text-3xl font-bold text-orange-400 text-center'}>
                                        <div>{classDataState.fee > 0 ? classDataState.fee : 'Miễn phí'} VNĐ</div>
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
                                    {((memberState.memberAccepted === 0 && memberState.classAccepted === 0) ||
                                        (!memberState.memberAccepted && !memberState.classAccepted)) && (
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
                                                    Đăng ký học{' '}
                                                    <FontAwesomeIcon className="ml-2" icon={faCartShopping} />
                                                </Button>
                                            }
                                            agreeAction={
                                                classDataState.fee - classDataState.fee * (discount / 100) > 0
                                                    ? buyClass
                                                    : enrollClass
                                            }
                                            title={'Đăng ký học'}
                                            visibleButton={
                                                !(successfulEnrollmentState === 1 || successfulEnrollmentState === -1)
                                            }
                                            closeAftarAgree={false}
                                        >
                                            <>
                                                {successfulEnrollmentState === 2 && (
                                                    <div className="flex flex-col items-center justify-center mt-4">
                                                        <GreatIconButton />
                                                        <p>Đã gửi lời mời, đang đợi chấp thuận</p>
                                                    </div>
                                                )}
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
                                    )}
                                    {memberState.memberAccepted === 1 && memberState.classAccepted === 0 && (
                                        <div>
                                            <Button disabled variant="contained">
                                                Đang chờ phê duyệt
                                            </Button>
                                        </div>
                                    )}
                                    {memberState.memberAccepted === 0 && memberState.classAccepted === 1 && (
                                        <div>
                                            <Button onClick={acceptJoinClass} variant="contained">
                                                Chấp nhận
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {discountList.length > 0 && (
                            <div className="flex mb-2 flex-row items-center">
                                <b>Giảm giá</b>
                                <div className="ml-4">
                                    {discountList.reduce((previous, current) => {
                                        return previous + current.discountPercent;
                                    }, 0)}
                                    %
                                </div>
                            </div>
                        )}
                        {classDataState.classSchedules && (
                            <ul>
                                <li>
                                    <span>
                                        <b>Ngày bắt đầu:</b> {renderToDate(classDataState.startTime)}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <b>Ngày kết thúc:</b> {renderToDate(classDataState.endTime)}
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

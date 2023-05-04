import { faGraduationCap, faPlus, faReply, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClassListIntro from '~/components/ClassListIntro';
import LoadingProcess from '~/components/LoadingProcess';
import NoClassFound from '~/components/NoClassFound';
import { API_BASE_URL, HOME_PAGE_URL } from '~/constants';
import { classService } from '~/services/classService';

function JoinedClassPage() {
    const [classListState, setClassListState] = useState([]);

    const [quantityState, setQuantityState] = useState(classListState.length);
    const location = useLocation();

    useEffect(() => {
        setQuantityState(classListState.length);
    }, [classListState.length]);

    const navigate = useNavigate();
    useEffect(() => {
        classService.getClassReviewCardByUserId().then((data) => {
            if (data.length >= 0) {
                console.log('datadatadata', data);
                setClassListState(data);
            }
        });
    }, [location]);

    const ownerList = classListState.filter((item) => item.role === 'teacher');
    const supportList = classListState.filter((item) => item.role === 'supporter');
    const studyList = classListState.filter((item) => item.role === 'student');

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
            <div className="my-4">
                <Button
                    onClick={(e) => {
                        navigate('/create-class');
                    }}
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    color="primary"
                    size="large"
                    variant="outlined"
                >
                    Tạo lớp
                </Button>
            </div>
            {classListState === null ? (
                <LoadingProcess />
            ) : (
                <>
                    {ownerList.length > 0 && (
                        <>
                            <h2 className="mt-8 text-xl font-bold">
                                <FontAwesomeIcon icon={faGraduationCap} className="mr-4" />
                                Lớp sở hữu ({ownerList.length})
                            </h2>
                            <div className="w-full mt-6">
                                <ClassListIntro
                                    listItem={ownerList}
                                    hiddenHeader
                                    scroll={false}
                                    title="Lập trình"
                                    icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
                                />
                            </div>
                        </>
                    )}
                    {supportList.length > 0 && (
                        <>
                            <h2 className="mt-10 text-xl font-bold">
                                <FontAwesomeIcon icon={faGraduationCap} className="mr-4" />
                                Lớp đang hỗ trợ dạy ({supportList.length})
                            </h2>
                            <div className="w-full mt-6">
                                <ClassListIntro
                                    listItem={supportList}
                                    hiddenHeader
                                    scroll={false}
                                    title="Lập trình"
                                    icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
                                />
                            </div>
                        </>
                    )}

                    {studyList.length > 0 && (
                        <>
                            <h2 className="mt-10 text-xl font-bold">
                                <FontAwesomeIcon icon={faGraduationCap} className="mr-4" />
                                Lớp đang học ({studyList.length})
                            </h2>
                            <div className="w-full mt-6">
                                <ClassListIntro
                                    listItem={studyList}
                                    hiddenHeader
                                    scroll={false}
                                    title="Lập trình"
                                    icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
                                />
                            </div>
                        </>
                    )}
                </>
            )}
            {classListState !== null && classListState.length === 0 && (
                <NoClassFound message="Chưa hoạt động trong bất kỳ lớp học nào" />
            )}
        </div>
    );
}

export default JoinedClassPage;

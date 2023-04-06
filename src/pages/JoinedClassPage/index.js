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
            {classListState !== null && classListState.length === 0 && (
                <NoClassFound message="Chưa hoạt động trong bất kỳ lớp học nào" />
            )}
        </div>
    );
}

export default JoinedClassPage;

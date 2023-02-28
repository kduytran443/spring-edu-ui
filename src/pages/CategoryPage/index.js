import { faHome, faReply, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Pagination, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClassListIntro from '~/components/ClassListIntro';
import LoadingProcess from '~/components/LoadingProcess';
import NoClassFound from '~/components/NoClassFound';
import { API_BASE_URL, HOME_PAGE_URL } from '~/constants';

function CategoryPage() {
    const { categoryCode } = useParams();

    const [categoryDataState, setCategoryDataState] = useState({});

    const [classListState, setClassListState] = useState(null);

    const [quantityState, setQuantityState] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (classListState) setQuantityState(classListState.length);
    }, [classListState]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/category/${categoryCode}`)
            .then((res) => res.json())
            .then((data) => {
                setCategoryDataState(data);
            });
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/class-review/${categoryCode}`)
            .then((res) => res.json())
            .then((data) => {
                setClassListState(data);
            });
    }, []);

    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-col">
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
                <div className="flex flex-row items-center ">
                    {categoryDataState.icon ? (
                        <div className="mr-4 w-[40px] select-none overflow-hidden rounded">
                            <img className="w-full" alt="logo" src={categoryDataState.icon} />
                        </div>
                    ) : (
                        <div className="mr-4">
                            <Skeleton
                                width={64}
                                height={64}
                                variant="circular"
                                className="text-2xl md:text-4xl w-[50%]"
                            />
                        </div>
                    )}

                    <span className="text-2xl md:text-4xl font-black">
                        {categoryDataState.name ? (
                            categoryDataState.name
                        ) : (
                            <Skeleton variant="text" width={200} height={64} className="text-2xl md:text-4xl w-[50%]" />
                        )}
                    </span>
                </div>
                <p className="py-2 text-slate-700">
                    {categoryDataState.description ? (
                        categoryDataState.description
                    ) : (
                        <Skeleton
                            variant="rounded"
                            width="100%"
                            height={200}
                            className="text-2xl md:text-4xl w-[50%]"
                        />
                    )}
                </p>
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
                <div>{quantityState} lớp học</div>
            </div>
            {classListState === null ? (
                <LoadingProcess />
            ) : (
                <>
                    <ClassListIntro
                        listItem={classListState}
                        hiddenHeader
                        scroll={false}
                        title="Lập trình"
                        icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
                    />
                </>
            )}
            {classListState !== null && classListState.length === 0 && <NoClassFound />}
            {classListState !== null && classListState.length > 0 && (
                <div className="my-8">
                    <Pagination count={10} color="primary" />
                </div>
            )}
        </div>
    );
}

export default CategoryPage;

import { faReply, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ClassListIntro from '~/components/ClassListIntro';
import LoadingProcess from '~/components/LoadingProcess';
import NoClassFound from '~/components/NoClassFound';
import { HOME_PAGE_URL } from '~/constants';
import { categoryService } from '~/services/categoryService';
import { classService } from '~/services/classService';
import { inputNumber } from '~/utils';

function SearchPage() {
    //value, categoryCode, maxFee, rating
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get('value');
    const categoryCode = searchParams.get('categoryCode');
    const maxFee = searchParams.get('maxFee');
    const rating = searchParams.get('rating');

    const [classListState, setClassListState] = useState(null);

    const loadData = () => {
        const data = {
            value: value,
            categoryCode: categoryCode,
            maxFee: maxFee,
            rating: rating,
        };
        classService.searchClass(data).then((data) => {
            if (data.length >= 0) {
                setClassListState(data);
            }
        });
    };

    const navigate = useNavigate();
    const location = useLocation();

    const loadCategory = () => {
        categoryService.getCategorys().then((data) => {
            if (data.length >= 0) {
                setCategoryListState(data);
            }
        });
    };

    useEffect(() => {
        loadData();
        loadCategory();
    }, [location]);

    const [valueState, setValueState] = useState('');
    const [categoryListState, setCategoryListState] = useState([]);
    const [categoryState, setCategoryState] = useState();
    const [maxFeeState, setMaxFeeState] = useState('');
    const [ratingState, setRatingState] = useState('');
    const search = () => {
        const data = {
            value: valueState,
            categoryCode: categoryState,
            maxFee: maxFeeState,
            rating: ratingState,
        };
        classService.searchClass(data).then((data) => {
            if (data.length >= 0) {
                setClassListState(data);
            }
        });
    };

    return (
        <div>
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

            <div className="p-4 bg-slate-100 w-full rounded">
                <div className="font-bold my-4 text-xl">Tìm kiếm nâng cao</div>
                <div className="w-full my-4">
                    <TextField
                        className="w-full"
                        label="Tìm kiếm"
                        value={valueState}
                        onInput={(e) => {
                            setValueState(e.target.value);
                        }}
                    />
                </div>
                <div className="w-full my-4">
                    <TextField
                        className="w-full"
                        label="Giá cao nhất"
                        value={maxFeeState}
                        onInput={(e) => {
                            inputNumber(e.target.value, setMaxFeeState);
                        }}
                    />
                </div>
                {categoryListState && (
                    <div className="w-full my-4">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryState}
                                    label="Danh mục"
                                    onChange={(e) => {
                                        setCategoryState(e.target.value);
                                    }}
                                >
                                    {categoryListState.map((category) => (
                                        <MenuItem key={category.code} value={category.code}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                )}
                <div className="w-full my-4">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Rating thấp nhất</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={ratingState}
                                label="Rating thấp nhất"
                                onChange={(e) => {
                                    setRatingState(e.target.value);
                                }}
                            >
                                <MenuItem key={5} value={5}>
                                    5
                                </MenuItem>
                                <MenuItem key={4} value={4}>
                                    4
                                </MenuItem>
                                <MenuItem key={3} value={3}>
                                    3
                                </MenuItem>
                                <MenuItem key={2} value={2}>
                                    2
                                </MenuItem>
                                <MenuItem key={1} value={1}>
                                    1
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div
                    onClick={search}
                    className="w-full mt-8 mb-2 p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                >
                    <FontAwesomeIcon icon={faSearch} className="mr-2" /> Tìm kiếm
                </div>
            </div>
            {classListState && <div className="font-bold my-4 text-xl">{classListState.length} kết quả tìm kiếm</div>}
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

export default SearchPage;

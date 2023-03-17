import { faPlus, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PERSONAL_PAGE_URL } from '~/constants';
import { userDataService } from '~/services/userDataService';
import { getUserInfo } from '~/stores/UserStore';

function PersonalEditPage() {
    const [username, setUsername] = useState('');

    const [fullname, setFullname] = useState('');
    const [fullnameError, setFullnameError] = useState('');

    const [birthYear, setBirthYear] = useState('');
    const [birthYearError, setBirthYearError] = useState('');

    const [gender, setGender] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const onInputNumber = (e, callback, maxLength = 16) => {
        if (e.target.value.length < maxLength && !isNaN(e.target.value) && !e.target.value.includes(' ')) {
            callback(e.target.value);
        }
    };
    const navigate = useNavigate();

    const clear = () => {
        setFullnameError('');
        setBirthYearError('');
        setPhoneNumberError('');
    };
    const doFetch = async () => {
        userDataService.getUser().then((data) => {
            if (data) {
                setUsername(data.username);
                setFullname(data.fullname);
                setBirthYear(data.birthYear);
                setPhoneNumber(data.phoneNumber);
                setGender(data.gender);
            }
        });
    };
    useEffect(() => {
        doFetch();
    }, []);

    const submit = () => {
        let valid = true;

        if (fullname.length < 8) {
            valid = false;
            setFullnameError('Họ và tên ít nhất 8 kí tự');
        }

        if (birthYear.length < 4 && birthYear.length > 4) {
            valid = false;
            setBirthYearError('Năm sinh không hợp lệ');
        }

        if (phoneNumber.length < 10) {
            valid = false;
            setPhoneNumberError('Số điện thoại không hợp lệ');
        }

        if (valid) {
            const obj = {
                username: username,
                fullname: fullname,
                birthYear: birthYear,
                phoneNumber: phoneNumber,
                gender: gender,
            };
            userDataService.putUser(obj).then((data) => {
                if (data.id) {
                    navigate('/personal');
                }
            });
        }
    };

    return (
        <div className="w-full">
            <div className="mb-[6px]">
                <Button
                    onClick={(e) => {
                        navigate(PERSONAL_PAGE_URL);
                    }}
                    startIcon={<FontAwesomeIcon icon={faReply} />}
                >
                    Quay lại
                </Button>
            </div>
            <h3>Cập nhật thông tin cá nhân</h3>
            <div className="w-full">
                <div className="w-full my-4">
                    Username
                    <TextField className="w-full" value={username} disabled />
                </div>
                <div className="w-full my-4">
                    Họ và tên
                    <TextField
                        className="w-full"
                        value={fullname}
                        onInput={(e) => {
                            setFullname(e.target.value);
                        }}
                    />
                    {fullnameError && <div className="text-red-500">*{fullnameError}</div>}
                </div>
                <div className="w-full my-4">
                    Năm sinh
                    <TextField
                        className="w-full"
                        value={birthYear}
                        onInput={(e) => onInputNumber(e, setBirthYear, 4)}
                    />
                    {birthYearError && <div className="text-red-500">*{birthYearError}</div>}
                </div>
                <div className="w-full my-4">
                    Số điện thoại
                    <TextField
                        className="w-full"
                        value={phoneNumber}
                        onInput={(e) => onInputNumber(e, setPhoneNumber, 11)}
                    />
                    {phoneNumberError && <div className="text-red-500">*{phoneNumberError}</div>}
                </div>
                {gender && (
                    <div className="mb-2 mt-4 w-full">
                        Giới tính
                        <FormControl fullWidth>
                            <InputLabel id="select-label-gender-signup">Giới tính</InputLabel>
                            <Select
                                labelId="select-label-gender-signup"
                                id="select-gender-signup"
                                value={gender}
                                defaultValue={gender}
                                label="Giới tính"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value={'male'}>Nam</MenuItem>
                                <MenuItem value={'female'}>Nữ</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                )}

                <div
                    onClick={submit}
                    className="w-full mt-10 p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> Sửa
                </div>
            </div>
        </div>
    );
}

export default PersonalEditPage;

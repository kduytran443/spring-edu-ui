import {
    faBirthdayCake,
    faEnvelope,
    faLock,
    faPhone,
    faRightFromBracket,
    faRightToBracket,
    faSignature,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Alert,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Line from '~/components/Line';
import { HOME_PAGE_URL, LOGIN_PAGE_URL, SIGNUP_PAGE_URL } from '~/constants';
import { userDataService } from '~/services/userDataService';
import { useUser } from '~/stores/UserStore';

function SignUpPage() {
    const navigate = useNavigate();
    const [userState, userDispatch] = useUser();
    const location = useLocation();

    useEffect(() => {
        if (userState.jwt) {
            navigate(HOME_PAGE_URL);
        }
    }, [location]);

    //all data state
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [repasswordState, setRepasswordState] = useState('');
    const [fullnameState, setFullnameState] = useState('');
    const [phoneNumberState, setPhoneNumberState] = useState('');
    const [emailState, setEmailState] = useState('');
    const [genderState, setGenderState] = useState('');
    const [birthYearState, setBirthYearState] = useState('');
    const [policyCheckedState, setPolicyCheckedState] = useState(false);

    //all error state
    const [usernameErrorState, setUsernameErrorState] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState('');
    const [repasswordErrorState, setRepasswordErrorState] = useState('');
    const [fullnameErrorState, setFullnameErrorState] = useState('');
    const [emailErrorState, setEmailErrorState] = useState('');
    const [phoneNumberErrorState, setPhoneNumberErrorState] = useState('');
    const [genderErrorState, setGenderErrorState] = useState('');
    const [birthYearErrorState, setBirthYearErrorState] = useState('');
    const [errorState, setErrorState] = useState('');

    const clearError = () => {
        setUsernameErrorState('');
        setPasswordErrorState('');
        setFullnameErrorState('');
        setPhoneNumberErrorState('');
        setBirthYearErrorState('');
        setGenderErrorState('');
        setErrorState('');
        setRepasswordErrorState('');
        setEmailErrorState('');
    };

    const submitForm = () => {
        let validForm = true;
        clearError();

        if (!usernameState) {
            validForm = false;
            setUsernameErrorState('Không hợp lệ!');
        }
        if (!passwordState || passwordState.length < 6) {
            validForm = false;
            setPasswordErrorState('Mật khẩu tối thiểu 6 kí tự!');
        }
        if (!repasswordState || repasswordState !== passwordState) {
            validForm = false;
            setRepasswordErrorState('Không hợp lệ!');
        }
        if (!fullnameState) {
            validForm = false;
            setFullnameErrorState('Không hợp lệ!');
        }
        if (!phoneNumberState) {
            validForm = false;
            setPhoneNumberErrorState('Không hợp lệ!');
        }
        if (!birthYearState) {
            validForm = false;
            setBirthYearErrorState('Không hợp lệ!');
        }
        if (!genderState) {
            validForm = false;
            setGenderErrorState('Không hợp lệ!');
        }
        if (!emailState) {
            validForm = false;
            setEmailErrorState('Không hợp lệ!');
        }
        if (!policyCheckedState) {
            validForm = false;
        }

        if (validForm) {
            console.log(usernameState, passwordState);

            //fetch-api
            const obj = {
                username: usernameState,
                fullname: fullnameState,
                email: emailState,
                phoneNumber: phoneNumberState,
                gender: genderState,
                brithYear: birthYearState,
                password: passwordState,
                avatar: '',
            };

            console.log('obj', obj);

            userDataService.signUp(obj).then((data) => {
                if (data.id) {
                    navigate('/personal');
                } else {
                    setErrorState(data.message);
                }
            });
        }
    };

    const onInput = (e, callback) => {
        if (!isNaN(e.target.value) && !e.target.value.includes(' ')) {
            callback(e.target.value);
        }
    };

    return (
        <div className="shadow-lg border rounded-lg bg-white p-6 min-h-[240px] max-w-md w-full flex flex-col sm:w-[420px]">
            <div className="my-2 mt-4 w-full">
                <TextField
                    onChange={(e) => {
                        setUsernameErrorState('');
                        setUsernameState(e.target.value);
                    }}
                    className="w-full"
                    value={usernameState}
                    label="Tài khoản"
                    placeholder="Tài khoản"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faUser} />
                            </InputAdornment>
                        ),
                    }}
                    error={!!usernameErrorState}
                    helperText={usernameErrorState}
                />
            </div>

            <div className="mb-2 mt-4 w-full">
                <TextField
                    onChange={(e) => {
                        setPasswordErrorState('');
                        setPasswordState(e.target.value);
                    }}
                    className="w-full"
                    label="Mật khẩu"
                    placeholder="Mật khẩu"
                    value={passwordState}
                    type={'password'}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faLock} />
                            </InputAdornment>
                        ),
                    }}
                    error={!!passwordErrorState}
                    helperText={passwordErrorState}
                />
            </div>
            <div className="mb-2 mt-4 w-full">
                <TextField
                    onChange={(e) => {
                        setRepasswordErrorState('');
                        setRepasswordState(e.target.value);
                    }}
                    className="w-full"
                    label="Nhập lại mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    value={repasswordState}
                    type={'password'}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faLock} />
                            </InputAdornment>
                        ),
                    }}
                    error={!!repasswordErrorState}
                    helperText={repasswordErrorState}
                />
            </div>
            <div className="mb-2 mt-4 w-full">
                <TextField
                    onChange={(e) => {
                        setFullnameErrorState('');
                        setFullnameState(e.target.value);
                    }}
                    className="w-full"
                    label="Họ và tên"
                    placeholder="Họ và tên"
                    value={fullnameState}
                    type={'text'}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faSignature} />
                            </InputAdornment>
                        ),
                    }}
                    error={!!fullnameErrorState}
                    helperText={fullnameErrorState}
                />
            </div>
            <div className="mb-2 mt-4 w-full">
                <TextField
                    onChange={(e) => {
                        setPhoneNumberErrorState('');
                        setPhoneNumberState(e.target.value);
                    }}
                    className="w-full"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    value={phoneNumberState}
                    type={'number'}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faPhone} />
                            </InputAdornment>
                        ),
                    }}
                    error={!!phoneNumberErrorState}
                    helperText={phoneNumberErrorState}
                />
            </div>
            <div className="mb-2 mt-4 w-full">
                <TextField
                    onChange={(e) => {
                        setEmailErrorState('');
                        setEmailState(e.target.value);
                    }}
                    className="w-full"
                    label="Email"
                    placeholder="Email"
                    value={emailState}
                    type={'email'}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </InputAdornment>
                        ),
                    }}
                    error={!!emailErrorState}
                    helperText={emailErrorState}
                />
            </div>

            <div className="mb-2 mt-4 w-full">
                <TextField
                    error={!!birthYearErrorState}
                    helperText={birthYearErrorState}
                    label="Năm sinh"
                    placeholder="Năm sinh"
                    value={birthYearState}
                    onInput={(e) => {
                        setBirthYearErrorState('');
                        onInput(e, setBirthYearState);
                    }}
                    className="w-full"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faBirthdayCake} />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="mb-2 mt-4 w-full">
                <FormControl fullWidth>
                    <InputLabel id="select-label-gender-signup">Giới tính</InputLabel>
                    <Select
                        labelId="select-label-gender-signup"
                        id="select-gender-signup"
                        value={genderState}
                        label="Giới tính"
                        onChange={(e) => {
                            setGenderErrorState('');
                            setGenderState(e.target.value);
                        }}
                    >
                        <MenuItem value={'male'}>Nam</MenuItem>
                        <MenuItem value={'female'}>Nữ</MenuItem>
                    </Select>
                </FormControl>
                {birthYearErrorState && <div className="text-red-600 text-xs ml-4">{birthYearErrorState}</div>}
            </div>
            <div className="select-none">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={policyCheckedState}
                                onChange={(e) => setPolicyCheckedState(e.target.checked)}
                            />
                        }
                        label="Tôi đồng ý với điều khoản"
                    />
                </FormGroup>
            </div>
            {errorState && (
                <div>
                    <Alert severity="error">{errorState}</Alert>
                </div>
            )}
            <div className="mt-4 mb-0 w-full">
                <Button variant="contained" className="w-full" color="success" onClick={submitForm}>
                    <div className="w-full font-extrabold p-2">Đăng ký</div>
                </Button>
            </div>
            <Line />
            <div className="mb-4 mt-2 w-full">
                <Button
                    variant="contained"
                    onClick={(e) => {
                        navigate(LOGIN_PAGE_URL);
                    }}
                    className="w-full"
                >
                    <div className="w-full font-extrabold p-2">
                        <span className="mr-4">Đăng nhập</span> <FontAwesomeIcon icon={faRightFromBracket} />
                    </div>
                </Button>
            </div>
        </div>
    );
}

export default SignUpPage;

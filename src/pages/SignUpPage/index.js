import {
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Line from '~/components/Line';
import { HOME_PAGE_URL, LOGIN_PAGE_URL, SIGNUP_PAGE_URL } from '~/constants';

function SignUpPage() {
    const navigate = useNavigate();

    //all data state
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [repasswordState, setRepasswordState] = useState('');
    const [fullnameState, setFullnameState] = useState('');
    const [phoneNumberState, setPhoneNumberState] = useState('');
    const [emailState, setEmailState] = useState('');
    const [dateOfBirthState, setDateOfBirthState] = useState('');
    const [genderState, setGenderState] = useState('');
    const [policyCheckedState, setPolicyCheckedState] = useState(false);

    //all error state
    const [usernameErrorState, setUsernameErrorState] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState('');
    const [repasswordErrorState, setRepasswordErrorState] = useState('');
    const [fullnameErrorState, setFullnameErrorState] = useState('');
    const [emailErrorState, setEmailErrorState] = useState('');
    const [phoneNumberErrorState, setPhoneNumberErrorState] = useState('');
    const [dateOfBirthErrorState, setDateOfBirthErrorState] = useState('');
    const [genderErrorState, setGenderErrorState] = useState('');
    const [errorState, setErrorState] = useState('');

    const clearError = () => {
        setUsernameErrorState('');
        setPasswordErrorState('');
        setFullnameErrorState('');
        setPhoneNumberErrorState('');
        setDateOfBirthErrorState('');
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
        if (!passwordState) {
            validForm = false;
            setPasswordErrorState('Không hợp lệ!');
        }
        if (!repasswordState) {
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
        if (!dateOfBirthState) {
            validForm = false;
            setDateOfBirthErrorState('Không hợp lệ!');
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

            navigate(HOME_PAGE_URL);
        } else {
            setErrorState('Sai tên đăng nhập hoặc mật khẩu');
        }
    };

    return (
        <div className="shadow-lg border rounded-lg bg-white p-6 min-h-[240px] max-w-md w-full flex flex-col sm:w-[420px]">
            <div className="my-2 mt-4 w-full">
                <TextField
                    onChange={(e) => setUsernameState(e.target.value)}
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
                    onChange={(e) => setPasswordState(e.target.value)}
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
                    onChange={(e) => setRepasswordState(e.target.value)}
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
                    onChange={(e) => setFullnameState(e.target.value)}
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
                    onChange={(e) => setPhoneNumberState(e.target.value)}
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
                    error={!!fullnameErrorState}
                    helperText={fullnameErrorState}
                />
            </div>
            <div className="mb-2 mt-4 w-full">
                <TextField
                    onChange={(e) => setEmailState(e.target.value)}
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
                Ngày sinh: <input type={'date'} />
            </div>
            <div className="mb-2 mt-4 w-full">
                <FormControl fullWidth>
                    <InputLabel id="select-label-gender-signup">Giới tính</InputLabel>
                    <Select
                        labelId="select-label-gender-signup"
                        id="select-gender-signup"
                        value={genderState}
                        label="Giới tính"
                        onChange={(e) => setGenderState(e.target.value)}
                    >
                        <MenuItem value={'male'}>Nam</MenuItem>
                        <MenuItem value={'female'}>Nữ</MenuItem>
                    </Select>
                </FormControl>
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

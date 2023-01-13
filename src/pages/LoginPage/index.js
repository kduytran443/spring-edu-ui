import { faLock, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Line from '~/components/Line';
import { HOME_PAGE_URL, SIGNUP_PAGE_URL } from '~/constants';

function LoginPage() {
    const navigate = useNavigate();

    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [saveUsernameState, setSaveUsernameState] = useState(false);

    const [usernameErrorState, setUsernameErrorState] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState('');

    const clearError = () => {
        setUsernameErrorState('');
        setPasswordErrorState('');
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

        if (validForm) {
            console.log(usernameState, passwordState);

            //fetch-api

            navigate(HOME_PAGE_URL);
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
                        autoCapitalize: 'off',
                        autoCorrect: 'off',
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
                        autoCapitalize: 'off',
                        autoCorrect: 'off',
                    }}
                    error={!!passwordErrorState}
                    helperText={passwordErrorState}
                />
            </div>
            <div className="select-none">
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox onChange={(e) => setSaveUsernameState(e.target.checked)} />}
                        label="Nhớ tên tài khoản"
                    />
                </FormGroup>
            </div>
            <div className="mt-4 mb-0 w-full">
                <Button variant="contained" className="w-full" onClick={submitForm}>
                    <div className="w-full font-extrabold p-2">Đăng nhập</div>
                </Button>
                <Button variant="text" className="w-full">
                    <div className="w-full p-2">Quên mật khẩu?</div>
                </Button>
            </div>
            <Line />
            <div className="mb-4 mt-2 w-full">
                <Button
                    variant="contained"
                    onClick={(e) => {
                        navigate(SIGNUP_PAGE_URL);
                    }}
                    color="success"
                    className="w-full"
                >
                    <div className="w-full font-extrabold p-2">
                        <span className="mr-4">Đăng ký</span> <FontAwesomeIcon icon={faRightToBracket} />
                    </div>
                </Button>
            </div>
        </div>
    );
}

export default LoginPage;

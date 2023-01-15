import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faOptinMonster } from '@fortawesome/free-brands-svg-icons';
import SpeechRecorder from '../SpeechRecorder';
import { useState } from 'react';

export default function CustomizedInputBase() {
    const [searchInputValueState, setSearchInputValueState] = useState('');

    const onSubmitInput = (value) => {
        setSearchInputValueState(value);
    };

    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <TuneIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm mã lớp, tên lớp, người dạy,..."
                inputProps={{ 'aria-label': 'Tìm kiếm' }}
                value={searchInputValueState}
                onChange={(e) => {
                    setSearchInputValueState(e.target.value);
                }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <SpeechRecorder submitInput={onSubmitInput} />
        </Paper>
    );
}

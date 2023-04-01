import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <div className="w-full relative">
                    <LinearProgress
                        sx={{ minHeight: 32 }}
                        variant="determinate"
                        color={props.value >= 50 ? 'primary' : 'error'}
                        {...props}
                    />
                    <div className="absolute text-white font-semibold text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                        {props.value >= 50 ? 'Đạt' : 'Không đạt'}
                    </div>
                </div>
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ progress = 50 }) {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}

import { Avatar } from '@mui/material';

function TeacherItemIntro() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Avatar
                sx={{ width: 128, height: 128 }}
                src={
                    'https://vcdn1-ngoisao.vnecdn.net/2021/10/15/messi1-8720-1634293782.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=hTOVrO1AGptYaG7l17xfPw'
                }
            />
            <div className="font-bold flex flex-col text-center">
                <span>Lionel Messi</span>
                <span className="text-sm text-gray-600">Cầu thủ vĩ đại nhất</span>
            </div>
        </div>
    );
}

export default TeacherItemIntro;

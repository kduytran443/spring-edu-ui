import { Avatar } from '@mui/material';
import TeacherItemIntro from '../TeacherItemIntro';

function TeacherListIntro({ items = [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1] }) {
    return (
        <div className="flex flex-col">
            <div>Người dạy nổi bật nhất</div>
            <div className="overflow-x-scroll w-full max-w-full">
                <ul className="flex flex-row ">
                    {items.map((item, index) => {
                        return (
                            <li key={index} className="mx-2">
                                <TeacherItemIntro />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default TeacherListIntro;

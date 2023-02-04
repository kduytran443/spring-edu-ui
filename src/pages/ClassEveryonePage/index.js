import { Accordion, AccordionSummary, Avatar, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import UserItemCard from '~/components/UserItemCard';

function ClassEveryonePage() {
    const [peopleListState, setPeopleListState] = useState(() => {
        return [
            {
                id: 1,
                name: 'Trần Khánh Duy',
                avatar: 'https://cdn-img.thethao247.vn/origin_768x0/storage/files/tranvutung/2023/02/01/messi-1482-1675227090-115424.jpeg',
                role: 'teacher',
            },
            {
                id: 2,
                name: 'Trần Văn A',
                avatar: 'https://cdn-img.thethao247.vn/origin_768x0/storage/files/tranvutung/2023/02/01/messi-1482-1675227090-115424.jpeg',
                role: 'student',
            },
            {
                id: 3,
                name: 'Nguyễn Văn B',
                avatar: 'https://cdn-img.thethao247.vn/origin_768x0/storage/files/tranvutung/2023/02/01/messi-1482-1675227090-115424.jpeg',
                role: 'student',
            },
            {
                id: 4,
                name: 'Trần Thị C',
                avatar: 'https://cdn-img.thethao247.vn/origin_768x0/storage/files/tranvutung/2023/02/01/messi-1482-1675227090-115424.jpeg',
                role: 'student',
            },
        ];
    });

    return (
        <div>
            <h1 className="font-black text-2xl my-4">Giáo viên</h1>
            <ul>
                {peopleListState.map((people) => {
                    if (people.role === 'teacher') {
                        return (
                            <li key={people.id} className="my-2">
                                <UserItemCard avatar={people.avatar} name={people.name} />
                            </li>
                        );
                    } else return null;
                })}
            </ul>
            <div className="my-4">
                <Divider />
            </div>

            <h1 className="font-black text-2xl my-4">Học viên</h1>
            <ul>
                {peopleListState.map((people) => {
                    if (people.role === 'student') {
                        return (
                            <li key={people.id} className="my-2">
                                <UserItemCard avatar={people.avatar} name={people.name} />
                            </li>
                        );
                    } else return null;
                })}
            </ul>
        </div>
    );
}

export default ClassEveryonePage;

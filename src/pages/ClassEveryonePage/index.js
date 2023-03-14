import { Accordion, AccordionSummary, Avatar, Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserAccordion from '~/components/UserAccordion';
import UserItemCard from '~/components/UserItemCard';
import { API_BASE_URL } from '~/constants';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { classMemberService } from '~/services/classMemberService';

function ClassEveryonePage() {
    const { classId } = useParams();
    const [peopleListState, setPeopleListState] = useState([]);

    useEffect(() => {
        /*PRIVATE*/
        classMemberService.getClassMemberByClassId(classId).then((data) => {
            console.log(data);
            setPeopleListState(data);
        });
    }, [classId]);

    /*
    useEffect(() => {
        fetch(`${API_BASE_URL}/public/api/class-member?classId=${classId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPeopleListState(data);
            });
    }, [classId]);
    */

    return (
        <div>
            <h1 className="font-black text-2xl my-4 pl-2 md:pl-0">Giáo viên</h1>
            <ul>
                {peopleListState.map((people) => {
                    if (people.classRole === 'teacher') {
                        return (
                            <li key={people.id} className="my-2">
                                <UserAccordion
                                    userInfo={<UserItemCard avatar={people.avatar} name={people.fullname} />}
                                >
                                    <p>
                                        <b>
                                            <PersonIcon /> Username:
                                        </b>{' '}
                                        {people.username}
                                    </p>
                                    <p>
                                        <b>
                                            <EmailIcon /> Email:
                                        </b>{' '}
                                        {people.email}
                                    </p>
                                </UserAccordion>
                            </li>
                        );
                    } else return null;
                })}
            </ul>
            <div className="my-4">
                <Divider />
            </div>
            <h1 className="font-black text-2xl my-4 pl-2 md:pl-0">Trợ giảng</h1>
            <ul>
                {peopleListState.map((people) => {
                    if (people.classRole === 'supporter') {
                        return (
                            <li key={people.id} className="my-2">
                                <UserAccordion
                                    userInfo={<UserItemCard avatar={people.avatar} name={people.fullname} />}
                                >
                                    <p>
                                        <b>
                                            <PersonIcon /> Username:
                                        </b>{' '}
                                        {people.username}
                                    </p>
                                    <p>
                                        <b>
                                            <EmailIcon /> Email:
                                        </b>{' '}
                                        {people.email}
                                    </p>
                                </UserAccordion>
                            </li>
                        );
                    } else return null;
                })}
            </ul>
            <div className="my-4">
                <Divider />
            </div>

            <div className="flex flex-row items-center justify-between">
                <h1 className="font-black text-2xl my-4 pl-2 md:pl-0">Học viên</h1>
                <div>
                    <Button>Thêm</Button>
                </div>
            </div>
            <ul>
                {peopleListState.map((people) => {
                    if (people.classRole === 'student') {
                        return (
                            <li key={people.id} className="my-2">
                                <UserAccordion
                                    userInfo={<UserItemCard avatar={people.avatar} name={people.fullname} />}
                                >
                                    <p>
                                        <b>
                                            <PersonIcon /> Username:
                                        </b>{' '}
                                        {people.username}
                                    </p>
                                    <p>
                                        <b>
                                            <EmailIcon /> Email:
                                        </b>{' '}
                                        {people.email}
                                    </p>
                                </UserAccordion>
                            </li>
                        );
                    } else return null;
                })}
            </ul>
        </div>
    );
}

export default ClassEveryonePage;

import { Accordion, AccordionSummary, Avatar, Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserAccordion from '~/components/UserAccordion';
import UserItemCard from '~/components/UserItemCard';
import { API_BASE_URL } from '~/constants';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { classMemberService } from '~/services/classMemberService';
import DialogAddNewMember from '~/components/DialogAddNewMember';
import SimpleAccordion from '~/components/SimpleAccordion';
import SimpleCustomAccordion from '~/components/SimpleCustomAccordion';
import InvitedClassMember from '~/components/InvitedClassMember';
import RequestClassMember from '~/components/RequestClassMember';

function ClassEveryonePage() {
    const { classId } = useParams();
    const [peopleListState, setPeopleListState] = useState([]);

    const [invitedUserListState, setInvitedUserListState] = useState([]);
    const [requestUserListState, setRequestUserListState] = useState([]);

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

    const loadInvitedUser = () => {
        classMemberService.getInvitedClassMemberByClassId(classId).then((data) => {
            if (data.length > 0) {
                setInvitedUserListState(data);
            }
        });
    };

    const loadRequestUser = () => {
        classMemberService.getRequestClassMemberByClassId(classId).then((data) => {
            if (data.length > 0) {
                setRequestUserListState(data);
            }
        });
    };

    useEffect(() => {
        loadInvitedUser();
        loadRequestUser();
    }, []);

    return (
        <div>
            <SimpleCustomAccordion name="Danh sách đang mời">
                {invitedUserListState.map((user, index) => {
                    return (
                        <InvitedClassMember
                            key={index}
                            avatar={user.avatar}
                            classId={classId}
                            username={user.username}
                            reload={loadInvitedUser}
                            userId={user.userId}
                            date={user.createdDate}
                        />
                    );
                })}
            </SimpleCustomAccordion>
            <SimpleCustomAccordion name="Danh sách yêu cầu">
                {requestUserListState.map((user, index) => {
                    return (
                        <RequestClassMember
                            key={index}
                            avatar={user.avatar}
                            classId={classId}
                            username={user.username}
                            reload={loadInvitedUser}
                            userId={user.userId}
                            date={user.createdDate}
                        />
                    );
                })}
            </SimpleCustomAccordion>
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
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-black text-2xl my-4 pl-2 md:pl-0">Giáo viên được mời</h1>
                <div>
                    <DialogAddNewMember role="supporter" currentList={peopleListState} classId={classId} />
                </div>
            </div>
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
                    <DialogAddNewMember role="student" currentList={peopleListState} classId={classId} />
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

import { Accordion, AccordionSummary, Avatar, Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import AlertSuccessDialog from '~/components/AlertSuccessDialog';

function ClassEveryonePage() {
    const { classId } = useParams();
    const [peopleListState, setPeopleListState] = useState([]);

    const [invitedUserListState, setInvitedUserListState] = useState([]);
    const [requestUserListState, setRequestUserListState] = useState([]);

    const loadInvitedUser = () => {
        classMemberService.getInvitedClassMemberByClassId(classId).then((data) => {
            if (data.length >= 0) {
                setInvitedUserListState(data);
            }
        });
    };

    const loadRequestUser = () => {
        classMemberService.getRequestClassMemberByClassId(classId).then((data) => {
            if (data.length >= 0) {
                setRequestUserListState(data);
            }
        });
    };

    const loadData = () => {
        classMemberService.getClassMemberByClassId(classId).then((data) => {
            setPeopleListState(data);
        });
        loadInvitedUser();
        loadRequestUser();
    };
    const location = useLocation();
    useEffect(() => {
        /*PRIVATE*/
        loadUserData();
        loadData();
    }, [location]);

    const navigate = useNavigate();
    const [userRole, setUserRole] = useState();
    const loadUserData = () => {
        classMemberService.getClassMemberByUserAndClassId(classId).then((data) => {
            if (isValidRole(data.classRole)) {
                setUserRole(data.classRole);
            } else {
                navigate('/not-found-page');
            }
        });
    };
    const isValidRole = (role) => {
        if (role === 'teacher' || role === 'supporter' || role === 'student') {
            return true;
        }
        return false;
    };

    const [alertSuccess, setAlertSuccess] = useState(false);
    const sendToWaitingList = (userId) => {
        const classMember = {
            classId: classId,
            classRole: 'student',
            memberAccepted: 1,
            classAccepted: 0,
            fee: 0,
            userId: userId,
        };

        classMemberService.sendToWaitingList(classMember).then((data) => {
            if (data) {
                setAlertSuccess(true);
                setTimeout(() => {
                    loadUserData();
                    loadData();
                    setAlertSuccess(false);
                }, 2000);
            }
        });
    };

    return (
        <div>
            {userRole && userRole === 'teacher' && (
                <>
                    <SimpleCustomAccordion name="Danh sách đang mời">
                        {invitedUserListState.map((user, index) => {
                            return (
                                <InvitedClassMember
                                    key={index}
                                    avatar={user.avatar}
                                    classId={classId}
                                    username={user.username}
                                    reload={loadData}
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
                                    reload={loadData}
                                    userId={user.userId}
                                    date={user.createdDate}
                                />
                            );
                        })}
                    </SimpleCustomAccordion>
                </>
            )}
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
                {userRole && userRole === 'teacher' && (
                    <div>
                        <DialogAddNewMember role="supporter" currentList={peopleListState} classId={classId} />
                    </div>
                )}
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

            <AlertSuccessDialog open={alertSuccess} />
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-black text-2xl my-4 pl-2 md:pl-0">Học viên</h1>
                {userRole && userRole === 'teacher' && (
                    <div>
                        <DialogAddNewMember role="student" currentList={peopleListState} classId={classId} />
                    </div>
                )}
            </div>
            <ul>
                {peopleListState.map((people) => {
                    if (people.classRole === 'student') {
                        return (
                            <li key={people.userId} className="my-2">
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
                                    {userRole && userRole === 'teacher' && (
                                        <div>
                                            <Button
                                                onClick={(e) => {
                                                    sendToWaitingList(people.userId);
                                                }}
                                                disabled={people.fee > 0}
                                            >
                                                Đưa vào danh sách chờ
                                            </Button>
                                        </div>
                                    )}
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

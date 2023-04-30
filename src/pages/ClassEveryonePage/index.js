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
import { classService } from '~/services/classService';
import { notificationService } from '~/services/notificationService';
import { useContext } from 'react';
import { NotificationSocketContext } from '~/components/NotificationSocketProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import ClassMemberItemCard from '~/components/ClassMemberItemCard';
import images from '~/assets/images';
import CertificationDialog from '~/components/CertificationDialog';
import DeleteMemberDialog from '~/components/DeleteMemberDialog';

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

    const [classDataState, setClassDataState] = useState(null);

    useEffect(() => {
        classService.getClassIntroById(classId).then((data) => {
            if (data.status === 0) {
                navigate('/page-not-found');
            } else setClassDataState(data);
        });
    }, [classId]);

    const sendContext = useContext(NotificationSocketContext);

    const deleteMember = (userId) => {
        classMemberService.deleteClassMember({ userId: userId, classId: classId }).then((data) => {
            loadData();
            const obj = {
                content: 'Bạn đã bị xóa khỏi lớp: ' + classDataState.name,
                redirectUrl: '/class/' + classId + '/intro',
                receiverIds: [userId],
            };

            notificationService.post(obj).then((data) => {
                setTimeout(() => {
                    sendContext([userId]);
                }, 3000);
            });
        });
    };

    return (
        <div>
            {userRole && classDataState && userRole === 'teacher' && (
                <>
                    <SimpleCustomAccordion name="Danh sách đang mời">
                        {invitedUserListState.map((user, index) => {
                            return (
                                <InvitedClassMember
                                    classDataName={classDataState.name}
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
                    <SimpleCustomAccordion name="Danh sách chờ">
                        {requestUserListState.map((user, index) => {
                            return (
                                <RequestClassMember
                                    classDataName={classDataState.name}
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
                                    {userRole && userRole === 'teacher' && (
                                        <div className="mt-4">
                                            <Button
                                                size="small"
                                                onClick={(e) => {
                                                    deleteMember(people.userId);
                                                }}
                                                disabled={people.transaction}
                                                color="error"
                                                startIcon={<FontAwesomeIcon icon={faTrash} />}
                                            >
                                                Xóa khỏi lớp
                                            </Button>
                                        </div>
                                    )}
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
                                    userInfo={
                                        <ClassMemberItemCard
                                            certification={!!(people.certification && people.certification.id)}
                                            avatar={people.avatar}
                                            name={people.fullname}
                                        />
                                    }
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
                                        <div className="w-full justify-between flex flex-row items-center mt-4">
                                            <div className="flex flex-row items-center">
                                                <div>
                                                    <CertificationDialog
                                                        fullname={people.fullname}
                                                        username={people.username}
                                                        userId={people.userId}
                                                        reload={loadData}
                                                    />
                                                </div>
                                                <div>
                                                    <Button
                                                        onClick={(e) => {
                                                            navigate('/certificate/' + people.certification.id);
                                                        }}
                                                        startIcon={<FontAwesomeIcon icon={faEye} />}
                                                    >
                                                        Xem chứng nhận
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="">
                                                <DeleteMemberDialog
                                                    transaction={people.transaction}
                                                    userId={people.userId}
                                                    classDataState={classDataState}
                                                    reload={loadData}
                                                />
                                            </div>
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

import { faDoorOpen, faFile, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, IconButton, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Calendar, momentLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { useLocation, useParams } from 'react-router-dom';
import { classScheduleService } from '~/services/classScheduleService';
import CalendarItem from '~/components/CalendarItem';
import CalendarHistoryItem from '~/components/CalendarHistoryItem';
import { classMemberService } from '~/services/classMemberService';
import { meetingActionService } from '~/services/meetingActionService';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const myEventsList = [
    {
        id: 1,
        title: 'Dạy lớp Sinh học nâng cao',
        start: new Date(2023, 0, 19, 20, 0),
        end: new Date(2023, 0, 19, 21, 0),
        description: 'Dạy lớp nâng cao - đáp ứng kỳ thi',
        img: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
        classId: 1,
    },
    {
        id: 2,
        title: 'Lớp IT',
        start: new Date(2023, 0, 18, 17, 0),
        end: new Date(2023, 0, 18, 18, 30),
        description: `Nhằm mục đích truyền các kỹ năng cho người học, sinh viên hoặc bất kỳ đối tượng nào khác trong bối cảnh của một cơ sở giáo dục. Dạy học có quan hệ mật thiết với việc học, hoạt động chiếm lĩnh tri thức này của học sinh.`,
        img: 'https://www.nordantech.com/media/pages/blog/community/8-tipps-fuer-ein-erfolgreiches-meeting/00022d9063-1643812301/meeting-tipps-erfolgreich-1200x630.jpg',
        classId: 1,
    },
];
function ClassHistoryPage() {
    const dateNow = new Date();
    const { classId } = useParams();

    const location = useLocation();
    const [memberList, setMemberList] = useState();
    const [visibleAddingNewEventState, setVisibleAddingNewEventState] = useState(false);
    const [newEventState, setNewEventState] = useState({ title: '', start: new Date(), end: new Date() });
    const [newEventErrorState, setNewEventErrorState] = useState('');
    const [selectedEventState, setSelectedEventState] = useState();
    const [allEventsState, setAllEventsState] = useState(myEventsList);
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        classScheduleService.getClassSchedules(classId).then((data) => {
            if (data.length > 0) {
                let scheduleDataList = [];

                data.forEach((schedule) => {
                    let start = new Date(schedule.startTimeOfClass);
                    let end = new Date(schedule.endTimeOfClass);

                    while (start < end) {
                        const nameDayOfWeek = daysOfWeek[start.getDay()];
                        if (nameDayOfWeek === schedule.weeklyClassScheduleCode) {
                            var starTime = new Date(
                                start.getFullYear(),
                                start.getMonth(),
                                start.getDate(),
                                schedule.startHours,
                                schedule.startMinutes,
                            );
                            var endTime = new Date(
                                start.getFullYear(),
                                start.getMonth(),
                                start.getDate(),
                                schedule.endHours,
                                schedule.endMinutes,
                            );
                            scheduleDataList.push({
                                id: schedule.id,
                                title: schedule.className,
                                start: starTime,
                                end: endTime,
                                description: 'Đã đến giờ vào lớp học rồi.',
                                img: schedule.classAvatar,
                                classId: schedule.classId,
                            });
                        }
                        let newDate = start.setDate(start.getDate() + 1);
                        start = new Date(newDate);
                    }
                });
                setAllEventsState(scheduleDataList);
            }
        });
    }, [location]);

    useEffect(() => {
        classMemberService.getClassMemberByClassId(classId).then((data) => {
            if (data.length > 0) {
                const arr = data.filter((item) => item.classRole === 'student');
                setMemberList(arr);
            }
        });
    }, [location]);

    const updateEvent = (data) => {
        setAllEventsState((pre) => {
            const eventObj = {
                id: data.id,
                title: data.title,
                start: new Date(data.start),
                end: new Date(data.end),
                description: data.description,
                img: data.img,
            };

            return pre.map((item) => {
                return item.id === eventObj.id ? eventObj : item;
            });
        });
    };

    const closeItem = () => {
        setSelectedEventState();
    };

    useEffect(() => {
        console.log('selectedEventState', selectedEventState);
        if (selectedEventState) {
            meetingActionService
                .getAllByClassIdAndRange(classId, selectedEventState.start.getTime(), selectedEventState.end.getTime())
                .then((data) => {
                    console.log('history nè', data);
                    if (data.length >= 0) {
                        setHistoryList(data);
                    }
                });
        }
    }, [selectedEventState]);

    return (
        <div className="flex flex-col w-full items-start">
            <div className="w-full flex-1 flex-wrap items-stretch justify-stretch flex flex-row">
                <div className={`w-full ${!selectedEventState && 'xl:w-[100%]'}`}>
                    <Calendar
                        onSelectEvent={(e) => {
                            console.log(e.title, e.id);
                            setSelectedEventState({
                                title: e.title,
                                description: e.description,
                                start: e.start,
                                end: e.end,
                                img: e.img,
                                id: e.id,
                                classId: e.classId,
                            });
                        }}
                        localizer={localizer}
                        events={allEventsState}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                </div>
                {selectedEventState && (
                    <div className="flex-1 mt-6">
                        <CalendarHistoryItem
                            memberList={memberList}
                            data={selectedEventState}
                            historyList={historyList}
                            setData={setSelectedEventState}
                            onUpdate={updateEvent}
                            close={closeItem}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClassHistoryPage;

/*


        {
            action: 'join',
            username: 'niko',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 10, 0, 0, 0).getTime(),
        },
        {
            action: 'leave',
            username: 'niko',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 11, 0, 0, 0).getTime(),
        },
        {
            action: 'join',
            username: 'niko',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 11, 30, 0, 0).getTime(),
        },
        {
            action: 'leave',
            username: 'niko',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 12, 0, 0, 0).getTime(),
        },
        {
            action: 'join',
            username: 'abc',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 11, 30, 0, 0).getTime(),
        },
        {
            action: 'leave',
            username: 'abc',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 12, 0, 0, 0).getTime(),
        },
        {
            action: 'join',
            username: 'aaa',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 11, 30, 0, 0).getTime(),
        },
        {
            action: 'leave',
            username: 'aaa',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 12, 0, 0, 0).getTime(),
        },
        {
            action: 'join',
            username: 'aaabbb',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 11, 30, 0, 0).getTime(),
        },
        {
            action: 'leave',
            username: 'aaabbb',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 12, 0, 0, 0).getTime(),
        },
        {
            action: 'join',
            username: 'aaabbb123',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 11, 30, 0, 0).getTime(),
        },
        {
            action: 'leave',
            username: 'aaabbb123',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 12, 0, 0, 0).getTime(),
        },
        {
            action: 'join',
            username: '123123asd32asd',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 11, 30, 0, 0).getTime(),
        },
        {
            action: 'leave',
            username: '123123asd32asd',
            userAvatar:
                'https://www.svg.com/img/gallery/the-biggest-problem-with-gta-4s-niko-bellic/l-intro-1677755497.jpg',
            fullname: 'Niko Bellic',
            time: new Date(2023, 4, 5, 12, 0, 0, 0).getTime(),
        },

*/

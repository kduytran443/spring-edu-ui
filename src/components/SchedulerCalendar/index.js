import { Calendar, momentLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { useState } from 'react';
import { Alert, Button, IconButton, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faUser, faX, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import CalendarItem from '../CalendarItem';
import DateTimePicker from 'react-datetime-picker';
import ImageUploader from '../ImageUploader';

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
    },
    {
        id: 2,
        title: 'Lớp IT',
        start: new Date(2023, 0, 18, 17, 0),
        end: new Date(2023, 0, 18, 18, 30),
        description: `Nhằm mục đích truyền các kỹ năng cho người học, sinh viên hoặc bất kỳ đối tượng nào khác trong bối cảnh của một cơ sở giáo dục. Dạy học có quan hệ mật thiết với việc học, hoạt động chiếm lĩnh tri thức này của học sinh.`,
        img: 'https://www.nordantech.com/media/pages/blog/community/8-tipps-fuer-ein-erfolgreiches-meeting/00022d9063-1643812301/meeting-tipps-erfolgreich-1200x630.jpg',
    },
];

function SchedulerCalendar() {
    const [visibleAddingNewEventState, setVisibleAddingNewEventState] = useState(false);
    const [newEventState, setNewEventState] = useState({ title: '', start: new Date(), end: new Date() });
    const [newEventErrorState, setNewEventErrorState] = useState('');
    const [selectedEventState, setSelectedEventState] = useState();
    const [allEventsState, setAllEventsState] = useState(myEventsList);

    const addNewEvent = () => {
        if (newEventState.title && newEventState.start.getTime() < newEventState.end.getTime()) {
            setAllEventsState((pre) => [...pre, newEventState]);
            setNewEventErrorState('');
            setNewEventState({ title: '', start: new Date(), end: new Date(), img: '' });
        } else {
            setNewEventErrorState('Thông tin sự kiện không đúng!');
        }
    };

    const removeEvent = (e) => {
        const selectedEvents = allEventsState.filter((event) => {
            console.log(event.id, selectedEventState.id);
            return event.id !== selectedEventState.id;
        });
        console.log(selectedEvents);
        setAllEventsState(selectedEvents);
        setSelectedEventState();
    };

    const openVisibleAddingNewEventState = () => {
        setVisibleAddingNewEventState(true);
    };

    const closeVisibleAddingNewEventState = () => {
        setVisibleAddingNewEventState(false);
    };

    const onImageUploaded = (base64String) => {
        setNewEventState((pre) => {
            return { ...pre, img: base64String };
        });
    };

    return (
        <div className="flex flex-col w-full items-start">
            {visibleAddingNewEventState ? (
                <div className="relative flex flex-row justify-center items-center flex-wrap border-[1px] border-slate-200 rounded-lg shadow-md w-full p-8 mb-4">
                    <div className="absolute top-0 right-0">
                        <IconButton onClick={closeVisibleAddingNewEventState}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </IconButton>
                    </div>
                    <h1 className="w-full text-center pb-6 text-xl font-bold">Thêm sự kiện</h1>
                    <TextField
                        label="Tên sự kiện"
                        className="w-full md:w-auto"
                        variant="outlined"
                        size="small"
                        value={newEventState.title}
                        onChange={(e) => {
                            setNewEventState({ ...newEventState, title: e.target.value });
                        }}
                    />
                    <div className="z-[41] w-full md:w-auto md:ml-4">
                        <DateTimePicker
                            className="h-[40px] w-full md:w-auto"
                            onChange={(e) => {
                                setNewEventState({ ...newEventState, start: new Date(e.getTime()) });
                            }}
                            value={newEventState.start}
                        />
                    </div>
                    <div className="z-40 w-full md:w-auto md:ml-4">
                        <DateTimePicker
                            className="h-[40px] w-full md:w-auto"
                            onChange={(e) => {
                                setNewEventState({ ...newEventState, end: new Date(e.getTime()) });
                            }}
                            value={newEventState.end}
                        />
                    </div>
                    <div className="w-full md:w-auto md:ml-4">
                        <ImageUploader onInput={onImageUploaded} />
                    </div>
                    <div className="md:ml-4 mt-4 md:mt-0">
                        <Button onClick={addNewEvent} variant="contained">
                            Thêm
                        </Button>
                    </div>
                    {newEventErrorState && (
                        <Alert className="w-full mt-4" severity="error">
                            {newEventErrorState}
                        </Alert>
                    )}
                </div>
            ) : (
                <div className="my-4">
                    <Button
                        size={'large'}
                        color="primary"
                        onClick={openVisibleAddingNewEventState}
                        startIcon={<FontAwesomeIcon icon={faAdd} />}
                    >
                        Thêm sự kiện
                    </Button>
                </div>
            )}
            <div className="w-full flex-1 flex-wrap items-stretch justify-stretch flex flex-row">
                <div className={`w-full md:w-[70%] ${!selectedEventState && 'md:w-[100%]'}`}>
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
                    <div className="flex-1">
                        <CalendarItem
                            id={selectedEventState.id}
                            description={selectedEventState.description}
                            title={selectedEventState.title}
                            start={selectedEventState.start}
                            end={selectedEventState.end}
                            img={selectedEventState.img}
                            onRemove={removeEvent}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SchedulerCalendar;

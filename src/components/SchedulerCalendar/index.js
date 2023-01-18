import { Calendar, momentLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import CalendarItem from '../CalendarItem';
import DateTimePicker from 'react-datetime-picker';

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
        title: 'Dạy lớp abc',
        start: new Date(2023, 0, 19),
        end: new Date(2023, 0, 19),
    },
    {
        title: 'Dạy lớp 123',
        start: new Date(2023, 0, 18, 17, 0),
        end: new Date(2023, 0, 18, 18, 30),
    },
];

function SchedulerCalendar() {
    const [visibleAddingNewEventState, setVisibleAddingNewEventState] = useState(false);
    const [newEventState, setNewEventState] = useState({ title: '', start: new Date(), end: new Date() });
    const [selectedEventState, setSelectedEventState] = useState();
    const [allEventsState, setAllEventsState] = useState(myEventsList);

    const addNewEvent = () => {
        setAllEventsState((pre) => [...pre, newEventState]);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="">
                <TextField
                    label="Tên sự kiện"
                    variant="filled"
                    value={newEventState.title}
                    onChange={(e) => {
                        setNewEventState({ ...newEventState, title: e.target.value });
                    }}
                />
                <div className="z-40">
                    <DateTimePicker
                        onChange={(e) => {
                            setNewEventState({ ...newEventState, start: new Date(e.getTime()) });
                        }}
                        value={newEventState.start}
                    />
                </div>
                <div className="z-40">
                    <DateTimePicker
                        onChange={(e) => {
                            setNewEventState({ ...newEventState, end: new Date(e.getTime()) });
                        }}
                        value={newEventState.end}
                    />
                </div>
                <Button onClick={addNewEvent} variant="contained">
                    Thêm
                </Button>
            </div>
            <div className="w-full flex-1 flex-wrap items-stretch justify-stretch flex flex-row">
                <div className="w-full md:w-[70%]">
                    <Calendar
                        onDoubleClickEvent={(e) => {
                            console.log(e.title, e.id);
                        }}
                        localizer={localizer}
                        events={allEventsState}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                </div>
                <div className="flex-1">
                    <CalendarItem />
                </div>
            </div>
        </div>
    );
}

export default SchedulerCalendar;

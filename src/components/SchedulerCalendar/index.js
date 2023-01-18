import { Calendar, momentLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

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
    {
        title: 'Dạy lớp ghj',
        start: new Date(2023, 0, 20),
        end: new Date(2023, 0, 20),
    },
];

const SchedulerCalendar = (props) => (
    <div>
        <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
        />
    </div>
);

export default SchedulerCalendar;

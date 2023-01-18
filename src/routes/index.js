import {
    CALENDAR_PAGE_URL,
    CATEGORY_PAGE_URL,
    HOME_PAGE_URL,
    LOGIN_PAGE_URL,
    PERSONAL_PAGE_URL,
    SIGNUP_PAGE_URL,
} from '~/constants';
import FullLayout from '~/layouts/FullLayout';
import LoginLayout from '~/layouts/LoginLayout';
import CalendarPage from '~/pages/CalendarPage';
import CategoryPage from '~/pages/CategoryPage';
import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/LoginPage';
import PersonalPage from '~/pages/PersonalPage';
import SignUpPage from '~/pages/SignUpPage';

const publicRoutes = [
    {
        path: '/',
        component: HomePage,
        layout: FullLayout,
    },
    {
        path: `${HOME_PAGE_URL}`,
        component: HomePage,
        layout: FullLayout,
    },
    {
        path: `${LOGIN_PAGE_URL}`,
        component: LoginPage,
        layout: LoginLayout,
    },
    {
        path: `${SIGNUP_PAGE_URL}`,
        component: SignUpPage,
        layout: LoginLayout,
    },
    {
        path: `${CATEGORY_PAGE_URL}`,
        component: CategoryPage,
        layout: FullLayout,
    },
];

const privateRoutes = [
    {
        path: `${PERSONAL_PAGE_URL}`,
        component: PersonalPage,
        layout: FullLayout,
    },
    {
        path: `${CALENDAR_PAGE_URL}`,
        component: CalendarPage,
        layout: FullLayout,
    },
];

export { publicRoutes, privateRoutes };

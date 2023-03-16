import {
    CALENDAR_PAGE_URL,
    CATEGORY_PAGE_URL,
    CLASS_INTRO_PAGE_URL,
    HOME_PAGE_URL,
    LOGIN_PAGE_URL,
    PERSONAL_PAGE_URL,
    SIGNUP_PAGE_URL,
    JOINED_CLASS_PAGE_URL,
    CLASS_PAGE_URL,
    CLASS_EXERCISE_PAGE_URL,
    CLASS_EVERYONE_PAGE_URL,
    CLASS_MARK_PAGE_URL,
    CLASS_SETTING_PAGE_URL,
    CLASS_LESSON_PAGE_URL,
    CLASS_LIVE_PAGE_URL,
    CLASS_SPECIFIC_EXERCISE_PAGE_URL,
    CLASS_MESSAGE_PAGE_URL,
    INTRO_PAGE_URL,
    CLASS_LESSON_CREATE_PAGE_URL,
    CLASS_LESSON_UPDATE_PAGE_URL,
    CLASS_SCHEDULE_EDIT_PAGE_URL,
    CLASS_CREATE_PAGE_URL,
} from '~/constants';
import ClassLayout from '~/layouts/ClassLayout';
import FullLayout from '~/layouts/FullLayout';
import LoginLayout from '~/layouts/LoginLayout';
import CalendarPage from '~/pages/CalendarPage';
import CategoryPage from '~/pages/CategoryPage';
import ClassCreatePage from '~/pages/ClassCreatePage';
import ClassEveryonePage from '~/pages/ClassEveryonePage';
import ClassExercisePage from '~/pages/ClassExercisePage';
import ClassIntroPage from '~/pages/ClassIntroPage';
import ClassLessonPage from '~/pages/ClassLessonPage';
import ClassLessonCreatePage from '~/pages/ClassLessonPage/ClassLessonCreatePage';
import ClassLessonUpdatePage from '~/pages/ClassLessonPage/ClassLessonUpdatePage';
import ClassLivePage from '~/pages/ClassLivePage';
import ClassMarkPage from '~/pages/ClassMarkPage';
import ClassMessagePage from '~/pages/ClassMessagePage';
import ClassPage from '~/pages/ClassPage';
import ClassScheduleEditPage from '~/pages/ClassScheduleEditPage';
import ClassSettingPage from '~/pages/ClassSettingPage';
import ClassSpecificExercisePage from '~/pages/ClassSpecificExercisePage';
import HomePage from '~/pages/HomePage';
import IntroPage from '~/pages/IntroPage';
import JoinedClassPage from '~/pages/JoinedClassPage';
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
    {
        path: `${CLASS_INTRO_PAGE_URL}`,
        component: ClassIntroPage,
        layout: FullLayout,
    },
    {
        path: `${INTRO_PAGE_URL}`,
        component: IntroPage,
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
    {
        path: `${JOINED_CLASS_PAGE_URL}`,
        component: JoinedClassPage,
        layout: FullLayout,
    },
    {
        path: `${CLASS_PAGE_URL}`,
        component: ClassPage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_EXERCISE_PAGE_URL}`,
        component: ClassExercisePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_EVERYONE_PAGE_URL}`,
        component: ClassEveryonePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_MARK_PAGE_URL}`,
        component: ClassMarkPage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_SETTING_PAGE_URL}`,
        component: ClassSettingPage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_LESSON_PAGE_URL}`,
        component: ClassLessonPage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_LIVE_PAGE_URL}`,
        component: ClassLivePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_SPECIFIC_EXERCISE_PAGE_URL}`,
        component: ClassSpecificExercisePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_MESSAGE_PAGE_URL}`,
        component: ClassMessagePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_LESSON_CREATE_PAGE_URL}`,
        component: ClassLessonCreatePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_LESSON_UPDATE_PAGE_URL}`,
        component: ClassLessonUpdatePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_SCHEDULE_EDIT_PAGE_URL}`,
        component: ClassScheduleEditPage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_CREATE_PAGE_URL}`,
        component: ClassCreatePage,
        layout: FullLayout,
    },
];

export { publicRoutes, privateRoutes };

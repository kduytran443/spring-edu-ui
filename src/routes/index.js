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
    CLASS_EDIT_PAGE_URL,
    QUESTION_BANK_URL,
    QUESTION_BANK_DETAILS_URL,
    PERSONAL_EDIT_PAGE_URL,
    CLASS_EXERCISE_CREATE_PAGE_URL,
    CLASS_EXERCISE_EDIT_PAGE_URL,
    CLASS_DO_SPECIFIC_EXERCISE_PAGE_URL,
    CLASS_RESULT_EXERCISE_PAGE_URL,
    SEARCH_PAGE_URL,
    ADMIN_HOME_PAGE,
    ADMIN_USER_PAGE,
    ADMIN_CLASS_PAGE,
    ADMIN_REPORT_PAGE,
    ADMIN_CATEGORY_PAGE,
    CERTIFICATE_PAGE_URL,
} from '~/constants';
import AdminLayout from '~/layouts/AdminLayout';
import ClassLayout from '~/layouts/ClassLayout';
import FullLayout from '~/layouts/FullLayout';
import LoginLayout from '~/layouts/LoginLayout';
import AdminCategoryPage from '~/pages/Admin/AdminCategoryPage';
import AdminClassPage from '~/pages/Admin/AdminClassPage';
import AdminHomePage from '~/pages/Admin/AdminHomePage';
import AdminReportPage from '~/pages/Admin/AdminReportPage';
import AdminUserPage from '~/pages/Admin/AdminUserPage';
import CalendarPage from '~/pages/CalendarPage';
import CategoryPage from '~/pages/CategoryPage';
import CertificatePage from '~/pages/CertificatePage';
import ClassCreateExercisePage from '~/pages/ClassCreateExercisePage';
import ClassCreatePage from '~/pages/ClassCreatePage';
import ClassEditExercisePage from '~/pages/ClassEditExercisePage';
import ClassEditPage from '~/pages/ClassEditPage';
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
import DoExercisePage from '~/pages/DoExercisePage';
import ExerciseResultPage from '~/pages/ExerciseResultPage';
import HomePage from '~/pages/HomePage';
import IntroPage from '~/pages/IntroPage';
import JoinedClassPage from '~/pages/JoinedClassPage';
import LoginPage from '~/pages/LoginPage';
import PersonalPage from '~/pages/PersonalPage';
import PersonalEditPage from '~/pages/PersonalPage/PersonalEditPage';
import QuestionBankDetailsPage from '~/pages/QuestionBankDetailsPage';
import QuestionBankPage from '~/pages/QuestionBankPage';
import SearchPage from '~/pages/SearchPage';
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
    {
        path: `${SEARCH_PAGE_URL}`,
        component: SearchPage,
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
    {
        path: `${CLASS_EDIT_PAGE_URL}`,
        component: ClassEditPage,
        layout: ClassLayout,
    },
    {
        path: `${QUESTION_BANK_URL}`,
        component: QuestionBankPage,
        layout: FullLayout,
    },
    {
        path: `${QUESTION_BANK_DETAILS_URL}`,
        component: QuestionBankDetailsPage,
        layout: FullLayout,
    },
    {
        path: `${PERSONAL_EDIT_PAGE_URL}`,
        component: PersonalEditPage,
        layout: FullLayout,
    },
    {
        path: `${CLASS_EXERCISE_CREATE_PAGE_URL}`,
        component: ClassCreateExercisePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_EXERCISE_EDIT_PAGE_URL}`,
        component: ClassEditExercisePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_DO_SPECIFIC_EXERCISE_PAGE_URL}`,
        component: DoExercisePage,
        layout: ClassLayout,
    },
    {
        path: `${CLASS_RESULT_EXERCISE_PAGE_URL}`,
        component: ExerciseResultPage,
        layout: ClassLayout,
    },
    {
        path: `${CERTIFICATE_PAGE_URL}`,
        component: CertificatePage,
        layout: FullLayout,
    },
];

const adminRoutes = [
    {
        path: `${ADMIN_HOME_PAGE}`,
        component: AdminHomePage,
        layout: AdminLayout,
    },
    {
        path: `/admin/`,
        component: AdminHomePage,
        layout: AdminLayout,
    },
    {
        path: `${ADMIN_USER_PAGE}`,
        component: AdminUserPage,
        layout: AdminLayout,
    },
    {
        path: `${ADMIN_CLASS_PAGE}`,
        component: AdminClassPage,
        layout: AdminLayout,
    },
    {
        path: `${ADMIN_REPORT_PAGE}`,
        component: AdminReportPage,
        layout: AdminLayout,
    },
    {
        path: `${ADMIN_CATEGORY_PAGE}`,
        component: AdminCategoryPage,
        layout: AdminLayout,
    },
];

export { publicRoutes, privateRoutes, adminRoutes };

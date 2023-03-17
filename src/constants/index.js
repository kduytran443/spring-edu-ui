const HOME_PAGE_URL = '/home';
const LOGIN_PAGE_URL = '/login';
const SIGNUP_PAGE_URL = '/sign-up';
const INTRO_PAGE_URL = '/intro';
const PERSONAL_PAGE_URL = '/personal';
const PERSONAL_EDIT_PAGE_URL = '/personal/edit';
const CATEGORY_PAGE_URL = '/category/:categoryCode';
const CALENDAR_PAGE_URL = '/calendar';
const JOINED_CLASS_PAGE_URL = '/joined-class';
const CLASS_INTRO_PAGE_URL = '/class/:classId/intro';
const CLASS_PAGE_URL = '/class/:classId';
const CLASS_EXERCISE_PAGE_URL = '/class/:classId/exercise';
const CLASS_SPECIFIC_EXERCISE_PAGE_URL = '/class/:classId/exercise/:exerciseId';
const CLASS_EVERYONE_PAGE_URL = '/class/:classId/everyone';
const CLASS_MARK_PAGE_URL = '/class/:classId/mark';
const CLASS_SETTING_PAGE_URL = '/class/:classId/setting';
const CLASS_LESSON_PAGE_URL = '/class/:classId/lesson/:lessonId';
const CLASS_LESSON_CREATE_PAGE_URL = '/class/:classId/lesson-create';
const CLASS_LESSON_UPDATE_PAGE_URL = '/class/:classId/lesson-update/:lessonId';
const CLASS_LESSON_EDIT_PAGE_URL = '/class/:classId/lesson-edit';
const CLASS_LIVE_PAGE_URL = '/class/:classId/live';
const CLASS_MESSAGE_PAGE_URL = '/class/:classId/message';
const CLASS_SCHEDULE_EDIT_PAGE_URL = '/class/:classId/schedule-edit/:scheduleId';
const CLASS_CREATE_PAGE_URL = '/create-class';
const CLASS_EDIT_PAGE_URL = '/edit-class/:classId';
const QUESTION_BANK_URL = '/question-bank';
const QUESTION_BANK_DETAILS_URL = '/question-bank/:questionBankId';

const API_BASE_URL = 'http://192.168.1.3:8085';
const LOCAL_STORAGE_NAME = 'spring_edu';

const ACTION_GET_USER_INFO = 'ACTION_GET_USER_INFO';
const ACTION_SET_USER_INFO = 'ACTION_SET_USER_INFO';
const ACTION_CLEAR_USER_INFO = 'ACTION_CLEAR_USER_INFO';

export {
    HOME_PAGE_URL,
    LOGIN_PAGE_URL,
    SIGNUP_PAGE_URL,
    INTRO_PAGE_URL,
    PERSONAL_PAGE_URL,
    CATEGORY_PAGE_URL,
    CALENDAR_PAGE_URL,
    CLASS_INTRO_PAGE_URL,
    JOINED_CLASS_PAGE_URL,
    CLASS_PAGE_URL,
    CLASS_EXERCISE_PAGE_URL,
    CLASS_EVERYONE_PAGE_URL,
    CLASS_MARK_PAGE_URL,
    CLASS_SETTING_PAGE_URL,
    CLASS_LESSON_PAGE_URL,
    CLASS_LIVE_PAGE_URL,
    CLASS_SPECIFIC_EXERCISE_PAGE_URL,
    API_BASE_URL,
    CLASS_MESSAGE_PAGE_URL,
    ACTION_GET_USER_INFO,
    ACTION_SET_USER_INFO,
    LOCAL_STORAGE_NAME,
    ACTION_CLEAR_USER_INFO,
    CLASS_LESSON_UPDATE_PAGE_URL,
    CLASS_LESSON_EDIT_PAGE_URL,
    CLASS_LESSON_CREATE_PAGE_URL,
    CLASS_SCHEDULE_EDIT_PAGE_URL,
    CLASS_CREATE_PAGE_URL,
    CLASS_EDIT_PAGE_URL,
    QUESTION_BANK_URL,
    QUESTION_BANK_DETAILS_URL,
    PERSONAL_EDIT_PAGE_URL,
};

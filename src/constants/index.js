const HOME_PAGE_URL = '/home';
const LOGIN_PAGE_URL = '/login';
const SIGNUP_PAGE_URL = '/sign-up';
const INTRO_PAGE_URL = '/intro';
const PERSONAL_PAGE_URL = '/personal';
const PERSONAL_DETAILS_PAGE_URL = '/personal/:username/view';
const PERSONAL_EDIT_PAGE_URL = '/personal/edit';
const CATEGORY_PAGE_URL = '/category/:categoryCode';
const CALENDAR_PAGE_URL = '/calendar';
const JOINED_CLASS_PAGE_URL = '/joined-class';
const CLASS_INTRO_PAGE_URL = '/class/:classId/intro';
const CLASS_PAGE_URL = '/class/:classId';
const CLASS_EXERCISE_PAGE_URL = '/class/:classId/exercise';
const CLASS_EXERCISE_CREATE_PAGE_URL = '/class/:classId/exercise-create';
const CLASS_EXERCISE_EDIT_PAGE_URL = '/class/:classId/exercise/:exerciseId/edit';
const CLASS_SPECIFIC_EXERCISE_PAGE_URL = '/class/:classId/exercise/:exerciseId';
const CLASS_DO_SPECIFIC_EXERCISE_PAGE_URL = '/class/:classId/exercise/:exerciseId/do/:submittedExerciseId';
const CLASS_RESULT_EXERCISE_PAGE_URL = '/class/:classId/exercise/:exerciseId/result/:submittedExerciseId';
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
const CLASS_EDIT_PAGE_URL = '/class/:classId/setting/edit';
const CLASS_HISTORY_PAGE_URL = '/class/:classId/history';
const QUESTION_BANK_URL = '/question-bank';
const QUESTION_BANK_DETAILS_URL = '/question-bank/:questionBankId';
const SEARCH_PAGE_URL = '/search';
const CHAT_PAGE_URL = '/chat/:classId?';
const CERTIFICATE_PAGE_URL = '/certificate/:certificateId?';
const NOTE_PAGE_URL = '/note/:noteId';
const WORK_PAGE_URL = '/work';
const FILE_PAGE_URL = '/file/:fileId';

//ADMIN
const ADMIN_HOME_PAGE = '/admin/home';
const ADMIN_USER_PAGE = '/admin/user';
const ADMIN_CLASS_PAGE = '/admin/class';
const ADMIN_CATEGORY_PAGE = '/admin/category';
const ADMIN_PERSONAL_PAGE = '/admin/personal';
const ADMIN_REPORT_PAGE = '/admin/report';

const API_BASE_URL = 'http://localhost:8085';
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
    CLASS_EXERCISE_CREATE_PAGE_URL,
    CLASS_EXERCISE_EDIT_PAGE_URL,
    CLASS_DO_SPECIFIC_EXERCISE_PAGE_URL,
    CLASS_RESULT_EXERCISE_PAGE_URL,
    SEARCH_PAGE_URL,
    ADMIN_HOME_PAGE,
    ADMIN_CLASS_PAGE,
    ADMIN_PERSONAL_PAGE,
    ADMIN_REPORT_PAGE,
    ADMIN_USER_PAGE,
    ADMIN_CATEGORY_PAGE,
    CERTIFICATE_PAGE_URL,
    NOTE_PAGE_URL,
    WORK_PAGE_URL,
    CLASS_HISTORY_PAGE_URL,
    FILE_PAGE_URL,
    PERSONAL_DETAILS_PAGE_URL,
};

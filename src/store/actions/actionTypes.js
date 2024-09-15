const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //admin


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    // admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIL: 'FETCH_ROLE_FAIL',

    //CRUD REDUX
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: 'CREATE_USER_FAIL',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL: 'EDIT_USER_FAIL',

    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAIL: 'FETCH_ALL_USER_FAIL',

    HANDLE_DELETE_USER_SUCCESS: 'HANDLE_DELETE_USER_SUCCESS',
    HANDLE_DELETE_USER_FAIL: 'HANDLE_DELETE_USER_FAIL',

    FETCH_TOP_DOCTORS_SUCCESS: 'FETCH_TOP_DOCTORS_SUCCESS',
    FETCH_TOP_DOCTORS_FAIL: 'FETCH_TOP_DOCTORS_FAIL',

    DETAIL_USER_SUCCESS: 'DETAIL_USER_SUCCESS',
    DETAIL_USER_FAIL: 'DETAIL_USER_FAIL',

    FETCH_ALL_DOCTORS_SUCCESS: 'FETCH_ALL_DOCTORS_SUCCESS',
    FETCH_ALL_DOCTORS_FAIL: 'FETCH_ALL_DOCTORS_FAIL',

    SAVE_DETAIL_DOCTORS_SUCCESS: 'SAVE_DETAIL_DOCTORS_SUCCESS',
    SAVE_DETAIL_DOCTORS_FAIL: 'SAVE_DETAIL_DOCTORS_FAIL',

    FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS: 'FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAIL: 'FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAIL',

    // get infor doctor
    FETCH_REQUIRED_DOCTOR_INFOR_START: 'FETCH_REQUIRED_DOCTOR_INFOR_START',
    FETCH_REQUIRED_DOCTOR_INFOR_FAIL: 'FETCH_REQUIRED_DOCTOR_INFOR_FAIL',
    FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS: 'FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS',

    FETCH_REQUIRED_SPECIALTY_INFOR_SUCCESS: 'FETCH_REQUIRED_SPECIALTY_INFOR_SUCCESS',
    FETCH_REQUIRED_SPECIALTY_INFOR_FAIL: 'FETCH_REQUIRED_SPECIALTY_INFOR_FAIL',

    FETCH_REQUIRED_CLINIC_INFOR_SUCCESS: 'FETCH_REQUIRED_CLINIC_INFOR_SUCCESS',
    FETCH_REQUIRED_CLINIC_INFOR_FAIL: 'FETCH_REQUIRED_CLINIC_INFOR_FAIL',

    FETCH_ALL_HANDBOOK_SUCCESS: 'FETCH_ALL_HANDBOOK_SUCCESS',
    FETCH_ALL_HANDBOOK_FAIL: 'FETCH_ALL_HANDBOOK_FAIL',
})

export default actionTypes;
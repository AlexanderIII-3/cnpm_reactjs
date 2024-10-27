import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    userArr: [],
    topDoctor: [],
    userDetail: '',
    allDoctor: [],
    dataTime: [],
    allRequiredDoctorInfor: [],
    specialtyArr: [],
    clinicArr: [],
    handBookArr: [],
    listDrink: [],
    listTypeDrink: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        //GENDER
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false;



            return {
                ...state,

            }

        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,


            }


        // POSITION
        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyPState = { ...state };
            copyPState.positions = action.data


            return {
                ...copyPState,

            }





        case actionTypes.FETCH_POSITION_FAIL:


        //ROLE  

        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyRState = { ...state };
            copyRState.roles = action.data


            return {
                ...copyRState,

            }

        case actionTypes.FETCH_ROLE_FAIL:
        // crud redux
        case actionTypes.CREATE_USER_SUCCESS:
        case actionTypes.CREATE_USER_FAIL:


        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.userArr = action.data

            return {
                ...state,

            }

        case actionTypes.FETCH_ALL_USER_FAIL:

        case actionTypes.HANDLE_DELETE_USER_SUCCESS:


        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            state.topDoctor = [];
            return {
                ...state
            }



        case actionTypes.DETAIL_USER_SUCCESS:
            state.userDetail = action.data;
            return {
                ...state
            }
        case actionTypes.DETAIL_USER_FAIL:
            state.topDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_All_DOCTORS_FAIL:
            state.allDoctor = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.dataTime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAIL:
            state.dataTime = [];
            return {
                ...state

            }



        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }



        // list drink 
        case actionTypes.FETCH_REQUIRED_ALL_LIST_DRINK_SUCCESS:
            state.listDrink = action.data

            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_ALL_LIST_DRINK_FAIL:
            state.listDrink = [];
            return {
                ...state
            }


        case actionTypes.FETCH_DRINK_GAS_SUCCESS:
            state.listTypeDrink = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_DRINK_GAS_FAIL:
            state.listTypeDrink = [];

            return {
                ...state
            }
        default:
            return state;





    }


}

export default appReducer;
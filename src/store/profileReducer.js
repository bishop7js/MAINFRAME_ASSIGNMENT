import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
} from './profileActions';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PROFILE_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}
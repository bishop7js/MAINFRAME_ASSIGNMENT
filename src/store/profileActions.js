export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const fetchProfile = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_PROFILE_REQUEST });
        try {
            const response = await fetch('https://dummyjson.com/users/1');
            const data = await response.json();
            dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_PROFILE_FAILURE, error: error.message });
        }
    };
};
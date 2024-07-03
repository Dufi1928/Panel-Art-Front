// authReducer.js

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const initialState = {
    isLoggedIn: false,
    token: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
            };
        default:
            return state;
    }
};

export default authReducer;

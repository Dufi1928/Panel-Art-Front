const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const login = (token) => ({
    type: LOGIN,
    payload: { token },
});

export const logout = () => ({
    type: LOGOUT,
});

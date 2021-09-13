import { AuthTypes } from './auth.type';

export const setCurrentUser = item => ({
    type: AuthTypes.SET_AUTH,
    payload: item
})
import { AuthTypes } from './auth.type';


const INITIAL_STATE = {
    currentUser: '',
}
const AuthReduser = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthTypes.SET_AUTH:
            return {
                ...state,
                currentUser: action.payload
            }        
        default:
            return state;
    }
}
export default AuthReduser;
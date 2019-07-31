import * as actionTypes from '../../constants/actionTypes';
import initialState from '../initialState';

export function usersReducer(state = initialState.users, action) {
    switch(action.type){
        case actionTypes.GET_USERS_REQUEST:
            return initialState.users;
        case actionTypes.GET_USERS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
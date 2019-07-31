import * as actionTypes from '../../constants/actionTypes';

export function getUsersInitiate(params) {
    return {
        type: actionTypes.GET_USERS_INITIATE,
        params
    };
}

export function getUsersRequest() {
    return {
        type: actionTypes.GET_USERS_REQUEST
    }
}

export function getUsersSuccess(data) {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        data
    }
}

export function getUsersError(error) {
    return {
        type: actionTypes.GET_USERS_ERROR,
        error
    }
}
import { call, take } from 'redux-saga/effects';
import * as actionTypes from '../../../constants/actionTypes';
import * as usersWorkers from '../../workers/users/usersWorker';

export function* getUsersWatcher() {
    while(true){
        const action = yield take(actionTypes.GET_USERS_INITIATE);
        yield call(usersWorkers.getUsersWorker, action.params);
    }
}
import { fork, all } from 'redux-saga/effects';

/* Get Users */
import {
    getUsersWatcher
} from './watchers/users/usersWatcher';

export default function* rootSaga() {
    yield all([
        fork(getUsersWatcher)
    ]);
}
import { call, put } from 'redux-saga/effects';
import apiConfig from '../../../config/apiConfig';
import * as actions from '../../../actions';
import ajaxCreator from '../ajaxCreator';

export function* getUsersWorker(params) {
    try{
        yield put(actions.getUsersRequest());
        const response = yield call(ajaxCreator, apiConfig.getUsers, 'get', { timeout: true, params });
        yield put(actions.getUsersSuccess(response.data));
    }catch(error){
        error.timestamp = new Date().getTime();
        yield put(actions.getUsersError(error));
    }
}
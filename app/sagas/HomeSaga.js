import * as actionTypes from '../actions/actionTypes';
import { put, takeLatest } from 'redux-saga/effects'

function* handleTestRequest(action) {
    try {
        // for api call postResponse = yield something something
        let postResponse = {
            "status" : 200
        }

        if (postResponse.status == 200) {
            yield put({
                type: actionTypes.TEST_API_SUCCESS,
                payload: postResponse
            });
        }
        else {
            yield put({
                type: actionTypes.TEST_API_FAILURE,
                payload:  'Something went wrong'
            });
        }
    }
    catch (e) {
        yield put({
            type: actionTypes.TEST_API_FAILURE,
            payload: 'Something went wrong'
        });
    }
}

export function* HomeSaga() {
    yield takeLatest(actionTypes.TEST_API, handleTestRequest);
}
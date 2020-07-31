
import { TEST_API, FIRSTSETOFDATA, ADD } from './actionTypes'


export function testApiCall(payload) {
    return {
        type: TEST_API,
        payload: payload
    }
}

export function firstDataSet(payload) {
    return {
        type: FIRSTSETOFDATA,
        payload: payload
    }
}

export function addToDo(payload) {
    return {
        type: ADD,
        payload: payload
    }
}

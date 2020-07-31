import * as types from '../actions/actionTypes';

const initialState = {

    testApiLoading: false,
    testApiResponse: "",
    testApiFailure: "",
    firstTimeVar : true,
    updatedData : [],
    data : [
        {
            "title" : "testing 1",
            "des" : "des of testing 1"
        },
        {
            "title" : "testing 2",
            "des" : "des of testing 2"
        },
        {
            "title" : "testing 3",
            "des" : "des of testing 3"
        }
    ]
}

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {

        case types.TEST_API: {
            return { ...state, testApiResponse: "", testApiFailure: "", testApiLoading: true }
        }
        case types.TEST_API_FAILURE: {
            return { ...state, testApiResponse: "", testApiFailure: action.payload, testApiLoading: false }
        }
        case types.TEST_API_SUCCESS: {
            return { ...state, testApiResponse: action.payload, testApiLoading: false, testApiFailure: "" }
        }

        case types.FIRSTSETOFDATA: {
            return { ...state, firstTimeVar: action.payload[0], updatedData : action.payload[1] }
        }

        case types.ADD: {
            return { ...state, updatedData : action.payload }
        }

        default: {
            return { ...state }
        }

    }
}
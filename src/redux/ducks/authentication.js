/**
 * Authentication Action Types
 */
const types = {
    FETCH: 'sao-jose/authentication/FETCH',
    SUCCESS: 'sao-jose/authentication/SUCCESS',
    FAILURE: 'sao-jose/authentication/FAILURE',
    RESET: 'sao-jose/authentication/RESET'
}

/**
 * Authentication Initial State 
 */
const initialState = {
    fetch: false,
    id: null,
    email: null,
    password: null,
    token: null,
    authorized: false,
    error: ''
}

/**
 * Authentication Reducer 
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH:
            return {
                ...state,
                fetch: true
            }
        case types.SUCCESS:
            return {
                ...state,
                fetch: false,
                id: action.payload.id,
                email: action.payload.email,
                token: action.payload.token,
                authorized: true,
                error: ''
            }
        case types.FAILURE:
            return {
                ...state,
                fetch: false,
                error: action.payload
            }
        case types.RESET:
            return initialState
        default:
            return state
    }
}

/**
 * Authentication Action Creators Functions
 */
export const fetchAuthentication = () => ({
    type: types.FETCH
})

export const successAuthentication = payload => ({
    type: types.SUCCESS, payload
})

export const failureAuthentication = payload => ({
    type: types.FAILURE, payload
})

export const resetAuthentication = () => ({
    type: types.RESET
})

/**
 * Authentication Side Effects Functions
 */
export const checkAuthentication = () => { }
/**
 * @flow 
 * @format
 */

/**
 * Authentication Action Types
 */

const types = {
    FETCH: 'AUTHENTICATION/FETCH',
    SUCCESS: 'AUTHENTICATION/SUCCESS',
    FAILURE: 'AUTHENTICATION/FAILURE',
    RESET: 'AUTHENTICATION/RESET'
}

type FetchAction = { type: typeof types.FETCH }
type SuccessAction = { type: typeof types.SUCCESS, payload: Object }
type FailureAction = { type: typeof types.FAILURE, payload: string }
type ResetAction = { type: typeof types.RESET }
type Action = FetchAction | SuccessAction | FailureAction | ResetAction;

/**
 * Authentication State 
 */

type State = {
    fetch: boolean,
    id: number,
    email: string,
    password: string,
    token: string,
    authorized: boolean,
    error: string
}

let initialState: State = {
    fetch: false,
    id: 0,
    email: '',
    password: '',
    token: '',
    authorized: false,
    error: ''
}

/**
 * Authentication Reducer 
 */

export default (state: State, action: Action): State => {
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

export const fetchAuthentication = (): FetchAction => ({
    type: types.FETCH
})

export const successAuthentication = (payload: Object): SuccessAction => ({
    type: types.SUCCESS, payload
})

export const failureAuthentication = (payload: string): FailureAction => ({
    type: types.FAILURE, payload
})

export const resetAuthentication = (): ResetAction => ({
    type: types.RESET
})

/**
 * Authentication Side Effects Functions
 */

export const checkAuthentication = () => { }
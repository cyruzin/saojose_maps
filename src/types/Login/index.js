// @flow

export type Credentials = {
    login: string,
    password: string
}

export type State = {
    login: string,
    password: string,
    opacity: number
}

export type Props = {
    authentication: {
        fetch: boolean,
        authorized: boolean,
        token: string,
        error: string
    },
    actions: {
        checkAuthentication: (credentials: Credentials) => void
    }
}

// @flow

export type Coordinates = {
    latitude: number,
    longitude: number
}
export type State = {
    area?: Array<Coordinates>,
    latitude: number,
    longitude: number,
    marginBottom: number,
    collected: boolean,
    error: string
}

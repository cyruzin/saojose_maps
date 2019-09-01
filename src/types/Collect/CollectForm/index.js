// @flow

export type State = {
    fetch: boolean,
    fetchSelect: boolean,
    showCamera: boolean,
    fotos: Array<Object>,
    coletaDepartamento: Array<Object>,
    departamentoID: number | string,
    coletaTipo: Array<Object>,
    tipoID: number | string,
    userData: Object,
    descricao: string,
    error: string
}

export type Props = {
    latitude: string,
    longitude: string
}

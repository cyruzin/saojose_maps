// @flow

export type Collect = {
    id: number | string,
    classificacao: string,
    uso_solo: string,
    imovel: string,
    area_ha: number | string,
    bloco: number | string,
    latitude: number | string,
    longitude: number | string,
    descricao?: string,
    id_usr_coleta: number | string,
    id_departamento: number | string,
    id_pendencia: number | string,
    id_tipo: number | string,
    dt_cadastro: string
}

export type UserData = {
    user: string,
    userid: number | string,
    username: string,
    usermail: string,
    expires: number
}

export type State = {
    fetch: boolean,
    data: Array<Collect>,
    userData: UserData,
    error: string
}

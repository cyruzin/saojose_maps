// @flow

import type {Coordinates} from '../../Dashboard';

export type State = {
  fetch: boolean,
  fetchSelect: boolean,
  camera: Object,
  showCamera: boolean,
  fotos: Array<Object>,
  coletaDepartamento: Array<Object>,
  departamentoID: number | string,
  coletaTipo: Array<Object>,
  tipoID: number | string,
  userData: Object,
  descricao: string,
  error: string,
};

export type Props = {
  area: Array<Coordinates>,
  latitude: string,
  longitude: string,
};

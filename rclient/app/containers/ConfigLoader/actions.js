import {
  LOAD_CONFIG,
  LOAD_CONFIG_SUCCESS,
  LOAD_CONFIG_ERROR,
} from './constants';

export const loadConfig = () => ({
  type: LOAD_CONFIG,
});
export const configLoaded = config => ({
  type: LOAD_CONFIG_SUCCESS,
  payload: { config },
});
export const configLoadingError = error => ({
  type: LOAD_CONFIG_ERROR,
  error,
});

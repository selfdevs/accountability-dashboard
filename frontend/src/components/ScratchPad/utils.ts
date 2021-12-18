import { SAVED, SAVING } from './constants';

export const getStateText = (loading: boolean): string => (loading ? SAVING : SAVED);

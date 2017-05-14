import * as actionType from '../actions/types';

export const initializeApp = () => ({ type: actionType.INITIALIZE_APP });
export const loadPages = pages => ({ type: actionType.LOAD_PAGES, payload: { pages } });
export const activatePage = id => ({ type: actionType.ACTIVATE_PAGE, payload: { id } });

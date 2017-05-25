import * as actionType from '../actions/types';

export const initializeApp = () => ({ type: actionType.INITIALIZE_APP });
export const handleError = (msg, url, lineNo, columnNo, error) => ({ type: actionType.HANDLE_ERROR, payload: { msg, url, lineNo, columnNo, error } });
export const loadPages = pages => ({ type: actionType.LOAD_PAGES, payload: { pages } });
export const loadDevices = devices => ({ type: actionType.LOAD_DEVICES, payload: { devices } });
export const loadGroups = groups => ({ type: actionType.LOAD_GROUPS, payload: { groups } });

export const activatePage = id => ({ type: actionType.ACTIVATE_PAGE, payload: { id } });
export const selectPage = id => ({ type: actionType.SELECT_PAGE, payload: { id } });
export const closePage = () => ({ type: actionType.CLOSE_PAGE });

export const activateDevice = id => ({ type: actionType.ACTIVATE_DEVICE, payload: { id } });
export const selectDevice = id => ({ type: actionType.SELECT_DEVICE, payload: { id } });
export const closeDevice = () => ({ type: actionType.CLOSE_DEVICE });
export const changeDeviceAttribute = event => ({ type: actionType.CHANGE_DEVICE_ATTRIBUTE, payload: { event } });

export const toggleSwitch = id => ({ type: actionType.TOGGLE_SWITCH, payload: { id } });

export const activateButton = id => ({ type: actionType.ACTIVATE_BUTTON, payload: { id } });
export const clickButton = id => ({ type: actionType.CLICK_BUTTON, payload: { id } });

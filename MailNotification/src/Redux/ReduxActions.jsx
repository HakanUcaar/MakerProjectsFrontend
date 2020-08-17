import {
    UPDATE_SETTINGS,
    READ_SETTINGS,
    SAVE_SETTINGS
}
from './ReduxActionContants';

export function updateSettings(payload) {
    return { type: UPDATE_SETTINGS, payload };
};

export function readSettings(payload) {
    return { type: READ_SETTINGS, payload };
};

export function saveSettings(payload) {
    return { type: SAVE_SETTINGS, payload };
};
import {
    UPDATE_SETTINGS,
    READ_SETTINGS,
    SAVE_SETTINGS,
    SELECTED_MAIL,
    UPDATE_CURRENTMAIL
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

export function selectMail(payload) {
    return { type: SELECTED_MAIL, payload };
};

export function updateCurrentMail(payload) {
    return { type: UPDATE_CURRENTMAIL, payload };
};
import {
    SELECTED_GIFIMAGE,
    UPDATE_GIFBU_DATA,
    READ_GIFBU_DATA,
    SAVE_GIFBU_DATA
}
from './ReduxActionContants';

export function selectedGifImage(payload) {
    return { type: SELECTED_GIFIMAGE, payload };
};

export function updateGifbuData(payload) {
    return { type: UPDATE_GIFBU_DATA, payload };
};

export function readGifbuData(payload) {
    return { type: READ_GIFBU_DATA, payload };
};

export function saveGifbuData(payload) {
    return { type: SAVE_GIFBU_DATA, payload };
};
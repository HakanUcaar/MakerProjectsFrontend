import {
  SELECTED_KEYBUTTON,
  UPDATE_KEYBUTTON,
  READ_KEYBUTTONS,
  UPDATE_MACHINE_STATUS,
}
from '../Constants/CoderDeckActionConstans';

export function readKeyButtons(payload) {
  return { type: READ_KEYBUTTONS, payload };
};

export function selectedKeyButton(payload) {
    return { type: SELECTED_KEYBUTTON, payload };
};

export function updateKeyButton(payload) {
  return { type: UPDATE_KEYBUTTON, payload };
};

export function updateMachineStatus(payload) {
  return { type: UPDATE_MACHINE_STATUS, payload };
};

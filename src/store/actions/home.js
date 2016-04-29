/**
 * Created by YUK on 16/4/1.
 */

import * as types from '../constants/aboutType'

export function setHomeTime(text) {
    return { type: types.ABOUT_TIME, text }
}

export function setHomeText(text) {
    return { type: types.ABOUT_TEXT, text }
}

export function setStep(text) {
    return { type: types.SET_STEP, text }
}


/**
 * Created by YUK on 16/4/1.
 */

import * as types from '../constants/aboutType'

export function setAboutTime(text) {
    return { type: types.ABOUT_TIME, text }
}

export function setAboutText(text) {
    return { type: types.ABOUT_TEXT, text }
}
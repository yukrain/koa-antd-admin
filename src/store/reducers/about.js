import { ABOUT_TIME, ABOUT_TEXT } from '../constants/aboutType'


export default function about(state = ABOUT_TEXT, action) {
    switch (action.type) {
        case ABOUT_TIME:
            return action.text;
        case ABOUT_TEXT:
            return action.text;
        default:
            return state;
    }
}

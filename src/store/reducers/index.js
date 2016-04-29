import { combineReducers } from 'redux'
import about from './about'
import pageDemo from '../modules/pageDemo/pageDemoReducer'

const rootReducer = combineReducers({
    about: about,
    pageDemo: pageDemo
});

export default rootReducer

import * as aboutAction from './about'
import * as homeAction from './home'
import * as pageDemoAction from '../modules/pageDemo/pageDemoAction'


export default {
    ...aboutAction,
    ...homeAction,
    ...pageDemoAction
}
import { createHistory } from 'history'
import { Router, useRouterHistory} from 'react-router'
export default useRouterHistory(createHistory)({ basename: '' })
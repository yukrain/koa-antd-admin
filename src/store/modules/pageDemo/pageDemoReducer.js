import {  SET_NEXT_STEP } from '../../constants/aboutType'

const initialState =  {
        step: 0
}



export default function pageDemo(state = initialState, action) {
    switch (action.type) {
        case SET_NEXT_STEP:
            const nextStep = state.step ==3 ? 0: state.step + 1;
            return Object.assign({}, state, {
                step:  nextStep
            });
        default:
            return state;
    }
}

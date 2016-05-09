import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pageDemoAction from '../store/modules/pageDemo/pageDemoAction'

import { Steps, Button } from 'antd';
const Step = Steps.Step;

const steps = [{
    title: '已完成',
    description: '这里是多信息的描述啊'
}, {
    title: '进行中',
    description: '这里是多信息的耶哦耶哦哦耶哦耶'
}, {
    title: '又一个待运行',
    description: '描述啊描述啊'
}, {
    title: '待运行',
    description: '这里是多信息的描述啊'
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);


class pageDemo extends React.Component {

    constructor () {
        super()
    }

    componentWillMount () {

    }

    next(){
        const { actions , pageDemo} = this.props;

        actions.setNextStep();
    }
    render () {
        const { pageDemo } = this.props;

        var current = pageDemo.step

        return  <div>
            <div>
                <Steps current={current}>{steps}</Steps>
            </div>
            <div>
                <Button onClick={this.next.bind(this)}>下一步</Button>
            </div>
        </div>
    }
}

function mapState(state) {
    return {
        pageDemo: state.pageDemo
    };
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(pageDemoAction, dispatch)
    };
}

export default connect(mapState, mapDispatch)(pageDemo);

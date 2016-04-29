/**
 * Created by YUK on 16/4/19.
 */

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const Monitor = React.createClass({

    getInitialState() {
        return {

        };
    },

    componentWillMount () {
        console.log('componentWillMount');
    },

    componentDidMount() {
    },

    callback(key) {
        //console.log(key);
    },

    render () {
        //console.log(serverInfoList)

        return <div className="ant-panel-box">
            <h2 className="ant-panel-title">查询消耗</h2>

            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="金币" key="1">

                </TabPane>
                <TabPane tab="钻石" key="2">

                </TabPane>
            </Tabs>

        </div>
    }
});
export default   Monitor;
//module.exports = Monitor;
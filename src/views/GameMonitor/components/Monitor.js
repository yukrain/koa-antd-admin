/**
 * Created by YUK on 16/4/19.
 */

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

var MonitorTable = require('./MonitorTable');
var MonitorApiRate = require('./MonitorApiRate');

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
            <h2 className="ant-panel-title">服务器监控</h2>

            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="服务器状态" key="1">
                    <MonitorTable/>
                </TabPane>
                <TabPane tab="API失败率" key="2">
                    <MonitorApiRate/>
                </TabPane>
            </Tabs>

        </div>
    }
});
export default   Monitor;
//module.exports = Monitor;
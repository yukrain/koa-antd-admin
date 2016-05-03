import React from 'react'

import { Table } from 'antd';
import reqwest from 'reqwest';

const Test = React.createClass({
    getInitialState() {
        return {
        };
    },

    componentDidMount() {
    },
    render() {
        return (
            <div className="ant-panel-box">
                <h2 className="ant-panel-title">Welcome!</h2>

                这是主面板.啦啦啦啦
                <h3>
                    常用
                </h3>
                <ul>
                    <li> 图表 react-highcharts</li>
                    <li> 异步请求 reqwest</li>
                    <li> 数据库 nedb</li>
                    <li> excel处理 node-xlsx</li>

                </ul>

            </div>
        );
    }
});

export default Test;
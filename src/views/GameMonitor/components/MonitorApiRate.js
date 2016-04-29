/**
 * Created by YUK on 16/4/19.
 */
import React from 'react'
import { Row, Col, Button, DatePicker,  Icon, Switch, Table, Tooltip} from 'antd';
const RangePicker = DatePicker.RangePicker;
import reqwest from 'reqwest';
import moment from 'moment';

import './MonitorTable.css';

const MonitorApiRate = React.createClass({

    getInitialState() {
        return {
            loading: false,
            start_time: moment().subtract(7, 'day').format('YYYY-MM-DD'),
            end_time: moment().format('YYYY-MM-DD'),
            data:[]
        };
    },

    componentWillMount () {
        console.log('componentWillMount')


    },

    componentDidMount() {
        this.fetchData({
            start_time: this.state.start_time,
            end_time:  this.state.end_time,
        });
    },

    fetchData(params={}){
        console.info('获取数据中'+ this.state.start_time +',' + this.state.end_time);
        this.setState({ loading: true });
        reqwest({
            url: 'http://pikachu.monitor.dayugame.net/fetch_login_api_rate',
            method: 'get',
            data: params,
            crossOrigin: true,
            type: 'json',
            success: (result) => {

                this.setState({
                    loading: false,
                    data: result
                });
            }
        });
    },

    onChangeDate(value){
        var start = moment(value[0]).format('YYYY-MM-DD');
        var end = moment(value[1]).format('YYYY-MM-DD');
        this.setState({
            start_time: start,
            end_time: end
        });
        this.fetchData({
            start_time: start,
            end_time:  end,
        });
    },

    //获得禁用日期
    disabledDate(current){
        return current && current.getTime() > Date.now()
    },


    //渲染百分比
    renderPercent(text, record, index){
        var className = '';
        if( text > 95 ){
            className = 'text-bold  '
        }else{
            className = 'text-bold text-danger'
        }

        return (<span className={className}> {text ? (100 - text).toFixed(2) + '%' : ''}</span> )
    },


    //根据百分比获得颜色
    getPercentColor(percent, safeRate = 30, warningRate = 60, dangerRate =80){
        if( percent > dangerRate ){
            return '#FF5500'
        }else if( percent > warningRate){
            return '#ff820b'
        }else if( percent > safeRate){
            return '#2DB7F5'
        }else{
            return '#87D068';
        }
    },

    render () {
            //console.log(serverInfoList)

        let dataSource = [];

        this.state.data.map(function(item){
            item.info.time = item.time;
            item.info.key = item.time;
            dataSource.unshift(item.info);
        });

        const columns = [
            {title: '日期', sorter:(a, b) => a.time - b.time,  dataIndex: 'time', className:'text-bold',  key: 'time', width: 110 },
            {title: 'version',    dataIndex: 'version',   key: 'version',  className:'text-right', render:this.renderPercent},
            {title: 'iosconfig',dataIndex: 'iosconfig',   key: 'iosconfig',  className:'text-right', render:this.renderPercent},
            {title: 'socket', dataIndex: 'socket',    key: 'socket',  className:'text-right' ,render:this.renderPercent},
            {title: 'servers',  dataIndex: 'servers',   key: 'servers',  className:'text-right ', render:this.renderPercent},
        ];


        return <div >
            <div>
                <RangePicker style={{ width: 184 }} format='yyyy-MM-dd' value={[this.state.start_time, this.state.end_time]} disabledDate={this.disabledDate} onChange={this.onChangeDate}/>
            </div>

                <div style={{marginTop:10}}>
                    <Table dataSource={dataSource} columns={columns}  loading={this.state.loading} />
                 </div>
            </div>
    }
});

module.exports = MonitorApiRate;
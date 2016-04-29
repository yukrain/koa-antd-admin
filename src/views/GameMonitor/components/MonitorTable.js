/**
 * Created by YUK on 16/4/19.
 */
import React from 'react'
import { Row, Col, Button, DatePicker,  Icon, Switch, Table, Tooltip} from 'antd';
import rcUtil from 'rc-util';
var Line = require('rc-progress').Line;
import reqwest from 'reqwest';
import moment from 'moment';

import './MonitorTable.css';

const MonitorTable = React.createClass({

    getInitialState() {
        return {
            loading: false,
            auto: false,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            timer: null,//计时器
            seconds: 60,
            // date:'2016-04-20 16:49:06',
            data: []
        };
    },

    componentWillMount () {
        console.log('MonitorTable componentWillMount');
        this.isMount = true;
    },

    componentWillUnmount () {
        console.log('MonitorTable componentWillUnmount');
        clearTimeout(this.timer); //清除定时器
        this.isMount = false;

    },

    componentDidMount() {
        this.fetchData();
        console.log('MonitorTable componentDidMount');
    },

    setNewDateAndUpdate(){
        var newdate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.setState({
            date: newdate
        });
        this.fetchData({
            time: newdate
        });
    },

    fetchData(params = { time: this.state.date}){
        console.info('获取数据中'+ this.state.date);
        this.setState({ loading: true });
        reqwest({
            url: 'http://pikachu.monitor.dayugame.net/fetch_server_status',
            method: 'get',
            data: {
                length: 1,
                hostname_list: "all",
                time_internal: 1,
                time: params.time
            },
            crossOrigin: true,
            type: 'json',
            success: (result) => {

                if(result.length > 0 && this.isMount){

                    let data = [];
                    result[0].server.map(function(item){
                        item.info.name = item.name;
                        item.info.key = item.name;
                        item.info.flag = item.flag;
                        data.push(item.info);
                    });

                    this.setState({
                        loading: false,
                        seconds: 60,
                        data: data
                    });

                    if(this.state.auto){
                        this.startNewTimer();
                    }else{
                        clearTimeout(this.timer);
                    }
                }

            }
        });
    },
    //倒计时
    updateTimer(){
        if(this.state.seconds == 0){
            clearTimeout(this.timer);
            this.setNewDateAndUpdate();
        }else if(this.state.seconds > 0 ){
            const n =  this.state.seconds - 1;
            this.setState({
                seconds: n
            });
        }else{
            this.setState({
                seconds: 0
            });
        }
    },
    //获取新的计时器
    startNewTimer(){
        if(this.timer){
            clearTimeout(this.timer);
        }
        this.timer = setInterval(() => {
            this.updateTimer();
        },1000);
    },

    onChangeAutoUpdate(value){
        if(value){
            this.setState({
                auto: true,
                seconds: 60
            });
            this.startNewTimer();
        }else{
            if(this.timer){
                clearTimeout(this.timer)
                this.setState({
                    auto: false
                });
            }
        }
    },

    onChangeDate(value){
        var newdate =  moment(value).format('YYYY-MM-DD HH:mm:ss');
        this.setState({
            auto: false,
            date: newdate
        });
        this.fetchData({
            time: newdate
        });
    },

    //获得禁用日期
    disabledDate(current){
        return current && current.getTime() > Date.now()
    },

    expandedRowRender(record){
        const list = ['tsm', 'tsw', 'tss_tsm', 'tss_tsw', 'tsd', 'tsl','mysql'];
        const row = list.map(function(item){
            return   <Row key={item}>
                <Col span="3" className="text-right"> <Icon type="laptop" /> <b> {item} </b> </Col>
                <Col span="3" className="text-right">  {record[item + "_cpu_time_percent"]}%    </Col>
                <Col span="3" className="text-right">  {record[item+ "_mem_percent"]}%    </Col>
                <Col span="3" className="text-right">  {record[item + "_num_threads"]}   </Col>
                <Col span="3" className="text-right">  {record[item + "_io_read_count"]}    </Col>
                <Col span="3" className="text-right">  {record[item + "_io_write_count"]}    </Col>
            </Row>
        })
        return <div> <Row>
            <Col span="3" className="text-right text-bold"> 进程 </Col>
            <Col span="3" className="text-right text-bold"> CPU</Col>
            <Col span="3" className="text-right text-bold"> 内存   </Col>
            <Col span="3" className="text-right text-bold"> 线程数  </Col>
            <Col span="3" className="text-right text-bold"> 磁盘IO读数  </Col>
            <Col span="3" className="text-right text-bold"> 磁盘IO写数  </Col>
        </Row>
            {row}   </div>
    },

    renderRowName(text, record, index){
        var className = !record.flag ? 'text-default':'';
        return (<span className={className}><Icon type="hdd" /> {text}</span> )
    },
    //渲染百分比
    renderPercent(text, record, index){
        var className = '';
        if(!record.flag){
            className = 'text-default'
        }else if( text > 80 ){
            className = 'text-danger text-bold'
        }else if( text > 60){
            className = 'text-warning text-bold'
        }else if(text < 30){
            className = 'text-default'
        }
        return (<span className={className}> {text}%</span> )
    },

    renderCpuUseage(text, record, index){
        var color = record.flag ? this.getPercentColor(record.cpu_user, 50, 80, 90) : '#D3D3D3';
        return (<div>
            <Line percent={record.cpu_user} strokeWidth={3} trailColor="#f3f3f3" strokeColor={color}/>
            <span className="text-bold" style={{color: color}}> {record.cpu_user}% </span>
            <Tooltip
                title={'CPU负载:'+ record.cpu_percent +'%,系统:'+ record.cpu_system +'%, 逻辑进程:'+ record.cpu_user +'%, 空闲:'+ record.cpu_idle + '%' }
                placement="bottomRight">
                <b> CPU <Icon type="info-circle-o"/></b>
            </Tooltip>
        </div> )
    },

    renderMemUseage(text, record, index){
        var color = record.flag ? this.getPercentColor(record.mem_percent) : '#D3D3D3';
        return (<div>
            <Line percent={record.mem_percent} strokeWidth={3} trailColor="#f3f3f3" strokeColor={color}/>
            <span className="text-bold" style={{color: color}}> {record.mem_used } </span> <span
            className="text-default">/ {record.mem_total}</span>
            <Tooltip title={'使用率:'+ record.mem_percent +'%, 剩余可用:'+ record.mem_available } placement="bottomRight">
                <b> 内存 <Icon type="info-circle-o"/></b>
            </Tooltip>
        </div> )
    },

    renderDiskUseage(text, record, index){
        var color = record.flag ? this.getPercentColor(record.disk_percent) : '#D3D3D3';
        return (<div>
            <Line percent={record.disk_percent} strokeWidth={3} trailColor="#f3f3f3" strokeColor={color}/>
            <span className="text-bold" style={{color: color}}> {record.disk_used } </span> <span
            className="text-default">/ {record.disk_total}</span>
            <Tooltip title={'使用率:'+ record.disk_percent +'%, 剩余可用:'+ record.disk_free } placement="bottomRight">
                <b> 磁盘 <Icon type="info-circle-o"/></b>
            </Tooltip>
        </div> )

    },

    //根据百分比获得颜色
    getPercentColor(percent, safeRate = 30, warningRate = 75, dangerRate =85){
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


        const columns = [
            {title: '服务器',   dataIndex: 'name', className:'text-bold',  key: 'name', width: 110, render:this.renderRowName ,
                filters: [{
                    text: 'tw',
                    value: 'tw',
                }, {
                    text: 'en',
                    value: 'en',
                }],
                onFilter: (value, record) => record.name.indexOf(value) > -1
            },

            {title: 'IO等待',   sorter:(a, b) => a.cpu_iowait - b.cpu_iowait, dataIndex: 'cpu_iowait',  width: 80, key: 'cpu_iowait',  className:'text-right', render:this.renderPercent},
            {title: 'CPU负载',sorter:(a, b) => a.cpu_percent - b.cpu_percent,  dataIndex: 'cpu_percent',width: 250,   key: 'cpu',  className:'text-right  mt-chart-padding', render:this.renderCpuUseage},
            {title: '内存',sorter:(a, b) => a.mem_percent - b.mem_percent,  dataIndex: 'mem_percent',   width: 250,  key: 'mem',  className:'text-right mt-chart-padding', render:this.renderMemUseage},
            {title: '磁盘',  sorter:(a, b) => a.disk_percent - b.disk_percent, dataIndex: 'disk_total', width: 250,  key: 'disk',  className:'text-right mt-chart-padding', render:this.renderDiskUseage},
            //{  title: '操作',
            //    width: 40,
            //    key: 'operation',
            //    render(text, record) {
            //        return (
            //            <span>  <a href="#">详情</a>  </span>
            //        );
            //    }}
        ];

        const timerString =  this.state.loading? '正在刷新': <span><span>倒计时 </span><b className="text-danger">{this.state.seconds}</b> 秒</span>;
        const autoState =  this.state.auto == 0?
            <Button type="primary" size="small" onClick={ this.setNewDateAndUpdate }>刷新 </Button>: timerString;

        return <div>
            <div>
                <DatePicker value={this.state.date}  format="yyyy-MM-dd HH:mm:ss" disabledDate={this.disabledDate}  showTime onChange={this.onChangeDate} />
                <span  style={{marginLeft:10}} >{this.state.auto ? <span className="text-primary">自动刷新</span>: '自动刷新'}</span>
                <Switch style={{marginLeft:4}} size="small" checked={this.state.auto} onChange={this.onChangeAutoUpdate}/>
                <span  style={{marginLeft:10}} > {autoState}</span>
            </div>
            <div style={{marginTop:10}}>
                <Table dataSource={this.state.data} columns={columns}  loading={this.state.loading} pagination={false}  expandedRowRender={this.expandedRowRender}/>
            </div>

        </div>
    }
});

module.exports = MonitorTable;
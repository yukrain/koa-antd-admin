import React from 'react'
import ReactHighcharts from 'react-highcharts'
import { Button } from 'antd';
import reqwest from 'reqwest';

var config = {
    title: {
        text: 'Monthly Average Temperature',
        x: -20 //center
    },
    subtitle: {
        text: 'Source: WorldClimate.com',
        x: -20
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        valueSuffix: '°C'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: 'Tokyo',
        data: [7.0]
    }]
};


const About = React.createClass({

    getInitialState() {
        return {
            title: '33333'
        };
    },

    componentWillMount () {
    },

    componentDidMount() {

    },

    fetchData(){
        this.setState({title: 'ddd'});
    },

    render () {
        config.title.text = this.state.title;
        return <div>
            <Button onClick={this.fetchData}>下一步</Button>
            <ReactHighcharts ref="chart" config = {config}></ReactHighcharts>
            </div>
    }
});

module.exports = About
//export default About;
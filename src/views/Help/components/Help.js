import { Timeline , Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Row, Col, InputNumber } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


let PaoForm = React.createClass({

    getInitialState() {
        return {
            destScore: 888,
            percent: 83,
            colorNum:0
        };
    },

    cal(dest, per, color) {

        let result = [];
        per = (per + 100)/100;
        for(let i = 1; i <  40; i++){
            var destScore = dest + 1000 * i;
            var myScore = destScore/per;


            var myJuli =  (myScore - color * 125)/8  ;
            result.push([destScore, myScore.toFixed(2)  ,  myJuli.toFixed(2) ])

        }
        return result;
    },

    onChangeDestScore(value){
        this.setState({destScore: value})
    },

    onChangePercent(value){
        this.setState({percent: value})
    },

    onChangeColorNum(value){
        this.setState({colorNum: value})
    },

    render () {
        console.log(1);
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const scorePerMi = 8;
        const scorePerStar = 30;
        const scorePerColorStar = 125;

        var result =  this.cal(this.state.destScore, this.state.percent, this.state.colorNum).map(function(m){
            return  <Row key={m[0]}>
                <Col span="8"  style={{ textAlign: "right" }}>{m[0]} 分: </Col>
                <Col span="8"  style={{ textAlign: "right" }}><b>{m[1]} 目标分</b></Col>
                <Col span="8"  style={{ textAlign: "right" }}>{m[2]} 米</Col>
                </Row>
        });
        return (
            <Form horizontal onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayout}
                    label="目标分数：">
                    <InputNumber min={1} max={1000} value={this.state.destScore}  onChange={this.onChangeDestScore} />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="百分比加成：">
                    <InputNumber min={1} max={1000} value={this.state.percent} onChange={this.onChangePercent} />%
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="彩星数：">
                    <InputNumber min={1} max={1000} value={this.state.colorNum} onChange={this.onChangeColorNum} />
                </FormItem>
                <FormItem label="计算："
                    {...formItemLayout}>
                    8 分/米   30 分/黄星  125 分/彩星
                </FormItem>
                <FormItem label="计算结果："
                    {...formItemLayout}>
                    {result}
                </FormItem>
            </Form>
        )
    }
})
PaoForm = Form.create()(PaoForm);

let Help = React.createClass({
    render () {


        return <div>
            <h2>天天酷跑3D尾数任务计算器</h2>
            <p>尾数任务计算</p>
            <Row>
                <Col span="20">
                    <PaoForm/>
                </Col>
            </Row>


        </div>
    }
});

module.exports = Help;

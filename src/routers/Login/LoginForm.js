import { Button, Form, Input, Checkbox, Icon, Alert, Spin, Row, Col } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import reqwest from 'reqwest';
import bcrypt from 'bcryptjs';
import md5 from 'md5';

function noop() {
    return false;
}

let LoginForm = React.createClass({

    getInitialState() {
        return {
            loginMsg: "",
            loading: false,
            random:  Math.random(),
            captchaError: ""
        };
    },

    handleSubmit(e) {
        //return false;
        e.preventDefault();

        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            //提交表单
            var data = this.props.form.getFieldsValue();
            data.verify_code = document.getElementById('verify_code').value;
            data.password = bcrypt.hashSync(data.verify_code + md5(data.password), 10);

            this.setState({ loading: true });
            reqwest({
                url: '/login',
                method: 'post',
                data: data,
                type: 'json',
                success: (result) => {
                    console.log(result)
                    this.setState({ loading: false });

                    if(result.login){
                        //this.setState({ loginMsg: "" });
                        location.href = '/'
                    }else if(result.msg == "验证码错误"){
                        this.setState({ loginMsg: "验证码错误",captchaError:"error" });
                        this.clearCaptcha();
                    }else{
                        this.setState({ loginMsg: "账户名或密码错误"  });
                    }
                }
            });
        });

    },

    clearCaptcha(e){
        this.props.form.resetFields(["captcha"]);
    },

    //重置验证码
    getNewCaptcha(e){
        this.clearCaptcha();
        this.setState({  random:  Math.random() });
    },

    //重置验证码状态
    resetCapthaError(){
        this.setState({ captchaError: "" });
    },
    render() {
        const { getFieldProps } = this.props.form;

        const userNameProps = getFieldProps('username', {
            initialValue: 'admin',
            validate: [{
                rules: [
                    { required: true , message: '请输入用户名' },
                ],
                trigger: 'onBlur',
            }]
        });

        const passwordProps = getFieldProps('password', {
            initialValue: '123456',
            validate: [{
                rules: [
                    { required: true, message: '请输入密码'  },
                ],
                trigger: 'onBlur',
            }]
        });

        const captchaProps = getFieldProps('captcha', {
            onChange: this.resetCapthaError,
            validate: [{
                rules: [
                    { required: true,  message: '请输入验证码' }
                ],
                trigger: 'onChange'
            }]

        });


        const loginMsg = this.state.loginMsg == "" ? null : <Alert message={this.state.loginMsg}   type="error" showIcon />

        const captchaFormItenProps = this.state.captchaError !== "" ? {   validateStatus: 'error',help:'验证码错误' } : {}

        return (
            <Spin spining={this.state.loading}>
                <Form  onSubmit={this.handleSubmit}  form={this.props.form}>
                    {loginMsg}
                    <FormItem >
                        <Input placeholder="请输入用户名" className="login-form-input"   size="large"  autoComplete="off"
                            {...userNameProps} />
                    </FormItem>
                    <FormItem >
                        <Input type="password" placeholder="请输入密码" className="login-form-input"  size="large"  autoComplete="off"
                            {...passwordProps} />
                    </FormItem>

                    <Row>
                        <Col span="10">
                            <FormItem ref="captcha"
                                {...captchaFormItenProps}>
                                <Input placeholder="验证码"  size="large"  autoComplete="off"
                                    {...captchaProps} />
                            </FormItem>
                        </Col>
                        <Col span="13" offset="1" className="login-form-captcha">
                            <img src={"/captcha?r_" + this.state.random}  height="32" alt="" />
                            <a href="javascript:void(0)" style={{marginLeft: 6}} onClick={this.getNewCaptcha}><Icon type="reload" /> 刷新</a>
                        </Col>
                    </Row>

                    <FormItem >
                        <label className="ant-checkbox-inline">
                            <Checkbox defaultValue={true}
                                {...getFieldProps('agreement')} />记住我
                        </label>


                    </FormItem >
                    <FormItem >
                        <Button type="primary" size="large" htmlType="submit" className="login-submit" loading={this.state.loading} >登录</Button>
                    </FormItem>


                </Form>
            </Spin>
        );
    }
});

LoginForm = createForm()(LoginForm);

export default LoginForm
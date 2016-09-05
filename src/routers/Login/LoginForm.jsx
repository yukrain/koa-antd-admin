import { Button, Form, Input, Checkbox, Icon, Alert, Spin, Row, Col } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import reqwest from 'reqwest';
import bcrypt from 'bcryptjs';
import md5 from 'md5';

let LoginForm = React.createClass({

    getInitialState() {
        return {
            loginMsg: "",
            loading: false,
            random:  Math.random(),
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
                        location.href = '/app'
                    }
                },
                error: (err, response, text) => {
                    this.setState({ loading: false ,  loginMsg: JSON.parse(err.response).message});
                },
            });
        });
    },

    render() {
        const { getFieldProps } = this.props.form;

        let loginMsg = this.state.loginMsg !== "" ?  <Alert message={this.state.loginMsg}   type="error" showIcon /> : null;


        return (
            <Spin spinning={this.state.loading}>
                <Form  onSubmit={this.handleSubmit}  form={this.props.form}>
                    {loginMsg}
                    <FormItem >
                        <Input placeholder="请输入用户名" className="login-form-input"   size="large"  autoComplete="off"
                            {...getFieldProps('user', {
                                validate: [{
                                    rules: [
                                        { required: true , message: '请输入用户名' }
                                    ],
                                    trigger: 'onChange',
                                }]
                            })} />
                    </FormItem>
                    <FormItem required>
                        <Input type="password" placeholder="请输入密码" className="login-form-input" size="large"
                               autoComplete="off"
                            {...getFieldProps('password')} />
                    </FormItem>

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
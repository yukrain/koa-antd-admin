import { Menu, Breadcrumb, Row, Col} from 'antd';


import  LoginForm from'./views/Login/LoginForm';

//import 'normalize/normalize.css';
import 'antd/lib/index.css';
import './views/Login/login.css';

const mountNode = document.getElementById('body');
let LoginPage =  React.createClass({
    render () {
        return (
            <div className="ant-layout-ceiling-demo">
                <div className="ant-layout-ceiling">
                    <div className="ant-layout-wrapper">
                        <ul className="right">
                            <li>yueshiyu@dayugame.com</li>
                            <li>|</li>
                            <li>注册账号</li>
                        </ul>
                    </div>
                </div>
                <div className="ant-layout-body">
                    <Row>
                        <Col span="12" offset="6">
                            <div className="login-main">
                                <div className="login-title">挂机游戏后台</div>
                                <div className="login-cnt">
                                    <LoginForm />
                                </div>
                                <div className="link-con" >

                                </div>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
});


ReactDOM.render(
    <LoginPage/>
    , mountNode);
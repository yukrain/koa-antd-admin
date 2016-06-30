import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu, Dropdown, Breadcrumb, Icon, Badge } from 'antd'
import moment from 'moment';
import * as Action from '../store/actions'

const SubMenu = Menu.SubMenu;
export class AppView extends React.Component {

    constructor () {
        super();
        this.state = {
            date: moment().format('YYYY-MM-DD'),
            current: '/',
            openKeys: []
        };
    }

    componentWillMount () {
    }

    handleClick(e) {
        this.setState({
            current: e.key
        });
    }

    render () {
        //console.log( this.props )
        var curPath = this.props.location.pathname;

        const topmenu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="/logout">注销</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" disabled>设置 </Menu.Item>
                <Menu.Item key="3" disabled>修改密码</Menu.Item>
                <Menu.Item key="4" disabled>反馈意见</Menu.Item>
            </Menu>
        );

        return <div className="ant-layout-aside">

            <aside className="ant-layout-sider">
                <div className="ant-layout-logo ">
                   <span>后台</span>
                </div>
                <Menu mode="inline" theme="dark"
                      onClick={this.handleClick.bind(this)}
                      defaultSelectedKeys={[curPath]} defaultOpenKeys={['sub1']}>
                    <SubMenu key="sub1" title={<span><Icon type="user" />状态</span>}>
                        <Menu.Item key="/app"><Link to="/app">主页</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </aside>
            <div className="ant-layout-main">
                <div className="ant-layout-header">
                    <ul className="right">
                        <li>{this.state.date}</li>
                        <li>|</li>
                        <li>
                            <Badge dot>
                                <Icon type="mail" />
                            </Badge>
                        </li>
                        <li>|</li>
                        <li> <Link to="/help"> <Icon type="question-circle-o" /> 帮助</Link></li>
                        <li>|</li>
                        <li>
                            <Dropdown overlay={topmenu}>
                                <a className="ant-dropdown-link" href="#">
                                    <Icon type="user" /> Admin管理员 <Icon type="down" />
                                </a>
                            </Dropdown>
                        </li>
                    </ul>

                </div>

                <div className="ant-layout-container">
                    <div className="ant-layout-content">
                        <div >
                            {this.props.children || "Welcome to your Inbox"}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    }
}



function mapStateToProps(state) {
    return {
        about: state.about,
        home: state.home
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Action, dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppView)
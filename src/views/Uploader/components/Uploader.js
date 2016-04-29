/**
 * Created by YUK on 16/4/19.
 */

import { Upload, Icon } from 'antd';
const Dragger = Upload.Dragger;

const props = {
    name: 'file',
    showUploadList: true,
    action: '/upload',
    multiple: true
};


const Uploader = React.createClass({

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
            <h2 className="ant-panel-title">文件处理器</h2>
            <div>
                <div>
                    <div style={{ width: 246, height: 140 }}>
                        <Dragger {...props}>
                            <Icon type="plus" />
                        </Dragger>
                    </div>
                    <div style={{ marginTop: 16, height: 180 }}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                            <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
                        </Dragger>
                    </div>
                </div>
            </div>


        </div>
    }
});
export default Uploader;
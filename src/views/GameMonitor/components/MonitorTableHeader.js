/**
 * Created by YUK on 16/4/20.
 */

const MonitorTableHeader = React.createClass({

    render () {
        return (
            <thead>
                                      <tr className="mt-head">
                                          <th className="border-right" rowSpan="2">_</th>
                                          <th className="border-right" colSpan="3">CPU</th>
                                          <th className="border-right" colSpan="3">内存</th>
                                          <th className="border-right" colSpan="4">磁盘</th>
                                          <th className="border-right" colSpan="4">IO</th>
                                          <th className="border-right" colSpan="2">网卡</th>
                                          <th className="border-right" colSpan="7">进程:tsm</th>
                                      </tr>
                                      <tr className="mt-head-sub">
                                          <th className="border-right">服务器</th>

                                          <th>负载</th>
                                          <th>进程占用</th>
                                          <th className="border-right">系统占用</th>

                                          <th>总内存</th>
                                          <th>可用</th>
                                          <th className="border-right">百分比</th>

                                          <th>总大小</th>
                                          <th>使用</th>
                                          <th>空闲</th>
                                          <th className="border-right">百分比</th>

                                          <th>读次数</th>
                                          <th>写次数</th>
                                          <th>读比特</th>
                                          <th className="border-right">写比特</th>

                                          <th>发送</th>
                                          <th className="border-right">接受</th>

                                          <th>CPU占比</th>
                                          <th>内存占比</th>
                                          <th>I/O读</th>
                                          <th>I/O写</th>
                                          <th>读比特</th>
                                          <th>写比特</th>
                                          <th>线程数</th>
                                      </tr>
                          </thead>
        )

    }
});

module.exports = MonitorTableHeader;
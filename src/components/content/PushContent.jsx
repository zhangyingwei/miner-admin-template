/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card, Icon, Tag } from 'antd';
import { getPros } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import PushSearchForm from './PushSearchForm'
import NProgress from 'nprogress';
import MinerModal from './MinerModal'

class AsynchronousTable extends React.Component {
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
        data: [],
        loading: false,
        push: 'disabled',
        pagination:{
            pageSize: 8
        },
        model: {
            text: 'model message',
            visible: false,
            loading: false
        }
    };
    componentDidMount() {
        this.start();
    };
    changePage = (page) => {
        console.log("pageSize:"+page.pageSize);
        console.log("current:"+page.current);
    };
    showModal = (message) => {
        this.setState({
            model: {
                text: message,
                visible: true
            }
        });
    };
    closeModal = (message) => {
        this.setState({
            model: {
                text: message,
                visible: true,
                loading: true
            }
        });
        setTimeout(() => {
            this.setState({
                model: {
                    text: message,
                    visible: false,
                    loading: false
                }
            });
        }, 1000);
    };
    handleOk = () => {
        console.log("handleOk")
        this.setState({model:{
          text: '正在推送......',
          visible:true,
          loading: true,
        }});
        setTimeout(() => {
            this.closeModal("推送成功！");
        },5000);
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({model:{
          visible: false,
        }});
    };
    start = () => {
        console.log("start");
        this.setState({ loading: true });
        var id = 0;
        getPros().then(res => {
            this.setState({
                data: [...res.data.map(val => {
                    val.key = id++;
                    val.id = id;
                    val.site = 'http://blog.zhangyingwei.com';
                    val.sitename = '张英伟的博客';
                    val.title='我的第一篇博客';
                    val.content = "content";
                    val.url = 'http://blog.zhangyignwei.com/articles/1'
                    val.pubdate = '2017-08-24 10:36:04';
                    val.topic='java';
                    val.pushdate = '2017-08-24 10:36:04';
                    return val;
                })],
                loading: false
            });
        });
    };
    onQuery = (values) => {
        NProgress.start()
        console.log(values);
        NProgress.done()
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        this.setState({push: selectedRowKeys.length == 0? 'true':''})
    };
    showContent = (record, event) => {
        console.log(record);
    };
    onPush = () => {
        console.log("push..")
        const size = this.state.selectedRowKeys.length
        const message = "共选择了 "+size+" 条数据，确定要推送吗？"
        this.showModal(message)
    }
    render() {
        const columns = [{
            title: '编号',
            dataIndex: 'id',
            width: 60
        }, {
            title: '来源',
            dataIndex: 'sitename',
            width: 150,
            render: (text, record) => <a href={record.url} target="_blank">{text}</a>
        }, {
            title: '标题',
            dataIndex: 'title',
            width: 200
        },{
            title: '主题',
            dataIndex: 'topic',
            width: 150,
            render: (text,record) => {
                const colors = ['#2db7f5','#f50','#87d068','#108ee9']
                console.log(Math.random()*4)
                const color = colors[parseInt(Math.random()*4,10)]
                return (
                    <Tag color={color}>{text}</Tag>
                )
            }
        }, {
            title: '发布时间',
            dataIndex: 'pubdate',
            width: 150,
            render: (text, record) => <span><Icon type="calendar" /> {text}</span>
        }, {
            title: '推送时间',
            dataIndex: 'pushdate',
            width: 150,
            render: (text, record) => <span><Icon type="calendar" /> {text}</span>
        }];

        const { loading, selectedRowKeys,pagination } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="gutter-example">
                <MinerModal 
                    visible={this.state.model.visible} 
                    text={this.state.model.text} 
                    loading={this.state.model.loading} 
                    onOk={this.handleOk}
                    confirmLoading={this.state.model.loading}
                    onCancel={this.handleCancel}
                />
                <BreadcrumbCustom first="文章管理" second="待发布文章" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card title="待发布文章" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <PushSearchForm onPush={this.onPush} querySubs={ this.onQuery } push={this.state.push} />
                                </div>
                                <Table pagination={pagination} onChange={this.changePage} rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AsynchronousTable;
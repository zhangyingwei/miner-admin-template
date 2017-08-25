/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import { getPros } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EmailSearchForm from './EmailSearchForm'
import NProgress from 'nprogress';

class AsynchronousTable extends React.Component {
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
        data: [],
        loading: false,
        qemail: '',
        qtopic: '',
        pagination:{
            pageSize: 8
        }
    };
    componentDidMount() {
        this.start();
    }
    edit = () => {
        console.log("hello");
    }
    del = () => {
        console.log("delete");
    }
    changePage = (page) => {
        console.log("pageSize:"+page.pageSize);
        console.log("current:"+page.current);
    }
    start = () => {
        console.log("start");
        this.setState({ loading: true });
        getPros().then(res => {
            this.setState({
                data: [...res.data.map(val => {
                    val.key = val.id;
                    val.email = 'zhangyw001@gmail.com';
                    val.dissubdate = '2017-08-24 10:36:04';
                    val.topic='java,git,javascript,分布式,微服务';
                    val.flag=1;
                    val.subdate='2017-08-24 10:36:04';
                    return val;
                })],
                loading: false
            });
        });
    };
    select = () => {
        const email = this.state.qemail
        const topics = this.state.qtopic
        console.log(email);
        console.log(topics);
    }
    onQuery = (values) => {
        NProgress.start()
        console.log(values);
        NProgress.done()
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const columns = [{
            title: '邮箱',
            dataIndex: 'email',
            width: 180,
            render: (text, record) => <a href={record.url} target="_blank">{text}</a>
        }, {
            title: '订阅主题',
            dataIndex: 'topic'
        }, {
            title: '状态',
            dataIndex: 'flag',
            width: 80
        }, {
            title: '订阅时间',
            dataIndex: 'subdate',
            width: 150
        }, {
            title: '取消订阅时间',
            dataIndex: 'dissubdate',
            width: 150
        },{
            key: 'action',
            title: '操作',
            width: 160,
            render: (text, record) => (
                <span>
                    <Button onClick={this.edit} >编辑</Button>
                    <Button onClick={this.del} >删除</Button>
                </span>
            )
        }];

        const { loading, selectedRowKeys,pagination } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="订阅管理" second="Email" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card title="订阅邮箱管理" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <EmailSearchForm querySubs={ this.onQuery } />
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
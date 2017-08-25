/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card, Icon } from 'antd';
import { getPros } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import SearchForm from './SearchForm'
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
    };
    edit = (e) => {
        console.log("编辑"+e.target.id);
    };
    del = (e) => {
        console.log("删除"+e.target.id);
    };
    changePage = (page) => {
        console.log("pageSize:"+page.pageSize);
        console.log("current:"+page.current);
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
    select = () => {
        const email = this.state.qemail
        const topics = this.state.qtopic
        console.log(email);
        console.log(topics);
    };
    onQuery = (values) => {
        NProgress.start()
        console.log(values);
        NProgress.done()
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    showContent = (record, event) => {
        console.log(record);
    };
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
            width: 150
        }, {
            title: '发布时间',
            dataIndex: 'pubdate',
            width: 150
        }, {
            title: '推送时间',
            dataIndex: 'pushdate',
            width: 150
        }];

        const { loading, selectedRowKeys,pagination } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="文章管理" second="待发布文章" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card title="待发布文章" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <SearchForm querySubs={ this.onQuery } />
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
/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card, Icon, Tag } from 'antd';
import { getPros } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import SearchForm from './SearchForm'
import NProgress from 'nprogress';
import ContentEditWindow from './ContentEditWindow'

class AsynchronousTable extends React.Component {
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
        data: [],
        loading: false,
        qemail: '',
        qtopic: '',
        pagination:{
            pageSize: 8
        },
        editVisible: false
    };
    componentDidMount() {
        this.start();
    };
    edit = (e) => {
        const index = e.target.id
        console.log("编辑"+e.target.id);
        const data = this.state.data[index]
        this.setState({
            editVisible:true
        })
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
                    val.author = 'zhangyw';
                    val.site = 'http://blog.zhangyingwei.com';
                    val.sitename = '张英伟的博客';
                    val.title='我的第一篇博客';
                    val.content = "content";
                    val.url = 'http://blog.zhangyignwei.com/articles/1'
                    val.pubdate = '2017-08-24 10:36:04';
                    val.getdate = '2017-08-24 10:36:04';
                    val.pushdate = '2017-08-24 10:36:04';
                    val.topic='java';
                    val.flag=1;
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
    showEditWindow = () => {
        this.setState({editVisible: true})
    };
    hideEditWindow = () => {
        this.setState({editVisible:false})
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
            title: '作者',
            dataIndex: 'author',
            width: 200
        },{
            title: '标题',
            dataIndex: 'title',
            width: 200
        }, {
            title: '内容',
            dataIndex: 'content',
            width: 50,
            onCellClick: this.showContent,
            render: (text, record) => <a><Icon type="search" style={{fontSize: 15}} /></a>
        }, {
            title: '发布时间',
            dataIndex: 'pubdate',
            width: 150,
            render: (text, record) => <span><Icon type="calendar" /> {text}</span>
        },{
            title: '抓取时间',
            dataIndex: 'getdate',
            width: 150,
            render: (text, record) => <span><Icon type="calendar" /> {text}</span>
        }, {
            title: '推送时间',
            dataIndex: 'pushdate',
            width: 150,
            render: (text, record) => <span><Icon type="calendar" /> {text}</span>
        },{
            title: '主题',
            dataIndex: 'topic',
            width: 100,
            render: (text,record) => {
                const colors = ['#2db7f5','#f50','#87d068','#108ee9']
                const color = colors[parseInt(Math.random()*4,10)]
                return (
                    <Tag color={color}>{text}</Tag>
                )
            }
        },{
            title: '状态',
            dataIndex: 'flag',
            width: 100,
            render: (text, record) => {
                const flagMap = {
                    1: "初始",
                    2: "正常",
                    3: "失效",
                    4: "不通过",
                    5: "通过",
                    6: "删除"
                }
                return (<Tag> {flagMap[text]}</Tag>)
            }
        },{
            key: 'action',
            title: '操作',
            width: 100,
            render: (text, record) => (
                <span>
                    <Button id={record.id} onClick={this.edit} >编辑</Button>
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
                <BreadcrumbCustom first="文章管理" second="全部文章" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card title="全部文章" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <SearchForm querySubs={ this.onQuery } />
                                </div>
                                <Table pagination={pagination} onChange={this.changePage} rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <ContentEditWindow visible={this.state.editVisible} onShow={this.showEditWindow} onHide={this.hideEditWindow} />
            </div>
        );
    }
}

export default AsynchronousTable;
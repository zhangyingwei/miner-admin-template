/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';

import { Form, Input, Button, DatePicker , Row ,Icon} from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends Component {
    state = {
        date: ''
    };
    handleSubmit = (e) => {
        const date = this.state.date;
        console.log(date);
        // this.props.querySubs({qdate:this.state.date}});
    };
    onChange = (data,dataSring) => {
        this.setState({date:dataSring});
    };
    render() {
        return (
            <Row gutter={16}>
              <DatePicker span={6} onChange={this.onChange} />
                <Button span={6} type="primary" onClick={this.handleSubmit} >
                    <Icon type="search" />
                    查询
                </Button>
                <Button span={12} disabled={this.props.push} type="primary" onClick={this.props.onPush} >
                    <Icon type="global"/>
                    一键推送
                </Button>
            </Row>
        );
    }
}


export default Form.create()(HorizontalLoginForm);
/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              this.props.querySubs(values);
            }
        });
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem validateStatus={userNameError ? 'error' : ''} help={userNameError || ''} >
                    {getFieldDecorator('qsitename')(
                        <Input addonBefore="来源" placeholder="来源" />
                    )}
                </FormItem>
                <FormItem validateStatus={userNameError ? 'error' : ''} help={userNameError || ''} >
                    {getFieldDecorator('qtitle')(
                        <Input addonBefore="标题" placeholder="标题" />
                    )}
                </FormItem>
                <FormItem validateStatus={userNameError ? 'error' : ''} help={passwordError || ''} >
                    {getFieldDecorator('qtopic')(
                        <Input addonBefore="主题" type="text" placeholder="主题" />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                       查询
                    </Button>
                </FormItem>
            </Form>
        );
    }
}


export default Form.create()(HorizontalLoginForm);
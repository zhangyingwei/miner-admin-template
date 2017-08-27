import React from 'react';
import { Button, Row, Col, Modal,Form,Input,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      sitename: {
        ...props.sitename,
        value: props.sitename.value,
      },
      author: {
      	...props.author.value,
      	value: props.author.value
      },
      title: {
      	...props.title.value,
      	value: props.title.value
      },
      topic: {
      	...props.topic.value,
      	value: props.topic.value
      },
      flag: {
      	...props.flag.value,
      	value: props.flag.value
      }
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form>
      <FormItem label="来源" {...formItemLayout} >
        {getFieldDecorator('sitename', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="作者" {...formItemLayout} >
        {getFieldDecorator('author', {
          rules: [{ required: true, message: 'author is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="标题" {...formItemLayout} >
        {getFieldDecorator('title', {
          rules: [{ required: true, message: 'title is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="主题" {...formItemLayout} >
        {getFieldDecorator('topic', {
          rules: [{ required: true, message: 'topic is required!' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="状态" {...formItemLayout} >
        {getFieldDecorator('flag')(
        	<Select style={{ width: 200 }} value={props.flag.value} >
			    <Option value="0">初始</Option>
			    <Option value="1">正常</Option>
			    <Option value="2">失效</Option>
			    <Option value="3">不通过</Option>
			    <Option value="4">通过</Option>
			    <Option value="9">删除</Option>
			</Select>
        )}
      </FormItem>
    </Form>
  );
});

class ContentEditWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    fields: {
		      sitename: {
		        value: '张英伟的博客',
		      },
		      author: {
		      	value: "zhangyw"
		      },
		      title: {
		      	value: "我的第一篇博客"
		      },
		      topic: {
		      	value: "java"
		      },
		      flag: {
		      	value: 3
		      }
		    },
		 };
	}
	handleFormChange = (changedFields) => {
	    this.setState({
	      fields: { ...this.state.fields, ...changedFields },
	    });
	 }
	okClick = () => {
		console.log("okClick");
		this.props.onHide();
		console.log(this.state.fields)
	}
	cancelClick = () => {
		console.log("cancelClick");
		this.props.onHide();
	}
	handleSubmit = () => {
		console.log("handleSubmit");
	}
	render(){
	    const fields = this.state.fields
		return(
			<div>
				<Modal 
					title="编辑文章"
		          	visible={this.props.visible}
		          	onOk={this.okClick}
		          	onCancel={this.cancelClick}
		          	okText="确认"
		          	cancelText="取消"
		        >
		        	<CustomizedForm {...fields} onChange={this.handleFormChange} />
		        </Modal>
			</div>
		);
	}
}

export default ContentEditWindow;
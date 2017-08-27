import React from 'react';
import { Modal } from 'antd';

class MinerModal extends React.Component {
  render() {
    return (
      <div>
        <Modal title="提示"
          visible={this.props.visible}
          onOk={this.props.onOk}
          confirmLoading={this.props.confirmLoading}
          onCancel={this.props.onCancel}
        >
          <p>{this.props.text}</p>
        </Modal>
      </div>
    );
  }
}

export default MinerModal;
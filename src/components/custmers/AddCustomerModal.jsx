import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */


const AddCustomerModal = ({ data, loading, open, onClose, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data?._id) {
      form.setFieldsValue({
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        }
      })
    }
  }, [data, form])

  useEffect(() => {
    if (!open) {
      form.setFieldsValue({
        customer: {
          customerId: null,
          email: null,
          phone: null,
          address: null,
        }
      })
    }
  }, [open, form])

  if (!open) return null;
  return (
    <Modal title={`${data?._id ? 'Edit' : 'Add'} Customer`} visible={open} footer={null} onOk={onClose} onCancel={onClose}>
      <Form shouldUpdate form={form} {...layout} name="nest-messages" onFinish={onSave} validateMessages={validateMessages}>
        <Form.Item
          name={['customer', 'email']}
          label="Email"
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input disabled={data?._id} />
        </Form.Item>
        <Form.Item
          name={['customer', 'name']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['customer', 'phone']}
          label="Phone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['customer', 'address']}
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Customer
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;
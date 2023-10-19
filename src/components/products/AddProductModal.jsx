import { Button, Input, Form, Modal, Select } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};


const AddProductModal = ({ data, loading, open, onClose, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data._id) {
      form.setFieldsValue({
        product: {
          name: data?.name,
          UOM: data?.UOM,
        }
      })
    }
  }, [data, form])

  useEffect(() => {
    if (!open) {
      form.setFieldsValue({
        product: {
          name: null,
          UOM: null,
        }
      })
    }
  }, [open, form])

  if (!open) return null;
  
  return (
    <Modal title={`${data._id ? 'Edit' : 'Add'} Product`} visible={open} footer={null} onOk={onClose} onCancel={onClose}>
      <Form shouldUpdate form={form} {...layout} name="nest-messages" onFinish={onSave} >
        <Form.Item
          name={['product', 'name']}
          label="Name"
          rules={[{ required: true }]}
        >          
          <Input />
        </Form.Item>
        <Form.Item
          name={['product', 'UOM']}
          label="Unit of Measurement"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="BAG">BAG</Option>
            <Option value="TRUCK">TRUCK</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;



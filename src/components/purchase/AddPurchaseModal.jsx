import { useQuery } from '@apollo/client';
import { Button, DatePicker, Input, Form, Modal, Select } from 'antd';
import { fetchProducts } from '../../queries';
import { useEffect } from 'react';
import moment from 'moment';

const dateFormat ='DD/MM/YYYY';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const PurchaseModal = ({ data, open, onClose, loading, onSave }) => {
  const [form] = Form.useForm();
  const { data: productList, loading: loadingProducts } = useQuery(fetchProducts);
  
  useEffect(() => {
    if (data._id) {
      form.setFieldsValue({
        purchase: {
          productId: data?.product._id,
          quantity: data?.quantity,
          unitAmount: data?.unitAmount,
          date: !!data?.date ? moment(data?.date) : moment()
        }
      })
    }
  }, [data, form])

  useEffect(() => {
    if (!open) {
      form.setFieldsValue({
        purchase: {
          productId: null,
          quantity: null,
          unitAmount: null,
          date: null,
        }
      })
    }
  }, [open, form])

  if (!open) return null;

  return (
    <>
      <Modal title={`${data._id ? 'Edit' : 'Add'} Purchase`} visible={open} footer={null} onOk={onClose} onCancel={onClose}>
      <Form shouldUpdate form={form} {...layout} name="nest-messages" onFinish={onSave} >
        <Form.Item
          name={['purchase', 'productId']}
          label="Product"
          rules={[{ required: true }]}
        >
          <Select loading={loadingProducts}>
            {
              productList?.products?.map(prod => (
                <Option key={prod._id} value={prod._id}>{prod.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          name={['purchase', 'quantity']}
          label="Quantity"
          rules={[{ required: true }]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          name={['purchase', 'unitAmount']}
          label="Amount per Unit"
          rules={[{ required: true }]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          name={['purchase', 'date']}
          label="Date"
          rules={[{ required: true }]}
          shouldUpdate
        >
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Purchase
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default PurchaseModal;

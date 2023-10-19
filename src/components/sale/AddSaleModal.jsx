import { useQuery } from '@apollo/client';
import { Button, Form, Modal, DatePicker, Select, Input } from 'antd';
import { useEffect } from 'react';
import { fetchProducts, fetchCustomers } from '../../queries';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const SaleModal = ({ data, open, onClose, loading, onSave }) => {
  const [form] = Form.useForm();
  const { data: productList, loading: loadingProducts } = useQuery(fetchProducts);
  const { data: customerList, loading: loadingCustomers } = useQuery(fetchCustomers);

  useEffect(() => {
    if (data._id) {
      form.setFieldsValue({
        sale: {
          productId: data?.product._id,
          customerId: data?.customer._id,
          quantity: data.quantity,
          unitAmount: data?.unitAmount,
          date: !!data?.date ? moment(data?.date) : moment()
        }
      })
    }
  }, [data, form])

  useEffect(() => {
    if (!open) {
      form.setFieldsValue({
        sale: {
          productId: null,
          customerId: null,
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
      <Modal title={`${data._id ? 'Edit' : 'Add'} Sale`} visible={open} footer={null} onOk={onClose} onCancel={onClose}>
        <Form shouldUpdate form={form} {...layout} name="nest-messages" onFinish={onSave} >
          <Form.Item
            name={['sale', 'customerId']}
            label="Customer"
            rules={[{ required: true }]}
          >
            <Select loading={loadingCustomers}>
              {
                customerList?.customers?.map(customer => (
                  <Option key={customer._id} value={customer._id}>{customer.name}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name={['sale', 'productId']}
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
            name={['sale', 'quantity']}
            label="Quantity"
            rules={[{ required: true }]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item
            name={['sale', 'unitAmount']}
            label="Unit Amount"
            rules={[{ required: true }]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item
            name={['sale', 'date']}
            label="Date"
            rules={[{ required: true }]}
            shouldUpdate
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Sale
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SaleModal;

import { useQuery } from '@apollo/client';
import { Button, DatePicker, Input, Form, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { fetchCustomers, fetchProducts } from '../../queries';
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

const PaymentModal = ({ data, open, onClose, loading, onSave }) => {
  const [form] = Form.useForm();
  const { data: productList, loading: loadingProducts } = useQuery(fetchProducts);
  const { data: customerList, loading: loadingCustomers } = useQuery(fetchCustomers);


  useEffect(() => {
    if (data._id) {
      form.setFieldsValue({
        payment: {
          productId: data?.product._id,
          customerId: data?.customer._id,
          mode: data?.mode,
          amount: data?.amount,
          date: !!data?.date ? moment(data?.date) : moment()
        }
      })
    }
  }, [data, form])

  useEffect(() => {
    if (!open) {
      form.setFieldsValue({
        payment: {
          productId: null,
          customerId: null,
          mode: null,
          amount: null,
          date: null,
        }
      })
    }
  }, [open, form])
  if (!open) return null;
  return (
    <>
      <Modal forceRender title={`${data._id ? 'Edit' : 'Add'} Payment`} visible={open} footer={null} onOk={onClose} onCancel={onClose}>
        <Form shouldUpdate form={form} {...layout} name="nest-messages" onFinish={onSave} >
          <Form.Item
            name={['payment', 'productId']}
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
            name={['payment', 'customerId']}
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
            name={['payment', 'mode']}
            label="Payment Mode"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="BANK_TRANSFER">Bank Transfer</Option>
              <Option value="CASH">Cash</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={['payment', 'amount']}
            label="Amount"
            rules={[{ required: true }]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item
            name={['payment', 'date']}
            label="Date"
            rules={[{ required: true }]}
            shouldUpdate
          >
            <DatePicker format={dateFormat} />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Payment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PaymentModal;

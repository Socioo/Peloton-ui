import React, { useState } from 'react';
import { Table, Button, Typography, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columns } from '../components/payments/utils';
import AddPaymentModal from '../components/payments/AddPaymentModal'
import { createPayment, fetchPayments, updatePayment } from '../queries';
import { useMutation, useQuery } from '@apollo/client';

const { RangePicker } = DatePicker;

const { Title } = Typography;

export default function Payments() {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [currentPayment, setCurrentPayment] = useState({});
  const { data, loading } = useQuery(fetchPayments);
  const [createPaymentMutation, { loading: createPaymentLoading }] = useMutation(createPayment);
  // eslint-disable-next-line 
  const [updatePaymentMutation, { loading: updatePaymentLoading }] = useMutation(updatePayment);

  const closeModal = () => {
    setCurrentPayment({});
    setShowAddPayment(false);
  }
  const handleSavePayment = ({ payment }) => {
    const isEdit = !!currentPayment?._id;
    const opts = {
      variables: { payment: { ...payment, amount: Number(payment.amount) } },
      refetchQueries: [fetchPayments]
    }
    const mutationFunction = isEdit ? updatePaymentMutation : createPaymentMutation;
    if (isEdit) {
      opts.variables.id = currentPayment?._id
    }
    mutationFunction(opts)
      .then(() => {
        message.success(`Payment ${isEdit ? 'updated' : 'created'} successfully`);
        closeModal();
      })
      .catch(() => {
        message.error(`Unable to ${isEdit ? 'update' : 'create'} payment`);
      })
  }

  const onEditClick = (paymentRow) => {
    setCurrentPayment(paymentRow);
    setShowAddPayment(true)
  }
  return (
    <div>
      <div style={{ padding: "20px" }} />
      <div style={{ padding: "20px" }} />
      <Title style={{ textAlign: 'center' }} >Payment Records</Title>
      <div style={{ padding: "20px" }} />
      <div style={{ display: 'flex' , flexDirection: 'row', justifyContent: 'space-between' }}>
        <RangePicker />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          style={{borderRadius:"5px"}}
          onClick={() => setShowAddPayment(true)}
        >
          New Payment
        </Button>
      </div>
      <div style={{ padding: "20px" }} />
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns(onEditClick)}
        dataSource={data?.payments || []}
        size="middle"
      />
      <AddPaymentModal
        data={currentPayment}
        open={showAddPayment}
        onClose={closeModal}
        loading={createPaymentLoading || updatePaymentLoading }
        onSave={handleSavePayment}
      />
    </div>
  )
}

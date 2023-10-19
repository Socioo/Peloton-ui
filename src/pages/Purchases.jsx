import React, { useState } from 'react'
import { Button, message, Table, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columns } from '../components/purchase/utils';
import AddPurchaseModal from '../components/purchase/AddPurchaseModal'
import { useMutation, useQuery } from '@apollo/client';
import { createPurchase, fetchPurchases, updatePurchase } from '../queries';
import SummaryCard from '../components/SummaryCard';

const { RangePicker } = DatePicker;

export default function Purchases() {
  const { data, loading } = useQuery(fetchPurchases);
  const [showAddPurchase, setShowAddPurchase] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState({});
  const [createPurchaseMutation, { loading: createPurchaseLoading }] = useMutation(createPurchase);
  const [updatePurchaseMutation, { loading: updatePurchaseLoading }] = useMutation(updatePurchase);

  const closeModal = () => {
    setCurrentPurchase({});
    setShowAddPurchase(false);
  }
  const handleSavePurchase = ({ purchase }) => {
    const isEdit = !!currentPurchase?._id;
    const opts = {
      variables: { purchase: {
        ...purchase,
        quantity: Number(purchase.quantity),
        unitAmount: Number(purchase.unitAmount),
      }},
      refetchQueries: [fetchPurchases]
    }
    const mutationFunction = isEdit ? updatePurchaseMutation : createPurchaseMutation;
    if (isEdit) {
      opts.variables.id = currentPurchase?._id
    }
    mutationFunction(opts)
      .then(() => {
        message.success(`Purchase ${isEdit ? 'updated' : 'created'} successfully`);
        closeModal();
      })
      .catch(() => {
        message.error(`Unable to ${isEdit ? 'update' : 'create'} purchase`);
      })
  }

  const onEditClick = (purchaseRow) => {
    setCurrentPurchase(purchaseRow);
    setShowAddPurchase(true)
  }
  return (
    <div>
      <div style={{ padding: "20px 0px", textAlign: 'center' }}>
        <h2>Purchase</h2>
      </div>
      <SummaryCard 
        title="Total Purchases"
        value={1233}
      />
      <div style={{ padding: "20px 0px" }} />
      <div style={{ display: 'flex' , flexDirection: 'row', justifyContent: 'space-between' }}>
        <RangePicker />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setShowAddPurchase(true)}
        >
          New Purchase
        </Button>
      </div>
      <div style={{ padding: "20px" }} />
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns(onEditClick)}
        dataSource={data?.purchases || []}
        size="middle"
      />
      <AddPurchaseModal
        data={currentPurchase}
        open={showAddPurchase}
        onClose={closeModal}
        loading={createPurchaseLoading || updatePurchaseLoading}
        onSave={handleSavePurchase}
      />
    </div>
  )
}

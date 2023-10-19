import React, { useState } from 'react';
import { Table, Button, Typography, message, DatePicker } from 'antd';
import { PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { columns } from '../components/sale/utils';
import AddSaleModal from '../components/sale/AddSaleModal'
import { createSale, deleteSale, fetchSales, updateSale } from '../queries';
import { useMutation, useQuery } from '@apollo/client';
import SummaryCard from '../components/SummaryCard';
import confirm from 'antd/lib/modal/confirm';

const { RangePicker } = DatePicker;


const { Title } = Typography;

export default function Sales() {
  const { data, loading } = useQuery(fetchSales);
  const [showAddSale, setShowAddSale] = useState(false);
  const [currentSale, setCurrentSale] = useState({});
  
  const [createSaleMutation, { loading: createSaleLoading }] = useMutation(createSale);
  // eslint-disable-next-line 
  const [updateSaleMutation, { loading: updateSaleLoading }] = useMutation(updateSale);
  const [deleteSaleMutation, { loading: deletingSale }] = useMutation(deleteSale);

  const closeModal = () => {
    setCurrentSale({});
    setShowAddSale(false);
  }
  const handleSaveSale = ({ sale }) => {
    const isEdit = !! currentSale?._id;
    const opts = {
      variables: { sale: { 
        ...sale, 
        quantity: Number(sale.quantity), 
        unitAmount: Number(sale.unitAmount) 
      }},
      refetchQueries: [fetchSales]
    }
    const mutationFunction = isEdit ? updateSaleMutation : createSaleMutation;
    if (isEdit) {
      opts.variables.id = currentSale?._id
    }
    mutationFunction(opts)
      .then(() => {
        message.success(`Sale ${isEdit ? 'updated' : 'created'} successfully`);
        closeModal();
      })
      .catch(() => {
        message.error(`Unable to ${isEdit ? 'update' : 'create'} sale`);
      })
  }
  const onEditClick = (saleRow) => {
    setCurrentSale(saleRow)
    setShowAddSale(true)
  }

  const handleDeleteClick = ({ _id: saleId }) => {
    confirm({
      title: 'Are you sure delete this sale?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      okButtonProps: {
        loading: deletingSale
      },
      onOk() {
        deleteSaleMutation({ variables: { id: saleId }, refetchQueries: [{ query: fetchSales }]})
          .then(() => message.success(`Sale deleted successfully!`))
          .catch(() => message.error(`Unable to delete sale`))
      }
    })
  }

  return (
    <div>
      <SummaryCard 
        title="Total Sales"
        value={23}
      />
      <div style={{ padding: "20px" }}>
        <Title style={{ textAlign: 'center' }} >Sales</Title>
      </div>
      <div style={{ display: 'flex' , flexDirection: 'row', justifyContent: 'space-between' }}>
        <RangePicker />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setShowAddSale(true)}
          style={{borderRadius:"5px"}}
        >
          New Sales
        </Button>
      </div>
      <div style={{ padding: "20px" }} />
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns(onEditClick, handleDeleteClick)}
        dataSource={data?.sales || []}
        size="middle"
      />
      <AddSaleModal
        data={currentSale}
        open={showAddSale}
        onClose={closeModal}
        loading={createSaleLoading || updateSaleLoading}
        onSave={handleSaveSale}
      />
    </div>
  )
}

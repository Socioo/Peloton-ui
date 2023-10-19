import React, { useState } from 'react';
import { Button, Input, Table, message, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';

import SummaryCard from '../components/SummaryCard';
import { columns } from '../components/custmers/utils';
import AddCustomerModal from '../components/custmers/AddCustomerModal';
import { createCustomer, fetchCustomers, fetchTotalCustomers, updateCustomer } from '../queries';
const { Search } = Input;

export default function Customers() {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentCustomer, setCurrentCustomer] = useState({});
  
  const { data, loading } = useQuery(fetchCustomers, { variables: { search: searchValue } });
  const { data: totalCustomers, loadingTotalCustomers } = useQuery(fetchTotalCustomers);
  const [createCustomerMutation, { loading: creatingCustomerLoading }] = useMutation(createCustomer);
  const [updateCustomerMutation, { loading: updateCustomerLoading }] = useMutation(updateCustomer);

  const closeModal = () => {
    setCurrentCustomer({});
    setShowAddCustomer(false);
  }
  const handleSaveCustomer = ({ customer }) => {
    const isEdit = !!currentCustomer?._id;
    const opts = {
      variables: { customer: { ...customer } },
      refetchQueries: [fetchCustomers]
    }
    const mutationFunction = isEdit ? updateCustomerMutation : createCustomerMutation;
    if (isEdit) {
      opts.variables.id = currentCustomer?._id
    }
    mutationFunction(opts)
      .then(() => {
        message.success(`Customer ${isEdit ? 'updated' : 'created'} successfully`);
        closeModal();
      })
      .catch(() => {
        message.error(`Unable to ${isEdit ? 'update' : 'create'} customer`);
      })
  }

  const onEditClick = (customerRow) => {
    setCurrentCustomer(customerRow);
    setShowAddCustomer(true)
  }
 

  return (
    <div>
      <SummaryCard
        loading={loadingTotalCustomers}
        title="Total Customers"
        value={totalCustomers?.totalCustomers} />
      <div style={{ padding: "20px" }} />
      <Row>
        <Col span={12}>
          <Search
            placeholder="input search text"
            onSearch={setSearchValue} 
            size="large"
            enterButton
          />
        </Col>
        <Col span={6} offset={6}>
          <div style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setShowAddCustomer(true)}
            >
              Add Customer
            </Button>
          </div>
        </Col>
      </Row>
      <div style={{ padding: "20px" }} />
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns(onEditClick)}
        dataSource={data?.customers || []}
        size="middle"
      />
      <AddCustomerModal
        data={currentCustomer}
        open={showAddCustomer}
        onClose={closeModal}
        onSave={handleSaveCustomer}
        loading={creatingCustomerLoading || updateCustomerLoading}
      />
    </div>
  )
}

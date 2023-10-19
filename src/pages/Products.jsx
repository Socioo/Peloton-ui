import React, { useState } from 'react';
import { Button, Table, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddProductModal from '../components/products/AddProductModal';
import { columns } from '../components/products/utils';
import { createProduct, fetchProducts, updateProduct } from '../queries';
import { useQuery, useMutation } from '@apollo/client';
import SummaryCard from '../components/SummaryCard';

const { Title } = Typography;

export default function Products() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const { data, loading } = useQuery(fetchProducts);
  const [createProductMutation, { loading: createProductLoading }] = useMutation(createProduct);
  const [updateProductMutation, { loading: updateProductLoading }] = useMutation(updateProduct);

  const closeModal = () => {
    setCurrentProduct({});
    setShowAddProduct(false);
  }
  const handleSaveProduct = ({ product }) => {
    const isEdit = !!currentProduct?._id;
    const opts = {
      variables: { product: { ...product } },
      refetchQueries: [fetchProducts]
    }
    const mutationFunction = isEdit ? updateProductMutation : createProductMutation;
    if (isEdit) {
      opts.variables.id = currentProduct?._id
    }
    mutationFunction(opts)
      .then(() => {
        message.success(`Product ${isEdit ? 'updated' : 'created'} successfully`);
        closeModal();
      })
      .catch((e) => {
        message.error(e.message || `Unable to ${isEdit ? 'update' : 'create'} product`);
      })
  }

  const onEditClick = (productRow) => {
    setCurrentProduct(productRow);
    setShowAddProduct(true)
  }

  return (
    <div>
      <SummaryCard 
        title="Total Poducts"
        value={5}
      />
      <div style={{ padding: "20px" }} />
      <Title style={{ textAlign: 'center' }} >Products</Title>
      <div style={{ padding: "20px" }} />
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setShowAddProduct(true)}
        >
          Add Product
        </Button>
      </div>
      <div style={{ padding: "20px" }} />
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns(onEditClick)}
        dataSource={data?.products || []}
        size="middle"
      />
      <AddProductModal
        data={currentProduct}
        open={showAddProduct}
        onClose={closeModal}
        onSave={handleSaveProduct}
        loading={createProductLoading || updateProductLoading}
      />
    </div>
  )
}

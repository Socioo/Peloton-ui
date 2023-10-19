import { gql } from '@apollo/client';


// CUSTOMER
export const fetchCustomers = gql`
  query fetchCustomers($search: String){
    customers(search: $search) {
      _id
      key: _id
      name
      email
      phone
      address
    }
  }
`;

export const fetchTotalCustomers = gql`
  query fetchTotalCustomers{
    totalCustomers
  }
`;

export const createCustomer = gql`
  mutation createCustomer($newCustomer: CreateCustomerInput){
    createCustomer(newCustomer: $newCustomer) {
      name
    }
  }
`;

export const updateCustomer = gql`
  mutation updateCustomer($id: ID!, $customer: CreateCustomerInput!){
    updateCustomer(id: $id, customer: $customer) {
      _id
      name
      email
      phone 
      address
    }
  }
`;
export const deleteCustomer = gql`
  mutation deleteCustomer($id: ID!){
    deleteCustomer(id: $id) {
      _id
      name
      email
      phone 
      address
    }
  }
`;
export const deleteSale = gql`
  mutation deleteSale($id: ID!){
    deleteSale(id: $id) {
      _id
    }
  }
`;

// PRODUCT
export const fetchProducts = gql`
  query fetchProducts{
    products {
      _id
      name
      UOM
    }
  }
`;

export const createProduct = gql`
  mutation createProduct($product: CreateProductInput!){
    createProduct(product: $product) {
      _id
    }
  }
`;

export const updateProduct = gql`
  mutation updateProduct($id: ID!, $product: CreateProductInput!){
    updateProduct(id: $id, product: $product) {
      _id
    }
  }
`

// PURCHASE
export const fetchPurchases = gql`
  query fetchPurchases{
    purchases{
      _id
      product{
        name
        UOM
        _id
      }
      unitAmount
      date
      quantity
    }
  }
`;


export const createPurchase = gql`
  mutation createPurchase($purchase: CreatePurchaseInput!){
    createPurchase(purchase: $purchase) {
      _id
    }
  }
`;

export const updatePurchase =gql`
mutation updatePurchase($id: ID!, $purchase: CreatePurchaseInput!){
  updatePurchase(id: $id, purchase: $purchase) {
    _id
  }
}
`

// PAYMENT
export const fetchPayments = gql`
  query fetchPayments{
    payments{
      _id
      product{
        _id
        name
      }
      date
      amount
      mode
      customer {
        _id
        name
      }
    }
  }
`;

export const createPayment = gql`
  mutation createPayment($payment: CreatePaymentInput!){
    createPayment(payment: $payment) {
      _id
    }
  }
`;

export const updatePayment = gql`
  mutation updatePayment($id: ID!, $payment: CreatePaymentInput!){
    updatePayment(id: $id, payment: $payment) {
      _id
    }
  }
`;

// SALES

export const fetchSales = gql`
  query fetchSales{
    sales{
      _id
      product{
        _id
        name
      }
      customer {
        _id
        email
        name
      }
      date
      quantity
      unitAmount
    }
  }
`;

export const createSale = gql`
mutation createSale($sale: CreateSaleInput!){
  createSale(sale: $sale) {
    _id
    product{
      _id
      name
    }
      customer {
        email
        name
      }
      quantity
      date
      unitAmount
    }
  }
  `;
  
export const updateSale = gql`
    mutation updateSale($id: ID!, $sale: CreateSaleInput!){
      updateSale(id: $id, sale: $sale) {
        _id
        quantity
      }
    }
  `;

// USERS
export const fetchUsers = gql`
    query fetchUsers {
      users {
        _id
        first_name
        last_name
        gender
        email
        phone_number
        role
        profile_picture
      }
    }
`;

export const createUser = gql`
    mutation CreateUser($user: CreateUserInput!) {
      createUser(user: $user) {
        _id
        first_name
        last_name
        gender
        email
        phone_number
        role
        profile_picture
      }
    }
`;
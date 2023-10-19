import { Dropdown, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import { formatDate, formatNumber, formatPaymentMode } from "../../utils/helper";
import { MoreOutlined, DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';

export const columns = (onEditClick) => [
  {
    title: 'Date',
    key: '_id',
    render: row => <span>{formatDate(row.date)}</span>
  },
  {
    title: 'Customer',
    render: (row) => <Link to="#">{row.customer.name}</Link>,
  },
  {
    title: 'Product',
    render: (row) => <Link to="#">{row.product.name}</Link>,
    key: 'location',
  },
  {
    title: 'Amount',
    key: 'amount',
    render: (row) => <span>₦{formatNumber(row.amount, true)}</span>,
  },
  {
    title: 'Payment Mode',
    render: (row) => <span>{formatPaymentMode(row.mode)}</span>,
  },
  {
    title: 'Action',
    render: (row) => (
      <Space size="middle">
        <Dropdown overlay={(
          <Menu
            items={[
              {
                key: '1',
                label: <span onClick={() => onEditClick(row)}><EditOutlined />&nbsp;&nbsp;&nbsp;Edit</span>,
              },
              {
                key: '2',
                label: <a download href={`${process.env.REACT_APP_API_URL}/cash-invoice/${row._id}`}><DownloadOutlined />&nbsp;&nbsp;&nbsp;Download Receipt</a>,
              },
              {
                key: '3',
                label: <span><DeleteOutlined />&nbsp;&nbsp;&nbsp;Delete</span>,
              },
            ]}
          />)}>
            <MoreOutlined />
        </Dropdown>
      </Space>
    ),
  },
];


import { Link } from "react-router-dom";
import { formatDate, formatNumber } from "../../utils/helper";
import { MoreOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from "antd";

export const columns = (onEditClick) => [
  {
    title: 'Date',
    key: '_id',
    render: (row) => <span>{formatDate(row.date)}</span>,
  },
  {
    title: 'Product Name',
    key: 'name',
    render: (row) => <Link to="#">{row?.product?.name}</Link>,
  },
  {
    title: 'Quantity',
    key: 'quantity',
    render: (row) => <span>{formatNumber(row?.quantity, false)}</span>,
  },
  {
    title: 'Unit Amount',
    key: 'unitAmount',
    render: (row) => row.unitAmount ? <span>₦{formatNumber(row.unitAmount, true)}</span> : <span>NIL</span>,
  },
  {
    title: 'Total Amount',
    render: (row) => row.unitAmount ? <span>₦{formatNumber(row.unitAmount * (row?.quantity || 0), true)}</span> : <span>NIL</span>,
  },
  {
    title: 'Unit of Measurement',
    key: 'UOM',
    render: (row) => <span>{row?.product?.UOM}</span>,
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

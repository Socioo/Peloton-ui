import { Link } from "react-router-dom";
import { MoreOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from "antd";

export const columns = (onEditClick) => [
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: '_id',
    render: (text) => <Link to="#">{text}</Link>,
  },
  {
    title: 'Unit of Measurement',
    dataIndex: 'UOM',
    key: 'UOM',
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

import { Form, Select, Table, Input, DatePicker } from "antd";
import React from "react";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

const columns = [
  {
    title: "Time Stamp",
    dataIndex: "timestamp",
  },
  {
    title: "Modified By",
    dataIndex: "modifiedby",
  },
  {
    title: "Operation",
    dataIndex: "operation",
  },
  {
    title: "Changed to",
    dataIndex: "changedto",
  },
];
const data = [
  {
    key: "1",
    timestamp: "January 2th 2023 13:52:22",
    modifiedby: "Ahmadee",
    operation: "Audit Log",
    changedto: "Complete the layout",
  },
  {
    key: "2",
    timestamp: "January 3th 2023 18:42:12",
    modifiedby: "badamaceeee@gmail.com",
    operation: "Role",
    changedto: "Added Permissions",
  },
  {
    key: "3",
    timestamp: "January 5th 2023 16:22:32",
    modifiedby: "ahmad_badamas@yahoo.com",
    operation: "Dashboard",
    changedto: "Display",
  },
];

export default function AuditLog() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Modifiction Log</h2>
      <div style={{ padding: "20px" }}></div>
      <Form style={{ display: "flex" }}>
        <Search
          placeholder="Search operation by username"
          size="large"
          style={{ width: "500px", marginRight: "15px", height: "35px" }}
        />
        &nbsp;&nbsp;&nbsp;
        <Form.Item
          name={[ "operation" ]}
          label="OPERATION"
          style={{ width: "350px", marginRight: "15px" }}
        >
          <Select
            placeholder="Select"
          >
            <Option value="PRODUCTS">Products</Option>
            <Option value="CUSTOMERS">Customers</Option>
            <Option value="PURCHASE">Purchase</Option>
            <Option value="SALES">Sales</Option>
            <Option value="USERS">Users</Option>
          </Select>
        </Form.Item>
        &nbsp;&nbsp;&nbsp;
        <RangePicker
          style={{ width: "500px", height: "35px" }}
        />
      </Form>
      <div style={{ padding: "20px" }}></div>
      <Table columns={columns} dataSource={data} size="middle" />
    </div>
  );
}

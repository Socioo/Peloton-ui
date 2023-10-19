import { Checkbox, Divider, Form, Input } from "antd";
import React from "react";
import "../index.css";

const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};

const plainOptions = ["Read", "Create", "Update", "Delete"];
// eslint-disable-next-line
const options = [
  {
    label: "Read",
    value: "Read",
  },
  {
    label: "Create",
    value: "Create",
  },
  {
    label: "Update",
    value: "Update",
  },
  {
    label: "Delete",
    value: "Delete",
  },
];

export default function Role() {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Create Role</h3>
      <div style={{ padding: "20px" }}></div>
      <Form style={{ display: "flex"}}>
        <Form.Item label="NAME" style={{ width: "500px", marginRight: "10px" }}>
          <Input placeholder="Enter role name" />
        </Form.Item>
        &nbsp;&nbsp;&nbsp;
        <Form.Item label="DESCRIPTION" style={{ width: "650px" }}>
          <Input placeholder="Enter role description" />
        </Form.Item>
      </Form>
      <h4>Permissions</h4>
      <Divider />
      <div style={{ textAlign: "center", margin: "15px", padding: "5px", backgroundColor: "#f2f4f2" }}>
        <div style={{ display: "flex", padding: "15px", margin: "10px", backgroundColor: "white" }}>
          <h3 style={{ paddingRight: "95px" }}>Manage Customers</h3>
          <Checkbox.Group options={plainOptions} onChange={onChange} style={{ display:"flex", justifyContent: "space-between"}} />
        </div>
        <div style={{ display: "flex", padding: "15px", margin: "10px", backgroundColor: "white" }}>
          <h3 style={{ paddingRight: "110px" }}>Manage Products</h3>
          <Checkbox.Group options={plainOptions} onChange={onChange} />
        </div>
        <div style={{ display: "flex", padding: "15px", margin: "10px", backgroundColor: "white" }}>
          <h3 style={{ paddingRight: "98px" }}>Manage Purchases</h3>
          <Checkbox.Group options={plainOptions} onChange={onChange} />
        </div>
        <div style={{ display: "flex", padding: "15px", margin: "10px", backgroundColor: "white" }}>
          <h3 style={{ paddingRight: "133px" }}>Manage Sales</h3>
          <Checkbox.Group options={plainOptions} onChange={onChange} />
        </div>
        <div style={{ display: "flex", padding: "15px", margin: "10px", backgroundColor: "white" }}>
          <h3 style={{ paddingRight: "100px" }}>Manage Payments</h3>
          <Checkbox.Group options={plainOptions} onChange={onChange} />
        </div>
        <div style={{ display: "flex", padding: "15px", margin: "10px", backgroundColor: "white" }}>
          <h3 style={{ paddingRight: "130px" }}>Manage Users</h3>
          <Checkbox.Group options={plainOptions} onChange={onChange} />
        </div>
        <div style={{ display: "flex", padding: "15px", margin: "10px", backgroundColor: "white" }}>
          <h3 style={{ paddingRight: "130px" }}>Manage Roles</h3>
          <Checkbox.Group options={plainOptions} onChange={onChange} />
        </div>
        <div style={{ display: "flex", padding: "15px", margin: "10px", backgroundColor: "white" }}>
          <h3 style={{ paddingRight: "80px" }}>Manage Admin Roles</h3>
          <Checkbox.Group options={plainOptions} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

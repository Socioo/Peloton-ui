import React, { useState } from 'react';
import { Button, message, Table, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columns } from '../components/users/utils';
import AddUserModal from '../components/users/AddUserModal';
import { useQuery, useMutation } from '@apollo/client';
import { fetchUsers, createUser } from '../queries';
import SummaryCard from '../components/SummaryCard';

const { Title } = Typography;

export default function Users() {
    const [showAddUser, setShowAddUser] = useState(false);

    const { data: userList, loading } = useQuery(fetchUsers);
    const [createUserMutation, { loading: creatingUserLoading }] = useMutation(createUser);
    
    const onSave = ({ user }) => {
        createUserMutation({
            variables: { user },
            refetchQueries: [fetchUsers]
        })
            .then(() => {
                message.success('User created successfully',);
                setShowAddUser(false);
            })
            .catch((e) =>{
                message.error(e.message || 'Unable to create user',)
            })
    }
    return (
        <div>
            <SummaryCard 
                title="Total Users"
                value={13}
            />
            <div style={{ padding: "20px" }} />
            <Title style={{ textAlign: 'center' }}>Users</Title>
            <div style={{ padding: "20px" }} />
            <div style={{ textAlign: 'right' }}>
                <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setShowAddUser(true)}
                style={{ borderRadius:"5px"}}
                >
                Add User
                </Button>
            </div>
            <div style={{ padding: "20px" }} />
            <Table
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={userList?.users || []}
                size="middle"
            />
            <AddUserModal
                open={showAddUser}
                onClose={() => setShowAddUser(false)}
                onSave={onSave}
                loading={creatingUserLoading}
            />
        </div>
    )
}
import { Avatar, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleDialog from '../SimpleDialog';
import BlockUserDialog from '../BlockUserDialog';
import UnblockUserDialog from '../UnblockUserDialog';

function UserTable({ rows, rootAdmin = false, isAdmin = false, loadData = () => {} }) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'avatar',
            headerName: 'Hình ảnh',
            width: 80,
            renderCell: (param) => {
                return (
                    <>
                        <Avatar src={param.value} variant="rounded" />
                    </>
                );
            },
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 200,
        },
        { field: 'fullname', headerName: 'Tên người dùng', width: 280 },
        {
            field: 'gender',
            headerName: 'Giới tính',
            width: 100,
            renderCell: (param) => {
                return <>{param.value === 'male' ? 'Nam' : 'Nữ'}</>;
            },
        },
        {
            field: 'birthYear',
            headerName: 'Năm sinh',
            width: 120,
        },
        {
            field: 'operation',
            headerName: 'Thao tác',
            width: 160,
            renderCell: (param) => {
                return (
                    <>
                        {param.value && (
                            <>
                                {param.value.status ? (
                                    <BlockUserDialog reload={loadData} usernameToBlock={param.value.username} />
                                ) : (
                                    <UnblockUserDialog reload={loadData} usernameToUnblock={param.value.username} />
                                )}
                            </>
                        )}
                    </>
                );
            },
        },
    ];
    const adminColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'avatar',
            headerName: 'Hình ảnh',
            width: 80,
            renderCell: (param) => {
                return (
                    <>
                        <Avatar src={param.value} variant="rounded" />
                    </>
                );
            },
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 200,
        },
        { field: 'fullname', headerName: 'Tên người dùng', width: 280 },
        {
            field: 'gender',
            headerName: 'Giới tính',
            width: 100,
        },
        {
            field: 'birthYear',
            headerName: 'Năm sinh',
            width: 120,
        },
        {
            field: 'operation',
            headerName: 'Thao tác',
            width: 160,
            renderCell: (param) => {
                return (
                    <>
                        {param.value && rootAdmin && (
                            <>
                                {param.value.status ? (
                                    <BlockUserDialog reload={loadData} usernameToBlock={param.value.username} />
                                ) : (
                                    <UnblockUserDialog reload={loadData} usernameToUnblock={param.value.username} />
                                )}
                            </>
                        )}
                    </>
                );
            },
        },
    ];

    return (
        <div style={{ height: 480, width: '100%' }}>
            <DataGrid rows={rows} columns={isAdmin ? adminColumns : columns} />
        </div>
    );
}

export default UserTable;

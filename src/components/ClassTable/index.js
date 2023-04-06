import { Avatar, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleDialog from '../SimpleDialog';
import BlockUserDialog from '../BlockUserDialog';
import UnblockUserDialog from '../UnblockUserDialog';
import BlockClassDialog from '../BlockClassDialog';
import { renderToDate } from '~/utils';
import UnblockClassDialog from '../UnblockClassDialog';

function ClassTable({ rows, loadData = () => {} }) {
    const columns = [
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
            field: 'name',
            headerName: 'Tên lớp',
            width: 280,
        },
        { field: 'username', headerName: 'Sở hữu', width: 150 },
        {
            field: 'createdDate',
            headerName: 'Ngày tạo',
            width: 120,
            renderCell: (param) => {
                return <>{renderToDate(param.value)}</>;
            },
        },
        {
            field: 'stars',
            headerName: 'Rating',
            width: 80,
        },
        {
            field: 'id',
            headerName: 'Xem lớp',
            width: 100,
            renderCell: (param) => {
                return (
                    <Link to={`/class/${param.value}/intro`}>
                        <Button>Xem</Button>
                    </Link>
                );
            },
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
                                    <BlockClassDialog reload={loadData} id={param.value.id} />
                                ) : (
                                    <UnblockClassDialog reload={loadData} id={param.value.id} />
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
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
}

export default ClassTable;

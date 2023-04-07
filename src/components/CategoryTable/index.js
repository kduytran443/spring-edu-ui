import { Avatar, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleDialog from '../SimpleDialog';
import BlockUserDialog from '../BlockUserDialog';
import UnblockUserDialog from '../UnblockUserDialog';
import BlockCategoryDialog from '../BlockCategoryDialog';
import UnblockCategoryDialog from '../UnblockCategoryDialog';
import UpdateCategoryDialog from '../UpdateCategoryDialog';

function CategoryTable({ rows, alreadyList = [], loadData = () => {} }) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'image',
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
            headerName: 'Tên danh mục',
            width: 120,
        },
        {
            field: 'code',
            headerName: 'Code',
            width: 100,
        },
        { field: 'description', headerName: 'Mô tả', width: 400 },
        {
            field: 'operation',
            headerName: 'Thao tác',
            width: 160,
            renderCell: (param) => {
                return (
                    <>
                        {param.value.status === 1 && (
                            <UpdateCategoryDialog
                                alreadyList={alreadyList}
                                id={param.value.id}
                                reload={loadData}
                                button="Sửa"
                            />
                        )}
                        {param.value && (
                            <>
                                {param.value.status ? (
                                    <BlockCategoryDialog reload={loadData} id={param.value.id} />
                                ) : (
                                    <UnblockCategoryDialog reload={loadData} id={param.value.id} />
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

export default CategoryTable;

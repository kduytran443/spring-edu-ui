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
import ViewReportClassDialog from '../ViewReportClassDialog';

function ReportTable({ rows, loadData = () => {} }) {
    const columns = [
        {
            field: 'userAvatar',
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
            headerName: 'Người gửi',
            width: 160,
        },
        { field: 'className', headerName: 'Lớp', width: 240 },
        {
            field: 'createdDate',
            headerName: 'Ngày tạo',
            width: 120,
            renderCell: (param) => {
                return <>{renderToDate(param.value)}</>;
            },
        },
        {
            field: 'classId',
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
            field: 'content',
            headerName: 'Nội dung',
            width: 160,
            renderCell: (param) => {
                return (
                    <>
                        {param.value && (
                            <>
                                <ViewReportClassDialog reportTextData={param.value} />
                            </>
                        )}
                    </>
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
                                    <BlockClassDialog reload={loadData} id={param.value.classId} />
                                ) : (
                                    <UnblockClassDialog reload={loadData} id={param.value.classId} />
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

export default ReportTable;

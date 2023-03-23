import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { renderToTime } from '~/utils';
import DeleteDiscountDialog from './DeleteDiscountDialog';
import EditDiscountDialog from './EditDiscountDialog';

function DiscountTable({ data = [], reload = () => {} }) {
    const columns = [
        {
            field: 'discountPercent',
            headerName: 'Tỉ lệ giảm',
            width: 130,
            renderCell: (param) => {
                return <>{param.value}%</>;
            },
        },
        {
            field: 'startDate',
            headerName: 'Giờ bắt đầu',
            width: 150,
            renderCell: (param) => {
                return <>{renderToTime(param.value)}</>;
            },
        },
        {
            field: 'endDate',
            headerName: 'Phút bắt đầu',
            width: 150,
            renderCell: (param) => {
                return <>{renderToTime(param.value)}</>;
            },
        },
        {
            field: 'id',
            headerName: 'Thao tác',
            width: 160,
            renderCell: (param) => {
                return (
                    <>
                        <EditDiscountDialog discountId={param.value} reload={reload} />
                        <DeleteDiscountDialog discountId={param.value} reload={reload} />
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <div style={{ height: 280, width: '100%' }}>
                <DataGrid rows={data} columns={columns} />
            </div>
        </div>
    );
}

export default DiscountTable;

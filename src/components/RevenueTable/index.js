import { DataGrid } from '@mui/x-data-grid';
import { renderToTime, renderToVND } from '~/utils';

function RevenueTable({ data = [], reload = () => {} }) {
    const columns = [
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
        },
        {
            field: 'code',
            headerName: 'Mã giao dịch',
            width: 200,
        },
        {
            field: 'fee',
            headerName: 'Số tiền',
            width: 150,
            renderCell: (param) => {
                return <>{renderToVND(param.value)}</>;
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

export default RevenueTable;

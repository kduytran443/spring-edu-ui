import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { renderToTime } from '~/utils';
import DeleteDiscountDialog from './DeleteDiscountDialog';
import EditDiscountDialog from './EditDiscountDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

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
            headerName: 'Bắt đầu',
            width: 150,
            renderCell: (param) => {
                return <>{renderToTime(param.value)}</>;
            },
        },
        {
            field: 'endDate',
            headerName: 'Kết thúc',
            width: 150,
            renderCell: (param) => {
                return <>{renderToTime(param.value)}</>;
            },
        },
        {
            field: 'effective',
            headerName: 'Đang áp dụng',
            width: 150,
            renderCell: (param) => {
                return (
                    <>
                        {param.value ? (
                            <FontAwesomeIcon className="text-green-500" icon={faCheck} />
                        ) : (
                            <FontAwesomeIcon className="text-red-500" icon={faX} />
                        )}
                    </>
                );
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

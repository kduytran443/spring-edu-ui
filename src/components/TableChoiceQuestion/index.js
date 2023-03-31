import { DataGrid } from '@mui/x-data-grid';
import { memo } from 'react';

function TableChoiceQuestion({ rows, columns }) {
    return (
        <div>
            <div className="bg-white" style={{ height: 480, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </div>
    );
}

export default memo(TableChoiceQuestion);

import { DataGrid } from '@mui/x-data-grid';

function TableChoiceQuestion({ rows, columns }) {
    return (
        <div>
            <div className="bg-white" style={{ height: 480, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </div>
    );
}

export default TableChoiceQuestion;

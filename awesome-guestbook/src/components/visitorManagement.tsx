import { useState } from 'react';
import '../styles/VisitorManagement.css';
import { useVisitors } from '../contexts/visitorsContext';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';


const columns: GridColDef[] = [
    { field: 'visitor', headerName: 'Visitor', width: 466, sortable: false, disableColumnMenu: true, resizable: false, },
    { field: 'email', headerName: 'Email', width: 466, sortable: false, disableColumnMenu: true, resizable: false, },
    {
        field: 'department',
        headerName: 'Department',
        width: 160,
        flex: 2,
        sortable: false,
        disableColumnMenu: true,
        resizable: false,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => (
            <Chip label={params.value as string} />
        )
    },
];

const VisitorManagement = () => {
    const { visitors, setVisitors } = useVisitors();
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
    const [isRemoveAllChecked, setIsRemoveAllChecked] = useState<boolean>(false);

    const handleRemoveSelected = () => {
        const updatedVisitors = visitors.filter(visitor => !selectedRows.includes(visitor.id));
        setVisitors(updatedVisitors);
        localStorage.setItem('visitors', JSON.stringify(updatedVisitors));
        setSelectedRows([]);
        setIsRemoveAllChecked(false);
    };

    const handleRemoveAllCheckboxChange = () => {
        if (!isRemoveAllChecked) {
            setSelectedRows(visitors.map(visitor => visitor.id.toString()));
            setIsRemoveAllChecked(true);
        } else {
            setSelectedRows([]);
            setIsRemoveAllChecked(false);
        }
    };


    return (
        <div className='VisitorManagementComponentContainer'>
            <div>
                <Typography variant="h4">Visitor management</Typography>
            </div>
            {visitors.length ? (
                <div className='VisitorsDataContainer'>

                    <div className="customHeader">
                        <FormControlLabel control={
                            <Checkbox
                                checked={isRemoveAllChecked}
                                onClick={handleRemoveAllCheckboxChange}

                            />} label={
                                <Button
                                    onClick={handleRemoveSelected}
                                    sx={{
                                        backgroundColor: '#D32F2F',
                                        color: '#fff',
                                        width: '100%',
                                        marginLeft: '16px',
                                        '&:hover': {
                                            backgroundColor: '#D32F2F',
                                        }
                                    }}
                                    variant="contained"
                                >
                                    REMOVE
                                </Button>
                            } />
                    </div>

                    <DataGrid
                        rows={visitors}
                        columns={columns}
                        onRowSelectionModelChange={(newSelection) => {
                            setSelectedRows(newSelection as any[]);
                            setIsRemoveAllChecked(newSelection.length === visitors.length);
                        }}
                        checkboxSelection
                        rowSelectionModel={selectedRows}
                    />
                </div>
            ) : (
                <div className="emptyVisitorsContainer">
                    <Typography variant="h3">No visitors available.</Typography>
                </div>
            )}

        </div>
    )
}

export default VisitorManagement;


import * as React from 'react';
import { DataGrid, GridToolbar, GridFooter } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';
import Modal from '@mui/material/Modal';
import InputTransaction from './InputTransaction';
import LineChart from './LineChart';

const TransactionHistory = ({ user }) => {
    const [allHistoryGraph, setAllHistoryGraph] = useState([])
    const [allHistory, setAllHistory] = useState([''])
    const [openModal, setOpenModal] = useState(false)
    const [snackState, setSnackState] = useState({
        open: false,
        message: 'Unknown Error',
        severity: 'success'
    });
    const { paperID } = useParams()

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert ref={ref} variant="filled" {...props} />;
    });

    const AddTransactionToobar = () => {
        return (
            <Box
                sx={{
                    borderTop: 1,
                    borderColor: 'divider',

                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 7px',
                }}
            >
                <div className="add-paper-button">
                    <Button variant="outlined" onClick={handleModalOpen}>Add Transaciton</Button>
                </div>
                <GridFooter sx={{ border: 'none' }} />
            </Box>
        )
    }

    const columns = [
        { field: 'id', headerName: 'Id', width: 130 },
        { field: 'timeStamp', headerName: 'Time', width: 250 },
        { field: 'paperID', headerName: 'PaperId', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'typeName', headerName: 'Type', width: 130 },
        { field: 'username', headerName: 'User', width: 150 },
    ];

    const data = [
        {
            "id": "Transaction History",
            "color": "hsl(206, 97%, 30%)",
            "data": allHistoryGraph
        }
    ]

    const handleTransactionHistories = async () => {
        try {
            const rawAllHistory = await fetch("https://localhost:7159/api/Transactions/GetTransactionHistories", {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                method: "GET",
            })
            const jsonAllHistory = await rawAllHistory.json()
            const filteredTransactionHistory = jsonAllHistory.filter((row) => (row.paperID == paperID))
            setAllHistory(filteredTransactionHistory);
        } catch (error) {
            console.log(error)
        }
    }

    const handleTransactionHistoryGraphData = async () => {
        let jsonPaperInfo;

        const graphData = allHistory.map((obj, index) => {
            const yData = () => {
                if (obj.typeName == 'receive') {
                    return (obj.quantity * -1)
                } else if (obj.typeName === 'reserve') {
                    return obj.quantity
                }
            }
            return {
                x: index,
                y: yData()
            }
        })

        try {
            const rawPaperInfo = await fetch(`https://localhost:7159/api/Papers/${paperID}`, {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                method: "GET",
            })
            jsonPaperInfo = await rawPaperInfo.json()
            let qoh = jsonPaperInfo.qoh;
            for (let i = graphData.length; i > 0; i--) {
                let x;
                x = graphData[i - 1].y
                graphData[i - 1].y = qoh
                qoh = qoh + x
            }
            setAllHistoryGraph(graphData.splice(-20))
        } catch (error) {
            console.log(error)
        }
    }

    const handleResponseInfo = (errorType) => {
        if (errorType == 'success') {
            setSnackState({
                open: true,
                message: 'Transaction Created',
                severity: 'success'
            });
        } else if (errorType == 'bottom out') {
            setSnackState({
                open: true,
                message: 'Cannot reserve more than current quantity',
                severity: 'error'
            });
        }
    };

    const handleClose = () => {
        setSnackState({
            ...snackState,
            open: false,
        });
    };

    const handleModalOpen = () => {
        setOpenModal(true)
    }

    const handleModalClose = () => {
        handleTransactionHistories()
        setOpenModal(false);
    }

    useEffect(() => {
        handleTransactionHistories()
        const idTimer = setInterval(handleTransactionHistories, 5000)

        return () => {
            clearInterval(idTimer)
        }
    }, [])

    useEffect(() => {
        handleTransactionHistoryGraphData()
    }, [allHistory])

    return (
        <>
            <div style={{ height: "300px", border: "1px solid #e1e1e1", borderRadius: "5px" }}>
                <h1 style={{position: 'absolute', padding: '10px'}}>Transaction History</h1>
                <LineChart data={data} />
            </div>

            <div style={{ height: 300 }}>
                <DataGrid
                    rows={allHistory.map((row, index) => ({ ...row, id: index}))}
                    columns={columns}
                    disableColumnSelector
                    disableDensitySelector
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 100 },
                        },
                    }}
                    pageSizeOptions={[100]}
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: GridToolbar,
                        footer: AddTransactionToobar,
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 400 },
                        },
                    }}
                />
                <Modal
                    open={openModal}
                    onClose={handleModalClose}
                >
                    <div>
                        <InputTransaction user={user} closeModal={handleModalClose} snackResponse={handleResponseInfo} />
                    </div>
                </Modal>
                <Snackbar
                    open={snackState.open}
                    onClose={handleClose}
                    TransitionComponent={Slide}
                    autoHideDuration={6000}
                >
                    <Alert severity={snackState.severity}>{snackState.message}</Alert>
                </Snackbar>
            </div>
        </>
    );
}

export default TransactionHistory
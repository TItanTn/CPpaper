import * as React from 'react';
import { DataGrid, GridToolbar, GridFooter } from '@mui/x-data-grid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState, useEffect } from 'react';
import { IconButton, Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import PaperInputs from './PaperInputs';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';


export default function DenseTable() {
  const [allStocks, setAllStocks] = useState([])
  const [open, setOpen] = useState(false);
  const { Username } = useParams()
  const [snackState, setSnackState] = useState({
    open: false,
    message: 'Unknown Error'
  });

  const handleModalOpen = () => {
    setOpen(true)
  }

  const handleModalClose = () => {
    setOpen(false);
  }

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert ref={ref} variant="filled" {...props} />;
  });

  const handleFindStocks = async () => {
    try {
      const rawAllStock = await fetch("https://localhost:7159/api/Papers/GetFindStocks", {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: "GET",
      })
      const jsonAllStock = await rawAllStock.json()
      setAllStocks(jsonAllStock)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFindStocks()
    const idTimer = setInterval(handleFindStocks, 5000)

    return () => {
      clearInterval(idTimer)
    }
  }, [])

  const handleSuccessfulInfo = () => {
    setSnackState({
      open: true,
      message: 'New Paper Created',
    });
  };

  const handleClose = () => {
    setSnackState({
      ...snackState,
      open: false,
    });
  };

  const MoreDetails = (props) => {
    return (
      <Link to={`/PaperInventory/${Username}/${props.id}`}>
        <IconButton color="primary" component="label">
          <NavigateNextIcon />
        </IconButton>
      </Link>
    );
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'size', headerName: 'Size', width: 130 },
    { field: 'weight', headerName: 'Weight', width: 130 },
    { field: 'finish', headerName: 'Finish', width: 150 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'qoh', headerName: 'QOH', width: 130 },
    { field: 'moreDetails', headerName: 'More Details', renderCell: MoreDetails, width: 130 },
  ];

  const AddPaperToobar = () => {
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
          <Button variant="outlined" onClick={handleModalOpen}>Add Paper</Button>
        </div>
        <GridFooter sx={{ border: 'none' }} />
      </Box>
    )
  }

  return (
    <div style={{ height: 600, maxWidth: '90%', boxSizing: 'border-box', padding: '0 2.5%' }}>
      <DataGrid
        rows={allStocks}
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
          footer: AddPaperToobar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 400 },
          },
        }}
      />
      <Modal
        open={open}
        onClose={handleModalClose}
      >
        <div>
          <PaperInputs closeModal={handleModalClose} onSuccess={handleSuccessfulInfo} />
        </div>
      </Modal>
      <Snackbar
        open={snackState.open}
        onClose={handleClose}
        TransitionComponent={Slide}
        autoHideDuration={6000}
      >
        <Alert severity="success">{snackState.message}</Alert>
      </Snackbar>
    </div>
  );
}
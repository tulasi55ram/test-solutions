import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const SnackBar = ({ message }: any) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event: React.SyntheticEvent | Event) => setOpen(false);

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )
  
  return (
    <Snackbar 
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  )
}

export default SnackBar;
import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
 
import useStyles from './style'
 
const CustomizeSnackbar = ({open,setOpen}) => {
   
    const handelClose=(event,reason)=>{
if (reason==='clickaway') return;
       setOpen(false);
    }
    const classes=useStyles();
    return (
      <div className={classes.root}>
<Snackbar
 anchorOrigin={{vertical:'top',horizontal:'right'}}
open={open}
autoHideDuration={3000}
onClose={handelClose}
>
<MuiAlert
   onClose={handelClose} 
   severity='success'
   elevation={6}
   variant='filled'
>
Transaction Successfully Created
</MuiAlert>
</Snackbar>
      </div>
    )
}

export default CustomizeSnackbar

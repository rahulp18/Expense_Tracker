import { makeStyles } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

export default makeStyles((theme)=>({
   avatarIncome:{
       color:'#fff',
       backgroundColor:green[500],
   },
   avatarExpense:{
       color:theme.palette.getContrastText(red[500]),
       backgroundColor:red[500],
   },
   list:{
       maxHeight:'150px',
       overflow:'auto',
   },
}))
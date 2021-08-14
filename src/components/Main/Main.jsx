import React from 'react'
import {Card,CardContent,CardHeader,Typography,Grid,Divider} from '@material-ui/core'
import useStyles  from './style'
import Form from './Form/Form';
import List from './List/List';
import { useGlobalContext } from '../../context/Context';
import InfoCard from '../InfoCard';
const Main = () => {
    const {balance}=useGlobalContext();
    const classes=useStyles();
    return (
         <Card   >
             <CardHeader title="Expense Tracker" subheader='Powered by Speechly'/>
  <CardContent>
      <Typography align='center' variant='h5'>Total Balance ₹{balance}</Typography>
      <Typography variant='subtitle1' style={{lineHeight:'1.5em',marginTop:'20px'}}>
         <InfoCard/>
      </Typography>
      <Divider className={classes.divider}/>
      <Form/>

  </CardContent>
  <CardContent className={classes.cardContent}>
<Grid container spacing={2}>
    <Grid item xs={12}>
 <List/>
    </Grid>
</Grid>
  </CardContent>
         </Card>

    )
}

export default Main

import React from 'react'
import useStyles from './style'
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core'
import { Delete, MoneyOff } from '@material-ui/icons'
import { useGlobalContext } from '../../../context/Context'
const List = () => {
    const {transaction,deleteTransactions}=useGlobalContext();
    const classes = useStyles();

    return (
        <MUIList dense={false} className={classes.list}>
            {
transaction.map((item)=>(
    <Slide key={item.id} direction='down' in mountOnEnter unmountOnExit >
<ListItem>
    <ListItemAvatar>
        <Avatar className={item.type==='Income'?classes.avatarIncome:classes.avatarExpense}>
<MoneyOff/>
        </Avatar>
    </ListItemAvatar>
    <ListItemText primary={item.category} secondary={`$${item.amount}-${item.date}`} />
    <ListItemSecondaryAction>
        <IconButton edge="end" aria-label='delete' onClick={()=>deleteTransactions(item.id)}>
            <Delete/>
        </IconButton>
    </ListItemSecondaryAction>
</ListItem>
    </Slide>
))
            }

        </MUIList>
    )
}

export default List

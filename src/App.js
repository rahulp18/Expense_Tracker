import React,{useEffect,useRef} from 'react'
import {Grid} from '@material-ui/core'
import Details from './components/Details/Details'
import Main from './components/Main/Main'
import useStyles from './style'
import {PushToTalkButton,PushToTalkButtonContainer,ErrorPanel} from '@speechly/react-ui'
import {useSpeechContext,SpeechState} from '@speechly/react-client'
const App = () => {
const {speechState} =useSpeechContext();
const main=useRef(null);
const exicuteScroll=()=> main.current.scrollIntoView();
useEffect(()=>{
if(speechState===SpeechState.Recording){
  exicuteScroll();
}
},[speechState])


  const classes=useStyles();
  return (
    <div>
     <Grid container spacing={0} justifyContent='center' alignItems='center'className={classes.grid} style={{height:'100vh'}}>
<Grid item xs={12} sm={4} className={classes.mobile}  >
<Details title="Income"/>
</Grid>
<Grid item xs={12} sm={3} ref={main} className={classes.main}>
   <Main/>
</Grid>
<Grid item xs={12} sm={4} className={classes.desktop}  >
<Details title="Income"/>
</Grid>
<Grid item xs={12} sm={4} className={classes.last}  >
 <Details title="Expense"/>
</Grid>
     </Grid>
     <PushToTalkButtonContainer>
       <PushToTalkButton/>
       <ErrorPanel/>
     </PushToTalkButtonContainer>
    </div>
  )
}

export default App

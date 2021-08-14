import React from 'react'

const InfoCard = () => {
    const income=Math.round(Math.random());
    return (
        <div style={{textAlign:'center',padding:"0 10%"}} >
             Try to saying:<br/>
             Add {income?"Income ":"Expense "} 
             for {income?"₹80,000 ":"₹50,00 "}  
             in category {income?"Salary ":"pets "} 
             for {income?"Next Sunday ":"Sunday "} 
        </div>
    )
}

export default InfoCard

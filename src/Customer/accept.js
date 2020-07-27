import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function Accept(props){

    axios.post('http://localhost:5000/cus/jobs/accept',{job:{id:props.job._id}},{headers:{authorization:`Bearer ${localStorage.getItem('token-cus')}`}}).then(result=>{
        if(result.status===200){
           props.history.push('/cus/home')
        } else{
           props.history.push('/cus/home')

        }
    })
   
    

  
}

export default withRouter(Accept);
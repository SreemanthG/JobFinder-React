import React from 'react';
import axios from 'axios'
import Accept from './accept';
export default class Jobs extends React.Component{

    state= {jobs:undefined}
    componentDidMount(){
        console.log(`Bearer ${localStorage.getItem('token-cus')}`);
        axios.get("http://localhost:5000/cus/jobs", {headers:{authorization:`Bearer ${localStorage.getItem('token-cus')}`}}).then(result => {
            if (result.status === 200) {
                console.log(result.data.data);
                this.setState({jobs:result.data.data});
            } 
          }).catch(e => {
            console.log(e);
          });
    }
    onAccept(e){
       
        axios.post('http://localhost:5000/cus/jobs/accept',{job:{id:e.target.id}},{headers:{authorization:`Bearer ${localStorage.getItem('token-cus')}`}}).then(result=>{
            if(result.status===200){    
               console.log(result);  
            } else{
          return false;

            }
        })  
    }
    mapJobsandStateRender(){
        if(!(this.state.jobs===undefined)){
        return (this.state.jobs.map((job)=>(
            <div>
                <ul>
                    <li>   {job.jobtitle}</li>
                    <li>   {job.stipend}</li>
                    <li>   {job.location}</li>
                    <li>   {job.screen}</li>
                    <li>   {job.available}</li>
                    <li>   {job.startdate}</li>
                    <li >   <button onClick={this.onAccept} id={job._id}>Accept</button></li>
                    <li>   Deactive</li>

                </ul>
             
            </div>
        )))
        }
    }
    render(){
        return(
            <div>
                hello
               {this.mapJobsandStateRender()}
            </div>
        )
    }

  
}
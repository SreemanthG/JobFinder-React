import React from 'react';
import axios from 'axios'

export default class Accepted extends React.Component{

    state= {jobs:undefined}
    componentDidMount(){
        // http://localhost:5000/cus/showrejectedjobs
        console.log(`Bearer ${localStorage.getItem('token-cus')}`);
        axios.get("http://localhost:5000/cus/showapprovedjobs", {headers:{authorization:`Bearer ${localStorage.getItem('token-cus')}`}}).then(result => {
            if (result.status === 200) {
                this.setState({jobs:result.data.data});
                console.log(this.state.jobs);
            } 
          }).catch(e => {
            console.log("ERRROR");
            console.log(e);
          });
    }
    onAccept(e){
       
        axios.post('http://localhost:5000/cus/jobs/undoaccept',{job:{id:e.target.id}},{headers:{authorization:`Bearer ${localStorage.getItem('token-cus')}`}}).then(result=>{
            if(result.status===200){    
               console.log(result);  
            } else{
          return false;

            }
        })  
    }
    mapJobsandStateRender(){
        if(!(this.state.jobs===undefined)){
            // console.log(this.state.jobs.data);
            console.log(this);
        return (this.state.jobs.approvedJobs.map((job)=>(
            <div>
                <ul>
                    <li>   {job.jobtitle}</li>
                    <li>   {job.stipend}</li>
                    <li>   {job.location}</li>
                    <li>   {job.screen}</li>
                    <li>   {job.available}</li>
                    <li>   {job.startdate}</li>
                    <li >   <button onClick={this.onAccept} id={job._id}>Undo Acccept</button></li>

                   

                </ul>
             
            </div>
        )))
        }
    }
    render(){
        return(
            <div>
          
               {this.mapJobsandStateRender()}
            </div>
        )
    }

  
}
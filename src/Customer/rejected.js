import React from 'react';
import axios from 'axios'

export default class Rejected extends React.Component{

    state= {jobs:undefined}
    componentDidMount(){
        // http://localhost:5000/cus/showrejectedjobs
        console.log(`Bearer ${localStorage.getItem('token-cus')}`);
        axios.get("http://localhost:5000/cus/showrejectedjobs", {headers:{authorization:`Bearer ${localStorage.getItem('token-cus')}`}}).then(result => {
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
       
        axios.post('http://localhost:5000/cus/jobs/undoreject',{job:{id:e.target.id}},{headers:{authorization:`Bearer ${localStorage.getItem('token-cus')}`}}).then(result=>{
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
        return (this.state.jobs.rejectedJobs.map((job)=>(
            <div>
                 <div className="container">
                    <div className="card">
                        <div className="title">
                        {job.jobtitle}
                        </div>
                        <div className="jobrow">
                            <div className="item">
                                <h5>stipend</h5>
                                {job.stipend}
                            </div>
                            <div className="item">
                                <h5>Location</h5>
                                {job.location}
                            </div>
                            <div className="item">
                                <h5>Screen</h5>
                                {job.screen}
                            </div>
                            <div className="item">
                                <h5>Available</h5>
                                {job.available}
                            </div>
                            <div className="item">
                                <h5>Start Date</h5>
                                {job.startdate}
                            </div>
                        </div>
                        <div className="jobbuttons">
                            {/* <button onClick={this.onReject} className="cancelbutton" id={job._id}>Deactive</button>  */}
                            <button onClick={this.onAccept} className="acceptbutton" id={job._id}>Undo Reject</button>
                        </div>
                    </div>
                    </div>
                {/* <ul>
                    <li>   {job.jobtitle}</li>
                    <li>   {job.stipend}</li>
                    <li>   {job.location}</li>
                    <li>   {job.screen}</li>
                    <li>   {job.available}</li>
                    <li>   {job.startdate}</li>
                    <li >   <button onClick={this.onAccept} id={job._id}>Undo Reject</button></li>


                </ul> */}
             
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
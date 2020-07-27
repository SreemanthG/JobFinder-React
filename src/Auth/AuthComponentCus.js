import React from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom';
class AuthComponentCus extends React.Component{

     state = {
        user:undefined
    }

    componentDidMount(){
        const jwt = localStorage.getItem("token-cus");
        console.log(jwt);
        if(!jwt){
            this.props.history.push('/cus/login')
        }
        console.log("hello")
       axios.get("http://localhost:5000/cus",{headers:{Authorization: `Bearer ${jwt}`}}).then(res=>{this.setState({
           user:res.data
       })}).catch(err =>{
        localStorage.removeItem('token-cus')
            console.log(localStorage.getItem('token-cus'));
        this.props.history.push('/cus/login')
       })
    //    this.props.user = this.state.user;
    }

    render() {
        if(this.state.user === undefined){
            return(
                
                <div><h1>Loading...</h1></div>
            )
        }
        return(
            <div>

                {
               
                this.props.children}
            </div>
        )
    }
  
}

export default withRouter(AuthComponentCus);   
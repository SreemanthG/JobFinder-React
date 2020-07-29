import React from 'react';
import axios from 'axios';
import {withRouter,Redirect,Link} from 'react-router-dom';
import styled from 'styled-components'
import '../css/main.css'
class EmpLogin extends React.Component{
  constructor(props){
    super(props)
    this.isLoggedIn=false;

    this.state={
      email:"",
      password:"",
      username:""
  }
  }
    componentDidMount(){
      if(localStorage.getItem('token-emp')){
        this.props.history.push("/emp/home")
      }
    }

    updateEmail= (e)=>{
        this.state.email=e.target.value
        console.log(this.state);
    }
    updateUsername= (e)=>{
      this.state.username=e.target.value
      console.log(this.state);
  }
    updatePassword =(e)=>{
        this.state.password=e.target.value
        console.log(this.state);
    }
    postLogin=(e)=> {
        e.preventDefault();
        console.log((this.state));
        axios.post("http://localhost:5000/emp/signup", {
         user:this.state
        }).then(result => {
          if (result.status === 200) {
            this.props.history.push("/emp/login")
          } else {
            console.log("Not found");
            return false;
          }
        }).catch(e => {
          console.log(e);
        });
      }

render(){
  console.log(this.state);

 
    return(
        <div>
          <div className='formwrapper'> 
          <form >
          <div className="forminput" >
            <div className="formheading">Login for Employee</div>
          </div>
            <div className="forminput" >
            <div className="label"> <label for="">Email</label></div>
            <input type="email" placeholder="name" onChange={(e)=>{this.updateEmail(e)}}/>

            </div>
            <div className="forminput" >
            <div className="label"> <label for="">Username</label></div>
            <input type="text" placeholder="name" onChange={(e)=>{this.updateUsername(e)}}/>

            </div>
            <div className="forminput" >
            <div className="label"> <label for="">Password</label></div>
            <input type="password" placeholder="password"  onChange={this.updatePassword}/>

            </div>
            <div className="forminput" >

            <input type="button" className="submit" value="Register"  onClick={this.postLogin}/>

            </div>
           <div className='forminput'>
             Have an account already? <Link to='/emp/login'>Login here</Link>

           </div>
            </form>
          </div>
          
        </div>
    )
}

}

export default withRouter(EmpLogin);
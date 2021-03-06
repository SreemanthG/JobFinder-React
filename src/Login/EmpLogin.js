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
      isLoggedIn:this.isLoggedIn
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
    updatePassword =(e)=>{
        this.state.password=e.target.value
        console.log(this.state);
    }
    postLogin=(e)=> {
        e.preventDefault();
        console.log((this.state));
        axios.post("http://localhost:5000/emp/login", {
          email:this.state.email,   
          password:this.state.password
        }).then(result => {
          if (result.status === 200) {
            localStorage.setItem('token-emp', result.data.token);
            // console.log(localStorage.getItem('token-emp'));
            // this.setState({isLoggedIn:true})
            this.props.history.push("/emp/home")
            // browserHistory.push('/emp/home')
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
            <div className="label"> <label for="">Name</label></div>
            <input type="text" placeholder="name" onChange={(e)=>{this.updateEmail(e)}}/>

            </div>
            <div className="forminput" >
            <div className="label"> <label for="">Paaword</label></div>
            <input type="password" placeholder="password"  onChange={this.updatePassword}/>

            </div>
            <div className="forminput" >

            <input type="button" className="submit" value="Login"  onClick={this.postLogin}/>

            </div>
           <div className='forminput'>
           Dont you have an account yet? <Link to='/emp/signup'>Signup here</Link>

           </div>
            </form>
          </div>
          
        </div>
    )
}

}

export default withRouter(EmpLogin);
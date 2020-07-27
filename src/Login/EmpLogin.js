import React from 'react';
import axios from 'axios';
import {withRouter,Redirect} from 'react-router-dom';

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
          <form>
                <input type="text" placeholder="name" onChange={(e)=>{this.updateEmail(e)}}/>
                <br/>
                <input type="password" placeholder="password"  onChange={this.updatePassword}/>
                <br/>
                <input type="button" value="Login"  onClick={this.postLogin}/>
            </form>
        </div>
    )
}

}
export default withRouter(EmpLogin);
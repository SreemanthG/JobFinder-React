import React from 'react';
import axios from 'axios';
import {withRouter,Redirect,Route,Link} from 'react-router-dom';
import '../css/main.css'

class CusLogin extends React.Component{
    isLoggedIn= false;
    state={
        email:"",
        password:"",
        username:"",

    }
    componentDidMount(){
      if(localStorage.getItem('token-cus')){
        this.props.history.push("/cus/home")
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
        axios.post("http://localhost:5000/cus/signup", {
          user:this.state
        }).then(result => {
          if (result.status === 200) {
            this.props.history.push('/cus/login')
          } else {
            console.log("Not found");
            return false;
          }
        }).catch(e => {
          console.log(e);
          
        });
      }

     
render(){
    if(this.state.isLoggedIn===true){
        return( 
          <Redirect to="/cus/home"/>
        )
       } 
 
    return(
        // <div>
        //   <form onSubmit={this.postLogin}>
        //         <input type="text" placeholder="name" onChange={(e)=>{this.updateEmail(e)}}/>
        //         <br/>
        //         <input type="password" placeholder="password"  onChange={this.updatePassword}/>
        //         <br/>
        //         <input type="submit" value="Login" />
        //     </form>

        // </div>
        <div>
        <div className='formwrapper'> 
        <form >
        <div className="forminput" >
          <div className="formheading">SignUp for Customer</div>
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
           Have an account already? <Link to='/cus/login'>Login here</Link>

         </div>
          </form>
        </div>
        
      </div>
        
    )
}
}
export default withRouter(CusLogin);
import React from 'react';
import axios from 'axios';
import {withRouter,Redirect,Route,Link} from 'react-router-dom';
import '../css/main.css'

class CusLogin extends React.Component{
    isLoggedIn= false;
    state={
        email:"",
        password:"",
        isLoggedIn:this.isLoggedIn
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
    updatePassword =(e)=>{
        this.state.password=e.target.value
        console.log(this.state);
    }
    postLogin=(e)=> {
        e.preventDefault();
        console.log((this.state));
        axios.post("http://localhost:5000/cus/login", {
          email:this.state.email,   
          password:this.state.password
        }).then(result => {
          if (result.status === 200) {
            localStorage.setItem('token-cus', result.data.token);
            this.setState({isLoggedIn:true})
            console.log("cus");
            this.props.history.push('/cus/home')
          } else {
            console.log("Not found");
            return false;
          }
        }).catch(e => {
          console.log(e);
          
        });
      }

      renderPage(){
          if(this.state.isLoggedIn===true){    
            {this.props.history.push('/cus/home')}
          }else{
            return(
            <div>
                
            Login Page
            <form>
                <input type="text" placeholder="name" onChange={(e)=>{this.updateEmail(e)}}/>
                <br/>
                <input type="password" placeholder="password"  onChange={this.updatePassword}/>
                <br/>
                <input type="submit" value="submit" onSubmit={this.postLogin}/>
            </form>
            </div>
            )
          }
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
          <div className="formheading">Login for Customer</div>
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
           Dont you have an account yet? <Link to='/cus/signup'>Signup here</Link>

         </div>
          </form>
        </div>
        
      </div>
        
    )
}
}
export default withRouter(CusLogin);
import React,{ useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect,withRouter} from 'react-router-dom'
import decode from 'jwt-decode'
// import history from './history'
import EmpLogin from './Login/EmpLogin'
import CusLogin from './Login/CusLogin'
import Employee from './Employee/Employee'
import Customer from './Customer/Customer'
import AuthComponent from './Auth/AuthComponent'
import AuthComponentCus from './Auth/AuthComponentCus'
import axios from 'axios'

const checkAuth = () =>{
  const token = localStorage.getItem('token');
  try{
     const {exp} = decode(token);
     if(exp<new Date.getTime()/1000)
     {
       return false;
     }
  } catch(e){
    return false;
  }

  return true;
}



// const AuthRoute = ({component:Component,...rest})=>{
//   <Route {...rest}
//     render={props=>(
//       checkAuth() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to ={'/emp/login'} />
//       )
//     )}
//   />

// }

function App(props) {
  const [user, setUser] = useState(0);

  function verifyemploy(){
    const jwt = localStorage.getItem("token-emp");
    // console.log(jwt);
    if(!jwt){
        // this.props.history.push('/emp/login')
      return <Redirect to='/emp/login' />
    }
   axios.get("http://localhost:5000/emp",{headers:{Authorization: `Bearer ${jwt}`}}).then(res=>setUser(
      res.data
   )).catch(err =>{
       console.log(err);
       localStorage.removeItem('token-emp')
      // props.history.push('/emp/login')\
      return <Redirect to='/emp/login' />

   })
  
  }

  return (
    <Router>
    <div className="App">
     Hello
     <Switch>
     <Route exact path='/emp/login' component={EmpLogin} />
     <Route exact path='/cus/login' component={CusLogin} />
   
     {/* <AuthRoute exact path='/emp/login' component={Employee} /> */}

    <AuthComponent path='/emp/home'>
  <Route exact {...props} component={Employee}  />
    </AuthComponent>
    <AuthComponentCus path='/cus/home' >
     <Route exact {...props} component={Customer}  />
    </AuthComponentCus>
    </Switch>
    </div>
    </Router>
   
  );
}

export default App;

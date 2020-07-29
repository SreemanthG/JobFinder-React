import React,{ useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect,withRouter,Link} from 'react-router-dom'
import decode from 'jwt-decode'
// import history from './history'
import EmpLogin from './Login/EmpLogin'
import CusLogin from './Login/CusLogin'
import Employee from './Employee/Employee'
import Customer from './Customer/Customer'
import AuthComponent from './Auth/AuthComponent'
import AuthComponentCus from './Auth/AuthComponentCus'
import axios from 'axios'
import EmpSignup from './Signup/EmpSignup';
import CusSignup from './Signup/CusSignup';

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

  return (
    <Router>
    <div className="App">

     <Link to="/cus/home">Customer</Link>
     <Link to="/emp/home">Employee</Link>

     <Switch>
     <Route exact path='/emp/login' component={EmpLogin} />
     <Route exact path='/cus/login' component={CusLogin} />
     <Route exact path='/emp/signup' component={EmpSignup} />
     <Route exact path='/cus/signup' component={CusSignup} />
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

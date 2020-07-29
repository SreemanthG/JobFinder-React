import React from 'react';
import NavEmp from './nav'
import Jobs from './jobs'
import Rejected from './rejected'
import Accepted from './accepted'
import {BrowserRouter as Router,Switch,Route, Redirect,withRouter} from 'react-router-dom'

export default function Customer(props){
    console.log(props);
    return(
        <div>
       
            <Router>
            <NavEmp />
                <Switch>
                    <Route path="/cus/home/jobs" component={Jobs}/>
                    <Route path="/cus/home/accepted" component={Accepted}/>
                    <Route path="/cus/home/rejected" component={Rejected}/>

                </Switch>
            </Router>
        </div>
    )
}
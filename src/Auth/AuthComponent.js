import React from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom';
class AuthComponent extends React.Component{

     state = {
        user:undefined
    }

    componentDidMount(){
        const jwt = localStorage.getItem("token-emp");
        console.log(jwt);
        if(!jwt){
            this.props.history.push('/emp/login')
        }
       axios.get("http://localhost:5000/emp",{headers:{Authorization: `Bearer ${jwt}`}}).then(res=>this.setState({
           user:res.data
       })).catch(err =>{
           console.log(err);
           localStorage.removeItem('token-emp')
           this.props.history.push('/emp/login')
       })
    }

    render() {
        if(this.state.user === undefined){
            return(
                <div><h1>Loading...</h1></div>
            )
        }
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
  
}

export default withRouter(AuthComponent);   
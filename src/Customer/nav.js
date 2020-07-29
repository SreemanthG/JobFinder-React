import React from 'react';
import {Link} from 'react-router-dom'
export default function NavEmp(){
    return(
        <div>
            <div className="navflex">
                <div className="navitems">
                <Link className="navlink" to='/cus/home/jobs'>
                        Jobs
                </Link>
                </div>
                <div className="navitems">
                <Link className="navlink" to='/cus/home/accepted'>
                        Accepted  
                </Link>
                </div>
                <div className="navitems">
                <Link className="navlink" to='/cus/home/rejected'>
                        Rejected
                </Link>
                </div>
            </div>
        </div>
    )
}
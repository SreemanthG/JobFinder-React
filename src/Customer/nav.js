import React from 'react';
import {Link} from 'react-router-dom'
export default function NavEmp(){
    return(
        <div>
            <ul>
                <Link to='/cus/home/jobs'>
                    <li>
                        Jobs
                    </li>   
                </Link>

                <Link to='/cus/home/accepted'>
                    <li>
                        Accepted
                    </li>   
                </Link>

                <Link to='/cus/home/rejected'>
                    <li>
                        Rejected
                    </li>   
                </Link>

                
            
            </ul>
        </div>
    )
}
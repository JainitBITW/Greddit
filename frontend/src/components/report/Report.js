import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jwt-decode'
import { useNavigate ,Navigate,Link, useParams} from 'react-router-dom';




export default function Report() {
let params = useParams();
const navigate = useNavigate();
console.log(params)
const [report, setreport] = useState('')
const CreateReport = async (e) => {
    // e.preventDefault()
    var token = localStorage.getItem('token')
    var  reportedBy = jwt(token).username
    const res = await fetch('/api/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reportedBy: reportedBy,
            reportedPost: params.id,
            reportedConcern: report,
            reportedSubGreddit: params.subgreddit,
        })
    })
    const data = await res.json()
    console.log(data)
    if (data.success) {
        toast.success("Report Created Successfully")
        setreport('')
        navigate(`/subgreddit/${params.subgreddit}` );
    }
    else {
        console.log(data)
    }
}



  return  (
    <div className="input-group mb-3 container ">
        <ToastContainer />
      <input type="text" value={report} className="form-control my-5" onChange={(e)=>setreport(e.target.value)} placeholder="Concern" aria-label="Recipient's username" aria-describedby="button-addon2" />
      <button className="btn btn-outline-danger mx-5 my-5" type="button" id="button-addon2" data-mdb-ripple-color="dark" onClick={CreateReport}>
        Submit
      </button>
    </div>
  );
}

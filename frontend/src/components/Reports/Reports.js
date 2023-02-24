import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jwt-decode'
import { useParams, useNavigate ,Link} from 'react-router-dom';

export default function Reports() {
    const params = useParams();
    const [reports, setreports] = useState([])

    const GetReports = async () => {
        let res = await fetch('http://localhost:4001/api/getreports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subGredditName: params.subgreddit
            })
        })
        let data = await res.json()
        setreports(data.reports)
        console.log(reports)
    }
    useEffect(() => {
        GetReports()
    }
        , [])

const BlockUser = async(e) => {
    e.preventDefault();
    let res = await fetch('http://localhost:4001/api/blockuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reportId: e.target.id, 

        })
    })
    let data = await res.json()
    if (data.success) {
        toast.success("Report Removed Successfully")
        GetReports();
    }
    else {
        toast.error(data.error)
    }
}
const IgnoreReport = async(e) => {
    e.preventDefault();
    let res = await fetch('http://localhost:4001/api/ignorereport', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reportId: e.target.id
        })
    })
    let data = await res.json()
    if (data.success) {

        toast.success("Report Ignored Successfully")
        GetReports();
    }
    else {
        toast.error(data.error)
    }
}
const DeletePost = async(e) => {
    e.preventDefault();
    let res = await fetch('http://localhost:4001/api/deletepost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reportId: e.target.id
        })
    })
    let data = await res.json()
    if (data.success) {

        toast.success("Post Deleted Successfully")
        GetReports();
    }
    else {
        toast.error(data.error)
    }
}



    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Reports</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Reported By</th>
                                    <th scope="col">Reported Post</th>
                                    <th scope="col">Reported User</th>
                                    <th scope="col">Reported Reason</th>
                                    <th scope="col">Ignore</th>
                                    <th scope="col">Remove </th>
                                    <th scope="col">Delete Post</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => {
                                    return (
                                        <tr>
                                            <td>{report.reportedBy}</td>
                                            <td>{report.reportedText}</td>
                                            {/* <td>{report.reportedSubGreddit}</td> */}
                                            <td>{report.reportUser}</td>
                                            <td>{report.reportedConcern}</td>
                                            <td><button onClick={IgnoreReport}id ={report._id} className="btn btn-success" >Ignore</button></td>
                                           {(!report.reportIgnore) && <><td><button onClick={BlockUser} id ={report._id}className="btn btn-danger" >Remove Report</button></td>
                                            <td><button onClick={DeletePost}id ={report._id} className="btn btn-secondary" >Delete Post </button></td></>}
                                        </tr>
                                    )
                                }
                                
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

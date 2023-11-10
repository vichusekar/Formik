import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

function Dashboard() {

  let navigate = useNavigate()

  let [data, setData] = useState([])

  let getData = async (id) => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`)
      if(res.status === 200)
      {
        setData(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  let handlegetData = async () => {

    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/all`)
      if(res.status === 200)
      {
        setData(res.data.users)
      }
    } catch (error) {
      console.log(error)
    }
  }
console.log(handlegetData)

let handleDelete = async (id) => {
  try {
    let res = await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`)
    if(res.status === 200)
    {
      toast.error(res.data.message)
      handlegetData()
    }
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    handlegetData()
  }, [])

  return <>
  <div>
  <h2 className='table-header'>Users Details</h2>
  </div>

  <div className='table-wrapper'>
  <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e,i) => {
            return <tr key={i}>
              <td>{i + 1}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.mobile}</td>
              <td><i class="fa-solid fa-pen" onClick={()=>navigate('/edit/id')} ></i></td>
              <td><i class="fa-solid fa-trash" onClick={()=>handleDelete()} ></i></td>
            </tr>
          })
        }
        
      </tbody>
    </Table>
  </div>
</>
}

export default Dashboard

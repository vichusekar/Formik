import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { useFormik } from 'formik'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'


function EditUser() {

    let params = useParams()

    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [mobile, setMobile] = useState("")

    let navigate = useNavigate()

    let getData = async (id) => {

        try {
            let res = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`)
            if(res.status === 200)
            {
                setName(res.data.name)
                setEmail(res.data.email)
                setMobile(res.data.mobile)

            }
        } catch (error) {
            console.log(error)
        }
    }
useEffect(() => {
    if(params.id){
    getData(params.id)
    }
}, [])

    const formik = useFormik({
        initialValues: {
            email: "",
            age: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Required"),
            email: yup.string().matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Invalid email').required("Required"),
            mobile: yup.string().matches(/^\d{1,10}$/, 'Enter valid mobile').required("Required"),

        })
    })

  return <>
   < div className='edit-wrapper'>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        id='name'
                        name='name'
                        placeholder="Enter name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={(e)=>setName(e.target.name.value)}
                        // className={errors.name && touched.name ? "input-error" : ""}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className='error'>{formik.errors.name}</div>
                    ) : null}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name='email'
                        id='email'
                        placeholder="Enter email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={(e)=>setName(e.target.name.value)}
                        // className={errors.email && touched.email ? "input-error" : ""}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='error'>{formik.errors.email}</div>
                    ) : null}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                        name='mobile'
                        id='mobile'
                        placeholder="Enter mobile"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={(e)=>setName(e.target.name.value)}
                        // className={errors.mobile && touched.mobile ? "input-error" : ""}
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                        <div className='error'>{formik.errors.mobile}</div>
                    ) : null}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div >
  </>
}

export default EditUser

import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { useFormik } from 'formik'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

function CreateUser() {

    let navigate = useNavigate()

    let handleSubmit = async (e) => {
        e.preventDefault()

       let data = {
            name: e.target.name.value,
            email: e.target.email.value,
            mobile: e.target.mobile.value
        }

        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, data)
            if(res.status === 200)
            {
                toast.success(res.data.message)
                navigate('/dashboard')

            }
        } catch (error) {
            toast.error(error.response.data.error || error.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            mobile:"",
        },
        validationSchema: yup.object({
            name: yup.string().required("Required"),
            email: yup.string().matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Enter valid email').required("Required"),
            mobile: yup.string().matches(/^\d{1,10}$/, 'Enter valid mobile').required("Required"),

        })
    })

    return <>
    <div className='form-header'>
        <h2>Register</h2>
    </div>
        < div className='form-wrapper'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='name'
                        placeholder="Enter name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
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
                        placeholder="Enter email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='error'>{formik.errors.email}</div>
                    ) : null}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                        name='mobile'
                        placeholder="Enter mobile"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mobile}
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                        <div className='error'>{formik.errors.mobile}</div>
                    ) : null}
                </Form.Group>

                <Button variant="primary" type="submit" style={{marginLeft:'50px', width:'220px'}}>
                    Register
                </Button>
            </Form>

        </div >
    </>

}
export default CreateUser

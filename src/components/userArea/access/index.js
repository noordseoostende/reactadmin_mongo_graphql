import React,{ useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';

import axios from 'axios';
import ToastHandler from '../../utils/toasts';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { signupUser, loginUser } from '../../../store/actions';

const UserAccess = (props) => {
  const dispatch = useDispatch();

  const [type, setType] = useState(true);
  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Ongeldige email').required('Email is vereist'),
      password: Yup.string().min(3, 'Moet meer dan 5 tekens zijn').required('Wachtwoord is vereist')
      
    }),
    onSubmit: values => {
      onSubmitHandler(values);
    }

  })

  const switchTypeHandler = () => {
    setType(!type)
  }

  const onSubmitHandler = (values) => {
    if (type) {
      dispatch(loginUser(values)).then(({payload})=>{
        successHandler(payload);
      })
    } else {
      dispatch(signupUser(values)).then(({payload})=>{
        successHandler(payload);
      })
    }
  }

  const successHandler = (payload) =>{
    const errors = payload.errors;
    const auth = payload.auth;

    if(errors) { ToastHandler(errors, 'ERROR')}
    if(auth){
      localStorage.setItem('X-AUTH',auth.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token;
      ToastHandler('Welcome', 'SUCCESS')
      props.history.push('/user_area');
    }
  }

  useEffect(()=>{
    return function cleanup(){

    }
  },[])

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-4">
          <Col>
          <h1>Sign in / Register</h1>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Voer jouw email in"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.email}
          />
          { formik.touched.email && formik.errors.email ? (
            <Alert variant="danger">
              {formik.errors.email}
            </Alert>
          ) :null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Wachtwoord</Form.Label>
          <Form.Control
            type="password"
            placeholder="Voer jouw wachtwoord in"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.password}
          />
          { formik.touched.password && formik.errors.password ? (
            <Alert variant="danger">
              {formik.errors.password}
            </Alert>
          ) :null}
        </Form.Group>
        { type ? 

            <Button variant="primary" type="submit">Ingaan</Button>
          :
          
            <Button variant="primary" type="submit">Registreren</Button>
          }
          <Button
            variant="secondary"
            className="ml-2"
            onClick={switchTypeHandler}
          >
            Al { type ? 'Ingaan': 'Geregistreerd'} ? click hier
          </Button>

        
      </Form>
    </>
  )
}

export default UserAccess;

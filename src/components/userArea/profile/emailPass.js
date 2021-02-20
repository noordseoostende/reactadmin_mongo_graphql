import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Form, Button, Alert } from 'react-bootstrap';
import ToastHandler from '../../utils/toasts';

import { useDispatch, useSelector } from 'react-redux';
import { updateUserEmailPass } from '../../../store/actions';

const EmailPass = (props) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
      email:'',
      password:''
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .email('Ongeldige email'),
      password: Yup.string()
      .min(3, 'Moet meer dan 5 tekens zijn')
      
      
    }),
    onSubmit: values => {
      onSubmitHandler(values);
    }

  })

  const onSubmitHandler = ({email, password}) => {
    dispatch(updateUserEmailPass(email,password,user.auth._id)).then(({payload})=>{
      if(payload.errors) { ToastHandler(payload.errors, 'ERROR');}
      else { ToastHandler('Gedaan!','SUCCESS') }
    })
  }

  return (
    <div className="mt-3">
      <Form onSubmit={formik.handleSubmit}>
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
        <Button variant="primary" type="submit">Vernieuwen email of wachtwoord</Button>


      </Form>
    </div>
  )
}

export default EmailPass;

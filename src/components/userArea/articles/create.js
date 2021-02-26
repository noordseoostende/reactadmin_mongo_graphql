import React, {useState, useEffect} from 'react';
import UserAreaHOC from '../../hoc/userAreaHoc';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Form, Button, Alert } from 'react-bootstrap';
import ToastHandler from '../../utils/toasts';

import { getCategories } from '../../../api';
import { useDispatch } from 'react-redux';
import { createPost, clearCreatedPost } from '../../../store/actions';

const Create = () => {
  const [categories, setCategories] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      excerpt: '',
      content: '',
      status: '',
      category: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Deze veld is verplicht'),
      excerpt: Yup.string().required('Deze veld is verplicht'),
      content: Yup.string().required('Deze veld is verplicht'),
      status: Yup.string()
        .required('Deze veld is verplicht')
        .matches(/(DRAFT|PUBLIC)/, {
          message: 'Het moest DRAFT of PUBLIC zijn',
          excludeEmptyString: true
        }),
      category: Yup.string().required('Deze veld is verplicht')
    }),
    onSubmit: (values,{ resetForm }) => {
      dispatch(createPost(values)).then(({payload})=>{
        if(payload.createdPost.post){
          ToastHandler('Gedaan!!','SUCCESS');
          resetForm();
        }
        if(payload.createdPost.error){
          ToastHandler(payload.createdPost.error,'ERROR');
        }

      });
    }
  })

  useEffect(()=>{
    const func = async()=>{
      const response = await getCategories();
      setCategories(response.data.categories);

    }
    func();
  },[setCategories])

  useEffect(()=> () => dispatch(clearCreatedPost()), [dispatch]);

  return (
    <UserAreaHOC>
      <Form onSubmit={formik.handleSubmit}
        className="mt-3"
      >
        <Form.Group>
          <Form.Label>Titel</Form.Label>
          <Form.Control
            type='text'
            placeholder='Schrijf een titel'
            id='title'
            name='title'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <Alert variant='danger'>{formik.errors.title}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Uittreksel</Form.Label>
          <Form.Control
            as='textarea'
            rows='3'
            placeholder='Schrijf een uittreksel'
            id='excerpt'
            name='excerpt'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.excerpt}
          />
          {formik.touched.excerpt && formik.errors.excerpt ? (
            <Alert variant='danger'>{formik.errors.excerpt}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Inhoud</Form.Label>
          <Form.Control
            as='textarea'
            rows='3'
            placeholder='Schrijf het inhoud'
            id='content'
            name='content'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.content}
          />
          {formik.touched.content && formik.errors.content ? (
            <Alert variant='danger'>{formik.errors.content}</Alert>
          ) : null}
        </Form.Group>
        <hr />

        <Form.Group>
          <Form.Label>Categorie</Form.Label>
          <Form.Control
            as='select'
            id='category'
            name='category'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option></option>
            
            { categories ? 
              categories.map((item,i)=>(
                <option key={i} value={item._id}>{item.name}</option>
              ))
            :null}
          </Form.Control>
          {formik.touched.category && formik.errors.category}
          {/* {formik.touched.category && formik.errors.category ? (
            <Alert variant="danger">
              {formik.errors.category}
              </Alert>
          ) : null} */}
        </Form.Group>

        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as='select'
            id='status'
            name='status'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.status}
          >
            <option></option>
            <option values='DRAFT'>DRAFT</option>
            <option values='PUBLIC'>PUBLIC</option>
          </Form.Control>
          {formik.touched.status && formik.errors.status ? (
            <Alert variant='danger'>{formik.errors.status}</Alert>
          ) : null}
        </Form.Group>

        <Button variant='primary' type='submit'>
          Verzenden
        </Button>
      </Form>
    </UserAreaHOC>
  );
};

export default Create;

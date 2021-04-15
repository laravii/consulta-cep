import { Form as FormikForm, Field, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Button, Card, Form } from 'react-bootstrap'
import './styles/global.css'
import { api } from './services/api'
import { api_keys } from './services/api_keys'

interface Inputs {
  cep: string
  adress: string
  city: string
  locale: string
  burgh: string
}
const initialValues: Inputs = {
  cep: '',
  adress: '',
  city: '',
  locale: '',
  burgh: '',
}

const validationSchema = yup.object().shape({
  cep: yup
    .string()
    .test('len', 'Por favor, digite o CEP completo', (val) => val?.length === 8)
    .required(),
  adress: yup.string().required(),
  city: yup.string().required(),
  locale: yup.string().required(),
})
function App() {
  const [getError, setGetError] = useState('')
  const handleSubmit = (values: Inputs) => {
    console.log(values)
  }
  const onBlur = async (ev: any, setFieldValue: any) => {
    const target = ev.target
    await api
      .get(`${target.value}${api_keys}`)
      .then((res) => {
        const data = res.data
        if (!data.error) {
          setFieldValue('adress', data.endereco)
          setFieldValue('burgh', data.bairro)
          setFieldValue('city', data.cidade)
          setFieldValue('locale', data.uf)
          setGetError('')
        } else {
          setGetError(`${data.error}, por favor digite o CEP correto`)
        }
      })
      .catch((err) => err)
  }
  return (
    <Card className="container">
      <Card.Header className="header">
        <h4>Encontre o endereço</h4>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <FormikForm>
              <Form.Group controlId="cep">
                <p>{getError}</p>
                <Form.Label>CEP</Form.Label>
                <Field
                  id="cep"
                  className="form-control"
                  name="cep"
                  type="text"
                  maxLength="8"
                  placeholder="01010100"
                  onBlur={(ev: any) => {
                    onBlur(ev, props.setFieldValue)
                  }}
                  value={props.values.cep}
                />
                <h6>somente números</h6>
              </Form.Group>
              <p>{props.errors.cep}</p>
              <Form.Group controlId="adress">
                <Form.Label>Logradouro</Form.Label>
                <Field
                  className="form-control"
                  id="adress"
                  name="adress"
                  type="text"
                />
                <p>{props.errors.adress}</p>
              </Form.Group>
              <Form.Group controlId="burgh">
                <Form.Label>Logradouro</Form.Label>
                <Field
                  className="form-control"
                  id="burgh"
                  name="burgh"
                  type="text"
                />
                <p>{props.errors.burgh}</p>
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>Estado</Form.Label>
                <Field
                  className="form-control"
                  name="city"
                  id="city"
                  type="text"
                />
                <p>{props.errors.city}</p>
              </Form.Group>
              <Form.Group controlId="locale">
                <Form.Label>UF</Form.Label>
                <Field
                  className="form-control"
                  id="locale"
                  name="locale"
                  type="text"
                />
                <p>{props.errors.locale}</p>
              </Form.Group>
              <Button variant="info" type="submit">
                Enviar
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )
}

export default App

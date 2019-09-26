import * as yup from 'yup'

import { Button, Checkbox, Form, Header, Input, Message } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import { getAsymmetricArr, getSymmetricArr } from '../../line/utils'

const schema = yup.array()
  .of(yup.number().min(-100).max(100).integer())

const ControlPanel = ({
  state: {
    delay,
    inRow,
    loops,
    iteration,
    printToConsole,
    disabled,
    initialArgs
  },
  onValidArgs,
  onArgsChange,
  onChange
}) => {
  const handleChangeInput = ({ target: { name, value } }) => {
    onChange(name, Number(value))
  }

  const handleChangeCheckbox = (name, value) => {
    onChange(name, value)
  }

  const [symetricLength, setSymetricLength] = useState(10)
  const [asymetricLength, setASymetricLength] = useState(10)
  const [argsArray, setArgsArra] = useState(initialArgs)
  const [arrayError, setArrayError] = useState('')

  const handleSymetricLength = ({ target: { value } }) => {
    setSymetricLength(state => Number(value))
  }

  const handleASymetricLength = ({ target: { value } }) => {
    setASymetricLength(state => Number(value))
  }

  const validate = (schema, value) => {
    try {
      schema.validateSync(value)
      return {
        valid: true,
        error: ''
      }
    } catch (e) {
      return {
        valid: false,
        error: e.message
      }
    }
  }

  const handleArgsChange = ({ target: { value: rawValue } }) => {
    const res = rawValue
      .split(',')
      .map(v => v.trim())
      .map(v => v ? !isNaN(v) ? Number(v.trim()) : v : v)

    const {error, valid} = validate(schema, res)

    setArrayError(error)
    onValidArgs(valid)

    setArgsArra(res)
    onArgsChange(res)
  }

  const handleSymetricArrChange = length => {
    const args = getSymmetricArr(length).result
    setArgsArra(args)
    onArgsChange(args)
  }

  const handleASymetricArrChange = length => {
    const args = getAsymmetricArr(length)
    setArgsArra(args)
    onArgsChange(args)
  }
  useEffect(() => {
    const {error, valid} = validate(schema, argsArray)
    onArgsChange(argsArray)
    onValidArgs(valid)
    setArrayError(error)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Header as='h3'>Settings</Header>
      <Form>
        <Form.Group widths='equal'>

          <Form.Field >
            <label>Delay</label>
            <Input
              disabled={disabled}
              onChange={handleChangeInput}
              value={delay}
              name="delay"
              type="number"
            />
          </Form.Field>

          <Form.Field>
            <label>In row</label>
            <Input
              disabled={disabled}
              onChange={handleChangeInput}
              value={inRow}
              name="inRow"
              type="number"
            />
          </Form.Field>

          <Form.Field>
            <label>Loops</label>
            <Input
              disabled={disabled}
              onChange={handleChangeInput}
              value={loops}
              name="loops"
              type="number"
            />
          </Form.Field>

          <Form.Field>
            <label>Iterations</label>
            <Input
              disabled={disabled}
              onChange={handleChangeInput}
              value={iteration}
              name="iteration"
              type="number"
            />
          </Form.Field>

        </Form.Group>

        <Form.Field>
          <Checkbox
            disabled={disabled}
            onChange={handleChangeCheckbox.bind(null, 'printToConsole', !printToConsole)}
            label='print to console'
            checked={printToConsole}
          />
        </Form.Field>
      </Form>

      <div>
        <br />
        <Header as='h3'>Arguments</Header>
        <Input
          error={!!arrayError}
          fluid
          disabled={disabled}
          onChange={handleArgsChange}
          value={argsArray.join(',')}
          name="args"
          type="text"
        />
        {!!arrayError && <Message negative>
          <p>{arrayError}</p>
        </Message>}
        <br />
        <br />
        <Input
          min="0"
          disabled={disabled}
          onChange={handleSymetricLength}
          value={symetricLength}
          name="symetricLength"
          type="number"
        /> {' '} {' '}
        <Button
          disabled={disabled}
          onClick={handleSymetricArrChange.bind(null, symetricLength)}
        >Gen symetric array</Button>
        <br />
        <br />
        <Input
          min="0"
          disabled={disabled}
          onChange={handleASymetricLength}
          value={asymetricLength}
          name="asymetricLength"
          type="number"
        /> {' '}{' '}
        <Button
          disabled={disabled}
          onClick={handleASymetricArrChange.bind(null, asymetricLength)}
        >Gen asymetric array</Button>
      </div>
    </div>
  )
}

export default ControlPanel
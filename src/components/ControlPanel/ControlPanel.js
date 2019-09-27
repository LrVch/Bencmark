import { Button, Checkbox, Dropdown, Form, Header, Input, Message } from 'semantic-ui-react'
import React, {memo, useEffect, useState} from 'react'
import { getAsymmetricArr, getSymmetricArr } from '../../line/utils'

const createFunOptions = funs =>
  funs.map(fn => ({
    key: fn.id, text: fn.name, value: `${fn.id}:${fn.type}`
  }))

const ControlPanel = memo(({
  state: {
    delay,
    inRow,
    loops,
    iteration,
    printToConsole,
    disabled,
    initialArgs,
    functions,
    schemaValidator: schema
  },
  onChangeFunctions,
  onValidArgs,
  onArgsChange,
  onChange
}) => {
  const fnOptions = createFunOptions(functions)
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
  const [funsIds, setFunsIds] = useState([])

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

    const { error, valid } = validate(schema, res)

    setArrayError(error)
    onValidArgs(valid)

    setArgsArra(res)
    onArgsChange(res)
  }

  const handleGenArrChange = (length, type) => {
    const args = type === 'symetric' ? getSymmetricArr(length).result : getAsymmetricArr(length)
    const { error, valid } = validate(schema, args)
    setArgsArra(args)
    onValidArgs(valid)
    onArgsChange(args)
    setArrayError(error)
  }

  const handleChangeFunctions = ids => {
    onChangeFunctions(ids)
    setFunsIds(_ => ids)
  }

  useEffect(() => {
    const { error, valid } = validate(schema, argsArray)
    onArgsChange(argsArray)
    onValidArgs(valid)
    setArrayError(error)
    // eslint-disable-next-line
  }, [])

  console.log('ControlPanel rendered');
  

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

      <br />
      <div>
        <Header as='h3'>Functions</Header>
        <Dropdown
          onChange={(e, d) => handleChangeFunctions(d.value)}
          placeholder='Functions'
          fluid multiple selection options={fnOptions}
        />
        <br/>
        {!funsIds.length && <div className="branchmark__message warning">
          There is not functions yet
        </div>}
      </div>
      <br />
      <div>
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
          onClick={handleGenArrChange.bind(null, symetricLength, 'symetric')}
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
          onClick={handleGenArrChange.bind(null, asymetricLength, 'asymetric')}
        >Gen asymetric array</Button>
      </div>
    </div>
  )
})

export default ControlPanel

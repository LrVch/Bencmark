import { Checkbox, Form, Input } from 'semantic-ui-react'

import React from 'react'

const ControlPanel = ({
  state: {
    delay,
    inRow,
    loops,
    iteration,
    printToConsole,
    disabled
  },
  onChange
}) => {
  const handleChangeInput = ({ target: { name, value } }) => {
    onChange(name, Number(value))
  }

  const handleChangeCheckbox = (name, value) => {
    onChange(name, value)
  }

  return (
    <div>
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
    </div>
  )
}

export default ControlPanel

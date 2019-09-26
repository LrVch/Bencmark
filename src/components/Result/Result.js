import { Accordion, Icon } from 'semantic-ui-react'
import React, { useState } from 'react'
import { getAverage, getMax, getMin, getPersent } from '../Benchmark/utils'

const Result = ({ item }) => {
  const [open, setOpen] = useState(false)
  const max = getMax(item.count)
  const min = getMin(item.count)
  const persent = getPersent(item.count)
  const average = getAverage(item.count)
  return (
    <div>
      <Accordion>
        <Accordion.Title
          active={open}
          index={0}
          onClick={() => setOpen(open => !open)}
        >
          <Icon name='dropdown' />
          Show details
        </Accordion.Title>
        <Accordion.Content active={open}>
          <p>
            Max time: {max} <br />
            Min time: {min} <br />
            Average time: {average} <br />
            Persent: {persent}
          </p>
        </Accordion.Content>
      </Accordion>
    </div>
  )
}

export default Result

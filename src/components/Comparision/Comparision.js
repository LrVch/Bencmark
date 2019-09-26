import { Message, Segment } from 'semantic-ui-react'
import { getAverage, getMin, getPersent } from '../Benchmark/utils'

import React from 'react'

const setLevelMark = (items, best, {
  normal,
  warn,
} = {
    normal: 3,
    warn: 10,
  }) => {
  console.log('best', best)
  return items.map(item => {
    const { average } = item
    const percent = getPersent([average, best])
    console.log('percent', percent)
    const mark = average === best ? 'green' :
      (average > best && percent <= normal) ? 'olive' :
        (percent > normal && percent <= warn) ? 'yellow' : 'red'
    return {
      ...item,
      mark,
      percent
    }
  })
}

const Comparision = ({ result }) => {
  result = result.map(res => ({
    ...res,
    average: getAverage(res.item.count)
  }))

  const averages = result.map(res => res.average)
  const bestTime = getMin(averages)
  const marked = setLevelMark(result, bestTime)

  return (
    <Segment>
      {marked.slice().sort((a, b) => a.average - b.average).map((res, i) =>
        <Message color={res.mark} key={i}>
          {res.item.name} <b>{res.average} ms</b>
          {' '}
          {!!res.percent && <b>(+{res.percent}%)</b>}
        </Message>
      )}
    </Segment>
  )
}

export default Comparision

import './Benchmark.css'

import { Button, Message } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import { createDataSet, createItems, printDone, printStart } from './utils'

import { Bar } from 'react-chartjs-2'

const Benchmark = ({
  args,
  delay = 500,
  functions,
  inRow = 1000,
  iteration = 1,
  loops = 100,
  printToConsole = false,
  disable,
  onStart = () => { },
  onEnd = () => { }
} = {}) => {

  const [state, setState] = useState({
    inProgress: false,
    result: null
  })

  const { inProgress, result } = state

  useEffect(() => {
    result && console.log('result', result)
  }, [result])

  const items = createItems(
    functions,
    inRow,
    loops,
    args,
    printToConsole
  )

  const handleOnStart = () => {
    onStart()
    setResult(null)
    printToConsole && printStart(inRow, loops, iteration)
    setState(prevState => {
      return {
        ...prevState,
        inProgress: true,
      };
    });
  }

  const handleOnEnd = () => {
    onEnd({
      items: items.map(item => ({
        ...item,
        settings: {
          args,
          delay,
          inRow,
          iteration,
          loops,
          printToConsole
        }
      }))
    })
    printToConsole && printDone(items)
    setState(prevState => {
      return {
        ...prevState,
        inProgress: false,
        result: createDataSet(items)
      };
    });
  }

  const setResult = result => {
    setState(prevState => ({
      ...prevState,
      result
    }))
  }

  const start = () => {
    for (let i = 0; i < items.length; i++) {
      items[i].run();
    }
  }

  const startBench = () => {
    handleOnStart()

    setTimeout(start, 0);

    setTimeout(() => {
      if (iteration > 1) {
        iteration--;
        setTimeout(function time() {
          start();
          iteration--;
          if (iteration > 0) {
            setTimeout(time, delay)
          } else {
            handleOnEnd()
          }
        }, delay);
      } else {
        handleOnEnd()
      }
    }, 100)
  }

  return (
    <div>
      <div>
        {(functions === undefined || functions.length === 0) && <div className="branchmark__message warning">
          there is not functions yet
        </div>}

        <Button
          loading={inProgress}
          disabled={inProgress || disable}
          onClick={startBench}
        >Start</Button>

        {result &&
          result.map((data, i) =>
            <Bar
              key={i}
              data={data}
              width={100}
              height={50}
            />
          )}

        {!result && !inProgress &&
          <Message>
            <p>
              No result yet.
            </p>
          </Message>}
      </div>
    </div>
  )
}

export default Benchmark

import './Benchmark.css'

import { Button, Message, Progress } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import { createDataSet, createItems, printDone, printStart } from './utils'

import { Bar } from 'react-chartjs-2'
import Comparision from '../Comparision/Comparision'
import Result from '../Result/Result'

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

  const [currentProgress, setCurrentProgress] = useState({
    count: 0,
    percent: 0
  })

  const handleProgress = () => {
    setTimeout(() => {
      setCurrentProgress(prev => ({
        count: prev.count + 1,
        percent: ((prev.count + 1) / amount) * 100
      }))
    })
  }

  const items = createItems(
    functions,
    inRow,
    loops,
    args,
    printToConsole,
    handleProgress
  )

  const [state, setState] = useState({
    inProgress: false,
    result: null
  })

  const [currentIterations, setCurrentIterations] = useState(iteration)
  const [amount, setAmount] = useState((loops * inRow * currentIterations * items.length))

  const { inProgress, result } = state

  useEffect(() => {
    result && console.log('result', result)
  }, [result])

  useEffect(() => {
    setCurrentIterations(iteration)
  }, [iteration])

  useEffect(() => {
    setAmount(loops * inRow * currentIterations * items.length)
  }, [loops, inRow, currentIterations, items.length])

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
    setCurrentProgress({
      percent: 0,
      count: 0
    })

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
        <Button
          loading={inProgress}
          disabled={inProgress || disable}
          onClick={startBench}
        >Start</Button>
        <br/>
        <Progress percent={Number((currentProgress.percent).toFixed(0))} progress />

        {result &&
          result.map((data, i) =>
            <div key={i}>
              <Bar
                data={data}
                width={100}
                height={50}
              />
              <Message>
                <Result item={data.item} />
              </Message>
            </div>
          )}

        {result && result.length > 1 && <Comparision result={result} />}

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

import './Benchmark.css'

import { Button, Message, Progress } from 'semantic-ui-react'
import React, { useCallback, useEffect, useState } from 'react'
import { createDataSet, printDone, printStart } from './utils'

import { Bar } from 'react-chartjs-2'
import Comparision from '../Comparision/Comparision'
import Result from '../Result/Result'
import WebWorker from './workerSetup'
import worker from './worker'

const benchmarkWorker = new WebWorker(worker);

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
  onEnd = () => { },
  onProgress = () => {}
} = {}) => {

  // const [currentProgress, setCurrentProgress] = useState({
  //   count: 0,
  //   persent: 0
  // })

  // const handleProgress = ({ amount, count, persent } = {}) => {
  //   setCurrentProgress(_ => ({
  //     count: count + 1,
  //     persent: persent
  //   }))
  // }

  const [state, setState] = useState({
    inProgress: false,
    result: null
  })

  const { inProgress, result } = state

  const handleOnEnd = useCallback((items) => {
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
  }, [args,
    delay,
    inRow,
    iteration,
    loops,
    printToConsole,
    onEnd]
  )

  const handleIterationEnd = useCallback(({ name, results, time }) => {
    if (!printToConsole) {
      return
    }
    console.log(`Function "${name}" - time: ${time} ms`);
    console.log('Results: ', results)
    console.log('- - '.repeat(15))
  }, [printToConsole])

  const hanleWorkerMessage = useCallback(({ data: { type, data } }) => {
    // console.log('type', type);
    // console.log('data', data);
    // console.log('============================');

    switch (type) {
      case 'end': {
        return handleOnEnd(data.items)
      }
      case 'iterationEnd': {
        return handleIterationEnd(data)
      }
      case 'progress': {
        // console.log('type', type)
        // console.log('data', data)
        // console.log('============================')
        return onProgress(data)
      }
      default:
        return null
    }
  }, [handleIterationEnd, handleOnEnd, onProgress])

  useEffect(() => {
    benchmarkWorker.addEventListener('message', hanleWorkerMessage)
    return () => {
      benchmarkWorker.removeEventListener('message', hanleWorkerMessage)
    }
  }, [hanleWorkerMessage])

  useEffect(() => {
    result && console.log('result', result)
  }, [result])

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

  const setResult = result => {
    setState(prevState => ({
      ...prevState,
      result
    }))
  }

  const startBench = () => {
    handleOnStart()
    // setCurrentProgress({
    //   persent: 0,
    //   count: 0
    // })

    benchmarkWorker.postMessage({
      type: 'start',
      iteration,
      delay,
      functions: functions.map(f => ({
        name: f.sourceName,
        fn: f.toString()
      })),
      inRow,
      loops,
      args,
      printToConsole
    })
  }

  console.log('Benchmark rendered')

  return (
    <div>
      <div>
        <Button
          loading={inProgress}
          disabled={inProgress || disable}
          onClick={startBench}
        >Start</Button>
        <br />
        <br/>

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

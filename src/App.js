import './line/line'

import * as yup from 'yup'

import { Container, Progress } from 'semantic-ui-react';
import React, { useCallback, useMemo, useState } from 'react';
import { findLine, findLine2 } from './line/line'

import Benchmark from './components/Benchmark/Benchmark'
import ControlPanel from './components/ControlPanel/ControlPanel'
import { parseParams } from './components/Benchmark/utils'

const initialArguments = {
  'findLine': [-33, -9, 9, 10, 20, 24, 34, 35, 53, 77]
}

const schemaValidators = {
  'findLine': yup.array().of(yup.number().min(-100).max(100).integer())
}

const functionsOptions = {
  'uniqe-id-1': {
    fn: findLine,
    name: findLine.sourceName,
    id: 'uniqe-id-1',
    type: 'findLine',
  },
  'uniqe-id-2': {
    fn: findLine2,
    name: findLine2.sourceName,
    id: 'uniqe-id-2',
    type: 'findLine',
  }
}

function App() {
  const [panelState, setPanelState] = useState({
    delay: 500,
    inRow: 1000,
    loops: 100,
    iteration: 10,
    printToConsole: true,
    disabled: false,
    initialArgs: initialArguments['findLine'],
    functions:  useMemo(() => Object.keys(functionsOptions).map(id => functionsOptions[id]), []),
    // functions: Object.keys(functionsOptions).map(id => functionsOptions[id]),
    schemaValidator: schemaValidators['findLine']
  })

  const [appState, setAppState] = useState({
    args: null,
    validArgs: false,
    functions: []
  })

  const { args, validArgs, functions } = appState

  const { delay, inRow, loops, iteration, printToConsole } = panelState

  const handleChangePanelState = useCallback((name, value) => {
    setPanelState(state => {
      return {
        ...state,
        [name]: value
      }
    })
  }, [])

  const handleOnStart = useCallback(() => {
    setPanelState(state => ({
      ...state,
      // disabled: true
    }))
  }, [])

  const handleOnEnd = useCallback((data) => {
    setPanelState(state => ({
      ...state,
      disabled: false
    }))
  }, [])

  const handleArgsChange = useCallback((args) => {
    setAppState(state => ({
      ...state,
      args
    }))
  }, [])

  const handleValidArgs = useCallback((value) => {
    setAppState(state => ({
      ...state,
      validArgs: value
    }))
  }, [])

  const handleChangeFunctions = useCallback((ids) => {
    ids = ids.map(parseParams)
    const functions = ids.map(({ id }) => functionsOptions[id].fn)

    setAppState(prevState => ({
      ...prevState,
      functions
    }))
  }, [])

  console.log('App rendered')

  return (
    <div>
      <br />
      <Container>
        <ControlPanel
          onArgsChange={handleArgsChange}
          onChange={handleChangePanelState}
          state={panelState}
          onValidArgs={handleValidArgs}
          onChangeFunctions={handleChangeFunctions}
        />

        <br />
        <br />
        <br />

        <Benchmark
          disable={!validArgs || !functions.length}
          onStart={handleOnStart}
          onEnd={handleOnEnd}
          functions={functions}
          args={args}

          printToConsole={printToConsole}
          loops={loops}
          inRow={inRow}
          iteration={iteration}
          delay={delay}
        />

        <br />
      </Container>
    </div>
  );
}

export default App;

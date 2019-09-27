import './line/line'

import * as yup from 'yup'

import React, { useState } from 'react';
import { findLine, findLine2 } from './line/line'

import Benchmark from './components/Benchmark/Benchmark'
import { Container } from 'semantic-ui-react';
import ControlPanel from './components/ControlPanel/ControlPanel'
import { parseParams } from './components/Benchmark/utils';

const initialArguments = {
  'findLine': [-33,-9,9,10,20,24,34,35,53,77]
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

/*
  optimize function
  - history and filter(with comparision result)
  - add more functions and abillity to change 
  - able to chose optional actions(get array etc. by type of function)
  - 5% difference is OK
*/

function App() {
  const [panelState, setPanelState] = useState({
    delay: 500,
    inRow: 1000,
    loops: 100,
    iteration: 10,
    printToConsole: true,
    disabled: false,
    initialArgs: initialArguments['findLine'],
    functions: Object.keys(functionsOptions).map(id => functionsOptions[id]),
    schemaValidator: schemaValidators['findLine']
  })

  const [appState, setAppState] = useState({
    // history: [],
    args: null,
    validArgs: false,
    functions: []
  })

  const { args, validArgs, functions } = appState

  const { delay, inRow, loops, iteration, printToConsole } = panelState

  const handleChangePanelState = (name, value) => {
    setPanelState(state => {
      return {
        ...state,
        [name]: value
      }
    })
  }

  const handleOnStart = () => {
    setPanelState(state => ({
      ...state,
      disabled: true
    }))
  }

  const handleOnEnd = (data) => {
    setPanelState(state => ({
      ...state,
      disabled: false
    }))

    // setAppState(state => ({
    //   ...state,
    //   history: [...state.history, ...data.items]
    // }))
  }

  const handleArgsChange = (args) => {
    setAppState(state => ({
      ...state,
      args
    }))
  }

  const handleValidArgs = value => {
    setAppState(state => ({
      ...state,
      validArgs: value
    }))
  }

  const handleChangeFunctions = ids => {
    ids = ids.map(parseParams)
    const functions = ids.map(({ id }) => functionsOptions[id].fn)

    setAppState(prevState => ({
      ...prevState,
      functions
    }))
  }

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
          args={[args]}

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

import './line/line'

import React, { useState } from 'react';
import { getAsymmetricArr, getSymmetricArr } from './line/utils'

import Benchmark from './components/Benchmark/Benchmark'
import { Container } from 'semantic-ui-react';
import ControlPanel from './components/ControlPanel/ControlPanel'
import { findLine } from './line/line'

const functionsOptions = [
  {
    fn: findLine,
    id: 'someUniqId-11',
    type: 'findLine',
    // initArgs: 'some initial args',
    // accept: [[0]],
    // acceptTemplate: 'number[]'
  }
]

/*
  -history and filtr
  Switch between functions and pass options
  Should be able to change arguments
    - cheker of types
*/

function App() {
  const [panelState, setPanelState] = useState({
    delay: 500,
    inRow: 1000,
    loops: 100,
    iteration: 1,
    printToConsole: true,
    disabled: false,
    initialArgs: [1, 2, 3]
  })

  const [appState, setAppState] = useState({
    history: [],
    args: null,
    validArgs: false
  })

  const { args, validArgs } = appState

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

  return (
    <div>
      <br />
      <Container>
        <ControlPanel
          onArgsChange={handleArgsChange}
          onChange={handleChangePanelState}
          state={panelState}
          onValidArgs={handleValidArgs}
        />

        <br />
        <br />
        <br />

        <Benchmark
          disable={!validArgs}
          onStart={handleOnStart}
          onEnd={handleOnEnd}
          functions={[findLine, findLine]}
          args={[args]}

          printToConsole={printToConsole}
          loops={loops}
          inRow={inRow}
          iteration={iteration}
          delay={delay}
        />
      </Container>
    </div>
  );
}

export default App;

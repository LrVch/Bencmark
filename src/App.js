import './App.css';
import './line/line'

import { Button, Container } from 'semantic-ui-react';
import React, { useCallback, useState } from 'react';
import { getAsymmetricArr, getSymmetricArr } from './line/utils'

import Benchmark from './components/Benchmark/Benchmark';
import ControlPanel from './components/ControlPanel/ControlPanel';
import { findLine } from './line/line'

/* 
  Switch between functions and pass options
  Save resutl globally
*/

function App() {
  const [panelState, setPanelState] = useState({
    delay: 500,
    inRow: 1000,
    loops: 100,
    iteration: 1,
    printToConsole: true,
    disabled: false
  })

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

  const handleOnEnd = () => {
    setPanelState(state => ({
      ...state,
      disabled: false
    }))
  }

  return (
    <div>
      <Container>
        <ControlPanel
          onChange={handleChangePanelState}
          state={panelState}
        />

        <br />

        <Benchmark
          onStart={handleOnStart}
          onEnd={handleOnEnd}
          functions={[findLine, findLine]}
          args={[getSymmetricArr(14).result]}

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

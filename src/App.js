import './App.css';
import './line/line'

import { getAsymmetricArr, getSymmetricArr } from './line/utils'

import Benchmark from './components/Benchmark/Benchmark';
import React from 'react';
import { findLine } from './line/line'

/* 
  Switch between functions and pass options
  Save resutl globally
*/

function App() {
  return (
    <div>
      <Benchmark
        loops={1000}
        inRow={1000}
        printToConsole={true}
        functions={[findLine]}
        args={[getSymmetricArr(14).result]}
        iteration="5"
      />

      {/* <Benchmark
        loops={1000}
        inRow={1000}
        printToConsole={true}
        functions={[findLine]}
        args={[getAsymmetricArr(4)]}
        iteration="5"
      /> */}
    </div>
  );
}

export default App;

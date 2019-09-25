import './Benchmark.css'

import React from 'react'
import { createItems } from './utils'

const COLORS = {
  border: "#f0f",
  body: ["#f00", "#0ff"]
};

const DIMENTIONS = {
  width: 50
};

const Benchmark = ({
  args,
  delay = 500,
  functions,
  inRow = 1000,
  iteration = 1,
  loops = 100,
  printToConsole = false
} = {}) => {

  const items = createItems(
    functions,
    inRow,
    loops,
    args,
    printToConsole
  )

  console.log('items', items)

  const printStart = () => {
    console.log('='.repeat(30))
    console.log(`Start Benchmark ${new Date().toLocaleString()}`)
    console.log(`Settings: inRow - ${inRow}, loops - ${loops}, iteration - ${iteration}`)
    console.log('='.repeat(30))
  }

  function printDone(items) {
    console.log('='.repeat(30))
    console.log(`End Benchmark ${new Date().toLocaleString()}`);
    console.log('='.repeat(30))
    items.forEach((item) => item.printDone());
  }

  const start = () => {
    for (let i = 0; i < items.length; i++) {
      items[i].run();
    }
  }

  printToConsole && printStart()

  start()

  if (iteration > 1) {
    iteration--;
    setTimeout(function time() {
      start();
      iteration--;
      if (iteration > 0) {
        setTimeout(time, delay)
      } else {
        printToConsole && printDone(items);
      }
    }, delay);
  } else {
    printToConsole && printDone(items);
  }

  // console.log('functions', functions)
  // console.log('args', args)

  return (
    <div>
      <div className="benchmark">
        {(functions === undefined || functions.length === 0) && <div className="branchmark__message warning">
          there is not functions yet
        </div>}
      </div>
    </div>
  )
}

export default Benchmark

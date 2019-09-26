export function bench(f, inRow, loops) {
  return function () {
    const results = []
    const start = Date.now();

    for (let i = 0; i < loops; i++) {
      for (let i = 0; i < inRow; i++) {
        const result = f.apply(null, arguments[0]);
        results.push(result)
      }
    }

    return {
      results,
      time: Date.now() - start
    };
  }
}

export function createItems(
  functions,
  inRow,
  loops,
  args,
  printToConsole = false
) {
  const items = []
  for (let i = 0; i < functions.length; i++) {
    // console.log('fun',functions[i].sourceName )
    items.push({
      name: functions[i].sourceName,
      func: bench(functions[i], inRow, loops),
      time: 0,
      count: [],
      date: [],
      results: [],
      serial: i,
      run: function (cb) {
        const { time, results } = this.func(args)

        this.time = time;
        this.count.push(time)
        this.date.push(Date.now())
        this.results = results
        printToConsole && this.print();
        cb && cb({
          time,
          name: this.name,
          results
        })
      },
      print: function () {
        console.log(`Function "${this.name}" - time: ${this.time} ms`);
        console.log('Results: ', this.results)
        console.log('- - '.repeat(15))
      },
      getAverage: function () {
        let sum = 0;

        for (let i = 0; i < this.count.length; i++) {
          sum += this.count[i];
        }

        return sum / this.count.length;
      },
      done: function () {
        const max = Math.max(...this.count)
        const min = Math.min(...this.count)
        const persent = parseInt(100 - (min / max * 100))
        return {
          max,
          min,
          average: this.getAverage(),
          persent
        }
      },
      printDone: function () {
        let done = this.done();

        console.log(this.name
          + " = max time " + done.max
          + " / mim time " + done.min
          + " / average " + done.average
          + " / persent " + done.persent
        )
      },
    });
  }

  return items
}

export const printStart = (inRow, loops, iteration) => {
  console.log('='.repeat(30))
  console.log(`Start Benchmark ${new Date().toLocaleString()}`)
  console.log(`Settings: inRow - ${inRow}, loops - ${loops}, iteration - ${iteration}`)
  console.log('='.repeat(30))
}

export const printDone = (items) => {
  console.log('='.repeat(30))
  console.log(`End Benchmark ${new Date().toLocaleString()}`);
  console.log('='.repeat(30))
  items.forEach((item) => item.printDone());
}

export const createDataSet = items => {
  return items.map(item => ({
    labels: Array.from({ length: item.count.length }).map((e, i) => i + 1),
    datasets: [
      {
        label: item.name,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: item.count
      }
    ]
  }))
}
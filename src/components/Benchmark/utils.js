export function bench(f, inRow, loops) {
  return function () {
    const results = []
    let start = Date.now();

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
    items.push({
      name: functions[i].name,
      func: bench(functions[i], inRow, loops),
      time: 0,
      count: [],
      results: [],
      serial: i,
      run: function () {
        const {time, results} = this.func(args)

        this.time = time;
        this.count.push(time);
        this.results = results
        printToConsole && this.print();
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
      // render: function () {
      //   let bar = this.createView();
      //   bar.style.height = this.time / 10 + "px";
      //   bar.style.background = COLORS.body[this.serial];

      //   container.appendChild(bar);
      // },
      // createView: function () {
      //   let bar = document.createElement("div");
      //   bar.className = "branchmark__bar";
      //   bar.innerHTML = this.time;

      //   return bar;
      // }
    });
  }

  return items
}
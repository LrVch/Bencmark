export default () => {
  function bench(f, inRow, loops, onProgress) {
    return function () {
      const results = []
      const start = Date.now();

      for (let i = 0; i < loops; i++) {
        for (let i = 0; i < inRow; i++) {
          onProgress && onProgress()
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

  function createItems(
    functions,
    inRow,
    loops,
    args,
    onProgress,
    onItarationEnd
  ) {
    const items = []
    for (let i = 0; i < functions.length; i++) {
      items.push({
        name: functions[i].sourceName,
        func: bench(functions[i], inRow, loops, onProgress),
        time: 0,
        count: [],
        date: [],
        results: [],
        serial: i,
        run: function () {
          const { time, results } = this.func(args)

          this.time = time
          this.count.push(time)
          this.date.push(Date.now())
          this.results = results
          onItarationEnd && onItarationEnd({
            time, results, name: this.name
          })
        }
      });
    }

    return items
  }

  const start = items => {
    for (let i = 0; i < items.length; i++) {
      items[i].run();
    }

    return items
  }

  const mapResult = items => items.map(({ count, date, name, serial, results }) => ({
    count, date, name, serial, results
  }))

  const recreateFnFromString = fn => {
    // eslint-disable-next-line no-new-func
    const resFn = new Function('return ' + fn.fn.toString())();
    resFn.sourceName = fn.name
    return resFn
  }

  // eslint-disable-next-line no-restricted-globals
  self.addEventListener('message', (
    { data: {
      iteration, delay, functions, inRow, loops, args
    } = {} }
  ) => {
    functions = functions.map(recreateFnFromString);
    const intialIteraions = iteration
    let count = 0

    const items = createItems(
      functions,
      inRow,
      loops,
      args,
      () => {
        const amount =  loops * inRow * intialIteraions * functions.length
        // eslint-disable-next-line no-restricted-globals
        self.postMessage({
          type: 'progress',
          data: {
            amount: amount,
            count: count++,
            persent: (count) / amount * 100
          }
        })
      },
      data => {
        // eslint-disable-next-line no-restricted-globals
        self.postMessage({
          type: 'iterationEnd',
          data
        })
      }
    )

    
    // console.log('items', items)

    start(items)

    console.log('iteration', iteration)

    if (iteration > 1) {
      iteration--;
      setTimeout(function time() {
        start(items);
        iteration--;
        if (iteration > 0) {
          setTimeout(time, delay)
        } else {
          // eslint-disable-next-line no-restricted-globals
          self.postMessage({
            type: 'end',
            data: {
              items: mapResult(items)
            }
          })
        }
      }, delay);
    } else {
      // eslint-disable-next-line no-restricted-globals
      self.postMessage({
        type: 'end',
        data: {
          items: mapResult(items)
        }
      })
    }
  })
}

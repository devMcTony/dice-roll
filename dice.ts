const FREQUENCY = 1000

function simulateDiceRoll(): void {
  // Initialize the face Map
  const faces: Map<number, number[]> = new Map([
    [1, []],
    [2, []],
    [3, []],
    [4, []],
    [5, []],
    [6, []],
  ])

  for (let i = 0; i < FREQUENCY; i++) {
    const num = Math.random() // Generates a number in range [0, 1)

    // Determine category all with equal intervals
    let category: number
    if (num < 1 / 6) {
      category = 1
    } else if (num < 2 / 6) {
      category = 2
    } else if (num < 3 / 6) {
      category = 3
    } else if (num < 4 / 6) {
      category = 4
    } else if (num < 5 / 6) {
      category = 5
    } else {
      category = 6 // Covers [5/6, 1)
    }

    faces.get(category)!.push(num)
  }

  // Compute total Frequency using Map values
  const total = Array.from(faces.values()).reduce(
    (sum, arr) => sum + arr.length,
    0,
  )

  // Generate data to output
  const data = Array.from(faces.entries()).map(([face, values]) => {
    const freq = values.length
    const perc = ((freq / FREQUENCY) * 100).toFixed(1) + '%'
    return { face: face.toString(), freq, perc }
  })

  // Output results as table
  console.log(` FACE      | FREQUENCY  | PERCENTAGE `)
  console.log(`------------------------------------`)
  // Render data
  data.forEach(({ face, freq, perc }) => {
    console.log(
      ` ${face.padStart(4)}      | ${freq.toString().padStart(9)}  | ${perc.padStart(10)}`,
    )
  })
  console.log(`------------------------------------`)
  console.log(` Total     | ${total.toString().padStart(9)}  |  100.0%`)
}

simulateDiceRoll()

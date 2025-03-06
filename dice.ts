function simulateDiceRoll(): void {
  // Initialize a Map with faces 1 to 6 as keys and empty arrays as values
  const faces: Map<number, number[]> = new Map([
    [1, []],
    [2, []],
    [3, []],
    [4, []],
    [5, []],
    [6, []],
  ])

  for (let i = 0; i < 1000; i++) {
    // Generates a number in range [0, 1)
    const num = Math.random()

    // Determine category using range checks (1/6 = ~0.1667)
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
      category = 6
    }

    // Use Map's get method to access the array and push the number
    faces.get(category)!.push(num)
  }

  // Compute total using Map values
  const total = Array.from(faces.values()).reduce(
    (sum, arr) => sum + arr.length,
    0,
  )

  // Generate data to output: [{ face: '1', freq: 100, perc: '10.0%' }, ...]
  const data = Array.from(faces.entries()).map(([face, values]) => {
    const freq = values.length
    const perc = ((freq / 1000) * 100).toFixed(1) + '%'
    return { face: face.toString(), freq, perc } // face is a number, convert to string for display
  })

  // Output results as table
  console.log(` FACE      | FREQUENCY  | PERCENTAGE `)
  console.log(`--------------------------------`)
  // Render data
  data.forEach(({ face, freq, perc }) => {
    console.log(
      ` ${face.padStart(4)}      | ${freq.toString().padStart(9)}  | ${perc.padStart(10)}`,
    )
  })
  console.log(`--------------------------------`)
  console.log(` Total     | ${total.toString().padStart(9)}  |  100.0%`)
}

simulateDiceRoll()

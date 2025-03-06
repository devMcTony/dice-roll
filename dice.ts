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
    // Generates a number in the range inclusive [0, 1)
    // Math.ramdow() * 6 scales the number generated to the range [0, 6)
    // Math.floor(Math.random() * 6) generates a number e.g 0,1,2,3,4,5
    // Add 1 to the generated number to get a number in the range 1,2,3,4,5,6
    const num = Math.floor(Math.random() * 6) + 1

    faces.get(num)!.push(i)
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

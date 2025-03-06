function simulateDiceRoll(): void {
  const faces: Record<number, number[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }

  for (let i = 0; i < 1000; i++) {
    // Generates a number in range [0, 1)
    const num = Math.random()

    // Determine category using range checks (1/6 = ~0.17)
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
      category = 6 // [5/6, 1)
    }

    faces[category].push(num)
  }

  // Compute frequency and percentage
  const total = Object.values(faces).reduce((sum, arr) => sum + arr.length, 0)

  // Generate data to output : [{ face: 1, freq: 100, perc: '10.0%' }, ...]
  const data = Object.entries(faces).map(([face, values]) => {
    const freq = values.length
    const perc = ((freq / 1000) * 100).toFixed(1) + '%'
    return { face, freq, perc }
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

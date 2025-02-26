function simulateDiceRoll(): void {
  const indexes: Record<number, number[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }

  // Run random simulation
  for (let i = 0; i < 1000; i++) {
    const num = Math.round(Math.random() * 9) / 10
    const category = Math.min(Math.floor(num * 6) + 1, 6) // Determine category (1 to 6)
    indexes[category].push(num)
  }

  // Compute frequency and percentage
  const total = Object.values(indexes).reduce((sum, arr) => sum + arr.length, 0)
  const data = Object.entries(indexes).map(([face, values]) => {
    const freq = values.length
    const perc = ((freq / 1000) * 100).toFixed(1) + '%'
    return { face, freq, perc }
  })

  console.log(` FACE      | FREQUENCY  | PERCENTAGE `)
  console.log(`--------------------------------`)
  data.forEach(({ face, freq, perc }) => {
    console.log(
      ` ${face.padStart(4)}      | ${freq.toString().padStart(9)}  | ${perc.padStart(10)}`,
    )
  })
  console.log(`--------------------------------`)
  console.log(` Total     | ${total.toString().padStart(9)}  |  100.0%`)
}

simulateDiceRoll()

import * as fs from 'fs'

const Q_LIMIT = 100 // Max queue length
const BUSY = 1
const IDLE = 0

enum EventType {
  ARRIVAL = 1,
  DEPARTURE = 2,
}

let nextEventType: number
let numCustomersDelayed: number
let numDelaysRequired: number
let numEvents: number
let numInQueue: number
let serverStatus: number

let areaNumInQueue: number
let areaServerStatus: number
let meanInterarrival: number
let meanService: number
let simTime: number
let timeArrival: number[] = new Array(Q_LIMIT + 1)
let timeLastEvent: number
let timeNextEvent: number[] = new Array(3)
let totalDelays: number

let outputContent = ''

function writeLine(line: string): void {
  outputContent += line + '\n'
}

function initialize(): void {
  simTime = 0.0

  serverStatus = IDLE
  numInQueue = 0
  timeLastEvent = 0.0

  numCustomersDelayed = 0
  totalDelays = 0.0
  areaNumInQueue = 0.0
  areaServerStatus = 0.0

  // Initialize event list. Since no customers are present, the departure
  // (service completion) event is eliminated from consideration.
  timeNextEvent[EventType.ARRIVAL] = simTime + expon(meanInterarrival)
  timeNextEvent[EventType.DEPARTURE] = 1.0e30
}

/**
 * Determine the next event
 */
function timing(): void {
  let minTimeNextEvent = 1.0e29
  nextEventType = 0

  for (let i = 1; i <= numEvents; ++i) {
    if (timeNextEvent[i] < minTimeNextEvent) {
      minTimeNextEvent = timeNextEvent[i]
      nextEventType = i
    }
  }

  // Check to see whether the event list is empty
  if (nextEventType === 0) {
    writeLine(`\nEvent list empty at time ${simTime}`)
    fs.writeFileSync('mm1.out', outputContent)
    process.exit(1)
  }

  // The event list is not empty, so advance the simulation clock
  simTime = minTimeNextEvent
}

function arrive(): void {
  timeNextEvent[EventType.ARRIVAL] = simTime + expon(meanInterarrival)

  if (serverStatus === BUSY) {
    ++numInQueue

    // Check for queue overflow
    if (numInQueue > Q_LIMIT) {
      writeLine(`\nOverflow of the array timeArrival at time ${simTime}`)
      fs.writeFileSync('mm1.out', outputContent)
      process.exit(2)
    }

    // There is still room in the queue, so store the time of arrival
    timeArrival[numInQueue] = simTime
  } else {
    const delay = 0.0
    totalDelays += delay

    ++numCustomersDelayed
    serverStatus = BUSY

    // Schedule a departure
    timeNextEvent[EventType.DEPARTURE] = simTime + expon(meanService)
  }
}

function depart(): void {
  if (numInQueue === 0) {
    serverStatus = IDLE
    timeNextEvent[EventType.DEPARTURE] = 1.0e30
  } else {
    --numInQueue

    // Compute delay for customer beginning service
    const delay = simTime - timeArrival[1]
    totalDelays += delay

    ++numCustomersDelayed
    timeNextEvent[EventType.DEPARTURE] = simTime + expon(meanService)

    // Move remaining customers in queue forward
    for (let i = 1; i <= numInQueue; ++i) {
      timeArrival[i] = timeArrival[i + 1]
    }
  }
}

function report(): void {
  // Compute and write statistics
  writeLine(
    '\n\nAverage delay in queue: ' +
      (totalDelays / numCustomersDelayed).toFixed(3) +
      ' minutes',
  )

  writeLine('Average number in queue: ' + (areaNumInQueue / simTime).toFixed(3))

  writeLine('Server utilization: ' + (areaServerStatus / simTime).toFixed(3))

  writeLine('Time simulation ended: ' + simTime.toFixed(3) + ' minutes')
}

function updateTimeAvgStats(): void {
  const timeSinceLastEvent = simTime - timeLastEvent
  timeLastEvent = simTime

  // Update area under number-in-queue function
  areaNumInQueue += numInQueue * timeSinceLastEvent

  // Update area under server-busy indicator function
  areaServerStatus += serverStatus * timeSinceLastEvent
}

/**
 * Generate exponential random variate
 */
function expon(mean: number): number {
  return -mean * Math.log(Math.random())
}

/**
 * Log the contents of the output to console
 */
function logOutputFile(): void {
  try {
    const inputData = fs.readFileSync('mm1.in', 'utf8')
    console.log('\n--- Input data provided ---\n')
    console.log(inputData)
    const outputData = fs.readFileSync('mm1.out', 'utf8')
    console.log('\n--- Contents of mm1.out ---')
    console.log(outputData)
    console.log('---------------------------')
  } catch (err) {
    console.error('Error reading output file:', err)
  }
}

function runSimulation(
  interarrivalMean: number,
  serviceMean: number,
  delaysRequired: number,
): void {
  // Set parameters
  meanInterarrival = interarrivalMean
  meanService = serviceMean
  numDelaysRequired = delaysRequired
  numEvents = 2 // Number of event types

  writeLine('Single-server queueing system\n')
  writeLine(`Mean interarrival time: ${meanInterarrival.toFixed(3)} minutes`)
  writeLine(`Mean service time: ${meanService.toFixed(3)} minutes`)
  writeLine(`Number of customers: ${numDelaysRequired}\n`)

  initialize()

  while (numCustomersDelayed < numDelaysRequired) {
    // Determine next event
    timing()

    updateTimeAvgStats()

    // Process the event
    switch (nextEventType) {
      case EventType.ARRIVAL:
        arrive()
        break
      case EventType.DEPARTURE:
        depart()
        break
    }
  }

  report()

  fs.writeFileSync('mm1.out', outputContent)
  console.log('Simulation completed. Results written to mm1.out')
  logOutputFile()
}

try {
  const inputData = fs.readFileSync('mm1.in', 'utf8')
  const params = inputData.trim().split(/\s+/).map(Number)

  if (params.length !== 3 || params.some(isNaN)) {
    console.error(
      'Error: Input file must contain three numbers (mean interarrival time, mean service time, number of customers)',
    )
    process.exit(1)
  }

  const [meanInterarrivalTime, meanServiceTime, numCustomers] = params
  runSimulation(meanInterarrivalTime, meanServiceTime, numCustomers)
} catch (err) {
  console.error('Error reading input file:', err)
  console.error(
    'Please create a file named mm1.in with three space-separated values:',
  )
  console.error('  1. Mean interarrival time (e.g., 1.0)')
  console.error('  2. Mean service time (e.g., 0.5)')
  console.error('  3. Number of customers (e.g., 1000)')
  process.exit(1)
}

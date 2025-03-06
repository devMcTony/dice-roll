// Constants
const IDLE = 0;
const BUSY = 1;

// Global variables with types
let simTime: number = 0.0;
let serverStatus: number = IDLE;
let numInQ: number = 0;
let timeNextEvent: number[] = [0.0, 0.0, 1.0e30]; // Arrival, Departure
let totalDelays: number = 0.0;
let numCustomers: number = 0;

// Parameters
const meanInterarrival: number = 1.0;
const meanService: number = 0.5;
const numToSimulate: number = 100;

// Exponential random variable
function expon(mean: number): number {
    return -mean * Math.log(Math.random());
}

// Arrival event
function arrive(): void {
    simTime = timeNextEvent[1];
    timeNextEvent[1] = simTime + expon(meanInterarrival);

    if (serverStatus === BUSY) {
        numInQ += 1;
    } else {
        serverStatus = BUSY;
        timeNextEvent[2] = simTime + expon(meanService);
    }
}

// Departure event
function depart(): void {
    simTime = timeNextEvent[2];
    numCustomers += 1;

    if (numInQ > 0) {
        numInQ -= 1;
        timeNextEvent[2] = simTime + expon(meanService);
    } else {
        serverStatus = IDLE;
        timeNextEvent[2] = 1.0e30;
    }
}

// Main simulation loop
function simulate(): void {
    timeNextEvent[1] = expon(meanInterarrival); // first arrival

    while (numCustomers < numToSimulate) {
        if (timeNextEvent[1] < timeNextEvent[2]) {
            arrive();
        } else {
            depart();
        }
    }

    // Output results
    console.log(`Average delay: ${(totalDelays / numCustomers).toFixed(2)}`);
    console.log(`Average queue length: ${numInQ.toFixed(2)}`);
    console.log(`Server utilization: ${(1 - (timeNextEvent[2] === 1.0e30 ? 1 : 0)).toFixed(2)}`);
}

// Run the simulation
simulate();

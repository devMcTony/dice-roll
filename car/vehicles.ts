// Define available colors
const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

// Base Vehicle class
abstract class Vehicle {
    protected color: string;
    protected length: number;
    protected make: string;
    protected model: number;
    protected mileage: number;
    protected price: number;
    
    constructor(make: string, model: number) {
        this.make = make;
        this.model = model;
        this.color = this.getRandomColor();
        this.length = this.getRandomLength();
        this.mileage = this.getRandomMileage();
        this.price = this.getRandomPrice();
    }
    
    // Get a random color from available colors
    protected getRandomColor(): string {
        const num = Math.random();
        if (num < 1/6) {
            return COLORS[0];
        } else if (num < 2/6) {
            return COLORS[1];
        } else if (num < 3/6) {
            return COLORS[2];
        } else if (num < 4/6) {
            return COLORS[3];
        } else if (num < 5/6) {
            return COLORS[4];
        } else {
            return COLORS[5];
        }
    }
    
    // Get a random length for the vehicle
    protected getRandomLength(): number {
        // Base length between 150 and 250
        return 150 + Math.random() * 100;
    }
    
    // Get a random mileage
    protected getRandomMileage(): number {
        return Math.floor(1000 + Math.random() * 99000);
    }
    
    // Get a random price
    protected getRandomPrice(): number {
        return Math.floor(5000 + Math.random() * 45000);
    }
    
    // Abstract draw method to be implemented by subclasses
    abstract draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
    
    // Method to get vehicle details
    getDetails(): string[] {
        return [
            `Make: ${this.make}`,
            `Model: ${this.model}`,
            `Mileage: ${this.mileage.toLocaleString()} miles`,
            `Price: $${this.price.toLocaleString()}`,
            `Color: ${this.color}`
        ];
    }
}

// Car class
class Car extends Vehicle {
    private doors: number;
    
    constructor(make: string = "Generic", model: number = 2023) {
        super(make, model);
        this.doors = this.getRandomDoors();
        // Adjust length based on number of doors
        this.length = 150 + (this.doors * 25) + (Math.random() * 50);
    }
    
    private getRandomDoors(): number {
        const num = Math.random();
        if (num < 0.2) {
            return 2; // Sports car (20% chance)
        } else {
            return 4; // Regular car (80% chance)
        }
    }
    
    draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.save();
        
        // Car body
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y - 30, this.length, 20);
        
        // Car top
        ctx.fillRect(x + this.length * 0.2, y - 50, this.length * 0.6, 20);
        
        // Wheels
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x + this.length * 0.2, y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + this.length * 0.8, y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Windows - draw based on number of doors
        ctx.fillStyle = "lightblue";
        if (this.doors === 2) {
            // Two long windows for 2-door car
            ctx.fillRect(x + this.length * 0.25, y - 45, this.length * 0.5, 15);
        } else {
            // Four smaller windows for 4-door car
            ctx.fillRect(x + this.length * 0.25, y - 45, this.length * 0.2, 15);
            ctx.fillRect(x + this.length * 0.55, y - 45, this.length * 0.2, 15);
        }
        
        ctx.restore();
    }
    
    getDetails(): string[] {
        const baseDetails = super.getDetails();
        return [...baseDetails, `Doors: ${this.doors}`];
    }
}

// Truck class
class Truck extends Vehicle {
    private driveType: string;
    
    constructor(make: string = "Generic", model: number = 2023) {
        super(make, model);
        this.driveType = this.getRandomDriveType();
        // Trucks are generally longer
        this.length = 200 + Math.random() * 100;
    }
    
    private getRandomDriveType(): string {
        const num = Math.random();
        if (num < 0.6) {
            return "4WD";
        } else if (num < 0.9) {
            return "2WD";
        } else {
            return "AWD";
        }
    }
    
    draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.save();
        
        // Truck cabin
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y - 40, this.length * 0.35, 30);
        
        // Truck bed
        ctx.fillStyle = this.color;
        ctx.fillRect(x + this.length * 0.4, y - 25, this.length * 0.6, 15);
        
        // Wheels
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x + this.length * 0.2, y, 12, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + this.length * 0.8, y, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Window
        ctx.fillStyle = "lightblue";
        ctx.fillRect(x + this.length * 0.05, y - 35, this.length * 0.25, 15);
        
        ctx.restore();
    }
    
    getDetails(): string[] {
        const baseDetails = super.getDetails();
        return [...baseDetails, `Drive Type: ${this.driveType}`];
    }
}

// SUV class
class SUV extends Vehicle {
    private passengerCapacity: number;
    
    constructor(make: string = "Generic", model: number = 2023) {
        super(make, model);
        this.passengerCapacity = this.getRandomPassengerCapacity();
        // Adjust length based on passenger capacity
        this.length = 180 + (this.passengerCapacity * 15) + (Math.random() * 50);
    }
    
    private getRandomPassengerCapacity(): number {
        // SUVs typically have 5-8 passengers
        return Math.floor(5 + Math.random() * 4);
    }
    
    draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.save();
        
        // SUV body
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y - 40, this.length, 30);
        
        // SUV top - slightly raised roof compared to car
        ctx.fillRect(x + this.length * 0.1, y - 65, this.length * 0.8, 25);
        
        // Wheels
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x + this.length * 0.2, y, 12, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + this.length * 0.8, y, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Windows - more windows for more passengers
        ctx.fillStyle = "lightblue";
        const windowCount = Math.min(4, Math.ceil(this.passengerCapacity / 2));
        const windowWidth = (this.length * 0.7) / windowCount;
        
        for (let i = 0; i < windowCount; i++) {
            ctx.fillRect(x + this.length * 0.15 + (i * windowWidth), y - 60, windowWidth * 0.8, 20);
        }
        
        ctx.restore();
    }
    
    getDetails(): string[] {
        const baseDetails = super.getDetails();
        return [...baseDetails, `Passenger Capacity: ${this.passengerCapacity}`];
    }
}

// Flower class for drawing at the bottom of the canvas
class Flower {
    private color: string;
    private x: number;
    private y: number;
    private static readonly PETAL_SIZE = 5; // Constant petal size for all flowers
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.color = this.getRandomColor();
    }
    
    private getRandomColor(): string {
        const num = Math.random();
        if (num < 1/6) {
            return "pink";
        } else if (num < 2/6) {
            return "red";
        } else if (num < 3/6) {
            return "yellow";
        } else if (num < 4/6) {
            return "white";
        } else if (num < 5/6) {
            return "purple";
        } else {
            return "orange";
        }
    }
    
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        
        // Stem
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - 20);
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Flower petals
        ctx.fillStyle = this.color;
        const petalSize = Flower.PETAL_SIZE; // Use the static constant size
        
        // Draw 5 petals
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const petalX = this.x + Math.cos(angle) * petalSize;
            const petalY = (this.y - 20) + Math.sin(angle) * petalSize;
            
            ctx.beginPath();
            ctx.arc(petalX, petalY, petalSize, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Flower center
        ctx.beginPath();
        ctx.arc(this.x, this.y - 20, petalSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        
        ctx.restore();
    }
    
    // Regenerate flower color
    regenerateColor(): void {
        this.color = this.getRandomColor();
    }
}

// Main function to setup the canvas and event listeners
function main() {
    const canvas = document.getElementById("vehicleCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) {
        console.error("Could not get canvas context");
        return;
    }
    
    // Create buttons
    const carButton = document.getElementById("carButton");
    const truckButton = document.getElementById("truckButton");
    const suvButton = document.getElementById("suvButton");
    
    // Function to generate random flower count between 1 and 6 inclusive
    function getRandomFlowerCount(): number {
        const num = Math.random();
        if (num < 1/6) {
            return 1;
        } else if (num < 2/6) {
            return 2;
        } else if (num < 3/6) {
            return 3;
        } else if (num < 4/6) {
            return 4;
        } else if (num < 5/6) {
            return 5;
        } else {
            return 6;
        }
    }
    
    // Function to create flowers with random count
    function createFlowers(): Flower[] {
        const flowerCount = getRandomFlowerCount();
        const flowers: Flower[] = [];
        
        // Calculate spacing based on canvas width and flower count
        const spacing = canvas.width / (flowerCount + 1);
        
        for (let i = 0; i < flowerCount; i++) {
            flowers.push(new Flower(spacing * (i + 1), canvas.height - 50));
        }
        
        return flowers;
    }
    
    // Initialize flowers array
    let flowers: Flower[] = createFlowers();
    
    // Function to clear canvas and draw flowers
    function clearAndDrawFlowers() {
        if (!ctx) {
            console.error("Canvas context is null");
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw ground
        ctx.fillStyle = "#8B4513";  // Brown color for ground
        ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
        
        ctx.fillStyle = "#228B22";  // Green for grass
        ctx.fillRect(0, canvas.height - 50, canvas.width, 10);
        
        // Create new flowers with random count
        flowers = createFlowers();
        
        // Draw the flowers
        flowers.forEach(flower => {
            flower.draw(ctx);
        });
    }
    
    // Function to display vehicle details
    function displayVehicleDetails(details: string[]) {
        if (!ctx) return;
        
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        
        // Draw info box
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillRect(canvas.width - 250, 20, 230, 30 + details.length * 25);
        
        ctx.fillStyle = "black";
        ctx.font = "bold 16px Arial";
        ctx.fillText("Vehicle Details", canvas.width - 240, 40);
        
        ctx.font = "14px Arial";
        details.forEach((detail, index) => {
            ctx.fillText(detail, canvas.width - 240, 65 + index * 25);
        });
    }
    
    // Event listeners for buttons
    carButton?.addEventListener("click", () => {
        clearAndDrawFlowers();
        const car = new Car(getRandomMake(), getRandomModel());
        car.draw(ctx, canvas.width / 2 - 150, canvas.height - 100);
        displayVehicleDetails(car.getDetails());
    });
    
    truckButton?.addEventListener("click", () => {
        clearAndDrawFlowers();
        const truck = new Truck(getRandomMake(), getRandomModel());
        truck.draw(ctx, canvas.width / 2 - 150, canvas.height - 100);
        displayVehicleDetails(truck.getDetails());
    });
    
    suvButton?.addEventListener("click", () => {
        clearAndDrawFlowers();
        const suv = new SUV(getRandomMake(), getRandomModel());
        suv.draw(ctx, canvas.width / 2 - 150, canvas.height - 100);
        displayVehicleDetails(suv.getDetails());
    });
    
    // Helper functions to generate random makes and models
    function getRandomMake(): string {
        const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes", "Audi", "Volvo", "Tesla"];
        return makes[Math.floor(Math.random() * makes.length)];
    }
    
    function getRandomModel(): number {
        // Model year between 2010 and 2025
        return 2010 + Math.floor(Math.random() * 16);
    }
    
    // Initial draw
    clearAndDrawFlowers();
}

// Execute main when DOM is loaded
window.addEventListener("DOMContentLoaded", main);

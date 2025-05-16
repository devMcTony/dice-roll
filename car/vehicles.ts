// Define available colors
// const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

// Function to generate a random RGB color string
function getRandomRGBColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

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
        return getRandomRGBColor();
    }
    
    // Get a random length for the vehicle
    protected getRandomLength(): number {
        // Increase range from 200-300 to 150-350 for more noticeable size differences
        return 150 + Math.random() * 200;
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
            `Price: $${this.price.toLocaleString()}`
        ];
    }
}

// Car class
class Car extends Vehicle {
    private doors: number;
    
    constructor(make: string = "Generic", model: number = 2023) {
        super(make, model);
        this.doors = this.getRandomDoors();
        // Increase door size impact and add more randomness
        this.length = 150 + (this.doors * 40) + (Math.random() * 100);
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
        
        const height = 45;
        const wheelRadius = 15;
        const wheelY = y;
        
        // Car base - curved bottom
        ctx.beginPath();
        ctx.moveTo(x, y - height/2);
        ctx.lineTo(x + this.length * 0.1, y - height);
        ctx.lineTo(x + this.length * 0.9, y - height);
        ctx.lineTo(x + this.length, y - height/2);
        ctx.lineTo(x + this.length, y - wheelRadius);
        ctx.quadraticCurveTo(x + this.length * 0.9, y, x + this.length * 0.8, y);
        ctx.lineTo(x + this.length * 0.2, y);
        ctx.quadraticCurveTo(x + this.length * 0.1, y, x, y - wheelRadius);
        ctx.closePath();
        
        // Fill body with car color
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Windows
        ctx.fillStyle = "lightblue";
        
        // Windshield
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.15, y - height);
        ctx.lineTo(x + this.length * 0.25, y - height * 1.5);
        ctx.lineTo(x + this.length * 0.75, y - height * 1.5);
        ctx.lineTo(x + this.length * 0.85, y - height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw doors based on number of doors
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        if (this.doors === 2) { // Coupe style - 1 long door on this side
            const doorStart = this.length * 0.15;
            const doorEnd = this.length * 0.65; // Door covers a larger portion

            ctx.beginPath();
            ctx.moveTo(x + doorStart, y - height);
            ctx.lineTo(x + this.length * 0.25, y - height * 1.4); // Connect to windshield line
            ctx.lineTo(x + doorEnd, y - height * 1.4); // Top edge straight
            ctx.lineTo(x + doorEnd, y - height); // Straight back edge
            ctx.lineTo(x + doorEnd, y - wheelRadius * 1.2); // Bottom back of door
            ctx.lineTo(x + doorStart, y - wheelRadius * 1.2); // Bottom front of door
            ctx.closePath();
            ctx.stroke();
            
            // Single door handle for 2-door car
            ctx.fillStyle = "white";
            ctx.fillRect(x + doorStart + (this.length * 0.1), y - height * 0.8, 12, 4);

        } else { // Sedan style - 2 doors on this side
            const frontDoorStart = this.length * 0.15;
            const frontDoorEnd = this.length * 0.40;
            const rearDoorStart = this.length * 0.40;
            const rearDoorEnd = this.length * 0.65;

            // Front driver door - straight back edge
            ctx.beginPath();
            ctx.moveTo(x + frontDoorStart, y - height);
            ctx.lineTo(x + this.length * 0.25, y - height * 1.4); // Connect to windshield line
            ctx.lineTo(x + frontDoorEnd, y - height * 1.4); // Straight top edge
            ctx.lineTo(x + frontDoorEnd, y - height); // Straight back edge
            ctx.lineTo(x + frontDoorEnd, y - wheelRadius * 1.2); // Bottom back of front door
            ctx.lineTo(x + frontDoorStart, y - wheelRadius * 1.2); // Bottom front of front door
            ctx.closePath();
            ctx.stroke();
            
            // Front door handle
            ctx.fillStyle = "white";
            ctx.fillRect(x + frontDoorStart + (this.length*0.05), y - height * 0.8, 10, 4);
            
            // Rear passenger door - straight edges on both sides
            ctx.beginPath();
            ctx.moveTo(x + rearDoorStart, y - height); // Bottom front of rear door
            ctx.lineTo(x + rearDoorStart, y - height * 1.4); // Straight top-front edge
            ctx.lineTo(x + rearDoorEnd, y - height * 1.4); // Straight top edge
            ctx.lineTo(x + rearDoorEnd, y - height); // Straight top-back edge
            ctx.lineTo(x + rearDoorEnd, y - wheelRadius * 1.2); // Bottom back of rear door
            ctx.lineTo(x + rearDoorStart, y - wheelRadius * 1.2); // Bottom front of rear door
            ctx.closePath();
            ctx.stroke();
            
            // Rear door handle
            ctx.fillRect(x + rearDoorStart + (this.length*0.05), y - height * 0.8, 10, 4);

            // B-pillar (divider between doors)
            ctx.beginPath();
            ctx.moveTo(x + frontDoorEnd, y - height * 1.4);
            ctx.lineTo(x + frontDoorEnd, y - wheelRadius * 1.2);
            ctx.stroke();
        }
        
        // Wheels with hubcaps and rotation
        const frontWheelX = x + this.length * 0.2;
        const rearWheelX = x + this.length * 0.8;
        
        // Draw both wheels with rotation
        [frontWheelX, rearWheelX].forEach(wheelX => {
            ctx.save();
            ctx.translate(wheelX, wheelY);
            
            // Tire
            ctx.beginPath();
            ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.strokeStyle = "darkgray";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Rim
            ctx.beginPath();
            ctx.arc(0, 0, wheelRadius * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
            
            // Hubcap details
            ctx.beginPath();
            ctx.arc(0, 0, wheelRadius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = "darkgray";
            ctx.fill();
            
            // Spokes
            ctx.strokeStyle = "darkgray";
            ctx.lineWidth = 2;
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(Math.cos(angle) * wheelRadius * 0.3, 
                           Math.sin(angle) * wheelRadius * 0.3);
                ctx.lineTo(Math.cos(angle) * wheelRadius * 0.7, 
                           Math.sin(angle) * wheelRadius * 0.7);
                ctx.stroke();
            }
            
            ctx.restore();
        });
        
        // Headlights
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.ellipse(x + this.length * 0.05, y - height * 0.7, 5, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Taillights
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.ellipse(x + this.length * 0.95, y - height * 0.7, 5, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
    }
    
    getDetails(): string[] {
        const baseDetails = super.getDetails();
        // Filter out color property from base details
        const filteredBaseDetails = baseDetails.filter(detail => !(detail.substring(0, 6) === 'Color:'));
        return filteredBaseDetails; // No doors property added
    }
}

// Truck class
class Truck extends Vehicle {
    private driveType: string;
    
    constructor(make: string = "Generic", model: number = 2023) {
        super(make, model);
        this.driveType = this.getRandomDriveType();
        // Trucks have wider size range
        this.length = 250 + Math.random() * 200;
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
        
        const cabinHeight = 55;
        const trailerHeight = 75;
        const wheelRadius = 18;
        const wheelY = y;
        
        // Cabin/Tractor
        ctx.beginPath();
        ctx.moveTo(x, y - cabinHeight/2);
        ctx.lineTo(x + this.length * 0.05, y - cabinHeight);
        ctx.lineTo(x + this.length * 0.25, y - cabinHeight);
        ctx.lineTo(x + this.length * 0.3, y - cabinHeight/2);
        ctx.lineTo(x + this.length * 0.3, y - wheelRadius);
        ctx.quadraticCurveTo(x + this.length * 0.25, y, x + this.length * 0.2, y);
        ctx.lineTo(x + this.length * 0.05, y);
        ctx.quadraticCurveTo(x + this.length * 0.025, y, x, y - wheelRadius);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Connection between cab and trailer (fifth wheel coupling)
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.3, y - wheelRadius*1.5);
        ctx.lineTo(x + this.length * 0.32, y - wheelRadius*1.5);
        ctx.lineTo(x + this.length * 0.32, y - wheelRadius);
        ctx.lineTo(x + this.length * 0.3, y - wheelRadius);
        ctx.closePath();
        ctx.fillStyle = "darkgray";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Truck frame underneath between cab and trailer wheels
        ctx.beginPath();
        ctx.rect(x + this.length * 0.3, y - wheelRadius*0.8, this.length * 0.3, wheelRadius*0.4);
        ctx.fillStyle = "black";
        ctx.fill();
        
        // Trailer (box shape for cargo)
        ctx.beginPath();
        ctx.rect(x + this.length * 0.32, y - trailerHeight, this.length * 0.65, trailerHeight - wheelRadius);
        ctx.fillStyle = "lightgray"; // Different color from the cab
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Trailer detail lines
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.32, y - trailerHeight + trailerHeight/3);
        ctx.lineTo(x + this.length * 0.97, y - trailerHeight + trailerHeight/3);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.32, y - trailerHeight + 2*trailerHeight/3);
        ctx.lineTo(x + this.length * 0.97, y - trailerHeight + 2*trailerHeight/3);
        ctx.stroke();
        
        // Windows
        ctx.fillStyle = "lightblue";
        
        // Windshield
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.07, y - cabinHeight);
        ctx.lineTo(x + this.length * 0.10, y - cabinHeight * 1.3);
        ctx.lineTo(x + this.length * 0.22, y - cabinHeight * 1.3);
        ctx.lineTo(x + this.length * 0.25, y - cabinHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Side window
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.10, y - cabinHeight * 1.25);
        ctx.lineTo(x + this.length * 0.22, y - cabinHeight * 1.25);
        ctx.lineTo(x + this.length * 0.25, y - cabinHeight);
        ctx.lineTo(x + this.length * 0.07, y - cabinHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Single door - covers entire side of cabin
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Top of door follows window bottom
        ctx.moveTo(x + this.length * 0.07, y - cabinHeight);
        // Front edge
        ctx.lineTo(x + this.length * 0.07, y - wheelRadius*1.2);
        // Bottom edge
        ctx.lineTo(x + this.length * 0.25, y - wheelRadius*1.2);
        // Up to window
        ctx.lineTo(x + this.length * 0.25, y - cabinHeight);
        // Connect back to start
        ctx.closePath();
        ctx.stroke();
        
        // Door handle
        ctx.fillStyle = "white";
        ctx.fillRect(x + this.length * 0.15, y - cabinHeight * 0.7, 10, 4);
        
        // Cab Wheels with hubcaps - single front wheel
        const frontWheelX = x + this.length * 0.15; // Centered position for single front wheel
        
        // Draw single front wheel with rotation
        ctx.save();
        ctx.translate(frontWheelX, wheelY);
        
        // Tire
        ctx.beginPath();
        ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.strokeStyle = "darkgray";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Rim
        ctx.beginPath();
        ctx.arc(0, 0, wheelRadius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        
        // Hubcap details
        ctx.beginPath();
        ctx.arc(0, 0, wheelRadius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "darkgray";
        ctx.fill();
        
        // Spokes - truck wheels often have fewer, chunkier spokes
        ctx.strokeStyle = "darkgray";
        ctx.lineWidth = 3;
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * wheelRadius * 0.3, 
                       Math.sin(angle) * wheelRadius * 0.3);
            ctx.lineTo(Math.cos(angle) * wheelRadius * 0.7, 
                       Math.sin(angle) * wheelRadius * 0.7);
            ctx.stroke();
        }
        ctx.restore();
        
        // Trailer Wheels - dual pairs at the rear
        const rearWheelBase = x + this.length * 0.8;
        
        // Create multiple sets of paired wheels
        for (let i = 0; i < 2; i++) {
            const axleOffset = i * wheelRadius * 2.5;
            const rearWheelX = rearWheelBase - axleOffset;
            
            // Draw upper and lower wheels of a dual wheel setup
            [-0.15, 0.15].forEach(verticalOffset => {
                ctx.save();
                ctx.translate(rearWheelX, wheelY + verticalOffset * wheelRadius);
                
                // Tire
                ctx.beginPath();
                ctx.arc(0, 0, wheelRadius * 0.9, 0, Math.PI * 2);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.strokeStyle = "darkgray";
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Rim
                ctx.beginPath();
                ctx.arc(0, 0, wheelRadius * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.fill();
                
                // Hubcap
                ctx.beginPath();
                ctx.arc(0, 0, wheelRadius * 0.25, 0, Math.PI * 2);
                ctx.fillStyle = "darkgray";
                ctx.fill();
                
                ctx.restore();
            });
        }
        
        // Headlights
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.ellipse(x + this.length * 0.03, y - cabinHeight * 0.7, 6, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Taillights
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.ellipse(x + this.length * 0.97, y - trailerHeight * 0.4, 6, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Grille
        ctx.beginPath();
        ctx.rect(x + this.length * 0.03, y - cabinHeight * 0.4, this.length * 0.06, cabinHeight * 0.2);
        ctx.fillStyle = "darkgray";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        
        ctx.restore();
    }
    
    getDetails(): string[] {
        const baseDetails = super.getDetails();
        // Filter out color property from base details
        const filteredBaseDetails = baseDetails.filter(detail => !(detail.substring(0, 6) === 'Color:'));
        return [...filteredBaseDetails, `Drive Type: ${this.driveType}`]; // Add drive type to details
    }
}

// SUV class
class SUV extends Vehicle {
    private passengerCapacity: number;
    
    constructor(make: string = "Generic", model: number = 2023) {
        super(make, model);
        this.passengerCapacity = this.getRandomPassengerCapacity();
        // Increase passenger capacity impact and add more randomness
        this.length = 200 + (this.passengerCapacity * 25) + (Math.random() * 100);
    }
    
    private getRandomPassengerCapacity(): number {
        // SUVs typically have 5-8 passengers
        return Math.floor(5 + Math.random() * 4);
    }
    
    draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.save();
        
        const height = 55;
        const wheelRadius = 17;
        const wheelY = y;
        
        // SUV body
        ctx.beginPath();
        ctx.moveTo(x, y - height/2);
        ctx.lineTo(x + this.length * 0.1, y - height);
        ctx.lineTo(x + this.length * 0.9, y - height);
        ctx.lineTo(x + this.length, y - height/2);
        ctx.lineTo(x + this.length, y - wheelRadius);
        ctx.quadraticCurveTo(x + this.length * 0.9, y, x + this.length * 0.8, y);
        ctx.lineTo(x + this.length * 0.2, y);
        ctx.quadraticCurveTo(x + this.length * 0.1, y, x, y - wheelRadius);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // SUV roof - taller than a car
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.15, y - height);
        ctx.lineTo(x + this.length * 0.25, y - height * 1.6);
        ctx.lineTo(x + this.length * 0.85, y - height * 1.6);
        ctx.lineTo(x + this.length * 0.95, y - height);
        ctx.closePath();
        ctx.fillStyle = this.color; // Roof is body color
        ctx.fill();
        ctx.stroke();
        
        // Windows
        ctx.fillStyle = "lightblue";
        
        // Windshield
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.15, y - height);                 // Bottom-front of windshield body connection
        ctx.lineTo(x + this.length * 0.25, y - height * 1.5);           // Top-front of windshield
        ctx.lineTo(x + this.length * 0.4, y - height * 1.5);            // Top-rear of windshield (A-pillar top)
        ctx.lineTo(x + this.length * 0.4, y - height);                  // Bottom-rear of windshield (A-pillar bottom on body)
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Unified Side Window Area (behind A-pillar, for all side windows)
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.4, y - height);                  // Bottom-front (matches windshield bottom-rear/A-pillar bottom)
        ctx.lineTo(x + this.length * 0.4, y - height * 1.5);            // Top-front (matches windshield top-rear/A-pillar top)
        ctx.lineTo(x + this.length * 0.85, y - height * 1.5);           // Top-rear of overall side glass area (aligns with roof window line)
        ctx.lineTo(x + this.length * 0.95, y - height);                 // Bottom-rear of overall side glass area (angled to body)
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Stroke the outline of the entire side glass area

        // Door frames - SUV always has 2 doors on the visible side
        // These strokes will now appear on top of the unified lightblue side window area
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        const frontDoorStartPercentage = 0.15; 
        const frontDoorWindowAPillarTop = 0.25; 
        const frontDoorWindowBPillarTop = 0.43; // (0.45 - 0.02)
        const frontDoorBodyBPillar = 0.45; 

        const rearDoorBodyBPillar = 0.45;
        const rearDoorWindowBPillarTop = 0.47; // (0.45 + 0.02)
        const rearDoorWindowCPillarTop = 0.73; // (0.75 - 0.02)
        const rearDoorBodyCPillar = 0.75; 

        // Front door - straight back edge
        ctx.beginPath();
        ctx.moveTo(x + this.length * frontDoorStartPercentage, y - height);         // Bottom-front of door meets body
        ctx.lineTo(x + this.length * frontDoorWindowAPillarTop, y - height * 1.5);  // Top-front of door window (A-pillar region)
        ctx.lineTo(x + this.length * frontDoorBodyBPillar, y - height * 1.5);       // Straight top edge of door window
        ctx.lineTo(x + this.length * frontDoorBodyBPillar, y - height);             // Straight back edge, meets body (at B-pillar)
        ctx.lineTo(x + this.length * frontDoorBodyBPillar, y - wheelRadius * 1.2);  // Bottom-rear of door body
        ctx.lineTo(x + this.length * frontDoorStartPercentage, y - wheelRadius * 1.2); // Bottom-front of door body
        ctx.closePath();
        ctx.stroke();
        
        // Front door handle
        ctx.fillStyle = "white";
        ctx.fillRect(x + this.length * (frontDoorStartPercentage + 0.08), y - height * 0.8, 10, 4);
        
        // Rear door - straight edges on both sides
        ctx.beginPath();
        ctx.moveTo(x + this.length * rearDoorBodyBPillar, y - height);              // Bottom-front of rear door
        ctx.lineTo(x + this.length * rearDoorBodyBPillar, y - height * 1.5);        // Straight top-front edge
        ctx.lineTo(x + this.length * rearDoorBodyCPillar, y - height * 1.5);        // Straight top edge
        ctx.lineTo(x + this.length * rearDoorBodyCPillar, y - height);              // Straight top-back edge
        ctx.lineTo(x + this.length * rearDoorBodyCPillar, y - wheelRadius * 1.2);   // Bottom-rear of rear door body
        ctx.lineTo(x + this.length * rearDoorBodyBPillar, y - wheelRadius * 1.2);   // Bottom-front of rear door body
        ctx.closePath();
        ctx.stroke();
        
        // Rear door handle
        ctx.fillRect(x + this.length * (rearDoorBodyBPillar + 0.08), y - height * 0.8, 10, 4);
        
        // Note: The B-pillar and C-pillar are implicitly drawn by the trailing edge of the front door
        // and the leading/trailing edges of the rear door respectively when their paths are stroked.
        // No separate pillar drawing is needed if door outlines are complete.
        
        // Wheels with hubcaps
        const frontWheelX = x + this.length * 0.2;
        const rearWheelX = x + this.length * 0.8;
        
        // Draw both wheels with rotation
        [frontWheelX, rearWheelX].forEach(wheelX => {
            ctx.save();
            ctx.translate(wheelX, wheelY);
            
            // Tire
            ctx.beginPath();
            ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.strokeStyle = "darkgray";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Rim
            ctx.beginPath();
            ctx.arc(0, 0, wheelRadius * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
            
            // Hubcap details
            ctx.beginPath();
            ctx.arc(0, 0, wheelRadius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = "darkgray";
            ctx.fill();
            
            // Spokes - SUV often has decorative spokes
            ctx.strokeStyle = "darkgray";
            ctx.lineWidth = 2;
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(Math.cos(angle) * wheelRadius * 0.3, 
                           Math.sin(angle) * wheelRadius * 0.3);
                ctx.lineTo(Math.cos(angle) * wheelRadius * 0.7, 
                           Math.sin(angle) * wheelRadius * 0.7);
                ctx.stroke();
            }
            
            ctx.restore();
        });
        
        // Headlights
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.ellipse(x + this.length * 0.05, y - height * 0.7, 6, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Taillights
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.ellipse(x + this.length * 0.95, y - height * 0.7, 6, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Roof rails - typical for SUVs
        ctx.beginPath();
        ctx.moveTo(x + this.length * 0.3, y - height * 1.6);
        ctx.lineTo(x + this.length * 0.8, y - height * 1.6);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "silver";
        ctx.stroke();
        
        ctx.restore();
    }
    
    getDetails(): string[] {
        const baseDetails = super.getDetails();
        // Filter out color property from base details
        const filteredBaseDetails = baseDetails.filter(detail => !(detail.substring(0, 6) === 'Color:'));
        return [...filteredBaseDetails, `Passenger Capacity: ${this.passengerCapacity}`]; // Add passenger capacity to details
    }
}

// Flower class for drawing at the bottom of the canvas
class Flower {
    private color: string; // Petal color
    private x: number;
    private y: number;
    private size: number; // Base size, affects stem/leaf size, and base for petal size
    
    constructor(x: number, y: number) {
        this.x = x; // x-coordinate for the center base of the stem
        this.y = y; // y-coordinate for the bottom tip of the stem
        this.color = this.getRandomColor(); // Gets petal color
        this.size = 8 + Math.random() * 7; // Random size (8-15) for stem/leaf base
    }
    
    private getRandomColor(): string { // For Petals
        return getRandomRGBColor();
    }
    
    private getDarkerShade(color: string): string {
        // Extract RGB values from the color string
        if (color.indexOf("rgb(") === 0) {
            const parts = color.substring(4, color.length - 1).split(',').map(s => s.trim());
            let r = parseInt(parts[0]);
            let g = parseInt(parts[1]);
            let b = parseInt(parts[2]);

            r = Math.max(0, r - 50);
            g = Math.max(0, g - 50);
            b = Math.max(0, b - 50);

            return `rgb(${r},${g},${b})`;
        }
        
        // Fallback: return the original color
        return color;
    }

    private drawStemLeaf(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number, length: number, width: number, angle: number, color: string, outlineColor: string, outlineWidth: number): void {
        ctx.save();
        ctx.translate(xOffset, yOffset);
        ctx.rotate(angle);
        
        ctx.fillStyle = color;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = outlineWidth;

        ctx.beginPath();
        ctx.moveTo(0, 0); 
        ctx.bezierCurveTo(length * 0.4, -width * 0.8, length * 0.7, -width * 0.9, length, 0);
        ctx.bezierCurveTo(length * 0.7, width * 0.9, length * 0.4, width * 0.8, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(length * 0.1, 0); 
        ctx.quadraticCurveTo(length * 0.5, -width * 0.1, length * 0.85, 0); 
        ctx.strokeStyle = this.getDarkerShade(color); 
        ctx.lineWidth = outlineWidth * 0.6;
        ctx.stroke();

        ctx.restore();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x, this.y); // Move to the flower's anchor point (bottom of stem)

        const stemColorMain = "rgb(56, 118, 29)"; // RGB equivalent of #38761d
        const stemColorHighlight = "rgb(85, 139, 47)";
        const rosePetalColor = this.color;
        const roseDarkerPetalColor = this.getDarkerShade(this.color);
        const outlineColor = "rgb(0, 0, 0)"; // black in RGB
        
        const headRadius = this.size; // This is for stem and leaf scaling
        const petalRadius = headRadius * 2; // Petals will be twice as large relative to stem base
        
        // Outline width should be based on the visual element it's outlining.
        // For stem/leaves, it can be based on headRadius. For petals/sepals, on petalRadius.
        const stemOutlineWidth = Math.max(0.5, headRadius * 0.05);
        const petalOutlineWidth = Math.max(0.5, petalRadius * 0.05); 

        const stemHeight = headRadius * 2.8; // Stem height relative to its own scale
        const stemWidth = headRadius * 0.28;   // Stem width relative to its own scale

        // STEM
        ctx.fillStyle = stemColorMain;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = stemOutlineWidth;
        
        ctx.beginPath();
        ctx.rect(-stemWidth / 2, -stemHeight, stemWidth, stemHeight);
        ctx.fill();
        ctx.stroke();
        // Stem Highlight
        ctx.fillStyle = stemColorHighlight;
        ctx.beginPath();
        ctx.rect(-stemWidth / 2 * 0.6, -stemHeight * 0.95, stemWidth * 0.6, stemHeight * 0.9);
        ctx.fill();

        // LEAVES on STEM (Scaled by headRadius)
        this.drawStemLeaf(ctx, stemWidth * 0.3, -stemHeight * 0.35, headRadius * 0.9, headRadius * 0.45, Math.PI / 6, stemColorMain, outlineColor, stemOutlineWidth);
        this.drawStemLeaf(ctx, -stemWidth * 0.3, -stemHeight * 0.65, headRadius * 0.8, headRadius * 0.4, -Math.PI / 7, stemColorMain, outlineColor, stemOutlineWidth);
        
        ctx.translate(0, -stemHeight); // Move context to the base of the rose head (top of the stem)

        // SEPALS (Scaled by petalRadius)
        ctx.fillStyle = stemColorMain;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = petalOutlineWidth; // Use petal outline for sepals
        const sepalLength = petalRadius * 0.8;
        const sepalWidthBase = petalRadius * 0.15;
        for (let i = 0; i < 5; i++) {
            ctx.save();
            ctx.rotate( (i * Math.PI * 2) / 5 + Math.PI / 10 ); 
            ctx.beginPath();
            ctx.moveTo(0, -petalRadius * 0.1); // Base of sepal near center of petal base 
            ctx.lineTo(sepalWidthBase, -sepalLength * 0.6);
            ctx.lineTo(0, -sepalLength); 
            ctx.lineTo(-sepalWidthBase, -sepalLength * 0.6);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        // PETALS (Scaled by petalRadius)
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = petalOutlineWidth; // Use petal outline for petals

        const drawPetalShape = (pathAction: () => void, fillColor: string, noStroke?: boolean) => {
            ctx.beginPath();
            pathAction(); // This will use petalRadius for its calculations
            ctx.fillStyle = fillColor;
            ctx.fill();
            if (!noStroke) {
                ctx.stroke();
            }
        };
        
        // All petal coordinates are now relative to petalRadius
        drawPetalShape(() => {
            ctx.moveTo(0, -petalRadius * 0.2);
            ctx.bezierCurveTo(petalRadius * 0.7, -petalRadius * 0.5, petalRadius * 0.6, -petalRadius * 1.3, 0, -petalRadius * 1.5);
            ctx.bezierCurveTo(-petalRadius * 0.6, -petalRadius * 1.3, -petalRadius * 0.7, -petalRadius * 0.5, 0, -petalRadius * 0.2);
        }, rosePetalColor);

        drawPetalShape(() => {
            ctx.moveTo(-petalRadius * 0.1, -petalRadius * 0.25);
            ctx.bezierCurveTo(-petalRadius * 0.8, -petalRadius * 0.6, -petalRadius * 0.5, -petalRadius * 1.4, -petalRadius * 0.2, -petalRadius * 1.35);
            ctx.quadraticCurveTo(-petalRadius*0.05, -petalRadius*0.8, -petalRadius * 0.1, -petalRadius * 0.25);
        }, roseDarkerPetalColor);
        
        drawPetalShape(() => {
            ctx.moveTo(petalRadius * 0.1, -petalRadius * 0.25);
            ctx.bezierCurveTo(petalRadius * 0.8, -petalRadius * 0.6, petalRadius * 0.5, -petalRadius * 1.4, petalRadius * 0.2, -petalRadius * 1.35);
            ctx.quadraticCurveTo(petalRadius*0.05, -petalRadius*0.8, petalRadius * 0.1, -petalRadius * 0.25);
        }, roseDarkerPetalColor);

        drawPetalShape(() => {
            ctx.moveTo(-petalRadius*0.05, -petalRadius*0.1);
            ctx.bezierCurveTo(-petalRadius*0.5, -petalRadius*0.2, -petalRadius*0.3, -petalRadius*1.2, 0, -petalRadius*1.25);
            ctx.quadraticCurveTo(-petalRadius*0.1, -petalRadius*0.7, -petalRadius*0.05, -petalRadius*0.1);
        }, rosePetalColor);

        drawPetalShape(() => {
            ctx.moveTo(petalRadius*0.05, -petalRadius*0.1);
            ctx.bezierCurveTo(petalRadius*0.5, -petalRadius*0.2, petalRadius*0.3, -petalRadius*1.2, 0, -petalRadius*1.25);
            ctx.quadraticCurveTo(petalRadius*0.1, -petalRadius*0.7, petalRadius*0.05, -petalRadius*0.1);
        }, rosePetalColor);
        
        drawPetalShape(() => {
            ctx.moveTo(0, -petalRadius * 0.3);
            ctx.bezierCurveTo(petalRadius * 0.3, -petalRadius * 0.5, petalRadius * 0.15, -petalRadius * 1.1, 0, -petalRadius * 1.15);
            ctx.bezierCurveTo(-petalRadius * 0.15, -petalRadius * 1.1, -petalRadius * 0.3, -petalRadius * 0.5,0, -petalRadius * 0.3);
        }, roseDarkerPetalColor);

        drawPetalShape(() => {
            ctx.moveTo(0, -petalRadius * 0.8);
            ctx.bezierCurveTo(petalRadius * 0.1, -petalRadius * 0.85, petalRadius * 0.05, -petalRadius * 1.0, 0, -petalRadius * 1.05);
            ctx.bezierCurveTo(-petalRadius * 0.05, -petalRadius * 1.0, -petalRadius * 0.1, -petalRadius * 0.85, 0, -petalRadius * 0.8);
        }, rosePetalColor);
        
        drawPetalShape(() => {
            ctx.arc(0, -petalRadius * 0.9, petalRadius * 0.1, 0, Math.PI * 2);
        }, this.getDarkerShade(roseDarkerPetalColor), true);

        ctx.restore();
    }

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
    
    let currentVehicle: Vehicle | null = null;
    
    // Function to generate random flower count between 6 and 12 inclusive
    function getRandomFlowerCount(): number {
        // Return a random number between 6 and 12 inclusive
        return 6 + Math.floor(Math.random() * 7);
    }
    
    // Function to create flowers with random count
    function createFlowers(): Flower[] {
        const flowerCount = getRandomFlowerCount();
        const flowers: Flower[] = [];
        
        // Calculate spacing based on canvas width and flower count
        const spacing = canvas.width / (flowerCount + 1);
        
        for (let i = 0; i < flowerCount; i++) {
            // Place flowers lower in the grass area to prevent road overlap
            flowers.push(new Flower(spacing * (i + 1), canvas.height - 25));
        }
        
        return flowers;
    }
    
    // Initialize flowers array
    let flowers: Flower[] = createFlowers();
    
    // Function to clear canvas and draw flowers and road
    function clearAndDrawBackground() {
        if (!ctx) {
            console.error("Canvas context is null");
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw sky
        ctx.fillStyle = "#87CEEB";  // Sky blue
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Road dimensions - make the road taller to prevent floating vehicles
        const roadHeight = 90;
        const roadY = canvas.height - 140;
        
        // Draw road - expanded to be wider and taller
        ctx.fillStyle = "#555555";  // Dark gray for asphalt
        ctx.fillRect(0, roadY, canvas.width, roadHeight);
        
        // Road markings - center dashed line
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.setLineDash([20, 15]);
        ctx.beginPath();
        ctx.moveTo(0, roadY + roadHeight/2);
        ctx.lineTo(canvas.width, roadY + roadHeight/2);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Road edges - solid white lines
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, roadY);
        ctx.lineTo(canvas.width, roadY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, roadY + roadHeight);
        ctx.lineTo(canvas.width, roadY + roadHeight);
        ctx.stroke();
        
        // Green grass at the bottom for flowers
        ctx.fillStyle = "#228B22";  // Forest green
        ctx.fillRect(0, canvas.height - 70, canvas.width, 70);
        
        // Draw the flowers
        flowers.forEach(flower => {
            flower.draw(ctx);
        });
    }
    
    // Function to display vehicle details
    function displayVehicleDetails(details: string[]) {
        if (!ctx) return;
        
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
    
    // Function to show vehicle
    function showVehicle(vehicle: Vehicle) {
        // Update current vehicle
        currentVehicle = vehicle;
        
        // Create new flowers
        flowers = createFlowers();
        
        // Clear canvas and draw background
        clearAndDrawBackground();
        
        // Draw the vehicle at center position
        if (ctx) {
            vehicle.draw(ctx, canvas.width / 2 - 150, canvas.height - 125);
            displayVehicleDetails(vehicle.getDetails());
        }
    }
    
    // Event listeners for buttons
    carButton?.addEventListener("click", () => {
        const car = new Car(getRandomMake(), getRandomModel());
        showVehicle(car);
    });
    
    truckButton?.addEventListener("click", () => {
        const truck = new Truck(getRandomMake(), getRandomModel());
        showVehicle(truck);
    });
    
    suvButton?.addEventListener("click", () => {
        const suv = new SUV(getRandomMake(), getRandomModel());
        showVehicle(suv);
    });
    
    // Helper functions to generate random makes and models
    function getRandomMake(): string {
        const makes = ["BMW", "Toyota", "Volvo"];
        return makes[Math.floor(Math.random() * makes.length)];
    }
    
    function getRandomModel(): number {
        // Model year between 2010 and 2025
        return 2010 + Math.floor(Math.random() * 16);
    }
    
    // Initial draw of background
    clearAndDrawBackground();
}

// Execute main when DOM is loaded
window.addEventListener("DOMContentLoaded", main);

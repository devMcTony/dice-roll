var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Define available colors
var COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];
// Base Vehicle class
var Vehicle = /** @class */ (function () {
    function Vehicle(make, model) {
        this.make = make;
        this.model = model;
        this.color = this.getRandomColor();
        this.length = this.getRandomLength();
        this.mileage = this.getRandomMileage();
        this.price = this.getRandomPrice();
    }
    // Get a random color from available colors
    Vehicle.prototype.getRandomColor = function () {
        var num = Math.random();
        if (num < 1 / 6) {
            return COLORS[0];
        }
        else if (num < 2 / 6) {
            return COLORS[1];
        }
        else if (num < 3 / 6) {
            return COLORS[2];
        }
        else if (num < 4 / 6) {
            return COLORS[3];
        }
        else if (num < 5 / 6) {
            return COLORS[4];
        }
        else {
            return COLORS[5];
        }
    };
    // Get a random length for the vehicle
    Vehicle.prototype.getRandomLength = function () {
        // Base length between 150 and 250
        return 150 + Math.random() * 100;
    };
    // Get a random mileage
    Vehicle.prototype.getRandomMileage = function () {
        return Math.floor(1000 + Math.random() * 99000);
    };
    // Get a random price
    Vehicle.prototype.getRandomPrice = function () {
        return Math.floor(5000 + Math.random() * 45000);
    };
    // Method to get vehicle details
    Vehicle.prototype.getDetails = function () {
        return [
            "Make: ".concat(this.make),
            "Model: ".concat(this.model),
            "Mileage: ".concat(this.mileage.toLocaleString(), " miles"),
            "Price: $".concat(this.price.toLocaleString()),
            "Color: ".concat(this.color)
        ];
    };
    return Vehicle;
}());
// Car class
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(make, model) {
        if (make === void 0) { make = "Generic"; }
        if (model === void 0) { model = 2023; }
        var _this = _super.call(this, make, model) || this;
        _this.doors = _this.getRandomDoors();
        // Adjust length based on number of doors
        _this.length = 150 + (_this.doors * 25) + (Math.random() * 50);
        return _this;
    }
    Car.prototype.getRandomDoors = function () {
        var num = Math.random();
        if (num < 0.2) {
            return 2; // Sports car (20% chance)
        }
        else {
            return 4; // Regular car (80% chance)
        }
    };
    Car.prototype.draw = function (ctx, x, y) {
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
        }
        else {
            // Four smaller windows for 4-door car
            ctx.fillRect(x + this.length * 0.25, y - 45, this.length * 0.2, 15);
            ctx.fillRect(x + this.length * 0.55, y - 45, this.length * 0.2, 15);
        }
        ctx.restore();
    };
    Car.prototype.getDetails = function () {
        var baseDetails = _super.prototype.getDetails.call(this);
        return __spreadArray(__spreadArray([], baseDetails, true), ["Doors: ".concat(this.doors)], false);
    };
    return Car;
}(Vehicle));
// Truck class
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(make, model) {
        if (make === void 0) { make = "Generic"; }
        if (model === void 0) { model = 2023; }
        var _this = _super.call(this, make, model) || this;
        _this.driveType = _this.getRandomDriveType();
        // Trucks are generally longer
        _this.length = 200 + Math.random() * 100;
        return _this;
    }
    Truck.prototype.getRandomDriveType = function () {
        var num = Math.random();
        if (num < 0.6) {
            return "4WD";
        }
        else if (num < 0.9) {
            return "2WD";
        }
        else {
            return "AWD";
        }
    };
    Truck.prototype.draw = function (ctx, x, y) {
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
    };
    Truck.prototype.getDetails = function () {
        var baseDetails = _super.prototype.getDetails.call(this);
        return __spreadArray(__spreadArray([], baseDetails, true), ["Drive Type: ".concat(this.driveType)], false);
    };
    return Truck;
}(Vehicle));
// SUV class
var SUV = /** @class */ (function (_super) {
    __extends(SUV, _super);
    function SUV(make, model) {
        if (make === void 0) { make = "Generic"; }
        if (model === void 0) { model = 2023; }
        var _this = _super.call(this, make, model) || this;
        _this.passengerCapacity = _this.getRandomPassengerCapacity();
        // Adjust length based on passenger capacity
        _this.length = 180 + (_this.passengerCapacity * 15) + (Math.random() * 50);
        return _this;
    }
    SUV.prototype.getRandomPassengerCapacity = function () {
        // SUVs typically have 5-8 passengers
        return Math.floor(5 + Math.random() * 4);
    };
    SUV.prototype.draw = function (ctx, x, y) {
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
        var windowCount = Math.min(4, Math.ceil(this.passengerCapacity / 2));
        var windowWidth = (this.length * 0.7) / windowCount;
        for (var i = 0; i < windowCount; i++) {
            ctx.fillRect(x + this.length * 0.15 + (i * windowWidth), y - 60, windowWidth * 0.8, 20);
        }
        ctx.restore();
    };
    SUV.prototype.getDetails = function () {
        var baseDetails = _super.prototype.getDetails.call(this);
        return __spreadArray(__spreadArray([], baseDetails, true), ["Passenger Capacity: ".concat(this.passengerCapacity)], false);
    };
    return SUV;
}(Vehicle));
// Flower class for drawing at the bottom of the canvas
var Flower = /** @class */ (function () {
    function Flower(x, y) {
        this.x = x;
        this.y = y;
        this.color = this.getRandomColor();
    }
    Flower.prototype.getRandomColor = function () {
        var num = Math.random();
        if (num < 1 / 6) {
            return "pink";
        }
        else if (num < 2 / 6) {
            return "red";
        }
        else if (num < 3 / 6) {
            return "yellow";
        }
        else if (num < 4 / 6) {
            return "white";
        }
        else if (num < 5 / 6) {
            return "purple";
        }
        else {
            return "orange";
        }
    };
    Flower.prototype.draw = function (ctx) {
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
        var petalSize = Flower.PETAL_SIZE; // Use the static constant size
        // Draw 5 petals
        for (var i = 0; i < 5; i++) {
            var angle = (i / 5) * Math.PI * 2;
            var petalX = this.x + Math.cos(angle) * petalSize;
            var petalY = (this.y - 20) + Math.sin(angle) * petalSize;
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
    };
    // Regenerate flower color
    Flower.prototype.regenerateColor = function () {
        this.color = this.getRandomColor();
    };
    Flower.PETAL_SIZE = 5; // Constant petal size for all flowers
    return Flower;
}());
// Main function to setup the canvas and event listeners
function main() {
    var canvas = document.getElementById("vehicleCanvas");
    var ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Could not get canvas context");
        return;
    }
    // Create buttons
    var carButton = document.getElementById("carButton");
    var truckButton = document.getElementById("truckButton");
    var suvButton = document.getElementById("suvButton");
    // Function to generate random flower count between 1 and 6 inclusive
    function getRandomFlowerCount() {
        var num = Math.random();
        if (num < 1 / 6) {
            return 1;
        }
        else if (num < 2 / 6) {
            return 2;
        }
        else if (num < 3 / 6) {
            return 3;
        }
        else if (num < 4 / 6) {
            return 4;
        }
        else if (num < 5 / 6) {
            return 5;
        }
        else {
            return 6;
        }
    }
    // Function to create flowers with random count
    function createFlowers() {
        var flowerCount = getRandomFlowerCount();
        var flowers = [];
        // Calculate spacing based on canvas width and flower count
        var spacing = canvas.width / (flowerCount + 1);
        for (var i = 0; i < flowerCount; i++) {
            flowers.push(new Flower(spacing * (i + 1), canvas.height - 50));
        }
        return flowers;
    }
    // Initialize flowers array
    var flowers = createFlowers();
    // Function to clear canvas and draw flowers
    function clearAndDrawFlowers() {
        if (!ctx) {
            console.error("Canvas context is null");
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw ground
        ctx.fillStyle = "#8B4513"; // Brown color for ground
        ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
        ctx.fillStyle = "#228B22"; // Green for grass
        ctx.fillRect(0, canvas.height - 50, canvas.width, 10);
        // Create new flowers with random count
        flowers = createFlowers();
        // Draw the flowers
        flowers.forEach(function (flower) {
            flower.draw(ctx);
        });
    }
    // Function to display vehicle details
    function displayVehicleDetails(details) {
        if (!ctx)
            return;
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        // Draw info box
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillRect(canvas.width - 250, 20, 230, 30 + details.length * 25);
        ctx.fillStyle = "black";
        ctx.font = "bold 16px Arial";
        ctx.fillText("Vehicle Details", canvas.width - 240, 40);
        ctx.font = "14px Arial";
        details.forEach(function (detail, index) {
            ctx.fillText(detail, canvas.width - 240, 65 + index * 25);
        });
    }
    // Event listeners for buttons
    carButton === null || carButton === void 0 ? void 0 : carButton.addEventListener("click", function () {
        clearAndDrawFlowers();
        var car = new Car(getRandomMake(), getRandomModel());
        car.draw(ctx, canvas.width / 2 - 150, canvas.height - 100);
        displayVehicleDetails(car.getDetails());
    });
    truckButton === null || truckButton === void 0 ? void 0 : truckButton.addEventListener("click", function () {
        clearAndDrawFlowers();
        var truck = new Truck(getRandomMake(), getRandomModel());
        truck.draw(ctx, canvas.width / 2 - 150, canvas.height - 100);
        displayVehicleDetails(truck.getDetails());
    });
    suvButton === null || suvButton === void 0 ? void 0 : suvButton.addEventListener("click", function () {
        clearAndDrawFlowers();
        var suv = new SUV(getRandomMake(), getRandomModel());
        suv.draw(ctx, canvas.width / 2 - 150, canvas.height - 100);
        displayVehicleDetails(suv.getDetails());
    });
    // Helper functions to generate random makes and models
    function getRandomMake() {
        var makes = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes", "Audi", "Volvo", "Tesla"];
        return makes[Math.floor(Math.random() * makes.length)];
    }
    function getRandomModel() {
        // Model year between 2010 and 2025
        return 2010 + Math.floor(Math.random() * 16);
    }
    // Initial draw
    clearAndDrawFlowers();
}
// Execute main when DOM is loaded
window.addEventListener("DOMContentLoaded", main);

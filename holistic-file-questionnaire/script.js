import { createSVGWheel } from "./svg-manipulation.js";
import { updateServiceDescription } from "./growth-services.js";
import { HolisticGrowthWheelPresentation } from "./holistic-growth-wheel-presentation.js";

// Create the SVG wheel
createSVGWheel(true);  // Set to true to make the wheel interactive

// Initialize the service description
updateServiceDescription('');

// Create and initialize the Holistic Growth Wheel presentation
const presentation = new HolisticGrowthWheelPresentation();
presentation.initialize();
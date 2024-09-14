import { createSVGWheel } from "./svg-manipulation.js";
import { updateServiceDescription } from "./growth-services.js";
import { HolisticGrowthWheelPresentation } from "./holistic-growth-wheel-presentation.js";
import { closePopup } from "./popup.js";

// Create the SVG wheel
createSVGWheel(true);  // Set to true to make the wheel interactive

// Create and initialize the Holistic Growth Wheel presentation
new HolisticGrowthWheelPresentation();

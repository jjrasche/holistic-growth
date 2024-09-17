
import { states, colors, domains, unHighlightOpacity, highlightOpacity } from "./constants.js";
import { createSVGElement } from "./svg-manipulation.js"
import { openDomainPopup, openSectionPopup } from "./popup.js";

export function unHighlightAllSections() {
    document.querySelectorAll('path').forEach(path => {
        path.setAttribute('fill-opacity', unHighlightOpacity);
    });
}

export function highlightSection(domain, state) {   
    const path = document.querySelector(`path[data-domain="${domain}"][data-state="${state}"]`);
    if (path) {
        path.setAttribute('fill-opacity', highlightOpacity);
    }
}

export function highlightDomain(domain) {   
    states.forEach(state => highlightSection(domain, state));
    const label = document.querySelector(`text[data-domain="${domain}"]`);
    highlightLabel(label);
}

export function highlightLabel(label) {
    label.setAttribute('font-size', '28');
    label.setAttribute('font-weight', '850');
}

export function normalizeLabel(label) {
    label.setAttribute('font-size', '22');
    label.setAttribute('font-weight', 'bold');
}

export function unHighlightDomain(domain) {
    unHighlightAllSections();
    const label = document.querySelector(`text[data-domain="${domain}"]`);
    normalizeLabel(label);
}

export function handleSectionClick(event) {
    const domain = event.target.getAttribute('data-domain');
    const state = event.target.getAttribute('data-state');
    unHighlightAllSections();
    highlightSection(domain, state);
    openSectionPopup(domain, state)
}

export function handleDomainClick(event) {
    const domain = event.target.getAttribute('data-domain');
    openDomainPopup(domain);
}





// Function to create a 3D-like effect
export function create3DEffect(path, depth = 5) {
    const originalColor = path.getAttribute("fill");
    const darkerColor = adjustColor(originalColor, -30); // 30% darker

    const shadowPath = path.cloneNode(true);
    shadowPath.setAttribute("fill", darkerColor);
    shadowPath.setAttribute("transform", `translate(${depth}, ${depth})`);
    path.parentNode.insertBefore(shadowPath, path);
}

// Helper function to adjust color brightness
function adjustColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

export function enhancedHighlightSection(domain, state, options = 
    { depth: true, depthAmount: 5 }
) {
    const path = document.querySelector(`path[data-domain="${domain}"][data-state="${state}"]`);
    if (path) {
        // Reset any previous highlighting
        // path.removeAttribute("stroke");
        // path.removeAttribute("stroke-width");
        path.removeAttribute("filter");
        path.removeAttribute("transform");
        path.setAttribute("fill", colors[domains.indexOf(domain)]);

        // Apply new highlighting based on options
        if (options.raised) createRaisedEffect(path, options.raisedHeight, options.shadowBlur);
        if (options.cutout) createCutoutEffect(path, options.cutoutDepth, options.highlightStrength, options.shadowStrength);
        if (options.neon) createNeonEffect(path, options.neonColor, options.blurRadius, options.neonStrength);
        // Apply new highlighting based on options
        if (options.stroke) addStrokeHighlight(path, options.strokeColor, options.strokeWidth);
        if (options.glow) addGlowEffect(path, options.glowColor, options.glowRadius);
        if (options.fillColor) changeFillColor(path, options.fillColor);
        if (options.pattern) addPattern(path, options.patternId);
        if (options.animate) animateSection(path);
        if (options.scale) scaleSection(path, options.scaleAmount, options.moveOutward);
        if (options.depth) create3DEffect(path, options.depthAmount);
        
    }
}
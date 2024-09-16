import { handleSectionClick } from "./wheel-manipulation.js"
import { domains, states, colors, unHighlightOpacity } from "./constants.js";
import { handleDomainClick } from "./wheel-manipulation.js";

export const svgWidth = 900;
export const svgHeight = 650;

export function createSVGWheel(interactive) {
    const svg = document.getElementById('growth-wheel');
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    const wheelGroup = createSVGElement('g', { transform: `translate(${svgWidth/2}, ${svgHeight/2})` });
    svg.appendChild(wheelGroup);
    domains.forEach(domain => wheelGroup.appendChild(renderSector(domain, interactive)));
}

export function createSVGElement(type, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', type);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

function getSector(sector, interactive) {
    const index = domains.findIndex(d => d === sector)
    const angle = (2 * Math.PI) / domains.length;
    return {
        text: sector,
        index,
        svg: createSVGElement('g', {}),
        startAngle: index * angle - Math.PI / 2,
        endAngle: (index + 1) * angle - Math.PI / 2,
        interactive
    }
}

function getState(state) {
    const index = states.findIndex(s => s === state);
    const innerRadius = 80 + index * 40;
    const outerRadius = innerRadius + 40;
    return { 
        text: state,
        index,
        innerRadius,
        outerRadius
    };
}

export function renderSector(domain, interactive) {
    const sector = getSector(domain, interactive);

    states.forEach(state => {
        state = getState(state);
        const path = renderSectionFill(sector, state);
        renderSectionLabel(sector, state);
        if (interactive) {
            path.addEventListener('click', handleSectionClick);
        }
    });
    renderSectorTitle(sector);

    return sector.svg;
}

function renderSectionLabel(sector, state) {
    const midAngle = (sector.startAngle + sector.endAngle) / 2;
    const midRadius = (state.innerRadius + state.outerRadius) / 2;
    const labelX = midRadius * Math.cos(midAngle);
    const labelY = midRadius * Math.sin(midAngle);

    const text = createSVGElement('text', {
        x: labelX,
        y: labelY,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        transform: `rotate(${(midAngle * 180) / Math.PI + 90}, ${labelX}, ${labelY})`,
        'font-size': '14',
        fill: 'white',
        'pointer-events': 'none'
    });
    text.textContent = state.text;
    sector.svg.appendChild(text);
}

function renderSectionFill(sector, state) {
    const x1 = state.innerRadius * Math.cos(sector.startAngle);
    const y1 = state.innerRadius * Math.sin(sector.startAngle);
    const x2 = state.outerRadius * Math.cos(sector.startAngle);
    const y2 = state.outerRadius * Math.sin(sector.startAngle);
    const x3 = state.outerRadius * Math.cos(sector.endAngle);
    const y3 = state.outerRadius * Math.sin(sector.endAngle);
    const x4 = state.innerRadius * Math.cos(sector.endAngle);
    const y4 = state.innerRadius * Math.sin(sector.endAngle);
    
    const path = createSVGElement('path', {
        d: `M ${x1} ${y1} L ${x2} ${y2} A ${state.outerRadius} ${state.outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${state.innerRadius} ${state.innerRadius} 0 0 0 ${x1} ${y1}`,
        fill: colors[sector.index],
        'fill-opacity': unHighlightOpacity,
        stroke: 'white',
        'data-domain': sector.text,
        'data-state': state.text
    });
    sector.svg.appendChild(path);
    return path;
}

function renderSectorTitle(sector) {
    const labelAngle = (sector.startAngle + sector.endAngle) / 2;
    const labelRadius = 300;
    const labelX = labelRadius * Math.cos(labelAngle);
    const labelY = labelRadius * Math.sin(labelAngle);

    const domainLabel = createSVGElement('text', {
        x: labelX,
        y: labelY,
        'text-anchor': labelX > 0 ? 'start' : 'end',
        'dominant-baseline': 'middle',
        'font-size': '22',
        'font-weight': 'bold',
        fill: colors[sector.index],
        'data-domain': sector.text,
        cursor: 'pointer'
    });
    domainLabel.textContent = sector.text;
    if (sector.interactive) {
        domainLabel.addEventListener('click', handleDomainClick);
    }

    sector.svg.appendChild(domainLabel);
}

function createElement(tag, options) {
    const svg = document.getElementById('growth-wheel');
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    applyAttributes(element, options);
    svg.appendChild(element);
    return element;
}

const overlayLabelPadding = 50;

export function typeOfEffertOverlay() {
    const internalExternalLineElement = createElement('line', { id: 'line', x1: svgWidth/2, y1: 0, x2: svgWidth/2, y2: svgHeight, stroke: 'black', 'stroke-dasharray': '5,5' });
    const externalLabelElement = createElement('text', { id: 'external-label', x: '75%' , y: overlayLabelPadding, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 'bold' });
    externalLabelElement.textContent = `External Efforts`;
    const internalLabelElement = createElement('text', { id: 'internal-label', x: '25%', y: overlayLabelPadding, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 'bold' });
    internalLabelElement.textContent = 'Internal Efforts'
    return [ internalExternalLineElement, externalLabelElement, internalLabelElement ];
}

const labelOptions = { 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 'bold' };
export function measureGrowthOverlay() {
    const horizontalLineElement = createElement('line', { id: 'line', x1: 0, y1: svgHeight/2, x2: svgWidth, y2: svgHeight/2, stroke: 'black', 'stroke-dasharray': '5,5' });
    const subjectiveLabelElement = createElement('text', { id: 'subjective-label', x: svgWidth/2, y: overlayLabelPadding, ...labelOptions});
    subjectiveLabelElement.textContent = 'Subjective Measures';
    const objectiveLabelElement = createElement('text', { id: 'objective-label', x: svgWidth/2, y: (svgHeight - overlayLabelPadding), ...labelOptions });
    objectiveLabelElement.textContent = 'Objective Measures';
    return [horizontalLineElement, subjectiveLabelElement, objectiveLabelElement];
}

const defaultOverlayOptions = { fill: '#FFD700', opacity: 0.2 };
export function innerLandscapeOverlay() {
    let elements = typeOfEffertOverlay();
    const svg = document.getElementById('growth-wheel');
    const options = { id: 'overlay', x: 0, y: 0, width: svgWidth/2, height: svgHeight, ...defaultOverlayOptions};
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    applyAttributes(overlay, options);
    svg.appendChild(overlay);
    return elements.concat([overlay]);
}

export function outerExpressionOverlay() {
    let elements = typeOfEffertOverlay();
    const svg = document.getElementById('growth-wheel');
    const options = { id: 'overlay', x: svgWidth/2, y: 0, width: svgWidth/2, height: svgHeight, ...defaultOverlayOptions};
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    applyAttributes(overlay, options);
    svg.appendChild(overlay);
    return elements.concat([overlay]);
}

export function subjectiveMeasuresOverlay() {
    let elements = measureGrowthOverlay();
    const svg = document.getElementById('growth-wheel');
    const options = { id: 'overlay', y: 0, x: 0, width: svgWidth, height: svgHeight/2, ...defaultOverlayOptions };
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    applyAttributes(overlay, options);
    svg.appendChild(overlay);
    return elements.concat([overlay]);
}

export function objectiveMeasuresOverlay() {
    let elements = measureGrowthOverlay();
    const svg = document.getElementById('growth-wheel');
    const options = { id: 'overlay', y: svgHeight/2, x: 0, width: svgWidth, height: svgHeight/2, ...defaultOverlayOptions };
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    applyAttributes(overlay, options);
    svg.appendChild(overlay);
    return elements.concat([overlay]);
}

function applyAttributes(element, options) {
    for (const [key, value] of Object.entries(options)) {
        element.setAttribute(key, value);
    }
}
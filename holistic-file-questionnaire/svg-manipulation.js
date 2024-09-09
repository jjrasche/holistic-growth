import { handleSectionClick } from "./wheel-manipulation.js"
import { domains, states, colors, unHighlightOpacity } from "./constants.js";
import { handleDomainClick } from "./wheel-manipulation.js";


export function createSVGWheel(interactive) {
    const svg = document.getElementById('growth-wheel');
    domains.forEach(domain => svg.appendChild(renderSector(domain, interactive)));
}

function createSVGElement(type, attributes) {
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


// section
function renderSectionLabel(sector, state) {
    const midAngle = (sector.startAngle + sector.endAngle) / 2;
    const midRadius = (state.innerRadius + state.outerRadius) / 2;
    const labelX = 300 + midRadius * Math.cos(midAngle);
    const labelY = 300 + midRadius * Math.sin(midAngle);

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
    const x1 = 300 + state.innerRadius * Math.cos(sector.startAngle);
    const y1 = 300 + state.innerRadius * Math.sin(sector.startAngle);
    const x2 = 300 + state.outerRadius * Math.cos(sector.startAngle);
    const y2 = 300 + state.outerRadius * Math.sin(sector.startAngle);
    const x3 = 300 + state.outerRadius * Math.cos(sector.endAngle);
    const y3 = 300 + state.outerRadius * Math.sin(sector.endAngle);
    const x4 = 300 + state.innerRadius * Math.cos(sector.endAngle);
    const y4 = 300 + state.innerRadius * Math.sin(sector.endAngle);
    
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
    const labelX = 300 + labelRadius * Math.cos(labelAngle);
    const labelY = 300 + labelRadius * Math.sin(labelAngle);

    const domainLabel = createSVGElement('text', {
        x: labelX,
        y: labelY,
        'text-anchor': labelX > 300 ? 'start' : 'end',
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
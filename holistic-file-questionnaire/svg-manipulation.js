import { handleSectionClick } from "./wheel-manipulation.js"
import { domains, states, colors, unHighlightOpacity } from "./constants.js";
import { handleDomainClick } from "./wheel-manipulation.js";


function createSVGElement(type, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', type);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

export function renderSector(domain, index) {
    const angle = (2 * Math.PI) / domains.length;
    const startAngle = index * angle - Math.PI / 2;
    const endAngle = (index + 1) * angle - Math.PI / 2;

    const group = createSVGElement('g', {});

    states.forEach((state, stateIndex) => {
        const innerRadius = 80 + stateIndex * 40;
        const outerRadius = innerRadius + 40;

        const x1 = 300 + innerRadius * Math.cos(startAngle);
        const y1 = 300 + innerRadius * Math.sin(startAngle);
        const x2 = 300 + outerRadius * Math.cos(startAngle);
        const y2 = 300 + outerRadius * Math.sin(startAngle);
        const x3 = 300 + outerRadius * Math.cos(endAngle);
        const y3 = 300 + outerRadius * Math.sin(endAngle);
        const x4 = 300 + innerRadius * Math.cos(endAngle);
        const y4 = 300 + innerRadius * Math.sin(endAngle);

        const path = createSVGElement('path', {
            d: `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`,
            fill: colors[index],
            'fill-opacity': unHighlightOpacity,
            stroke: 'white',
            'data-domain': domain,
            'data-state': state
        });

        path.addEventListener('click', handleSectionClick);

        const midAngle = (startAngle + endAngle) / 2;
        const midRadius = (innerRadius + outerRadius) / 2;
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
        text.textContent = state;

        group.appendChild(path);
        group.appendChild(text);
    });

    const labelAngle = (startAngle + endAngle) / 2;
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
        fill: colors[index],
        'data-domain': domain,
        cursor: 'pointer'
    });
    domainLabel.textContent = domain;
    domainLabel.addEventListener('click', handleDomainClick);

    group.appendChild(domainLabel);

    return group;
}
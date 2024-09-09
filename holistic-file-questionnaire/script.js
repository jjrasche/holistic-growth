import { domains, states, colors, highlightOpacity, unHighlightOpacity, examples, serviceAreas, domainInvolves } from './constants.js';

function createSVGElement(type, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', type);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

function renderSector(domain, index) {
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

function handleSectionClick(event) {
    const domain = event.target.getAttribute('data-domain');
    const state = event.target.getAttribute('data-state');

    document.querySelectorAll('path').forEach(path => {
        path.setAttribute('fill-opacity', unHighlightOpacity);
    });
    event.target.setAttribute('fill-opacity', highlightOpacity);
    document.getElementById('service-select').value = '';

    const popupContent = document.getElementById('popup-content');

    // Find relevant services for the selected domain and state
    const relevantServices = Object.keys(serviceAreas).filter(service => {
        const areas = serviceAreas[service].areas;
        return areas[domain] && areas[domain].includes(state);
    });

    const servicesList = relevantServices.map(service => {
        return service.charAt(0).toUpperCase() + service.slice(1).replace('-', ' ');
    }).join(', ');

    if (state === 'Flourishing') {
        popupContent.innerHTML = `
            <h3>${domain} - ${state}</h3>
            <p><strong>Description:</strong> ${examples[domain][state]}</p>
            <p><strong>Example Goal:</strong> Congratulations! You've reached the highest level in this domain.</p>
            <p><strong>Growth Services:</strong> ${servicesList}</p>
        `;
    } else {
        const nextState = states[states.indexOf(state) + 1];
        popupContent.innerHTML = `
            <h3>${domain}: ${state} to ${nextState}</h3>
            <p><strong>Description:</strong> ${examples[domain][state]}</p>
            <p><strong>Example Goal:</strong> ${examples[domain][`${state} to ${nextState}`]}</p>
            <p><strong>Growth Services:</strong> ${servicesList}</p>
        `;
    }

    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function handleDomainClick(event) {
    const domain = event.target.getAttribute('data-domain');
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = `
        <h3>${domain}</h3>
        <p><strong>Involves:</strong> ${domainInvolves[domain]}</p>
    `;
    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

function initializeWheel() {
    const svg = document.getElementById('growth-wheel');
    domains.forEach((domain, index) => {
        const sector = renderSector(domain, index);
        svg.appendChild(sector);
    });
}

// Initialize the wheel on page load
initializeWheel();

// Close popup when clicking outside
document.getElementById('popup-overlay').addEventListener('click', closePopup);

// Prevent closing when clicking inside the popup
document.getElementById('popup').addEventListener('click', function(event) {
    event.stopPropagation();
});

// Close popup with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});

// Close popup with back swipe on mobile
let touchstartX = 0;
let touchendX = 0;

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchendX < touchstartX) {
        closePopup();
    }
}

document.getElementById('service-select').addEventListener('change', function(event) {
    const selectedService = event.target.value;
    highlightServiceAreas(selectedService);
    updateServiceDescription(selectedService);
});

function highlightServiceAreas(service) {
    document.querySelectorAll('path').forEach(path => {
        path.setAttribute('fill-opacity', unHighlightOpacity);
    });

    const serviceInfo = serviceAreas[service];
    if (service && serviceInfo) {
        for (const domain in serviceInfo.areas) {
            serviceInfo.areas[domain].forEach(state => {
                const path = document.querySelector(`path[data-domain="${domain}"][data-state="${state}"]`);
                if (path) {
                    path.setAttribute('fill-opacity', highlightOpacity);
                }
            });
        }
    }

    closePopup();
}

function updateServiceDescription(service) {
    const descriptionElement = document.getElementById('service-description');
    if (!service) {
        descriptionElement.innerHTML = '<p>Select a service to see its description and typical areas of impact.</p>';
        return;
    }

    const serviceInfo = serviceAreas[service];
    let description = `<h3>${service.charAt(0).toUpperCase() + service.slice(1).replace('-', ' ')}</h3>`;
    description += `<p>${serviceInfo.description}</p>`;
    description += '<p>This service typically helps in the following areas:</p><ul>';

    for (const domain in serviceInfo.areas) {
        description += `<li><strong>${domain}:</strong> ${serviceInfo.areas[domain].join(', ')}</li>`;
    }

    description += '</ul>';
    descriptionElement.innerHTML = description;
}

// Initialize service description
updateServiceDescription('');

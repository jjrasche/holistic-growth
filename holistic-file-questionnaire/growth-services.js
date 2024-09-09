import { serviceAreas } from './constants.js';
import { closePopup } from './popup.js';
import { unHighlightAllSections, highlighSection } from './wheel-manipulation.js';


function highlightServiceAreas(service) {
    const serviceInfo = serviceAreas[service];
    if (service && serviceInfo) {
        unHighlightAllSections();
        for (const domain in serviceInfo.areas) {
            serviceInfo.areas[domain].forEach(state => highlighSection(domain, state));
        }
    }
    closePopup();
}

export function findServicesByDomainAndState(domain, state) {
    const relevantServices = Object.keys(serviceAreas).filter(service => {
        const areas = serviceAreas[service].areas;
        return areas[domain] && areas[domain].includes(state);
    });
    return relevantServices.map(service => {
        return service.charAt(0).toUpperCase() + service.slice(1).replace('-', ' ');
    }).join(', ');
}

export function updateServiceDescription(service) {
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

function populateServiceSelect() {
    const serviceSelect = document.getElementById('service-select');

    // Clear any existing options
    serviceSelect.innerHTML = '';

    // Add the default "Select a service" option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a service';
    serviceSelect.appendChild(defaultOption);

    // Populate the select with options from the serviceAreas constant
    for (const serviceKey in serviceAreas) {
        if (serviceAreas.hasOwnProperty(serviceKey)) {
            const option = document.createElement('option');
            option.value = serviceKey;
            option.textContent = serviceKey.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            serviceSelect.appendChild(option);
        }
    }
}


// setup
populateServiceSelect();

document.getElementById('service-select').addEventListener('change', function(event) {
    const selectedService = event.target.value;
    highlightServiceAreas(selectedService);
    updateServiceDescription(selectedService);
    // todo: might need clearing of service select
    // document.getElementById('service-select').value = '';
});
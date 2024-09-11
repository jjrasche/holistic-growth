import { findServicesByDomainAndState } from "./growth-services.js";
import { examples, states, domainInvolves } from "./constants.js";

export function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

function showPopup() {
    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

export function openSectionPopup(domain, state) {
    const services = findServicesByDomainAndState(domain, state);
    const popupContent = document.getElementById('popup-content');
    if (state === 'Flourishing') {
        popupContent.innerHTML = `
            <h3>${domain} - ${state}</h3>
            <p><strong>Description:</strong> ${examples[domain][state]}</p>
            <p><strong>Example Goal:</strong> Congratulations! You've reached the highest level in this domain.</p>
            <p><strong>Growth Services:</strong> ${services}</p>
        `;
    } else {
        const nextState = states[states.indexOf(state) + 1];
        popupContent.innerHTML = `
            <h3>${domain}: ${state} to ${nextState}</h3>
            <p><strong>Description:</strong> ${examples[domain][state]}</p>
            <p><strong>Example Goal:</strong> ${examples[domain][`${state} to ${nextState}`]}</p>
            <p><strong>Growth Services:</strong> ${services}</p>
        `;
    }
    showPopup();
}

export function openDomainPopup(domain) {
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = `
        <h3>${domain}</h3>
        <p><strong>Involves:</strong> ${domainInvolves[domain]}</p>
    `;
    showPopup();
}

// Add this function to set up event listeners
export function setupPopupListeners() {
    document.querySelector('.popup-close').addEventListener('click', closePopup);
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
}

setupPopupListeners();

import { states, unHighlightOpacity, highlightOpacity } from "./constants.js";

import { openDomainPopup, openSectionPopup } from "./popup.js";

export function unHighlightAllSections() {
    document.querySelectorAll('path').forEach(path => {
        path.setAttribute('fill-opacity', unHighlightOpacity);
    });
}

export function highlighSection(domain, state) {   
    const path = document.querySelector(`path[data-domain="${domain}"][data-state="${state}"]`);
    if (path) {
        path.setAttribute('fill-opacity', highlightOpacity);
    }
}

export function highlighDomain(domain) {   
    states.forEach(state => highlighSection(domain, state));
}

export function handleSectionClick(event) {
    const domain = event.target.getAttribute('data-domain');
    const state = event.target.getAttribute('data-state');
    unHighlightAllSections();
    highlighSection(domain, state);
    openSectionPopup(domain, state)
}

export function handleDomainClick(event) {
    const domain = event.target.getAttribute('data-domain');
    openDomainPopup(domain);
}
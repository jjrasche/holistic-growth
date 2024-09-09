// holistic-growth-wheel-presentation.js

import { Presentation } from './presentation-base.js';
import { openDomainPopup, openSectionPopup, closePopup } from "./popup.js";
import { highlighSection, unHighlightAllSections } from "./wheel-manipulation.js";

export class HolisticGrowthWheelPresentation extends Presentation {
    constructor() {
        super(4); // Total number of slides
    }

    showCurrentSlide() {
        this.resetPresentation();

        switch (this.currentSlide) {
            case 0:
                this.showInternalExternalLines();
                break;
            case 1:
                this.showDomains();
                break;
            case 2:
                this.showSufferingJoyRings();
                break;
            case 3:
                this.showCrisisToFlourishing();
                break;
        }
    }

    resetPresentation() {
        unHighlightAllSections();
        this.removeInternalExternalLines();
        this.removeSufferingJoyArrow();
        closePopup();
    }

    showInternalExternalLines() {
        const svg = document.getElementById('growth-wheel');
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '325');
        line.setAttribute('y1', '0');
        line.setAttribute('x2', '325');
        line.setAttribute('y2', '650');
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-dasharray', '5,5');
        line.setAttribute('id', 'internal-external-line');
        
        const internalLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        internalLabel.setAttribute('x', '490');
        internalLabel.setAttribute('y', '325');
        internalLabel.setAttribute('text-anchor', 'middle');
        internalLabel.textContent = 'Internal';
        internalLabel.setAttribute('id', 'internal-label');

        const externalLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        externalLabel.setAttribute('x', '160');
        externalLabel.setAttribute('y', '325');
        externalLabel.setAttribute('text-anchor', 'middle');
        externalLabel.textContent = 'External';
        externalLabel.setAttribute('id', 'external-label');

        svg.appendChild(line);
        svg.appendChild(internalLabel);
        svg.appendChild(externalLabel);
    }

    removeInternalExternalLines() {
        document.getElementById('internal-external-line')?.remove();
        document.getElementById('internal-label')?.remove();
        document.getElementById('external-label')?.remove();
    }

    showDomains() {
        const domains = ['Emotional', 'Mental', 'Physical', 'Social'];
        domains.forEach((domain, index) => {
            setTimeout(() => {
                openDomainPopup(domain);
            }, index * 1000);
        });
    }

    showSufferingJoyRings() {
        const svg = document.getElementById('growth-wheel');
        
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrow.setAttribute('d', 'M 325,80 L 325,240 L 315,230 M 325,240 L 335,230');
        arrow.setAttribute('stroke', 'black');
        arrow.setAttribute('fill', 'none');
        arrow.setAttribute('id', 'suffering-joy-arrow');

        const sufferingLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        sufferingLabel.setAttribute('x', '325');
        sufferingLabel.setAttribute('y', '70');
        sufferingLabel.setAttribute('text-anchor', 'middle');
        sufferingLabel.textContent = 'Suffering';
        sufferingLabel.setAttribute('id', 'suffering-label');

        const joyLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        joyLabel.setAttribute('x', '325');
        joyLabel.setAttribute('y', '260');
        joyLabel.setAttribute('text-anchor', 'middle');
        joyLabel.textContent = 'Joy';
        joyLabel.setAttribute('id', 'joy-label');

        svg.appendChild(arrow);
        svg.appendChild(sufferingLabel);
        svg.appendChild(joyLabel);
    }

    removeSufferingJoyArrow() {
        document.getElementById('suffering-joy-arrow')?.remove();
        document.getElementById('suffering-label')?.remove();
        document.getElementById('joy-label')?.remove();
    }

    showCrisisToFlourishing() {
        const states = ['Crisis', 'Stagnant', 'Growth', 'Flourishing'];
        states.forEach((state, index) => {
            setTimeout(() => {
                highlighSection('Physical', state);
                openSectionPopup('Physical', state);
            }, index * 1000);
        });
    }
}
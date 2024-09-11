import { Presentation } from './presentation-base.js';
import { openDomainPopup, openSectionPopup, closePopup } from "./popup.js";
import { highlighSection, unHighlightAllSections } from "./wheel-manipulation.js";

export class HolisticGrowthWheelPresentation extends Presentation {
    constructor() {
        super(5); // Updated total number of slides
        this.wheelContainer = document.querySelector('.wheel-container');
        this.sidebar = document.querySelector('.sidebar');
        this.mainContent = document.querySelector('.main-content');
    }

    showCurrentSlide() {
        this.resetPresentation();

        switch (this.currentSlide) {
            case 0:
                this.showFullScreenWheel();
                break;
            case 1:
                this.showFullScreenWheel();
                this.showInternalExternalLines();
                this.showInternalExternalSummary();
                break;
            case 2:
                this.showInternalDescription();
                break;
            case 3:
                this.restoreLayout();
                this.showDomains();
                break;
            case 4:
                this.showCrisisToFlourishing();
                break;
        }
    }

    resetPresentation() {
        unHighlightAllSections();
        this.removeInternalExternalLines();
        this.removeSufferingJoyArrow();
        this.removeInternalDescription();
        closePopup();
    }

    showFullScreenWheel() {
        this.wheelContainer.classList.add('fullscreen');
        this.sidebar.classList.add('hidden');
        this.mainContent.classList.add('fullscreen');
    }

    restoreLayout() {
        this.wheelContainer.classList.remove('fullscreen');
        this.sidebar.classList.remove('hidden');
        this.mainContent.classList.remove('fullscreen');
    }

    showInternalExternalLines() {
        const svg = document.getElementById('growth-wheel');
        
        // Add semi-transparent colored overlay
        const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        overlay.setAttribute('x', '325');
        overlay.setAttribute('y', '0');
        overlay.setAttribute('width', '325');
        overlay.setAttribute('height', '650');
        overlay.setAttribute('fill', '#FFD700');
        overlay.setAttribute('opacity', '0.2');
        overlay.setAttribute('id', 'internal-overlay');
        
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

        svg.appendChild(overlay);
        svg.appendChild(line);
        svg.appendChild(internalLabel);
        svg.appendChild(externalLabel);
    }

    showInternalDescription() {
        const svg = document.getElementById('growth-wheel');
        
        const descriptionBox = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        descriptionBox.setAttribute('x', '340');
        descriptionBox.setAttribute('y', '20');
        descriptionBox.setAttribute('width', '290');
        descriptionBox.setAttribute('height', '200');
        descriptionBox.setAttribute('id', 'internal-description');

        const descriptionContent = document.createElement('div');
        descriptionContent.innerHTML = `
            <h3 style="margin: 0; color: #333;">Internal Domains</h3>
            <p style="margin-top: 10px; font-size: 14px; color: #555;">
                The right half of the wheel represents internal domains:
                <ul style="margin-top: 5px; padding-left: 20px;">
                    <li><strong>Emotional:</strong> Feelings, resilience, and self-awareness</li>
                    <li><strong>Mental:</strong> Thoughts, beliefs, and cognitive processes</li>
                </ul>
                These domains focus on your inner world and personal growth.
            </p>
        `;
        descriptionContent.style.cssText = 'background-color: rgba(255, 255, 255, 0.9); padding: 10px; border-radius: 5px; font-family: Arial, sans-serif;';

        descriptionBox.appendChild(descriptionContent);
        svg.appendChild(descriptionBox);
    }

    removeInternalExternalLines() {
        document.getElementById('internal-external-line')?.remove();
        document.getElementById('internal-label')?.remove();
        document.getElementById('external-label')?.remove();
        document.getElementById('internal-overlay')?.remove();
    }

    removeInternalDescription() {
        document.getElementById('internal-description')?.remove();
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
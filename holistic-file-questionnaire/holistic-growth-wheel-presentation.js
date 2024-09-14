import { Presentation } from './presentation-base.js';
import { openDomainPopup, openSectionPopup, closePopup } from "./popup.js";
import { highlighDomain, highlighSection, unHighlightAllSections } from "./wheel-manipulation.js";
import { emotional, mental, physical, social } from './constants.js';

export class HolisticGrowthWheelPresentation extends Presentation {
    constructor() {
        super()
        this.setSlides([
            () => this.introduction(),
            () => this.emotionalDomain(),
            () => this.socialDomain(),
            () => this.mentalDomain(),
            () => this.physicalDomain()
        ]); 
        this.wheelContainer = document.querySelector('.wheel-container');
        this.createTextArea();
        this.initialize();
    }
    
    createTextArea() {
        let textArea = document.querySelector('.presentation-text-area');
        if (!textArea) {
            textArea = document.createElement('div');
            textArea.className = 'presentation-text-area';
            this.wheelContainer.parentNode.insertBefore(textArea, this.wheelContainer.nextSibling);
        }
        this.textArea = textArea;
    }

    clearTextArea() {
        if (this.textArea) {
            this.textArea.innerHTML = '';
        }
    }
    
    resetPresentation() {
        unHighlightAllSections();
        this.removeInternalExternalLines();
        this.removeSufferingJoyArrow();
        this.removeInternalDescription();
        closePopup();
        this.clearTextArea();
    }

    displayText(titleText, paragraphs) {
        const title = document.createElement('h3');
        title.className = 'title';
        title.innerHTML = titleText;
        this.textArea.insertAdjacentElement("beforeend", title);

        paragraphs.forEach(pText => {
            const p = document.createElement('p');            
            p.innerHTML = pText;
            this.textArea.insertAdjacentElement("beforeend", p);
        })

        // fadeInParagraphs(paragraphs);
    }


    // fadeInParagraphs(paragraphs) {
    //     if (index < paragraphs.length) {
    //         const paragraph = paragraphs[index];
    //         const p = document.createElement('p');
    //         p.style.opacity = 0;
    //         p.style.visibility = 'hidden';
            
    //         p.innerHTML = paragraph;
    //         this.textArea.insertAdjacentElement("beforeend", p);
            
    //         this.fadeIn(p, () => setTimeout(() => addText(index + 1), this.fadeTime*1000));
    //     }
    // };
    
    // fadeIn(element,  callback) {
    //     element.style.opacity = 0;
    //     element.style.transition = `opacity ${this.fadeTime}s`;
    //     element.style.visibility = 'visible';
        
    //     setTimeout(() => {
    //         element.style.opacity = 1;
    //     }, 50);
    //     callback();
    // }

    introduction() {
        this.displayText("Welcome to the Holistic Growth Wheel", [
            "The Holistic Growth Wheel is a powerful visual tool designed to give you a comprehensive view of your personal growth journey. It's divided into four main domains, each representing a crucial aspect of your life. By using this wheel, you can identify your current state in each domain and set clear goals for where you want to be."
        ]);
    }

    emotionalDomain() {
        highlighDomain(emotional);
        this.displayText("Emotional Domain",[
            "Your emotional well-being provides the foundation of your inner world. Your emotional state is the basis for how you interact with everything around you.",
            "Involves wellbeing, resilience, and purpose and impacts how you handle stress, process grief, or cultivate joy.",
            "Success is: understanding and managing your emotions, using empathy effectively, building emotional resilience, and finding a sense of purpose in life."
        ]);
    }

    socialDomain() {
        highlighDomain(social);
        this.displayText("Social Domain",[
            
        ]);
    }

    mentalDomain() {
        highlighDomain(mental);
        this.displayText("Mental Domain",[
            
        ]);
    }

    physicalDomain() {
        highlighDomain(physical);
        this.displayText("Physical Domain",[

        ]);
    }
    

    internalExternalLines() {
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

    internalDescription() {
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

    domains() {
        const domains = ['Emotional', 'Mental', 'Physical', 'Social'];
        domains.forEach((domain, index) => {
            setTimeout(() => {
                openDomainPopup(domain);
            }, index * 1000);
        });
    }

    sufferingJoyRings() {
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


    crisisToFlourishing() {
        const states = ['Crisis', 'Stagnant', 'Growth', 'Flourishing'];
        states.forEach((state, index) => {
            setTimeout(() => {
                highlighSection('Physical', state);
                openSectionPopup('Physical', state);
            }, index * 1000);
        });
    }
}






/*
typing effect
showIntroduction() {
        const content = `
            <div class="text-content introduction">
                <h2>Welcome to the Holistic Growth Wheel</h2>
                <p>The Holistic Growth Wheel is a powerful visual tool designed to give you a comprehensive view of your personal growth journey. It's divided into four main domains, each representing a crucial aspect of your life. By using this wheel, you can identify your current state in each domain and set clear goals for where you want to be.</p>
            </div>
        `;
        this.typeText(content);
    }

    emotionalDomain() {
        // highlighSection('Emotional', 'Crisis');
        // highlighSection('Emotional', 'Stagnant');
        // highlighSection('Emotional', 'Growth');
        // highlighSection('Emotional', 'Flourishing');
        states.forEach(state => highlighSection('Emotional', state));
        const content = `
            <div class="text-content domain-explanation">
                <h3 class="domain-title">Emotional Domain</h3>
                <p class="domain-overview">Your emotional well-being provides the foundation of your inner world. Your emotional state is the basis for how you interact with everything around you.</p>
                <p class="domain-details">Involves wellbeing, resilience, and purpose and impacts how you handle stress, process grief, or cultivate joy.</p>
                <p class="domain-success">Success is: understanding and managing your emotions, using empathy effectively, building emotional resilience, and finding a sense of purpose in life.</p>
            </div>
        `;
        this.typeText(content, () => {
            // Highlight the Emotional domain on the wheel after typing is complete
        });
    }

    typeText(content, callback) {
        this.textArea.innerHTML = content;
        const textElements = this.textArea.querySelectorAll('h2, h3, p');
        let elementIndex = 0;
        let charIndex = 0;
        
        // Hide all text initially
        textElements.forEach(element => {
            element.style.visibility = 'hidden';
        });
        
        let element = textElements[elementIndex];
        let text = element.textContent;
        
        const type = () => {
            if (elementIndex < textElements.length) {
                // Create a temporary element to hold the typed text
                const tempElement = document.createElement('span');
                tempElement.innerHTML = text.substring(0, charIndex) + '<span class="cursor">|</span>';
                
                // Replace the content of the current element
                element.innerHTML = '';
                element.style.visibility = 'visible';
                element.appendChild(tempElement);
                
                charIndex++;
                
                if (charIndex > text.length) {
                    charIndex = 0;
                    element.textContent = text; // Set final text without cursor
                    elementIndex++;
                    if (elementIndex < textElements.length) {
                        element = textElements[elementIndex];
                        text = element.textContent;
                    }
                }
    
                requestAnimationFrame(type);
            } else if (callback) {
                callback();
            }
        };
        
        requestAnimationFrame(type);
    }
*/
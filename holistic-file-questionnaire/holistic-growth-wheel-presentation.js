import { Presentation } from './presentation-base.js';
import { openDomainPopup, openSectionPopup, closePopup } from "./popup.js";
import { highlightDomain, highlightSection, unHighlightAllSections, unHighlightDomain } from "./wheel-manipulation.js";
import { domains, states, emotional, mental, physical, social } from './constants.js';
import { innerLandscapeOverlay, measureGrowthOverlay, objectiveMeasuresOverlay, outerExpressionOverlay, subjectiveMeasuresOverlay, sufferingToJoy, typeOfEffertOverlay } from './svg-manipulation.js';

export class HolisticGrowthWheelPresentation extends Presentation {
    constructor() {
        super()
        this.setSlides([
            () => this.introduction(),
            () => this.emotionalDomain(),
            () => this.socialDomain(),
            () => this.physicalDomain(),
            () => this.mentalDomain(),
            () => this.typeOfEffortDivide(),
            () => this.innerLandscape(),
            () => this.outerExpression(),
            () => this.measureGrowthDivide(),
            () => this.subjectiveGrowth(),
            () => this.objectiveGrowth(),
            () => this.statesWithin(),
            ...this.statesSlides(),
        ]); 
        this.stageElements = [];
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
        closePopup();
        unHighlightAllSections();
        this.clearTextArea();
        this.stageElements.forEach(e => e.remove());
        domains.forEach(d => unHighlightDomain(d));
    }

    introduction() {
        this.displayText("Welcome to the Holistic Growth Wheel", [
            "The Holistic Growth Wheel is a powerful visual tool designed to give you a comprehensive view of your personal growth journey. It's divided into four main domains, each representing a crucial aspect of your life. By using this wheel, you can identify your current state in each domain and set clear goals for where you want to be."
        ]);
    }

    emotionalDomain() {
        highlightDomain(emotional);
        this.displayText("Emotional Domain",[
            "Your emotional well-being provides the foundation of your inner world. Your emotional state is the basis for how you interact with everything around you.",
            "Involves wellbeing, resilience, and purpose and impacts how you handle stress, process grief, or cultivate joy.",
            "Success is: understanding and managing your emotions, using empathy effectively, building emotional resilience, and finding a sense of purpose in life."
        ]);
    }

    socialDomain() {
        highlightDomain(social);
        this.displayText("Social Domain",[
            "Social well-being is rooted in the relationships that support, challenge, and enrich you. It's highlighted in how you connect with others and communicate ideas. Social well beimg influences your sense of belonging. It empowers you to both contribute to and draw strength from your community.",
            "Involves communication, empathy, and interpersonal skills. It impacts your relationships, community contributions, and your dynamic in social situations.",
            "Success is forming and maintaining deep and supportive relationships, effectively collaborating with others, contributing meaningfully to your community, and navigating social situations with confidence and authenticity.",
        ]);
    }

    mentalDomain() {
        highlightDomain(mental);
        this.displayText("Mental Domain",[
            "Mental well-being shapes how you perceive and interact with the world. It's the lens through which you interpret experiences, solve problems, and make decisions. A healthy mental state empowers you to learn, adapt, and thrive in an ever-changing environment.",
            "Involves mindset, learning, and critical thinking. It impacts how you perceive, acquire knowledge, solve problems, and express creativity.",
            "Success is creating effective strategies to overcome challenges, continuously learning and adapting from experiences, and developing optimal problem-solving skills.",
        ]);

    }

    physicalDomain() {
        highlightDomain(physical);
        this.displayText("Physical Domain",[
            "Physical well-being is the foundation of how you engage in the world. It often influences your mood and cognitive function. A strong physical state allows you to fully engage in life's activities.",
            "Involves bodily awareness, nutrition, and physical routines. It impacts your health, energy levels, and overall physical capabilities.",
            "Success is cultivating natural energy, preventing chronic conditions and injuries, and maintaining a level of health and fitness that allows you to pursue your ambitions without physical limitations.",
        ]);
    }
    
    typeOfEffortDivide() {
        this.stageElements = [...this.stageElements, ...typeOfEffertOverlay()];
        this.displayText("Internal / External Growth Focus",[
            "The Holistic Growth Wheel is fundamentally divided into two halves, representing the dual nature of personal development. This division reflects the distinction between our inner world and our outer expression, each requiring different approaches and focuses for growth. Understanding this divide is crucial for creating a balanced and comprehensive personal development strategy.",
        ]);
    }

    innerLandscape() {
        this.stageElements = [...this.stageElements, ...innerLandscapeOverlay()];
        this.displayText("Internal Growth Focus",[
            "The left side of the wheel represents our inner landscape, encompassing the Emotional and Mental domains. This is the realm of introspection, self-awareness, and cognitive processes. Growth in these areas requires us to turn our attention inward, examining our thoughts, feelings, beliefs, and motivations. It involves developing emotional intelligence, reshaping our mindset, refining our inner dialogue, and cultivating resilience. Progress here often comes through practices like meditation, self-reflection, journaling, and therapy, which help us navigate and reshape our internal world.",
        ]);
    }

    outerExpression() {
        this.stageElements = [...this.stageElements, ...outerExpressionOverlay()];
        this.displayText("External Growth Focus",[
            "The right side of the wheel represents our outer expression, comprising the Social and Physical domains. This is the arena where we interact with the world around us, manifesting our inner growth through tangible actions and relationships. Development in these areas necessitates active engagement with our environment, practicing new skills, and adapting our behaviors. It involves improving our communication, building relationships, enhancing our physical health, and developing new competencies. Progress here typically comes through hands-on experiences, consistent practice, physical training, and real-world social interactions, allowing us to effectively translate our inner growth into external results and meaningful connections with others.",
        ]);
    }
    
    measureGrowthDivide() {
        this.stageElements = [...this.stageElements, ...measureGrowthOverlay()];
        this.displayText("Subjective / Objective Growth Measuring",[
            "The Holistic Growth Wheel can also be divided by top and bottom. The horizontal division separates the domains based on how you measure growth. With the growth in the top domains measured through subjective experience and soft skill development. The bottom domains show results with improvement in objective capabilities and hard skills.",
        ]);
    }

    subjectiveGrowth() {
        this.stageElements = [...this.stageElements, ...subjectiveMeasuresOverlay()];
        this.displayText("Subjective Growth Measurement",[
            "The top half of the wheel, encompassing the Emotional and Social domains, represents subjective areas of growth that are inherently challenging to measure. Progress in these domains is typically gauged through self-reported improvements in well-being, relationship quality, and social connections. However, these soft skills like emotional intelligence, empathy, and interpersonal communication, can help you more broadly in life situations.",
            "While the results of development in these areas are often intangible, you'll feel the difference in improved interactions and relationships. Life's going to generally seem easeir. Improvement in these areas should feel like things are starting to click. There are some methods to quantify progress, such as feedback surveys or emotional intelligence assessments. However, these measurements are inherently less precise and more open to interpretation than those in the lower half."
        ]);
    }

    objectiveGrowth() {
        this.stageElements = [...this.stageElements, ...objectiveMeasuresOverlay()];
        this.displayText("Objective Growth Measurement",[
            "The bottom half, comprising the Mental and Physical domains, focuses on objective capabilities that can be measured more concretely through standardized tests, athletic feets, and tangible achievements. These hard skills improve your performance at specific tasks or problem-solving scenarios.",
            "Development in these domains often produce quicker and more obvious improvement. For instance, using a mobile app to improve memorization will have a testing component where you can track progress over time. The specificity of these hard skills often translates to clear, task-oriented benefits, contrasting with the more generally applicable nature of soft skills.",
        ]);
    }

    objectiveGrowth() {
        this.stageElements = [...this.stageElements, ...objectiveMeasuresOverlay()];
        this.displayText("Objective Growth Measurement",[
            "The bottom half, comprising the Mental and Physical domains, focuses on objective capabilities that can be measured more concretely through standardized tests, athletic feets, and tangible achievements. These hard skills improve your performance at specific tasks or problem-solving scenarios.",
            "Development in these domains often produce quicker and more obvious improvement. For instance, using a mobile app to improve memorization will have a testing component where you can track progress over time. The specificity of these hard skills often translates to clear, task-oriented benefits, contrasting with the more generally applicable nature of soft skills.",
        ]);
    }

    statesWithin() {
        this.stageElements = [...this.stageElements, ...sufferingToJoy()];

        this.displayText("The Journey from Suffering to Joy", [
            "As we move from the inner circle to the outer circle of the Holistic Growth Wheel, we transition from states of suffering towards states of joy. This journey is represented by four distinct states: Crisis, Stagnant, Growth, and Flourishing.",
            "It's important to understand that these states are not arbitrary. They reflect your personal experiences and perceptions. What one person considers a crisis might not be a crisis for another. Your current state is often influenced by the depths you've experienced and the peaks you've reached in comparison to where you are now.",
            "However, there are also objective ways to assess your state in each domain. A set of basic needs, when met, can help you understand if you're objectively in a crisis or not. Let's explore each state in more detail:"
        ]);
    }

    statesSlides() {
        return states.map(state => () => this.highlightAndExplainState(state));
    }

    highlightAndExplainState(state) {
        domains.forEach(domain => highlightSection(domain, state));
        
        let description, characteristics;
        switch(state) {
            case 'Crisis':
                description = "The innermost circle represents a state of crisis. This is typically characterized by intense suffering or struggle.";
                characteristics = "In crisis, you may feel overwhelmed, stuck, or unable to meet basic needs in a particular domain. It's important to remember that being in crisis is not a permanent state and that help is available.";
                break;
            case 'Stagnant':
                description = "Moving outward, we reach the stagnant state. Here, the acute suffering of crisis has subsided, but growth is not yet occurring.";
                characteristics = "In a stagnant state, you're able to meet basic needs but may feel unfulfilled or stuck. This state often serves as a crucial resting period between crisis and growth.";
                break;
            case 'Growth':
                description = "The next circle represents a state of growth. This is where positive change and development begin to occur.";
                characteristics = "In a growth state, you're actively working on improving aspects of your life in this domain. You may face challenges, but you're making progress and learning from your experiences.";
                break;
            case 'Flourishing':
                description = "The outermost circle represents a state of flourishing, characterized by joy, fulfillment, and thriving.";
                characteristics = "When flourishing, you're not just meeting your needs but excelling in this domain. You may find yourself able to help others and contribute to your community in meaningful ways.";
                break;
        }

        this.displayText(`${state} State`, [description, characteristics]);
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
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
            () => this.callToAction(),
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
        
        let text
        switch(state) {
            case 'Crisis':
                text = [
                    "The specific situations and circumstances that cause someone to be in crisis vary greatly person to person.",
                    "An emotional crisis represents any state where an individual struggles to cope with their feelings and emotions to a point that it significantly impacts their well-being, daily functioning, and overall quality of life.",
                    "A mental crisis occurs when an individual experiences significant disruption to their cognitive processes, affecting their ability to think clearly and process information. The common thread is difficulty in maintaining normal mental operations or interrupting negative thought patterns.",
                    "In a physical crisis, an individual encounters a severe disruption to their bodily functions or physical capabilities that significantly impairs their ability to perform basic tasks or maintain their usual level of independence.",
                    "A social crisis manifests as a state where an individual faces significant challenges in forming, maintaining, or navigating interpersonal relationships, leading to isolation, disconnection, or conflict with others."
                ]
                break;
            case 'Stagnant':
                text = [
                    "<h4>Hallmarks</h4>",
                    "<ul><li>May engage in sporadic self-improvement activities</li><li>Lack of consistent routines aimed at personal development</li><li>lack of self-reflection on vision or plan</li></ul>",
                    "<h4>Sarah is Physiclly Stagnant</h4>",
                    "Sarah considers herself fairly healthy. She goes to the gym sporadically, usually once or twice a month when she feels guilty about not exercising. She often thinks about eating better but hasn't made any concrete plans to change her diet. Sarah's weight has remained the same for years, and while she sometimes wishes she were fitter, she's not actively working towards that goal. She's content with her current state and doesn't see a pressing need for change. This lack of a clear plan, coupled with inconsistent actions and an absence of integrated routines aimed at improvement, places Sarah in a stagnant state in the physical domain.",
                ];
                break;
            case 'Growth':
                text = [
                    "<h4>Hallmarks</h4>",
                    "<ul><li>Clear, specific goals and feasible plans to reach vision</li><li>Integrated plan into routines</li><li>Commitment to long-term progress despite short-term setbacks</li><li>Regular self-reflection and willingness to adjust strategies</li></ul>",
                    "<h4>Michael is Focused on Mental Growth</h4>",
                    "Michael has worked as lead mechanic at a repair shop for 5 years. Michael realized he's not fulfilled in his work and this is negatively impacting his life. Conversations with his support system led to some challenging self-reflections, where Michael rediscoverd his passion for teaching. Michael developed a vision to be an automative instructor by the end of the year. He understands he needs to learn instruction techniques so he built the routine  to digest content (pocasts, audiobooks) related to teaching on his 30 minute commute. He knows he'll need to develop curriculm so he devotes 20 minutes before bed to assemble material.Michael has consistently integrated these routines into his schedule for the past month, attaching them to established habits like driving and eating. He's had to adjust his approach, like listening to his teaching content while making dinner on Tuesdays when his Grandmother calls, but he knows consistent incremental improvement will get him where he wants to go. To apply his new knowledge in the real world, Michael introduced himself to the dean of a local vocational school and has come in twice for guest lectures. Despite occasional setbacks, like missing the routine last weekend to focus on a vacation, Michael maintained his commitment to growth. He's started thinking of his work differently. Previosuly boring parts of the job became interesting again thinking about how he'd explain it to a student. After a month of consistent routine building, Michael feels more engaged with life and has now substituted portfolio creation to his bed time routine. When done he will submit it with his resume to 3 area schools.",
                ];
                break;
            case 'Flourishing':
                text = [
                "<h4>Hallmarks</h4>",
                "<ul><li>General satisfaction and fulfillment with current state</li><li>Current state aligns closely with personal ideal vision</li><li>Built on self-understanding and sustainable effort</li><li>Sense of purpose, meaning, and intentionality in actions</li><li>Ability to navigate challenges without persistent distress</li><li>Regular self-reflection and adjustment of ideal state as needed</li><li>Often has positive impact beyond oneself</li></ul>",
                "<h4>Emily is Flourishing Socially</h4>",
                "Emily is a community organizer. She finds her work rewarding as it aligns with her values and passions of being a bridge between what people need and organizations that can help. When asked what she does Emily likes to say, \"I help people help people\". She has cultivated a vast network of meaningful relationships, connecting people across the extremes of society. Emily needed to grow to get here, but at this point she's developed the skills to navigates complex social situations with ease and empathy. Her weekly schedule includes youth mentoring sessions, leading business outreach board meeting, and planning an implementing community events. Emily's reputation as a connector and mediator has led to her being sought after for conflict resolution in both personal and professional contexts. She developed innovative community-building strategies that she helps other cities implement. Despite her busy schedule, Emily maintains deep, nurturing relationships with her family and close friends. She's adept at balancing her social commitments with her personal life, finding joy and fulfillment in both. Emily's social flourishing isn't just about her own success; she consistently uses her social capital to uplift others and strengthen her community. Her ability to create positive change through social connections has become so natural that it's seamlessly integrated into her life. Emily has faced setbacks, losing a close family memeber pulled her into emotional crisis where she self isolated for a couple weeks. Her support system helped Emily to reestablish her routines and habits, her passion and purpose hadn't changed and they acted like a  gravity pulling her back into social flourishing."
                ];
                break
        }

        this.displayText(`${state} State`, text);
    }

    callToAction() {
        this.displayText("Where Do You See Yourself", [
            "Take the self assessment to start having the conversations that help you",
            "<ol><li><b>understand</b> yourself well enough to state your values, articulate your why, and identify you current state</li><li><b>envision</b> your ideal state and a plan for how to get there</li><li><b>grow</b> the skills necessary to reach your vision</li></ol>"
        ]);
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
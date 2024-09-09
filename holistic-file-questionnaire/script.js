const domains = ['Emotional', 'Mental', 'Physical', 'Social'];
const states = ['Crisis', 'Stagnant', 'Growth', 'Flourishing'];
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
const highlightOpacity = '1';
const unHighlightOpacity = '.6';

const domainInvolves = {
    Emotional: 'wellbeing, resilience, and purpose',
    Mental: 'mindset, learning, and problem-solving',
    Physical: 'health, vitality, and bodily capabilities',
    Social: 'relationships, community, and interpersonal skills'
};

const examples = {
    Emotional: {
        'Crisis': 'Overwhelmed, unable to cope with feelings',
        'Stagnant': 'Emotions manageable, but not particularly fulfilled',
        'Growth': 'Developing greater emotional awareness and resilience',
        'Flourishing': 'Deep sense of contentment, navigating complex emotions with ease',
        'Crisis to Stagnant': 'Develop basic coping mechanisms for overwhelming emotions',
        'Stagnant to Growth': 'Practice daily gratitude journaling',
        'Growth to Flourishing': 'Cultivate deep empathy and emotional intelligence'
    },
    Mental: {
        'Crisis': 'Anxiety, depression, poor focus',
        'Stagnant': 'Daily tasks manageable, but not intellectually stimulated',
        'Growth': 'Actively learning and expanding mental capabilities',
        'Flourishing': 'Sharp, curious mind; creative problem-solving; continuous learning',
        'Crisis to Stagnant': 'Establish a basic daily routine to improve focus',
        'Stagnant to Growth': 'Learn a new skill or language',
        'Growth to Flourishing': 'Engage in complex problem-solving or creative projects'
    },
    Physical: {
        'Crisis': 'Severe illness, pain, or mobility issues',
        'Stagnant': 'Functional health, not particularly energetic, concerned about physical ability',
        'Growth': 'Improving fitness, nutrition, and overall health',
        'Flourishing': 'Vibrant health, high energy, strong and capable body',
        'Crisis to Stagnant': 'Walk a quarter mile unassisted',
        'Stagnant to Growth': 'Establish a regular exercise routine',
        'Growth to Flourishing': 'Compete in a challenging physical event (e.g., marathon)'
    },
    Social: {
        'Crisis': 'Isolated, lonely, or in conflict',
        'Stagnant': 'Basic social needs met, but relationships lack depth',
        'Growth': 'Expanding social circle, improving communication skills',
        'Flourishing': 'Rich, supportive relationships; strong sense of community and belonging',
        'Crisis to Stagnant': 'Reach out to one friend or family member weekly',
        'Stagnant to Growth': 'Join a club or group aligned with your interests',
        'Growth to Flourishing': 'Mentor others and build a supportive community'
    }
};

const serviceAreas = {
    'therapist': {
        description: "Therapists provide mental health support, helping individuals cope with emotional challenges, trauma, and mental health disorders. They're especially beneficial for those struggling with anxiety, depression, or significant life changes.",
        areas: {
            Emotional: ['Crisis', 'Stagnant'],
            Mental: ['Crisis', 'Stagnant'],
            Social: ['Crisis', 'Stagnant']
        }
    },
    'business-coach': {
        description: "Business coaches guide entrepreneurs and professionals in improving their business strategies and leadership skills. They're ideal for business owners, executives, and those seeking career advancement.",
        areas: {
            Mental: ['Stagnant', 'Growth'],
            Social: ['Stagnant', 'Growth']
        }
    },
    'physical-therapist': {
        description: "Physical therapists help patients recover from injuries, manage chronic conditions, and improve physical mobility. They're crucial for those recovering from surgeries, accidents, or dealing with ongoing physical limitations.",
        areas: {
            Physical: ['Crisis', 'Stagnant']
        }
    },
    'pastor': {
        description: "Pastors provide spiritual guidance

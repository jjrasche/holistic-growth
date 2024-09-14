// domains
export const social = 'Social';
export const physical = 'Physical';
export const mental = 'Mental';
export const emotional = 'Emotional';
export const domains = [social, physical, mental, emotional];
export const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
// states
export const states = ['Crisis', 'Stagnant', 'Growth', 'Flourishing'];
export const highlightOpacity = '1';
export const unHighlightOpacity = '.6';

export const domainInvolves = {
    Emotional: 'wellbeing, resilience, and purpose',
    Mental: 'mindset, learning, and problem-solving',
    Physical: 'health, vitality, and bodily capabilities',
    Social: 'relationships, community, and interpersonal skills'
};

export const examples = {
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

export const serviceAreas = {
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
        description: "Pastors provide spiritual guidance, emotional support, and community leadership. They're valuable for those seeking spiritual growth, moral guidance, or support during life's challenges.",
        areas: {
            Emotional: ['Crisis', 'Stagnant', 'Growth'],
            Social: ['Crisis', 'Stagnant', 'Growth']
        }
    },
    'athletic-coach': {
        description: "Athletic coaches help individuals improve their physical performance, fitness, and sports-specific skills. They're beneficial for athletes, fitness enthusiasts, and anyone looking to enhance their physical capabilities.",
        areas: {
            Physical: ['Stagnant', 'Growth'],
            Mental: ['Stagnant', 'Growth']
        }
    },
    'life-coach': {
        description: "Life coaches assist individuals in setting and achieving personal and professional goals. They're helpful for those seeking overall life improvement, career transitions, or personal development.",
        areas: {
            Emotional: ['Stagnant', 'Growth'],
            Mental: ['Stagnant', 'Growth'],
            Social: ['Stagnant', 'Growth']
        }
    },
    'personal-trainer': {
        description: "Personal trainers create customized fitness plans and provide motivation for physical improvement. They're ideal for individuals looking to lose weight, build strength, or improve overall fitness.",
        areas: {
            Physical: ['Stagnant', 'Growth']
        }
    },
    'self-help-generalist': {
        description: "Self-help generalists provide broad advice and strategies for personal improvement across various life areas. They're suitable for those seeking general life enhancement and motivation.",
        areas: {
            Emotional: ['Stagnant', 'Growth'],
            Mental: ['Stagnant', 'Growth'],
            Social: ['Stagnant', 'Growth'],
            Physical: ['Stagnant', 'Growth']
        }
    },
    'nutritionist': {
        description: "Nutritionists offer guidance on diet and nutrition for health improvement and disease management. They're beneficial for those with dietary concerns, weight management goals, or nutrition-related health issues.",
        areas: {
            Physical: ['Crisis', 'Stagnant', 'Growth']
        }
    },
    'career-counselor': {
        description: "Career counselors help individuals make informed decisions about their career paths and job searches. They're valuable for students, job seekers, and those considering career changes.",
        areas: {
            Mental: ['Stagnant', 'Growth'],
            Social: ['Stagnant', 'Growth']
        }
    },
    'meditation-teacher': {
        description: "Meditation teachers guide individuals in mindfulness and relaxation techniques. They're helpful for those seeking stress reduction, improved focus, and emotional balance.",
        areas: {
            Emotional: ['Stagnant', 'Growth'],
            Mental: ['Stagnant', 'Growth']
        }
    },
    'relationship-counselor': {
        description: "Relationship counselors help couples and individuals improve their interpersonal relationships. They're beneficial for those experiencing relationship conflicts, communication issues, or seeking to strengthen their connections.",
        areas: {
            Social: ['Crisis', 'Stagnant', 'Growth'],
            Emotional: ['Stagnant', 'Growth']
        }
    }
};
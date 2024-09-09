// presentation-base.js

export class Presentation {
    constructor(totalSlides) {
        this.currentSlide = 0;
        this.totalSlides = totalSlides;
    }

    initialize() {
        this.updateButtons();
        this.updateProgressBar();
        this.showCurrentSlide();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('nextButton').addEventListener('click', () => this.nextSlide());
        document.getElementById('prevButton').addEventListener('click', () => this.prevSlide());
        document.getElementById('skipButton').addEventListener('click', () => this.skipToEnd());

        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowRight':
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                    this.prevSlide();
                    break;
                case 'End':
                    this.skipToEnd();
                    break;
            }
        });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.updatePresentation();
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updatePresentation();
        }
    }

    skipToEnd() {
        this.currentSlide = this.totalSlides - 1;
        this.updatePresentation();
    }

    updatePresentation() {
        this.updateButtons();
        this.updateProgressBar();
        this.showCurrentSlide();
    }

    updateButtons() {
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        const skipButton = document.getElementById('skipButton');

        prevButton.disabled = this.currentSlide === 0;
        nextButton.disabled = this.currentSlide === this.totalSlides - 1;
        skipButton.disabled = this.currentSlide === this.totalSlides - 1;
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }

    showCurrentSlide() {
        // This method should be overridden in child classes
        throw new Error('showCurrentSlide method must be implemented in child class');
    }

    resetPresentation() {
        // This method should be overridden in child classes
        throw new Error('resetPresentation method must be implemented in child class');
    }
}
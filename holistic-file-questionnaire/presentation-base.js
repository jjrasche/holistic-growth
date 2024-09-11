export class Presentation {
    constructor(totalSlides) {
        this.currentSlide = 0;
        this.totalSlides = totalSlides;
        this.touchStartX = 0;
        this.touchEndX = 0;
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

        // Touch events for mobile swipe
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        if (this.touchStartX - this.touchEndX > swipeThreshold) {
            this.nextSlide(); // Swipe left
        } else if (this.touchEndX - this.touchStartX > swipeThreshold) {
            this.prevSlide(); // Swipe right
        }
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

        prevButton.style.display = this.currentSlide === 0 ? 'none' : 'block';
        nextButton.style.display = this.currentSlide === this.totalSlides - 1 ? 'none' : 'block';
        skipButton.style.display = this.currentSlide === this.totalSlides - 1 ? 'none' : 'block';
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
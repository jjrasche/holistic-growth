export class Presentation {
    constructor() {
        this.currentSlide = 0;
        this.fadeTime = 1.25;
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    setSlides = (slides) => this.slides = slides;

    initialize() {
        this.updateButtons();
        this.updateProgressBar();
        this.showCurrentSlide();
        this.setupEventListeners();
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

    
    setupEventListeners() {
        document.getElementById('nextButton').addEventListener('click', () => this.nextSlide());
        document.getElementById('prevButton').addEventListener('click', () => this.prevSlide());
        document.getElementById('skipButton').addEventListener('click', () => this.skipToEnd());

        document.addEventListener('keydown', (event) => {
            console.log('Keydown event:', event.key);
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

    nextSlide(event) {
        if (this.currentSlide < this.slides.length - 1) {
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
        this.currentSlide = this.slides.length - 1;
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
        nextButton.style.display = this.currentSlide === this.slides.length - 1 ? 'none' : 'block';
        skipButton.style.display = this.currentSlide === this.slides.length - 1 ? 'none' : 'block';
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        const progress = ((this.currentSlide + 1) / this.slides.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    showCurrentSlide() {
        this.resetPresentation();
        this.slides[this.currentSlide]();
    }

    resetPresentation() {
        // This method should be overridden in child classes
        throw new Error('resetPresentation method must be implemented in child class');
    }
}
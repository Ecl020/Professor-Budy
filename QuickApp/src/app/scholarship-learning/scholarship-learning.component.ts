import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-scholarship-learning',
  templateUrl: './scholarship-learning.component.html',
  styleUrl: './scholarship-learning.component.css'
})
export class ScholarshipLearningComponent implements OnInit, AfterViewInit{
  progressWidth: string = '0%';
  totalSlides: number = 0;
  currentSlide: number = 0;
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    // Initialize the total slides
    this.totalSlides = 3; // Update this based on your number of slides
  }

  ngAfterViewInit() {
    // Get the carousel element using Renderer2
    const carouselElement = this.el.nativeElement.querySelector('#eLearningCarousel');

    if (carouselElement) {
      // Listen for the 'slid.bs.carousel' event using Renderer2
      this.renderer.listen(carouselElement, 'slid.bs.carousel', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target) {
          const activeSlide = target.querySelector('.carousel-item.active');
          if (activeSlide) {
            this.currentSlide = Array.from(target.querySelectorAll('.carousel-item')).indexOf(activeSlide);
            this.updateProgress();
          }
        }
      });
    }
  }

  updateProgress() {
    const progress = (this.currentSlide / (this.totalSlides - 1)) * 100;
    this.progressWidth = `${progress}%`;
  }
}

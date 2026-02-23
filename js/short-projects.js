function navigateToProjects(event) {
    event.preventDefault();
    window.location.href = '../index.html#projects';
    return false;
}

// Main Slideshow
let mainSlideIndex = 0;
const mainSlides = document.querySelectorAll('.media-showcase .slide');
const mainDots = document.querySelectorAll('.media-showcase .slide-dot');

function showMainSlide(index) {
    if (mainSlides.length === 0) return;
    
    if (index >= mainSlides.length) mainSlideIndex = 0;
    if (index < 0) mainSlideIndex = mainSlides.length - 1;
    
    mainSlides.forEach(slide => slide.classList.remove('active'));
    mainDots.forEach(dot => dot.classList.remove('active'));
    
    mainSlides[mainSlideIndex].classList.add('active');
    mainDots[mainSlideIndex].classList.add('active');
}

function changeMainSlide(direction) {
    mainSlideIndex += direction;
    showMainSlide(mainSlideIndex);
}

function currentMainSlide(index) {
    mainSlideIndex = index;
    showMainSlide(mainSlideIndex);
}

// Step Slideshows
const stepSlideshows = {};

function initStepSlideshow(stepId) {
    const container = document.getElementById(`slideshow-${stepId}`);
    if (!container || container.classList.contains('empty')) return;
    
    stepSlideshows[stepId] = {
        index: 0,
        slides: container.querySelectorAll('.step-slide'),
        dots: container.querySelectorAll('.step-slide-dot')
    };
}

function showStepSlide(stepId, index) {
    const slideshow = stepSlideshows[stepId];
    if (!slideshow || slideshow.slides.length === 0) return;
    
    if (index >= slideshow.slides.length) slideshow.index = 0;
    if (index < 0) slideshow.index = slideshow.slides.length - 1;
    
    slideshow.slides.forEach(slide => slide.classList.remove('active'));
    slideshow.dots.forEach(dot => dot.classList.remove('active'));
    
    slideshow.slides[slideshow.index].classList.add('active');
    if (slideshow.dots[slideshow.index]) {
        slideshow.dots[slideshow.index].classList.add('active');
    }
}

function changeStepSlide(stepId, direction) {
    if (!stepSlideshows[stepId]) return;
    stepSlideshows[stepId].index += direction;
    showStepSlide(stepId, stepSlideshows[stepId].index);
}

function currentStepSlide(stepId, index) {
    if (!stepSlideshows[stepId]) return;
    stepSlideshows[stepId].index = index;
    showStepSlide(stepId, stepSlideshows[stepId].index);
}

// Initialize all step slideshows on page load
document.addEventListener('DOMContentLoaded', function() {
    initStepSlideshow('step1');
    initStepSlideshow('step2');
    initStepSlideshow('step3');
    initStepSlideshow('step4');
    // Add more if you have more steps
});
// Step 1: Get DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function () {
  showSlider('next');
};

prevDom.onclick = function () {
  showSlider('prev');
};

let runNextAuto;

function startAutoSlide() {
  runNextAuto = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);
}

function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
  let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

  if (type === 'next') {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
  } else if (type === 'prev') {
    SliderDom.insertBefore(SliderItemsDom[SliderItemsDom.length - 1], SliderItemsDom[0]);
    thumbnailBorderDom.insertBefore(thumbnailItemsDom[thumbnailItemsDom.length - 1], thumbnailItemsDom[0]);
  }

  // Restart the auto slide timeout after manual slide
  clearTimeout(runNextAuto);
  startAutoSlide();
}

document.addEventListener('DOMContentLoaded', function () {
  const videoButtons = document.querySelectorAll('.btn');
  const videoContainer = document.getElementById('videoContainer');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeBtn');

  videoButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const videoUrl = this.getAttribute('data-video-url');
      const iframe = videoContainer.querySelector('iframe');
      iframe.src = videoUrl;
      videoContainer.style.display = 'block';
      overlay.style.display = 'block';

      // Clear the auto slide timeout when video is playing
      clearTimeout(runNextAuto);
    });
  });

  const hideVideo = () => {
    videoContainer.style.display = 'none';
    overlay.style.display = 'none';
    const iframe = videoContainer.querySelector('iframe');
    if (iframe) iframe.src = '';

    // Restart the auto slide timeout when video is closed
    startAutoSlide();
  };

  closeBtn.addEventListener('click', hideVideo);
  overlay.addEventListener('click', hideVideo);

  // Initialize the auto slide timeout
  startAutoSlide();

  // Add event listener for keyboard input
  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
      nextDom.click();
    } else if (event.key === 'ArrowLeft') {
      prevDom.click();
    }
  });
});

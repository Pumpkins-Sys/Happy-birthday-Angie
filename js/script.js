 const initialHint = document.getElementById("initial-hint");
      const slides = document.querySelectorAll(".content-slide");
      let currentSlideIndex = 0;
      let autoTransitionInterval;
      const transitionDelay = 12000; // 12 seconds per slide

      const audio = document.getElementById("birthday-audio");
      const musicIconFixed = document.getElementById("music-icon-fixed");
      const visualizerFixed = document.getElementById("visualizer-fixed");

      let isMusicPlaying = false;

      // Function to show a specific slide
      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.remove("active");
          slide.classList.remove("enlarged");
          if (i === index) {
            slide.classList.add("active");
          }
        });
      }

      // Function to transition to the next slide
      function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
      }

      // Start automatic transitions
      function startAutoTransitions() {
        stopAutoTransitions();
        autoTransitionInterval = setInterval(nextSlide, transitionDelay);
      }

      // Stop automatic transitions
      function stopAutoTransitions() {
        clearInterval(autoTransitionInterval);
      }

      // Audio toggle function
      function toggleAudio() {
        if (audio.paused || audio.muted) {
          audio.muted = false;
          audio
            .play()
            .then(() => {
              isMusicPlaying = true;
              musicIconFixed.textContent = "🎜";
              visualizerFixed.style.opacity = "1";
              startAutoTransitions();
            })
            .catch((e) => {
              console.error("Audio play failed:", e);
              isMusicPlaying = false;
              musicIconFixed.textContent = "🔇";
              visualizerFixed.style.opacity = "0";
              stopAutoTransitions();
            });
        } else {
          audio.pause();
          isMusicPlaying = false;
          musicIconFixed.textContent = "🔇";
          visualizerFixed.style.opacity = "0";
          stopAutoTransitions();
        }
      }

      // Event listener for when audio ends
      audio.addEventListener("ended", () => {
        audio.currentTime = 0;
        if (isMusicPlaying) {
          audio.play();
        }
      });

      // Initial setup
      document.addEventListener("DOMContentLoaded", () => {
        slides.forEach((slide) => {
          slide.classList.remove("active");
        });

        initialHint.classList.remove("fade-out");
        audio.muted = true;
        audio.pause();
        visualizerFixed.style.opacity = "0";

        // Add click listener to the initial hint overlay
        initialHint.addEventListener(
          "click",
          () => {
            initialHint.classList.add("fade-out");

            setTimeout(() => {
              initialHint.style.display = "none";
              currentSlideIndex = 0;
              showSlide(currentSlideIndex);
              toggleAudio();
            }, 1500);
          },
          { once: true }
        );

        // Click-on-Slide Interaction
        slides.forEach((slide, index) => {
          slide.addEventListener("click", () => {
            if (index === currentSlideIndex) {
              if (slide.classList.contains("enlarged")) {
                slide.classList.remove("enlarged");
                if (isMusicPlaying) {
                  startAutoTransitions();
                }
              } else {
                slide.classList.add("enlarged");
                stopAutoTransitions();
              }
            }
          });
        });
      });
       document.addEventListener('DOMContentLoaded', function() {
    const poemParts = document.querySelectorAll('.poem-part');
    const nextButtons = document.querySelectorAll('.next-part-btn');
    const prevButtons = document.querySelectorAll('.prev-part-btn');
    
    function showPart(partNumber) {
      poemParts.forEach(part => {
        part.classList.remove('active');
        if (part.dataset.part === partNumber.toString()) {
          part.classList.add('active');
        }
      });
    }
    
    nextButtons.forEach(btn => {
      btn.addEventListener('click', () => showPart('2'));
    });
    
    prevButtons.forEach(btn => {
      btn.addEventListener('click', () => showPart('1'));
    });
    
    // Initialize with first part visible
    showPart('1');
  });
  document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('slider-track');
    const images = document.querySelectorAll('.slider-image');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Create dots
    images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    // Initialize slider
    function updateSlider() {
      images.forEach((img, index) => {
        img.classList.remove('active');
        dots[index].classList.remove('active');
      });
      
      images[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }
    
    // Navigation functions
    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
      resetAutoSlide();
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause on hover
    const slider = document.querySelector('.sleep-token-slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    });
    
    function handleSwipe() {
      const difference = touchStartX - touchEndX;
      if (difference > 50) { // Swipe left
        nextSlide();
      } else if (difference < -50) { // Swipe right
        prevSlide();
      }
    }
  });
   document.addEventListener('DOMContentLoaded', function() {
    const quotePart = document.querySelector('.quote-part');
    const finalMessagePart = document.querySelector('.final-message-part');
    const continueBtn = document.querySelector('.continue-btn');
    const backBtn = document.querySelector('.back-btn');
    
    continueBtn.addEventListener('click', function() {
      quotePart.style.opacity = '0';
      quotePart.style.transform = 'translateY(-20px)';
      finalMessagePart.classList.remove('hidden');
      finalMessagePart.classList.add('active');
    });
    
    backBtn.addEventListener('click', function() {
      finalMessagePart.classList.remove('active');
      finalMessagePart.classList.add('hidden');
      quotePart.style.opacity = '1';
      quotePart.style.transform = 'translateY(0)';
    });
  });

   document.addEventListener("DOMContentLoaded", () => {
    // Split text into characters for animation
    const titleLines = gsap.utils.toArray(".title-line");
    const textWords = gsap.utils.toArray(".text-words");
    
    // Create comet element
    const comet = document.createElement("div");
    comet.className = "comet";
    document.getElementById("intro-slide").appendChild(comet);
    
    // Master timeline
    const tl = gsap.timeline();
    
    // Title animation
    tl.to(titleLines, {
      duration: 1.5,
      opacity: 1,
      y: 0,
      stagger: 0.3,
      ease: "power3.out"
    });
    
    // Comet fly-by
    tl.to(comet, {
      duration: 1.2,
      x: window.innerWidth * 1.5,
      y: window.innerHeight * 0.3,
      rotation: -30,
      opacity: 1,
      ease: "power1.inOut"
    }, "-=1");
    
    // Text reveal animation (typewriter effect)
    tl.to(textWords, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      stagger: 0.03,
      ease: "back.out"
    }, "+=0.5");
    
    // Final sparkle effect
    tl.to(titleLines, {
      duration: 1,
      textShadow: "0 0 20px rgba(236, 72, 153, 0.8)",
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut"
    }, "-=0.5");
    
    // Comet fade out
    tl.to(comet, {
      duration: 0.8,
      opacity: 0,
      ease: "power1.out"
    }, "-=1");
  });
   document.addEventListener("DOMContentLoaded", () => {
    const birthdaySlide = document.getElementById("birthday-celebration");
    
    // Only animate if this slide is active
    if (birthdaySlide.classList.contains("active")) {
      const tl = gsap.timeline();
      
      // Happy text animation (bouncing)
      tl.to(".happy-line", {
        duration: 0.6,
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: "back.out(1.5)"
      });
      
      // Age reveal with hurray pop
      tl.to(".age-text", {
        duration: 0.5,
        opacity: 1
      }, "-=0.3");
      
      tl.to(".hurray", {
        duration: 0.8,
        scale: 1.2,
        ease: "elastic.out(1, 0.5)",
        repeat: 1,
        yoyo: true
      }, "-=0.2");
      
      // Wish text fade in
      tl.to(".wish-text", {
        duration: 0.8,
        opacity: 1
      }, "-=0.2");
      
      // Hug emoji pop
      tl.to(".hug-emoji", {
        duration: 0.8,
        opacity: 1,
        scale: 1.2,
        ease: "back.out(2)",
        yoyo: true,
        repeat: 1
      });
      
      // Continuous subtle hurray animation
      gsap.to(".hurray", {
        duration: 2,
        rotate: Math.random() > 0.5 ? 10 : -10,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }
  });
  // SAFE GSAP INITIALIZATION PATTERN
document.addEventListener("DOMContentLoaded", () => {
  // 1. Store all animation clean-up functions
  const cleanupCallbacks = [];
  
  // 2. Only initialize when slide exists
  const birthdaySlide = document.getElementById("birthday-celebration");
  if (!birthdaySlide) return;

  // 3. Run only when slide is active
  const observer = new MutationObserver(() => {
    if (birthdaySlide.classList.contains("active")) {
      startAnimations();
    } else {
      // Cleanup when slide becomes inactive
      cleanupCallbacks.forEach(fn => fn());
      cleanupCallbacks.length = 0;
    }
  });
  
  observer.observe(birthdaySlide, { 
    attributes: true, 
    attributeFilter: ['class'] 
  });

  function startAnimations() {
    // DEFENSIVE SELECTOR CHECKS
    const elements = {
      happyLines: gsap.utils.toArray(".happy-line"),
      hurray: document.querySelector(".hurray"),
      // Add all other selectors here...
    };
    
    // Verify elements exist before animating
    if (!elements.happyLines.length || !elements.hurray) {
      console.warn("Missing animation elements");
      return;
    }

    // MAIN TIMELINE (with cleanup)
    const tl = gsap.timeline();
    
    // Happy text animation
    tl.to(elements.happyLines, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      stagger: 0.15,
      ease: "back.out(1.5)"
    });

    // Continuous hurray animation (with cleanup)
    const hurrayAnimation = gsap.to(elements.hurray, {
      duration: 2,
      rotate: () => Math.random() > 0.5 ? 10 : -10,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
    
    // Store cleanup function
    cleanupCallbacks.push(() => {
      hurrayAnimation.kill();
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {

  GSAP.config({ nullTargetWarn: false });
  
 
  function safeAnimate(selector, animation) {
    const elements = document.querySelectorAll(selector);
    if (elements.length) gsap.to(elements, animation);
  }
  safeAnimate(".happy-line", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "back.out(1.5)"
  });
  
  safeAnimate(".hurray", {
    scale: 1.2,
    duration: 0.8,
    repeat: 1,
    yoyo: true,
    ease: "elastic.out(1, 0.5)"
  });
});
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 500);
    });
  
    // Initialize custom cursor
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursor && cursorOutline) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add a slight delay to the cursor outline for a smoother effect
        setTimeout(() => {
          cursorOutline.style.left = e.clientX + 'px';
          cursorOutline.style.top = e.clientY + 'px';
        }, 80);
      });
      
      // Handle hoverable elements
      const hoverables = document.querySelectorAll('a, button, .project-card, .skill-card');
      hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', () => {
          cursorOutline.classList.add('cursor-hover');
        });
        hoverable.addEventListener('mouseleave', () => {
          cursorOutline.classList.remove('cursor-hover');
        });
      });
      
      // Hide default cursor
      document.body.style.cursor = 'none';
    }
  
    // Initialize dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Check if user has already set a preference
      if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
      
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('theme', 'dark');
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          
          // Animate background color change
          document.body.style.transition = 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        } else {
          localStorage.setItem('theme', 'light');
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
      });
    }
  
    // Initialize mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
      });
      
      // Close mobile menu when a link is clicked
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenuToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Get the target's position relative to the top of the page
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const headerOffset = document.querySelector('header').offsetHeight;
          const finalPosition = targetPosition - headerOffset;
          
          window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Scroll animations
    const scrollElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const elementInView = (el, percentageScroll = 100) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementHeight = el.offsetHeight;
      const windowHeight = window.innerHeight;
      
      return (
        elementTop <= windowHeight * (percentageScroll / 100) &&
        elementTop + elementHeight >= 0
      );
    };
    
    const displayScrollElement = (element) => {
      element.classList.add('visible');
    };
    
    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 80)) {
          displayScrollElement(el);
        }
      });
    };
    
    window.addEventListener('scroll', () => {
      handleScrollAnimation();
    });
    
    // Trigger scroll animation check on load
    handleScrollAnimation();
  
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
      
      backToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // Initialize progress bar
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
      });
    }
  
    // Initialize project modals
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.modal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    
    projectCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        modals[index].classList.add('active');
        document.body.classList.add('no-scroll');
      });
    });
    
    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modals.forEach(modal => {
          modal.classList.remove('active');
        });
        document.body.classList.remove('no-scroll');
      });
    });
    
    // Close modal when clicked outside of content
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      });
    });
  
    // Initialize skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    const skillModals = document.querySelectorAll('.skill-modal');
    const skillModalCloseBtns = document.querySelectorAll('.skill-modal .modal-close');
    
    skillCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (skillModals[index]) {
          skillModals[index].classList.add('active');
          document.body.classList.add('no-scroll');
        }
      });
    });
    
    skillModalCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        skillModals.forEach(modal => {
          modal.classList.remove('active');
        });
        document.body.classList.remove('no-scroll');
      });
    });
  
   
  
    // Initialize contact form
    const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());

    // Validate form
    let isValid = true;
    for (const [key, value] of Object.entries(formValues)) {
      if (!value.trim()) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      try {
        const response = await fetch("https://formspree.io/f/mvgkealy", {
          method: "POST",
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (response.ok) {
          contactForm.innerHTML = `
            <div class="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-2xl font-bold my-4">Message Sent!</h3>
              <p>Thanks for reaching out. I'll get back to you soon.</p>
            </div>
          `;
        } else {
          alert("Oops! Something went wrong. Please try again.");
        }
      } catch (error) {
        alert("There was an error submitting the form.");
        console.error(error);
      }
    } else {
      alert("Please fill out all fields.");
    }
  });
}

  
    // Initialize form animation
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
      // Handle initial state
      if (control.value) {
        control.nextElementSibling.classList.add('active');
      }
      
      control.addEventListener('focus', () => {
        control.nextElementSibling.classList.add('active');
      });
      
      control.addEventListener('blur', () => {
        if (!control.value) {
          control.nextElementSibling.classList.remove('active');
        }
      });
    });
  
    // Initialize sound toggle
    const soundToggle = document.querySelector('.sound-toggle');
    let audio;
    
    if (soundToggle) {
      // Create an audio element
      audio = new Audio('D:/prog/portfolio/Scam 1992.mp3'); // Replace with your sound URL
      audio.loop = true;
      audio.volume = 0.1;
      
      soundToggle.addEventListener('click', () => {
        if (audio.paused) {
          audio.play();
          soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
          audio.pause();
          soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
      });
    }
  
    // Initialize parallax effect
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    if (parallaxLayers.length) {
      document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        parallaxLayers.forEach((layer, index) => {
          const depth = (index + 1) * 10;
          const moveX = (x * depth) - (depth / 2);
          const moveY = (y * depth) - (depth / 2);
          
          layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });
    }
  
    // Initialize SVG animations
    const svgPaths = document.querySelectorAll('.svg-path');
    
    if (svgPaths.length) {
      const svgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.5 });
      
      svgPaths.forEach(path => {
        svgObserver.observe(path);
      });
    }
  
    // Initialize skill level animations
    const skillLevelFills = document.querySelectorAll('.skill-level-fill');
    
    if (skillLevelFills.length) {
      const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const skillLevel = entry.target.getAttribute('data-level');
            entry.target.style.width = skillLevel + '%';
          }
        });
      }, { threshold: 0.5 });
      
      skillLevelFills.forEach(fill => {
        skillObserver.observe(fill);
      });
    }
  
    // Initialize typing animation
    const typingElement = document.querySelector('.typing-animation');
    
    if (typingElement) {
      const text = typingElement.getAttribute('data-text');
      const typingDelay = 100;
      let charIndex = 0;
      
      function type() {
        if (charIndex < text.length) {
          typingElement.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(type, typingDelay);
        }
      }
      
      const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(type, typingDelay);
            typingObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      typingObserver.observe(typingElement);
    }
  
    // Initialize Easter eggs
    const easterEggs = document.querySelectorAll('.easter-egg');
    const easterEggContents = document.querySelectorAll('.easter-egg-content');
    
    easterEggs.forEach((egg, index) => {
      egg.addEventListener('click', () => {
        easterEggContents[index].classList.toggle('active');
      });
    });
    
    const easterEggCloseBtns = document.querySelectorAll('.easter-egg-close');
    
    easterEggCloseBtns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        easterEggContents[index].classList.remove('active');
      });
    });
  
    // Initialize animated counters
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            let count = 0;
            const duration = 2000; // 2 seconds duration
            const increment = target / (duration / 16); // 60fps
            
            const updateCount = () => {
              count += increment;
              entry.target.textContent = Math.min(Math.floor(count), target);
              
              if (count < target) {
                requestAnimationFrame(updateCount);
              } else {
                entry.target.textContent = target;
              }
            };
            
            updateCount();
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      counters.forEach(counter => {
        counterObserver.observe(counter);
      });
    }
  
    // Initialize project filtering
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectGrid = document.querySelector('.projects-grid');
    
    if (projectFilters.length && projectGrid) {
      projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
          // Remove active class from all filters
          projectFilters.forEach(f => {
            f.classList.remove('active');
          });
          
          // Add active class to clicked filter
          filter.classList.add('active');
          
          const category = filter.getAttribute('data-filter');
          
          // Filter project cards
          const projectCards = projectGrid.querySelectorAll('.project-card');
          
          projectCards.forEach(card => {
            card.style.display = 'block';
            
            if (category !== 'all' && !card.classList.contains(category)) {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  
    // Initialize tilt effect on project cards
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const tiltX = (y - 0.5) * 20;
        const tiltY = (0.5 - x) * 20;
        
        element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  
    // Initialize reveal on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      revealElements.forEach(element => {
        revealObserver.observe(element);
      });
    }
  });


// Skill filter functionality
document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".skill-category");
    const skillSections = document.querySelectorAll(".category-section");

    categoryButtons.forEach(button => {
      button.addEventListener("click", () => {
        const selectedCategory = button.getAttribute("data-category");
        const targetSection = document.getElementById(`${selectedCategory}-skills`);

        // Deactivate all category buttons
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        // Activate clicked button
        button.classList.add("active");

        // Hide all skill sections
        skillSections.forEach(section => section.classList.add("hidden"));

        // Show the selected section
        if (targetSection) {
          targetSection.classList.remove("hidden");
        }
      });
    });
  });

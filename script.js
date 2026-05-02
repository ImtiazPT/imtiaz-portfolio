document.addEventListener('DOMContentLoaded', () => {
    // Menu Icon Toggle
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    // Scroll Sections Active Link
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });

        // Sticky Header
        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);

        // Remove Toggle Icon and Navbar on click
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };

    // Custom Typing Animation
    const spanElement = document.querySelector('.multiple-text');
    const texts = ['Web Developer', 'Web Designer', 'Graphic Designer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentText = texts[textIndex];



        if (isDeleting) {

            spanElement.textContent = currentText.substring(0, charIndex--);

        } else {

            spanElement.textContent = currentText.substring(0, charIndex++);

        }



        // Typing Speed

        let typeSpeed = isDeleting ? 200 : 200;



        if (!isDeleting && charIndex === currentText.length) {

            // Pause at end of word

            typeSpeed = 400;

            isDeleting = true;

        } else if (isDeleting && charIndex === 0) {

            // Switch to next word

            isDeleting = false;

            textIndex = (textIndex + 1) % texts.length;

            typeSpeed = 200;

        }



        setTimeout(typeEffect, typeSpeed);

    }

    typeEffect();

    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
            } else {
                // Open this if you want repeated animations when scrolling up and down
                // entry.target.classList.remove('show-animate');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.animate');
    hiddenElements.forEach((el) => observer.observe(el));

// Upgraded Lightbox Logic with Zoom
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close-btn");
const portfolioBoxes = document.querySelectorAll('.portfolio-box');
const navBar = document.querySelector('.header');

let scrollPos = 0;

portfolioBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
        // If clicking the external link icon, don't open the zoom
        if (e.target.closest('a')) return; 

        e.preventDefault();
        const img = box.querySelector('img');
        
        // Show Modal
        modal.style.display = "flex"; 
        modalImg.src = img.src;
        modalImg.style.transform = "scale(1)"; // Reset zoom on open
        
        // Hide Navbar and lock scroll
        navBar.style.display = 'none';
        scrollPos = window.scrollY;
        document.body.style.overflow = 'hidden'; 
    });
});

// Close Logic
const closeModal = () => {
    modal.style.display = "none";
    navBar.style.display = 'flex';
    document.body.style.overflow = 'auto';
};

closeBtn.onclick = closeModal;

// Close on background click
window.onclick = (event) => {
    if (event.target == modal) closeModal();
}

// Simple Mousewheel Zoom Feature
modal.onwheel = (e) => {
    e.preventDefault();
    let scale = parseFloat(modalImg.style.transform.replace('scale(', '').replace(')', '')) || 1;
    
    if (e.deltaY < 0) {
        scale = Math.min(scale + 0.2, 3); // Zoom In (Max 3x)
    } else {
        scale = Math.max(scale - 0.2, 0.5); // Zoom Out (Min 0.5x)
    }
    
    modalImg.style.transform = `scale(${scale})`;
};
    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = this.name.value;
            const email = this.email.value;
            const phone = this.phone.value;
            const subject = this.subject.value;
            const message = this.message.value;

            const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:abirhosan42@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
        });
    }
});


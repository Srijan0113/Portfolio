/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    /* Open / close menu */

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    /* Close menu after clicking a link */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (!clickedInsideMenu && !clickedToggle) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* Close menu with Escape */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");


        /* Ignore external links */

        if (
            !targetId ||
            !targetId.startsWith("#")
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        const navbar =
            document.querySelector(".navbar");


        const navbarHeight =
            navbar ? navbar.offsetHeight : 75;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionBottom =
            sectionTop + section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");


        const linkTarget =
            link.getAttribute("href");


        if (
            linkTarget === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


/* Update while scrolling */

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* Initial state */

updateActiveNavigation();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".education, " +
        ".skill-card, " +
        ".project-card, " +
        ".contact-content"
    );


/*
    Add reveal class to elements.
*/

revealElements.forEach(element => {

    element.classList.add("reveal");

});


/* =========================================================
   REVEAL OBSERVER
========================================================= */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12,

            rootMargin: "0px 0px -40px 0px"
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   PROJECT CARD STAGGER
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card, index) => {

    /*
        Small delay between cards.

        Example:
        Card 1 → 0ms
        Card 2 → 80ms
        Card 3 → 160ms
        etc.
    */

    card.style.transitionDelay =
        `${index * 80}ms`;

});


/* =========================================================
   PROJECT BUBBLE INTERACTION
========================================================= */

projectCards.forEach(card => {

    const bubbles =
        card.querySelectorAll(".tech-bubble");


    card.addEventListener("mouseenter", () => {

        bubbles.forEach((bubble, index) => {

            bubble.style.transitionDelay =
                `${index * 40}ms`;

        });

    });


    card.addEventListener("mouseleave", () => {

        bubbles.forEach(bubble => {

            bubble.style.transitionDelay = "0ms";

        });

    });

});


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach(image => {

    image.addEventListener("error", () => {

        /*
            Do not completely break the card
            if an image is missing.
        */

        image.style.display = "none";


        const parent =
            image.closest(
                ".project-media, .profile-frame"
            );


        if (
            parent &&
            !parent.querySelector(".image-error")
        ) {

            const message =
                document.createElement("span");


            message.className =
                "image-error";


            message.textContent =
                "Preview unavailable";


            parent.appendChild(message);

        }

    });

});


/* =========================================================
   FOOTER YEAR
========================================================= */

const footerText =
    document.querySelector(".footer p");


if (footerText) {

    const currentYear =
        new Date().getFullYear();


    footerText.textContent =
        `© ${currentYear} Srijan Poudel. All rights reserved.`;

}


/* =========================================================
   ACTIVE PROJECT CARD
========================================================= */

/*
    Adds a small active class when the project
    enters the viewport.

    This is separate from the general reveal
    animation so we can later use it for
    more project-specific effects.
*/

const projectObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "project-visible"
                    );

                }

            });

        },

        {
            threshold: 0.25
        }

    );


projectCards.forEach(card => {

    projectObserver.observe(card);

});


/* =========================================================
   PREVENT BROKEN INTERNAL PROJECT LINKS
========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="assets/"]'
    );


internalLinks.forEach(link => {

    link.addEventListener("click", event => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        /*
            Browser handles the actual file.
            This only makes sure empty paths
            are not accidentally followed.
        */

        if (href.trim() === "") {

            event.preventDefault();

        }

    });

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});


/* =========================================================
   RESIZE HANDLING
========================================================= */

let resizeTimer;


window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);


    resizeTimer = setTimeout(() => {

        /*
            Recalculate active section after
            the layout changes.
        */

        updateActiveNavigation();

    }, 150);

});


/* =========================================================
   REDUCED MOTION SUPPORT
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    revealElements.forEach(element => {

        element.classList.add("show");

    });

}


/* =========================================================
   END
========================================================= */
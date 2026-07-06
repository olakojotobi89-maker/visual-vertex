/* ==========================================
   Visual Vertex Technology Company
   Main JavaScript
========================================== */
/* ==========================================
   Premium Loader
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1200);

});

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
      Sticky Header
    ==============================*/

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.style.background = "#111111";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";

        } else {

            header.style.background = "rgba(10,10,10,.92)";
            header.style.boxShadow = "none";

        }

    });


    /*==============================
      Back To Top Button
    ==============================*/

    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });


    /*==============================
      Smooth Scroll
    ==============================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });


    /*==============================
      Animated Counter
    ==============================*/

    const counters = document.querySelectorAll(".stat-card h2");

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.innerText);

            let current = 0;

            const speed = target / 120;

            const updateCounter = () => {

                current += speed;

                if (current < target) {

                    counter.innerText = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /*==============================
      Scroll Reveal
    ==============================*/

    const revealElements = document.querySelectorAll(

        ".about-card,.service-card,.portfolio-card,.mission-card,.contact-item,.why-item"

    );

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: .15

    });

    revealElements.forEach(el => {

        el.style.opacity = "0";

        el.style.transform = "translateY(60px)";

        el.style.transition = ".7s ease";

        revealObserver.observe(el);

    });
/* ==========================================
Premium Card Hover
========================================== */

document.querySelectorAll(
".service-card,.about-card,.mission-card,.portfolio-card"
).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-.5)*8;
const rotateX=((y/rect.height)-.5)*-8;

card.style.transition="0s";

card.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-12px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transition=".45s";

card.style.transform=

"perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

});

});

    /*==============================
      Active Navigation
    ==============================*/

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

});

/* ==========================================
   Premium Hover Effects
========================================== */

const cards = document.querySelectorAll(
    ".service-card, .about-card, .mission-card"
);

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((y / rect.height) - 0.5) * -12;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

    });

});


/* ==========================================
   Hero Floating Image
========================================== */

const heroImage = document.querySelector(".hero-image img");

if(heroImage){

document.addEventListener("mousemove",(e)=>{

const x = (window.innerWidth/2 - e.clientX)/35;
const y = (window.innerHeight/2 - e.clientY)/35;

heroImage.style.transform =
`translate(${x}px,${y}px)`;

});

}


/* ==========================================
   Button Ripple Effect
========================================== */

document.querySelectorAll(".btn-primary").forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(
this.clientWidth,
this.clientHeight
);

circle.style.width=diameter+"px";
circle.style.height=diameter+"px";

circle.style.left=e.offsetX-diameter/2+"px";
circle.style.top=e.offsetY-diameter/2+"px";

circle.classList.add("ripple");

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},700);

});

});


/* ==========================================
   Navbar Fade
========================================== */

const nav=document.querySelector("nav");

if(nav){

nav.addEventListener("mouseenter",()=>{

nav.style.transition=".3s";
nav.style.opacity="1";

});

nav.addEventListener("mouseleave",()=>{

nav.style.opacity=".98";

});

}
/* ==========================================
   Scroll Progress Bar
========================================== */

const progressBar = document.createElement("div");
progressBar.id = "scroll-progress";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    progressBar.style.width = progress + "%";

});


/* ==========================================
   Page Fade In
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* ==========================================
   Floating Animation
========================================== */

document.querySelectorAll(".service-card").forEach((card, index) => {

    card.style.animation =
        `floatCard 4s ease-in-out ${index * .2}s infinite`;

});


/* ==========================================
   Magnetic Buttons
========================================== */

document.querySelectorAll(".btn-primary").forEach(button => {

    button.addEventListener("mousemove", e => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.transform =
            `translate(
            ${(x - rect.width / 2) / 12}px,
            ${(y - rect.height / 2) / 12}px
            )`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0,0)";

    });

});


/* ==========================================
   Navbar Shrink
========================================== */

const navbar = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 120) {

        navbar.classList.add("navbar-small");

    } else {

        navbar.classList.remove("navbar-small");

    }

});


/* ==========================================
   Hero Text Animation
========================================== */

const heroTitle = document.querySelector(".hero-content h1");

if (heroTitle) {

    heroTitle.animate(

        [

            {
                opacity: 0,
                transform: "translateY(40px)"
            },

            {
                opacity: 1,
                transform: "translateY(0)"
            }

        ],

        {

            duration: 1200,

            easing: "ease-out",

            fill: "forwards"

        }

    );

}


/* ==========================================
   Footer Fade
========================================== */

const footer = document.querySelector("#footer");

const footerObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            footer.style.opacity = "1";
            footer.style.transform = "translateY(0)";

        }

    });

});

if (footer) {

    footer.style.opacity = "0";
    footer.style.transform = "translateY(80px)";
    footer.style.transition = ".8s ease";

    footerObserver.observe(footer);

}


/* ==========================================
   Console Signature
========================================== */

console.log(
"%cVisual Vertex Technology Company",
"font-size:20px;color:#E11D2E;font-weight:bold;"
);

console.log(
"%cBuilding technology that shapes the future.",
"font-size:14px;color:#666;"
);
/* ==========================================
Hero Mouse Parallax
========================================== */

const hero=document.querySelector(".hero-image");

document.addEventListener("mousemove",(e)=>{

if(!hero) return;

const x=(window.innerWidth/2-e.clientX)/45;
const y=(window.innerHeight/2-e.clientY)/45;

hero.style.transform=`translate(${x}px,${y}px)`;

});
/*==========================================
Mouse Spotlight
==========================================*/

const spotlight = document.getElementById("spotlight");

document.addEventListener("mousemove",(e)=>{

    if(!spotlight) return;

    spotlight.style.left = e.clientX + "px";
    spotlight.style.top = e.clientY + "px";

});
/*==========================================
Cursor Glow
==========================================*/

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});
/*==========================================
Hero Particles (Setup)
==========================================*/

const canvas = document.getElementById("particles");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const particles = [];

    class Particle {

        constructor() {

            this.reset();

            this.y = Math.random() * canvas.height;

        }

        reset() {

            this.x = Math.random() * canvas.width;

            this.y = canvas.height + Math.random() * 100;

            this.size = Math.random() * 3 + 1;

            this.speed = Math.random() * 0.8 + 0.3;

            this.opacity = Math.random() * 0.5 + 0.2;

        }

        update() {

            this.y -= this.speed;

            if (this.y < -10) {

                this.reset();

            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            ctx.fillStyle = `rgba(225,29,46,${this.opacity})`;

            ctx.fill();

        }

    }

    for (let i = 0; i < 80; i++) 

        particles.push(new Particle());
/*==========================================
Animate Particles
==========================================*/

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {

            particle.update();

            particle.draw();

        });

        requestAnimationFrame(animate);

    }

    animate();

}
const heroLogo = document.querySelector(".hero-image img");

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroLogo.style.transform = `
        rotateY(${-x}deg)
        rotateX(${y}deg)
        translateY(-8px)
    `;

});

document.addEventListener("mouseleave", () => {

    heroLogo.style.transform = "";

});

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

/*==========================================
Mobile Menu
==========================================*/


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.classList.toggle("active");

});
/*==========================================
Premium Navbar
==========================================*/

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});
/*==========================================
Magnetic Buttons
==========================================*/

document.querySelectorAll(".btn-primary").forEach(button=>{

button.addEventListener("mousemove",(e)=>{

const rect=button.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

button.style.transform=

`translate(
${(x-rect.width/2)/12}px,
${(y-rect.height/2)/12}px)`;

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translate(0,0)";

});

});
/*==========================================
3D Cards
==========================================*/

document.querySelectorAll(

".service-card,.portfolio-card,.about-card"

).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=(y-rect.height/2)/12;

const rotateY=(rect.width/2-x)/12;

card.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});
/*==========================================
Glow Mouse
==========================================*/

document.querySelectorAll(

".service-card,.about-card,.portfolio-card"

).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

card.style.setProperty(

"--x",

`${e.clientX-rect.left}px`

);

card.style.setProperty(

"--y",

`${e.clientY-rect.top}px`

);

});

});
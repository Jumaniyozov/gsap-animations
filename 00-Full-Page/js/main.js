gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();
  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      link.classList.add("animate-out");
      setTimeout(() => {
        link.classList.remove("animate-out");
      }, 300);
    });
  });

  function navAnimation(direction) {
  
    const scrollingDown = direction === 1;
    const links = scrollingDown ? mainNavLinks : mainNavLinksRev;
    return gsap.to(links, {
      duration: .3,
      stagger: 0.05,
      autoAlpha: () => scrollingDown ? 0 : 1,
      y: () => scrollingDown ? 20 : 0,
      ease: 'Power4.out'
    });
  }

  ScrollTrigger.create({
    start: 100,
    end: 'bottom bottom-=20',
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
  });
}

function initHeaderTilt() {
    document.querySelector('header').addEventListener('mousemove', moveImages);
}

function moveImages(e) {
    const {offsetX, offsetY, target} = e;
    const {clientWidth, clientHeight} = target;
    // console.log(offsetX, offsetY, clientWidth, clientHeight);
    const xPos = (offsetX / clientWidth) - 0.5;
    const yPos = (offsetY / clientHeight) - 0.5;

    const leftImage = gsap.utils.toArray('.hg__left .hg__image');
    const rightImage = gsap.utils.toArray('.hg__right .hg__image');
    
    const modifier = (index) => index*1.2+.5;

    leftImage.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.5,
            x: xPos * 20 * modifier(index),
            y: yPos * 30,
            rotationY: xPos*40,
            rotationX: yPos*10,
            ease: 'Power4.out'
        })
    })

    rightImage.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.5,
            x: xPos * 20 * modifier(index),
            y: -yPos * 30,
            rotationY: xPos*40,
            rotationX: yPos*10,
            ease: 'Power4.out'
        })
    })
}

function init() {
  // start here

  initNavigation();
  initHeaderTilt();
}

window.addEventListener("load", function () {
  init();
});

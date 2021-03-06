gsap.registerPlugin(ScrollTrigger);


const allLinks = gsap.utils.toArray('.portfolio__categories a');
const pageBackground = document.querySelector('.fill-background');
const largeImage = document.querySelector('.portfolio__image--l');
const smallImage = document.querySelector('.portfolio__image--s');
const lInside = document.querySelector('.portfolio__image--l .image_inside');
const sInside = document.querySelector('.portfolio__image--s .image_inside');

function initPortfoliohover() {
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', createPortfolioHover);
        link.addEventListener('mouseleave', createPortfolioHover);
        link.addEventListener('mousemove', createPortfolioMove);
    })
}

function createPortfolioHover(e) {
    if (e.type === 'mouseenter') {
        const {color, imagelarge, imagesmall} = e.target.dataset;
        const allSiblings = allLinks.filter(item => item !== e.target);
        const tl = gsap.timeline();
        tl
            .set(lInside, {backgroundImage: `url(${imagelarge}`})
            .set(sInside, {backgroundImage: `url(${imagesmall}`})
            .to([largeImage, smallImage], {duration: 1, autoAlpha: 1})
            .to(allSiblings, {color: '#fff', autoAlpha: .2}, 0)
            .to(e.target, {color: '#fff', autoAlpha: 1}, 0)
            .to(pageBackground, {backgroundColor: color, ease: 'none'}, 0)

    } else if (e.type === 'mouseleave') {


        const tl = gsap.timeline();

        tl
            .to([largeImage, smallImage], {autoAlpha: 0})
            .to(allLinks, {color: '#000000', autoAlpha: 1}, 0)
            .to(pageBackground, {color: '#ACbB7AB', ease: 'none'}, 0)
    }
}

function getNumber(clientY) {
    return document.querySelector('.portfolio__categories').clientHeight - clientY;
}

function createPortfolioMove(e) {
    const {clientY} = e;
    gsap.to(largeImage,
        {
            duration: 1.2,
            y: -getNumber(clientY)/7,
            x: -getNumber(clientY)/8,
            ease: 'Power3.out'
        })



    gsap.to(smallImage,
        {
            duration: 1.5,
            y: getNumber(clientY)/3,
            x: getNumber(clientY)/9,
            ease: 'Power3.out'
        })
}


function init() {

    // start here
    initPortfoliohover();
}

window.addEventListener('load', function () {
    init();
});

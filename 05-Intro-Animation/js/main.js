gsap.registerPlugin(ScrollTrigger);

function getSelector(selector) {
    return document.querySelector(selector);
}

function getSelectorAll(selector) {
    return document.querySelectorAll(selector);
}


const loader = getSelector('.loader');
const loaderInner = getSelector('.loader .inner');
const progressBar = getSelector('.loader .progress');
const loaderMask = getSelector('.loader__mask');

gsap.set(loader, {autoAlpha: 1});

gsap.set(loaderInner, {scaleY: 0.005, transformOrigin: 'bottom'})

const progressTween = gsap.to(progressBar, {paused: true, scaleX: 0, ease: 'none', transformOrigin: 'right'})

let loadImageCount = 0, imageCount;
const container = getSelector('#main');

const imgLoad = imagesLoaded(container);
imageCount = imgLoad.images.length;

updateProgress(0);

imgLoad.on('progress', function () {
    loadImageCount++;
    updateProgress(loadImageCount);
})

function updateProgress(value) {
    gsap.to(progressTween, {progress: value / imageCount, duration: 0.3, ease: 'power1.out'})
}

imgLoad.on('done', function (instance) {
    gsap.set(progressBar, {autoAlpha: 0, onComplete: initPageTransitions})
})

function initLoader() {
    const tlLoaderIn = gsap.timeline({
        id: 'tlLoaderIn',
        defaults: {
            duration: 1.1,
            ease: 'power2.out'
        },
        onComplete: () => getSelector('body').classList.remove('is-loading')
    });

    const image = getSelector('.loader__image img');
    const mask = getSelector('.loader__image--mask');
    const line1 = getSelector('.loader__title--mask:nth-child(1) span');
    const line2 = getSelector('.loader__title--mask:nth-child(2) span');
    const lines = getSelectorAll('.loader__title--mask');
    const loaderContent = getSelector('.loader__content');

    tlLoaderIn
        .set(loaderContent, {autoAlpha: 1})
        .to(loaderInner, {
            scaleY: 1,
            transformOrigin: 'bottom',
            ease: 'power2.inOut'
        })
        .addLabel('revealImage')
        .from(mask, {yPercent: 100}, 'revealImage-=0.6')
        .from(image, {yPercent: -80}, 'revealImage-=0.6')
        .from([line1, line2], {yPercent: 100, stagger: 0.1}, 'revealImage-=0.4')

    const tlLoaderOut = gsap.timeline({
        id: 'tlLoaderOut',
        defaults: {
            duration: 1.2,
            ease: 'power2.inOut'
        },
        delay: 1
    });

    tlLoaderOut
        .to(lines, {yPercent: -300, stagger: 0.2}, 0)
        .to([loader, loaderContent], {yPercent: -100}, 0.2)
        .from('#main', {y: 150}, 0.2)

    const tlLoader = gsap.timeline();

    tlLoader.add(tlLoaderIn).add(tlLoaderOut)

}

function pageTransitionIn({container}) {

    const tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power1.inOut'
        }
    });
    tl
        .set(loaderInner, {autoAlpha: 0})
        .fromTo(loader, {yPercent: -100}, {yPercent: 0})
        .fromTo(loaderMask, {yPercent: 80}, {yPercent: 0}, 0)
        .to(container, {y: 150}, 0)

    return tl;

    // return gsap.to('.transition', {duration: 1, yPercent: -100, ease: '-power1.inOut'})
}

function pageTransitionOut({container}) {

    const tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power1.inOut'
        }
    });
    tl
        .to(loader, {yPercent: 100})
        .to(loaderMask, {yPercent: -80}, 0)
        .from(container, {y: -150}, 0)

    return tl;

    // return gsap.to('.transition', {duration: 1, yPercent: 0, ease: 'power1.inOut'});
}

function initPageTransitions(param) {

    barba.hooks.before(() => {
        document.querySelector('html').classList.add('is-transitioning');
    })

    barba.hooks.after(() => {
        document.querySelector('html').classList.remove('is-transitioning');
    })

    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    })

    barba.init({
        transitions: [{
            once() {

                initLoader();
            },
            async leave({current}) {
                await pageTransitionIn(current)
            },
            enter({next}) {
                pageTransitionOut(next)
            }
        }]
    })
}

// function init() {
//
//     // start here
//     initLoader();
// }
//
// window.addEventListener('load', function () {
//     init();
// });

gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.rg__column');

function initHoverReveal() {

    sections.forEach(section => {

        section.imageBlock = section.querySelector('.rg__image');
        section.image = section.querySelector('.rg__image img');
        section.mask = section.querySelector('.rg__image--mask');
        section.text = section.querySelector('.rg__text');
        section.textCopy = section.querySelector('.rg__text--copy');
        section.textMask = section.querySelector('.rg__text--mask');
        section.textP = section.querySelector('.rg__text--copy p');
        // section.textHeight = section.querySelector('.rg__text--copy').clientHeight;

        gsap.set(section.imageBlock, {yPercent: -101});
        gsap.set(section.mask, {yPercent: 100});
        gsap.set([section.textMask, section.textP], {yPercent: 100});
        gsap.set(section.image, {scale: 1.2});

        section.addEventListener('mouseenter', createHoverReveal);
        section.addEventListener('mouseleave', createHoverReveal);
    })

}

function getTextHeight(textCopy) {
    return textCopy.clientHeight;
}

function createHoverReveal(e) {

    const {mask, imageBlock, text, textCopy, textMask, textP, image} = e.target;

    const tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'Power4.out'
        }
    })

    if (e.type === 'mouseenter') {
        tl
            .to([mask, imageBlock, textMask, textP], {yPercent: 0})
            .to(text, {y: () => -getTextHeight(textCopy / 2)}, 0)
            .to(image, {duration: 1.2, scale: 1}, 0)
    } else if (e.type === 'mouseleave') {
        tl
            .to([mask, textP], {yPercent: 100})
            .to([imageBlock, textMask], {yPercent: -101}, 0)
            .to(text, {y: 0}, 0)
            .to(image, {duration: 1.2, scale: 1.2}, 0)
    }

    return tl;
}

// function init() {
//
//     // start here
//     initHoverReveal();
// }
//
// window.addEventListener('load', function () {
//     init();
// });

const mq = window.matchMedia("(min-width: 768px)");

mq.addEventListener('change', handleWidthChange);

handleWidthChange(mq);

function resetProps(elements) {
    gsap.killTweensOf('*');
    if (elements.length) {
        elements.forEach(el => {
            el && gsap.set(el, {clearProps: 'all'})
        })
    }
}

function handleWidthChange(mq) {
    if (mq.matches) {
        initHoverReveal();
    } else {
        sections.forEach(section => {
            section.removeEventListener('mouseenter', createHoverReveal);
            section.removeEventListener('mouseleave', createHoverReveal);
            const {mask, imageBlock, text, textCopy, textMask, textP, image} = section;

            resetProps([mask, imageBlock, text, textCopy, textMask, textP, image]);
        })
    }
}

const slideShows = document.querySelectorAll('section div.slides');

slideShows.forEach(slideShow => {
    let current = 0;
    let z = 10000000;

    let images = slideShow.querySelectorAll('div.slides img');

    gsap.set(images, {opacity: 0});

    imagesLoaded(images, () => {
        gsap.set(images, {opacity: 1})
        const slideUpTimeline = gsap.timeline();

        slideUpTimeline
            .set(images, {
                x: () => {
                    return 500 * Math.random() - 250;
                },
                y: 1000, 
                rotation: () => {
                    return Math.random() * 90 - 45;
                }
            })
            .to(images, { x: 0, y: 0 , stagger: -0.25})
            .to(images, { rotation: () => {
                return Math.random() * 20 - 8;
            }})
    
        images.forEach(image => {
            z -= 1;
            image.style.zIndex = z;
        })
    
        slideShow.addEventListener('click', () => {
            z -= 1;
    
            const currentImage = images[current];
    
            const flipTimeline = gsap.timeline();
            let direction = '150%';
            let angle = '15';
    
            if(Math.random() > 0.5) {
                direction = '-150%';
                angle = '-15';
            }
    
            flipTimeline
                .set(currentImage, { x : 0 })
                .to(currentImage, { x : direction, rotate: angle })
                .set(currentImage, { zIndex: z }) 
                .to(currentImage, { x: 0 })
    
            // images[current].style.zIndex = z;
            
            current = (current + 1) % images.length;
        })
    });
});
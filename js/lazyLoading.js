const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
            entry.target.src = entry.target.dataset.src;
            // entry.target.addEventListener('load', function () {
            //     entry.target.classList.remove('lazy-img');
            // });
        }
    );
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));
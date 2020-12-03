let tab = function () {
    let tabNav = document.querySelectorAll('.portfolio__work-left li a'),
        tabContent = document.querySelectorAll('.portfolio__work-right a'),
        tabName;
    console.log(tabNav);

    for (let i = 0; i < tabNav.length; i++) {
        tabNav[i].addEventListener('click', selectTabNav);
    }

    function selectTabNav() {
        event.preventDefault();
        for (let i = 0; i < tabNav.length; i++) {
            tabNav[i].classList.remove('is-active');
        }
        this.classList.add('is-active');
        tabName = this.getAttribute('data-tab');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].classList.contains(tabName) ? tabContent[i].classList.add('is-active') : tabContent[i].classList.remove('is-active');
        }
        if (tabName === 'all') {
            for (let i = 0; i < tabContent.length; i++) {
                tabContent[i].classList.add('is-active');
            }
        }

    }
}

tab();;
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }


    setTimeout(() => {
        animOnScroll();
    }, 300);
};
let menuBurger = document.querySelector('.menu__burger');
let menu = document.querySelector('.menu');
let back = document.querySelector('body');
let headerList = document.querySelectorAll('.menu ul li a');

menuBurger.onclick = function () {
    menuBurger.classList.toggle('active');
    menu.classList.toggle('active');
    back.classList.toggle('lock');
}

for (let i = 0; i < headerList.length; i++) {
    headerList[i].onclick = hideMenu;
}


function hideMenu() {
    menu.classList.remove('active');
    menuBurger.classList.remove('active');
    back.classList.toggle('lock');
};
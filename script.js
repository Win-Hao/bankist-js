'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const bthScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

console.log(btnsOpenModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// button scrolling
bthScroll.addEventListener('click', () => {
  const s1coords = section1.getBoundingClientRect();
  // window.scrollTo(
  //   window.scrollX + s1coords.left,
  //   window.scrollY + s1coords.top,
  // );
  // window.scrollTo({
  //   left: window.scrollX + s1coords.left,
  //   top: window.scrollY + s1coords.top,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tab component

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    const click = e.target.closest('.operations__tab');
    if (!click) return;
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabContents.forEach(tabContent =>
      tabContent.classList.remove('operations__content--active'),
    );
    click.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${click.dataset.tab}`)
      .classList.add('operations__content--active');
    // if (click.classList.contains('operations__tab')) {
    //   const tabId = e.target.dataset.tab;
    //   document
    //     .querySelector('.operations__tab--active')
    //     .classList.remove('operations__tab--active');
    //   const tab = document.querySelector(`.operations__tab--${tabId}`);
    //   tab.classList.add('operations__tab--active');
    //   document
    //     .querySelector('.operations__content--active')
    //     .classList.remove('operations__content--active');
    //   document
    //     .querySelector(`.operations__content--${tabId}`)
    //     .classList.add('operations__content--active');
    // }
  });

// menu fade animation

function hoverHandler(e) {
  const link = e.target;
  if (link.classList.contains('nav__link')) {
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(item => {
      if (item !== link) item.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', hoverHandler.bind(0.5));
nav.addEventListener('mouseout', hoverHandler.bind(1));

// Sticky navigation
/*
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const allSections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    e.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});
imgTargets.forEach(img => imgObserver.observe(img));

const slides = document.querySelectorAll('.slide');

// Selecting elements
/*

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
//.insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!!</button>';
// header.prepend(message); // 添加为第一个子元素
header.append(message); // 添加为最后一个子元素 dom元素一次只能添加一个地方
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

// Delete Element
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});
console.log(document.querySelector('.btn--close-cookie'));

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
document.documentElement.style.setProperty('--color-primary', 'orange');
//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
logo.alt = 'Beautiful minimalist logo';
// Non-standard
console.log(logo.getAttribute('')); // 获取属性的值
// Data Attributes
console.log(logo.dataset); // 获取attributes中data开头的属性
// Classes
logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();
*/

/*
const h1 = document.querySelector('h1');
const h1Alert = () => {
  alert('111');
};
h1.addEventListener('mouseenter', h1Alert);
h1.onmouseenter = () => {
  alert('111');
};
setTimeout(() => h1.removeEventListener('mouseenter', h1Alert), 1000);
*/
/*
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const randomColor = () => {
  return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)},${randomInt(0, 255)})`;
};
document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log(this);
  this.style.backgroundColor = randomColor(); // 此处的this指向所选择的dom元素
  // Stop propagation
  e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function () {
  this.style.backgroundColor = randomColor(); // 此处的this指向所选择的dom元素
});
document.querySelector('.nav').addEventListener('click', function () {
  this.style.backgroundColor = randomColor(); // 此处的this指向所选择的dom元素
});
*/
/*
const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.backgroundColor = 'var(--color-primary)'; // 查找最靠近的元素
console.log(h1.previousElementSibling); // 前一个兄弟元素
console.log(h1.nextElementSibling); // 下一个兄弟元素
*/

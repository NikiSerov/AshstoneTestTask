const header = document.querySelector(".header");
const burgerBtn = document.querySelector(".header__burger");
const closeNavBtn = document.querySelector(".mob-nav-header__close-btn");
const nav = document.querySelector(".navigation");
const navElements = document.querySelectorAll(".navigation__element");
const navBtns = document.querySelectorAll(".navigation__btn");
const subMenus = document.querySelectorAll(".subnav");
const screenWidthInPx = window.innerWidth;
const overlay = document.querySelector(".overlay");
let lastScrollTop = 0;

const scrollHandler = () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 200) {
    if (scrollTop > lastScrollTop) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }
  }
  lastScrollTop = scrollTop;
};

const openMobileMenu = () => {
  nav.classList.add("show", "animateRight");
  overlay.classList.add("show");
  document.body.classList.add("lock-scroll");
  setTimeout(() => {
    nav.classList.remove("animateRight");
  }, 300);
};

const closeMobileMenu = () => {
  nav.classList.add("animateLeft");
  overlay.classList.remove("show");
  document.body.classList.remove("lock-scroll");
  setTimeout(() => {
    nav.classList.remove("show", "animateLeft");
    subMenus.forEach((subMenu) => subMenu.classList.remove("show"));
    navElements.forEach((navEl) => navEl.classList.remove("active"));
  }, 250);
};

const closeMenuOutsideClick = (e) => {
  const element = e.target;

  if (!element.closest(".header")) {
    closeMobileMenu();
  }
};

const toggleSubMenu = (btn) => {
  const el = btn.parentNode;
  if (el.classList.contains("active")) {
    el.classList.remove("active");
    el.querySelector(".subnav").style.height = "";
  } else {
    subMenus.forEach((subMenu) => {
      subMenu.classList.remove("show");
      subMenu.style.height = "";
    });
    navElements.forEach((navEl) => navEl.classList.remove("active"));
    el.classList.add("active");
    const subnavLinks = el.querySelectorAll(".subnav__link");
    const subNavHeight = Array.from(subnavLinks).reduce(
      (accumulator, currentValue) => accumulator + currentValue.offsetHeight,
      0
    );
    el.querySelector(".subnav").style.height = `${subNavHeight}px`;
  }
};

window.addEventListener("scroll", scrollHandler);

if (screenWidthInPx <= 840) {
  document.addEventListener("click", closeMenuOutsideClick);
  closeNavBtn.addEventListener("click", closeMobileMenu);
  burgerBtn.addEventListener("click", openMobileMenu);
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => toggleSubMenu(btn));
  });
}

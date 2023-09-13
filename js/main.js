import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

// 장바구니
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

const showBasket = () => {
  basketEl.classList.add("show");
};

const hideBasket = () => {
  basketEl.classList.remove("show");
};

basketStarterEl.addEventListener("click", (event) => {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});

basketEl.addEventListener("click", (event) => {
  event.stopPropagation();
});

window.addEventListener("click", () => {
  hideBasket();
});

// 검색
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = headerEl.querySelector(".search-closer");
const searchShadowEl = headerEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];

const playScroll = () => {
  document.documentElement.classList.remove("fixed");
};

const stopScroll = () => {
  document.documentElement.classList.add("fixed");
};

const showSearch = () => {
  headerEl.classList.add("searching");
  stopScroll();

  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });

  searchDelayEls.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });

  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
};

const hideSearch = () => {
  headerEl.classList.remove("searching");
  playScroll();

  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });

  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });

  searchDelayEls.reverse();
  searchInputEl.value = "";
};

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", (event) => {
  event.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener("click", hideSearch);

// 헤더 메뉴 토글
const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", () => {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

// 헤더 검색
const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");

searchTextFieldEl.addEventListener("click", () => {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});

searchCancelEl.addEventListener("click", () => {
  headerEl.classList.remove("searching--mobile");
});

// 화면 크기가 달라졌을 때 검색 모드가 종료되도록 처리
window.addEventListener("resize", () => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

// 네비게이션 메뉴 토글
const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");

const showNavMenu = () => {
  navEl.classList.add("menuing");
};

const hideNavMenu = () => {
  navEl.classList.remove("menuing");
};

navMenuToggleEl.addEventListener("click", () => {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});

navEl.addEventListener("click", (event) => {
  event.stopPropagation();
});

navMenuShadowEl.addEventListener("click", hideNavMenu);

window.addEventListener("click", hideNavMenu);

// 요소의 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach((el) => {
  io.observe(el);
});

// 비디오 재생
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", () => {
  video.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
});

// '당신에게 맞는 iPad는?' 랜더링
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color};"></li>`;
  });

  itemEl.innerHTML = /* html */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}" />
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

// footer navigation map 랜더링
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach((map) => {
    mapList += /* html */ `
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /* html */ `
  <h3>
    <span class="text">${nav.title}</span>
    <span class="icon">+</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `;

  navigationsEl.append(mapEl);
});

// 올해 연도 적용
const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();

// footer navigation map 아코디언
const mapEls = document.querySelectorAll("footer .navigations .map");

mapEls.forEach((el) => {
  const h3El = el.querySelector("h3");
  h3El.addEventListener("click", () => {
    el.classList.toggle("active");
  });
});

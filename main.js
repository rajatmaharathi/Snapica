"use strict";
let searchParam = location.search.split("=").pop();
const accessKey = "1c-cDFNiU2GPOJ2zlfYekvpqQVSgZdKrXSykYYbK2f8";
const randomPhotoUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;
const searchPhotoUrl = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchParam}&per_page=50`;
const gallery = document.querySelector(".gallery");
let currentImg = 0;
let allImages;

// navbar

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar1");
  if (window.scrollY > 0) navbar.classList.add("sticky");
  else navbar.classList.remove("sticky");
});

// search Bar

const toggleSearch = function (search, button) {
  const searchBar = document.getElementById(search);
  const searchButton = document.getElementById(button);

  searchButton.addEventListener("click", function () {
    searchBar.classList.toggle("show-search");
  });
};

toggleSearch("search-bar", "search-button");

// unsplash api

const getImages = function () {
  fetch(randomPhotoUrl)
    .then((res) => res.json())
    .then((data) => {
      allImages = data;
      makeImages(allImages);
    });
};

const searchImages = function () {
  fetch(searchPhotoUrl)
    .then((res) => res.json())
    .then((data) => {
      allImages = data.results;
      makeImages(allImages);
    });
};

const makeImages = function (data) {
  data.forEach((item, index) => {
    let img = document.createElement("img");
    img.src = item.urls.regular;
    img.className = "gallery--img";

    gallery.appendChild(img);

    //popup image

    img.addEventListener("click", function () {
      currentImg = index;
      showPopup(item);
    });
  });
};

const showPopup = function (item) {
  let imagePopup = document.querySelector(".image-popup");
  const downloadBtn = document.querySelector(".downloadlink");
  const image = document.querySelector(".large-img");

  imagePopup.classList.remove("hide");
  overlay.classList.remove("hide");
  image.src = item.urls.regular;
  downloadBtn.href = item.links.html;
};
if (searchParam) {
  searchImages();
} else {
  getImages();
}

//close image popup

const closeBtn = document.querySelector(".btnclose");
const overlay = document.querySelector(".blur");
let imagePopup = document.querySelector(".image-popup");
const closePopup = function () {
  imagePopup.classList.add("hide");
  overlay.classList.add("hide");
};

closeBtn.addEventListener("click", closePopup);
overlay.addEventListener("click", closePopup);

// controls

const preBtn = document.querySelector(".pre-btn");
const nxtBtn = document.querySelector(".nxt-btn");

preBtn.addEventListener("click", function () {
  if (currentImg > 0) currentImg--;
  showPopup(allImages[currentImg]);
});
nxtBtn.addEventListener("click", function () {
  if (currentImg < allImages.length - 1) currentImg++;
  showPopup(allImages[currentImg]);
});

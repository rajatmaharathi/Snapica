"use strict";
const accessKey = "1c-cDFNiU2GPOJ2zlfYekvpqQVSgZdKrXSykYYbK2f8";
const randomPhotoUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;
const gallery = document.querySelector(".gallery");
let currentImg = 0;
let allImages;

// navbar

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("sticky", window.scrollY > 0);
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

getImages();

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

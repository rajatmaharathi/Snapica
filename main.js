"use strict";
const accessKey = "1c-cDFNiU2GPOJ2zlfYekvpqQVSgZdKrXSykYYbK2f8";
const randomPhotoUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;
const gallery = document.querySelector(".gallery");
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
  });
};
getImages();

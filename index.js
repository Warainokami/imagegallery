const accessKey = "C1miG3vly4GT2hxoOMc17-6jVpYqUtQrb6uWTAKh9rg";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// ------наименование отображения первой страницы----
inputEl.value = 'img';

if(inputEl.value === 'img') {
    searchImages();
};

// ------ курсор в поле ввода---------

window.addEventListener("DOMContentLoaded", function() {
    inputEl.focus();
});

// ------Функция отображения контента с api-------

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }


    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if(page > 1){
        showMore.style.display = "block";
    }
}

// ----------Слушатели----------

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
});

document.body.addEventListener("click", function () {
    if (event.target === input) {
        input.value = '';
    }
  });


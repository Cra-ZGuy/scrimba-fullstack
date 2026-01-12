import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

memeModalCloseBtn.addEventListener("click", closeMemeModal);
getImageBtn.addEventListener("click", renderCat);
emotionRadios.addEventListener("change", highlightCheckedOption);

function closeMemeModal() {
    memeModal.style.display = "none";
}

function renderCat() {
    const catObject = getSingleCatObject();

    if (!catObject) return;

    memeModalInner.innerHTML =
        `<img class="cat-img" src="./images/${catObject.image}" alt="${catObject.alt}">`;
    memeModal.style.display = "flex";
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();

    if (catsArray.length === 0) return;

    return catsArray[Math.floor(Math.random() * catsArray.length)];
}

function getMatchingCatsArray() {
    const checkedRadio = document.querySelector("input[type='radio']:checked");

    if (!checkedRadio) return;

    const gifsOnly = gifsOnlyOption.checked;

    const emotion = checkedRadio.value;
    const cats = catsData.filter((x) =>
        (gifsOnly ? x.isGif : true) && x.emotionTags.includes(emotion)
    );

    return cats;
}

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName("radio");

    for (let radio of radios) {
        radio.classList.remove("highlight");
    }

    document.getElementById(e.target.id).parentElement.classList.add(
        "highlight",
    );
}

function getEmotionsArray(cats) {
    const emotionSet = new Set();

    for (const cat of cats) {
        for (const emotion of cat.emotionTags) {
            emotionSet.add(emotion);
        }
    }

    return Array.from(emotionSet);
}

function renderEmotionsRadios(cats) {
    let radioItems = ``;
    const emotions = getEmotionsArray(cats);

    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
        </div>`;
    }

    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const container = document.getElementById("animeContainer");
const genreSelect = document.getElementById("genreFilter");

let allAnime = [];


async function getAnime() {
    let res = await fetch("https://api.jikan.moe/v4/top/anime");
    let data = await res.json();

    allAnime = data.data;
    displayAnime(allAnime);
}

/*  DISPLAY FUNCTION */
function displayAnime(animeList) {
    container.innerHTML = "";

    animeList.forEach((anime) => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${anime.images.webp.large_image_url}" />
            <div class="card-content">
                <h3>${anime.title}</h3>
                <p class="rating">⭐ ${anime.score}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

/*  GENRE FILTER */
genreSelect.addEventListener("change", () => {
    let selectedGenre = genreSelect.value;

    if (selectedGenre === "") {
        displayAnime(allAnime);
        return;
    }

    let filteredAnime = allAnime.filter((anime) =>
        anime.genres.some((g) => g.name === selectedGenre)
    );

    displayAnime(filteredAnime);
});

/*  SEARCH BUTTON (CORRECT PLACE) */
searchBtn.addEventListener("click", async () => {
    let query = searchInput.value.trim();

    if (query === "") {
        displayAnime(allAnime);
        return;
    }

    let res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    let data = await res.json();

    displayAnime(data.data);
});

/* ⌨ ENTER KEY SEARCH */
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    // change icon
    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "🌞";
    } else {
        themeToggle.textContent = "🌙";
    }
});

getAnime();
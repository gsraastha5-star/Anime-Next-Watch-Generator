const container = document.getElementById("animeContainer");

async function getAnime() {
    let res = await fetch("https://api.jikan.moe/v4/top/anime");
    let data = await res.json();

    displayAnime(data.data);
}

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

getAnime();
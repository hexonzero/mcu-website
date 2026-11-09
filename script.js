
/*
====================================================
 MCU MOVIE AND TV SERIES LINK SYSTEM
====================================================

 Movie URL: #/movie/ID
 TV URL:    #/tv/ID

 IDs are TMDB identifiers.
 The script automatically converts matching <li>
 elements into clickable links.
====================================================
*/

const MCU = {

    // ================================================
    // MOVIES
    // ================================================

    movies: {
        "Iron Man": 1726,
        "The Incredible Hulk": 1724,
        "Iron Man 2": 10138,
        "Thor": 10195,
        "Captain America: The First Avenger": 1771,
        "The Avengers": 24428,

        "Iron Man 3": 68721,
        "Thor: The Dark World": 76338,
        "Captain America: The Winter Soldier": 100402,
        "Guardians of the Galaxy": 118340,
        "Avengers: Age of Ultron": 99861,
        "Ant-Man": 102899,

        "Captain America: Civil War": 271110,
        "Doctor Strange": 284052,
        "Guardians of the Galaxy Vol. 2": 283995,
        "Spider-Man: Homecoming": 315635,
        "Thor: Ragnarok": 284053,
        "Black Panther": 284054,
        "Avengers: Infinity War": 299536,
        "Ant-Man and the Wasp": 363088,
        "Captain Marvel": 299537,
        "Avengers: Endgame": 299534,
        "Spider-Man: Far From Home": 429617,

        "Black Widow": 497698,
        "Shang-Chi and the Legend of the Ten Rings": 566525,
        "Eternals": 524434,
        "Spider-Man: No Way Home": 634649,
        "Doctor Strange in the Multiverse of Madness": 453395,
        "Thor: Love and Thunder": 616037,
        "Black Panther: Wakanda Forever": 505642,

        "Ant-Man and the Wasp: Quantumania": 640146,
        "Guardians of the Galaxy Vol. 3": 447365,
        "The Marvels": 609681,

        "Deadpool & Wolverine": 533535,
        "Deadpool 3": 533535,
        "Captain America: Brave New World": 822119,
        "Captain America: New World Order": 822119,
        "Thunderbolts": 986056,
        "Thunderbolts*": 986056,
        "Fantastic Four": 617126,
        "The Fantastic Four: First Steps": 617126
    },


    // ================================================
    // TELEVISION SERIES
    // ================================================

    series: {
        "Agents of S.H.I.E.L.D.": 1403,
        "Agent Carter": 61550,

        "Marvel's Daredevil": 61852,
        "Marvel's Jessica Jones": 38472,
        "Marvel's Luke Cage": 62127,
        "Marvel's Iron Fist": 62126,
        "Marvel's The Defenders": 62285,

        "WandaVision": 85271,
        "The Falcon and the Winter Soldier": 88396,
        "Loki": 84958,
        "What If...?": 91363,
        "Hawkeye": 88329,
        "Moon Knight": 92749,
        "Ms. Marvel": 92782,
        "She-Hulk: Attorney at Law": 92783,

        "Secret Invasion": 114472,
        "Echo": 122226,
        "Agatha All Along": 138501,
        "Agatha: Coven of Chaos": 138501,
        "Daredevil: Born Again": 202555,
        "Ironheart": 114471
    }

};


// ================================================
// 1. NORMALIZE TITLES
// ================================================

function normalizeTitle(title) {

    return title
        .replace(/\s*\(\d{4}\)\s*$/, "")
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ");

}


// ================================================
// 2. CREATE A LOOKUP TABLE
// ================================================

const titleLookup = new Map();

Object.entries(MCU.movies).forEach(([title, id]) => {

    titleLookup.set(normalizeTitle(title), {
        type: "movie",
        id: id
    });

});

Object.entries(MCU.series).forEach(([title, id]) => {

    titleLookup.set(normalizeTitle(title), {
        type: "tv",
        id: id
    });

});


// ================================================
// 3. CONVERT LIST ITEMS INTO LINKS
// ================================================

document.querySelectorAll("section li").forEach(item => {

    const title = normalizeTitle(item.textContent);

    const media = titleLookup.get(title);

    // Skip titles that do not have an ID in the lookup table.
    if (!media) {
        return;
    }

    // Create the destination URL.
    const url = `https://heartiveplaystv.pages.dev/#/${media.type}/${media.id}`;

    // Create an anchor element.
    const link = document.createElement("a");

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Move the original list item's contents into the link.
    while (item.firstChild) {
        link.appendChild(item.firstChild);
    }

    // Add the link to the list item.
    item.appendChild(link);

    // Add an accessibility label.
    link.setAttribute("aria-label", `Watch ${item.textContent.trim()}`);

});


// ================================================
// 4. REPORT UNLINKED TITLES
// ================================================

document.querySelectorAll("section li").forEach(item => {

    if (!item.querySelector("a")) {
        console.warn(
            "No streaming ID found for:",
            item.textContent.trim()
        );
    }

});

console.log("MCU linking system initialized.");

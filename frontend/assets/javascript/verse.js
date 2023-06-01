export let rverse;
import {fbiFetch} from "./fbi.js"

const title = document.querySelector(".verse_title");
const placeVerse = document.querySelector(".verse");

const verse = sessionStorage.getItem("verse");
const book = sessionStorage.getItem("book");
const random = sessionStorage.getItem("random");

const books = {
    Genesis: "gn",
    Exodus: "ex",
    Leviticus: "lv",
    Numbers: "nm",
    Deuteronomy: "dt",
    Joshua: "js",
    Judges: "jud",
    Ruth: "rt",
    "1 Samuel": "1sm",
    "2 Samuel": "2sm",
    "1 Kings": "1kgs",
    "2 Kings": "2kgs",
    "1 Chronicles": "1ch",
    "2 Chronicles": "2ch",
    Ezra: "ezr",
    Nehemiah: "ne",
    Esther: "et",
    Job: "job",
    Psalms: "ps",
    Proverbs: "prv",
    Ecclesiastes: "ec",
    "Song of Solomon": "so",
    Isaiah: "is",
    Jeremiah: "jr",
    Lamentations: "lm",
    Ezekiel: "ez",
    Daniel: "dn",
    Hosea: "ho",
    Joel: "jl",
    Amos: "am",
    Obadiah: "ob",
    Jonah: "jn",
    Micah: "mi",
    Nahum: "na",
    Habakkuk: "hk",
    Zephaniah: "zp",
    Haggai: "hg",
    Zechariah: "zc",
    Malachi: "ml",
    Matthew: "mt",
    Mark: "mk",
    Luke: "lk",
    John: "jo",
    Acts: "act",
    Romans: "rm",
    "1 Corinthians": "1co",
    "2 Corinthians": "2co",
    Galatians: "gl",
    Ephesians: "eph",
    Philippians: "ph",
    Colossians: "cl",
    "1 Thessalonians": "1ts",
    "2 Thessalonians": "2ts",
    "1 Timothy": "1tm",
    "2 Timothy": "2tm",
    Titus: "tt",
    Philemon: "phm",
    Hebrews: "hb",
    James: "jm",
    "1 Peter": "1pe",
    "2 Peter": "2pe",
    "1 John": "1jo",
    "2 John": "2jo",
    "3 John": "3jo",
    Jude: "jd",
    Revelation: "re"
};
if (random) {
    if (book) {
        fetch(`https://www.abibliadigital.com.br/api/verses/bbe/${book}/random`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlN1biBNYXkgMjggMjAyMyAxNTowNDozMCBHTVQrMDAwMC50aGliZS5wcm92b3N0QGhvdG1haWwuY29tIiwiaWF0IjoxNjg1Mjg2MjcwfQ.bYWhlzZBT1Pv4pIpz3P9YI8P8vaK-gnfg1dSbJkv93E`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                rverse = json;
                fbiFetch(Math.floor(Math.floor(956 / (rverse["number"] * (Math.random() + 1)))))
                const abbreviation = rverse.book.abbrev.en;
                const bookName = getKeyByValue(books, abbreviation);
                title.innerText = `${bookName} ${rverse.chapter}:${rverse.number}`;
                placeVerse.innerText = rverse.text;
            })
    } else {
        fetch(`https://www.abibliadigital.com.br/api/verses/bbe/random`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlN1biBNYXkgMjggMjAyMyAxNTowNDozMCBHTVQrMDAwMC50aGliZS5wcm92b3N0QGhvdG1haWwuY29tIiwiaWF0IjoxNjg1Mjg2MjcwfQ.bYWhlzZBT1Pv4pIpz3P9YI8P8vaK-gnfg1dSbJkv93E`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                rverse = json;
                fbiFetch(Math.floor(Math.floor(956 / (rverse["number"] * (Math.random() + 1)))))
                const abbreviation = rverse.book.abbrev.en;
                const bookName = getKeyByValue(books, abbreviation);
                title.innerText = `${bookName} ${rverse.chapter}:${rverse.number}`;
                placeVerse.innerText = rverse.text;
            })
    }
} else {

    const [bookChapter, number] = verse.split(":");
    const [book, chapter] = bookChapter.split(" ");

    console.log("Book:", book.trim());
    console.log("Chapter:", parseInt(chapter.trim()));
    console.log("number:", parseInt(number.trim()));

    const abbreviation = books[book];
    console.log(abbreviation)
    fetch(`https://www.abibliadigital.com.br/api/verses/bbe/${abbreviation}/${chapter}/${number}`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlN1biBNYXkgMjggMjAyMyAxNTowNDozMCBHTVQrMDAwMC50aGliZS5wcm92b3N0QGhvdG1haWwuY29tIiwiaWF0IjoxNjg1Mjg2MjcwfQ.bYWhlzZBT1Pv4pIpz3P9YI8P8vaK-gnfg1dSbJkv93E`,
        }

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            console.log(json);
            rverse = json;
            fbiFetch(Math.floor(Math.floor(956 / (rverse["number"] * (Math.random() + 1)))))
            const abbreviation = rverse.book.abbrev.en;
            const bookName = getKeyByValue(books, abbreviation);
            title.innerText = `${bookName} ${rverse.chapter}:${rverse.number}`;
            placeVerse.innerText = rverse.text;
        })
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


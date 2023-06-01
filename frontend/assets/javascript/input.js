import {FormValidator} from "./form_validator.js";
sessionStorage.setItem("fbiPage", "")
const random = document.querySelector(".random")
const form = document.querySelector(".mainform")

if (!form)
    stop();

const formValidator = new FormValidator(form);

formValidator.addValidator({
    name: 'verse',
    method: (field) => field.value.trim().length > 0,
    message: 'Verse was not filled in.\n' +
        'Please enter a verse in the following format:\n' +
        '"Book Chapter:Verse" (e.g., "John 3:16")\n' +
        'Or press random for a random verse'
})

formValidator.addValidator({
    name: 'verse',
    method: field => field.value.trim().match(/^(?:[1-3]\s)?[A-Za-z]+(?:\s[A-Za-z]+)?\s\d{1,3}:\d{1,3}$/),
    message: 'Verse needs to be in the following format: "Book Chapter:Verse" (e.g., "John 3:16")'
})
formValidator.addValidator({
    name: 'verse',
    method: field =>{
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
        const [book, chapter] = field.value.trim().split(" ");
        console.log(books[book])
        return books[book]}
    ,
    message: "Book doesn't exist"
})

form.addEventListener('submit', function(event) {
    event.preventDefault()
    event.stopImmediatePropagation();
    console.log("search");
    sessionStorage.setItem("verse", form.elements["verse"].value);
    sessionStorage.setItem("random", "");
    console.log('Submit!')
    this.reset();
    window.location.assign("./content/")
})

random.addEventListener('click', function (){
    console.log("random")
    sessionStorage.setItem("verse", "");
    sessionStorage.setItem("random", "true");
    window.location.assign("./content/")
})
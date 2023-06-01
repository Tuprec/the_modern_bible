import {FormValidator} from "./form_validator.js";

const a_options_btn = document.querySelector(".advanced_option");
const form = document.querySelector('.overlayform');
if (!form)
    stop();

const formValidator = new FormValidator(form);
sessionStorage.setItem("book", "");
sessionStorage.setItem("tag", "");
formValidator.addValidator({
    name: 'book',
    method: (field) => {
        const book = field.value.trim()
        console.log(book);
        if (book.length === 0) {
            return true;
        }
        const books = ["gn", "ex", "lv", "nm", "dt", "js", "jud", "rt", "1sm", "2sm", "1kgs", "2kgs", "1ch", "2ch", "ezr", "ne", "et", "job", "ps", "prv", "ec", "so", "is", "jr", "lm", "ez", "dn", "ho", "jl", "am", "ob", "jn", "mi", "na", "hk", "zp", "hg", "zc", "ml", "mt", "mk", "lk", "jo", "act", "rm", "1co", "2co", "gl", "eph", "ph", "cl", "1ts", "2ts", "1tm", "2tm", "tt", "phm", "hb", "jm", "1pe", "2pe", "1jo", "2jo", "3jo", "jd", "re"];
        //niet direct in if zodat ik kan loggen wat de value is
        const isIN = books.find(option => option === book);
        console.log(isIN)
        return isIN;

    },
    message: 'book does not exist'
})
formValidator.addValidator({
    name: 'tag',
    method: (field) => {
        const tag = field.value.trim()
        console.log(tag);
        if (tag.length === 0) {
            return true;
        }
        const tags = ["maid", "waifu", "marin-kitagawa", "mori-calliope", "raiden-shogun", "oppai", "selfies", "uniform", "ass", "hentai", "milf", "oral", "paizuri", "ecchi", "ero"];
        //niet direct in if zodat ik kan loggen wat de value is
        const isIN = tags.find(option => option === tag);
        console.log(isIN)
        return isIN;
    },
    message: 'tag does not exist'
})

a_options_btn.addEventListener('click', function () {
    console.log('a options');
    form.classList.add("open");
    form.classList.remove("closed");
})
form.addEventListener('submit', function (event) {
    event.preventDefault()
    console.log('Submit!')
    const value_book = form.book.value.trim();
    const value_tag = form.tag.value.trim();

    sessionStorage.setItem("book", value_book);
    console.log(sessionStorage.getItem("book"))

    sessionStorage.setItem("tag", value_tag);
    console.log(sessionStorage.getItem("tag"))
    form.classList.remove("open");
    form.classList.add("closed");
    this.reset()
})


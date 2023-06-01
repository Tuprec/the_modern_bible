export let img;
const versatile = ["maid", "waifu", "marin-kitagawa", "mori-calliope", "raiden-shogun", "oppai", "selfies", "uniform"];
const nsfw = ["ass", "hentai", "milf", "oral", "paizuri", "ecchi", "ero"];
let tag = sessionStorage.getItem("tag");
const image = document.querySelector(".anime_img")

if (!tag) {
    if (Math.floor(Math.random() * 100) > 90) {
        tag = nsfw[Math.floor(Math.random() * nsfw.length)]
    } else {
        tag = versatile[Math.floor(Math.random() * versatile.length)]
    }
}
fetch(`https://api.waifu.im/search/?included_tags=${tag}&?height<=100&?orientation=PORTRAIT`, {
    headers: {
        "Content-Type": "application/json",
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
        img = json;
    })
.then(()=>{
    console.log(img.images)
    image.setAttribute("src", img.images[0].url)}
)
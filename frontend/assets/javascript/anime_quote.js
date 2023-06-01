export let qoute
const qoutePlace = document.querySelector(".qoute")
const auteurPlace = document.querySelector(".auteur")
fetch(`https://katanime.vercel.app/api/getlistanime`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(json => {
        console.log(json);
        return (json.result[Math.floor(Math.random()*json.result.length)]["anime"])
    })
    .then(anime => {
        fetch(`https://katanime.vercel.app/api/getbyanime?anime=${anime}&page=1`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                qoute = json.result[Math.floor(Math.random()*json.result.length)];
                console.log(qoute["english"])
                console.log(qoute["character"])
                console.log(qoute["anime"])
                qoutePlace.innerText = `"${qoute["english"]}"`;
                auteurPlace.innerText = `--${qoute["character"]}, ${qoute["anime"]}`;
            })
    })

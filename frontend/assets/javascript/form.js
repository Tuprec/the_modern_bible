const cont = document.querySelector(".revs")
const score = document.querySelector(".reviews > section:first-child div button:first-child")
const date = document.querySelector(".reviews > section:first-child div button:last-child")

const removeElements = function () {
    while (cont.firstChild) {
        cont.removeChild(cont.firstChild)
    }
}
const reviewMaker = function (data) {
    removeElements()
    let html = "";
    data.forEach(rev => {
        html += loadRev(rev)
    })
    cont.innerHTML = cont.innerHTML + html
}
const loadRev = function (rev) {
    return `
    <div>
        <div>
            <div>
                <h3>${rev.voornaam} ${rev.achternaam}</h3>
                <p>${rev.timestamp}</p>
            </div>
            <p>${rev.score}</p>
        </div>
        <p>${rev.review}</p>
    </div>
    `
}
const scoref = function () {
    return fetch(`http://localhost:3000/api/v1/reviews/score`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            console.log(json)
            return json
        })
        .then((data) => {
            reviewMaker(data)
        })

}

const datef = async function () {
    fetch(`http://localhost:3000/api/v1/reviews/date`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            console.log(json)
            return json
        })
        .then((data) => {
            reviewMaker(data)
        })

}
score.addEventListener('click', function () {
    date.classList.remove('selected')
    score.classList.add('selected')
    scoref()
})
date.addEventListener('click', function () {
    score.classList.remove('selected')
    date.classList.add('selected')
    datef()

})
scoref();

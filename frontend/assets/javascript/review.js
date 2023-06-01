import {FormValidator} from "./form_validator.js";

const form = document.querySelector('form');

    if (!form)
        stop();

    const formValidator = new FormValidator(form);

    formValidator.addValidator({
        name: 'firstname',
        method: (field) => field.value.trim().length > 0,
        message: 'Voornaam is een verplicht veld en werd niet ingevuld'
    })
    formValidator.addValidator({
        name: 'name',
        method: (field) => field.value.trim().length > 0,
        message: 'Naam is een verplicht veld en werd niet ingevuld'
    })
    formValidator.addValidator({
        name: 'score',
        method: (field) => field.value.trim().length > 0,
        message: 'Score is een verplicht veld en werd niet ingevuld'
    })
    formValidator.addValidator({
        name: 'score',
        method: field => field.value.trim().match(/^(10|[0-9])$/),
        message: 'Score moet tussen 0-10 liggen'
    })

    form.addEventListener('submit', function(event) {
        event.preventDefault()
        console.log('Submit!')
        fetch(`http://localhost:3000/api/v1/reviews`,{
            method:"POST",
            body: JSON.stringify({
                voornaam: form.firstname.value,
                achternaam: form.name.value,
                score: form.score.value,
                review: form.review.value
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => console.log(json))
            .then(()=>{this.reset})
            .then(()=> window.location.assign("./reviews/"))
    })

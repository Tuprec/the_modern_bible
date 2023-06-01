const detail = document.querySelector(".detiale")
let fbi;

const fbiFetch = function (pageID) {
    fetch(`https://api.fbi.gov/@wanted?pageSize=1&page=${pageID}`, {
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
            fbi = json["items"]
            console.log(fbi)
            const title = fbi[0].title;
            let nationality;
            if (fbi[0].nationality) {
                nationality = fbi[0].nationality
            } else {
                nationality = "not known"
            }
            let sex;
            if (fbi[0].sex) {
                sex = fbi[0].sex
            } else {
                sex = "not known"
            }
            let allias
            if(fbi[0].aliases){
                allias =fbi[0].aliases
            }else{
                allias = "not known"
            }
            let caution
            if(fbi[0].caution){
                caution =fbi[0].caution
            }else {
                if(fbi[0].details){
                    caution = fbi[0].details
                }else {
                    caution = "no caution found"
                }
            }
            const image = fbi[0].images[0].large
            detail.innerHTML = `
            <h1>${title}</h1>
            <div class="data">
            <p>Title: ${title}</p>
            <p>Aliases: ${allias}</p>
            <p>Nationality: ${nationality}</p>
            <p>Sex: ${sex}</p>     
            </div>
            <img src="${image}" alt="een persoon">
            <div class="caution">
            <h2>Caution</h2>
            <p>${caution}</p>
            </div>
            ` + detail.innerHTML;
        })
}

if(sessionStorage.getItem("fbiPage")){
    fbiFetch(sessionStorage.getItem("fbiPage"))
}else{
    window.location.assign("../../content/")
}

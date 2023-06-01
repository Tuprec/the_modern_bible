const fbiInfo = document.querySelector(".fbi_info")
export let fbi;
export const fbiFetch = function (pageID) {
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
            sessionStorage.setItem("fbiPage", json["page"])
            fbiInfo.innerHTML = `
            <div class="data">
            <p>Title: ${title}</p>
            <p>Nationality: ${nationality}</p>
            <div>
            <p>Sex: ${sex}</p>
            <a href="../fbi_detail/">Read More</a>
            </div>         
            </div>
             
            ` + fbiInfo.innerHTML;
            return json;
        })
}
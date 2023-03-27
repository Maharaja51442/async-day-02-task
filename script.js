var div = document.createElement("div");
div.className = "div";
var row = document.createElement("div");
row.classList.add("row", "m-3");
div.append(row);


async function getdata() {
    try {
        var res = await fetch("https://restcountries.com/v2/all");
        var res1 = await res.json();
        for (var i = 0; i < res1.length; i++) {
            try {
                //console.log(`latitude:${res1[i].latlng[0]} Longitude:${res1[i].latlng[1]}`);
                var temp = await weatherdata(res1[i].latlng[0], res1[i].latlng[1]);
                res1[i].temp = temp;
            }
            catch (error) {
                console.log(error);
            }
        }
        displayData(res1);
    }
    catch (error) {
        console.log(error);
    }
}

async function weatherdata(lat, lon){
    try {
        if (lon === undefined) throw Error("Invalid Coordinates");
        let res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bdc7bc9f5d46d530d534271752ec5a73`);
        let res3 = await res2.json();
        return res3.main.temp;
    }
    catch (error){
        console.log(error);
    }
}
function displayData(data){
    for (var i = 0; i < data.length; i++){
       row.innerHTML+= `<div class="col-md-4 col-sm-12">
            <div class="card border-secondary bg-secondary mb-3" style="max-width: 18rem;">
                <div class="card-header bg-dark text-light">${data[i].name}</div>
                <img src="${data[i].flag}" class="card-img-top" alt="country flag">
                <div class="card-body text-light">
                    <p class="card-text">capital:${data[i].capital}</p>
                    <p class="card-text">population:${data[i].population}</p>
                    <p class="card-text">Region:${data[i].region}</p>
                    <button class="card-text bg-black border-white mb-3">Temperature:${data[i].temp}</button>
                </div>
            </div>
        </div>`;
    }
    document.body.append(div);
}
getdata();
 
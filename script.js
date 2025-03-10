const country = document.getElementById("countryName");
const button = document.getElementById("submit");
const countryInfo = document.getElementById("country-info");
const borderingCountries = document.getElementById("bordering-countries");
const title = document.getElementById("title");
const border_list = document.getElementById("border-list");

async function fetchInfo() {

    const countryName = country.value;

    if (!countryName) {
        alert("No Country Entered");
        return;
    }

    try {
        let url = `https://restcountries.com/v3.1/name/${countryName}`;
        let response = await fetch(url);

        if (!response.ok) {
            alert("Error With Country Name");
            return;
        }

        let data = await response.json();
        const countrydetails = data[0];

        const capital = countrydetails.capital[0];
        const population = countrydetails.population.toLocaleString();
        const region = countrydetails.region;
        const flag = countrydetails.flags.svg;   

        items = ["Capital: " + capital, "Population: " + population, "Region: " + region];

        let list = document.getElementById("country-info-list");

        list.innerHTML = "";

        items.forEach(item => {
            let li = document.createElement("li");
            li.innerHTML = item
            list.appendChild(li);
        });

        let li = document.createElement("li");
        li.innerHTML = `<p>Flag: </p><img src="${countrydetails.flags.svg}" width="150">`;
        list.appendChild(li);

        if (countrydetails.borders) {
            
            title.innerHTML = "<h3>Bordering Countries:</h3>";
            try {
                const borderResp = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countrydetails.borders.join(',')}`);
                const borderData = await borderResp.json();

                border_list.innerHTML = ""; 

                borderData.forEach(border => {
                    let li = document.createElement("li");
                    li.innerHTML = `<p>${border.name.common}</p><br>
                                    <img src="${border.flags.svg}" width="150">`;
                    border_list.appendChild(li);
                });

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            borderingCountries.innerHTML = "<p>This Country Has No Bordering Countries</p>";
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }

}

button.addEventListener("click", fetchInfo);
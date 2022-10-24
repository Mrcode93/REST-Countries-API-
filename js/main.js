let boxes = document.querySelector(".boxes");
let mainSection = document.querySelector(".main");

function getData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((e) => {
        // console.log(e);
        // console.log(e.name.common);
        let countryName = e.name.common;
        let pop = Number(e.population).toLocaleString();

        boxes.innerHTML += `<div class="box">
                <div class="flag"><img src='${e.flags.png}' alt="flag" /></div>
                <div class="info">
                <div class="name">${e.name.common}</div>
                <div class="description">
                <p>Population: <span>${pop}</span></p>
                <p >Region: <span class="region">${e.region}</span></p>
                <p>Capital:  <span>${e.capital}</span></p>
                </div>
                </div>
                </div>
                </div>`;

        function getFullData() {
          let box = document.querySelectorAll(".box");
          let main = document.querySelector(".second");
          let body = document.querySelector("body");
          box.forEach((e) => {
            e.addEventListener("click", () => {
              let name = e.children[1].children[0].innerHTML;
              // console.log(name);

              data.forEach((element) => {
                // console.log(element.name.common);
                if (element.name.common === name) {
                  let lang = element.languages;
                  lang = Object.keys(lang)[0];
                  body.classList.add("active");
                  let official = element.name.official;
                  let currency = element.currencies;
                  currency = Object.keys(currency);
                  currency = currency[0];

                  let border = element.borders;

                  main.innerHTML = `
                                    <div class="fullData">
                                       <div class="head">
                                       <ion-icon name="arrow-back-outline"></ion-icon>
                                        <p> Back</p>
                                      </div>
                                         <div class="body">
                                             <div class="flag"><img src="${
                                               element.flags.svg
                                             }" alt="flag" /></div>
                                             <div class="information">
                                                 <h2>${element.name.common}</h2>
                                                 <div class="infos">
                                                     <p>Native Name: <span>${official}</span></p>
                                                     <p>Population: <span>${element.population.toLocaleString()}</span></p>
                                                     <p>Region: <span>${
                                                       element.region
                                                     }</span></p>
                                                     <p>Sub Region: <span>${
                                                       element.subregion
                                                     }</span></p>
                                                     <p>Capital: <span>${
                                                       element.capital
                                                     }</span></p>
                                                     <p>Top Level Domain: <span>${
                                                       element.tld
                                                     }</span></p>
                                                     <p>Currencies: <span>${currency}</span></p>
                                                     <p>Languages: <span>${lang}</span></p>
                                                 </div>
                                                 <div class="borders">
                                                 <p>Border Country: <span></span> <span></span> <span></span></p>
                                             </div>
                                             </div>
                                             
                                         </div>
                                    </div>
                                    `;
                  let back = document.querySelector(".head");
                  back.onclick = () => {
                    body.classList.remove("active");
                  };
                }
              });
            });
          });
        }
        getFullData();
      });
      let country = document.querySelectorAll(".info .name");

      let regionName = document.querySelectorAll(".region");
      const searchInput = document.querySelector('.input input[type="search"]');

      function getCountry() {
        searchInput.addEventListener("input", (e) => {
          let input = e.target.value;
          input = input.toUpperCase();
          for (i = 0; i < country.length; i++) {
            let name = country[i].innerHTML;
            let parent = country[i].parentNode.parentNode;

            if (name.toUpperCase().indexOf(input) > -1) {
              parent.style.display = "flex";
            } else {
              parent.style.display = "none";
            }
            //get region name
          }
        });

        function getRegionName() {
          items.forEach((item) => {
            item.addEventListener("click", () => {
              const region = item.innerHTML.toLocaleLowerCase();

              regionName.forEach((e) => {
                let name = e.innerHTML.toLocaleLowerCase();
                let x = e.parentNode.parentNode.parentNode.parentNode;
                // console.log(name);
                if (name === region) {
                  x.style.display = "flex";
                } else {
                  x.style.display = "none";
                }
              });
            });
          });
        }
        getRegionName();
      }

      getCountry();
    })
    .catch((err) => console.error(err));
}
window.addEventListener("DOMContentLoaded", getData);
//search for country

//set theme of the window
let mood = document.querySelector(".mood");
let icon = document.querySelector(".mood ion-icon");
const html = document.documentElement;
html.dataset.theme = `theme-light`;
// themse toggler
function toggleTheme() {
  mood.classList.toggle("slide");
  if (mood.classList.contains("light")) {
    mood.classList.remove("light");
    mood.classList.add("dark");
    html.dataset.theme = "theme-dark";
    icon.setAttribute("name", "sunny-outline");
  } else {
    mood.classList.remove("dark");
    mood.classList.add("light");
    html.dataset.theme = "theme-light";
    icon.setAttribute("name", "moon-outline");
  }
}
mood.addEventListener("click", toggleTheme);

//filter show/hide
let items = document.querySelectorAll("ul li");
let filter = document.querySelector(".parent");
let filterBtn = document.querySelector(".parent ion-icon");
filter.onclick = () => {
  filter.classList.toggle("active");
  if (filter.classList.contains("active")) {
    filterBtn.setAttribute("name", "chevron-down-outline");
  } else {
    filterBtn.setAttribute("name", "chevron-up-outline");
  }
};

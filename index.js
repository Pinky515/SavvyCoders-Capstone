import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import { error } from "console";
// import * as utils from "./utils";

const router = new Navigo("/");

function render(state = store.Intro) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer(store.Links)}
  `;
  afterRender(state);
  router.updatePageLinks();
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

  if (state.view === "Carebook") {
    Array.from(document.getElementsByClassName("saveCareBook")).forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        const responseBody = store.Carebook.CareBooks.data[event.target.dataset.index];
        console.log(responseBody);

        axios
          .post(`${process.env.DISCUSSION_POST_API}/carebooks`, responseBody)
          .then(response => {
            store.Carebook.CareBooks.data.push(response.data);
            router.navigate("/Carebook");
          })
          .catch(error => {
            console.log("Whoopsie", error);
          })
      })
    })
  }

  if (state.view === "Mygarden") {
    let submitEntryButton = document.getElementById("submitEntryButton");
    console.log(submitEntryButton);


    // store.Mygarden.GardenTracker.forEach((plantData) => {
    //   plantData.submitEntryButton, plantData.maturityDateMinusToday;
    //   if (maturityDateMinusToday == 0) {
    //     submitEntryButton.disabled = false;
    //   } else {
    //     submitEntryButton.disabled = true;
    //   }
    // })
  }

  if (state.view === "Discussion") {
    // event handler for new post submit button
    let discussionPosts = Array.from(document.getElementsByClassName("createPost"));
    discussionPosts






      .addEventListener("click", event => {
        event.preventDefault();

        const allPosts = store.Discussion.discussionForumPage.allPosts[event.target.dataset.index];;
        console.log("Retrieved all Posts", allPosts);

        const requestData = {
          creator: allPosts.creator.value,
          title: allPosts.title.value,
          post: allPosts.post.value
        };
        console.log("request Body", requestData);

        axios
          .post(`${process.env.DISCUSSION_POST_API}/discussion`, requestData)
          .then(response => {
            // push new post to forum allPosts
            store.Discussion.discussionForumPage.allPosts.push(response.data);
            router.navigate("/Discussion");
          })
          .catch(error => {
            console.log("Whoopsie", error);
          });
      });
  }
}

router.hooks({
  before: async (done, params) => {
    // We need to know what view we are on to know what data to fetch
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    // create variables for user location
    let location;
    // Add a switch case statement to handle multiple routes
    switch (view) {
      // New Case for the Home View
      case "Home":
        try {
          const response = await axios.get(
            `https://extreme-ip-lookup.com/json/?key=${process.env.EX_IP_API_KEY}`
          );
          console.log(response);
          // Create an object to be stored in the Home state from the response
          store.Home.location = {
            city: response.data.city,
            state: response.data.region,
            country: response.data.country,
            lat: response.data.lat,
            long: response.data.lon
          };
          console.log(store.Home.location);
        } catch (err) {
          console.log(err);
          done();
        }
        location = store.Home.location;
        axios
          // Get request to retrieve the current weather data using the API key and providing a city name
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&limit=1&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
          )
          .then(response => {
            // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            // Create an object to be stored in the Home state from the response
            store.Home.weather = {
              city: response.data.name,
              state: response.data.region_name,
              country: response.data.country_code,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };

            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });

        break;
      // Add a case for each view that needs data from an API
      case "Carebook":
        // New Axios get request utilizing already made environment variable
        if (params?.params?.plantSearch) {
          axios
            .get(
              `https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}&q=${params.params.plantSearch}` //need to search for plants through an input
            )
            .then(response => {
              console.log("response", response);
              // create object to be stored
              // store.Carebook.CareBooks = {
              //   common_name: response.data.common_name,
              //   scientific_name: response.data.scientific_name,
              //   cycle: response.data.cycle,
              //   waterFrequency: response.data.watering,
              //   sunLight: response.data.sunlight,
              //   image: response.data.default_image
              store.Carebook.CareBooks = response.data;
              console.log(store);
              done();
            });
        } else {
          done();
        }
        break;
      case "Schedule":
        try {
          const response = await axios.get(
            `https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}`
          );
          const data = await response.json();
          return;
        } catch (error) {
          document.getElementById("not-found");
        }
        done();
        break;
      case "Discussion":
        await axios
          .get(`${process.env.DISCUSSION_POST_API}/discussion`)
          .then(response => {
            // store response to state
            console.log("response", response);
            store.Discussion.DiscussionPosts = response.data;
            done();
          })
          .catch(error => {
            console.log("Whoopsie", error);
            done();
          });
        break;
      case "Mygarden":
        axios
          .get(`${process.env.DISCUSSION_POST_API}/mygarden`)
          .then(response => {
            // store to state
            console.log("response", response.data);
            let data = response.data;

            store.Mygarden.GardenTracker = data.map((plantData) => {
              let today = new Date().getTime();
              let maturityDate = new Date(`${plantData.maturityDate}`)
                .getTime();
              console.log(maturityDate);

              plantData.maturityDateMinusToday = maturityDate - today;
              console.log(plantData.maturityDateMinusToday);
              // Math.floor rounds down to the nearest integer.
              // converting from milliseconds to days
              plantData.daysLeft = Math.floor(
                plantData.maturityDateMinusToday / (1000 * 60 * 60 * 24)
              );
              if (plantData.daysLeft > 0) {
                plantData.fullyMatureAndHarvested = false;
              } else {
                plantData.fullyMatureAndHarvested = true;
              }

              return plantData;
            });

            console.log(store.Mygarden.GardenTracker);
            done();
          })
          .catch(error => {
            console.log("Whoopsie", error);
            done();
          });
        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  }
});
console.log(store);
router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      if (view in store) {
        render(store[view]);
      } else {
        render(store.Viewnotfound);
        console.log(`View ${view} not defined`);
      }
    }
  })
  .resolve();

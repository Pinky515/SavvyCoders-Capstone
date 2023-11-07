import html from "html-literal";
import baseLogo from "../../utils/photos/baseLogo.png";

export default state => html`
  <div id="home-pg">
    <h1>Plantiverse</h1>
    <div id="logo-heart">
      <img src="${baseLogo}" alt="Plantiverse Logo" />
    </div>
    <div class="welcome">
      <h1 id="welcome">Welcome Back</h1>
      <h2>
        <!-- insert username -->
        <!-- $ {user} -->
      </h2>
    </div>
    <div class="weather">
      <!-- Current Weather Img dependent upon the weather  -->
      <h3>
        The weather in ${state.weather.city} is ${state.weather.description}.
        Temperature is ${state.weather.temp}F, and it feels like
        ${state.weather.feelsLike}F.
      </h3>
    </div>
  </div>
`;
// location code. how do i make sure this is in the correct div?
// fetch("https://extreme-ip-lookup.com/json/")
//   .then(res => res.json())
//   .then(response => {
//     console.log(`${response.city}, ${response.state}, ${response.country}`);
//   })
//   .catch((data, status) => {
//     console.log("Sorry. We can't find you.");
//   });

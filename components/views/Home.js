import html from "html-literal";
import baseLogo from "../../utils/photos/baseLogo.png";

export default state => html`
  <div id="home-pg">
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
    <!-- Current Weather Img dependent upon the weather  -->
    <h3>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </h3>
    <div class="weather"></div>

    <!-- Current Date and time based on location -->
    <div id="date">
      <script>
        ${function getTheDate() {
    const dateLocal = new Date();
    const day = dateLocal.getDate();
    const month = dateLocal.getMonth();
    const year = dateLocal.getFullYear();

    let currentDateLocal = `${month + 1} ${day}, ${year}`;
    return currentDateLocal;
  }};
        console.log(getTheDate());
      </script>
    </div>
    <div id="location">
      <!-- Current Location -->
    </div>
    <!-- <form class="newLocation"> -->
    <!-- Changing location updates the weather -->
    <!-- <input type="text" id="newLocation" name="newLocation" size="15" /> -->
    <!-- <input type="submit" value="Check the Weather" /> -->
    <!-- need to search location to pull weather into -->
    <!-- </form> -->
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

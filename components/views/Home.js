import html from "html-literal";
import baseLogo from "../../utils/photos/base-logo.png";

export default state => html`
  <div id="home-pg">
    <div id="logo">
      <img src="${baseLogo}" alt="Plantiverse Logo" />
    </div>
    <div class="welcome">
      <h1 id="welcome">Welcome Back</h1>
      <h2>
        <!-- insert username -->
        Pinky515
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
      ${function getTheDate() {
        const dateLocal = new Date();
        const day = dateLocal.getDate();
        const month = dateLocal.getMonth();
        const year = dateLocal.getFullYear();

        let currentDateLocal = `${month + 1} ${day}, ${year}`;
        return currentDateLocal;
      }};
      console.log(getTheDate());
    </div>
    <!-- Current Location -->
  </div>
`;

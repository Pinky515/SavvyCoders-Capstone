import html from "html-literal";

export default state => html`
  <div id="home-pg">
    <div id="logo">
      <img
        src="docs/project-planning.md/LOGO OPTIONS/image-5.png"
        alt="Plantiverse Logo"
      />
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
    <!-- Current Location -->
  </div>
`;

import html from "html-literal";
import * as logos from "../../utils/photos/index.js";

export default () => html`
  <section id="not-found">
    <img src=${logos.wiltedPlant} class="not-found" alt="Wilted houseplant" />

    <div>
      <h2>Whoopsie! Page Not found.</h2>
    </div>
  </section>
`;

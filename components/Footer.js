import html from "html-literal";
import links from "../store/Links";

export default () => html`
  <footer>
    <nav>
      <!-- legend -->
      <i class="fas fa-bars"></i>
      <ul class="hidden--mobile nav-links">
        ${links
          .map(
            link =>
              `<li><a href="/${link.title}" title="${link.title}" data-navigo>${link.text}</a></li>`
          )
          .join("")}
      </ul>
    </nav>

    <p>Created by Tichinia Gadia</p>
  </footer>
`;

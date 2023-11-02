import html from "html-literal";

// legend of icons in footer.

export default links => html`
  <nav>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
      ${links
    .map(
      link =>
        `<li><a
            href="/${link.title}"
            title="${link.title}"
            data-navigo>${link.text}
            <i class="fa-solid ${link.icon} fa-2xl" style="color:${link.color}"></i>
            </a></li>`
    )
    .join("")}
    </ul>
  </nav>
`;

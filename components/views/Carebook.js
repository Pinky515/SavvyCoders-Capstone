import html from "html-literal";

export default state => html`
  <div id="search">
    <input
      type="search"
      id="plantSearch"
      name="search"
      placeholder="Find this Plant"
    />
  </div>
  <div id="saveGuideBook">
    <!-- add button -->
  </div>
  <div id="storedCareBooks">
    <!-- flip through care instructions -->
  </div>
`;

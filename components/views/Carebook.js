import html from "html-literal";

export default state => html`
  <div id="search">

    <!-- search button -->
    <form>
      <label for="plantSearch">Search for something new</label>


    <input
      type="search"
      id="plantSearch"
      name="search"
      placeholder="Find this Plant"
    />

    <button>Search</button>
  </div>
  <div id="saveGuideBook">
    <!-- save button -->
    <button class="saveGuideBook" onclick="()">
    <i class="fa-regular fa-floppy-disk" style="color: #279af1ff;"></i>
      </button>

  </div>
  <div id="saveGuideBook">
    <!-- add button -->

  </div>
</form>
  <div id="storedCareBooks">
    <!-- flip through care instructions -->
  </div>
`;

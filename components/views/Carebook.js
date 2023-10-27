import { table } from "console";
import html from "html-literal";

export default (state) => html`
  <div id="search">

    <!-- search button -->
    <form>
      <label for="plantSearch">Search for something new</label>


    <input
      type="search"
      id="plantSearch"
      name="plantSearch"
      placeholder="Find this Plant"
    />
<button class="plantSearch"></button>
  </div>
  <div id="saveGuideBook">
    <!-- save button -->

    <button class="saveCareBook" onclick="()">
    <i class="fa-regular fa-floppy-disk" style="color: #279af1ff;"></i>
      </button>

  </div>
  <div id="saveCareBook">
    <!-- add button -->
  </div>
</form>





  <div id="searchPlants">

    <table class = "searchedPlantsList">
  <thead>
    <tr>
      <th></th>
      <th>Common Name</th>
      <th>Growth Cycle</th>
      <th>Water Frequency</th>
      <th>Light Tolerance</th>
      <th>Picture</th>
    </tr>
  </thead>
  <tbody>
  ${state.CareBooks.data.map((plant) => {
    return `
     <tr>
      <td>${plant.id}</td>
      <td>${plant.common_name}</td>
      <td>${plant.cycle}</td>
      <td>${plant.watering}</td>
      <td>${plant.sunlight}</td>
      <td>${plant.default_image.thumbmail}</td>
    </tr>
`;
  })}
  </tbody></table>

    <!-- flip through care instructions -->
  </div>

  <div id="storedCareBooks"></div>
`;

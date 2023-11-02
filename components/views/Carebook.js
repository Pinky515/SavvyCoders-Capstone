import html from "html-literal";

function isDisabled(plant) {
  return "disabled";
}

export default state => html`
  <div id="search">

    <!-- search button -->
    <form method="get" action="">
      <!-- <label for="plantSearch">Search for something new</label> -->


    <input
      type="search"
      id="plantSearch"
      name="plantSearch"
      placeholder="Find this Plant"
    />
<button class="plantSearch"><i class="fa-solid fa-magnifying-glass" style="color: #d76a03ff;"></i></button>
  </div>
</form>




<form id="saveCareBook" method="post">
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
      <th>Also Known As</th>
      <th><i class="fa-regular fa-floppy-disk  fa-xl" style="color: #f7f7ffff;" isDisabled()></i></th>
    </tr>
  </thead>
  <tbody>
  ${state.CareBooks.data.map((plant, index) => {
  return html`
      <tr>
        <td>${index + 1}</td>
        <td>${plant.common_name}</td>
        <td>${plant.cycle}</td>
        <td>${plant.watering}</td>
        <td>${plant.sunlight}</td>
        <td><img src="${plant.default_image.original_url}" /></td>
        <td>${plant.other_name}</td>
        <td>
          <button name="saveCareBook" value="saveCareBook">
            <i
              class="fa-regular fa-floppy-disk fa-xl saveCareBook"
              style="color: #279af1ff;"
              data-index="${index}"
            ></i>
          </button>
        </td>
      </tr>
    `;
})}
  </tbody></table>
</form>
    <!-- flip through care instructions -->
  </div>

  <div id="storedCareBooks"></div>
`;

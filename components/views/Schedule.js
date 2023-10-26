import html from "html-literal";

export default (state) => html`
  <div id="schedule">
    <!-- add plant button -->
    <button class="addButton" onclick="">
      <i class="fa-solid fa-circle-plus" style="color: #32e875ff;"></i>
    </button>
    <!-- calendar with visual representation of water/fertilization schedule -->
    <div class="inputs">
      <label for="Plant">Plant</label>
      <!-- <input
        type="text"
        id="Plant"
        class="columns"
        name="Plant"
        placeholder="Plant Name"
      /> -->
      <label for="waterFrequency">Water</label>
      <!-- <input
        type="date"
        id="waterFrequency"
        class="columns"
        name="waterFrequency"
        placeholder="Next time to water"
      /> -->
      <label for="datePlanted">Date Planted</label>
      <input
        type="text"
        id="datePlanted"
        class="columns"
        name="datePlanted"
        placeholder="When did you plant this seed?"
      />
    </div>
    <table id="table">
      <!-- table of upcoming water/fertilization needs -->
      <!-- table should automatically sort in ascending order by date and scroll if larger than allotted height -->
    </table>
  </div>
`;

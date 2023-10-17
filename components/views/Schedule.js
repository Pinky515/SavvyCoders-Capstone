import html from "html-literal";
import Schedule from "../Scripts/Schedule.js";

export default state => html`
  <div id="schedule">
    <!-- add plant button -->
    <button class="addButton" onclick="plantSchedule()">
      <i class="fa-solid fa-circle-plus" style="color: #32e875ff;"></i>
    </button>
    <!-- calendar with visual representation of water/fertilization schedule -->
    <div class="inputs">
      <!-- <label for="Plant">Plant</label> -->
      <input
        type="text"
        id="Plant"
        class="columns"
        name="Plant"
        placeholder="Plant Name"
      />
      <!-- <label for="waterFrequency">Water</label> -->
      <input
        type="date"
        id="waterFrequency"
        class="columns"
        name="waterFrequency"
        placeholder="Next time to water"
      />
      <!-- <label for="fertilizationFrequency">Water</label> -->
      <input
        type="date"
        id="fertilizationFrequency"
        class="columns"
        name="fertilizationFrequency"
        placeholder="Next time to add fertilizer"
      />
    </div>
    <table id="table">
      <!-- table of upcoming water/fertilization needs -->
      <!-- table should automatically sort in ascending order by date and scroll if larger than allotted height -->
    </table>

    <script>
      ${Schedule};
    </script>
  </div>
`;

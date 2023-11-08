import html from "html-literal";

function isDisabled(plant) {
  return plant.fullyMatureAndHarvested ? "" : "disabled";
}

export default state => html`
  <div id="schedule">
    <h1>Lets Stay on Track<h1>
    <!-- add plant button -->
    <form action="" method="post" class="addPlantSchedule">
      <!-- calendar with visual representation of water/fertilization schedule -->
      <div class="schedule-inputs">
      <div class="plantName">
      <label for="Plant">
          <h3>Plant</h3>
        </label>
        <input
          type="text"
          id="Plant"
          class="columns"
          name="Plant"
          placeholder="Plant Name"
        />
      </div>
      <div class="datePlanted">
      <label for="datePlanted"><h3>Date Planted</h3></label>
        <input
          type="date"
          id="datePlanted"
          class="columns"
          name="datePlanted"
          placeholder="When did you plant this seed?"
        />
      </div>
      <div class="growthCycle">
      <label for="growthCycle"><h3>Growth Cycle</h3></label>
        <select id="growthCycle" name="growthCycle">
          <option value="">Annual or Perennial?</option>
          <option value="Annual">Annual</option>
          <option value="Perennial">Perennial</option>
        </select>
      </div>
      <div class="addPlantScheduleButton">
      <button class="addPlantSchedule" onclick="">
          <i class="fa-solid fa-circle-plus" style="color: #32e875ff;"></i>
        </button>
      </div>
      </div>
      <table id="scheduleTable">
        <!-- table of upcoming water/fertilization needs -->
        <!-- table should automatically sort in ascending order by date and scroll if larger than allotted height -->
        <thead>
          <tr>
            <th></th>
            <th>Plant Name</th>
            <th>Growth Cycle</th>
            <th>Date Planted</th>
            <th>Complete</th>
          </tr>
        </thead>

        <tbody>
          <!-- values entered by user -->
          ${state.calendar.map((plant, index) => {
  return html`
<>
            <td>${index + 1}</td>
            <td>${plant.plantName}</td>
            <td>${plant.cycle}</td>
            <td>${plant.datePlanted}</td>
            <td>
<button name="fullyMatureAndHarvested" id ="fullyMatureAndHarvested" value="gardenTracker" ${isDisabled(
    plant
  )}>
<i class="fa-solid fa-seedling" style="color: #32e875ff;"></i>
</button>
            </td>
            </tr>
            `;
})}
        </tbody>
      </table>
    </form>
  </div>
`;

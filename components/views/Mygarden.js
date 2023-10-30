import html from "html-literal";

export default state => html`
  <div id="myGarden">
    <!-- Username's Garden (user input garden name in header) -->

    <!-- <div id="addPlot"> -->
    <!-- add new plot button (includes date planted) -->
    <!-- </div> -->
    <!-- <div id="gardenLayout" style="height: 75vh;"> -->
    <!-- diagram of garden's layout -->
    <!-- touching(mobile) or hovering(desktop) over plot brings pop up of plant date and projected maturity date -->
    <!-- </div> -->
    <form id="gardenTracker" method="">
      <div class="gardenTracker">
        <!-- add button -->
        <button name="addNewEntry" value="gardenTracker">
          <i class="fa-solid fa-circle-plus" style="color: #32e875ff;"></i>
        </button>
        <!-- table of plant names and maturity date. maybe a countdown -->
        <table id="trackerTable">
          <thead>
            <tr>
              <th>Plant Name</th>
              <th>Expected Maturity Date</th>
              <th>Days Until Mature</th>
            </tr>
          </thead>

          <tbody>
            ${state.GardenTracker.data.map((plant, index) => {
              return `
<>
            {/* values entered by user */}
            <td>${index + 1}</td>
            <td>${plant.plantName}</td>
            <td>${plant.maturityDate}</td>
            {/* create countdown based on date and maturity date */}
            <td id="countDown" >${countDown}</td>
            <td>
<button name="fullyMatureAndHarvested" value="gardenTracker">
<i class="fa-solid fa-seedling" style="color: #32e875ff;"></i>
</button>
            </td>
            </tr>
            `;
            })}
          </tbody>
        </table>
      </div>
    </form>
  </div>
`;

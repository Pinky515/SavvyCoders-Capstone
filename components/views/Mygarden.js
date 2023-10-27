import html from "html-literal";

export default (state) => html`
  <div id="myGarden">
    <!-- Username's Garden (user input garden name in header) -->

    <div id="addPlot">
      <!-- add new plot button (includes date planted) -->
    </div>
    <div id="gardenLayout" style="height: 75vh;">
      <!-- diagram of garden's layout -->
      <!-- touching(mobile) or hovering(desktop) over plot brings pop up of plant date and projected maturity date -->
    </div>

    <div id="gardenTracker">
      <!-- table of plant names and maturity date. maybe a countdown -->
      <table id="trackerTable">
        <thead>
          <tr>
            <th>Plant Name</th>
            <th>Expected Maturity Date</th>
            <th>Days Until Marture</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
`;

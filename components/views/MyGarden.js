import html from "html-literal";

export default state => html`
  <div id="my-garden">
    <!-- Username's Garden (user input garden name in header) -->

    <div id="addPlot">
      <!-- add new plot button (includes date planted) -->
    </div>
    <div id="gardenLayout">
      <!-- diagram of garden's layout -->
      <!-- touching(mobile) or hovering(desktop) over plot brings pop up of plant date and projected maturity date -->
    </div>

    <div id="trackerTable">
      <!-- table of plant names and maturity date. maybe a countdown -->
    </div>
  </div>
`;

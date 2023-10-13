import html from "html-literal";

export default state => html`
  <div id="schedule">
    <!-- add plant button -->
    <i class="fa-solid fa-circle-plus" style="color: #32e875ff;"></i>
    <button class="addButton"></button>
    <!-- calendar with visual representation of water/fertilization schedule -->

    <!-- table of upcoming water/fertilization needs -->
    <!-- table should automatically sort in ascending order by date and scroll if larger than allotted height -->
    <table id="Schedule">
      <thead>
        <tr colspan="10">
          <th>Water</th>
          <th>Fertilizer</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
`;

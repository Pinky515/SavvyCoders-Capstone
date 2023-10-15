/* create async function to generate table */
async function plantSchedule() {
  const response = await fetch(
    `https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}`
  );

  // create data array
  const data = await response.json();
  // create table
  let table = `<table>`;
try {
  // add header row to table
  table +=<tr><th>Plant</th><th>Water</th><th>Fertilizer</th></tr>;
  // for each method to iterate over & add each dynamic plant schedule
  data.array.forEach(plantData => {
    // dynamically add data. need to view API data to get correct names of water and fertilization frequency
    table += <tr><td>`${plantData.name}`</td><td>`${plantData.waterFrequency}`</td><td>`${plantData.fertilizationFrequency}`</td></tr>;

  table += `</table>`})

 /* create variable to call table ID "Schedule" from view/html */
  const scheduleTable = document.getElementById("Schedule");
  /* Append variable and function to views/html */
  table = scheduleTable.innerHTML;

} catch (error) {
document.getElementById("not-found");
} finally {
  console.log("New Schedule Created!")
  return table
}}
plantSchedule();

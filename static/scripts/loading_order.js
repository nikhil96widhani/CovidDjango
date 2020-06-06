jQuery(document).ready(checkContainer);

function checkContainer () {
  if($('#total_recovered').is(':visible')){ //if the container is visible on the page
      // lineChartDataFill();
      // drawRegionsMap();  //Adds a grid to the html
      lineChartDataFill();
      loadTable();
      load_footer();
      drawBarchart7days();
  } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
  }
}

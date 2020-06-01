jQuery(document).ready(checkContainer);

function checkContainer () {
  if($('#total_recovered').is(':visible')){ //if the container is visible on the page
      loadTable();
      load_footer();  //Adds a grid to the html
      drawRegionsMap();  //Adds a grid to the html
      drawLineChart();

  } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
  }
}

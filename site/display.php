<?php
  include 'config/connect.php';

  // write query for all datapoints:
	$sql = 'SELECT playername,entrytime,playtime,score FROM orbitasteroids ORDER BY entrytime';

  // make query & get result
	$result = mysqli_query($conn, $sql);

  // fetch the resulting rows as an array
  $entries = mysqli_fetch_all($result, MYSQLI_ASSOC);

  mysqli_free_result($result);
	mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Test site!</title>
    <link href="style.css?v=<?php echo time(); ?>" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <style>
      .mainflex .center_items {
        overflow: hidden;
      }

      .mainflex .center_items {
        align-items: center;
      }

    </style>

  </head>
  <body>
    <?php include 'templates/header.php';?>

    <div class="mainflex">

      <div class="lspace">
        <!-- Sidebar -->
        <div class="textblock">
          <h4>Note:</h4>
          <p>Only a visualization of the games for <i>Orbitasteroids</i> is available for now. As more demo apps are added, a selection menu will be added to this sidebar.</p>
        </div>
      </div>

      <div class="maincontent">

        <div class="textblock">
          <h1>Visualizer</h1>
        </div>

        <div class="center_items">
          <div id="chart_div" style="height: 500px;"></div>
        </div>

      </div>

      <div class="rspace"></div>

    </div>

    <div id="dom-target" style="display: none;">
      <?php echo json_encode($entries); ?>
    </div>

    <script src="display.js"></script>

    <?php include 'templates/footer.html';?>
  </body>
</html>

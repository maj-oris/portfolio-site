<?php
  include 'config/connect.php';

  if(isset($_POST['submit'])){

    //check username has been entered
    if(!empty($_POST['playername'])){

      //prevent XSS clientside script injection
      $playername = mysqli_real_escape_string($conn, $_POST['playername']);
      $score = mysqli_real_escape_string($conn, $_POST['score']);
      $time = mysqli_real_escape_string($conn, $_POST['time']);

      $sql = "INSERT INTO orbitasteroids(playername,playtime,score) VALUES('$playername','$score','$time')";

      if(mysqli_query($conn, $sql)){
        //success
      } else {
        echo ("query error: " . mysqli_error($conn));
      };

      mysqli_close($conn);
    }
  }
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Test site!</title>
    <link href="style.css?v=<?php echo time(); ?>" rel="stylesheet" type="text/css" />

    <style media="screen">
      .canvasContainer {
        position: relative;
        margin: 10px auto;
        display: block;
        height: 600px;
        width: 600px;
      }

      .canvasContainer canvas {
        position: absolute;
        top: 0px;
        left: 0px;
      }

      #canvas {
        background-color: black;
      }

      #scoreCanvas {
        left: 400px;
      }

      .maincontent {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        height: 620px;
      }

      .scorepanel p {
        font-size: 10px;
        margin: 10px;
      }

      .entryform p {
        font-size: 12px;
      }

      .entryform .submit {
        margin-top: 5px;
        padding-left: 3px;
        padding-right: 3px;
      }

    </style>

  </head>
  <body>
    <?php include 'templates/header.php';?>

    <div class="mainflex">

      <div class="lspace">
        <!-- Sidebar -->
        <div class="textblock">
          <h3 class="centered">How to play</h3>
          <h4>Motion</h4>
          <p>The ship, asteroids, and bullets obey realistic gravity. They will orbit the central body.</p>
          <p>Any object hitting the central body will 'bounce' off it.</p>
          <h4>Controls</h4>
          <p>A and D rotate the ship.</p>
          <p>W accelerates the ship; S brakes.</p>
          <p>Space fires.</p>
          <h4>Lives</h4>
          <p>The ship has three lives. Collisions with asteroids or the central body will cost a life. Collision with an asteroid will cause it to break up.</p>
          <p>Lives are displayed in the upper left corner.</p>
          <h4>Score</h4>
          <p>The score will (slowly) passively increase in order to reward time survived.</p>
          <p>Shooting an asteroid will net the player 100 score.</p>
          <p>Score is displayed in the upper right corner.</p>

        </div>
      </div>

      <div class="maincontent">

        <div class="canvasContainer">
          <canvas id="canvas" width="600" height="600"></canvas>
          <canvas id="bckgCanvas" width="600" height="600"></canvas>
          <canvas id="scoreCanvas" width="200" height="50"></canvas>
          <canvas id="livesCanvas" width="50" height="50"></canvas>
        </div>

      </div>

      <div class="rspace">
        <div class="scorepanel" id="scorepanel">

        </div>
      </div>
    </div>

    <script src="orbital.js"></script>

    <?php include 'templates/footer.html';?>
  </body>
</html>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Test site!</title>
    <link href="style.css?v=<?php echo time(); ?>" rel="stylesheet" type="text/css" />

    <style media="screen">
      .maincontent .panels {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }

      .lspace {
        background-color: transparent;
      }
    </style>

  </head>
  <body>
    <?php include 'templates/header.php';?>

    <div class="mainflex">

      <div class="lspace">
        <!-- Sidebar -->
      </div>

      <div class="maincontent">

        <div class="textblock">
          <h1>Demos</h1>
        </div>

        <div class="panels">

          <a href="orbital.php" class="panel" id="asteroidpanel">
            <div class="paneltop">
              <h4>Gravsteroids</p>
            </div>
            <div class="panelmain">
              <p><i>Gravsteroids</i> is an implementation of the classic game <i>Asteroids</i>, written in JavaScript, with the twist that all in-game objects are affected by realistic gravity.</p>
            </div>
          </a>

          <a href="#" class="panel" id="placeholderpanel">
            <div class="paneltop">
              <h4>[Placeholder]</p>
            </div>
            <div class="panelmain">
              <p>[Placeholder]
            </div>
          </a>

          <a href="#" class="panel" id="placeholderpanel">
            <div class="paneltop">
              <h4>[Placeholder]</p>
            </div>
            <div class="panelmain">
              <p>[Placeholder]
            </div>
          </a>

          <a href="#" class="panel" id="placeholderpanel">
            <div class="paneltop">
              <h4>[Placeholder]</p>
            </div>
            <div class="panelmain">
              <p>[Placeholder]
            </div>
          </a>

          <a href="#" class="panel" id="placeholderpanel">
            <div class="paneltop">
              <h4>[Placeholder]</p>
            </div>
            <div class="panelmain">
              <p>[Placeholder]
            </div>
          </a>

        </div>

      </div>

      <div class="rspace"></div>

    </div>

    <?php include 'templates/footer.html';?>
  </body>
</html>

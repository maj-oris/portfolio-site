<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Test site!</title>
    <link href="style.css?v=<?php echo time(); ?>" rel="stylesheet" type="text/css" />

  </head>
  <body>
    <?php include 'templates/header.php';?>

    <div class="mainflex">

      <div class="lspace">
        <!-- Sidebar -->
        <div class="textblock">
          <h3 class="centered">Page contents</h3>
        </div>
        <a class="sidebutton" href="#anchor_whatdo"><p>What does this do?</p></a>
        <a class="sidebutton" href="#anchor_structure"><p>Structure</p></a>
        <a class="sidebutton" href="#anchor_purpose"><p>Purpose</p></a>
        <a class="sidebutton" href="#anchor_next"><p>Next steps</p></a>

      </div>

      <div class="maincontent">

        <div class="textblock">

          <h1>About</h1>

          <h3 id="anchor_whatdo">What does this do?</h3>

          <p>This site serves as a home for several interactive JavaScript-based 'demo' games designed and developed by me. All styling and graphics on this page are by me.

          </p>

          <h3 id="anchor_structure">Structure</h3>

          <p>This site has two primary components: the site itself and the database. The site features numerous (for now only one) demo apps (available on the 'demos' page), from which playthroughs can be saved along with a user-specifiable player name. The mySQL database stores these records; PHP is used to save and recall them as necessary.</p>

          <h3 id="anchor_purpose">Purpose</h3>

          <p>This small site is intended as a portfolio/hobby project focused on the HTML/CSS/JS/PHP/MySQL development ecosystem. Since I am both seeking employment in web development and seeking to expand my knowledge of it out of personal interest, a project such as this seemed like an ideal approach; I learn best by doing.</p>

          <h3 id="anchor_next">Next steps</h3>

          <p>To develop this project further at this stage, I aim to add more increasingly-complex JS demo games and to tidy and extend my CSS, ideally by including SCSS.</p>

        </div>

      </div>

      <div class="rspace"></div>

    </div>

    <?php include 'templates/footer.html';?>
  </body>
</html>

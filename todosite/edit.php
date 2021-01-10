<?php
  session_start();
  $edit_id = $_SESSION["edit_id"];
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title>To-Do Application</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>

    <form action="index.php">
      <input class="sitelink" type="submit" value="Back to Index" />
    </form>

    <div class="card">
      <p class="title">Edit Note</p>
      <form class="" action="index.php" method="post">
        <p class="text">Name:</p>
        <?php
          echo "<input type=\"text\" name=\"notename\" value=\"" . $_SESSION["cards"][$edit_id][0] . "\">"
        ?>
        <br>
        <p class="text">Content:</p>
        <?php
          echo "<textarea name=\"notetext\" class=\"text\" rows=\"2\" cols=\"20\">" . $_SESSION["cards"][$edit_id][1] . "</textarea>";
        ?>
        <br>
        <?php
          echo "<input type=\"hidden\" name=\"card_id\" value=\"" . $edit_id . "\">";
        ?>
        <input type="submit" name="edit" value="Submit">
      </form>
    </div>
  </body>
</html>

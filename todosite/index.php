<?php
  session_start();

  if(isset($_POST['del_card'])){
    unset($_SESSION["cards"][$_POST['sub_id']]);
    $_SESSION["cards"] = array_values($_SESSION["cards"]);
  }

  if(isset($_POST['edit_card'])){
    $_SESSION["edit_id"] = $_POST['sub_id'];
    header("Location: edit.php");
  }

  if(isset($_POST['edit'])){
    $_SESSION["cards"][$_POST["card_id"]][0] = $_POST["notename"];
    $_SESSION["cards"][$_POST["card_id"]][1] = $_POST["notetext"];
  }

  if(isset($_POST['submit'])){
    array_push($_SESSION["cards"], [$_POST["notename"], $_POST["notetext"]]);
  }

  //if edits have been made to the notes variable, then update the cookie. if not, the site could be being reloaded or could be being loaded for the first time.
  //in the latter case, if there is a cookie storing previous data, load that. if not, initialize the cards variable.
  if(isset($_POST['del_card']) || isset($_POST['submit'])) {
    setcookie("tdw_notes", serialize($_SESSION["cards"]), time() + (86400 * 30)); // 86,400 s = 1 d
  } else {
    if(isset($_COOKIE["tdw_notes"])){
      $_SESSION["cards"] = unserialize($_COOKIE["tdw_notes"]);
    } else {
      $_SESSION["cards"] = [];
    }
  }

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title>To-Do Application</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>

    <form action="new.php">
      <input class="sitelink" type="submit" value="New Note" />
    </form>


    <div class="notelist">
      <?php
        for ($x = 0; $x < sizeof($_SESSION["cards"]); $x++) {
          echo "<div class=\"card\">";
          echo "<p class=\"title\">" . $_SESSION["cards"][$x][0] . "</p>";
          echo "<textarea class=\"text\" style=\"border: none\" rows=\"10\" cols=\"20\" readonly>" . $_SESSION["cards"][$x][1] . "</textarea>";
          echo "<form class=\"cardbottom\" action=\"index.php\" method=\"post\">";
          echo "<input type=\"hidden\" name=\"sub_id\" value=\"" . $x . "\">";
          echo "<input type=\"submit\" name=\"del_card\" value=\"Delete\">";
          echo "<input type=\"submit\" name=\"edit_card\" value=\"Edit\">";
          echo "</form>";
          echo "</div>";
        }
      ?>
    </div>

  </body>
</html>

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
      <p class="title">New Note</p>
      <form class="" action="index.php" method="post">
        <p class="text">Name:</p>
        <input type="text" name="notename">
        <br>
        <p class="text">Content:</p>
        <textarea name="notetext" class="text" rows="2" cols="20"></textarea>
        <br>
        <input type="submit" name="submit" value="Submit">
      </form>
    </div>
  </body>
</html>

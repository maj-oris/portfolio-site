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
        <a class="sidebutton" href="#anchor_lorip"><h4>Lorem ipsum</h4></a>
        <a class="sidebutton" href="#anchor_dolorsit"><p>Dolor sit amet</p></a>
        <a class="sidebutton" href="#anchor_morbis"><p>Morbi semper</p></a>

      </div>

      <div class="maincontent">

        <div class="textblock">

          <h1>Home</h1>

          <p>Please note that a webserver, PHP, and mySQL must be installed and the files put in their proper places in order for the features of this website to work properly. I used XAMPP on Windows for this purpose.</p>

          <p>The below text is meaningless and serves mostly as a demonstration of the site's styling.</p>

          <h2 id="anchor_lorip">Lorem ipsum</h2>

          <h3 id="anchor_dolorsit">Dolor sit amet</h3>

          <p>Consectetur adipiscing elit. Aliquam egestas facilisis velit id convallis. Vivamus a nisl quis nisl cursus convallis vitae non risus. Mauris lacus elit, efficitur sit amet convallis a, venenatis in libero. Mauris euismod molestie ante, quis laoreet orci varius sit amet. Duis at maximus massa. Nullam faucibus, magna at accumsan lobortis, lorem est consectetur ex, eu volutpat lacus nisl ut diam. Cras malesuada quis ante ut vestibulum. Duis quis leo non orci bibendum vehicula id eget dui. Phasellus eros leo, rutrum et condimentum in, vulputate vel diam. Vivamus ut fermentum ligula.</p>

          <h3 id="anchor_morbis">Morbi semper</h3>

          <p>Ornare hendrerit. Donec maximus sem non velit semper congue. In hac habitasse platea dictumst. Donec arcu dolor, aliquet vitae tortor sed, imperdiet porta ex. Praesent efficitur leo volutpat enim consequat, et eleifend purus fringilla. Nulla lacus massa, finibus ultrices est venenatis, aliquet mollis augue. Vivamus lobortis, elit eget malesuada sollicitudin, sapien justo rhoncus mauris, sit amet euismod nulla urna a ligula. Nam dignissim malesuada odio, vel vulputate sapien laoreet vitae. Quisque vel sapien pretium, egestas diam ac, egestas elit. Duis pulvinar purus augue, sit amet dictum arcu tincidunt at. Mauris quis mollis leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed gravida odio.</p>

          <p>Sed id posuere neque. Integer vitae varius dui, nec molestie nisi. Integer id felis non sem ullamcorper ornare scelerisque in libero. Morbi pellentesque gravida egestas. Mauris a interdum lectus. Maecenas in lorem blandit lacus hendrerit pretium. Sed finibus eros nisl, vel suscipit elit imperdiet sed.</p>

        </div>

      </div>

      <div class="rspace"></div>

    </div>

    <?php include 'templates/footer.html';?>
  </body>
</html>

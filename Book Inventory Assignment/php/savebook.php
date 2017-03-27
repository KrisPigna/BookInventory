<?php
    $json = file_get_contents("php://input");
     $file = fopen('/home/kpigna1/public_html/project/json/books.json','w+');
     fwrite($file, $json);
     fclose($file);
?>
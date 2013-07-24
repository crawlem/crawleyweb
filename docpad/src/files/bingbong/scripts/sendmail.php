<?php
  $email = $_REQUEST['email'] ;
  $message = $_REQUEST['message'] ;
  $subject = $_REQUEST['subject'];
  $from = $_REQUEST['from'];

  mail($email, $subject, $message);
?>
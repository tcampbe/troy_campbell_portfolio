



<?php

if($_POST["submit"]) {
    $recipient="tcampb@icloud.com";
    $subject="Form to email message";
    $sender=$_POST["sender"];
    $senderEmail=$_POST["senderEmail"];
    $message=$_POST["message"];

    $mailBody="Name: $sender\nEmail: $senderEmail\n\n$message";

    mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");

    $thankYou="<p>Thank you! Your message has been sent.</p>";
}

?><!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta
        name="keywords"
        content="Software Development, Web Development, Programmer, Professional, Software, WebDev, Developer, Database"
        />
        <meta name="author" content="Troy Campbell" />
        <!-- <link rel="stylesheet" href="src/styles/animate.css"> -->
        <!-- <link rel="stylesheet" href="./styles/reset.css"/> -->
        <link rel="stylesheet" href="src/styles/style.css" />
        <title>Email Contact</title>
    </head>

    <body>

        <?=$thankYou ?>

        <form method="post" action="contact.php">
            <label>Name:</label>
            <input name="sender">

            <label>Email address:</label>
            <input name="senderEmail">

            <label>Message:</label>
            <textarea rows="5" cols="20" name="message"></textarea>

            <input type="submit" name="submit">
        </form>

    </body>

</html>


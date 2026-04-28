<html>

    <body>
        
        <?php
if(empty($_POST)) {
    print "<p>No Data was submitted.</p>";
    print "</body></html>";
    exit();
}

function clear_user_input($value) {
    if (get_magic_quotes_gpc())
        $value=stripslashes($value);
    $value= str_replace( "\n", '', trim($value));
    $value= str_replace("\r", '', $value);
    return $value;
}

$body = "here is the data that was submmited:\n";

foreach($_POST as $key => $value){
    $key = clear_user_input($key);
    $value =clear_user_input($value);
    if($key=='extras')
}

if(is_array($_POST['extras'])){
    $body .= "$key: ";
    $counter =1;
    foreach ($_POST['extras']) as $value {
        if (size)
    }
}
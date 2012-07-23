<?php
error_reporting(0);
/*if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])
	|| $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest'
	|| !count($_POST) || !isset($_GET['ajax_url']))
		die("0|Неверный запрос");*/
$url_info = parse_url($_GET['type']);
unset($_POST['ajax_url']);

$data = array();
foreach ($_POST as $k => $v) $data[] = $k.'='.$v;
$data = implode('&', $data);

$fp = fsockopen($url_info['host'], 80, $errno, $errstr, 6);
if (!$fp) die("0|Не могу соединиться с ".@$url_info['host']);
$out  = "POST ".$url_info['path']." HTTP/1.1\r\n";
$out .= "Host: ".$url_info['host']."\r\n";
$out .= "Content-Type: application/x-www-form-urlencoded\r\n";
$out .= "Content-Length: ".strlen($data)."\r\n";
$out .= "Connection: close\r\n\r\n";
$out .= $data;
fputs($fp, $out);

$in = '';
while (($line = fgets($fp, 8192))!==false) $in .= $line;
fclose($fp);

$answer=substr($in, strpos($in, "\r\n\r\n") + 4);

if($data != ""){
$link = mysql_connect('localhost', 'root', 'kavabanga');
        
        if (!$link) {
            return "Подключение невозможно: ".mysql_error();
        }
        $answerDB=str_replace('\\','sssss',$answer);
        $result = mysql_query("INSERT INTO mock.mock ( ask, answer) VALUES ('".$data."' , '".$answerDB."' );");
        //$result = mysql_query("INSERT INTO mock.mock (ask, answer) VALUES ('test' , 'test' );");
        
        mysql_close($link);
        

}


header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
//print $test;
print $answer;

/*header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

print '{"value":[{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0432\u0441\u043a\u0430\u044f","station_id":2208327},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0432\u0441\u043a\u0430\u044f","station_id":2210278},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0434\u0437\u0435\u0440\u0436\u0438\u043d\u0441\u043a","station_id":2210650},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0434\u0437\u0435\u0440\u0436\u0438\u043d\u0441\u043a \u041b\u0435\u0432","station_id":2210970},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0434\u0437\u0435\u0440\u0436\u0438\u043d\u0441\u043a-\u041f\u0430\u0441\u0441.","station_id":2210720},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u043f\u0435\u0442\u0440\u043e\u0432\u0441\u043a \u0413\u043b\u0430\u0432\u043d\u044b\u0439","station_id":2210700},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u043f\u0435\u0442\u0440\u043e\u0432\u0441\u043a \u041e\u0434\u0431","station_id":2210739},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u043f\u0435\u0442\u0440\u043e\u0432\u0441\u043a \u042e\u0436\u043d\u044b\u0439","station_id":2210701},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0440\u0443\u0434\u043d\u0430\u044f","station_id":2210200},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0441\u0442\u0440\u043e\u0439 2","station_id":2210831},{"title":"\u0414\u043d\u0435\u0441\u0442\u0440","station_id":2200236},{"title":"\u0414\u043d\u043e","station_id":2004570}],"error":null,"data":null}';
*/
?>
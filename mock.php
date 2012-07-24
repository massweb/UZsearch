<?php
error_reporting(0);
/*if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])
	|| $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest'
	|| !count($_POST) || !isset($_GET['ajax_url']))
		die("0|Неверный запрос");
$url_info = parse_url($_GET['ajax_url']);
unset($_POST['ajax_url']);
*/
$data = array();
foreach ($_POST as $k => $v) $data[] = $k.'='.$v;
$data = implode('&', $data);
/*
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

header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

print substr($in, strpos($in, "\r\n\r\n") + 4);
*/
header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);


$type=mb_split ('/', $_GET['type']);
$c=count($type);
$name=mb_strtolower(mb_substr($type[$c-2],0,2,'UTF-8' ),'UTF-8');
//$file = fopen('counter.txt', 'w');
//fwrite($file, $type[1]);
//fclose($file);
//print $name;
//print $type[$c-3];

if ($type[$c-3]=="station")
{
    switch ($name)
    {
        case "дн":
        case "ly":
            print '{"value":[{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0432\u0441\u043a\u0430\u044f","station_id":2208327},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0432\u0441\u043a\u0430\u044f","station_id":2210278},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0434\u0437\u0435\u0440\u0436\u0438\u043d\u0441\u043a","station_id":2210650},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0434\u0437\u0435\u0440\u0436\u0438\u043d\u0441\u043a \u041b\u0435\u0432","station_id":2210970},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0434\u0437\u0435\u0440\u0436\u0438\u043d\u0441\u043a-\u041f\u0430\u0441\u0441.","station_id":2210720},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u043f\u0435\u0442\u0440\u043e\u0432\u0441\u043a \u0413\u043b\u0430\u0432\u043d\u044b\u0439","station_id":2210700},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u043f\u0435\u0442\u0440\u043e\u0432\u0441\u043a \u041e\u0434\u0431","station_id":2210739},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u043f\u0435\u0442\u0440\u043e\u0432\u0441\u043a \u042e\u0436\u043d\u044b\u0439","station_id":2210701},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0440\u0443\u0434\u043d\u0430\u044f","station_id":2210200},{"title":"\u0414\u043d\u0435\u043f\u0440\u043e\u0441\u0442\u0440\u043e\u0439 2","station_id":2210831},{"title":"\u0414\u043d\u0435\u0441\u0442\u0440","station_id":2200236},{"title":"\u0414\u043d\u043e","station_id":2004570}],"error":null,"data":null}';
            break;
        case "ев":
        case "td":
            print '{"value":[{"title":"\u0415\u0432\u0433\u0435\u043d\u044c\u0435\u0432\u043a\u0430","station_id":2209517},{"title":"\u0415\u0432\u0434\u0430\u043a\u043e\u0432\u043e","station_id":2014545},{"title":"\u0415\u0432\u0434\u043e\u043a\u0438\u043c\u043e\u0432\u043a\u0430","station_id":2000271},{"title":"\u0415\u0432\u0434\u043e\u043a\u0438\u043c\u043e\u0432\u0441\u043a\u0438\u0439","station_id":2020011},{"title":"\u0415\u0432\u043b\u0430\u0445","station_id":5700710},{"title":"\u0415\u0432\u043b\u0430\u0448\u0435\u0432\u043e","station_id":2024592},{"title":"\u0415\u0432\u043e\u0434\u0431\u043e\u043b\u044c\u0441\u043a\u043e\u0435","station_id":2001096},{"title":"\u0415\u0432\u043f\u0430\u0442\u043e\u0440\u0438\u044f-\u041a\u0443\u0440\u043e\u0440\u0442","station_id":2210770},{"title":"\u0415\u0432\u0440\u043e\u043f\u0435\u0439\u0441\u043a\u0430\u044f","station_id":2030093},{"title":"\u0415\u0432\u0441\u0438\u043d\u043e","station_id":2044792}],"error":null,"data":null}';
            break;
        case "си":
        case "cb":
            print '{"value":[{"title":"\u0421\u0438\u043c\u0444\u0435\u0440\u043e\u043f\u043e\u043b\u044c","station_id":2210001},{"title":"\u0421\u0438\u043d\u0434\u043e\u0440","station_id":2010104},{"title":"\u0421\u0438\u043d\u0435\u0432\u043e","station_id":2004254},{"title":"\u0421\u0438\u043d\u0435\u0433\u043b\u0430\u0437\u043e\u0432\u043e","station_id":2040464},{"title":"\u0421\u0438\u043d\u0435\u0433\u043e\u0440\u0441\u043a","station_id":2068529},{"title":"\u0421\u0438\u043d\u0435\u0433\u043e\u0440\u0441\u043a\u0430\u044f","station_id":2011416},{"title":"\u0421\u0438\u043d\u0435\u0437\u0435\u0440\u043a\u0438","station_id":2000816},{"title":"\u0421\u0438\u043d\u0435\u043b\u044c\u043d\u0438\u043a\u043e\u0432\u043e 2","station_id":2210940},{"title":"\u0421\u0438\u043d\u0435\u043b\u044c\u043d\u0438\u043a\u043e\u0432\u043e-1","station_id":2210920},{"title":"\u0421\u0438\u043d\u0438\u0446\u0438\u043d\u043e","station_id":2021072},{"title":"\u0421\u0438\u043d\u0438\u0446\u044b\u043d\u043e","station_id":2014093},{"title":"\u0421\u0438\u043d\u0442\u0435\u043a","station_id":2061648},{"title":"\u0421\u0438\u043d\u044e\u0433\u0430","station_id":2100789},{"title":"\u0421\u0438\u043d\u044f\u0432\u043e","station_id":2100479},{"title":"\u0421\u0438\u043d\u044f\u0432\u0441\u043a\u0430\u044f","station_id":2064024},{"title":"\u0421\u0438\u043d\u044f\u0447\u0438\u0445\u0430","station_id":2030204},{"title":"\u0421\u0438\u043d\u044f\u044f \u0413\u043e\u0440\u0430","station_id":2210702},{"title":"\u0421\u0438\u043f\u043e\u0442\u0435\u043d\u044b","station_id":2300586},{"title":"\u0421\u0438\u0440\u0435\u043d\u0435\u0432\u043a\u0430","station_id":2048105},{"title":"\u0421\u0438\u0440\u0435\u043d\u044c","station_id":2210823},{"title":"\u0421\u0438\u0441\u0438\u043c","station_id":2038777},{"title":"\u0421\u0438\u0441\u0442\u0435\u043c\u0430","station_id":2043674},{"title":"\u0421\u0438\u0442\u0430","station_id":2500157},{"title":"\u0421\u0438\u0442\u0430\u043b-\u0427\u0430\u0439","station_id":5700707},{"title":"\u0421\u0438\u0442\u0435\u043d\u043a\u0430","station_id":2001881},{"title":"\u0421\u0438\u0442\u043a\u043e\u0432\u0446\u044b","station_id":2200211},{"title":"\u0421\u0438\u0442\u043d\u0438\u0446\u0430","station_id":2100142},{"title":"\u0421\u0438\u0442\u043d\u0438\u0446\u0430 \u041e\u043f","station_id":2100143},{"title":"\u0421\u0438\u0443\u0447","station_id":2004654},{"title":"\u0421\u0438\u0444\u043e\u043d\u043d\u0430\u044f","station_id":2214121},{"title":"\u0421\u0438\u0445\u043e\u0432","station_id":2218092},{"title":"\u0421\u0438\u044f","station_id":2010343}],"error":null,"data":null}';
            break;
        default :
            print $name . "\n";
            print '{"value":[],"error":null,"data":null}';
    }
} else {
    
        $link = mysql_connect('localhost', 'masswebh_root', 'Hjptnrf01');
        
        if (!$link) {
            return "Подключение невозможно: ".mysql_error();
        }
        $result = mysql_query("SELECT answer FROM masswebh_mock.mock WHERE ask='".$data."';");
       
        $temp=mysql_fetch_assoc($result);
        mysql_close($link);
        $answer=$temp['answer'];
        $answer=str_replace('sssss','\\',$answer);
        print $answer;
        
        
}



?>
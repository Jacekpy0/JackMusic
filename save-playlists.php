<?php
$data = file_get_contents('php://input');
file_put_contents('playlists.json', $data);
echo json_encode(["status" => "success"]);
?>
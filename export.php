<?php
require_once 'config.php';

// SQL запрос для получения лидов с фильтром по городу (если применяется)
$sql = "SELECT * FROM leads";
if (isset($_POST['city']) && $_POST['city'] !== '') {
    $city = $_POST['city'];
    $sql .= " WHERE city='$city'";
}
$result = $conn->query($sql);

// Создание CSV файла и запись данных в него
$filename = "leads.csv";
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="' . $filename . '";');

$output = fopen('php://output', 'w');
fputcsv($output, array('ФИО', 'Email', 'Телефон', 'Город'));

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        fputcsv($output, array($row["full_name"], $row["email"], $row["phone"], $row["city"]));
    }
}

fclose($output);
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Список лидов</title>
    <link
      rel="stylesheet"
      href="style.css"
    />
</head>
<body>
<header class="navbar">
    <div class="container">
        <nav class="nav-links">
            <a href="index.html">Главная</a>
            <a href="leads.php">Список лидов</a>
        </nav>
    </div>
</header>
    <h1>Список лидов</h1>

    <form action="" method="GET">
        <label for="cityFilter">Фильтр по городу:</label>
        <select id="cityFilter" name="city">
            <option value="">Все города</option>
            <option value="Москва">Москва</option>
            <option value="Санкт-Петербург">Санкт-Петербург</option>
            <option value="Тула">Тула</option>
        </select>
        <button type="submit">Применить</button>
    </form>

    <table border="1">
        <thead>
            <tr>
                <th>ФИО</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Город</th>
            </tr>
        </thead>
        <tbody>
            <?php
            require_once '../backend/config.php';

            // SQL запрос для получения лидов с фильтром по городу
            $sql = "SELECT * FROM leads";
            if (isset($_GET['city']) && $_GET['city'] !== '') {
                $city = $_GET['city'];
                $sql .= " WHERE city='$city'";
            }
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>".$row["full_name"]."</td>";
                    echo "<td>".$row["email"]."</td>";
                    echo "<td>".$row["phone"]."</td>";
                    echo "<td>".$row["city"]."</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='4'>Нет данных</td></tr>";
            }
            $conn->close();
            ?>
        </tbody>
    </table>

    <br>
    <form action="../backend/export.php" method="POST">
        <input type="hidden" name="city" value="<?php echo isset($_GET['city']) ? $_GET['city'] : ''; ?>">
        <button type="submit">Экспорт в CSV</button>
    </form>
</body>
</html>

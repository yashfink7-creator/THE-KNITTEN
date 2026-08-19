<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");

require_once "../../config/database.php";

$sql = "SELECT * FROM products ORDER BY id ASC";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch products."
    ]);
    exit;
}

$products = [];

while ($row = $result->fetch_assoc()) {

    $row["id"] = (int)$row["id"];
    $row["price"] = (float)$row["price"];
    $row["stock"] = (int)$row["stock"];
    $row["rating"] = (float)$row["rating"];
    $row["reviewCount"] = (int)$row["review_count"];

    $row["isNew"] = (bool)$row["is_new"];
    $row["featured"] = (bool)$row["is_featured"];

    $row["categoryName"] = $row["category_name"];
    $row["imageSearchTerm"] = $row["image_search_term"];

    $row["details"] = $row["details"]
        ? json_decode($row["details"], true)
        : [];

    unset(
        $row["category_name"],
        $row["review_count"],
        $row["is_new"],
        $row["is_featured"],
        $row["image_search_term"],
        $row["created_at"],
        $row["updated_at"]
    );

    $products[] = $row;
}

echo json_encode([
    "success" => true,
    "products" => $products
]);

$conn->close();

?>
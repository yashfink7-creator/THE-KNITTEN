<?php

require_once __DIR__ . '/../config/database.php';

$jsonFile = __DIR__ . '/products.json';

if (!file_exists($jsonFile)) {
    die("products.json not found.");
}

$products = json_decode(file_get_contents($jsonFile), true);

if (!$products) {
    die("Could not read products.json.");
}

$sql = "INSERT INTO products
(
    id,
    name,
    slug,
    description,
    details,
    price,
    category,
    category_name,
    is_new,
    rating,
    review_count,
    emoji,
    bg,
    image,
    image_search_term,
    photo,
    stock,
    is_featured
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}

$count = 0;

foreach ($products as $product) {

    $details = json_encode(
        $product['details'] ?? [],
        JSON_UNESCAPED_UNICODE
    );

    $isNew = !empty($product['isNew']) ? 1 : 0;
    $featured = !empty($product['featured']) ? 1 : 0;

    $image = $product['image'] ?? null;
    $imageSearchTerm = $product['imageSearchTerm'] ?? null;
    $photo = $product['photo'] ?? null;

    $stmt->bind_param(
    "issssdssidissssssi",
    $product['id'],
    $product['name'],
    $product['slug'],
    $product['description'],
    $details,
    $product['price'],
    $product['category'],
    $product['categoryName'],
    $isNew,
    $product['rating'],
    $product['reviewCount'],
    $product['emoji'],
    $product['bg'],
    $image,
    $imageSearchTerm,
    $photo,
    $product['stock'],
    $featured
);

    if ($stmt->execute()) {
        $count++;
    } else {
        echo "Failed: " . $product['name'] . "<br>";
        echo $stmt->error . "<br><br>";
    }
}

$stmt->close();

echo "<h2>Import completed!</h2>";
echo "<p>$count products imported successfully.</p>";

?>
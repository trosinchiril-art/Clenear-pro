<?php
/**
 * Salvează cererea de ofertă în MySQL (XAMPP local)
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodă nepermisă.']);
    exit;
}

require_once __DIR__ . '/db.php';

$input = [
    'name' => trim($_POST['name'] ?? ''),
    'phone' => trim($_POST['phone'] ?? ''),
    'email' => trim($_POST['email'] ?? ''),
    'serviceType' => trim($_POST['serviceType'] ?? ''),
    'area' => trim($_POST['area'] ?? ''),
    'frequency' => trim($_POST['frequency'] ?? ''),
    'message' => trim($_POST['message'] ?? ''),
];

$allowedServices = ['residential', 'office', 'postconstruction', 'industrial'];
$allowedFrequency = ['once', 'weekly', 'biweekly', 'monthly'];

$phoneClean = preg_replace('/[\s\-\(\)]/', '', $input['phone']);
$area = filter_var($input['area'], FILTER_VALIDATE_FLOAT);

if ($input['name'] === '' || mb_strlen($input['name']) < 2) {
    respondError('Numele este obligatoriu.');
}
if (!preg_match('/^[a-zA-ZăâîșțĂÂÎȘȚа-яА-ЯёЁ\s\-\']+$/u', $input['name'])) {
    respondError('Numele conține caractere nevalide.');
}
if (!preg_match('/^\+373[0-9]{8}$/', $phoneClean)) {
    respondError('Telefon invalid. Format: +373XXXXXXXX.');
}
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    respondError('Email invalid.');
}
if (!in_array($input['serviceType'], $allowedServices, true)) {
    respondError('Tip serviciu invalid.');
}
if ($area === false || $area <= 0 || $area > 10000) {
    respondError('Suprafață invalidă.');
}
if (!in_array($input['frequency'], $allowedFrequency, true)) {
    respondError('Frecvență invalidă.');
}
if (mb_strlen($input['message']) > 500) {
    respondError('Mesajul este prea lung.');
}

try {
    $pdo = getDbConnection();

    $stmt = $pdo->prepare(
        'INSERT INTO offer_requests
         (name, phone, email, service_type, area, frequency, message)
         VALUES (:name, :phone, :email, :service_type, :area, :frequency, :message)'
    );

    $stmt->execute([
        ':name' => $input['name'],
        ':phone' => $phoneClean,
        ':email' => $input['email'],
        ':service_type' => $input['serviceType'],
        ':area' => $area,
        ':frequency' => $input['frequency'],
        ':message' => $input['message'] !== '' ? $input['message'] : null,
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Cererea a fost salvată cu succes.',
        'id' => (int) $pdo->lastInsertId(),
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Eroare la salvare în baza de date. Verificați MySQL și schema.sql.',
    ]);
}

function respondError(string $message): void
{
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

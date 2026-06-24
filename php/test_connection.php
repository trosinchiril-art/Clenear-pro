<?php
/**
 * Test conexiune PHP + MySQL
 * Deschideți: http://localhost/CleanPro/php/test_connection.php
 */

header('Content-Type: text/html; charset=utf-8');

echo '<h1>Clean Pro — test server</h1>';
echo '<p><strong>PHP:</strong> ' . phpversion() . ' ✓</p>';

try {
    require_once __DIR__ . '/db.php';
    $pdo = getDbConnection();
    $pdo->query('SELECT 1');
    $count = $pdo->query('SELECT COUNT(*) FROM offer_requests')->fetchColumn();
    echo '<p><strong>MySQL:</strong> conectat ✓</p>';
    echo '<p><strong>Tabela offer_requests:</strong> ' . (int) $count . ' înregistrări</p>';
    echo '<p style="color:green">Totul funcționează. <a href="../contact.html">Trimiteți formularul</a></p>';
} catch (Throwable $e) {
    echo '<p style="color:red"><strong>MySQL:</strong> eroare — ' . htmlspecialchars($e->getMessage()) . '</p>';
    echo '<p>Importați <code>database/schema.sql</code> în phpMyAdmin.</p>';
}

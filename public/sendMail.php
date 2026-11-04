<?php

// Receives the contact form (JSON, same origin) and mails it to the site owner.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST', true, 405);
    exit;
}

$params = json_decode(file_get_contents('php://input'), true);

$name = trim((string)($params['name'] ?? ''));
$email = trim((string)($params['email'] ?? ''));
$message = trim((string)($params['message'] ?? ''));

// Reject incomplete input and line breaks in header fields (header injection)
if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $name . $email)) {
    http_response_code(400);
    exit;
}

// Sender and recipient: an address that exists as a mailbox at the host. Shared hosts drop mail
// from unknown sender addresses even though mail() reports success.
$recipient = 'kontakt@akleinschmidt.net';
$sender = 'kontakt@akleinschmidt.net';
$subject = '=?UTF-8?B?' . base64_encode("Contact from $name") . '?=';
$body = '<p><strong>From:</strong> ' . htmlspecialchars($name) . ' &lt;' . htmlspecialchars($email) . '&gt;</p>'
    . '<p>' . nl2br(htmlspecialchars($message)) . '</p>';

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    "From: $sender",
    "Reply-To: $email",
];

// -f sets the envelope sender, which hosts check in addition to the From header
if (!mail($recipient, $subject, $body, implode("\r\n", $headers), "-f $sender")) {
    http_response_code(500);
}

<?php
// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database credentials
$servername = "localhost";
$username = "root"; // change if needed
$password = "";     // change if needed
$dbname = "college_survey";

// Connect to DB
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }

// Get POST data
$name = $_POST['name'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$course = $_POST['course'];
$qualityOfTeaching = $_POST['qualityOfTeaching'];
$facultyAvailability = $_POST['facultyAvailability'];
$library = $_POST['library'];
$wifi = $_POST['wifi'];
$overallRating = $_POST['overallRating'];
$suggestions = $_POST['suggestions'];

// Insert data safely
$stmt = $conn->prepare("INSERT INTO survey_responses 
    (name, age, gender, course, qualityOfTeaching, facultyAvailability, library, wifi, overallRating, suggestions)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissiiiiis", $name, $age, $gender, $course, $qualityOfTeaching, $facultyAvailability, $library, $wifi, $overallRating, $suggestions);

// Execute
if ($stmt->execute()) {
    echo "success";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>

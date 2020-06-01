/**
 * APP ROUTE:
 * 
 *               Signup
 *                 ||
 * About page --> Login --> Dashboard --> Result Display
 * 
 * APP STAGES:
 * 0 --> About Page
 * 1A --> Login
 * 1B --> SignUp
 * 2 --> Dashboard
 * 3 --> Result Display
 * 
 * 
 * This file should be used to initials global variables only
 */

const dashboardTable = document.querySelector('#subjectData');
const backBtn = document.querySelector('#back');
const resetBtn = document.querySelector('#resetDoc');
var stage;
var currUsr = null;
var studentNameArray = ["A B"];
var studentRollNoArray = [1810991169];
var studentPassword = ["123456"];
var currentStudentIndex = 0;
var currentStudent = studentNameArray[currentStudentIndex];
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("signupForm").addEventListener("submit", function(event){
        event.preventDefault()
        addUser()
    })
})
function addUser(){
    var userName = document.getElementById('userName').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var birthdate = document.getElementById('birthdate').value
    var location = document.getElementById('location').value
    var corporate = document.getElementById('corporate').value
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(JSON.parse(this.responseText))
                alert("You are signed in", this.response)
            } else {
                console.log('Failed to add student.')
                alert("There is a problem. Try again")
            }
        }
    }
    xhr.open('POST', 'apiSign.php', true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send('userName=' + userName + '&email=' + email + '&password=' + password + '&birthdate=' + birthdate + '&location=' + location + '&corporate=' + corporate)
}

const editUser = (id) =>{
    let name = prompt("Enter the new name")
    let email = prompt("Enter the new email")
    let password = prompt("Enter the new password")
    let birthdate = prompt("Enter the new birthdate")
    let location = prompt("Enter the new location")
    let corporate = prompt("Enter the new corporate")
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(this.responseText)
            } else {
                console.log('Failed to edit student.');
            }
        }
    };
    xhr.open('PUT', 'apiSign.php', true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send('id=' + id + '&name=' + name + '&email=' + email + '&password=' + password + '&birthdate=' + birthdate + '&location=' + location + '&corporate=' + corporate)
}

const deleteUser = (id) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(this.responseText)
            } else {
                console.log('Failed to delete student.');
            }
        }
    };
    xhr.open('DELETE', 'apiSign.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('id=' + id);
}
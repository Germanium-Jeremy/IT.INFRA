let allUsers = []
let pagination = $("#pagination")
let currentPage = 1
let rowsPerPage = 6

$(document).ready(function() {
    loadUser()

    $('#signForm').submit(function(event) {
        event.preventDefault()
        var submit = $('#submit').text()
        if (submit === 'Add User') {
            addUser()
        } else if (submit === 'Edit User') {
            editUser()
        }
    })

    $('#adminTable').on('click', '#delete', function() {
        deleteRows()
    })

    $('#adminTable').on('click', 'button.editButton', function() {
        var id = $(this).closest('tr').find('td:first').text()
        loadEditUserData(id)
    })
})

function loadUser() {
    $.ajax({
        type: 'GET',
        url: 'api.php',
        success: function(response) {
            allUsers = response
            displayUsers(allUsers)
            const totalPages = Math.ceil(response.length / rowsPerPage)
            displayPagination(totalPages)
        },
        error: function() {
            console.error('Failed to load User')
            alert("Failed to load user")
        }
    })
}
function displayUsers(allUsers) {
    var userTable = $('#adminTable')
    userTable.empty()
    $('#delete').html('<button id="del" onclick="deleteRows()">DELETE</button>')
    if (allUsers.length){
        const startIndex = (currentPage - 1) * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        const paginatedData = allUsers.slice(startIndex, endIndex)
        paginatedData.forEach(function(user) {
            var UserTr = $('<tr>')
            UserTr.html(`
                <td class="check"><input type="checkbox" data-val="${user.ID}" class="checkbox"></td>
                <td class="gotId" id="updateUser">${user.ID}</td>
                <td class="gotName">${user.USERNAME}</td>
                <td class="gotEmail">${user.EMAIL}</td>
                <td class="gotPassword">${user.PASSWORD}</td>
                <td class="gotDate">${user.BIRTHDATE}</td>
                <td class="gotLocation">${user.LOCATION}</td>
                <td class="gotCorporate">${user.CORPORATE}</td>
                <td class="gotEdit"><button class="editButton" data-id="${user.ID}" onclick="editUser(${user.ID})">Edit</button></td>
                <td class="gotDelete"><button onclick="deleteUser(${user.ID})">Delete</button></td>
            `);
            userTable.append(UserTr)
        })
    }else{
        const noData = userTable.create("<tr><td colspan='10'>No Users In The System</td></tr>")
        userTable.append(noData)
    }
}

function addUser() {
    var userName = $('#username').val()
    var email = $('#email').val()
    var password = $('#password').val()
    var birthdate = $('#birthDate').val()
    var location = $('#location').val()
    var corporate = $('#corporate').val()
    
    $.ajax({
        type: 'POST',
        url: 'api.php',
        data: {
            userName: userName,
            email: email,
            password: password,
            birthdate: birthdate,
            location: location,
            corporate: corporate
        },
        success: function(response) {
            loadUser()
            console.log("You have successfully signed in ITINFRA", response)
            const addSuccess = $("#addUserSuccess");
            addSuccess.css({
                Animation: "moving 4s ease-in-out"
            })
            setTimeout(function() {
                addError.css({
                    animation: "none"
                });
            }, 1000)
        },
        error: function() {
            console.error('Failed to add student.')
            const addError = $("#addUserError");
            addError.css({
                animation: "moving 4s ease-in-out"
            });
            setTimeout(function() {
                addSuccess.css({
                    animation: "none"
                });
            }, 1000)
        }
    })
}

const loadEditUserData = async (id) => {
    try {
        const response = await $.ajax({
            type: 'GET',
            url: 'api.php?id=' + id
        });

        fillFormWithUserData(response)
        $('#submit').text('Edit User')
        $('#signForm h2').text('ADMIN EDIT USER')
        $('#userID').val(id);
    } catch (error) {
        console.error('Failed to load user data.')
        alert("Failed to load edit User")
    }
}

function fillFormWithUserData(user) {
    $('#username').val(user.USERNAME)
    $('#email').val(user.EMAIL)
    $('#password').val(user.PASSWORD)
    $('#birthDate').val(user.BIRTHDATE)
    $('#location').val(user.LOCATION)
    $('#corporate').val(user.CORPORATE)
}

function editUser(id){
    loadEditUserData(id)
    $.ajax({
        type: 'PUT',
        url: 'api.php',
        data: {
            id: id,
            userName: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            birthdate: $('#birthDate').val(),
            location: $('#location').val(),
            corporate: $('#corporate').val()
        },
        success: function(response) {
            loadUser()
            $('#signForm')[0].reset()
            $('#submit').text('Add User')
            $('#signForm h2').text('ADMIN ADD USER')
            console.log(response)
        },
        error: function(xhr, status, error) {
            console.error('Failed to edit user:', error)
            console.error(xhr, status)
            alert("User not edited")
        }
    })
}

function deleteUser(id) {
    $.ajax({
        type: 'DELETE',
        url: 'api.php',
        data: { id: id },
        success: function(response) {
            console.log(response)
            loadUser()
        },
        error: function(xhr, status, error) {
            console.error('Failed to delete user:', error)
            console.log(status, xhr)
            alert("Failed to delete User")
        }
    })
}

function deleteRows() {
    const checkboxes = document.querySelectorAll(".checkbox:checked")
    const idsToDelete = Array.from(checkboxes).map(checkbox => parseInt(checkbox.getAttribute("data-val")))
    idsToDelete.forEach(id => {
        deleteOneRow(id)
    })
}

function deleteOneRow(id) {
    $.ajax({
        type: 'DELETE',
        url: 'api.php',
        data: { id: id },
        success: function(response) {
            console.log(response)
            loadUser()
        },
        error: function(xhr, status, error) {
            console.error('Failed to delete user:', error)
            console.log(status, xhr)
            alert("Failed to delete User")
        }
    })
}

$(document).ready(function () {
    $("#searchCont").on("input", function () {
        var searchText = $(this).val().toLowerCase()
        $("#adminTable tr").each(function () {
        var text = $(this).text().toLowerCase()
        var found = text.includes(searchText)
        $(this).toggle(found)
        if (found) {
            $(this).show()
        } else $(this).hide()
        })
    })
    const showAdminAddUser = $("#showAdminAddUser")
    showAdminAddUser.on({
        click: function(){
            $(this).css({'display':'none'})
            $("#signForm").css({'display':'block'})
        }
    })
    const hideAdminAddUser = $("#close")
    hideAdminAddUser.on({
        click: function(){
            $(showAdminAddUser).css({'display':'block'})
            $("#signForm").css({'display':'none'})
        }
    })
})
function displayPagination(totalPages) {
    pagination.empty(); // Clear existing pagination buttons

    // Previous button
    const prevBtn = $("<button>").text("Prev").addClass("pagination-btn");
    if (currentPage === 1) {
        prevBtn.prop("disabled", true).addClass("disabled");
    } else {
        prevBtn.on("click", function() {
            currentPage--;
            loadUser(); // Reload the user data based on the current page
        });
    }
    pagination.append(prevBtn);

    // Numbered buttons
    for (let i = 1; i <= totalPages; i++) {
        const btn = $("<button>").text(i).addClass("pagination-btn");
        if (i === currentPage) {
            btn.addClass("active");
        }
        btn.on("click", function() {
            currentPage = i;
            loadUser(); // Reload the user data based on the current page
        });
        pagination.append(btn);
    }

    // Next button
    const nextBtn = $("<button>").text("Next").addClass("pagination-btn");
    if (currentPage === totalPages) {
        nextBtn.prop("disabled", true).addClass("disabled");
    } else {
        nextBtn.on("click", function() {
            currentPage++;
            loadUser(); // Reload the user data based on the current page
        });
    }
    pagination.append(nextBtn);
}


$(document).ready(function(){
    console.log("My Network.js Is being executed")
    $("#networkForm").submit(function(event){
        event.preventDefault()
        console.log("Form submitted")
            var networkName = $('#networkName').val()
            var networkSecurity = $('#networkSecurity').val()
            var networkPassword = $('#networkPassword').val()
            var encription = $('#networkEncription').val()
            var ipAddress = $('#networkAddress').val()
            var networkOwner = $('#networkOwner').val()
            var dhcpEnabled = $('#dhcp').is(':checked') ? 'enabled' : 'disabled';

            console.log("Form values:", networkName, networkSecurity, networkPassword, encription, ipAddress, networkOwner, dhcpEnabled);
            
            $.ajax({
                type: 'POST',
                url: '../gui/otherPages/threePages/networkApi.php',
                data: {
                    networkName: networkName,
                    networkSecurity: networkSecurity,
                    networkPassword: networkPassword,
                    encription: encription,
                    ipAddress: ipAddress,
                    networkOwner: networkOwner,
                    dhcpEnabled: dhcpEnabled
                },
                success: function(response) {
                    console.log(response)
                    alert(response)
                    $("#networkForm").hide()
                    $(".explain").html(
                        `<p>YOU CAN NOW USE OTHER FEATURES WITHOUT A PROBLEM</p>`
                    )
                },
                error: function() {
                    console.error('Failed to add network.')
                    alert("There was a problem, try again")
                }
            })
    })
})
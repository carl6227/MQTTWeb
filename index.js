// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or
var client = mqtt.connect($('#broker').val())
 
// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
// var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

$("#connectBtn").on('click', function () {
    $("#status").val('Connecting...')
    client.on('connect', function () {
        $("#status").val('Connected!')
        $("#pub-button").on('click', () => {
            now = new Date().toLocaleTimeString()
            console.log();
            client.publish($("#pubTopic").val(), $("#pubMessage").val())
            $("#publishTable tbody").prepend('<tr><td>' + $("#pubTopic").val() + '</td><td>' + $("#pubMessage").val() + '</td><td>' + new Date().toDateString() + " " + now.substring(0, now.length - 2) + '</td></tr>');
        })
        $("#sub-button").on('click', function () {
            client.subscribe($("#sub-input").val());
            now = new Date().toLocaleTimeString()
            $("#subscribeTable tbody").prepend('<tr><td>' + $("#sub-input").val() + '</td><td >' + new Date().toDateString() + " " + now.substring(0, now.length - 2) + '</td></tr>');
        })
        $("#unSub-button").on('click', () => {
            var tbl = $("#subscribeTable tbody tr").children();
            $(tbl).each(function (index, value) {
            if($(value).text()==$("#sub-input").val()){
                $(value).parent().remove();
                client.unsubscribe($("#sub-input").val());
            }
            })

        })
    })
    $("#disconnect-button").on('click',()=>{
        client=""
        $("#status").val('Disconnected!')
        
         })
              
})
pubTopic = $("#pubTopic").val();
message = $("#pubMessage").val();
now = new Date().toLocaleTimeString();
client.on('message', function (pubTopic, message) {
    $("#incomingMessageTable tbody").prepend('<tr><td>' + pubTopic + '</td><td>' + message + '</td><td>' + new Date().toDateString() + " " + now.substring(0, now.length - 2) + '</td></tr>');
})



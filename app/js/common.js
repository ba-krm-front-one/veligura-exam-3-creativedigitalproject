$(function() {

    var map,
        pointPin = {lat: -7.926579, lng: 112.637335},
        pointCenter = {lat: -7.935560, lng: 112.632655};

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: pointCenter,
            zoom: 15,
            disableDefaultUI: false,
            scrollwheel: false
        });
        var image = {
            url: ''
        };
        var marker = new google.maps.Marker({
            position: pointPin,
            map: map,
            icon: image
        });
    }

    initMap();

});


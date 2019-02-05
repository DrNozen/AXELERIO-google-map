
function initMap () {
 
    // Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
    var map = new google.maps.Map(document.getElementById("map-container"), {
        // Nous plaçons le centre de la carte avec les coordonnées ci-dessus
        center: new google.maps.LatLng(41.93, 8.65),
        // Nous définissons le zoom par défaut
        zoom: 8,
        // Nous définissons le type de carte (ici carte routière)
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // Nous activons les options de contrôle de la carte (plan, satellite...)
        mapTypeControl: true,
        // Nous désactivons la roulette de souris
        scrollwheel: false,
        mapTypeControlOptions: {
        // Cette option sert à définir comment les options se placent
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
        },
        // Activation des options de navigation dans la carte (zoom...)
        navigationControl: true,
        navigationControlOptions: {
        // Comment ces options doivent-elles s'afficher
        style: google.maps.NavigationControlStyle.ZOOM_PAN
        }
    });
            
     

    function appelAjax(f) {
        $.ajax({
            url: '/api',
            type: 'GET',
            success: f,
            error: function(error) {
                console.log(error);
            }
        });
    }
    appelAjax(function(results){
        results.records.forEach(function(record) {
            console.log(record.geometry.coordinates[1])
            console.log(record.geometry.coordinates[0])
            console.log(record.fields.filiere)
            console.log(record.fields.site)
            console.log(record.fields.puissance_mw)
            //console.log(results.fields)
            // Nous ajoutons un marqueur
            
            var marker = new google.maps.Marker({
                // Nous définissons sa position (syntaxe json)
                position: {lat: record.geometry.coordinates[1], lng: record.geometry.coordinates[0]},
                // Nous définissons à quelle carte il est ajouté
                map: map
            });
            var image = record.fields.photo
            var infowindow = new google.maps.InfoWindow({
                content: (record.fields.site+ '<br/>' +record.fields.puissance_mw+ '<br/>' + record.fields.filiere),
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
              });
        })
    })
}


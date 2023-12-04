export const initAutocomplete = async () => {
    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        console.log('Избрано място:', place.geometry.location);

        // place обекта съдържа информация за избраното място, включително координати (place.geometry.location)
    });
}
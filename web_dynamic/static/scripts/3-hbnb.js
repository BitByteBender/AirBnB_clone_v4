'use strict';
// Script that gets executed whne DOM is loaded

$(document).ready(function () {
  const amenities = {};

  function updateAPIStats () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status',
      type: 'GET',
      success: function (data) {
        if (data.status === 'OK') {
          $('div#api_status').addClass('available');
        } else {
          $('div#api_status').removeClass('available');
        }
      }
    });
  }
  updateAPIStats();

  $('input[type="checkbox"]').change(function () {
    const amnId = $(this).data('id'); const amnName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amnId] = amnName;
    } else {
      delete amenities[amnId];
    }

    const lst = Object.values(amenities).join(', ');
    $('.amenities h4').text(lst);
  });

  function fetchPlaces () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({})
    }).done(function (data) {
      data.forEach(place => {
        const article = document.createElement('article');
	article.innerHTML = `
          <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
          <div class="max_guest">
          ${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
          <div class="number_rooms">
          ${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
          <div class="number_bathrooms">
          ${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
          </div>
          <div class="user">
          <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
          </div>
          <div class="description">
          ${place.description | safe}
          </div>`;
        $('section.places').append(article);
    }
  });

  fetchPlaces();
});

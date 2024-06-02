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
});

'use strict';

$(document).ready(function () {
  const amenities = {};

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

let updateQuantityPrice = function (ele) {
  let price = parseFloat($(ele).find('.price span').text());
  let quantity = parseFloat($(ele).find('.quantity input').val());
  let totalPrice = price * quantity;
  if (isNaN(totalPrice)) {
    totalPrice = 0;
  }
  $(ele).children('.total-price').text('$' + totalPrice.toFixed(2));
  return totalPrice;
}

let sum = function(pri, x) { return pri + x; };

let updateCartTotal = function () {
  let totalPrices = [];
  $('tbody').find('tr').each(function(index, element) {
    let price = updateQuantityPrice(element);
    totalPrices.push(price);
  });
  let totalCartPrice = totalPrices.reduce(sum);
  $('#total-cart-price').text('Total: $' + totalCartPrice.toFixed(2));
}

$(document).ready(function() {
  updateCartTotal();

  $(document).on('click', '.btn.delete', function(event) {
    $(this).closest('tr').remove();
    updateCartTotal();
  });

  let timeout;
  $(document).on('input', 'tr input', function() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateCartTotal();
    }, 1000);
  });

  $('#product-input').on('submit', function(event) {
    event.preventDefault();
    let product = $('#product-creator').val();
    let price = $('#product-price').val();

    $('tbody').append('<tr>' +
      '<td class="product">' + product + '</td>' +
      '<td class="price">$ <span>' + price +'</span></td>' +
      '<td class="quantity">' +
      '<div class="input-group">' +
      '<span class="input-group-text">QTY</span>' +
      '<input type="number" class="form-control" min="0" placeholder="0" aria-label="Number of products">' +
      '<button class="btn btn-outline-secondary delete" type="button">Delete</button>' +
      '</div>' +
      '</td>' +
      '<td class="total-price"></td>' +
    '</tr>');

    updateCartTotal();

    $('#product-creator').val('');
    $('#product-price').val('');
  });
});
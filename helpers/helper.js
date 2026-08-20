function formatPrice(price) {
    return 'IDR ' + price.toLocaleString('id-ID')
}

module.exports = formatPrice
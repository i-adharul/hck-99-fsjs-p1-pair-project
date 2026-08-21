function formatPrice(price) {
    return 'IDR ' + price.toLocaleString('id-ID')
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', {
         day: 'numeric', 
         month: 'short', 
         year: 'numeric' 
        })
}

module.exports = {formatPrice, formatDate}
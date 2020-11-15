module.exports = {
    if_equal: function (a, b, options) {
        if (String(a) === String(b)) {
          return options.fn(this)
        }
    }
}
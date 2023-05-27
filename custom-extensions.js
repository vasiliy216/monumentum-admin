// eslint-disable-next-line no-extend-native

String.prototype.toCamelCase = function toCamelCase() {
	if (this && this.length) {
		if (this.length > 1) {
			return this.substring(0, 1).toUpperCase() + this.substring(1).toLowerCase()
		}
		return this.toLowerCase()
	}
	return this
}
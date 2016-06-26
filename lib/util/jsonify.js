function fix(json) {
	for (var p in json) {
		if (Array.isArray(json[p])) {
			if (json[p].length === 1) {
				json[p] = fix(json[p][0]);
			} else {
				json[p].map(fix);
			}
		} else if (typeof json[p] === 'object') {
			json[p] = fix(json[p]);
		}
	}
	return json;
}

module.exports = fix;

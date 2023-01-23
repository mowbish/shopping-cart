export default function lengthCheck(variable, name, min, max) {
	if (!(variable.length >= min && variable.length <= max))
		alert(`${name} length should be ${min}-${max}`)
	return true
}

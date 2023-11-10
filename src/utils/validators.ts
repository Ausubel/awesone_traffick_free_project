export function isDateValid(dateStr: string) {
	return !isNaN(new Date(dateStr).getTime());
}
export function isNumber(value: any) {
	return !Number.isNaN(parseInt(value));
}
export function isString(value: any) {
	return typeof value === "string";
}
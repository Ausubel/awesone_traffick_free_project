export function isDateValid(dateStr: string) {
	return !isNaN(new Date(dateStr).getTime());
}
export function isNumber(value: any) {
	return !Number.isNaN(parseInt(value));
}

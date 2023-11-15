export default class ApiResponse<D> {
	private constructor(readonly message: string, readonly data: D) {}
	static complete<D>(message: string, data: D): ApiResponse<D> {
		return new ApiResponse(message, data);
	}
	static empty(): ApiResponse<null> {
		return new ApiResponse("Empty", null);
	}
	static error(message: string): ApiResponse<null> {
		return new ApiResponse(message, null);
	}
}

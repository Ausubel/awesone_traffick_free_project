import ApiResponse from "./http";

export function sendResponses(res: any, statusCode: number, message: string | null = null, data: any = null) {
  switch (statusCode) {
    case 200:
      return res.json(ApiResponse.complete(message || "Success", data));
    case 201:
      return res.status(201).json(ApiResponse.complete(message || "Created", data));
    case 400:
      return res.status(400).json(ApiResponse.error(message || "Bad Request"));
    case 401:
      return res.status(401).json(ApiResponse.error(message || "Unauthorized"));
    case 404:
      return res.status(404).json(ApiResponse.error(message || "Not Found"));
    case 409:
      return res.status(409).json(ApiResponse.error(message || "Conflict"));
    case 422:
      return res.status(422).json(ApiResponse.error(message || "Unprocessable Entity"));
    case 500:
      return res.status(500).json(ApiResponse.error(message || "Internal Server Error"));
    default:
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
  }
}



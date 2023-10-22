import { Router } from "express";

interface ControllerBase {
	root: string;
	router: Router;
}

export default ControllerBase;

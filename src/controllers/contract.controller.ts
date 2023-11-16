import { Router } from "express";
import PlayerContractService from "../services/contract.service";
import ControllerBase from "./ControllerBase";
import ApiResponse from "../utils/http";
import ContractRegisterDTO from "./dtos/ContractRegisterDTO";
import { sendResponses } from "../utils/sendResponses";

export default class PlayerContractController implements ControllerBase{
    private _root: string;
    private _router: Router;
    private playerContractService: PlayerContractService;
    constructor() {
        this._root = "/player_contracts/";
        this._router = Router();
        this.playerContractService = new PlayerContractService();
        this.onEndpoints();
    }
    get root() {
        return this._root;
    }
    get router() {
        return this._router;
    }
    private onEndpoints() {
        this.onGetPlayerContracts();
        this.onRegisterPlayerContract();
    }
    private onGetPlayerContracts() {
        this._router.get("/:id", async (_, res) => {
            const id: number = parseInt(_.params.id);
            const contracts = await this.playerContractService.getAllContractsByPlayerId(id);
            sendResponses(res, 200, "SUCCESS", contracts);
        });
    }
    private onRegisterPlayerContract() {
        this._router.put("/:id/register", async (req, res) => {
            const playerId: number = parseInt(req.params.id);
            const body = req.body;
            if (!ContractRegisterDTO.isValid(body)) {
                sendResponses(res, 400, "Invalid body", null);
                return;
            }
            const playerContract: ContractRegisterDTO = new ContractRegisterDTO(body);
            const message: string = await this.playerContractService.registerPlayerContractByPlayerId(playerId,playerContract);
            console.log(message);
            if (message !== "SUCCESS") {
                sendResponses(res, 400, message, null);
                console.log(message);
                return;
            }
            res.json(ApiResponse.complete<null>(message, null));
        });
    }
};
import { Request, Response } from "express";
import { PrismaSreenshotRepository } from "../../repositories/screenshot/PrismaScreenshotRepository";
import { CreateScreenshotService } from "../../services/screenshot/CreateScreenshotService";
import { DeleteScreenshotService } from "../../services/screenshot/deleteScreenshotService";

const prismaScreenshotRepository = new PrismaSreenshotRepository();
const createScreenshotService = new CreateScreenshotService(
  prismaScreenshotRepository
);
const deleteScreenshotService = new DeleteScreenshotService(
  prismaScreenshotRepository
);

export class ScreenshotController {
  async create(request: Request, response: Response) {
    const { body } = request;
    const result = await createScreenshotService.execute(body);
    
    return response.json(result);
  }

  async delete(request: Request, response: Response) {
    const id = request.params;
    const result = await deleteScreenshotService.execute(Number(id));

    return response.json(result);
  }
}

import { ScreenshotRepository } from "../../repositories/screenshot/IScreenshotRepository";

export interface CreateSrecreenshotRequest {
  screenshot: Blob;
  userId: number;
}

export class CreateScreenshotService {
  constructor(private screenshotRepository: ScreenshotRepository) {}

  async execute(data: CreateSrecreenshotRequest) {
    const screenshotCreated = await this.screenshotRepository.create({
      screenshot: data.screenshot,
      userId: data.userId,
    });
    return screenshotCreated;
  }
}

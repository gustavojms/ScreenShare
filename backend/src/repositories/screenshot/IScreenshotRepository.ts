export interface CreateSrecreenshotData {
  id: number;
  screenshot: Blob;
  userId: number;
}
export interface CreateSrecreenshot {
  screenshot: Blob;
  userId: number;
}

export interface ScreenshotRepository {
  create(data: CreateSrecreenshot): Promise<CreateSrecreenshot>;
  findById(id: number): Promise<CreateSrecreenshotData | null>;
  delete(id: number): Promise<CreateSrecreenshotData>;
}

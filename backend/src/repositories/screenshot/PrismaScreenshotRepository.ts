// import { prisma } from "../../database/prismaClient";
// import {
//   CreateSrecreenshotData,
//   CreateSrecreenshot,
//   ScreenshotRepository,
// } from "./IScreenshotRepository";

// export class PrismaSreenshotRepository implements ScreenshotRepository {
//   async create(data: CreateSrecreenshotData): Promise<CreateSrecreenshot> {
//     const screenshot = await prisma.screenshot.create({
//       data: {
//         screenshot: data.screenshot,
//       },
//     });
//     return screenshot;
//   }

//   async findById(id: number): Promise<CreateSrecreenshotData | null> {
//     const screenshot = await prisma.screenshot.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     return screenshot;
//   }

//   async delete(id: number): Promise<CreateSrecreenshotData> {
//     const screenshot = await prisma.screenshot.delete({
//       where: {
//         id: id,
//       },
//     });
//     return screenshot;
//   }
// }

import { BikeRepo } from "../../ports/bike-repo";
import { Bike } from "../../bike";
import prisma from "./db"

export class PrismaBikeRepo implements BikeRepo {

  async update(bikeId: string, bikeUpdated: Partial<Bike>): Promise<void> {
    const bike = await prisma.bike.update({
        where: { bikeId },
        data: { bikeUpdated },
    });
    return
    }

  async find(bikeId: string): Promise<Bike> {
      const bike = await prisma.bike.findFirst({
          where: { bikeId  }
      })
      if(!bike) throw new console.error("Bike not found in DB");
      return bike
  }

  async add(bike: Bike): Promise<string> {
      const addedBike = await prisma.bike.create({
          data: { ...bike }
      })
      return addedBike.id
  }

  async remove(bikeId: string): Promise<void> {
      await prisma.bike.delete({
          where: { bikeId }
      })
      return
  }

  async list(): Promise<Bike[]> {
      return await prisma.bike.findMany({})
  }
}
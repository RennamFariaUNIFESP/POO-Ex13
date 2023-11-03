import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo";
import { Bike } from "../../../src/bike"
import prisma from "../../../src/external/database/db"

describe('PrismaUserRepo', () => {
  beforeEach(async () => {
      await prisma.user.deleteMany({})
  })

  afterAll(async () => {
      await prisma.user.deleteMany({})
  })

  it('update a bike in the database', async () => {//falta
    const bike = new Bike('caloi mountainbike', 'mountain bike',
      1234, 1234, 100.0, 'Description1', 5, [])
      const bikeUpdated = new Bike('sense sportbike', 'sport bike',
      5678, 5678, 200.0, 'Description2', 7, [])
    const repo = new PrismaBikeRepo()
    const bikeId = await repo.add(bike)
    expect(bikeId).toBeDefined()
    await repo.update(bike.id, bikeUpdated)
    expect(Bike).toEqual(
        bikeUpdated
    )
})

  it('adds a bike in the database', async () => {
      const bikeToBePersisted = new Bike(
          'caloi mountainbike',
          'mountain bike',
          1234,
          1234,
          100.0,
          'Description',
          5,
          [],
      )
      const repo = new PrismaBikeRepo()
      const bikeId = await repo.add(bikeToBePersisted)
      expect(bikeId).toBeDefined()
      const persistedBike = await repo.find(bikeToBePersisted.id)
      expect(persistedBike.name).toEqual(
          bikeToBePersisted.name
      )
  })

  it('removes a bike from the database', async () => {
      const bikeToBePersisted = new Bike(
          'caloi mountainbike',
          'mountain bike',
          1234,
          1234,
          100.0,
          'Description',
          5,
          [],
      )
      const repo = new PrismaBikeRepo()
      await repo.add(bikeToBePersisted)
      await repo.remove(bikeToBePersisted.id)
      const removedBike = await repo.find(bikeToBePersisted.id)
      expect(removedBike).toBeNull()
  })

  it('lists bikes in the database', async () => {
      const bike1 = new Bike('caloi mountainbike', 'mountain bike',
      1234, 1234, 100.0, 'Description1', 5, [])
      const bike2 = new Bike('sense sportbike', 'sport bike',
      5678, 5678, 200.0, 'Description2', 7, [])
      const repo = new PrismaBikeRepo()
      await repo.add(bike1)
      await repo.add(bike2)
      const bikeList = await repo.list()
      expect(bikeList.length).toEqual(2)
  })
})
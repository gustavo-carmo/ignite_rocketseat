import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import CarsRepositoryInMemory from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const carToCreate: ICreateCarDTO = {
      model: 'Model Car',
      brand: 'Brand Car',
      description: 'Description Car Test',
      license_plate: 'A98-XE08',
      daily_rate: 100,
      fine_amount: 50,
      category_id: 'category',
    };

    const car = await createCarUseCase.execute({
      model: carToCreate.model,
      brand: carToCreate.brand,
      description: carToCreate.description,
      license_plate: carToCreate.license_plate,
      daily_rate: carToCreate.daily_rate,
      fine_amount: carToCreate.fine_amount,
      category_id: carToCreate.category_id,
    });

    expect(car).toHaveProperty('id');
    expect(car.model).toBe(carToCreate.model);
    expect(car.brand).toBe(carToCreate.brand);
    expect(car.description).toBe(carToCreate.description);
  });

  it('should be able to create a new car available', async () => {
    const carToCreate: ICreateCarDTO = {
      model: 'Model Car',
      brand: 'Brand Car',
      description: 'Description Car Test',
      license_plate: 'A98-XE08',
      daily_rate: 100,
      fine_amount: 50,
      category_id: 'category',
    };

    const car = await createCarUseCase.execute({
      model: carToCreate.model,
      brand: carToCreate.brand,
      description: carToCreate.description,
      license_plate: carToCreate.license_plate,
      daily_rate: carToCreate.daily_rate,
      fine_amount: carToCreate.fine_amount,
      category_id: carToCreate.category_id,
    });

    expect(car.available).toBe(true);
  });

  it('should not be able to create a car with a license plate that already exists', async () => {
    const carToCreate: ICreateCarDTO = {
      model: 'Model Car 1',
      brand: 'Brand Car',
      description: 'Description Car Test',
      license_plate: 'A98-XE08',
      daily_rate: 100,
      fine_amount: 50,
      category_id: 'category',
    };

    await createCarUseCase.execute({
      model: carToCreate.model,
      brand: carToCreate.brand,
      description: carToCreate.description,
      license_plate: carToCreate.license_plate,
      daily_rate: carToCreate.daily_rate,
      fine_amount: carToCreate.fine_amount,
      category_id: carToCreate.category_id,
    });

    expect(async () => {
      await createCarUseCase.execute({
        model: 'Model Car 2',
        brand: carToCreate.brand,
        description: carToCreate.description,
        license_plate: carToCreate.license_plate,
        daily_rate: carToCreate.daily_rate,
        fine_amount: carToCreate.fine_amount,
        category_id: carToCreate.category_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
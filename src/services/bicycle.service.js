import models from '../database/models/index.js';
import uploadHandler from '../utils/uploadHandler.js';

class BicycleService {
  static _bicycleServiceInstance = null;

  constructor() {}

  static getInstance() {
    if (!BicycleService._bicycleServiceInstance) {
      BicycleService._bicycleServiceInstance = new BicycleService();
    }
    return BicycleService._bicycleServiceInstance;
  }

  async getBicycles({ where = {} }) {
    const bicycles = await models.Bicycle.find(where);
    return bicycles;
  }

  async getBicycle({ where }) {
    const bicycle = await models.Bicycle.findOne(where);
    return bicycle;
  }

  async getBicycleById({ bicycleId }) {
    const bicycle = await models.Bicycle.findById(bicycleId);
    return bicycle;
  }

  async createBicycle({ bicycle, files }) {
    // Capturando envio de imagen
    const image = await uploadHandler({
      file: files.file,
      collection: 'bicycles',
    });
    const data = {
      ...bicycle,
      image,
    };
    const createdBicycle = await models.Bicycle.create(data);
    return createdBicycle;
  }

  async updateBicycle({ bicycleId, bicycle }) {
    const updatedBicycle = await models.Bicycle.findByIdAndUpdate(
      bicycleId,
      bicycle,
      {
        new: true,
      }
    );
    return updatedBicycle;
  }

  async deleteBicycle({ bicycleId }) {
    const deletedBicycle = await models.Bicycle.findByIdAndDelete(bicycleId);
    return deletedBicycle;
  }
}

export default BicycleService;

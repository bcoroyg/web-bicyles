import shortid from 'shortid';
import models from '../database/models/index.js';
import uploadHandler, { deleteFile } from '../utils/uploadHandler.js';

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
      code: shortid.generate(),
    };
    const createdBicycle = await models.Bicycle.create(data);
    return createdBicycle;
  }

  async updateBicycle({ bicycle, files }) {
    const { bicycleId, ...data } = bicycle;
    const bicycleDB = await this.getBicycleById({ bicycleId });
    if (files && bicycleDB.image) {
      deleteFile({ nameFile: bicycleDB.image, collection: 'bicycles' });
      // Capturando envio de imagen
      const image = await uploadHandler({
        file: files.file,
        collection: 'bicycles',
      });
      bicycleDB.image = image;
    }
    bicycleDB.color = data.color;
    bicycleDB.model = data.model;
    bicycleDB.price = data.price;

    const updatedBicycle = await bicycleDB.save();
    return updatedBicycle;
  }

  async deleteBicycle({ bicycleId }) {
    const deletedBicycle = await models.Bicycle.findByIdAndDelete(bicycleId);
    deleteFile({ nameFile: deletedBicycle.image, collection: 'bicycles' });
    return deletedBicycle;
  }
}

export default BicycleService;

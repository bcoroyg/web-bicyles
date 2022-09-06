import moment from 'moment';
import models from '../database/models/index.js';

class ReserveService {
  static _reserveServiceInstance = null;

  constructor() {}

  static getInstance() {
    if (!ReserveService._reserveServiceInstance) {
      ReserveService._reserveServiceInstance = new ReserveService();
    }
    return ReserveService._reserveServiceInstance;
  }

  async getReserves({ where = {} }) {
    const reserves = await models.Reserve.find(where).populate(
      'user bicycle'
    );
    return reserves;
  }

  async getReserveById({ reserveId }) {
    const reserve = await models.Reserve.findById(reserveId);
    return reserve;
  }

  async getReservesClient({ userId }) {
    const reserves = await models.Reserve.find({user: userId}).populate('bicycle');
    return reserves;
  }

  async createReserve({ reserve, userId }) {
    const data = {
      user: userId,
      bicycle: reserve.bicycleId,
      from: moment(reserve.from),
      to: moment(reserve.to),
    };
    const bicycleDB = await models.Bicycle.findById(reserve.bicycleId);
    bicycleDB.reserved = true;
    await bicycleDB.save();
    const createdReserve = await models.Reserve.create(data);
    return createdReserve;
  }

  async updateReserve({ reserveId, reserve }) {
    const updatedReserve = await models.Reserve.findByIdAndUpdate(
      reserveId,
      reserve,
      {
        new: true,
      }
    );
    return updatedReserve;
  }

  async deleteReserve({ reserveId }) {
    const deletedReserve = await models.Reserve.findByIdAndDelete(reserveId);
    return deletedReserve;
  }
}

export default ReserveService;

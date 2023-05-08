const { Op } = require("sequelize");

class WorldcupRepository {
  constructor(WorldcupsModel) {
    this.worldcupsModel = WorldcupsModel;
  }

  create = async (user_id, title, content) => {
    return await this.worldcupsModel.create({ user_id, title, content });
  };

  getAll = async () => {
    return await this.worldcupsModel.findAll({
      order: [["createdAt", "DESC"]],
    });
  };

  getOne = async (worldcup_id) => {
    return await this.worldcupsModel.findOne({
      where: { worldcup_id },
    });
  };

  update = async (title, content, worldcup_id, user_id) => {
    await this.worldcupsModel.update(
      { title, content },
      { where: { [Op.and]: [{ worldcup_id }, { user_id }] } }
    );
  };

  remove = async (worldcup_id, user_id) => {
    await this.worldcupsModel.destroy({
      where: { [Op.and]: [{ worldcup_id }, { user_id }] },
    });
  };

  findAll = async (user_id) => {
    const posts = await this.worldcupsModel.findAll({
      where: { user_id },
    });
    return posts;
  };

  decreaseLikes = async (worldcup_id) => {
    const findLikesData = await this.worldcupsModel.findOne({
      where: { worldcup_id },
    });

    const decreaseLikesData = await findLikesData.decrement("likes", { by: 1 });
    return decreaseLikesData;
  };

  increaseLikes = async (worldcup_id) => {
    const findLikesData = await this.worldcupsModel.findOne({
      where: { worldcup_id },
    });

    const increaseLikesData = await findLikesData.increment("likes", { by: 1 });
    return increaseLikesData;
  };

  increasePlayCount = async (worldcup_id) => {
    await this.worldcupsModel.increment('play_count', {
      by: 1,
      where: { worldcup_id },
    });
  };
}

module.exports = WorldcupRepository;

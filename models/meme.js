module.exports = (sequelize, Datatypes) => {
  class Meme extends sequelize.Model {}
  Meme.init(
    {
      name: {
        type: Datatypes.STRING,
        validate: {
          notNull: true
        }
      },
      url: {
        type: Datatypes.STRING,
        validate: {
          notNull: true
        }
      }
    },
    { sequelize }
  );
  return Meme;
};

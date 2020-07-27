import  { Sequelize, Model, DataTypes }  from 'sequelize'


export default connectionDB =new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
     host: DB_HOST,
     dialect: DB_DRIVER
});


export default (sequelize,DataType)=>{
     const User = sequelize.define("User", {
       email: DataType.STRING,
       phone : DataType.STRING,
       password : DataType.STRING,
       //we need to create the shape of user
     });
     User.sync({ force: true });
     return User
}

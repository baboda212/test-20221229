//SQL ORM모듈 추가
const { Sequelize, DataTypes } = require('sequelize');

//DB생성(옵션설정)
const sequelize = new Sequelize({
    dialect: 'sqlite', //db종류
    storage: 'database.sqlite', //파일명
});
//Model 생성(자료구조(TABLE) 생성)
const userinfos = sequelize.define('userinfo',{
    name: {
        type: DataTypes.STRING, //문자형
        allowNull: false //NOT NULL필수값
    }, 
    age: {
        type: DataTypes.INTEGER, //숫자형
        allowNull: false //NOT NULL필수값
    },
    sex: {
        type: DataTypes.STRING, 
        allowNull: false //NOT NULL필수값
    },
    contact: {
        type: DataTypes.STRING, 
        allowNull: true 
    },    
})


module.exports = { sequelize, userinfos };
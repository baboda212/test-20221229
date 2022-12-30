const express = require('express');
const app = express();
const ejs = require('ejs');
const {sequelize, Posts, userinfos} = require('./database');
const { Database } = require('sqlite3');
const { Op } = require("sequelize");


//DB연결
sequelize.sync().then(function(){
  //DB연결되었는지 확인용
  console.log("데이터 모델 연결됨");
})

//post방식으로 라우팅하기 위해 모듈 추가(미들웨어)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ejs 를  view엔진으로 설정하기
app.set('view engine', 'ejs');
//정적파일 경로 지정(외부css파일 불러오기)
//index.ejs가 html로 변환되어 구동되는 폴더는 public 폴더임
app.use(express.static("public"));

//home 라우팅
app.get('/', async function(req, res){
    const Userinfos = await userinfos.findAll({
      order: [["createdAt", "desc"]]
    });
    //console.log(JSON.stringify(Userinfos, null, 2))// 확인용

    res.render('pages/index.ejs', {Userinfos})
});

//create라우팅(글쓰기요청)
app.post('/create', async function(req, res){
    let name = req.body.name;
    let age = req.body.age;
    let sex = req.body.sex;
    if(sex.value == "man"){
      sex = man;
    } if(sex.value == "woman"){
      sex = woman;
    }
    let contact = req.body.contact;

    //테이블명.create({칼럼이름: 값})
    const newUserinfo = await userinfos.create({
        name: name,
        age: age,
        sex: sex, 
        contact: contact 
    });

    console.log("auto-generated ID:", newUserinfo.id);
    res.redirect('/');
  })
  
//삭제기능 추가
app.post('/delete/:id', async function(req, res){
    console.log(req.params.id);
    await userinfos.destroy({
      where: {
        id: req.params.id
      }
    })
    //res.send(req.params.id) 확인용
    res.redirect('/'); //새로고침
  })

//검색기능 추가
app.get('/search', async function(req, res){
  console.log(req.query.search);
  //findAll은 전체를 찾는다, findone은 하나만 찾는다
  const search = req.query.search;
  const Userinfos = await userinfos.findAll({
    //이름
    where: {
      [Op.or] : [
        { name: { [Op.like] : `%${search}%` } }
      ]
    }
   
  });
    res.render('pages/index.ejs', { 
      Userinfos
    }) 
});
 
// about
app.get('/about', async function(req, res) {
  const posts = await Posts.findAll({
    order: [["createdAt", "desc"]]
  });

  res.render('pages/about.ejs', { posts, a: false });
})

const port = 3001;
app.listen(port,() =>{
    console.log(`sever running at ${port}`);
});
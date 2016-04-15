/* globals ImageService, MailService */
/* globals  Place, Question */
'use strict'; // jshint ignore:line
var Promise = require('bluebird'); // jshint ignore:line
// var _ = require('lodash');

module.exports.bootstrap = function(cb) {
  //UserService.init();
  ImageService.init();
  MailService.init();

  return Promise.resolve()
    // .then(function() {
    //   var placeNativePro = Promise.pending();
    //   Place.native((err, placeColl) => {
    //     placeColl.ensureIndex({
    //       geoJSON: '2dsphere'
    //     }, () => {
    //       if (err) {
    //         placeNativePro.reject();
    //       } else {
    //         placeNativePro.resolve();
    //       }
    //     });
    //   });
    //   return placeNativePro.promise;
    // })
    // .then(function() {
    //   cb();
    // })
    // .catch(function(err) {
    //   sails.log("err :::\n", err);
    //   return Promise.reject(err);
    // });


  //====================================================
  //  Update FIELD only once
  //====================================================
  .then(function() {
      return Promise.all([
  //       Question.update({
  //         type: 'FIELD',
  //         position: 0,
  //         title: '코스난이도(홀배치 적절성)'
  //       }, {
  //         options: [
  //           { label: '매우 도전적', score: 5 },
  //           { label: '재미있음', score: 4 },
  //           { label: '평범함', score: 3 },
  //           { label: '단조로움', score: 2 },
  //           { label: '매우 단조로움', score: 1 }
  //         ]
  //       }),
  //     Question.update({
  //         type: 'FIELD',
  //         position: 0,
  //         title: '코스디자인'
  //       }, {
  //         options: [
  //           { label: '매우 아름다움', score: 5 },
  //           { label: '괜찮은 편', score: 4 },
  //           { label: '평범함', score: 3 },
  //           { label: '단조로움', score: 2 },
  //           { label: '어거지', score: 1 }
  //         ]
  //       }),
  //     Question.update({
  //         type: 'FIELD',
  //         position: 0,
  //         title: '코스 전장/넓이'
  //       }, {
  //         options: [
  //           { label: '매우 편안한 플레이', score: 5 },
  //           { label: '넓고 적당함', score: 4 },
  //           { label: '평범함', score: 3 },
  //           { label: '짧고 좁음 or 짧고 길음', score: 2 },
  //           { label: '정상적 플레이 어려움', score: 1 }
  //         ]
  //       }),
  //     Question.update({
  //         type: 'FIELD',
  //         position: 1,
  //         title: '티오프 간격'
  //       }, {
  //         options: [
  //           { label: '9분 이상', score: 5 },
  //           { label: '8분', score: 4 },
  //           { label: '7분/모름', score: 3 },
  //           { label: '6분', score: 2 },
  //           { label: '6분 미만', score: 1 }
  //         ]
  //       }),
  //     Question.update({
  //         type: 'FIELD',
  //         position: 1,
  //         title: 'Par3 사인 플레이'
  //       }, {
  //         options: [
  //           { label: '없다', score: 5 },
  //           { label: '복불복/기억 안남', score: 3 },
  //           { label: 'Par3 홀마다 있음', score: 1 },
  //         ]
  //       }),
      Question.update({
          type: 'FIELD',
          position: 3,
          title: "드라이빙레인지 유무\r\n(시뮬레이터 포함)"
        }, {
          options: [
            { label: '있음', score: 5 },
            { label: '모름', score: 3 },
            { label: '없음', score: 1 },
          ]
        }),
  //     Question.update({
  //         type: 'FIELD',
  //         position: 4,
  //         title: '예약 편의성'
  //       }, {
  //         options: [
  //           { label: '인터넷/모바일/전화/누구나', score: 5 },
  //           { label: '인터넷/모바일/누구나', score: 3 },
  //           { label: '인터넷/모바일/전화/회원만', score: 1 },
  //         ]
  //       }),
  //     Question.update({
  //         type: 'CLUB',
  //         position: 2,
  //         title: '헤드디자인'
  //       }, {
  //         title: '헤드/헤드커버 디자인'
  //       }),
  //      Question.update({
  //         type: 'CLUB',
  //         position: 2,
  //         title: '헤드커버디자인'
  //       }, {
  //         title: '제품 로고 디자인'
  //       }),
  //      Question.update({
  //         type: 'CLUB',
  //         position: 3,
  //         title: '브랜드 디자인'
  //       }, {
  //         title: '브랜드 이미지'
  //       }),
  //     Question.update({
  //       type: 'CLUB',
  //       position: 3,
  //       title: 'A/S 편의성'
  //     }, {
  //       options: [
  //         { label: '매우 우수', score: 5 },
  //         { label: '우수', score: 4 },
  //         { label: '보통/미이용', score: 3 },
  //         { label: '별로', score: 2 },
  //         { label: '매우 별로', score: 1 },
  //         ]
  //     }),

    ]); // Promise.all ends.
    })
    .then(function(questions) {
      //   // var x = _.map(questions, function(question) {
      //   //   return question[0];
      //   // });
      sails.log("questions[0] :::\n", questions[0]);
      //   // sails.log("x :::\n", x);

      cb();
    })
    .catch(function(err) {
      console.log("err :::\n", err);
      cb();
    });

  //====================================================
  //  Update 비거리 only Once 
  //====================================================
  // .then(function() {
  //   return Question.update({
  //     type: 'CLUB',
  //     position: 0,
  //     title: '비거리',
  //   }, {
  //     type: 'CLUB',
  //     position: 0,
  //     title: '비거리',
  //     options: [
  //       { label: '5%이상 증가', score: 5 },
  //       { label: '0~5% 증가', score: 4 },
  //       { label: '기존과 동일', score: 3 },
  //       { label: '0~5% 감소', score: 2 },
  //       { label: '5% 이상 감소', score: 1 }
  //     ]
  //   });
  // })
  // .then(function(clubDistanceQuestions) {
  //   sails.log("clubDistanceQuestions :::\n", clubDistanceQuestions);
  //   sails.log("clubDistanceQuestions.length :::\n", clubDistanceQuestions.length);
  // })

  //====================================================
  //  !!!!  Create CSV DANGER  !!!! only used at server start up.
  // Note: this requires more than 2.5GB of RAM, AWS has 1GB
  //====================================================

  // var Converter = require("csvtojson").Converter;
  // var converterField = new Converter({});
  // var converterClub = new Converter({});
  // var converterBall = new Converter({});
  // var Promise = require('bluebird');
  // var _ = require('lodash');


  // var pendingField = Promise.pending();
  // converterField.on("end_parsed", function(jsonArray) {
  //   pendingField.resolve(jsonArray);
  // });
  // var pendingClub = Promise.pending();
  // converterClub.on("end_parsed", function(jsonArray) {
  //   pendingClub.resolve(jsonArray);
  // });
  // var pendingBall = Promise.pending();
  // converterBall.on("end_parsed", function(jsonArray) {
  //   pendingBall.resolve(jsonArray);
  // });
  // require("fs").createReadStream(__dirname + "/../assets/csvfiles/field.csv").pipe(converterField);
  // require("fs").createReadStream(__dirname + "/../assets/csvfiles/club.csv").pipe(converterClub);
  // require("fs").createReadStream(__dirname + "/../assets/csvfiles/ball.csv").pipe(converterBall);

  // var globalAdminId;
  // return Promise.all([pendingField.promise, pendingClub.promise, pendingBall.promise])
  //   .then(function(array) {
  //     var fields = array[0];
  //     var clubs = array[1];
  //     var balls = array[2];
  //     var userPromise = User.findOne({
  //       username: 'admin'
  //     });
  //     return [userPromise, fields, clubs, balls];
  //   })
  //   .spread(function(admin, fields, clubs, balls) {
  //     globalAdminId = admin.id;
  //     var fieldsData = _.map(fields, function(field) {
  //       field.owner = admin.id;
  //       field.createdBy = admin.id;
  //       field.updatedBy = admin.id;
  //       return field;
  //     });
  //     var clubsData = _.map(clubs, function(club) {
  //       club.owner = admin.id;
  //       club.createdBy = admin.id;
  //       club.updatedBy = admin.id;
  //       return club;
  //     });
  //     var ballsData = _.map(balls, function(ball) {
  //       ball.owner = admin.id;
  //       ball.createdBy = admin.id;
  //       ball.updatedBy = admin.id;
  //       return ball;
  //     });
  //     var createFieldPromise;
  //     var createClubsPromise;
  //     var createBallsPromise;
  //     createFieldPromise = Product.create(fieldsData);
  //     createClubsPromise = Product.create(clubsData);
  //     createBallsPromise = Product.create(ballsData);
  //     return [createFieldPromise, createClubsPromise, createBallsPromise];
  //   })
  //   .spread(function(createdFields, createdClubs, createdBalls) {
  //     var converterQuestion = new Converter({});
  //     var pendingQuestion = Promise.pending();
  //     converterQuestion.on("end_parsed", function(jsonArray) {
  //       pendingQuestion.resolve(jsonArray);
  //     });
  //     require("fs").createReadStream(__dirname + "/../assets/csvfiles/question.csv")
  //       .pipe(converterQuestion);

  //     return [createdFields, createdClubs, createdBalls, pendingQuestion.promise];
  //   })
  //   .spread((createdFields, createdClubs, createdBalls, questions) => {
  //     let preFieldQuestions = _.where(questions, {
  //       type: 'FIELD'
  //     });
  //     let preClubQuestions = _.where(questions, {
  //       type: 'CLUB'
  //     });
  //     let preBallQuestions = _.where(questions, {
  //       type: 'BALL'
  //     });
  //     var fieldQuestions = properlyFormatQuestions(preFieldQuestions);
  //     var clubQuestions = properlyFormatQuestions(preClubQuestions);
  //     var ballQuestions = properlyFormatQuestions(preBallQuestions);


  //     var ballCompletePromises = _.map(createdBalls, function(ballProduct) {
  //       var ballQuestionnairePromises = _.map([0, 1, 2, 3, 4], function(i) {
  //         return Questionnaire.create({
  //             position: i,
  //             type: 'BALL',
  //             category: 'SURVEY',
  //             product: ballProduct.id,
  //             owner: globalAdminId,
  //             createdBy: globalAdminId,
  //             updatedBy: globalAdminId
  //           })
  //           .then((createdQuestionnaire) => {
  //             var subBallQuestions = _.where(ballQuestions, {
  //               position: i
  //             });
  //             var questionPromise = _.map(subBallQuestions, function(subBallQuestion) {
  //               return Question.create({
  //                 position: i,
  //                 type: 'BALL',
  //                 title: subBallQuestion.title,
  //                 description: subBallQuestion.description || null,
  //                 options: subBallQuestion.options,
  //                 questionnaire: createdQuestionnaire.id,
  //                 owner: globalAdminId,
  //                 createdBy: globalAdminId,
  //                 updatedBy: globalAdminId
  //               });
  //             });
  //             return Promise.all(questionPromise);
  //           });
  //       });
  //       return Promise.all(ballQuestionnairePromises);
  //     });


  //     var clubCompletePromises = _.map(createdClubs, function(clubProduct) {
  //       var clubQuestionnairePromises = _.map([0, 1, 2, 3, 4], function(i) {
  //         return Questionnaire.create({
  //             position: i,
  //             type: 'CLUB',
  //             category: 'SURVEY',
  //             product: clubProduct.id,
  //             owner: globalAdminId,
  //             createdBy: globalAdminId,
  //             updatedBy: globalAdminId
  //           })
  //           .then((createdQuestionnaire) => {
  //             var subClubQuestions = _.where(clubQuestions, {
  //               position: i
  //             });
  //             var questionPromise = _.map(subClubQuestions, function(subClubQuestion) {
  //               return Question.create({
  //                 position: i,
  //                 type: 'CLUB',
  //                 title: subClubQuestion.title,
  //                 description: subClubQuestion.description || null,
  //                 options: subClubQuestion.options,
  //                 questionnaire: createdQuestionnaire.id,
  //                 owner: globalAdminId,
  //                 createdBy: globalAdminId,
  //                 updatedBy: globalAdminId
  //               });
  //             });
  //             return Promise.all(questionPromise);
  //           });
  //       });
  //       return Promise.all(clubQuestionnairePromises);
  //     });


  //     var fieldCompletePromises = _.map(createdFields, function(fieldProduct) {
  //       var fieldQuestionnairePromises = _.map([0, 1, 2, 3, 4], function(i) {
  //         return Questionnaire.create({
  //             position: i,
  //             type: 'FIELD',
  //             category: 'SURVEY',
  //             product: fieldProduct.id,
  //             owner: globalAdminId,
  //             createdBy: globalAdminId,
  //             updatedBy: globalAdminId
  //           })
  //           .then((createdQuestionnaire) => {
  //             var subFieldQuestions = _.where(fieldQuestions, {
  //               position: i
  //             });
  //             var questionPromise = _.map(subFieldQuestions, function(subFieldQuestion) {
  //               return Question.create({
  //                 position: i,
  //                 type: 'FIELD',
  //                 title: subFieldQuestion.title,
  //                 description: subFieldQuestion.description || null,
  //                 options: subFieldQuestion.options,
  //                 questionnaire: createdQuestionnaire.id,
  //                 owner: globalAdminId,
  //                 createdBy: globalAdminId,
  //                 updatedBy: globalAdminId
  //               });
  //             });
  //             return Promise.all(questionPromise);
  //           });
  //       });
  //       return Promise.all(fieldQuestionnairePromises);
  //     });


  //     return [
  //       Promise.all(fieldCompletePromises),
  //       Promise.all(clubCompletePromises),
  //       Promise.all(ballCompletePromises)
  //     ];

  //   })
  //   .spread((fieldQuestionnaires, clubQuestionnaires, ballQuestionnaires) => {
  //     sails.log("-----------  fieldQuestionnaires && fieldQuestionnaires[0]  -------------");
  //     sails.log(fieldQuestionnaires && fieldQuestionnaires[0]);
  //     sails.log("-----------  clubQuestionnaires && clubQuestionnaires[0]  -------------");
  //     sails.log(clubQuestionnaires && clubQuestionnaires[0]);
  //     sails.log("-----------  ballQuestionnaires && ballQuestionnaires[0]  -------------");
  //     sails.log(ballQuestionnaires && ballQuestionnaires[0]);
  //   })
  //   .then(function() {
  //     cb();
  //   })
  //   .catch(function(err) {
  //     sails.log("-----------  err  -------------");
  //     sails.log(err);
  //   });


  // function properlyFormatQuestions(questions) {
  //   var properlyFormattedQuestions = _.map(questions, function(question) {
  //     var temp = {};
  //     temp.type = question.type;
  //     temp.position = question.position;
  //     temp.title = question.title;
  //     temp.options = [];
  //     if (question.description) {
  //       temp.description = question.description;
  //     }
  //     for (let i = 0; i < 5; i++) {
  //       if (question['label' + i]) {
  //         temp.options.push({
  //           label: question['label' + i],
  //           score: question['score' + i]
  //         });
  //       }
  //     }
  //     return temp;
  //   });
  //   return properlyFormattedQuestions;
  // }
};

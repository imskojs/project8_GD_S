// const _ = require('lodash');

// Product.create({
//     type: 'BALL'
//       // Other Product.js properties
//   })
//   .then((createdProduct) => {
//     let questionnairePromises = _.map([0, 1, 2, 3, 4], function(i) {
//       return Questionnaire.create({
//           position: i,
//           type: 'BALL',
//           category: 'SURVEY',
//           product: createdProduct.id
//         })
//         .then((createdQuestionnaire) => {
//           var subProductQuestions = _.where(QuestionService['BALL'], {
//             position: i
//           });

//           var questionPromise = _.map(subProductQuestions, function(subProductQuestion) {
//             return Question.create({
//               position: i,
//               type: 'BALL',
//               title: subProductQuestion.title,
//               description: subProductQuestion.description || null,
//               options: subProductQuestion.options,
//               questionnaire: createdQuestionnaire.id
//             });
//           });
//           return Promise.all(questionPromise);
//         });
//     });
//     return [createdProduct, Promise.all(questionnairePromises)];
//   })

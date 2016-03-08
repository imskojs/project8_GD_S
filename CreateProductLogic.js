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
function loadLiveRe() {
  (function(d, s) {
    var j, e = d.getElementsByTagName(s)[0];

    if (typeof LivereTower === 'function') {
      return; }

    j = d.createElement(s);
    j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
    j.async = true;

    e.parentNode.insertBefore(j, e);
  })(document, 'script')
};
[출처] onclick 한번만 가능하게 하려면 어떻게 해야하나요.ㅠ_ㅠ(하드코딩하는사람들) | 작성자 슈퍼팀

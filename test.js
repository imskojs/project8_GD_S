/* globals QuestionnaireAnswer, Product, _ */
// query = {
//   where:{
//     location1: '경기도'
//   }, 
//   limit: 20
// }
function findWithAverage(req, res) { // jshint ignore:line
  // var queryWrapper = QueryService.buildQuery(req);
  // var query = queryWrapper.query;

  // Find QuestionnaireAnswers with position value of 0.
  // For each QuestionnaireAnswers with position 0 find a product associated with it. 
  // Find QuestionnaireAnswers with product(associated with qna0) and created by id. 
  //Note there can be multiple same QuestionnaireAnswers as products are obtained from 
  //QuestionnaireAnswers with position 0.
  // For each QuestionnaireAnswer(4 per product, sorted by position) get questionAnswers scores
  //get average of all questionAnswers (which will have same positions) per QuestionnaireAnswer
  // Now with average scores of questionAnswers


  // Find Product, populate questionnaireAnswers
}

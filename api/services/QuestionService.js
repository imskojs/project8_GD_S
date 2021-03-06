/* jshint ignore:start */
'use strict';
var Promise = require('bluebird');
/* jshint ignore:end */
var _ = require('lodash');

var questions = [
  {
    "type": "FIELD",
    "position": 0,
    "title": "페어웨이 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "러프 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "그린 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "벙커 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "티잉그라운드 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "골프장 조경",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "그린 빠르기",
    "label0": "매우 빠름",
    "score0": 5,
    "label1": "빠름",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "느림",
    "score3": 2,
    "label4": "매우 느림",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "코스난이도(홀배치 적절성)",
    "label0": "매우 도전적",
    "score0": 5,
    "label1": "재미있음",
    "score1": 4,
    "label2": "적절함",
    "score2": 3,
    "label3": "단조로움",
    "score3": 2,
    "label4": "매우 단조로움",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "코스디자인",
    "label0": "아름다움",
    "score0": 5,
    "label1": "일부 인상적",
    "score1": 4,
    "label2": "평범함",
    "score2": 3,
    "label3": "단조로움",
    "score3": 2,
    "label4": "어거지",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "코스 전장/넓이",
    "label0": "매우 편안한 플레이",
    "score0": 5,
    "label1": "넓고 적당함",
    "score1": 4,
    "label2": "평범함",
    "score2": 3,
    "label3": "짧고 좁음",
    "score3": 2,
    "label4": "옆홀 공 넘어옴",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "클럽 사용 다양성 (샷밸류)",
    "label0": "모든 클럽 사용",
    "score0": 5,
    "label1": "12개 이상",
    "score1": 4,
    "label2": "10개 이상",
    "score2": 3,
    "label3": "8개 이상",
    "score3": 2,
    "label4": "6개 이하",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 0,
    "title": "인조매트 사용여부",
    "label0": "전 홀 미사용",
    "score0": 5,
    "label1": "일부 홀 사용",
    "score1": 3,
    "label2": "전 홀 사용",
    "score2": 1,
    "label3": "",
    "score3": null,
    "label4": "",
    "score4": null
  },
  {
    "type": "FIELD",
    "position": 1,
    "title": "진행속도",
    "label0": "앞뒤팀 안보임",
    "score0": 5,
    "label1": "여유로움",
    "score1": 4,
    "label2": "보통 수준",
    "score2": 3,
    "label3": "가끔 재촉함",
    "score3": 2,
    "label4": "엄청 몰아댐",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 1,
    "title": "티오프 간격",
    "label0": "9분 이상",
    "score0": 5,
    "label1": "8분",
    "score1": 4,
    "label2": "7분",
    "score2": 3,
    "label3": "6분",
    "score3": 2,
    "label4": "6분 미만",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 1,
    "title": "Par3 사인 플레이",
    "label0": "없다",
    "score0": 5,
    "label1": "복불복",
    "score1": 3,
    "label2": "없다",
    "score2": 1,
    "label3": "",
    "score3": null,
    "label4": "",
    "score4": null
  },
  {
    "type": "FIELD",
    "position": 2,
    "title": "코스/거리/라이 능숙도",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 2,
    "title": "진행 리드",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 2,
    "title": "친절도",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 2,
    "title": "비품 준비성",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 2,
    "title": "외국어가능 캐디",
    "label0": "있다",
    "score0": 5,
    "label1": "모름",
    "score1": 3,
    "label2": "없다",
    "score2": 1,
    "label3": "",
    "score3": null,
    "label4": "",
    "score4": null
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "클럽하우스 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "그늘집 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "라커룸 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "목욕탕/화장실 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "카트 관리상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "목욕비품 비치상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "식당 만족도(메뉴/청결)",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통/미이용",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "프로샵 제품구비 상태",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통/미이용",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "ATM기기 설치여부",
    "label0": "2대 이상",
    "score0": 5,
    "label1": "1대/미이용",
    "score1": 3,
    "label2": "없음",
    "score2": 1,
    "label3": "",
    "score3": null,
    "label4": "",
    "score4": null
  },
  {
    "type": "FIELD",
    "position": 3,
    "title": "드라이빙레인지 유무\n(시뮬레이터 포함)",
    "label0": "있음",
    "score0": 5,
    "label1": "없음",
    "score1": 1,
    "label2": "",
    "score2": null,
    "label3": "",
    "score3": null,
    "label4": "",
    "score4": null
  },
  {
    "type": "FIELD",
    "position": 4,
    "title": "가격 대비 만족도",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 4,
    "title": "직원 친절도",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 4,
    "title": "접근성 (거리/교통체증)",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "FIELD",
    "position": 4,
    "title": "예약 편의성",
    "label0": "인터넷/전화/모바일예약",
    "score0": 5,
    "label1": "인터넷/전화예약",
    "score1": 3,
    "label2": "전화예약만",
    "score2": 1,
    "label3": "",
    "score3": null,
    "label4": "",
    "score4": null
  },
  {
    "type": "FIELD",
    "position": 4,
    "title": "재방문 의사",
    "label0": "꼭 다시 와볼것",
    "score0": 5,
    "label1": "괜찮았음",
    "score1": 4,
    "label2": "한번더 평가",
    "score2": 3,
    "label3": "고민될듯",
    "score3": 2,
    "label4": "절대 다시 안옴",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 0,
    "title": "비거리",
    "label0": "10% 이상 증가",
    "score0": 5,
    "label1": "10% 증가",
    "score1": 4,
    "label2": "5% 증가",
    "score2": 3,
    "label3": "변화없음",
    "score3": 2,
    "label4": "이전만 못함",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 0,
    "title": "방향성",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 0,
    "title": "조작성",
    "label0": "매우 쉬움",
    "score0": 5,
    "label1": "쉬움",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "어려움",
    "score3": 2,
    "label4": "매우 어려움",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 0,
    "title": "관용성",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 1,
    "title": "타구감",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 1,
    "title": "타구음",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 1,
    "title": "그립감",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 1,
    "title": "헤드무게감",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 1,
    "title": "어드레스시 안정감",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 2,
    "title": "헤드디자인",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 2,
    "title": "헤드커버디자인",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 3,
    "title": "브랜드 디자인",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 3,
    "title": "A/S 편의성",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "매우 별로",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 4,
    "title": "추천 의사",
    "label0": "강추",
    "score0": 5,
    "label1": "추천",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "별로",
    "score3": 2,
    "label4": "완전 비추",
    "score4": 1
  },
  {
    "type": "CLUB",
    "position": 4,
    "title": "가격대비 만족도",
    "label0": "매우 높음",
    "score0": 5,
    "label1": "높음",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "낮음",
    "score3": 2,
    "label4": "매우 낮음",
    "score4": 1
  },
  {
    "type": "BALL",
    "position": 0,
    "title": "타구감",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "BALL",
    "position": 1,
    "title": "스핀량",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "BALL",
    "position": 2,
    "title": "디자인",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "BALL",
    "position": 3,
    "title": "브랜드이미지",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  },
  {
    "type": "BALL",
    "position": 4,
    "title": "가격대비 만족도",
    "label0": "매우 우수",
    "score0": 5,
    "label1": "우수",
    "score1": 4,
    "label2": "보통",
    "score2": 3,
    "label3": "미흡",
    "score3": 2,
    "label4": "매우 미흡",
    "score4": 1
  }
];
var preFieldQuestions = _.where(questions, {
  type: 'FIELD'
});
var preClubQuestions = _.where(questions, {
  type: 'CLUB'
});
var preBallQuestions = _.where(questions, {
  type: 'BALL'
});
var fieldQuestions = properlyFormatQuestions(preFieldQuestions);
var clubQuestions = properlyFormatQuestions(preClubQuestions);
var ballQuestions = properlyFormatQuestions(preBallQuestions);

//====================================================
//  Private
//====================================================
function properlyFormatQuestions(questions) {
  var properlyFormattedQuestions = _.map(questions, function(question) {
    var temp = {};
    temp.type = question.type;
    temp.position = question.position;
    temp.title = question.title;
    temp.options = [];
    if (question.description) {
      temp.description = question.description;
    }
    for (let i = 0; i < 5; i++) {
      if (question['label' + i]) {
        temp.options.push({
          label: question['label' + i],
          score: question['score' + i]
        });
      }
    }
    return temp;
  });
  return properlyFormattedQuestions;
}

//====================================================
//  QuestionService
//====================================================
module.exports = {
  FIELD: fieldQuestions,
  CLUB: clubQuestions,
  BALL: ballQuestions
};

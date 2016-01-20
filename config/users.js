 /* beautify preserve:start */
module.exports.users = {

  roles: [
    {
      name: 'ADMIN'
    },
    {
      name: 'OWNER'
    },
    {
      name: 'USER'
    }
  ],

  permissions: {
    ADMIN: [
      // Model
      {"name": 'ADMIN 모델 읽기', "model": 'Model', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 모델 만들기', "model": 'Model', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 모델 수정', "model": 'Model', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 모델 지우기', "model": 'Model', "action": 'delete', "relation": 'role'},

      // Role
      {"name": 'ADMIN 역할 읽기', "model": 'Role', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 역할 만들기', "model": 'Role', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 역할 수정', "model": 'Role', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 역할 지우기', "model": 'Role', "action": 'delete', "relation": 'role'},

      // Permission
      {"name": 'ADMIN 권한 읽기', "model": 'Permission', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 권한 만들기', "model": 'Permission', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 권한 수정', "model": 'Permission', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 권한 지우기', "model": 'Permission', "action": 'delete', "relation": 'role'},

      // Criteria
      {"name": 'ADMIN 기준 읽기', "model": 'Criteria', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 기준 만들기', "model": 'Criteria', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 기준 수정', "model": 'Criteria', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 기준 지우기', "model": 'Criteria', "action": 'delete', "relation": 'role'},

      // User
      {"name": 'ADMIN 사용자 읽기', "model": 'User', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 사용자 쓰기', "model": 'User', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 사용자 수정', "model": 'User', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 사용자 지우기', "model": 'User', "action": 'delete', "relation": 'role'},

      // Photo
      {"name": 'ADMIN 사진 읽기', "model": 'Photo', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 사진 쓰기', "model": 'Photo', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 사진 수정', "model": 'Photo', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 사진 지우기', "model": 'Photo', "action": 'delete', "relation": 'role'},

      // Post
      {"name": 'ADMIN 글 읽기', "model": 'Post', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 글 쓰기', "model": 'Post', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 글 수정', "model": 'Post', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 글 지우기', "model": 'Post', "action": 'delete', "relation": 'role'},

      // Comment
      {"name": 'ADMIN 댓글 읽기', "model": 'Comment', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 댓글 쓰기', "model": 'Comment', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 댓글 수정', "model": 'Comment', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 댓글 지우기', "model": 'Comment', "action": 'delete', "relation": 'role'},

      // Like
      {"name": 'ADMIN 좋아요 읽기', "model": 'Like', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 좋아요 만들기', "model": 'Like', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 좋아요 수정', "model": 'Like', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 좋아요 지우기', "model": 'Like', "action": 'delete', "relation": 'role'},

      // Place
      {"name": 'ADMIN 장소 읽기', "model": 'Place', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 장소 만들기', "model": 'Place', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 장소 수정', "model": 'Place', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 장소 지우기', "model": 'Place', "action": 'delete', "relation": 'role'},

      // Product
      {"name": 'ADMIN 상품 읽기', "model": 'Product', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 상품 만들기', "model": 'Product', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 상품 수정', "model": 'Product', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 상품 지우기', "model": 'Product', "action": 'delete', "relation": 'role'},

      // Booking
      {"name": 'ADMIN 예약 읽기', "model": 'Booking', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 예약 만들기', "model": 'Booking', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 예약 수정', "model": 'Booking', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 예약 지우기', "model": 'Booking', "action": 'delete', "relation": 'role'},

      // 큐폰
      {"name": 'ADMIN 큐폰 읽기', "model": 'RoyaltyPoint', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 큐폰 만들기', "model": 'RoyaltyPoint', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 큐폰 수정', "model": 'RoyaltyPoint', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 큐폰 지우기', "model": 'RoyaltyPoint', "action": 'delete', "relation": 'role'},

      // Review
      {"name": 'ADMIN 리뷰 읽기', "model": 'Review', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 리뷰 만들기', "model": 'Review', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 리뷰 수정', "model": 'Review', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 리뷰 지우기', "model": 'Review', "action": 'delete', "relation": 'role'},

      // Device
      {"name": 'ADMIN 기기 읽기', "model": 'Device', "action": 'read', "relation": 'role'},
      {"name": 'ADMIN 기기 만들기', "model": 'Device', "action": 'create', "relation": 'role'},
      {"name": 'ADMIN 기기 수정', "model": 'Device', "action": 'update', "relation": 'role'},
      {"name": 'ADMIN 기기 지우기', "model": 'Device', "action": 'delete', "relation": 'role'},

      {"name": 'Questionnaire Read', "model": 'Questionnaire', "action": 'read', "relation": 'role'},
      {"name": 'Questionnaire Create', "model": 'Questionnaire', "action": 'create', "relation": 'role'},
      {"name": 'Questionnaire Update', "model": 'Questionnaire', "action": 'update', "relation": 'role'},
      {"name": 'Questionnaire Delete', "model": 'Questionnaire', "action": 'delete', "relation": 'role'},

      {"name": 'QuestionnaireAnswer Read', "model": 'QuestionnaireAnswer', "action": 'read', "relation": 'role'},
      {"name": 'QuestionnaireAnswer Create', "model": 'QuestionnaireAnswer', "action": 'create', "relation": 'role'},
      {"name": 'QuestionnaireAnswer Update', "model": 'QuestionnaireAnswer', "action": 'update', "relation": 'role'},
      {"name": 'QuestionnaireAnswer Delete', "model": 'QuestionnaireAnswer', "action": 'delete', "relation": 'role'},

      {"name": 'Note Read', "model": 'Note', "action": 'read', "relation": 'role'},
      {"name": 'Note Create', "model": 'Note', "action": 'create', "relation": 'role'},
      {"name": 'Note Update', "model": 'Note', "action": 'update', "relation": 'role'},
      {"name": 'Note Delete', "model": 'Note', "action": 'delete', "relation": 'role'},

      {"name": 'Question Read', "model": 'Question', "action": 'read', "relation": 'role'},
      {"name": 'Question Create', "model": 'Question', "action": 'create', "relation": 'role'},
      {"name": 'Question Update', "model": 'Question', "action": 'update', "relation": 'role'},
      {"name": 'Question Delete', "model": 'Question', "action": 'delete', "relation": 'role'},

      {"name": 'QuestionAnswer Read', "model": 'QuestionAnswer', "action": 'read', "relation": 'role'},
      {"name": 'QuestionAnswer Create', "model": 'QuestionAnswer', "action": 'create', "relation": 'role'},
      {"name": 'QuestionAnswer Update', "model": 'QuestionAnswer', "action": 'update', "relation": 'role'},
      {"name": 'QuestionAnswer Delete', "model": 'QuestionAnswer', "action": 'delete', "relation": 'role'},

      {"name": 'Poll Read', "model": 'Poll', "action": 'read', "relation": 'role'},
      {"name": 'Poll Create', "model": 'Poll', "action": 'create', "relation": 'role'},
      {"name": 'Poll Update', "model": 'Poll', "action": 'update', "relation": 'role'},
      {"name": 'Poll Delete', "model": 'Poll', "action": 'delete', "relation": 'role'},

      {"name": 'PollAnswer Read', "model": 'PollAnswer', "action": 'read', "relation": 'role'},
      {"name": 'PollAnswer Create', "model": 'PollAnswer', "action": 'create', "relation": 'role'},
      {"name": 'PollAnswer Update', "model": 'PollAnswer', "action": 'update', "relation": 'role'},
      {"name": 'PollAnswer Delete', "model": 'PollAnswer', "action": 'delete', "relation": 'role'},
    ],
    OWNER: [
      // Model
      {"name": 'OWNER 모델 읽기', "model": 'Model', "action": 'read', "relation": 'role'},

      // Role
      {"name": 'OWNER 역할 읽기', "model": 'Role', "action": 'read', "relation": 'role'},

      // Permission
      {"name": 'OWNER 권한 읽기', "model": 'Permission', "action": 'read', "relation": 'role'},

      // Criteria
      {"name": 'OWNER 기준 읽기', "model": 'Criteria', "action": 'read', "relation": 'role'},

      // User
      {"name": 'OWNER 사용자 읽기', "model": 'User', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 사용자 수정', "model": 'User', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 사용자 지우기', "model": 'User', "action": 'delete', "relation": 'owner'},

      // Photo
      {"name": 'OWNER 사진 읽기', "model": 'Photo', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 사진 쓰기', "model": 'Photo', "action": 'create', "relation": 'role'},
      {"name": 'OWNER 사진 수정', "model": 'Photo', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 사진 지우기', "model": 'Photo', "action": 'delete', "relation": 'owner'},

      // Post
      {"name": 'OWNER 글 읽기', "model": 'Post', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 글 쓰기', "model": 'Post', "action": 'create', "relation": 'role'},
      {"name": 'OWNER 글 수정', "model": 'Post', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 글 지우기', "model": 'Post', "action": 'delete', "relation": 'owner'},

      // Comment
      {"name": 'OWNER 댓글 읽기', "model": 'Comment', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 댓글 쓰기', "model": 'Comment', "action": 'create', "relation": 'role'},
      {"name": 'OWNER 댓글 수정', "model": 'Comment', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 댓글 지우기', "model": 'Comment', "action": 'delete', "relation": 'owner'},

      // Like
      {"name": 'OWNER 좋아요 읽기', "model": 'Like', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 좋아요 만들기', "model": 'Like', "action": 'create', "relation": 'role'},
      {"name": 'OWNER 좋아요 수정', "model": 'Like', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 좋아요 지우기', "model": 'Like', "action": 'delete', "relation": 'owner'},

      // Place
      {"name": 'OWNER 장소 읽기', "model": 'Place', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 장소 만들기', "model": 'Place', "action": 'create', "relation": 'role'},
      {"name": 'OWNER 장소 수정', "model": 'Place', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 장소 지우기', "model": 'Place', "action": 'delete', "relation": 'owner'},

      // Product
      {"name": 'OWNER 상품 읽기', "model": 'Product', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 상품 만들기', "model": 'Product', "action": 'create', "relation": 'role'},
      {"name": 'OWNER 상품 수정', "model": 'Product', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 상품 지우기', "model": 'Product', "action": 'delete', "relation": 'owner'},

      // Booking
      {"name": 'OWNER 예약 읽기', "model": 'Booking', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 예약 만들기', "model": 'Booking', "action": 'create', "relation": 'role'},
      {"name": 'OWNER 예약 수정', "model": 'Booking', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 예약 지우기', "model": 'Booking', "action": 'delete', "relation": 'owner'},

      // 큐폰
      {"name": 'OWNER 큐폰 읽기', "model": 'RoyaltyPoint', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 큐폰 만들기', "model": 'RoyaltyPoint', "action": 'create', "relation": 'role'},
      {"name": 'OWNER 큐폰 수정', "model": 'RoyaltyPoint', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 큐폰 지우기', "model": 'RoyaltyPoint', "action": 'delete', "relation": 'owner'},

      // Review
      {"name": 'OWNER 리뷰 읽기', "model": 'Review', "action": 'read', "relation": 'role'},
      {"name": 'OWNER 리뷰 만들기', "model": 'Review', "action": 'create', "relation": 'role'},
      {"name": 'OWNER 리뷰 수정', "model": 'Review', "action": 'update', "relation": 'owner'},
      {"name": 'OWNER 리뷰 지우기', "model": 'Review', "action": 'delete', "relation": 'owner'},

      {"name": 'Questionnaire Read', "model": 'Questionnaire', "action": 'read', "relation": 'role'},
      {"name": 'Questionnaire Create', "model": 'Questionnaire', "action": 'create', "relation": 'role'},
      {"name": 'Questionnaire Update', "model": 'Questionnaire', "action": 'update', "relation": 'role'},
      {"name": 'Questionnaire Delete', "model": 'Questionnaire', "action": 'delete', "relation": 'role'},

      {"name": 'QuestionnaireAnswer Read', "model": 'QuestionnaireAnswer', "action": 'read', "relation": 'role'},
      {"name": 'QuestionnaireAnswer Create', "model": 'QuestionnaireAnswer', "action": 'create', "relation": 'role'},
      {"name": 'QuestionnaireAnswer Update', "model": 'QuestionnaireAnswer', "action": 'update', "relation": 'role'},
      {"name": 'QuestionnaireAnswer Delete', "model": 'QuestionnaireAnswer', "action": 'delete', "relation": 'role'},

      {"name": 'Note Read', "model": 'Note', "action": 'read', "relation": 'role'},
      {"name": 'Note Create', "model": 'Note', "action": 'create', "relation": 'role'},
      {"name": 'Note Update', "model": 'Note', "action": 'update', "relation": 'role'},
      {"name": 'Note Delete', "model": 'Note', "action": 'delete', "relation": 'role'},

      {"name": 'Question Read', "model": 'Question', "action": 'read', "relation": 'role'},
      {"name": 'Question Create', "model": 'Question', "action": 'create', "relation": 'role'},
      {"name": 'Question Update', "model": 'Question', "action": 'update', "relation": 'role'},
      {"name": 'Question Delete', "model": 'Question', "action": 'delete', "relation": 'role'},

      {"name": 'QuestionAnswer Read', "model": 'QuestionAnswer', "action": 'read', "relation": 'role'},
      {"name": 'QuestionAnswer Create', "model": 'QuestionAnswer', "action": 'create', "relation": 'role'},
      {"name": 'QuestionAnswer Update', "model": 'QuestionAnswer', "action": 'update', "relation": 'role'},
      {"name": 'QuestionAnswer Delete', "model": 'QuestionAnswer', "action": 'delete', "relation": 'role'},

      {"name": 'Poll Read', "model": 'Poll', "action": 'read', "relation": 'role'},
      {"name": 'Poll Create', "model": 'Poll', "action": 'create', "relation": 'role'},
      {"name": 'Poll Update', "model": 'Poll', "action": 'update', "relation": 'role'},
      {"name": 'Poll Delete', "model": 'Poll', "action": 'delete', "relation": 'role'},

      {"name": 'PollAnswer Read', "model": 'PollAnswer', "action": 'read', "relation": 'role'},
      {"name": 'PollAnswer Create', "model": 'PollAnswer', "action": 'create', "relation": 'role'},
      {"name": 'PollAnswer Update', "model": 'PollAnswer', "action": 'update', "relation": 'role'},
      {"name": 'PollAnswer Delete', "model": 'PollAnswer', "action": 'delete', "relation": 'role'},
    ],
    USER: [
      // Model
      {"name": 'USER 모델 읽기', "model": 'Model', "action": 'read', "relation": 'role'},

      // Role
      {"name": 'USER 역할 읽기', "model": 'Role', "action": 'read', "relation": 'role'},

      // Permission
      {"name": 'USER 권한 읽기', "model": 'Permission', "action": 'read', "relation": 'role'},

      // Criteria
      {"name": 'USER 기준 읽기', "model": 'Criteria', "action": 'read', "relation": 'role'},


      // Like
      {"name": 'USER 좋아요 읽기', "model": 'Like', "action": 'read', "relation": 'role'},
      {"name": 'USER 좋아요 만들기', "model": 'Like', "action": 'create', "relation": 'role'},
      {"name": 'USER 좋아요 수정', "model": 'Like', "action": 'update', "relation": 'owner'},
      {"name": 'USER 좋아요 지우기', "model": 'Like', "action": 'delete', "relation": 'owner'},

      // Place
      {"name": 'USER 장소 읽기', "model": 'Place', "action": 'read', "relation": 'role'},
      //{"name": 'USER 장소 만들기', "model": 'Place', "action": 'create', "relation": 'role'},
      {"name": 'USER 장소 수정', "model": 'Place', "action": 'update', "relation": 'owner'},
      {"name": 'USER 장소 지우기', "model": 'Place', "action": 'delete', "relation": 'owner'},

      // Product
      {"name": 'USER 상품 읽기', "model": 'Product', "action": 'read', "relation": 'role'},
      //{"name": 'USER 상품 만들기', "model": 'Product', "action": 'create', "relation": 'role'},
      {"name": 'USER 상품 수정', "model": 'Product', "action": 'update', "relation": 'owner'},
      {"name": 'USER 상품 지우기', "model": 'Product', "action": 'delete', "relation": 'owner'},

      // Booking
      {"name": 'USER 예약 읽기', "model": 'Booking', "action": 'read', "relation": 'role'},
      {"name": 'USER 예약 만들기', "model": 'Booking', "action": 'create', "relation": 'role'},
      {"name": 'USER 예약 수정', "model": 'Booking', "action": 'update', "relation": 'owner'},
      {"name": 'USER 예약 지우기', "model": 'Booking', "action": 'delete', "relation": 'owner'},

      // 큐폰
      {"name": 'USER 큐폰 읽기', "model": 'RoyaltyPoint', "action": 'read', "relation": 'role'},
      //TODO: Need to restrict user from entering point
      {"name": 'USER 큐폰 만들기', "model": 'RoyaltyPoint', "action": 'create', "relation": 'role'},
      {"name": 'USER 큐폰 수정', "model": 'RoyaltyPoint', "action": 'update', "relation": 'owner'},
      {"name": 'USER 큐폰 지우기', "model": 'RoyaltyPoint', "action": 'delete', "relation": 'owner'},

      // Review
      {"name": 'USER 리뷰 읽기', "model": 'Review', "action": 'read', "relation": 'role'},
      {"name": 'USER 리뷰 만들기', "model": 'Review', "action": 'create', "relation": 'role'},
      {"name": 'USER 리뷰 수정', "model": 'Review', "action": 'update', "relation": 'owner'},
      {"name": 'USER 리뷰 지우기', "model": 'Review', "action": 'delete', "relation": 'owner'},




      //====================================================
      //  Used in GolfDic
      //====================================================
      // User
      {"name": 'USER 사용자 읽기', "model": 'User', "action": 'read', "relation": 'role'},
      {"name": 'USER 사용자 수정', "model": 'User', "action": 'update', "relation": 'owner'},
      {"name": 'USER 사용자 지우기', "model": 'User', "action": 'delete', "relation": 'owner'},

      // Photo
      {"name": 'USER 사진 읽기', "model": 'Photo', "action": 'read', "relation": 'role'},
      {"name": 'USER 사진 쓰기', "model": 'Photo', "action": 'create', "relation": 'role'},
      {"name": 'USER 사진 수정', "model": 'Photo', "action": 'update', "relation": 'owner'},
      {"name": 'USER 사진 지우기', "model": 'Photo', "action": 'delete', "relation": 'owner'},

      // Post
      {"name": 'USER 글 읽기', "model": 'Post', "action": 'read', "relation": 'role'},
      {"name": 'USER 글 쓰기', "model": 'Post', "action": 'create', "relation": 'role'},
      {"name": 'USER 글 수정', "model": 'Post', "action": 'update', "relation": 'owner'},
      {"name": 'USER 글 지우기', "model": 'Post', "action": 'delete', "relation": 'owner'},

      // Comment
      {"name": 'USER 댓글 읽기', "model": 'Comment', "action": 'read', "relation": 'role'},
      {"name": 'USER 댓글 쓰기', "model": 'Comment', "action": 'create', "relation": 'role'},
      {"name": 'USER 댓글 수정', "model": 'Comment', "action": 'update', "relation": 'owner'},
      {"name": 'USER 댓글 지우기', "model": 'Comment', "action": 'delete', "relation": 'owner'},

      {"name": 'Questionnaire Read', "model": 'Questionnaire', "action": 'read', "relation": 'role'},
      {"name": 'Questionnaire Create', "model": 'Questionnaire', "action": 'create', "relation": 'role'},
      {"name": 'Questionnaire Update', "model": 'Questionnaire', "action": 'update', "relation": 'role'},
      {"name": 'Questionnaire Delete', "model": 'Questionnaire', "action": 'delete', "relation": 'role'},

      {"name": 'QuestionnaireAnswer Read', "model": 'QuestionnaireAnswer', "action": 'read', "relation": 'role'},
      {"name": 'QuestionnaireAnswer Create', "model": 'QuestionnaireAnswer', "action": 'create', "relation": 'role'},
      {"name": 'QuestionnaireAnswer Update', "model": 'QuestionnaireAnswer', "action": 'update', "relation": 'role'},
      {"name": 'QuestionnaireAnswer Delete', "model": 'QuestionnaireAnswer', "action": 'delete', "relation": 'role'},

      {"name": 'Note Read', "model": 'Note', "action": 'read', "relation": 'role'},
      {"name": 'Note Create', "model": 'Note', "action": 'create', "relation": 'role'},
      {"name": 'Note Update', "model": 'Note', "action": 'update', "relation": 'role'},
      {"name": 'Note Delete', "model": 'Note', "action": 'delete', "relation": 'role'},

      {"name": 'Question Read', "model": 'Question', "action": 'read', "relation": 'role'},
      {"name": 'Question Create', "model": 'Question', "action": 'create', "relation": 'role'},
      {"name": 'Question Update', "model": 'Question', "action": 'update', "relation": 'role'},
      {"name": 'Question Delete', "model": 'Question', "action": 'delete', "relation": 'role'},

      {"name": 'QuestionAnswer Read', "model": 'QuestionAnswer', "action": 'read', "relation": 'role'},
      {"name": 'QuestionAnswer Create', "model": 'QuestionAnswer', "action": 'create', "relation": 'role'},
      {"name": 'QuestionAnswer Update', "model": 'QuestionAnswer', "action": 'update', "relation": 'role'},
      {"name": 'QuestionAnswer Delete', "model": 'QuestionAnswer', "action": 'delete', "relation": 'role'},

      {"name": 'Poll Read', "model": 'Poll', "action": 'read', "relation": 'role'},
      {"name": 'Poll Create', "model": 'Poll', "action": 'create', "relation": 'role'},
      {"name": 'Poll Update', "model": 'Poll', "action": 'update', "relation": 'role'},
      {"name": 'Poll Delete', "model": 'Poll', "action": 'delete', "relation": 'role'},

      {"name": 'PollAnswer Read', "model": 'PollAnswer', "action": 'read', "relation": 'role'},
      {"name": 'PollAnswer Create', "model": 'PollAnswer', "action": 'create', "relation": 'role'},
      {"name": 'PollAnswer Update', "model": 'PollAnswer', "action": 'update', "relation": 'role'},
      {"name": 'PollAnswer Delete', "model": 'PollAnswer', "action": 'delete', "relation": 'role'},
    ]
  },

  initialUser: {
    ADMIN: [
      {
        email: 'developer@applicat.co.kr',
        username: 'admin',
        nickname: '관리자',
        password: 'admin1234'
      }
    ],
    OWNER: [
      {
        email: 'owner@applicat.co.kr',
        username: 'owner',
        nickname: '주인',
        password: 'owner1234'
      }
    ],
    USER: [
      {
        email: 'user@applicat.co.kr',
        username: 'user',
        nickname: '사용자',
        password: 'user1234'
      }
    ],
  },

  /*      DANGER      */
  drop: false
};
/* beautify preserve:end */

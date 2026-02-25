-- ==============================================
-- AIdol 프리셋 데이터 시드
-- 생성: generate_seed_sql.py
-- ==============================================

BEGIN;

-- ----------------------------------------------
-- 1. aidols (20개 그룹)
--    anonymous_id = NULL → 시스템 프리셋 그룹
--    status: PUBLISHED / DRAFT
-- ----------------------------------------------
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('e833c2f8-e064-4612-b338-e01d6361f37e', 'CREED', '크리드', '/images/seed/emblems/CREED.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('844995fb-634e-44fb-852b-a8e744a0019c', 'ARDOR', '아더', '/images/seed/emblems/ARDOR.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('f2bc2cb8-4ed3-47b4-aebf-e1a6f5543722', 'KLAV', '클라브', '/images/seed/emblems/KLAV.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('d79ad9c7-d6d0-46e2-94b2-5237c9e9b33f', 'PLUME', '플룸', '/images/seed/emblems/PLUME.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('f088113d-4b7b-4c05-8691-4da6559debe1', 'CIEL', '시엘', '/images/seed/emblems/CIEL.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('6cf05be6-ad3f-4517-842c-62ea31cf3d69', 'DAZE', '데이즈', '/images/seed/emblems/DAZE.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('e03d6bca-d012-43f3-938c-4bbe2fef83b3', 'AXIS', '악시스', '/images/seed/emblems/AXIS.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('d9dcc1b8-068b-4348-99e7-b39200178f66', 'NODE', '노드', '/images/seed/emblems/NODE.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('b2f50816-5082-4a68-82c8-32fc648075fd', 'CLEF', '클레프', '/images/seed/emblems/CLEF.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('79fabdc5-4229-4b36-b02d-cb9f6a2ddb53', 'NEXO', '넥소', '/images/seed/emblems/NEXO.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('4c89b29c-4cd3-41e0-8394-d08f0e53fdf9', 'VERVE', '버브', '/images/seed/emblems/VERVE.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('4b76de57-4116-4dda-91d0-7e03a77ae222', 'AURA', '오라', '/images/seed/emblems/AURA.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('3f035524-14d1-43bf-b13f-533eaebd8c99', 'BIJOU', '비쥬', '/images/seed/emblems/BIJOU.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('db1e5d37-611f-4714-9e26-c1623b833f65', 'TROVE', '트로브', '/images/seed/emblems/TROVE.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('4bf82bf3-3bde-473d-a630-834497b005f1', 'HELIX', '헬릭스', '/images/seed/emblems/HELIX.png', NULL, 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('e7628604-9055-4012-a35d-08000b58ea0c', 'NOVA', '노바', '/images/seed/emblems/NOVA.png', 'test-me-001', 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('309bad4b-e9b8-4020-8f7c-cf939bce6a3e', 'FLORA', '플로라', '/images/seed/emblems/FLORA.png', 'test-me-001', 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', 'TRACE', '트레이스', '/images/seed/emblems/TRACE.png', 'test-me-001', 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('a2223b55-e389-4930-bf3a-f462baf566fa', 'CREST', '크레스트', '/images/seed/emblems/CREST.png', 'test-other-002', 'PUBLISHED', NOW(), NOW());
INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)
  VALUES ('e94911e5-b073-4313-aa73-336296b76732', 'FLEUR', '플뢰르', '/images/seed/emblems/FLEUR.png', 'test-other-003', 'PUBLISHED', NOW(), NOW());

-- ----------------------------------------------
-- 2. companions
-- ----------------------------------------------
-- CREED (크리드) [boy_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('87ad3c14-38c4-4da5-832f-6fe41d187ff7', 'e833c2f8-e064-4612-b338-e01d6361f37e', '도현', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 'e833c2f8-e064-4612-b338-e01d6361f37e', '서진', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('534c4fa3-fada-43b8-b4d6-2f94c3d6ec6c', 'e833c2f8-e064-4612-b338-e01d6361f37e', '건', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('922fda79-6df8-43ef-8a14-ae948afb38fe', 'e833c2f8-e064-4612-b338-e01d6361f37e', '태빈', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('36c8c9e6-b36a-437c-8be4-e66d9b7da703', 'e833c2f8-e064-4612-b338-e01d6361f37e', '은호', 'male', NULL, 'active', NOW(), NOW());

-- ARDOR (아더) [boy_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('603ea8c3-e9a4-498a-8cb5-229563c9f013', '844995fb-634e-44fb-852b-a8e744a0019c', '시우', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('a04d4fec-3404-48e2-bf56-7557f2ca8f4a', '844995fb-634e-44fb-852b-a8e744a0019c', '한결', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', '844995fb-634e-44fb-852b-a8e744a0019c', '영준', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('e51243f6-1d3d-47d1-b97e-8d650200d585', '844995fb-634e-44fb-852b-a8e744a0019c', '정우', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('ed8f27d5-930b-4ab1-a9c4-318517957c35', '844995fb-634e-44fb-852b-a8e744a0019c', '재윤', 'male', NULL, 'active', NOW(), NOW());

-- KLAV (클라브) [boy_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('d6076517-795e-4dbb-a094-20a0efe81cec', 'f2bc2cb8-4ed3-47b4-aebf-e1a6f5543722', '찬', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('8fa3a3e4-5efe-47f2-955b-b63d4fc91608', 'f2bc2cb8-4ed3-47b4-aebf-e1a6f5543722', '지호', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('1f0e417e-76cf-42db-8f03-727a42066fb6', 'f2bc2cb8-4ed3-47b4-aebf-e1a6f5543722', '세빈', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('4913e93f-f23e-4a27-b799-0460d00e8752', 'f2bc2cb8-4ed3-47b4-aebf-e1a6f5543722', '루안', 'male', NULL, 'active', NOW(), NOW());

-- PLUME (플룸) [girl_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('6589e2af-a86b-4011-bac3-42391425d450', 'd79ad9c7-d6d0-46e2-94b2-5237c9e9b33f', '서연', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 'd79ad9c7-d6d0-46e2-94b2-5237c9e9b33f', '하은', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('44a3fbdf-f431-4501-8bd5-22da138a7da2', 'd79ad9c7-d6d0-46e2-94b2-5237c9e9b33f', '시연', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('7980b625-d516-4ea7-9eab-bbb73ed244f4', 'd79ad9c7-d6d0-46e2-94b2-5237c9e9b33f', '채린', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('8bb1ae65-c9ad-4197-9c95-649148776006', 'd79ad9c7-d6d0-46e2-94b2-5237c9e9b33f', '소율', 'female', NULL, 'active', NOW(), NOW());

-- CIEL (시엘) [girl_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('b34b4834-0688-41e4-94ed-671cade2d967', 'f088113d-4b7b-4c05-8691-4da6559debe1', '예서', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('f36c17d1-f73c-4456-b465-d562c07ff2f0', 'f088113d-4b7b-4c05-8691-4da6559debe1', '린', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('fd70a47f-3c63-42e0-beb7-0a67012341a6', 'f088113d-4b7b-4c05-8691-4da6559debe1', '유하', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('47993d4e-0b75-4354-85de-687d870a3aec', 'f088113d-4b7b-4c05-8691-4da6559debe1', '지원', 'female', NULL, 'active', NOW(), NOW());

-- DAZE (데이즈) [girl_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('b88be7b8-1ad5-45e5-82fa-1ce86a59710d', '6cf05be6-ad3f-4517-842c-62ea31cf3d69', '다은', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('d35c2fd7-a0ef-496b-aafc-c62e7ecc8e02', '6cf05be6-ad3f-4517-842c-62ea31cf3d69', '나은', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('94de7314-3a5e-4243-8bfe-d03b51d8b83d', '6cf05be6-ad3f-4517-842c-62ea31cf3d69', '시은', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('4136b624-d75a-4407-a694-c49d7a9f809b', '6cf05be6-ad3f-4517-842c-62ea31cf3d69', '해원', 'female', NULL, 'active', NOW(), NOW());

-- AXIS (악시스) [mixed]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('96eb4e24-36ed-4ae1-a608-b2c275edc601', 'e03d6bca-d012-43f3-938c-4bbe2fef83b3', '준혁', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('b4463cef-0d61-4249-ba10-fae94f4f7dc5', 'e03d6bca-d012-43f3-938c-4bbe2fef83b3', '수아', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 'e03d6bca-d012-43f3-938c-4bbe2fef83b3', '원호', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('21fdbe34-a5de-46ed-abe6-43d0208e753c', 'e03d6bca-d012-43f3-938c-4bbe2fef83b3', '나윤', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('7d2715a3-7a05-47a2-bcc7-b958a5db43d5', 'e03d6bca-d012-43f3-938c-4bbe2fef83b3', '솔', 'female', NULL, 'active', NOW(), NOW());

-- NODE (노드) [mixed]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('4e912080-ff07-4d61-9763-3a791961c16d', 'd9dcc1b8-068b-4348-99e7-b39200178f66', '정빈', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 'd9dcc1b8-068b-4348-99e7-b39200178f66', '예진', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('8e47b5c0-3fa4-4392-8772-4ad18d3ff7c9', 'd9dcc1b8-068b-4348-99e7-b39200178f66', '태우', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('4173b510-4731-43cd-b8fc-9b28c645af32', 'd9dcc1b8-068b-4348-99e7-b39200178f66', '리아', 'female', NULL, 'active', NOW(), NOW());

-- CLEF (클레프) [mixed]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('4a47fed8-14e1-4be1-af90-e3310c142267', 'b2f50816-5082-4a68-82c8-32fc648075fd', '지환', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('0147d8ce-1b17-46aa-80c9-87d840301af2', 'b2f50816-5082-4a68-82c8-32fc648075fd', '하나', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('83d8f514-77b1-4f52-81a6-524e8303563f', 'b2f50816-5082-4a68-82c8-32fc648075fd', '빈', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('0c040f6c-5a4c-4087-86a6-b3d889c567f2', 'b2f50816-5082-4a68-82c8-32fc648075fd', '연서', 'female', NULL, 'active', NOW(), NOW());

-- NEXO (넥소) [boy_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('8ada2751-6fbb-46ae-8389-9c2e1043f098', '79fabdc5-4229-4b36-b02d-cb9f6a2ddb53', '승현', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('38396308-955c-4219-8614-9319e0fdd607', '79fabdc5-4229-4b36-b02d-cb9f6a2ddb53', '하온', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('0add4a99-3f6f-4f8b-a2da-b5b1bfa91f2d', '79fabdc5-4229-4b36-b02d-cb9f6a2ddb53', '민재', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('671af579-0d5a-41d8-8eca-7ba311a460fc', '79fabdc5-4229-4b36-b02d-cb9f6a2ddb53', '동혁', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('45cbe383-3da0-4fb1-9d70-037fb41673e7', '79fabdc5-4229-4b36-b02d-cb9f6a2ddb53', '이든', 'male', NULL, 'active', NOW(), NOW());

-- VERVE (버브) [boy_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('92b01400-37d9-425c-b147-5c45e03f6ce8', '4c89b29c-4cd3-41e0-8394-d08f0e53fdf9', '재혁', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('59a6fd46-6649-4880-bbaa-8f9c862ae528', '4c89b29c-4cd3-41e0-8394-d08f0e53fdf9', '한솔', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('e20beead-ba2e-4424-9295-a4fbc37c4615', '4c89b29c-4cd3-41e0-8394-d08f0e53fdf9', '윤재', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('0296ddda-db58-4e18-a784-fb83e376acd0', '4c89b29c-4cd3-41e0-8394-d08f0e53fdf9', '경민', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('9c501420-db56-40ed-89f8-a3194a601383', '4c89b29c-4cd3-41e0-8394-d08f0e53fdf9', '호진', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('ee23e136-280b-4932-9afc-99e2bebb0732', '4c89b29c-4cd3-41e0-8394-d08f0e53fdf9', '성우', 'male', NULL, 'active', NOW(), NOW());

-- AURA (오라) [girl_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('fd5197ce-5553-4c05-97d6-226788991496', '4b76de57-4116-4dda-91d0-7e03a77ae222', '하린', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('5351aab5-8877-4a95-a344-c7c8eb97b48f', '4b76de57-4116-4dda-91d0-7e03a77ae222', '수현', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('7569d7e6-0932-48ef-b951-6184ec7eda18', '4b76de57-4116-4dda-91d0-7e03a77ae222', '예은', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('e6c72ef5-7170-4d81-95bc-d3bebf0ca0da', '4b76de57-4116-4dda-91d0-7e03a77ae222', '보라', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('b57e0bf5-31fc-4b7f-abc4-a3266fe85588', '4b76de57-4116-4dda-91d0-7e03a77ae222', '민서', 'female', NULL, 'active', NOW(), NOW());

-- BIJOU (비쥬) [girl_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('7242de36-e19f-480b-9865-8bc462051949', '3f035524-14d1-43bf-b13f-533eaebd8c99', '채연', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('ec8a56bc-aa27-44b5-941a-32d38914fc0d', '3f035524-14d1-43bf-b13f-533eaebd8c99', '소현', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('77256614-a56d-419b-907b-5f9e2d3510c6', '3f035524-14d1-43bf-b13f-533eaebd8c99', '지안', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('4703e67a-1876-4f18-8ded-4622e8584839', '3f035524-14d1-43bf-b13f-533eaebd8c99', '다인', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('2912d5aa-b2aa-4c72-97ab-8381f5a447d2', '3f035524-14d1-43bf-b13f-533eaebd8c99', '하영', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('b1e26731-56b1-47b2-a7ad-7e4cf8d14286', '3f035524-14d1-43bf-b13f-533eaebd8c99', '은지', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('45349ad9-80b4-449f-ba3c-79e2d7e60277', '3f035524-14d1-43bf-b13f-533eaebd8c99', '시아', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('01e05542-30ce-4b12-9a00-b59b108b90bf', '3f035524-14d1-43bf-b13f-533eaebd8c99', '서아', 'female', NULL, 'active', NOW(), NOW());

-- TROVE (트로브) [mixed]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('dd62ff63-1937-4452-870e-12889a418c39', 'db1e5d37-611f-4714-9e26-c1623b833f65', '도윤', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('e59aef3e-09c8-4ce3-a24b-f5e365ca69b1', 'db1e5d37-611f-4714-9e26-c1623b833f65', '채은', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('2da55ada-d682-496f-a50f-0336dd0d8c0a', 'db1e5d37-611f-4714-9e26-c1623b833f65', '한', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('4e7975f0-ad0b-4593-b51b-40757c29a9a2', 'db1e5d37-611f-4714-9e26-c1623b833f65', '규민', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('ecdf221a-48e1-4222-add8-ca74a283be90', 'db1e5d37-611f-4714-9e26-c1623b833f65', '나영', 'female', NULL, 'active', NOW(), NOW());

-- HELIX (헬릭스) [mixed]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('c0688248-b96a-47fb-8a80-bd090f5f95e7', '4bf82bf3-3bde-473d-a630-834497b005f1', '성진', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('7bb0ade3-1947-4ef4-b90b-ff8f85d9658a', '4bf82bf3-3bde-473d-a630-834497b005f1', '소연', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('4af69a6e-ec16-480b-90bf-b0eba4a8981f', '4bf82bf3-3bde-473d-a630-834497b005f1', '현', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', '4bf82bf3-3bde-473d-a630-834497b005f1', '유진', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('911bfe1b-641f-4543-836a-9f7f2f501182', '4bf82bf3-3bde-473d-a630-834497b005f1', '재원', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('62574b61-8c36-4c96-840a-52edf48e6fec', '4bf82bf3-3bde-473d-a630-834497b005f1', '다연', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('9c8a8e2c-d91d-47d6-b631-c8e3a403c32e', '4bf82bf3-3bde-473d-a630-834497b005f1', '윤', 'male', NULL, 'active', NOW(), NOW());

-- NOVA (노바) [boy_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('81da7fd2-4731-4329-b248-01c18194a28a', 'e7628604-9055-4012-a35d-08000b58ea0c', '시현', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('ac54b606-dda4-44e3-a7d2-2aa449a4b04e', 'e7628604-9055-4012-a35d-08000b58ea0c', '정민', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('c0df8ba7-70c2-4d1a-8bfc-ac8d292a107f', 'e7628604-9055-4012-a35d-08000b58ea0c', '현우', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 'e7628604-9055-4012-a35d-08000b58ea0c', '태건', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('fefaa05d-e002-490f-8ffc-3de6350873e0', 'e7628604-9055-4012-a35d-08000b58ea0c', '준서', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('aaf909f2-f335-4bd3-aa87-196333a06d50', 'e7628604-9055-4012-a35d-08000b58ea0c', '은찬', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('6ac82333-27dc-4643-ba9b-f058358b825a', 'e7628604-9055-4012-a35d-08000b58ea0c', '승우', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('088948b4-0b5d-428c-9530-f0c472037aab', 'e7628604-9055-4012-a35d-08000b58ea0c', '지훈', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('b1a326f9-1a5f-4c86-a3d5-ba531371efb6', 'e7628604-9055-4012-a35d-08000b58ea0c', '한빈', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('0f716392-3831-4806-a1ca-dbbd88c6c9e8', 'e7628604-9055-4012-a35d-08000b58ea0c', '도운', 'male', NULL, 'active', NOW(), NOW());

-- FLORA (플로라) [girl_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('976c96da-fa3c-4e06-b6d5-f9cacfbd6ba6', '309bad4b-e9b8-4020-8f7c-cf939bce6a3e', '예린', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', '309bad4b-e9b8-4020-8f7c-cf939bce6a3e', '수빈', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('8db8a2dd-b36a-43f4-83d6-3ad2da013efc', '309bad4b-e9b8-4020-8f7c-cf939bce6a3e', '지현', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('a95ac776-bfde-4a74-8db1-b179df1fc9da', '309bad4b-e9b8-4020-8f7c-cf939bce6a3e', '소희', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('820f22eb-8996-484e-a5bd-1d008e123bb7', '309bad4b-e9b8-4020-8f7c-cf939bce6a3e', '다현', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('f7673619-0504-4bdd-afb8-1cf0d018f472', '309bad4b-e9b8-4020-8f7c-cf939bce6a3e', '아영', 'female', NULL, 'active', NOW(), NOW());

-- TRACE (트레이스) [mixed]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('d2c2137b-f493-4876-9e07-f97a8a7b8689', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '호준', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('e5604d61-5512-4078-9ab0-3d57e3fac965', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '윤아', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('21a07886-51d5-4d28-b542-eb8682480ffa', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '종원', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('6c4c2d98-3f94-4fd0-8d92-911db7c8999a', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '선우', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('7151ded6-576b-4225-b8ab-f6102037be6e', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '지수', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('da669bd7-140d-4875-9d0c-ef3802d6db90', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '현서', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('ef1d1039-9195-4ef8-824c-872e3d1f57f2', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '진혁', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('a8dfb466-e040-439d-bd54-fefda0a3848a', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '예주', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('36889030-51b5-4a4b-87e4-86bb833571a9', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '예준', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('99229657-c64d-4593-abf4-46fb7643617f', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '채영', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('088654d7-907d-43c8-852f-45f319506ecb', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '민수', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('80cd4bfd-c1b3-4977-91a2-783f1594123f', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '유빈', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('f694d87f-9651-4ec1-a77a-913dcf2f9755', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '건우', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('541836cc-5408-444d-9938-dea9f5f6e1ff', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '세연', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('34da231c-00fc-4a70-aea5-22452f298292', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '재민', 'male', NULL, 'active', NOW(), NOW());

-- CREST (크레스트) [boy_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('fabd1521-a95d-4b25-9ea9-11a32b52fffc', 'a2223b55-e389-4930-bf3a-f462baf566fa', '선호', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('94e86623-eca9-4ba8-aa48-a3cddac44478', 'a2223b55-e389-4930-bf3a-f462baf566fa', '태윤', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('db3dfc74-1983-4f9c-a918-dc3683521cfd', 'a2223b55-e389-4930-bf3a-f462baf566fa', '준영', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('8e40a83a-8141-4d10-aa18-5250f34e53e0', 'a2223b55-e389-4930-bf3a-f462baf566fa', '유찬', 'male', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('17c36b49-29ec-4d69-b1d4-a1cb793371b3', 'a2223b55-e389-4930-bf3a-f462baf566fa', '성빈', 'male', NULL, 'active', NOW(), NOW());

-- FLEUR (플뢰르) [girl_group]
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('32ac0a51-a272-4665-a89e-81d4daf9dd28', 'e94911e5-b073-4313-aa73-336296b76732', '가영', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('ed7a8fed-1ba2-45bb-b879-6c85c9a91987', 'e94911e5-b073-4313-aa73-336296b76732', '미소', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('57a6eb10-9679-40a0-80e3-88b2a99aa628', 'e94911e5-b073-4313-aa73-336296b76732', '주하', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('fcf2e5ba-71f3-4a14-ae72-6603085ce09d', 'e94911e5-b073-4313-aa73-336296b76732', '율하', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('77cce383-6f7b-4044-b7af-fce52904ae78', 'e94911e5-b073-4313-aa73-336296b76732', '하율', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('9a1b46ed-4a66-499a-9eb0-f09fc5a8502e', 'e94911e5-b073-4313-aa73-336296b76732', '서윤', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('e853c36c-da32-43aa-b758-051f26567e1f', 'e94911e5-b073-4313-aa73-336296b76732', '지영', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('a44b190d-3eb8-4f1b-b24f-cbcbd71c0484', 'e94911e5-b073-4313-aa73-336296b76732', '세은', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('2a0d700c-d059-444e-8eab-af907260226d', 'e94911e5-b073-4313-aa73-336296b76732', '여름', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('638525be-4c1b-468c-8edc-8464c6877e23', 'e94911e5-b073-4313-aa73-336296b76732', '초원', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('349474c7-540c-4030-b45b-98591ca6816c', 'e94911e5-b073-4313-aa73-336296b76732', '하늘', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('e63e12bf-252b-44fc-8299-e91cf784c21e', 'e94911e5-b073-4313-aa73-336296b76732', '별', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('73710e56-1da0-43e8-bda1-e65841c76412', 'e94911e5-b073-4313-aa73-336296b76732', '나라', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('9717dfd8-3d52-4c96-8b13-35e894fe307d', 'e94911e5-b073-4313-aa73-336296b76732', '새벽', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('3ee04abf-027c-40b6-8c4a-7a9e3631f466', 'e94911e5-b073-4313-aa73-336296b76732', '보미', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('f71b255b-641c-4e74-abc0-e0f5c1878d67', 'e94911e5-b073-4313-aa73-336296b76732', '로하', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('5b5f1dd1-a7fa-4814-886e-f53b2e78d660', 'e94911e5-b073-4313-aa73-336296b76732', '한별', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('af52970a-d82d-45a9-aa5f-0ef0a1cb211d', 'e94911e5-b073-4313-aa73-336296b76732', '아린', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('44848f30-4589-4b1c-b2f8-e527f716a9a1', 'e94911e5-b073-4313-aa73-336296b76732', '자윤', 'female', NULL, 'active', NOW(), NOW());
INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)
  VALUES ('34a73008-2c42-4c87-b9d6-131241bb2d7d', 'e94911e5-b073-4313-aa73-336296b76732', '단비', 'female', NULL, 'active', NOW(), NOW());

-- ----------------------------------------------
-- 3. aidol_highlights (40개 하이라이트)
--    is_premium: false=무료, true=프리미엄
-- ----------------------------------------------
-- CREED
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('462c1cac-a775-409c-b785-7e752d8a3c9c', 'e833c2f8-e064-4612-b338-e01d6361f37e', 'MBTI 토론', '/images/seed/thumbnails/CREED_20_MBTI_토론.png', 'MBTI 공개', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', 'e833c2f8-e064-4612-b338-e01d6361f37e', '심야식당', '/images/seed/thumbnails/CREED_18_심야식당.png', '야식: 라면 + 데뷔 이야기', true, NOW(), NOW());

-- ARDOR
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('764c2f79-6003-4f2b-b223-422dca8ad6e3', '844995fb-634e-44fb-852b-a8e744a0019c', '극한직업 아이돌', '/images/seed/thumbnails/ARDOR_15_극한직업_아이돌.png', '소방관 체험', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('9e52903b-c049-403d-9245-4fc159bf1eaf', '844995fb-634e-44fb-852b-a8e744a0019c', '생일 파티', '/images/seed/thumbnails/ARDOR_29_생일_파티.png', '몰래 준비', true, NOW(), NOW());

-- KLAV
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'f2bc2cb8-4ed3-47b4-aebf-e1a6f5543722', '범인은 이 안에', '/images/seed/thumbnails/KLAV_11_범인은_이_안에.png', '역할 배정 후', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('5cd1658f-ee81-4c59-bdd7-d4967e107c0a', 'f2bc2cb8-4ed3-47b4-aebf-e1a6f5543722', '떴다! OOO', '/images/seed/thumbnails/KLAV_05_떴다!_OOO.png', '노량진 수산시장 도착', true, NOW(), NOW());

-- PLUME
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('838e21a9-f2b1-4518-94f6-3798d796c776', 'd79ad9c7-d6d0-46e2-94b2-5237c9e9b33f', '패션 대결', '/images/seed/thumbnails/PLUME_27_패션_대결.png', '미션 공개', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('c78789d5-9c82-42cb-b529-2a9e678e55fb', 'd79ad9c7-d6d0-46e2-94b2-5237c9e9b33f', '덕후 퀴즈', '/images/seed/thumbnails/PLUME_25_덕후_퀴즈.png', '팬 문제 도전', true, NOW(), NOW());

-- CIEL
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('2829c915-9634-4979-9dbb-8c4067a8dde4', 'f088113d-4b7b-4c05-8691-4da6559debe1', '요리 대결', '/images/seed/thumbnails/CIEL_23_요리_대결.png', '미션 공개', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('e36d646c-0927-42c9-aae7-39c11203e8f4', 'f088113d-4b7b-4c05-8691-4da6559debe1', '히든루트', '/images/seed/thumbnails/CIEL_08_히든루트.png', '힌트 해독 중', true, NOW(), NOW());

-- DAZE
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', '6cf05be6-ad3f-4517-842c-62ea31cf3d69', '어디까지 가봤니', '/images/seed/thumbnails/DAZE_07_어디까지_가봤니.png', '교통 룰렛', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('8b157e30-f1ee-4e20-af3c-d151163923cc', '6cf05be6-ad3f-4517-842c-62ea31cf3d69', '랜덤트립', '/images/seed/thumbnails/DAZE_09_랜덤트립.png', '예산 뽑기', true, NOW(), NOW());

-- AXIS
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', 'e03d6bca-d012-43f3-938c-4bbe2fef83b3', '본격 수다타임', '/images/seed/thumbnails/AXIS_06_본격_수다타임.png', '밸런스 게임: 연애 vs 우정', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('05c761fa-d004-4baa-b49e-4c0008632bfa', 'e03d6bca-d012-43f3-938c-4bbe2fef83b3', '복불복', '/images/seed/thumbnails/AXIS_24_복불복.png', '벌칙 룰렛', true, NOW(), NOW());

-- NODE
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('76cc76aa-cd42-42d5-ac13-96a7cc5637e0', 'd9dcc1b8-068b-4348-99e7-b39200178f66', '레벨업 챌린지', '/images/seed/thumbnails/NODE_13_레벨업_챌린지.png', '바리스타 도전 - 초급 테스트', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('c413c996-853f-4eb3-839f-df694592b4c8', 'd9dcc1b8-068b-4348-99e7-b39200178f66', '판 뒤집기', '/images/seed/thumbnails/NODE_01_판_뒤집기.png', '팀 구성 후 첫 미션 시작', true, NOW(), NOW());

-- CLEF
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', 'b2f50816-5082-4a68-82c8-32fc648075fd', '탈출하라 24시', '/images/seed/thumbnails/CLEF_12_탈출하라_24시.png', '첫 번째 퍼즐', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('9946d104-0165-44ee-918f-2bfc1c69e354', 'b2f50816-5082-4a68-82c8-32fc648075fd', '우당탕 하우스', '/images/seed/thumbnails/CLEF_04_우당탕_하우스.png', '상황 카드: 갑자기 정전', true, NOW(), NOW());

-- NEXO
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '79fabdc5-4229-4b36-b02d-cb9f6a2ddb53', '멤버네컷', '/images/seed/thumbnails/NEXO_16_멤버네컷.png', '이든 편 - 키워드 ''과거''', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '79fabdc5-4229-4b36-b02d-cb9f6a2ddb53', '리허설 비하인드', '/images/seed/thumbnails/NEXO_21_리허설_비하인드.png', '콘서트 리허설 D-1', true, NOW(), NOW());

-- VERVE
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('445829aa-e75c-4607-b046-41e9b7327b66', '4c89b29c-4cd3-41e0-8394-d08f0e53fdf9', '미스터리 나잇', '/images/seed/thumbnails/VERVE_10_미스터리_나잇.png', '폐교 진입', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('05af959b-4db9-474e-92d4-37d1c5a3debc', '4c89b29c-4cd3-41e0-8394-d08f0e53fdf9', 'MBTI 토론', '/images/seed/thumbnails/VERVE_20_MBTI_토론.png', 'MBTI 공개', true, NOW(), NOW());

-- AURA
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('7f0c68f8-96fb-4852-a376-266a620fe8b3', '4b76de57-4116-4dda-91d0-7e03a77ae222', '새벽 산책', '/images/seed/thumbnails/AURA_26_새벽_산책.png', '새벽 4시 기상', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('01009865-082f-4504-b221-d7ec7f604757', '4b76de57-4116-4dda-91d0-7e03a77ae222', '극한직업 아이돌', '/images/seed/thumbnails/AURA_15_극한직업_아이돌.png', '소방관 체험', true, NOW(), NOW());

-- BIJOU
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('f61293c0-594d-43c1-a4ac-4a47a9b9654d', '3f035524-14d1-43bf-b13f-533eaebd8c99', '소통의 왕', '/images/seed/thumbnails/BIJOU_30_소통의_왕.png', '몸으로 말해요', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('da9fc893-b49c-41e5-91d1-6cc4a710653a', '3f035524-14d1-43bf-b13f-533eaebd8c99', '범인은 이 안에', '/images/seed/thumbnails/BIJOU_11_범인은_이_안에.png', '역할 배정 후', true, NOW(), NOW());

-- TROVE
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'db1e5d37-611f-4714-9e26-c1623b833f65', '운동회', '/images/seed/thumbnails/TROVE_22_운동회.png', '종목 추첨', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'db1e5d37-611f-4714-9e26-c1623b833f65', '패션 대결', '/images/seed/thumbnails/TROVE_27_패션_대결.png', '미션 공개', true, NOW(), NOW());

-- HELIX
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('ba12732d-0e07-4ba3-9d8d-82c3b4714578', '4bf82bf3-3bde-473d-a630-834497b005f1', '퇴근 후 일상', '/images/seed/thumbnails/HELIX_17_퇴근_후_일상.png', '콘서트 후 숙소', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('014c9834-a8ca-4404-9229-294e8053db1d', '4bf82bf3-3bde-473d-a630-834497b005f1', '요리 대결', '/images/seed/thumbnails/HELIX_23_요리_대결.png', '미션 공개', true, NOW(), NOW());

-- NOVA
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('54d06684-5edc-4d0c-8773-8513b072587c', 'e7628604-9055-4012-a35d-08000b58ea0c', '소원 풍선', '/images/seed/thumbnails/NOVA_28_소원_풍선.png', '풍선 메시지 쓰기', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('952cda0a-d535-4785-9d36-e430e0d41695', 'e7628604-9055-4012-a35d-08000b58ea0c', '어디까지 가봤니', '/images/seed/thumbnails/NOVA_07_어디까지_가봤니.png', '교통 룰렛', true, NOW(), NOW());

-- FLORA
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', '309bad4b-e9b8-4020-8f7c-cf939bce6a3e', '올인원', '/images/seed/thumbnails/FLORA_02_올인원.png', '100인분 비빔밥 미션 공개', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '309bad4b-e9b8-4020-8f7c-cf939bce6a3e', '본격 수다타임', '/images/seed/thumbnails/FLORA_06_본격_수다타임.png', '밸런스 게임: 연애 vs 우정', true, NOW(), NOW());

-- TRACE
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('86d800e9-b466-4f5b-825f-dd5728ed22b1', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '하루만에 마스터', '/images/seed/thumbnails/TRACE_14_하루만에_마스터.png', '저글링 도전 - 시작', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('152bcfb6-b58b-4b32-a74c-f10562daf12c', '154353b0-75ce-4a92-a8bf-ac6ac8b5f2d1', '레벨업 챌린지', '/images/seed/thumbnails/TRACE_13_레벨업_챌린지.png', '바리스타 도전 - 초급 테스트', true, NOW(), NOW());

-- CREST
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('4cef2e29-74b9-406e-8f96-032a055aec18', 'a2223b55-e389-4930-bf3a-f462baf566fa', '즉석 노래방', '/images/seed/thumbnails/CREST_19_즉석_노래방.png', '랜덤 노래 뽑기', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('89295d95-636a-4c89-b9e6-433d6c240067', 'a2223b55-e389-4930-bf3a-f462baf566fa', '탈출하라 24시', '/images/seed/thumbnails/CREST_12_탈출하라_24시.png', '첫 번째 퍼즐', true, NOW(), NOW());

-- FLEUR
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('434bd47b-15e1-434a-a995-efd3fd5ad6b6', 'e94911e5-b073-4313-aa73-336296b76732', '런앤헌트', '/images/seed/thumbnails/FLEUR_03_런앤헌트.png', '헌터 지정 순간', false, NOW(), NOW());
INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)
  VALUES ('6c5aea92-1b61-4592-a283-67336a593296', 'e94911e5-b073-4313-aa73-336296b76732', '멤버네컷', '/images/seed/thumbnails/FLEUR_16_멤버네컷.png', '단비 편 - 키워드 ''과거''', true, NOW(), NOW());

-- ----------------------------------------------
-- 4. highlight_messages
--    companion_id = NULL → 비멤버 발화 (MC, 나레이션 등)
-- ----------------------------------------------
-- CREED > MBTI 토론 (content_id=20)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0701044e-2c5c-455c-bc28-9e22d6952847', '462c1cac-a775-409c-b785-7e752d8a3c9c', '87ad3c14-38c4-4da5-832f-6fe41d187ff7', 1, '자, 다들 MBTI 공개!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('876bb806-c3d6-4ebb-b4d6-dace43f3965f', '462c1cac-a775-409c-b785-7e752d8a3c9c', '8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 2, '나 ISTP.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('62166e96-8fd8-4398-990d-d15f72c13436', '462c1cac-a775-409c-b785-7e752d8a3c9c', '534c4fa3-fada-43b8-b4d6-2f94c3d6ec6c', 3, '저 ENFP요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('96371871-9a65-4450-aa88-9f54f01ce662', '462c1cac-a775-409c-b785-7e752d8a3c9c', '922fda79-6df8-43ef-8a14-ae948afb38fe', 4, '저는 INFJ예요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9abace84-710f-4995-97a4-19cd2d2240eb', '462c1cac-a775-409c-b785-7e752d8a3c9c', '36c8c9e6-b36a-437c-8be4-e66d9b7da703', 5, '저 ESTP요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4bdedf27-99cc-451f-83bd-5da6ecf14cca', '462c1cac-a775-409c-b785-7e752d8a3c9c', '87ad3c14-38c4-4da5-832f-6fe41d187ff7', 6, '나는 ENTJ.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1342432f-988d-4d19-9dc3-ef85907596e5', '462c1cac-a775-409c-b785-7e752d8a3c9c', '534c4fa3-fada-43b8-b4d6-2f94c3d6ec6c', 7, '오, 도현이랑 저는 E끼리네요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ad89b1fb-85ef-4746-a6f5-16c041a07784', '462c1cac-a775-409c-b785-7e752d8a3c9c', '8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 8, 'I끼리 모여.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bfa7c7c0-b98b-42fa-bd86-153c4a2deb0c', '462c1cac-a775-409c-b785-7e752d8a3c9c', '922fda79-6df8-43ef-8a14-ae948afb38fe', 9, 'ㅋㅋㅋ 둘이서 조용히 있자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('92377e5b-43d8-4dfa-aa05-edfac52cf0a8', '462c1cac-a775-409c-b785-7e752d8a3c9c', '87ad3c14-38c4-4da5-832f-6fe41d187ff7', 10, '자, MBTI 밸런스 게임! 약속 당일 갑자기 취소하는 친구, 이해한다 vs 서운하다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('263b45ed-d4bd-43f7-87eb-14794550ee56', '462c1cac-a775-409c-b785-7e752d8a3c9c', '534c4fa3-fada-43b8-b4d6-2f94c3d6ec6c', 11, '당연히 서운하지!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7f7a34a0-c3ad-4536-9361-ae8b140eb00c', '462c1cac-a775-409c-b785-7e752d8a3c9c', '8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 12, '난 이해해. 나도 가끔 그러니까.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('90b85cb8-90b6-4669-8030-4a20adcb566a', '462c1cac-a775-409c-b785-7e752d8a3c9c', '922fda79-6df8-43ef-8a14-ae948afb38fe', 13, '저도 이해해요. 근데 미리 말해줬으면...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b596e175-f22d-4ff0-a506-e4c763e2282a', '462c1cac-a775-409c-b785-7e752d8a3c9c', '36c8c9e6-b36a-437c-8be4-e66d9b7da703', 14, '저는 솔직히 서운해요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('70c96e3a-cd5b-4239-b4fa-e32de8d5e6f5', '462c1cac-a775-409c-b785-7e752d8a3c9c', '534c4fa3-fada-43b8-b4d6-2f94c3d6ec6c', 15, '봐, F가 많잖아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2df0087c-f474-4030-bd5e-f00c4fd49835', '462c1cac-a775-409c-b785-7e752d8a3c9c', '8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 16, 'T라고 감정 없는 거 아니거든?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('10662a5b-8dfc-44b8-b523-3b037350ba0b', '462c1cac-a775-409c-b785-7e752d8a3c9c', '87ad3c14-38c4-4da5-832f-6fe41d187ff7', 17, 'ㅋㅋㅋ T들 억울해하네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a633972c-ed42-4e69-91f2-e2d752ef18f3', '462c1cac-a775-409c-b785-7e752d8a3c9c', '922fda79-6df8-43ef-8a14-ae948afb38fe', 18, '근데 진짜 성격이랑 안 맞는 것도 있지 않아요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a2d5723f-0739-4b0c-b000-837f1a6c5958', '462c1cac-a775-409c-b785-7e752d8a3c9c', '36c8c9e6-b36a-437c-8be4-e66d9b7da703', 19, '맞아요, 저 E인데 가끔 혼자 있고 싶을 때도 있어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('50563b0d-4699-4f94-a59b-b99f10db803c', '462c1cac-a775-409c-b785-7e752d8a3c9c', '534c4fa3-fada-43b8-b4d6-2f94c3d6ec6c', 20, '그건 다 그래.', NOW(), NOW());

-- CREED > 심야식당 (content_id=18)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('95f9c044-3799-4f1a-8aaf-748bfe8c9444', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 1, '(라면 먹으며) 야, 데뷔 때 생각나?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2222f32c-2b7f-48f4-8ed9-3b792c09ccc9', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '87ad3c14-38c4-4da5-832f-6fe41d187ff7', 2, '완전. 떨려서 가사 까먹을 뻔했잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('16fcc468-571e-44e0-907c-7637ce802622', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '534c4fa3-fada-43b8-b4d6-2f94c3d6ec6c', 3, 'ㅋㅋㅋ 저는 안무 틀렸는데 카메라가 안 잡아서 살았어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fe058bf6-0e8b-42f7-a070-dc1d20c5b110', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '922fda79-6df8-43ef-8a14-ae948afb38fe', 4, '진짜?! 몰랐어!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('079fbc7e-8b37-4757-9bfd-bb32a7d98393', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '36c8c9e6-b36a-437c-8be4-e66d9b7da703', 5, '저는 너무 긴장해서 기억이 없어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('69c14b73-9bc5-48d3-ba95-266a2214d6b1', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 6, '그래도 다들 잘했어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0f302db8-aeda-42d4-8d49-4b619bddacc9', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '87ad3c14-38c4-4da5-832f-6fe41d187ff7', 7, '그때는 몰랐는데, 지금 생각하면 진짜 대단한 거더라.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('49a7ac9c-6b1a-4ee4-af2c-246488427dc7', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '922fda79-6df8-43ef-8a14-ae948afb38fe', 8, '맞아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b89f9a39-01e9-4ec3-8625-11adfc9cab94', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '534c4fa3-fada-43b8-b4d6-2f94c3d6ec6c', 9, '우리 여기까지 온 거 뿌듯하다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cf98ba3a-2a1d-4194-954a-9de9f36d50fa', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 10, '자, 오늘 마무리로 옆 사람한테 한마디씩.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bd15cc83-fe19-479c-bada-e6d37572e99b', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '87ad3c14-38c4-4da5-832f-6fe41d187ff7', 11, '서진야, 항상 든든해. 고마워.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3116b154-cbdd-4bf6-8d38-6da87646e302', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 12, '(쑥스러움) ...뭐야 갑자기.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ebeec8ab-4732-4aee-9df0-cbf3c2412a3c', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '534c4fa3-fada-43b8-b4d6-2f94c3d6ec6c', 13, '태빈야, 앞으로도 같이 가자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ae624865-19b3-4ca1-8650-69fb82601865', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '922fda79-6df8-43ef-8a14-ae948afb38fe', 14, 'ㅋㅋ 그래요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a5ce679f-1fab-4eb8-a5f9-42a6572caec7', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '36c8c9e6-b36a-437c-8be4-e66d9b7da703', 15, '저는요... 다들 있어서 행복해요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b03e3f84-079d-4dee-b057-cb13ec7f0d71', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '87ad3c14-38c4-4da5-832f-6fe41d187ff7', 16, '우리 은호...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c1eedf0e-09dc-48e2-99c7-a519332c8b9e', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '922fda79-6df8-43ef-8a14-ae948afb38fe', 17, '왜 또 울려 해...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4fa28362-f07b-4393-903c-97a4ef85810b', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '36c8c9e6-b36a-437c-8be4-e66d9b7da703', 18, '안 울어요! (눈물 참음)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7500c243-b033-4571-b8b8-f13b16b3efb1', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', '8a29ea88-bd43-4206-9ce9-74eb3a6cca66', 19, 'ㅋㅋㅋ 울어도 돼.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('69043b9d-9aab-414d-8b1c-10ca7df6b6ac', 'cb0341cf-9167-49ad-bfe9-34b6c4dc5e6a', NULL, 20, '[전원] (웃음)', NOW(), NOW());

-- ARDOR > 극한직업 아이돌 (content_id=15)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('46f13dac-3d44-42a4-ae25-54771ec4a5c2', '764c2f79-6003-4f2b-b223-422dca8ad6e3', NULL, 1, '[소방관] 오늘 화재 진압 훈련합니다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('80e1688a-0063-49dd-87c1-b3ea9f36a426', '764c2f79-6003-4f2b-b223-422dca8ad6e3', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 2, '(장비 입으며) 이거 진짜 무거워요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3b7749d5-e7be-4012-83d6-02bfda5e6c7f', '764c2f79-6003-4f2b-b223-422dca8ad6e3', '603ea8c3-e9a4-498a-8cb5-229563c9f013', 3, '이걸 입고 뛰어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c751d9ba-3b0d-4a75-af2c-1ce1caec6922', '764c2f79-6003-4f2b-b223-422dca8ad6e3', NULL, 4, '[소방관] 네, 그리고 사다리도 올라가셔야 해요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('63a5a09f-4696-4224-8333-d8b0908a539f', '764c2f79-6003-4f2b-b223-422dca8ad6e3', 'e51243f6-1d3d-47d1-b97e-8d650200d585', 5, '높이가 어느 정도예요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f646ecd5-e2b9-417a-a2d4-cb4f2a0a3d32', '764c2f79-6003-4f2b-b223-422dca8ad6e3', NULL, 6, '[소방관] 15미터요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d3d7084d-b7ed-4455-92e4-87740b456c9e', '764c2f79-6003-4f2b-b223-422dca8ad6e3', '7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', 7, '...저 고소공포증인데요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('193793a6-d4aa-4d74-be62-c666d95afdfe', '764c2f79-6003-4f2b-b223-422dca8ad6e3', 'a04d4fec-3404-48e2-bf56-7557f2ca8f4a', 8, 'ㅋㅋㅋ 오늘 극한이 맞네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7a4dbb3f-69f8-4461-9f35-ba7e4228f368', '764c2f79-6003-4f2b-b223-422dca8ad6e3', 'a04d4fec-3404-48e2-bf56-7557f2ca8f4a', 9, '(올라가며) 생각보다 괜찮은데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c961d0dc-e3f2-4fd5-ac27-74993789bd7e', '764c2f79-6003-4f2b-b223-422dca8ad6e3', '603ea8c3-e9a4-498a-8cb5-229563c9f013', 10, '진짜 멋있다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3e3909ba-890b-4f42-aa01-758f92417dad', '764c2f79-6003-4f2b-b223-422dca8ad6e3', '7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', 11, '(1미터 올라감) ...안 돼, 못 해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6d49ab0e-135f-4b89-8278-a8c332ff0c5c', '764c2f79-6003-4f2b-b223-422dca8ad6e3', 'e51243f6-1d3d-47d1-b97e-8d650200d585', 12, '괜찮아요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4d1f493a-6c48-4a96-9c6c-990e9a7157a1', '764c2f79-6003-4f2b-b223-422dca8ad6e3', '7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', 13, '(내려옴) 미안, 진짜 무서워.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e901bfec-d178-4a2a-8f68-6974610fba86', '764c2f79-6003-4f2b-b223-422dca8ad6e3', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 14, '괜찮아요, 저도 무섭긴 해요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7112450a-6c6b-40e1-b6f8-f36435dd4758', '764c2f79-6003-4f2b-b223-422dca8ad6e3', '603ea8c3-e9a4-498a-8cb5-229563c9f013', 15, '우리가 대신 더 열심히 할게!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('abdc5069-2694-464c-8f56-855da918e089', '764c2f79-6003-4f2b-b223-422dca8ad6e3', '7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', 16, '고마워...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e1de9afd-411b-4a23-adb4-2178fba6da28', '764c2f79-6003-4f2b-b223-422dca8ad6e3', NULL, 17, '[소방관] 다른 훈련도 있으니까 괜찮습니다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('87733bc8-16a9-4b2c-bca3-890ddadfb36a', '764c2f79-6003-4f2b-b223-422dca8ad6e3', '7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', 18, '(안도) 휴...', NOW(), NOW());

-- ARDOR > 생일 파티 (content_id=29)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b75362ab-266b-422a-a374-134680a5a646', '9e52903b-c049-403d-9245-4fc159bf1eaf', '603ea8c3-e9a4-498a-8cb5-229563c9f013', 1, '(속삭임) 다들 준비됐지?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4da1249b-a01d-4109-bf8e-85bb3b9d4f50', '9e52903b-c049-403d-9245-4fc159bf1eaf', '7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', 2, '케이크 숨겨뒀어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bf52fe08-2142-4992-a533-037a2f60ed21', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'e51243f6-1d3d-47d1-b97e-8d650200d585', 3, '풍선 다 불었어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('49b393f5-b371-406f-b057-9bfd677c4b9f', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'a04d4fec-3404-48e2-bf56-7557f2ca8f4a', 4, '재윤 곧 온대, 빨리!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('63423fbc-4ac4-4c52-8c18-730ccd6310c8', '9e52903b-c049-403d-9245-4fc159bf1eaf', '603ea8c3-e9a4-498a-8cb5-229563c9f013', 5, '불 끄자!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b6c01954-b4f1-48dd-9107-1d6f248ef887', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 6, '어? 왜 이렇게 어두워...?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8c1b26bd-5788-4db8-8dff-82b06f51834d', '9e52903b-c049-403d-9245-4fc159bf1eaf', NULL, 7, '[전원] 생일 축하해!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('192645b4-4433-4117-af1a-6f91da5062b5', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 8, '어?! 어?!?! 뭐야!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ac5e14e7-3856-4a28-829b-808cbf55d820', '9e52903b-c049-403d-9245-4fc159bf1eaf', '7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', 9, '(케이크 들고) 짜잔!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7db86129-218e-4c6f-a706-04658bffb836', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 10, '(눈물) 아... 진짜?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c6d2a3e1-c4c4-4fc9-a7bc-8547cac469cc', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'e51243f6-1d3d-47d1-b97e-8d650200d585', 11, '울지 마, 축하하는 거잖아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d987628e-5d91-4f81-b521-f9634e925c96', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'a04d4fec-3404-48e2-bf56-7557f2ca8f4a', 12, '촛불 불어!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6ae7a40d-d6f5-4566-9019-f74933c80111', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 13, '(촛불 끔) 소원 빌었어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('32ea3106-7b28-4b89-a411-dc860db889b5', '9e52903b-c049-403d-9245-4fc159bf1eaf', '603ea8c3-e9a4-498a-8cb5-229563c9f013', 14, '뭐라고 빌었어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cf7bd42d-615c-49da-aa5b-e629a92e6a55', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 15, '비밀이요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('31059934-c754-4265-be07-df5af025c3cf', '9e52903b-c049-403d-9245-4fc159bf1eaf', '7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', 16, '자, 선물! 제가 먼저요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('10d1eea3-d1a7-46bb-b609-f0bcb02ee6f1', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 17, '(열어보며) 이거... 이어폰이에요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1e1a4cfb-4b9e-4d73-b0ea-84db63278c9c', '9e52903b-c049-403d-9245-4fc159bf1eaf', '7a3f62cf-ba50-4a68-a4bc-73f636ee38ca', 18, '전에 갖고 싶다고 했잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9b6de0d8-db0d-41e0-9a63-ebbc2673ea64', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 19, '기억하고 있었어?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1c9b30cd-6232-4287-aab8-4736daa45acd', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'e51243f6-1d3d-47d1-b97e-8d650200d585', 20, '제 선물은 편지예요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('788c14db-fb73-4241-b475-db0408447e09', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 21, '(읽으며) ...아, 안 울려고 했는데.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3751db3b-ef1c-4d95-996f-956c5e42f87f', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'a04d4fec-3404-48e2-bf56-7557f2ca8f4a', 22, '울어도 돼.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('487d5745-9fd2-4e56-9fec-ec4be52dc2b2', '9e52903b-c049-403d-9245-4fc159bf1eaf', '603ea8c3-e9a4-498a-8cb5-229563c9f013', 23, '생일 축하해, 진짜로.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d9038a9d-2cf6-424c-a051-e00068a8523b', '9e52903b-c049-403d-9245-4fc159bf1eaf', 'ed8f27d5-930b-4ab1-a9c4-318517957c35', 24, '고마워... 다들 최고야.', NOW(), NOW());

-- KLAV > 범인은 이 안에 (content_id=11)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2f38b8a3-4f0a-4ccf-84de-f540cd8e7069', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 1, '자, 다들 역할 확인했지? 절대 말하면 안 돼.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4c5e1936-391e-47e6-8139-f974b55abc48', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '8fa3a3e4-5efe-47f2-955b-b63d4fc91608', 2, '(포커페이스)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0f9f68bb-b032-4c21-93ea-846cbb3d41fa', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '1f0e417e-76cf-42db-8f03-727a42066fb6', 3, '(표정 관리 중)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4d55e1f1-e90f-4167-b3a8-a58b321bd77e', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '4913e93f-f23e-4a27-b799-0460d00e8752', 4, '(눈 마주치면 피함)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1988e15e-ec6a-42db-b1c3-bd867d3265ac', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 5, '(너무 긴장)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('67157fa7-3a7f-449f-ad01-db0b448c08d0', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 6, '찬야, 왜 그렇게 긴장해?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f9cd9eee-765c-4157-99de-151cbb1238c8', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 7, '아, 아니에요! 긴장 안 해요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('38cbd099-3439-44f9-b1da-29f82e1eb25f', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '4913e93f-f23e-4a27-b799-0460d00e8752', 8, '수상하다...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b11cf994-a480-47f0-84df-0517eb259365', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 9, '저 아니에요!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bfb96e0f-bdaf-45fd-9f89-f0b14f638943', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '1f0e417e-76cf-42db-8f03-727a42066fb6', 10, '아직 아무 말도 안 했는데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d4b186ed-5a0d-45cb-9e62-5be186dfce31', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '8fa3a3e4-5efe-47f2-955b-b63d4fc91608', 11, '나는 루안가 수상해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f98f02eb-83fc-4537-8a4a-cb055c1351b6', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '4913e93f-f23e-4a27-b799-0460d00e8752', 12, '왜요?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2bc073e5-27bb-4607-a30d-3b0324d8358a', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '8fa3a3e4-5efe-47f2-955b-b63d4fc91608', 13, '아까부터 눈 안 마주치잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4bc1330d-0cbf-4f5e-bf73-f8d17ad2eb32', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '4913e93f-f23e-4a27-b799-0460d00e8752', 14, '그건 지호가 무서워서 그래요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2282e4ac-abdb-4185-b834-4230d0720dd2', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 15, 'ㅋㅋㅋㅋ', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ad3d6421-d5c0-417a-a1e5-c88d09f4e2f5', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '1f0e417e-76cf-42db-8f03-727a42066fb6', 16, '저는 지호가 너무 침착해서 의심돼요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b5cca77c-bbee-4259-a3ca-e3c4e7216081', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '8fa3a3e4-5efe-47f2-955b-b63d4fc91608', 17, '난 원래 침착해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9405c648-347b-4ee6-aa1a-017f95257aa7', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 18, '맞아, 원래 그래요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9dfa131c-4bb7-4d0f-8199-4e10ad036145', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', '4913e93f-f23e-4a27-b799-0460d00e8752', 19, '찬는 왜 지호 편들어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('55aa632c-a823-4456-b5c9-d80f3b148770', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 20, '?! 편드는 거 아닌데?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6b69a810-fb40-49dc-a39e-3425701da71b', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 21, '공범인가?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('493f0969-387d-4f9d-bb35-ea9986a5abf8', 'b44eb19a-15d3-4b98-aab9-b6c0fca4c78d', 'd6076517-795e-4dbb-a094-20a0efe81cec', 22, '아니라고요!!!!', NOW(), NOW());

-- KLAV > 떴다! OOO (content_id=5)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cd5ab96c-c3c4-433b-bbdd-d5ce4aca86f2', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', 'd6076517-795e-4dbb-a094-20a0efe81cec', 1, '우와... 여기 진짜 크다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0fe0c330-fc6b-465c-8cc4-33bfbd973ae0', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', '1f0e417e-76cf-42db-8f03-727a42066fb6', 2, '냄새 장난 아닌데요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e2630f02-53b0-4e47-9dd8-cdc26e8f4fdc', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', '8fa3a3e4-5efe-47f2-955b-b63d4fc91608', 3, '오늘 미션이 뭐래?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('460f989d-6463-4592-97d9-73049fe088b7', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', NULL, 4, '[나레이션] 오늘의 미션! 회 직접 떠서 손님에게 판매하기!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ca60117f-d998-40f8-b22d-baab7c28eff0', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', '4913e93f-f23e-4a27-b799-0460d00e8752', 5, '칼 잡아본 적도 없는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9b44cd0c-9e2f-4103-8055-938d283a1532', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', NULL, 6, '[사장님] 자, 이렇게 잡고 쓱쓱 하면 돼요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f5be0fc5-0755-4fcc-8829-4236ca1cf25e', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', '8fa3a3e4-5efe-47f2-955b-b63d4fc91608', 7, '(도전) 이렇게요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fd7006e3-0159-4a15-b867-5e23ff532ba0', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', NULL, 8, '[사장님] 아... 그건 회가 아니라 다진 생선이에요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('eb334665-6ac3-43ec-b303-5072820db960', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', 'd6076517-795e-4dbb-a094-20a0efe81cec', 9, 'ㅋㅋㅋㅋ 재능 없다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('24943df0-64a7-4da3-a9b9-5d501b811840', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', '8fa3a3e4-5efe-47f2-955b-b63d4fc91608', 10, '야, 너 해봐.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0f29781e-976a-4304-90f5-cbdf098e46c2', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', 'd6076517-795e-4dbb-a094-20a0efe81cec', 11, '(도전) 어... 어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5d69bee5-0b3a-4fe5-aaac-0c2cb07327d5', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', NULL, 12, '[사장님] 그건 뼈예요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e6a588ba-bd1c-49ff-bf9c-4db90ffe8af0', '5cd1658f-ee81-4c59-bdd7-d4967e107c0a', '1f0e417e-76cf-42db-8f03-727a42066fb6', 13, '둘 다 꽝이네.', NOW(), NOW());

-- PLUME > 패션 대결 (content_id=27)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5c9801e3-8f6b-41a6-a875-3d0ac327e28d', '838e21a9-f2b1-4518-94f6-3798d796c776', NULL, 1, '[MC] 오늘의 미션, 5만원으로 전신 코디 완성!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9fe04adc-0702-4f91-8262-a88a5c9893de', '838e21a9-f2b1-4518-94f6-3798d796c776', '6589e2af-a86b-4011-bac3-42391425d450', 2, '5만원이면 충분하지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('32bdef19-3995-476f-ac8d-6072aee68b6e', '838e21a9-f2b1-4518-94f6-3798d796c776', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 3, '어디서?! 빈티지숍이라도?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0826ee04-6d86-4e7c-a6a7-4b8da68b7fe3', '838e21a9-f2b1-4518-94f6-3798d796c776', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 4, '동대문 가자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('34ceae7f-b673-4c3e-bbf7-54de97e44962', '838e21a9-f2b1-4518-94f6-3798d796c776', '7980b625-d516-4ea7-9eab-bbb73ed244f4', 5, '저 패션 자신 없는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2b656bee-9ac0-457e-8fcf-b06528f4348c', '838e21a9-f2b1-4518-94f6-3798d796c776', '8bb1ae65-c9ad-4197-9c95-649148776006', 6, '제가 골라줄게요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d674ebd1-b321-4ac3-b43b-6beba56d44fb', '838e21a9-f2b1-4518-94f6-3798d796c776', '6589e2af-a86b-4011-bac3-42391425d450', 7, '(재킷 들고) 이거 어때?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7eade853-36bc-4986-8cdd-0900475b9a43', '838e21a9-f2b1-4518-94f6-3798d796c776', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 8, '가격 먼저 봐.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a4a4f68c-23f8-48c0-a1f8-ebb8d5f3ef78', '838e21a9-f2b1-4518-94f6-3798d796c776', '6589e2af-a86b-4011-bac3-42391425d450', 9, '...3만9천원?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bd00aad7-2876-4857-bed8-04494c708990', '838e21a9-f2b1-4518-94f6-3798d796c776', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 10, '나머지 만천원으로 하의랑 신발을?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('edd955bb-ffeb-41db-a484-7947075a85b1', '838e21a9-f2b1-4518-94f6-3798d796c776', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 11, '(이미 결제 완료) 나 다 샀다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a5b9ada0-23fa-4b4b-b8d5-bab5d5be1bac', '838e21a9-f2b1-4518-94f6-3798d796c776', '7980b625-d516-4ea7-9eab-bbb73ed244f4', 12, '벌써?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('249165d1-10cd-4211-9922-8950284689c3', '838e21a9-f2b1-4518-94f6-3798d796c776', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 13, '결단력이 중요해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f23dc618-fc84-455c-aa2d-ce1ac5ddee98', '838e21a9-f2b1-4518-94f6-3798d796c776', '8bb1ae65-c9ad-4197-9c95-649148776006', 14, '전 아직 고민 중인데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b5feccc2-0289-4310-a0bb-51245e913e69', '838e21a9-f2b1-4518-94f6-3798d796c776', '7980b625-d516-4ea7-9eab-bbb73ed244f4', 15, '나도... 고르기 어려워.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ee9a74e1-2b91-40ef-8a43-7a6590a414f0', '838e21a9-f2b1-4518-94f6-3798d796c776', '6589e2af-a86b-4011-bac3-42391425d450', 16, '자, 런웨이 시작!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3d24583d-f955-467b-85d9-ee4a107262a5', '838e21a9-f2b1-4518-94f6-3798d796c776', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 17, '(워킹) 어때요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8b39ef68-a759-4627-92d2-e87d027eb229', '838e21a9-f2b1-4518-94f6-3798d796c776', '7980b625-d516-4ea7-9eab-bbb73ed244f4', 18, '오, 의외로 잘 어울린다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9f9999f4-e879-4d5b-bee3-72912a61942d', '838e21a9-f2b1-4518-94f6-3798d796c776', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 19, '(등장) 자, 봐.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('73868683-95ba-4196-b138-8c3256711ed7', '838e21a9-f2b1-4518-94f6-3798d796c776', '8bb1ae65-c9ad-4197-9c95-649148776006', 20, '와, 멋있어요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d90c08df-08ee-4917-981f-513c5bd100ad', '838e21a9-f2b1-4518-94f6-3798d796c776', '6589e2af-a86b-4011-bac3-42391425d450', 21, '실력 차이 보여줬다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2799799a-f236-45ab-8436-91d34d7e4e1d', '838e21a9-f2b1-4518-94f6-3798d796c776', '7980b625-d516-4ea7-9eab-bbb73ed244f4', 22, '근데 제 옷... 좀 이상하지 않아요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('62140872-a6fe-4afc-a0af-eca49823da8d', '838e21a9-f2b1-4518-94f6-3798d796c776', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 23, 'ㅋㅋㅋ 아니... 개성 있어!', NOW(), NOW());

-- PLUME > 덕후 퀴즈 (content_id=25)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3f787aed-00be-4b12-b9c3-216f2e8c6e21', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', NULL, 1, '[MC] 팬분들이 보내주신 퀴즈입니다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7a26a712-2f5c-4131-a565-60ac2ac84eaf', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '6589e2af-a86b-4011-bac3-42391425d450', 2, '오, 팬분들이? 긴장되는데.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7db91e67-98c0-41ba-8773-7d5b90bdb672', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 3, '우리 팬분들 어려운 거 낼 것 같아...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c1b056a6-c562-40c9-84e9-7041290f2ee7', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', NULL, 4, '[MC] 1번 문제. 시연가 데뷔 전 SNS에서 쓰던 닉네임은?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('871fea5e-9c6c-4d95-b115-ae23ae132a5f', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 5, '네?! 그걸 어떻게 알아?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4beea142-9455-4860-8026-9edf67f050c0', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '7980b625-d516-4ea7-9eab-bbb73ed244f4', 6, 'ㅋㅋㅋ 팬분들 대단해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('600caeca-6c5a-49c4-8950-74f32e259110', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '8bb1ae65-c9ad-4197-9c95-649148776006', 7, '혹시... ''별빛''이었어요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c4cd43cf-6c6f-447b-abcd-46ed686e534b', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 8, '아닌데?! 그건 어디서 나온 거야!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ffa1f19c-1ca7-41b6-b221-e47dfa06e274', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '6589e2af-a86b-4011-bac3-42391425d450', 9, '음... ''구름''?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c8f4b318-5cf2-489e-a74b-71063d977d7d', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 10, '그것도 아니야!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('798decfc-e46b-4955-bea0-edbab3059b0c', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 11, '정답이 뭔데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6f5fea9c-93b1-4e55-bc10-11eb80126643', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 12, '...비밀이야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ae7e6c19-aaf5-42f4-be52-f6e6bff783e0', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', NULL, 13, '[MC] 정답은 ''반짝반짝''입니다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3184e1bb-9b03-4d4d-b547-1ee715a70bfd', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '7980b625-d516-4ea7-9eab-bbb73ed244f4', 14, 'ㅋㅋㅋㅋㅋ 귀여워!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('97ff4207-1ada-456e-87aa-ac017531e120', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 15, '아 진짜!!!! 이거 누가 찾은 거야!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9111030b-7812-4af2-9d17-3171b1075d39', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', NULL, 16, '[MC] 하은가 연습생 때 매일 먹던 편의점 음식은?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('56a4a851-5399-4f93-95d8-e17a27724ece', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '6589e2af-a86b-4011-bac3-42391425d450', 17, '삼각김밥!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('18b05fbe-97db-49f0-b2bb-077369680dec', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 18, '아니야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('71a38eca-c7f5-45c6-88fb-4793ea88329e', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '8bb1ae65-c9ad-4197-9c95-649148776006', 19, '컵라면?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d32dc016-9151-4d02-9ff1-f7d52ab0a9a2', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 20, '아니.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2345872d-58c3-4ded-ab5c-91c11ec8a48f', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '7980b625-d516-4ea7-9eab-bbb73ed244f4', 21, '도시락?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5291f106-2ca8-4593-ae95-2e91b1e34f07', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 22, '...바나나 우유.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d4791fc6-054d-48a5-af28-6eaf1db34e3e', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', NULL, 23, '[전원] 바나나 우유?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3f039ae7-e055-4525-a3d7-c0435770cf50', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 24, '매일 두 개씩 마셨어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('552f3618-b5ca-41a4-b461-a12f20f376fb', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '44a3fbdf-f431-4501-8bd5-22da138a7da2', 25, '그래서 아직도 좋아하는 거야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('06793827-86e0-4144-9a87-c2e31be9b94b', 'c78789d5-9c82-42cb-b529-2a9e678e55fb', '27a8f0b0-7a42-4dfb-acde-3cd6a63b67be', 26, '...응.', NOW(), NOW());

-- CIEL > 요리 대결 (content_id=23)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('249fd19e-4ba2-4d9f-8f5e-fa577e64f10d', '2829c915-9634-4979-9dbb-8c4067a8dde4', NULL, 1, '[MC] 오늘의 미션! 제한시간 30분, 주제는 ''집밥''!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f581eaf5-2a40-4963-aa34-ef2e6d17d2f6', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'b34b4834-0688-41e4-94ed-671cade2d967', 2, '집밥이면 뭐 하지?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b27aec3f-ffca-430a-bbc6-47183032a8c6', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'f36c17d1-f73c-4456-b465-d562c07ff2f0', 3, '나 김치찌개 할래.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2f2bc701-bcc5-44dc-9deb-66df7c7dfa16', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'fd70a47f-3c63-42e0-beb7-0a67012341a6', 4, '저는 계란말이요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cff6d326-d409-4f82-b50a-66f326dc56ae', '2829c915-9634-4979-9dbb-8c4067a8dde4', '47993d4e-0b75-4354-85de-687d870a3aec', 5, '저도 김치찌개 하려고 했는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ce6e198f-180e-45c2-809f-d947b4158008', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'f36c17d1-f73c-4456-b465-d562c07ff2f0', 6, '안 돼, 내가 먼저 말했어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3499a086-2c0e-468e-820e-4cdee9f4a918', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'b34b4834-0688-41e4-94ed-671cade2d967', 7, '저는 볶음밥이요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8654ac8d-b29e-48f1-a9ea-bb8fe0f6dbca', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'b34b4834-0688-41e4-94ed-671cade2d967', 8, '그럼 나는 된장찌개.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('72c14d91-f035-4fa7-96e4-97a579b4eb3c', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'fd70a47f-3c63-42e0-beb7-0a67012341a6', 9, '(계란 깨다가) ...껍데기 들어갔다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('902a9457-eaca-45ae-a729-975a48f14599', '2829c915-9634-4979-9dbb-8c4067a8dde4', '47993d4e-0b75-4354-85de-687d870a3aec', 10, 'ㅋㅋㅋ 꺼내요 빨리!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ea3d924a-e71d-47b8-8b33-c8159392c029', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'f36c17d1-f73c-4456-b465-d562c07ff2f0', 11, '(김치 볶으며) 음, 좋은 냄새.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0775f4fa-ba29-4638-ab44-145b39d47a15', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'b34b4834-0688-41e4-94ed-671cade2d967', 12, '(볶음밥 뒤집기 시도) 하!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e3e4a1ac-f1ff-40ce-9d71-2d882fe9f7c5', '2829c915-9634-4979-9dbb-8c4067a8dde4', NULL, 13, '[연출] (볶음밥이 반만 뒤집어짐)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('330cb40c-9cff-4c51-8e8c-1b722828c171', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'b34b4834-0688-41e4-94ed-671cade2d967', 14, '아까워!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c36b9975-05d9-48eb-9081-cb2aafa280ae', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'b34b4834-0688-41e4-94ed-671cade2d967', 15, '반이라도 성공이죠?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('51673f27-6598-4f36-99f7-5d26cfffe516', '2829c915-9634-4979-9dbb-8c4067a8dde4', '47993d4e-0b75-4354-85de-687d870a3aec', 16, '긍정적이다...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3d86f6de-ca9f-41b4-a790-0bf6782dd391', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'b34b4834-0688-41e4-94ed-671cade2d967', 17, '자, 다 완성!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('39f3eb8a-945e-4f58-8943-65df5fe6d114', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'fd70a47f-3c63-42e0-beb7-0a67012341a6', 18, '제 계란말이 좀 탔는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('75d9a9ee-cc62-408d-8061-84a612ab40cc', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'f36c17d1-f73c-4456-b465-d562c07ff2f0', 19, '맛으로 승부 보자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('eae7c7e1-961e-4015-9e8b-2e7e3c1d8c74', '2829c915-9634-4979-9dbb-8c4067a8dde4', '47993d4e-0b75-4354-85de-687d870a3aec', 20, '(맛보며) 어, 의외로 다 맛있다?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c81824cc-faa2-4acc-8b84-eb23a2333f61', '2829c915-9634-4979-9dbb-8c4067a8dde4', 'b34b4834-0688-41e4-94ed-671cade2d967', 21, '배고팠나 봐.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f183c50c-8247-4273-a6b9-c09c2733d957', '2829c915-9634-4979-9dbb-8c4067a8dde4', NULL, 22, '[전원] ㅋㅋㅋㅋ', NOW(), NOW());

-- CIEL > 히든루트 (content_id=8)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fae7d1a8-a216-4a16-a1be-88a0400b081e', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'b34b4834-0688-41e4-94ed-671cade2d967', 1, '첫 번째 힌트. "골목 끝, 빨간 문, 50년 전통".', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0c6a3e7e-ddc8-4bee-9fa6-5306eb62d7a6', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'fd70a47f-3c63-42e0-beb7-0a67012341a6', 2, '빨간 문? 여기 빨간 문 많은데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('554182b5-f3de-4f15-9429-2672b13cfd19', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'f36c17d1-f73c-4456-b465-d562c07ff2f0', 3, '50년 전통이면 꽤 오래된 곳이네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('37199a0d-b836-488a-8881-e08eb33a5d89', 'e36d646c-0927-42c9-aae7-39c11203e8f4', '47993d4e-0b75-4354-85de-687d870a3aec', 4, '저기요! (지나가는 주민에게) 혹시 50년 된 맛집 아세요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7ecc1a0a-f315-45af-957c-92805bfed88f', 'e36d646c-0927-42c9-aae7-39c11203e8f4', NULL, 5, '[주민] 아, 순대국집?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ad4b6973-6db6-40ea-afa6-2abe09451e34', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'b34b4834-0688-41e4-94ed-671cade2d967', 6, '순대국!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3db0d200-35bc-4ac3-be44-4ce76aec820d', 'e36d646c-0927-42c9-aae7-39c11203e8f4', '47993d4e-0b75-4354-85de-687d870a3aec', 7, '어디예요?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4e2dc930-b0ca-42d8-9f10-2ceb7cb6bb8a', 'e36d646c-0927-42c9-aae7-39c11203e8f4', NULL, 8, '[주민] 저 골목 끝에 빨간 문.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4b6b52e7-192a-42b6-9df5-59ec6c033ecc', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'b34b4834-0688-41e4-94ed-671cade2d967', 9, '와!!! 찾았다!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('db8198c1-3f4d-4c30-9215-c81a745184ec', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'fd70a47f-3c63-42e0-beb7-0a67012341a6', 10, '(순대국 앞에서) 우와... 진짜 맛있겠다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3e71f2fa-44a4-4d0e-a9e0-6eb1d7c1d0b1', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'f36c17d1-f73c-4456-b465-d562c07ff2f0', 11, '(한 입) !!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3b021224-b273-4fbd-a06a-2b070e8e6a55', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'b34b4834-0688-41e4-94ed-671cade2d967', 12, '맛있어요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('afec11e0-b227-4a2a-a634-ee60f7780c01', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'f36c17d1-f73c-4456-b465-d562c07ff2f0', 13, '(말 못 하고 끄덕끄덕)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bf4ac622-75dc-4fe2-a745-7b0bcd904d43', 'e36d646c-0927-42c9-aae7-39c11203e8f4', '47993d4e-0b75-4354-85de-687d870a3aec', 14, 'ㅋㅋㅋ 표정 봐.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0514792c-a590-4ded-a69f-5cd90e85c0cc', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'b34b4834-0688-41e4-94ed-671cade2d967', 15, '(먹으며) 이거 별점 몇 개야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ce65db80-4afb-46b9-af17-4a988306781d', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'fd70a47f-3c63-42e0-beb7-0a67012341a6', 16, '저는 5점 만점에 5점이요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1b76bf8e-1672-4d68-9026-0e42ae47aaae', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'b34b4834-0688-41e4-94ed-671cade2d967', 17, '저도요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6ca16dfb-a087-4a39-94be-ed45853e6680', 'e36d646c-0927-42c9-aae7-39c11203e8f4', 'f36c17d1-f73c-4456-b465-d562c07ff2f0', 18, '(아직도 먹는 중)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7532b3a2-5ec8-43c2-a631-e7588522516e', 'e36d646c-0927-42c9-aae7-39c11203e8f4', '47993d4e-0b75-4354-85de-687d870a3aec', 19, '밥만 먹어, 평가는 우리가 할게.', NOW(), NOW());

-- DAZE > 어디까지 가봤니 (content_id=7)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d0ae7aa1-42e3-4668-9783-4bd0284bdc55', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 1, '자, 부산까지 가는 교통수단 뽑자!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8b411ea8-e5b0-49e7-bf8f-347bcba4e3c4', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'd35c2fd7-a0ef-496b-aafc-c62e7ecc8e02', 2, '제발 KTX...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('da89b8a2-afcc-4035-b613-a3f0a7f7f271', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', '94de7314-3a5e-4243-8bfe-d03b51d8b83d', 3, '(돌림판 돌림) 빙글빙글...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('abe5b82e-6425-413f-9baf-a71a647ac383', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 4, '버스! 버스!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('65ac8fac-c2b0-44d6-8a5e-92cf60a84100', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', '4136b624-d75a-4407-a694-c49d7a9f809b', 5, '나는 비행기!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8cfc23a5-1314-411e-9212-f3edca69ffaa', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', NULL, 6, '[(결과] 자전거)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('eb13bf5d-3960-4a8f-8bf5-ab0fe11c07fd', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', NULL, 7, '[전원] ............', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3fde1ffa-3778-4136-a685-389ab04acfc7', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 8, '자전거?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('690bdd2b-2ced-4025-afcd-bb33ddd04bd6', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', '94de7314-3a5e-4243-8bfe-d03b51d8b83d', 9, '서울에서 부산을?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4460cc26-1987-45b6-a91b-13be26ba7a92', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'd35c2fd7-a0ef-496b-aafc-c62e7ecc8e02', 10, '이거 며칠 걸려?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('36085fec-6894-4aa6-9207-621bc11df99b', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', '4136b624-d75a-4407-a694-c49d7a9f809b', 11, '죽는다 우리...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('20dc5a45-c56a-490f-90ee-fa7359227ba0', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 12, '아 잠깐, 다시 뽑으면 안 돼요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('00c7ca58-80d5-4e5b-9b6c-56b8a2cef4f6', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 13, '안 된대.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('76c6b450-b5e4-45b1-9881-2344df01e67c', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 14, '...ㅠㅠ', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6189f387-e0f0-4e8b-a6f2-62f5a37cd56f', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', '94de7314-3a5e-4243-8bfe-d03b51d8b83d', 15, '미션 성공! 교통수단 업그레이드래!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('be40ecfe-b88b-4765-a517-72bc2c3ebeea', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'd35c2fd7-a0ef-496b-aafc-c62e7ecc8e02', 16, '뭐로?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1e7567ef-3544-44ff-8476-f249a91c507e', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', NULL, 17, '[MC] 오토바이로 업그레이드!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('dab5b9f9-f8bd-43da-892e-ee97ebc22d07', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', '4136b624-d75a-4407-a694-c49d7a9f809b', 18, '...그게 업그레이드야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('edbc3cac-d25f-4182-bcbd-61b27b6b07b2', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 19, '자전거보단 낫지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('dc2f9870-a466-49a1-b12b-85b1748f06c6', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 20, '타본 적도 없는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f9cbf519-bade-4500-986e-5611448754d3', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', '94de7314-3a5e-4243-8bfe-d03b51d8b83d', 21, '야, 뒤에 타면 되잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7c9be7d1-55d4-444c-8767-9a5fb581a6b0', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 22, '(안도) 아, 그렇구나.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f5044e4c-df9e-4e24-8b3e-af00ecb10ced', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', 'd35c2fd7-a0ef-496b-aafc-c62e7ecc8e02', 23, '근데 오토바이 두 대야. 두 명은 여전히 자전거.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a87325ab-4b68-4f69-afb9-d784d8489c59', '0f9e2a2a-dd72-48ac-ab2f-ad05da3e52c2', '4136b624-d75a-4407-a694-c49d7a9f809b', 24, '누가 자전거야?!', NOW(), NOW());

-- DAZE > 랜덤트립 (content_id=9)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ea746de0-5c0b-4e39-896f-442f83af4733', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 1, '자, 1박 2일 예산 뽑자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e7bdc324-b246-4b74-80a7-e15c67e566a6', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'd35c2fd7-a0ef-496b-aafc-c62e7ecc8e02', 2, '제발 넉넉하게...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3187515f-4cde-4a53-826a-ed8a4f8054d1', '8b157e30-f1ee-4e20-af3c-d151163923cc', '94de7314-3a5e-4243-8bfe-d03b51d8b83d', 3, '(뽑음) ...5만원.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('107f9cb2-50ab-4de1-b80d-28fe2117a99a', '8b157e30-f1ee-4e20-af3c-d151163923cc', '4136b624-d75a-4407-a694-c49d7a9f809b', 4, '5만원?! 1인당?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f472c3bd-0f9a-40da-8303-624d5f612d69', '8b157e30-f1ee-4e20-af3c-d151163923cc', '94de7314-3a5e-4243-8bfe-d03b51d8b83d', 5, '아니, 전체.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a1baa433-8f52-4a7a-a7ad-1e2fbd5fdced', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 6, '넷이서 5만원이요?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('aed19a76-841b-4179-ad40-18ab3fa48235', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 7, '1인당 만원...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7f4e6400-6881-4e8b-b411-863b69f4e4bb', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'd35c2fd7-a0ef-496b-aafc-c62e7ecc8e02', 8, '이건 노숙이다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c86838cf-c16c-4e83-ba34-b5b9ed8aac35', '8b157e30-f1ee-4e20-af3c-d151163923cc', '4136b624-d75a-4407-a694-c49d7a9f809b', 9, '찬스 카드! 찬스 카드 있잖아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8f633c56-0752-4d56-8ae9-e9c91d66ef6d', '8b157e30-f1ee-4e20-af3c-d151163923cc', '94de7314-3a5e-4243-8bfe-d03b51d8b83d', 10, '(찬스 카드 뽑음) "예산 2배"!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7063c9ca-6b48-4a11-936e-e1da964608af', '8b157e30-f1ee-4e20-af3c-d151163923cc', NULL, 11, '[전원] 우와!!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8332b8a4-6505-4dda-8c98-87f33687e500', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 12, '10만원이다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8bff7301-e585-4bf4-8b63-14489ca19814', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 13, '...그래도 적은 건 마찬가지인데.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('57d75702-835c-41d2-8bbf-be55f0b308f4', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'd35c2fd7-a0ef-496b-aafc-c62e7ecc8e02', 14, '일정표 뭐야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('de27f45b-34ff-4aca-8bb1-7f3512bdca1c', '8b157e30-f1ee-4e20-af3c-d151163923cc', '4136b624-d75a-4407-a694-c49d7a9f809b', 15, '(읽음) 오전 6시 기상, 등산...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('40d7894a-5fb3-459f-9e13-1c0d991f396c', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 16, '등산이요?! 저 운동화 안 가져왔는데!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bc110efd-1144-454f-b0a2-8f080d371b19', '8b157e30-f1ee-4e20-af3c-d151163923cc', '94de7314-3a5e-4243-8bfe-d03b51d8b83d', 17, '아, 여기 "위기 카드" 발동이래.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7f97dca1-e774-4184-bb56-077021800672', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 18, '뭔데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('196fd533-48c5-47ab-a3f9-a1c469c23fed', '8b157e30-f1ee-4e20-af3c-d151163923cc', '94de7314-3a5e-4243-8bfe-d03b51d8b83d', 19, '"다은가 모든 짐 들기".', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ebc47d5d-f1b9-4b8b-9777-ab2e0e5e19aa', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 20, '...네?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7901bae2-580b-4eb0-ac26-07c3876db2f3', '8b157e30-f1ee-4e20-af3c-d151163923cc', '4136b624-d75a-4407-a694-c49d7a9f809b', 21, 'ㅋㅋㅋㅋ 미안 다은야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('25817f0f-06e3-4a34-a385-78299a2eda6e', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'b88be7b8-1ad5-45e5-82fa-1ce86a59710d', 22, '이건 너무해!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d3c0d85d-fbfe-4799-9a01-0fc7a90eccef', '8b157e30-f1ee-4e20-af3c-d151163923cc', 'd35c2fd7-a0ef-496b-aafc-c62e7ecc8e02', 23, '(가방 넘기며) 화이팅.', NOW(), NOW());

-- AXIS > 본격 수다타임 (content_id=6)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3a52a15f-4073-462d-b267-362e5a694614', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '96eb4e24-36ed-4ae1-a608-b2c275edc601', 1, '자, 오늘의 주제. 10년 친구가 내 전 연인과 사귀겠대. 용서한다 vs 절교한다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d520dd07-2964-4ac3-a430-9f3b04b073e6', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', 'b4463cef-0d61-4249-ba10-fae94f4f7dc5', 2, '당연히 절교지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('293e2875-24df-4c04-bffa-a0e7e3e2d216', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', 'ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 3, '어? 저는 용서인데요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('67ab94d2-21bd-4cee-8c55-20c58726c5a6', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 4, '진심이에요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('498582f8-3467-4da3-9ce9-c766d3ac86d5', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', 'ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 5, '이미 헤어진 사이잖아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('db0b91f6-65b7-46a8-821b-1967b8b54d31', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '7d2715a3-7a05-47a2-bcc7-b958a5db43d5', 6, '근데 10년 친구면... 음...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('452353a1-beb4-4d24-97f4-0e73eefaf374', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '96eb4e24-36ed-4ae1-a608-b2c275edc601', 7, '솔는 뭐야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b8fea73a-657d-41df-91ce-d713babe50bc', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '7d2715a3-7a05-47a2-bcc7-b958a5db43d5', 8, '저도 절교요. 친구가 먼저 말했어야죠.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1cbdb817-44a7-4eca-9d70-bbacd84161e9', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', 'b4463cef-0d61-4249-ba10-fae94f4f7dc5', 9, '맞아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4d93ed3f-a86f-4805-9a3e-2d5296e382de', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', 'ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 10, '아니, 헤어진 사람한테 허락을 왜 받아?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e86efea1-4701-44ac-b8f5-9a130c4df529', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 11, '그건 예의지!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8774ed12-b36d-497a-b9db-e101ff0eaa5f', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', 'ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 12, '어휴, 답답해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6cdfe69c-85dc-4725-b4a6-30818bb6f5bf', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '96eb4e24-36ed-4ae1-a608-b2c275edc601', 13, 'ㅋㅋㅋ 우리 팀 싸움 났다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('317faa1c-f6c1-46be-ab0a-29a1027a9f19', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '96eb4e24-36ed-4ae1-a608-b2c275edc601', 14, '자, 오늘 고백 타임 주자는... 나윤!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('afda7436-c851-49b6-a24e-c7cc1f123c37', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 15, '아... 저요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9277a985-64a5-4e0a-9db8-6b6169f76d81', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', 'b4463cef-0d61-4249-ba10-fae94f4f7dc5', 16, '숨긴 거 있어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4025754a-d522-4ae1-ba6a-d898b47fc106', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 17, '사실... 저 솔 옷 몰래 입은 적 있어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3d5fc881-b2d6-44b3-ba59-f058c17e5865', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '7d2715a3-7a05-47a2-bcc7-b958a5db43d5', 18, '?!?!?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8181ef5f-df63-4ea5-9020-16b1a42c8022', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', 'ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 19, '뭐?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f873c9e6-bb6a-4c01-9e39-5201651fb3d5', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 20, '그... 그 후드티 너무 예뻐서...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('995f0d5e-8e11-46d2-8aa6-0478476e5b61', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '7d2715a3-7a05-47a2-bcc7-b958a5db43d5', 21, '그래서 늘어났구나?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1a59d505-c2d1-405e-bb8e-092bb5e40636', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 22, '미안...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('236647a1-62d0-4758-a0c1-c5d606f51550', 'e548a9d9-2429-4b0f-aa3c-c0fc99a2a1e3', '96eb4e24-36ed-4ae1-a608-b2c275edc601', 23, 'ㅋㅋㅋㅋ 대참사.', NOW(), NOW());

-- AXIS > 복불복 (content_id=24)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2c0b3433-cc2b-4550-bc5a-a81a10ddcd8a', '05c761fa-d004-4baa-b49e-4c0008632bfa', '96eb4e24-36ed-4ae1-a608-b2c275edc601', 1, '자, 복불복 시작!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4b524e89-7146-4302-8e5f-c28f7f1e4c71', '05c761fa-d004-4baa-b49e-4c0008632bfa', 'b4463cef-0d61-4249-ba10-fae94f4f7dc5', 2, '난 운 좋은 편이야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a26ecf21-c7cb-4b98-8381-b9e4cd1cdb70', '05c761fa-d004-4baa-b49e-4c0008632bfa', 'ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 3, '저는 운이 없어요... 항상 걸려요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('41674daf-25b6-4589-929a-165502eefce7', '05c761fa-d004-4baa-b49e-4c0008632bfa', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 4, 'ㅋㅋ 그건 좀 맞지?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7652d91b-75b4-4346-87d1-4f45b8ce0630', '05c761fa-d004-4baa-b49e-4c0008632bfa', '7d2715a3-7a05-47a2-bcc7-b958a5db43d5', 5, '다 같이 돌리자!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('697dc0f6-f9df-4fbd-9bc5-f802e5834033', '05c761fa-d004-4baa-b49e-4c0008632bfa', NULL, 6, '[MC] 첫 번째, 와사비 초밥 룰렛!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fc3f84f6-f2aa-4732-a324-c6f0f0b5b6c5', '05c761fa-d004-4baa-b49e-4c0008632bfa', 'ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 7, '5개 중 2개가 와사비래요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('783834c5-0af0-4bd1-8734-f85ec40b51eb', '05c761fa-d004-4baa-b49e-4c0008632bfa', '96eb4e24-36ed-4ae1-a608-b2c275edc601', 8, '동시에 먹자. 하나, 둘, 셋!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('df8459de-c711-48c8-a541-87a1a58c2304', '05c761fa-d004-4baa-b49e-4c0008632bfa', NULL, 9, '[연출] (전원 초밥 먹음)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('30c506a2-0061-4e12-89ed-dc482f124a05', '05c761fa-d004-4baa-b49e-4c0008632bfa', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 10, '...!!!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ae314ca0-5e62-4857-be73-7ce2159df5eb', '05c761fa-d004-4baa-b49e-4c0008632bfa', 'b4463cef-0d61-4249-ba10-fae94f4f7dc5', 11, '(태연) 난 아닌데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('01841fde-b0aa-45a2-8726-904df9f7fd1b', '05c761fa-d004-4baa-b49e-4c0008632bfa', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 12, '(눈물) 매워... 매워요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cca4f792-2c6c-47c7-b286-5974c0c87a8c', '05c761fa-d004-4baa-b49e-4c0008632bfa', '7d2715a3-7a05-47a2-bcc7-b958a5db43d5', 13, '저도!!!!! 으으으!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b2d1655c-3e66-4d8f-ba05-6e7da9bbf4e7', '05c761fa-d004-4baa-b49e-4c0008632bfa', 'ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 14, '와, 나는 괜찮다! 기적이야!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('59ee58e1-1b32-4a22-9465-f76bb26df523', '05c761fa-d004-4baa-b49e-4c0008632bfa', '96eb4e24-36ed-4ae1-a608-b2c275edc601', 15, '나도 괜찮아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('33d28854-0d91-43ff-be3f-daec51b1c2f7', '05c761fa-d004-4baa-b49e-4c0008632bfa', NULL, 16, '[MC] 나윤, 솔 벌칙! 10초 안에 깨 세기!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('84bd85c0-40a1-4daa-a935-2d906827c8f2', '05c761fa-d004-4baa-b49e-4c0008632bfa', '21fdbe34-a5de-46ed-abe6-43d0208e753c', 17, '깨를 어떻게 세요?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d240dd93-9702-4252-8eb7-6511008e98e5', '05c761fa-d004-4baa-b49e-4c0008632bfa', '7d2715a3-7a05-47a2-bcc7-b958a5db43d5', 18, '(울면서 깨 세기 시작) 하나... 둘...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('75680d16-5783-4a00-9427-d5931e8b8e54', '05c761fa-d004-4baa-b49e-4c0008632bfa', '96eb4e24-36ed-4ae1-a608-b2c275edc601', 19, 'ㅋㅋㅋㅋㅋ', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7e3bbdef-32a2-46c5-a9e6-795774d3971c', '05c761fa-d004-4baa-b49e-4c0008632bfa', 'ac0cb1ec-29d3-4545-92ea-0d23be9868f6', 20, '응원한다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c536873e-5db1-45a6-8d6a-5d027ea9d54f', '05c761fa-d004-4baa-b49e-4c0008632bfa', 'b4463cef-0d61-4249-ba10-fae94f4f7dc5', 21, '파이팅!', NOW(), NOW());

-- NODE > 레벨업 챌린지 (content_id=13)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bb2f1fc0-431d-4cf1-b90d-94df5baad744', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', NULL, 1, '[강사] 먼저 에스프레소 추출해 보세요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f1682cb9-9ce7-4d57-972c-70dcdf3616ba', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4e912080-ff07-4d61-9763-3a791961c16d', 2, '(도전) 이렇게요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2c6746cc-ca11-431d-9f6e-a095cc40cc8d', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', NULL, 3, '[강사] 네, 좋아요. 합격!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ba538518-7931-4aea-af98-dbe2da0aa779', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4e912080-ff07-4d61-9763-3a791961c16d', 4, '오!!! 초급 뱃지!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ead7cca4-d913-4325-b907-634d035d0b89', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 5, '나도! (시도)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a4532d77-85a8-4ccf-bb21-9d73e681668a', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', NULL, 6, '[연출] (물이 사방으로 튐)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4729d19c-19fc-4953-8275-1a44d2c77d06', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '8e47b5c0-3fa4-4392-8772-4ad18d3ff7c9', 7, 'ㅋㅋㅋㅋㅋ!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('73baf5a3-3459-4ec8-8d26-24da3c7a86a8', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 8, '왜 이래?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1e1da44f-7e3d-4172-aff0-709f70c14889', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', NULL, 9, '[강사] 탬핑을 너무 세게 하셨어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7b19f4af-7d41-475d-a596-d0728262ecdd', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4173b510-4731-43cd-b8fc-9b28c645af32', 10, '탬핑이 뭐예요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5f738f90-ba91-4e82-a406-efbf0f00302d', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4e912080-ff07-4d61-9763-3a791961c16d', 11, '저도 몰라요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('12b48212-adcf-4812-bfe7-56e1211423dc', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', NULL, 12, '[강사] 다시 설명해 드릴게요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9d387c1b-53d5-4c6d-b003-493a45ce2332', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 13, '(좌절) 난 커피 마시기만 할래...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1306bc5e-3764-42d7-bfb9-3638250f2d73', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '8e47b5c0-3fa4-4392-8772-4ad18d3ff7c9', 14, '와, 라떼 아트 어렵다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1aed1d65-f7b2-487b-a362-ed60cd4a7bfc', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4e912080-ff07-4d61-9763-3a791961c16d', 15, '하트 아니고 콩나물 같아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b0104212-31d6-4499-8010-87c010e8377e', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '8e47b5c0-3fa4-4392-8772-4ad18d3ff7c9', 16, '야!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1868d9db-5379-48fc-b24b-7cea2f6b50cd', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4173b510-4731-43cd-b8fc-9b28c645af32', 17, '저는 해봤어요! (보여줌)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3b6fb320-47c7-4fa4-b8de-e6845ceeef9b', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4e912080-ff07-4d61-9763-3a791961c16d', 18, '...이게 뭐예요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f8fb6ce3-99f8-4f02-be0d-4b32d047d0fe', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4173b510-4731-43cd-b8fc-9b28c645af32', 19, '나뭇잎이야!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5e044ea3-9d51-4bbc-8388-eed4d4c69412', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 20, '어디가...?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f236e5d5-6b7f-4af2-9377-f996efa5e159', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', NULL, 21, '[강사] (웃으며) 열정이 좋으시네요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7252b532-21fa-490e-a5d8-5b592a458fe1', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4173b510-4731-43cd-b8fc-9b28c645af32', 22, '...칭찬이죠?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1e8d25f0-be98-4eb3-8f65-dc5f2684b62a', '76cc76aa-cd42-42d5-ac13-96a7cc5637e0', '4e912080-ff07-4d61-9763-3a791961c16d', 23, '아닌 것 같은데.', NOW(), NOW());

-- NODE > 판 뒤집기 (content_id=1)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('05de9c09-0830-4841-9cc3-baf44c17e863', 'c413c996-853f-4eb3-839f-df694592b4c8', '4e912080-ff07-4d61-9763-3a791961c16d', 1, '자, 오늘 팀 구성 어떻게 됐어요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f5c98d13-2d5f-4e3d-9eef-e5d4d6c16fb2', 'c413c996-853f-4eb3-839f-df694592b4c8', '27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 2, '저랑 리아, 정빈 한 팀이에요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b5ef9ade-a855-46b3-8d29-a5a1b746e5d4', 'c413c996-853f-4eb3-839f-df694592b4c8', '8e47b5c0-3fa4-4392-8772-4ad18d3ff7c9', 3, '뭐야, 우리 둘이서 셋을 이겨야 해?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e5af82e4-8a0f-4246-a98d-37a8cae7c5bc', 'c413c996-853f-4eb3-839f-df694592b4c8', '4e912080-ff07-4d61-9763-3a791961c16d', 4, '아니 걱정 마, 나 있잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('75e23ec1-640e-430e-b17e-fc03ee2768df', 'c413c996-853f-4eb3-839f-df694592b4c8', '8e47b5c0-3fa4-4392-8772-4ad18d3ff7c9', 5, '...그래서 걱정이야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ed694cdf-c65d-426d-bd13-dadcd2cddc13', 'c413c996-853f-4eb3-839f-df694592b4c8', '4173b510-4731-43cd-b8fc-9b28c645af32', 6, 'ㅋㅋㅋㅋ 시작도 전에 팀킬?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3c7a0cde-da80-4c7a-8956-4dd06ccf772b', 'c413c996-853f-4eb3-839f-df694592b4c8', NULL, 7, '[MC] 반전 카드! 정빈 상대팀으로 이동!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('98f55430-12a8-4e59-ab3f-afc9ab738792', 'c413c996-853f-4eb3-839f-df694592b4c8', '4e912080-ff07-4d61-9763-3a791961c16d', 8, '네?! 저요?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('72fd2d6a-d93a-4a5e-a925-7f1c6fb2ce5c', 'c413c996-853f-4eb3-839f-df694592b4c8', '27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 9, '아 잠깐, 우리 에이스인데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cfd91940-2849-4ddb-be28-d4e0b7a7ffb7', 'c413c996-853f-4eb3-839f-df694592b4c8', '4e912080-ff07-4d61-9763-3a791961c16d', 10, '(이동하며) 미안, 이제 적이야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fac6c00a-d821-4b54-901f-b54b697c0126', 'c413c996-853f-4eb3-839f-df694592b4c8', '4e912080-ff07-4d61-9763-3a791961c16d', 11, '어서 와, 우리 팀.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('658661cc-746b-4d9b-890a-7f223894aff5', 'c413c996-853f-4eb3-839f-df694592b4c8', '8e47b5c0-3fa4-4392-8772-4ad18d3ff7c9', 12, '갑자기 희망이 보인다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('87f2ffab-c9a3-4a91-9fde-ac703c2d320b', 'c413c996-853f-4eb3-839f-df694592b4c8', '4173b510-4731-43cd-b8fc-9b28c645af32', 13, '야!! 배신자!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('598db75f-ec51-4711-ac7f-20132a482984', 'c413c996-853f-4eb3-839f-df694592b4c8', '4e912080-ff07-4d61-9763-3a791961c16d', 14, '(손 흔들며) 안녕~', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('17810c19-b34e-4e26-a7de-4b24bc137e69', 'c413c996-853f-4eb3-839f-df694592b4c8', '27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 15, '잠깐, 지금 몇 대 몇이야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cebdbe91-ceb1-4eb7-adb2-835cf84783cf', 'c413c996-853f-4eb3-839f-df694592b4c8', '4173b510-4731-43cd-b8fc-9b28c645af32', 16, '우리가 3점 뒤처져 있어...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2c4ff66f-5573-4731-adca-db3d9123929a', 'c413c996-853f-4eb3-839f-df694592b4c8', '4e912080-ff07-4d61-9763-3a791961c16d', 17, '마지막 미션 10점짜리래.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('27300b64-ffae-4b48-8a42-35bceeb68a34', 'c413c996-853f-4eb3-839f-df694592b4c8', '8e47b5c0-3fa4-4392-8772-4ad18d3ff7c9', 18, '그럼 아직 가능하잖아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d31b35dd-9014-4f23-85d6-ff774aae2f34', 'c413c996-853f-4eb3-839f-df694592b4c8', '4e912080-ff07-4d61-9763-3a791961c16d', 19, '근데 마지막 미션 뭔데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5156a75d-165b-4080-8e34-a74e5e21bcd9', 'c413c996-853f-4eb3-839f-df694592b4c8', NULL, 20, '[MC] 마지막 미션, ''림보 대결''입니다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8c96ca33-68a1-4f2b-a97b-75fc53b1e334', 'c413c996-853f-4eb3-839f-df694592b4c8', '27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 21, '...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7a39065e-23d8-482f-b865-b4c52c5bcc3c', 'c413c996-853f-4eb3-839f-df694592b4c8', '4173b510-4731-43cd-b8fc-9b28c645af32', 22, '예진 허리 괜찮아요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b2e6c523-468e-42bc-95f4-9be520297355', 'c413c996-853f-4eb3-839f-df694592b4c8', '27ef6c01-9aef-4c8d-aacb-2b9c71f25f31', 23, '오늘 진다.', NOW(), NOW());

-- CLEF > 탈출하라 24시 (content_id=12)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('eab1d249-24ef-421c-9fe5-bf2e5af99b98', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '4a47fed8-14e1-4be1-af90-e3310c142267', 1, '자, 이 숫자가 뭔지 알아내야 해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('17ea1478-2d8f-4033-84ea-c644b94f9ecc', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '83d8f514-77b1-4f52-81a6-524e8303563f', 2, '3, 7, 15, 31... 규칙이 뭐지?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f409e8e0-1124-4765-b280-a91a11bf7ced', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 3, '2배 하고 1 더하는 거 아니에요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('65a73a23-3090-4fd2-b46f-e76969269f7e', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0147d8ce-1b17-46aa-80c9-87d840301af2', 4, '오, 그러네! 그럼 다음은 63?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('056d703b-bcfc-4798-89d4-ba9ed7e62294', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '4a47fed8-14e1-4be1-af90-e3310c142267', 5, '(자물쇠에 입력) 안 열려요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9978c1df-b037-4ccd-abc5-9a3551a5fd2e', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '4a47fed8-14e1-4be1-af90-e3310c142267', 6, '뭐?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('301a9181-db08-426b-921d-84106bcdd24c', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '83d8f514-77b1-4f52-81a6-524e8303563f', 7, '잠깐, 다시 보자...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d62a4260-6a85-4bc2-b6ba-9389872003ff', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 8, '아, 2배가 아니라 2를 더하고 곱하기 2인가?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b11cd035-38b3-4ca6-b7fa-80bf9daf4b2c', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0147d8ce-1b17-46aa-80c9-87d840301af2', 9, '그게 뭐가 달라?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5e34ce80-e34b-4998-94bd-06b29c63f15d', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '4a47fed8-14e1-4be1-af90-e3310c142267', 10, '(다시 시도) ...열렸다!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('566e0d90-4527-4004-b090-c045f5f53cf3', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '4a47fed8-14e1-4be1-af90-e3310c142267', 11, '우와!!! 연서 천재!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('163f42af-2bff-4163-9cd0-7af88e935e6b', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 12, '(뿌듯) 수학 1등급의 힘.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5bf8d57c-bcc2-4dbc-9949-72d3fa353534', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '83d8f514-77b1-4f52-81a6-524e8303563f', 13, '수능 3등급이었잖아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('075db975-1861-4eef-b561-c60572a12aa0', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 14, '...조용히 해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8659c4cf-a466-486f-bbc9-014fa4634b73', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0147d8ce-1b17-46aa-80c9-87d840301af2', 15, '이거 진짜 모르겠는데, 힌트 쓸까?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5b7bd128-636a-47f9-a4c0-5043b717d045', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '4a47fed8-14e1-4be1-af90-e3310c142267', 16, '아직 2개 남았잖아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e617aa46-a9f2-4454-8af6-7137facb6c1e', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '4a47fed8-14e1-4be1-af90-e3310c142267', 17, '근데 시간이 10분밖에 안 남았어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d39cc84f-4e7d-4147-9847-cd7a5a508f8e', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '83d8f514-77b1-4f52-81a6-524e8303563f', 18, '쓰자!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f4793c25-b8c4-4057-84af-a83d2c790c6f', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 19, '잠깐, 내가 한 번만 더 생각해 볼게.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e9ee26cc-1670-4bfa-995a-c21474251f13', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0147d8ce-1b17-46aa-80c9-87d840301af2', 20, '아까도 그러더니 5분 날렸잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('05c7d027-a9b5-4dc7-9d43-69fae2a17ccd', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 21, '이번엔 진짜!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b2764008-4405-4903-87ac-2d281bb0ff1d', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '4a47fed8-14e1-4be1-af90-e3310c142267', 22, '...30초 준다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7236f320-f6da-49c2-9834-2d273abaf291', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 23, '(열심히 보다가) ...쓰자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('74c31c05-52b9-4dfb-871f-386adf9e32ba', 'ba8ce5a2-d2e2-48e5-a0db-0df7383ff635', NULL, 24, '[전원] ㅋㅋㅋㅋㅋ', NOW(), NOW());

-- CLEF > 우당탕 하우스 (content_id=4)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4c815c9d-6571-4f97-baff-424baf4beb67', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 1, '(불 꺼짐) ...뭐야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('82a661a3-74c9-460b-a054-985ac3bab9de', '9946d104-0165-44ee-918f-2bfc1c69e354', '83d8f514-77b1-4f52-81a6-524e8303563f', 2, '정전이야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1360812b-b548-4651-8380-b3702e432ebe', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 3, '무서워요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6817e1db-5537-4d0d-be9c-9abb72ac99c6', '9946d104-0165-44ee-918f-2bfc1c69e354', '0147d8ce-1b17-46aa-80c9-87d840301af2', 4, '괜찮아, 촛불 어디 있지?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c2c0bc6c-9c71-4a78-82c8-8591c3de3c18', '9946d104-0165-44ee-918f-2bfc1c69e354', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 5, '촛불 우리 집에 없는데요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0178db9d-7ae9-4972-ae27-e26ebb6e1898', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 6, '손전등!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a7b76f47-8749-4323-9434-ed2ee9e5e9ee', '9946d104-0165-44ee-918f-2bfc1c69e354', '83d8f514-77b1-4f52-81a6-524e8303563f', 7, '그것도 없어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('621659dc-374c-4e86-8ff2-3721902ff88b', '9946d104-0165-44ee-918f-2bfc1c69e354', '0147d8ce-1b17-46aa-80c9-87d840301af2', 8, '...우리 집에 뭐가 있는 거야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('04d0fbad-7208-4f70-8ff2-99c90956c493', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 9, '핸드폰! 플래시!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5f33dbb4-0b1d-4c86-93fa-92b34f2b90fb', '9946d104-0165-44ee-918f-2bfc1c69e354', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 10, '오 천재!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ea11009c-2905-44f0-8ee6-e2599920a572', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 11, '(플래시 켜며 얼굴 비춤) 이렇게요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c6042b4b-e3ee-4090-9fe7-5b32f2cec333', '9946d104-0165-44ee-918f-2bfc1c69e354', '83d8f514-77b1-4f52-81a6-524e8303563f', 12, '야!!!! 무섭게 하지 마!!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bc76b799-ca67-4eea-b5e6-a62f23d2e9b8', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 13, '야, 내 새우깡 어딨어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ce7b6d4f-d007-4234-afa9-100f7c777baa', '9946d104-0165-44ee-918f-2bfc1c69e354', '0147d8ce-1b17-46aa-80c9-87d840301af2', 14, '몰라.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4cd1a54c-6d5b-4092-83eb-df3877204211', '9946d104-0165-44ee-918f-2bfc1c69e354', '83d8f514-77b1-4f52-81a6-524e8303563f', 15, '저도 몰라요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6b58db6f-ebee-4f9d-9dce-ef6568a17063', '9946d104-0165-44ee-918f-2bfc1c69e354', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 16, '(우물우물)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('86051867-1c94-4d68-9b67-5ce01fc2b86c', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 17, '...연서야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('feb305df-806f-4418-9d50-eae37796b98c', '9946d104-0165-44ee-918f-2bfc1c69e354', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 18, '네?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1555a135-feb1-4285-a5fe-677ecbcccc6f', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 19, '입에 새우깡 묻었어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('40ac833d-9fbf-45b4-aa7c-9587a78a4ba7', '9946d104-0165-44ee-918f-2bfc1c69e354', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 20, '!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c1118367-14c6-4269-a24f-1435e0c6f981', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 21, '너...?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fce4b75a-4417-4f49-a299-4879310bce3a', '9946d104-0165-44ee-918f-2bfc1c69e354', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 22, '아니 이게... 다른 새우깡이야!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6a1bd85f-a6df-46ec-a195-8bddfb9742df', '9946d104-0165-44ee-918f-2bfc1c69e354', '0147d8ce-1b17-46aa-80c9-87d840301af2', 23, '새우깡이 두 종류야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4d60420d-ff66-4b31-a304-239aa5a99e2d', '9946d104-0165-44ee-918f-2bfc1c69e354', '83d8f514-77b1-4f52-81a6-524e8303563f', 24, 'ㅋㅋㅋㅋㅋㅋ', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7d019aaf-f3cf-4127-a5e4-87b5b235dee4', '9946d104-0165-44ee-918f-2bfc1c69e354', '0c040f6c-5a4c-4087-86a6-b3d889c567f2', 25, '(도망) 미안해!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1c4ad433-dc54-494c-95f6-19341fea165b', '9946d104-0165-44ee-918f-2bfc1c69e354', '4a47fed8-14e1-4be1-af90-e3310c142267', 26, '(추격) 서!!!', NOW(), NOW());

-- NEXO > 멤버네컷 (content_id=16)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6a8c0d56-e292-4756-abe9-2f3ada68904f', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 1, '과거요... 연습생 시절이 생각나요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b7bb224b-d0f6-4259-ba20-1f33e6674390', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '8ada2751-6fbb-46ae-8389-9c2e1043f098', 2, '(인터뷰어) 그때 어땠어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a81f3fa2-2166-4e61-9679-e3a837982101', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 3, '진짜 힘들었죠. 다들 없었으면 못 버텼을 거예요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f244fc51-1c58-42a3-b617-05dc892d14bb', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '0add4a99-3f6f-4f8b-a2da-b5b1bfa91f2d', 4, '(영상 메시지) 이든야, 너 연습생 때 맨날 울었잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c5ffcd18-2704-48f6-94ac-b33bcbd7f03f', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 5, 'ㅋㅋㅋ...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('db957286-c23e-400b-a1b6-d1ec09ecf507', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '0add4a99-3f6f-4f8b-a2da-b5b1bfa91f2d', 6, '근데 지금은 진짜 많이 컸어. 자랑스러워.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5b46de05-5f26-4cfe-9505-52810bf8e382', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 7, '(눈물) 아 왜 울려...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b3299883-bc95-4ae1-9e49-84919aab37fd', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '8ada2751-6fbb-46ae-8389-9c2e1043f098', 8, '자, 비밀 하나 공개해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5dea1671-0b01-4193-acbf-0c6b44485ba1', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 9, '음... 사실 데뷔 전에 포기하려고 했어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c2eb2510-7345-4344-b9f2-0fad46887e48', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '8ada2751-6fbb-46ae-8389-9c2e1043f098', 10, '진짜?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4a21e920-d557-4d2d-b307-302e6d6ec1d4', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 11, '네, 근데 하온가 밤새 얘기해 줬거든요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4edf7522-abaa-4032-9229-5ac2dab5a34c', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '38396308-955c-4219-8614-9319e0fdd607', 12, '(영상 메시지) 그때 네가 그만두면 나도 그만둔다고 했지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b54c78c1-9824-475e-8fef-0a84b6156701', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 13, '그 말 듣고 다시 마음 잡았어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a386591e-e59f-4a87-a65c-24ad136cb31d', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '671af579-0d5a-41d8-8eca-7ba311a460fc', 14, '(영상 메시지) 우리 이든 안 그만둬서 다행이야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8ee727dc-ea96-4b10-ae1e-23c5e799ceb8', '10e10803-e4a4-46a4-8e0d-b5ba3774edf4', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 15, '(눈물) 너무해, 왜 다 울려...', NOW(), NOW());

-- NEXO > 리허설 비하인드 (content_id=21)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ef78d4c5-7c25-4f59-b101-78f378d4677b', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '38396308-955c-4219-8614-9319e0fdd607', 1, '자, 내일이다. 한 번만 더 맞춰 보자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('870d81c5-17d2-4280-ad6c-105fd8c4c119', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '8ada2751-6fbb-46ae-8389-9c2e1043f098', 2, '3번 곡 중간 대형 아직 헷갈려.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a0f29d03-baf1-4336-8695-bed89354312f', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '0add4a99-3f6f-4f8b-a2da-b5b1bfa91f2d', 3, '거기 제가 왼쪽이에요, 오른쪽 아니고.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ee5d5007-9d2a-45c7-94ed-7960dfc18f54', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '8ada2751-6fbb-46ae-8389-9c2e1043f098', 4, '아, 맞다. 매번 헷갈리네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e929222d-10ec-46ab-ba28-140e3432ecbe', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '671af579-0d5a-41d8-8eca-7ba311a460fc', 5, '저도 그 부분 불안해요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e99a9520-79ed-4917-a568-80e2d6e13377', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 6, '같이 한 번만 더 해요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ac507b2f-b9ae-4af8-96ba-8307c5886be6', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '38396308-955c-4219-8614-9319e0fdd607', 7, '(동작 하다가) 아, 여기서 턴이 맞지?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3666a538-fda8-4db9-bbae-af51ebb4f959', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '0add4a99-3f6f-4f8b-a2da-b5b1bfa91f2d', 8, '아니요, 한 박자 뒤에요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b0c58d1e-c69b-4dcd-8e2e-8af915533c08', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '38396308-955c-4219-8614-9319e0fdd607', 9, '아 진짜? 어제까지 이렇게 했는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('69f81928-201c-4bd2-8b71-987257b5f3d8', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '671af579-0d5a-41d8-8eca-7ba311a460fc', 10, '어제 바뀌었어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('89638ce5-56e0-40fc-8f57-4939271b28a6', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '38396308-955c-4219-8614-9319e0fdd607', 11, '...아무도 안 알려줬잖아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1d4afb36-40b5-47ac-9fd9-dd7c61f07871', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '8ada2751-6fbb-46ae-8389-9c2e1043f098', 12, 'ㅋㅋㅋ 미안미안.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6f04a9b5-f38a-4ac7-8744-446f74616bbd', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 13, '괜찮아요, 지금 알았으니까요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('835ef75b-5d99-40e8-b444-f4378a82ef7e', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '0add4a99-3f6f-4f8b-a2da-b5b1bfa91f2d', 14, '자, 처음부터 다시!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4e52ca07-b263-4aac-8110-94d12105b2c0', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', NULL, 15, '[전원] 네!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ba093157-f591-4450-a9d0-6de3bad061d1', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '671af579-0d5a-41d8-8eca-7ba311a460fc', 16, '(속삭임) 다리 아파...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4f4d08d3-3336-432d-9c32-d0f404aff85c', '9a0efd52-f8b6-4d4e-bf4e-2a055fc3313d', '45cbe383-3da0-4fb1-9d70-037fb41673e7', 17, '(속삭임) 나도... 하지만 화이팅...', NOW(), NOW());

-- VERVE > 미스터리 나잇 (content_id=10)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d66f82d9-ff49-4d9c-9664-203a1cd3ecac', '445829aa-e75c-4607-b046-41e9b7327b66', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 1, '다들... 저 무서워요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ac14506e-162b-46fb-ad29-0c41c8f672a0', '445829aa-e75c-4607-b046-41e9b7327b66', '92b01400-37d9-425c-b147-5c45e03f6ce8', 2, '괜찮아, 다 연출이야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('67500693-aa65-4d27-9fca-3efef8765147', '445829aa-e75c-4607-b046-41e9b7327b66', '9c501420-db56-40ed-89f8-a3194a601383', 3, '그래도 분위기 장난 아닌데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('93927730-23db-4085-9fc6-964bf3dc4224', '445829aa-e75c-4607-b046-41e9b7327b66', 'e20beead-ba2e-4424-9295-a4fbc37c4615', 4, '자, 첫 번째 단서 찾으러 가자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('83823a40-2c35-4f87-a351-cb37c015bb40', '445829aa-e75c-4607-b046-41e9b7327b66', '0296ddda-db58-4e18-a784-fb83e376acd0', 5, '저는 윤재랑 같이 갈래요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('daf7f7b5-94db-472f-b8ce-aad34e7a4810', '445829aa-e75c-4607-b046-41e9b7327b66', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 6, '저도요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f3d5c34d-10b3-408d-b2b0-f8fbe1ae4dbf', '445829aa-e75c-4607-b046-41e9b7327b66', '9c501420-db56-40ed-89f8-a3194a601383', 7, '야, 그럼 우리 셋이 같이 가잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c0fa0896-3251-4f06-ae6a-bacbf0368933', '445829aa-e75c-4607-b046-41e9b7327b66', '92b01400-37d9-425c-b147-5c45e03f6ce8', 8, '흩어져야 빨리 찾지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('25233f30-0da7-43f6-883a-f849d169651a', '445829aa-e75c-4607-b046-41e9b7327b66', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 9, '싫어요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('53ced90a-6bbc-4ba3-8749-9ef0e89bc936', '445829aa-e75c-4607-b046-41e9b7327b66', NULL, 10, '[연출] (갑자기 불 꺼짐)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('dc8d4521-e37c-4ebf-949d-9608829a53b3', '445829aa-e75c-4607-b046-41e9b7327b66', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 11, '으악!!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('57a0b70a-2622-48f5-ba93-3fbc5c115184', '445829aa-e75c-4607-b046-41e9b7327b66', '0296ddda-db58-4e18-a784-fb83e376acd0', 12, '뭐야 뭐야?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b0ad3757-5ea0-4cb4-b971-a274adbc0727', '445829aa-e75c-4607-b046-41e9b7327b66', '92b01400-37d9-425c-b147-5c45e03f6ce8', 13, '다들 진정해!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('13437a26-7e42-4f36-b4a3-c148f1eca26b', '445829aa-e75c-4607-b046-41e9b7327b66', NULL, 14, '[연출] (복도 끝에서 인형 굴러옴)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9212713f-146d-4635-9050-eb236bf2b9f9', '445829aa-e75c-4607-b046-41e9b7327b66', '9c501420-db56-40ed-89f8-a3194a601383', 15, '!!!!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('928afb91-9dce-4966-96c7-c0e14241f142', '445829aa-e75c-4607-b046-41e9b7327b66', 'e20beead-ba2e-4424-9295-a4fbc37c4615', 16, '(도망) 나 먼저 간다!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('43d97449-08a0-419d-9ae5-00af9fe3015b', '445829aa-e75c-4607-b046-41e9b7327b66', '0296ddda-db58-4e18-a784-fb83e376acd0', 17, '버리고 가면 어떡해!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('730f866d-9908-4165-af30-df2ba582952d', '445829aa-e75c-4607-b046-41e9b7327b66', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 18, '(울먹) 나가고 싶어요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('94e3a85c-75ed-4c75-92f0-b412801ecc48', '445829aa-e75c-4607-b046-41e9b7327b66', '92b01400-37d9-425c-b147-5c45e03f6ce8', 19, '(인형 집어들며) ...어, 이거 단서인데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e9d91506-179a-44f3-9f4b-bbf8223123fc', '445829aa-e75c-4607-b046-41e9b7327b66', '9c501420-db56-40ed-89f8-a3194a601383', 20, '...뭐?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cb6f1744-8e59-4945-b567-a90eb02cc3ce', '445829aa-e75c-4607-b046-41e9b7327b66', '92b01400-37d9-425c-b147-5c45e03f6ce8', 21, '인형 안에 쪽지 있어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c9fe3972-0f54-4611-ba1b-5dd9a8c71504', '445829aa-e75c-4607-b046-41e9b7327b66', '0296ddda-db58-4e18-a784-fb83e376acd0', 22, '와... 심장 떨어지는 줄 알았네.', NOW(), NOW());

-- VERVE > MBTI 토론 (content_id=20)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7aac4a6b-ad85-4528-8912-5ee600bc6b04', '05af959b-4db9-474e-92d4-37d1c5a3debc', 'e20beead-ba2e-4424-9295-a4fbc37c4615', 1, '자, 다들 MBTI 공개!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bace6eaa-8698-420a-abf3-3d420fb99820', '05af959b-4db9-474e-92d4-37d1c5a3debc', 'ee23e136-280b-4932-9afc-99e2bebb0732', 2, '나 ISTP.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0783ebad-f43f-4875-b01d-56f379df9199', '05af959b-4db9-474e-92d4-37d1c5a3debc', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 3, '저 ENFP요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a83b52b5-9476-4bb7-9103-a461d2298f35', '05af959b-4db9-474e-92d4-37d1c5a3debc', '92b01400-37d9-425c-b147-5c45e03f6ce8', 4, '저는 INFJ예요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c6f92977-4761-4b7e-a655-12b4a72401b3', '05af959b-4db9-474e-92d4-37d1c5a3debc', '0296ddda-db58-4e18-a784-fb83e376acd0', 5, '저 ESTP요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('eaddd3d4-3872-402b-ae49-ab588115a020', '05af959b-4db9-474e-92d4-37d1c5a3debc', 'e20beead-ba2e-4424-9295-a4fbc37c4615', 6, '나는 ENTJ.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ea40df1f-ca92-48ac-8f58-d810def34e3b', '05af959b-4db9-474e-92d4-37d1c5a3debc', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 7, '오, 윤재이랑 저는 E끼리네요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d4764553-083d-49c8-887f-8db1888b838f', '05af959b-4db9-474e-92d4-37d1c5a3debc', 'ee23e136-280b-4932-9afc-99e2bebb0732', 8, 'I끼리 모여.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('26f14336-e427-4f6c-841f-f652294d0654', '05af959b-4db9-474e-92d4-37d1c5a3debc', '92b01400-37d9-425c-b147-5c45e03f6ce8', 9, 'ㅋㅋㅋ 둘이서 조용히 있자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b1baefe3-240f-4493-9bb3-c533e5bef03a', '05af959b-4db9-474e-92d4-37d1c5a3debc', 'e20beead-ba2e-4424-9295-a4fbc37c4615', 10, '자, MBTI 밸런스 게임! 약속 당일 갑자기 취소하는 친구, 이해한다 vs 서운하다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5712b39c-090f-4b3e-a2d8-9a6fadce69a2', '05af959b-4db9-474e-92d4-37d1c5a3debc', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 11, '당연히 서운하지!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f1b70ef3-ed4e-40d6-b9e2-3b3de3b5cf0d', '05af959b-4db9-474e-92d4-37d1c5a3debc', 'ee23e136-280b-4932-9afc-99e2bebb0732', 12, '난 이해해. 나도 가끔 그러니까.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('acc77cdf-b825-4bf9-93ee-1d3e4e6b19ee', '05af959b-4db9-474e-92d4-37d1c5a3debc', '92b01400-37d9-425c-b147-5c45e03f6ce8', 13, '저도 이해해요. 근데 미리 말해줬으면...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b6ded52c-d818-4664-beb3-f04a1d46e26b', '05af959b-4db9-474e-92d4-37d1c5a3debc', '0296ddda-db58-4e18-a784-fb83e376acd0', 14, '저는 솔직히 서운해요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f157998e-d7e3-4960-9f7b-9c1db6fbdae8', '05af959b-4db9-474e-92d4-37d1c5a3debc', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 15, '봐, F가 많잖아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fe3a44be-8bfd-4a6a-acbb-ef78ebc0d538', '05af959b-4db9-474e-92d4-37d1c5a3debc', 'ee23e136-280b-4932-9afc-99e2bebb0732', 16, 'T라고 감정 없는 거 아니거든?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6c9ddbdf-42f2-4906-a09b-4c26fbabfb77', '05af959b-4db9-474e-92d4-37d1c5a3debc', 'e20beead-ba2e-4424-9295-a4fbc37c4615', 17, 'ㅋㅋㅋ T들 억울해하네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7f3bb97c-ce37-4cbb-9b3b-93f280e54120', '05af959b-4db9-474e-92d4-37d1c5a3debc', '92b01400-37d9-425c-b147-5c45e03f6ce8', 18, '근데 진짜 성격이랑 안 맞는 것도 있지 않아요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e573d1be-4826-4222-8351-479d50ba652d', '05af959b-4db9-474e-92d4-37d1c5a3debc', '0296ddda-db58-4e18-a784-fb83e376acd0', 19, '맞아요, 저 E인데 가끔 혼자 있고 싶을 때도 있어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('feeefd52-8c75-4fc5-83a5-7b0ec8104e78', '05af959b-4db9-474e-92d4-37d1c5a3debc', '59a6fd46-6649-4880-bbaa-8f9c862ae528', 20, '그건 다 그래.', NOW(), NOW());

-- AURA > 새벽 산책 (content_id=26)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5340f637-8399-4ad4-b44b-284c110816ce', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'fd5197ce-5553-4c05-97d6-226788991496', 1, '(하품) 아... 왜 새벽 4시에...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ee46313f-a39a-4f5e-a3d2-0736bb3fac60', '7f0c68f8-96fb-4852-a376-266a620fe8b3', '5351aab5-8877-4a95-a344-c7c8eb97b48f', 2, '(겨우 일어나며) 일출 보러 간다며.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('01ab956a-d698-4cbc-a62c-779783bf2377', '7f0c68f8-96fb-4852-a376-266a620fe8b3', '7569d7e6-0932-48ef-b951-6184ec7eda18', 3, '민서 안 일어나요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a5e517b5-1b1b-47bb-9539-b7a215d2b504', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'e6c72ef5-7170-4d81-95bc-d3bebf0ca0da', 4, '(흔들며) 일어나, 일어나!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9fb601bb-33b3-42bc-942f-6f5f1f5d749b', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'b57e0bf5-31fc-4b7f-abc4-a3266fe85588', 5, '(잠꼬대) 5분만...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a1e358d7-afa9-444f-ab27-c62842d4d807', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'fd5197ce-5553-4c05-97d6-226788991496', 6, '그 5분이 50분 될 거잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ca7736e7-4c1f-4e8e-8af4-aae239276a0d', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'e6c72ef5-7170-4d81-95bc-d3bebf0ca0da', 7, '(이불 뺏음)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('95a14f74-6e81-470c-ae3e-28be9b76d9f1', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'b57e0bf5-31fc-4b7f-abc4-a3266fe85588', 8, '으아!! 추워!!! 알겠어, 일어날게!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d1464333-a233-45b1-947f-9090dc29796f', '7f0c68f8-96fb-4852-a376-266a620fe8b3', '7569d7e6-0932-48ef-b951-6184ec7eda18', 9, '와... 하늘 진짜 예쁘다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7be614c8-d13c-4fcf-b62e-b1b5a1b32bdb', '7f0c68f8-96fb-4852-a376-266a620fe8b3', '5351aab5-8877-4a95-a344-c7c8eb97b48f', 10, '새벽 공기가 좋아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c3f9ff75-35f3-4ad3-811e-955c00029fdd', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'fd5197ce-5553-4c05-97d6-226788991496', 11, '잠이 확 깬다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('15979c56-8990-4121-b271-13fe92526f32', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'e6c72ef5-7170-4d81-95bc-d3bebf0ca0da', 12, '저기 봐, 해 뜬다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2e165f00-b6e3-4617-b5fb-e98baacb86d7', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'b57e0bf5-31fc-4b7f-abc4-a3266fe85588', 13, '우와... 일어나길 잘했다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c6c57d3d-cd16-498d-aa68-95ee42aad300', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'fd5197ce-5553-4c05-97d6-226788991496', 14, '그치?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6d8a9409-66e0-482e-a43c-07667bcb9dab', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'b57e0bf5-31fc-4b7f-abc4-a3266fe85588', 15, '(눈 감으며) 소원 빌어도 돼요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8e88b3ac-6c0d-4343-a20a-db8a4ffa0461', '7f0c68f8-96fb-4852-a376-266a620fe8b3', '7569d7e6-0932-48ef-b951-6184ec7eda18', 16, '일출에 소원을?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('65724ce5-381c-4f54-b56f-917d2bb88f5a', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'b57e0bf5-31fc-4b7f-abc4-a3266fe85588', 17, '네, 우리 다 같이 오래오래 함께 하자고.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bbeec811-5544-4b5a-a4b4-4bc11181985c', '7f0c68f8-96fb-4852-a376-266a620fe8b3', '5351aab5-8877-4a95-a344-c7c8eb97b48f', 18, '...갑자기 울컥하네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('303f4011-a1b2-4460-bb08-1f43bd9a6a78', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'e6c72ef5-7170-4d81-95bc-d3bebf0ca0da', 19, '나도...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c8a1d3a8-4b98-4f01-874e-aca4867370a0', '7f0c68f8-96fb-4852-a376-266a620fe8b3', 'fd5197ce-5553-4c05-97d6-226788991496', 20, '우리 약속. 끝까지 같이 가자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e5e8f95c-7d1b-4f78-a835-a6412365b884', '7f0c68f8-96fb-4852-a376-266a620fe8b3', NULL, 21, '[전원] (조용히 일출 바라봄)', NOW(), NOW());

-- AURA > 극한직업 아이돌 (content_id=15)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a919cd64-08f3-40be-9189-ca306b7c38db', '01009865-082f-4504-b221-d7ec7f604757', NULL, 1, '[소방관] 오늘 화재 진압 훈련합니다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9ef4659f-be8b-4c01-80d3-ae9190c79f39', '01009865-082f-4504-b221-d7ec7f604757', 'b57e0bf5-31fc-4b7f-abc4-a3266fe85588', 2, '(장비 입으며) 이거 진짜 무거워요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fad95726-6322-4b59-996b-0f91b5472805', '01009865-082f-4504-b221-d7ec7f604757', 'fd5197ce-5553-4c05-97d6-226788991496', 3, '이걸 입고 뛰어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8e6164e9-91db-469e-8de6-f22742daec3a', '01009865-082f-4504-b221-d7ec7f604757', NULL, 4, '[소방관] 네, 그리고 사다리도 올라가셔야 해요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('73da4574-6960-446a-9c42-8abac66f2965', '01009865-082f-4504-b221-d7ec7f604757', 'e6c72ef5-7170-4d81-95bc-d3bebf0ca0da', 5, '높이가 어느 정도예요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a80898ee-2918-4762-ac61-135191db5bb1', '01009865-082f-4504-b221-d7ec7f604757', NULL, 6, '[소방관] 15미터요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fa0a924c-1e60-4e9f-9d48-3f2fcdad1e1b', '01009865-082f-4504-b221-d7ec7f604757', '7569d7e6-0932-48ef-b951-6184ec7eda18', 7, '...저 고소공포증인데요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('48e5bf9f-1778-449d-a8af-2d646c6a5f4a', '01009865-082f-4504-b221-d7ec7f604757', '5351aab5-8877-4a95-a344-c7c8eb97b48f', 8, 'ㅋㅋㅋ 오늘 극한이 맞네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('12076348-82c9-4ec3-9310-4f24d51d1cf2', '01009865-082f-4504-b221-d7ec7f604757', '5351aab5-8877-4a95-a344-c7c8eb97b48f', 9, '(올라가며) 생각보다 괜찮은데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('dc7aa908-ebf9-4cd7-9860-16665fd930fe', '01009865-082f-4504-b221-d7ec7f604757', 'fd5197ce-5553-4c05-97d6-226788991496', 10, '진짜 멋있다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e8908d46-b715-49c3-95ae-07cda30ec4b4', '01009865-082f-4504-b221-d7ec7f604757', '7569d7e6-0932-48ef-b951-6184ec7eda18', 11, '(1미터 올라감) ...안 돼, 못 해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('33fe9fd1-35c5-45d3-99a0-2afaed9f64bc', '01009865-082f-4504-b221-d7ec7f604757', 'e6c72ef5-7170-4d81-95bc-d3bebf0ca0da', 12, '괜찮아요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3ebe19ac-b330-4cbc-a517-f0e06bf52285', '01009865-082f-4504-b221-d7ec7f604757', '7569d7e6-0932-48ef-b951-6184ec7eda18', 13, '(내려옴) 미안, 진짜 무서워.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('039d5ee9-50e7-417b-99e5-bcbfc5915c61', '01009865-082f-4504-b221-d7ec7f604757', 'b57e0bf5-31fc-4b7f-abc4-a3266fe85588', 14, '괜찮아요, 저도 무섭긴 해요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('19e8654c-8738-4069-bd5c-6f28bbf2bf62', '01009865-082f-4504-b221-d7ec7f604757', 'fd5197ce-5553-4c05-97d6-226788991496', 15, '우리가 대신 더 열심히 할게!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('34aaf022-d9fb-4d7b-829b-9f8dd1dc7767', '01009865-082f-4504-b221-d7ec7f604757', '7569d7e6-0932-48ef-b951-6184ec7eda18', 16, '고마워...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ad634406-4b6c-476d-8c73-b09675ce638b', '01009865-082f-4504-b221-d7ec7f604757', NULL, 17, '[소방관] 다른 훈련도 있으니까 괜찮습니다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0878eab3-8d38-4209-9c87-c404be0dd41d', '01009865-082f-4504-b221-d7ec7f604757', '7569d7e6-0932-48ef-b951-6184ec7eda18', 18, '(안도) 휴...', NOW(), NOW());

-- BIJOU > 소통의 왕 (content_id=30)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9ec2a64a-4fda-42ba-b953-dce0091d21da', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', 'ec8a56bc-aa27-44b5-941a-32d38914fc0d', 1, '자, 몸으로 말해요! 나 먼저!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('362f4e8d-08a5-459a-a30c-94be168229bf', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '7242de36-e19f-480b-9865-8bc462051949', 2, '준비됐어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('49d13a32-9e56-45bd-b196-65e0b3ce2350', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', 'ec8a56bc-aa27-44b5-941a-32d38914fc0d', 3, '(몸동작 시작)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b574d5b6-07e9-4e5b-b7d0-519f97808fdd', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '4703e67a-1876-4f18-8ded-4622e8584839', 4, '뭐야 저게? 닭?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('27065c12-6cff-471d-b50b-5043208a88a7', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '45349ad9-80b4-449f-ba3c-79e2d7e60277', 5, '비행기 아니에요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('04b5e8c9-a0e7-48ba-b7de-1d038d07fd54', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '77256614-a56d-419b-907b-5f9e2d3510c6', 6, '수영?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1d4aa74a-a64e-4a25-ab7e-bf82eaf0c6e9', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', 'ec8a56bc-aa27-44b5-941a-32d38914fc0d', 7, '(답답해하며 더 크게 동작)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bc92a095-932a-4953-b5ab-66c76e58f76d', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '7242de36-e19f-480b-9865-8bc462051949', 8, '...빨래?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bb1522d8-7eb7-441c-bc41-c2729f472b76', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', 'ec8a56bc-aa27-44b5-941a-32d38914fc0d', 9, '빨래가 왜 나와!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e0bb80ed-8d7b-42db-8a00-83902d130a08', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '4703e67a-1876-4f18-8ded-4622e8584839', 10, 'ㅋㅋㅋㅋ', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('40ec0470-8fa5-407d-b50c-38a3d2d94764', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '45349ad9-80b4-449f-ba3c-79e2d7e60277', 11, '시간 끝! 정답이 뭐였어요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2a4e41f7-fb19-474f-8b44-d2b4b752b87e', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', 'ec8a56bc-aa27-44b5-941a-32d38914fc0d', 12, '독수리였어!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1ac2000b-8fd8-45b6-a6e5-5cc538337e53', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '77256614-a56d-419b-907b-5f9e2d3510c6', 13, '독수리?! 어디가?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9a0c0a56-ef1c-4c53-a680-ba2338f6f9d6', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '7242de36-e19f-480b-9865-8bc462051949', 14, '자, 스피드 퀴즈! 다인 설명해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f1ab804c-d233-4adb-8084-43f8ff888a7f', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '4703e67a-1876-4f18-8ded-4622e8584839', 15, '아침에 먹는 거! 우유 부어 먹는 거!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cc3c1e88-4f23-4485-8417-7c0ff5458cf4', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '45349ad9-80b4-449f-ba3c-79e2d7e60277', 16, '시리얼!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5168b628-f9ff-4da1-aeb7-76a3ba20d87a', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '4703e67a-1876-4f18-8ded-4622e8584839', 17, '정답!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('048097b2-f025-4713-9e43-b84fbce5c519', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '7242de36-e19f-480b-9865-8bc462051949', 18, '다음! 네모나고 차가운 거!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f3d2d273-295e-405c-bae5-15f8ddd88e58', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '77256614-a56d-419b-907b-5f9e2d3510c6', 19, '얼음!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e42cfc49-6ef0-46af-9a6f-9d70e4316fb1', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '7242de36-e19f-480b-9865-8bc462051949', 20, '아니!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6ab2726c-7ab0-46bc-b94d-d1791ef7040d', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', 'ec8a56bc-aa27-44b5-941a-32d38914fc0d', 21, '냉장고!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('feb312e2-0739-4e09-ba96-696a1b01f979', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '7242de36-e19f-480b-9865-8bc462051949', 22, '아니!!! 두부!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('abd84b34-a79b-4322-a513-7ffc5bc73512', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '45349ad9-80b4-449f-ba3c-79e2d7e60277', 23, '두부가 왜 차가워요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8a48d095-8cee-4133-ab4d-ce9698b92d65', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '7242de36-e19f-480b-9865-8bc462051949', 24, '냉장 보관하잖아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2b74b99f-0724-4312-b78f-440a0c1f2c49', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '4703e67a-1876-4f18-8ded-4622e8584839', 25, 'ㅋㅋㅋ 억지다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f12b2b36-84ef-4247-a705-411afafbc181', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '77256614-a56d-419b-907b-5f9e2d3510c6', 26, '시간 끝!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c8919ad2-7ef0-444c-9019-f04f0a9c2482', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', 'ec8a56bc-aa27-44b5-941a-32d38914fc0d', 27, '2문제밖에 못 맞혔네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b021498d-f2c4-4bf5-b78b-84aa7a9046f2', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '7242de36-e19f-480b-9865-8bc462051949', 28, '...내가 설명을 못 하는 건가?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a368954a-cdb9-406a-89a1-fad65d97e2fe', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '45349ad9-80b4-449f-ba3c-79e2d7e60277', 29, '네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8258437b-6585-4099-8f60-92b773dd7aab', 'f61293c0-594d-43c1-a4ac-4a47a9b9654d', '7242de36-e19f-480b-9865-8bc462051949', 30, '...야.', NOW(), NOW());

-- BIJOU > 범인은 이 안에 (content_id=11)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('382e24dd-a28c-492a-9ef1-34d46fc1d36a', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', 'b1e26731-56b1-47b2-a7ad-7e4cf8d14286', 1, '자, 다들 역할 확인했지? 절대 말하면 안 돼.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7bec2965-821f-4dd7-8238-eb25ac3eea27', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '2912d5aa-b2aa-4c72-97ab-8381f5a447d2', 2, '(포커페이스)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e6e8ccc8-d0d0-478a-99ee-86492f94f798', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '77256614-a56d-419b-907b-5f9e2d3510c6', 3, '(표정 관리 중)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('44c10d91-b082-4667-97bf-6febe47f2fbc', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '7242de36-e19f-480b-9865-8bc462051949', 4, '(눈 마주치면 피함)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8aeaa2be-a5a0-4429-8b04-8b5e58be1464', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '4703e67a-1876-4f18-8ded-4622e8584839', 5, '(너무 긴장)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5bdf7ded-995d-4aca-85b0-4298050ba1c0', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', 'b1e26731-56b1-47b2-a7ad-7e4cf8d14286', 6, '다인야, 왜 그렇게 긴장해?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('987a0da6-b026-443e-a675-fc20a8fd402b', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '4703e67a-1876-4f18-8ded-4622e8584839', 7, '아, 아니에요! 긴장 안 해요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('80565407-57ba-4c50-9677-8f61ff03eb5b', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '7242de36-e19f-480b-9865-8bc462051949', 8, '수상하다...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9db8377e-07ea-4fa6-a3e8-3d20eea21b30', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '4703e67a-1876-4f18-8ded-4622e8584839', 9, '저 아니에요!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('86a61897-68dd-4bf1-be04-372428cc9c00', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '77256614-a56d-419b-907b-5f9e2d3510c6', 10, '아직 아무 말도 안 했는데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b0dbff25-b904-4b70-9bce-27752e741b6e', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '2912d5aa-b2aa-4c72-97ab-8381f5a447d2', 11, '나는 채연가 수상해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e7510c72-db3b-4972-a03f-e5a87b21519b', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '7242de36-e19f-480b-9865-8bc462051949', 12, '왜요?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6b3b9225-1331-43cd-800b-017079a7de73', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '2912d5aa-b2aa-4c72-97ab-8381f5a447d2', 13, '아까부터 눈 안 마주치잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('571b180c-c0a0-43cc-98a8-6e782e3d7ad8', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '7242de36-e19f-480b-9865-8bc462051949', 14, '그건 하영가 무서워서 그래요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('22b82624-a0b0-4299-938e-a590ec495386', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', 'b1e26731-56b1-47b2-a7ad-7e4cf8d14286', 15, 'ㅋㅋㅋㅋ', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7a2ba64b-9fbe-4055-ae4a-c62ce541307f', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '77256614-a56d-419b-907b-5f9e2d3510c6', 16, '저는 하영가 너무 침착해서 의심돼요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('915dea70-c4e7-4a7f-a16e-2e22b4cc1c99', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '2912d5aa-b2aa-4c72-97ab-8381f5a447d2', 17, '난 원래 침착해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('631b459e-d130-49fe-a275-de01e4bff2be', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '4703e67a-1876-4f18-8ded-4622e8584839', 18, '맞아, 원래 그래요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a8bb38d5-e670-421e-b06f-edcd51c43195', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '7242de36-e19f-480b-9865-8bc462051949', 19, '다인는 왜 하영 편들어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3078bd92-0e53-4d9c-81ca-ab5b0a2139cf', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '4703e67a-1876-4f18-8ded-4622e8584839', 20, '?! 편드는 거 아닌데?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('658cb462-714d-476a-a3b6-3530099ef61b', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', 'b1e26731-56b1-47b2-a7ad-7e4cf8d14286', 21, '공범인가?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ee6c4f07-2942-4fc2-9149-67ec320ba817', 'da9fc893-b49c-41e5-91d1-6cc4a710653a', '4703e67a-1876-4f18-8ded-4622e8584839', 22, '아니라고요!!!!', NOW(), NOW());

-- TROVE > 운동회 (content_id=22)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1a7c0e4a-adbb-48b0-aeaf-768403e55413', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', NULL, 1, '[MC] 첫 번째 종목, 줄다리기!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('12fa77d6-bdd6-49ab-8068-2b98bbc33219', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'dd62ff63-1937-4452-870e-12889a418c39', 2, '오, 힘으로 가는 거네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0ebbfb04-5dbd-491f-8d8f-35d5bed7b04d', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'e59aef3e-09c8-4ce3-a24b-f5e365ca69b1', 3, '나 자신 있어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('33c62251-39ab-4e72-bbb7-ac2d3c195eb4', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', '2da55ada-d682-496f-a50f-0336dd0d8c0a', 4, '저는 자신 없어요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('15b267b9-f8fa-42ef-96f3-f934e3c4be48', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', '4e7975f0-ad0b-4593-b51b-40757c29a9a2', 5, '괜찮아, 뒤에서 잡아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3c9ee4ad-c1f6-4aaf-ba29-c2a7a6d3e934', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'ecdf221a-48e1-4222-add8-ca74a283be90', 6, '다 같이 하면 이길 수 있어요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bc6176f3-2c2e-493f-b1f1-1c07ad901c78', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'dd62ff63-1937-4452-870e-12889a418c39', 7, '하나, 둘, 당겨!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cc257563-4e35-4802-bbc0-dec7e7dc6edd', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', '2da55ada-d682-496f-a50f-0336dd0d8c0a', 8, '으아아아!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('159481bf-2708-4e16-97e7-86c4eaf74162', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', '4e7975f0-ad0b-4593-b51b-40757c29a9a2', 9, '밀린다 밀려!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('308cf7ae-4dbc-462b-9947-1cd161cd9b98', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'e59aef3e-09c8-4ce3-a24b-f5e365ca69b1', 10, '버텨! 포기하지 마!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('20f2f6f9-228b-4a85-9582-0c1135317cdd', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'ecdf221a-48e1-4222-add8-ca74a283be90', 11, '(이 악물고) 으으으...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e894e396-1d60-4d6e-b337-bdbfd029c30a', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'dd62ff63-1937-4452-870e-12889a418c39', 12, '지금이야! 한 번에!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e5d86508-cfc4-4d72-b472-d7b0a8f19be6', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', NULL, 13, '[전원] 우와!!!! 이겼다!!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8e3cad3d-08eb-45a3-9af4-c134c8c363a8', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', '2da55ada-d682-496f-a50f-0336dd0d8c0a', 14, '팔 빠지는 줄 알았어...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('25a6f7e4-65af-42b7-9d38-bc929aff84d5', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', '4e7975f0-ad0b-4593-b51b-40757c29a9a2', 15, '진짜 힘들었다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2552cb82-7f95-4851-ad2b-1e5a317f9bdb', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', NULL, 16, '[MC] 두 번째 종목, 이어달리기!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8f654b45-773c-48cd-9e6f-f4ee04ec8307', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'ecdf221a-48e1-4222-add8-ca74a283be90', 17, '저 다리 짧은데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8df4c4b1-67fa-42ac-ac08-7f0db3ed9e66', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'e59aef3e-09c8-4ce3-a24b-f5e365ca69b1', 18, '첫 주자는 내가 할게.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('04404379-85a6-45a4-ad4d-b4681eb8beb5', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'dd62ff63-1937-4452-870e-12889a418c39', 19, '앵커는 내가!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('02f3a6cc-d5fe-404d-a38b-5c7c6feb1545', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', '2da55ada-d682-496f-a50f-0336dd0d8c0a', 20, '나는 중간... 가장 안전하게.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b6f5c8ab-77a3-4874-9023-d036d15ccb47', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', '4e7975f0-ad0b-4593-b51b-40757c29a9a2', 21, '바통 떨어뜨리면 안 돼!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('879b5754-fc36-4de3-9ce4-1df11424995c', '03aa5ce0-c132-4a19-a8ac-38e91bfba1f7', 'ecdf221a-48e1-4222-add8-ca74a283be90', 22, '긴장된다...', NOW(), NOW());

-- TROVE > 패션 대결 (content_id=27)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e79a1d1a-2cde-42c9-84dc-3ecc199e5f13', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', NULL, 1, '[MC] 오늘의 미션, 5만원으로 전신 코디 완성!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b05efb84-6df6-418a-b2ae-1d85f8bf8e0c', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'dd62ff63-1937-4452-870e-12889a418c39', 2, '5만원이면 충분하지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d8a66eb4-4841-476b-ba71-eb18c3d91d91', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '2da55ada-d682-496f-a50f-0336dd0d8c0a', 3, '어디서?! 빈티지숍이라도?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('41f3d09c-b1bd-407b-8aee-12de180f358b', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'e59aef3e-09c8-4ce3-a24b-f5e365ca69b1', 4, '동대문 가자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('844fcad4-284d-4b44-ab2b-1335bca6c5a5', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '4e7975f0-ad0b-4593-b51b-40757c29a9a2', 5, '저 패션 자신 없는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('54259c8d-7b46-44c9-b559-cc73ba291404', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'ecdf221a-48e1-4222-add8-ca74a283be90', 6, '제가 골라줄게요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ae33fbf4-8a15-4837-8cc4-e24af44e94ec', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'dd62ff63-1937-4452-870e-12889a418c39', 7, '(재킷 들고) 이거 어때?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bb0c7b06-36e7-4c6e-8f1a-8c9baf82e4d4', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '2da55ada-d682-496f-a50f-0336dd0d8c0a', 8, '가격 먼저 봐.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0af96e4d-f44a-486e-a4b9-bdfb54417b01', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'dd62ff63-1937-4452-870e-12889a418c39', 9, '...3만9천원?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4a5e84d3-7b45-4df5-8b6b-496395603230', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '2da55ada-d682-496f-a50f-0336dd0d8c0a', 10, '나머지 만천원으로 하의랑 신발을?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9eb771e4-3df6-41e3-b283-d6f020e79fb4', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'e59aef3e-09c8-4ce3-a24b-f5e365ca69b1', 11, '(이미 결제 완료) 나 다 샀다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('de49e9d8-d54d-486c-a2b8-b38b2f5a3958', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '4e7975f0-ad0b-4593-b51b-40757c29a9a2', 12, '벌써?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e574c9f0-bf3c-4508-9413-70053dd539c3', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'e59aef3e-09c8-4ce3-a24b-f5e365ca69b1', 13, '결단력이 중요해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('22300a61-c7d9-4447-8bf0-9e4073d5991d', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'ecdf221a-48e1-4222-add8-ca74a283be90', 14, '전 아직 고민 중인데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('26b3bd74-ff62-4fdc-897f-6cb9fc7bb0fe', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '4e7975f0-ad0b-4593-b51b-40757c29a9a2', 15, '나도... 고르기 어려워.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('48712e57-09ca-49ed-81a1-825dfb1905db', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'dd62ff63-1937-4452-870e-12889a418c39', 16, '자, 런웨이 시작!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c2b439f0-aba6-480d-a138-6914595e44bd', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '2da55ada-d682-496f-a50f-0336dd0d8c0a', 17, '(워킹) 어때요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0c7ec9fd-8e71-47ed-8b29-6ca64f30958d', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '4e7975f0-ad0b-4593-b51b-40757c29a9a2', 18, '오, 의외로 잘 어울린다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('958f94df-2ec9-422d-b7f8-993fe52d4f47', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'e59aef3e-09c8-4ce3-a24b-f5e365ca69b1', 19, '(등장) 자, 봐.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d2488385-d2d5-4111-8ba1-2ddd10735d5b', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'ecdf221a-48e1-4222-add8-ca74a283be90', 20, '와, 멋있어요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('14b98dfd-e851-449d-8200-166984733a9b', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', 'dd62ff63-1937-4452-870e-12889a418c39', 21, '실력 차이 보여줬다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('52400d45-c599-40d7-8bdf-233e862a253f', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '4e7975f0-ad0b-4593-b51b-40757c29a9a2', 22, '근데 제 옷... 좀 이상하지 않아요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5fba6422-f983-4773-9677-ec3c414f7094', 'ef2adfc1-8e30-4cc7-afaf-b71ac3a9d6e3', '2da55ada-d682-496f-a50f-0336dd0d8c0a', 23, 'ㅋㅋㅋ 아니... 개성 있어!', NOW(), NOW());

-- HELIX > 퇴근 후 일상 (content_id=17)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('558ed574-84d3-42b2-8890-6c22d57a58f8', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '911bfe1b-641f-4543-836a-9f7f2f501182', 1, '(카메라 들고) 야, 다들 뭐 해?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('157cf88e-3d17-4a64-bf65-c9e92f28e302', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', 'c0688248-b96a-47fb-8a80-bd090f5f95e7', 2, '(소파에 누워서) 죽어있어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0fec2071-21ef-40f6-9a82-e528a0ea6466', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', 3, '저는 라면 끓여요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9308bcab-da94-47fb-9f72-2a38c8dc13be', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '62574b61-8c36-4c96-840a-52edf48e6fec', 4, '나도 줘.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('780f312e-adb5-48c1-b6cf-2e91be071a6c', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', 5, '본인이 끓여.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6e2de54e-baaa-474e-a791-96cf5b1b4785', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '4af69a6e-ec16-480b-90bf-b0eba4a8981f', 6, '(피아노 치며) 저는 좀 쉬면서요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0b22bda5-4a6e-436d-8aae-f2c7ff4bb0b0', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '911bfe1b-641f-4543-836a-9f7f2f501182', 7, '와, 오늘 콘서트 어땠어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('34320452-8a06-4287-b9cd-2eb6c6e71424', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', 'c0688248-b96a-47fb-8a80-bd090f5f95e7', 8, '진짜 행복했어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1686e3a3-1c40-4980-9750-99269bd90e1c', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '62574b61-8c36-4c96-840a-52edf48e6fec', 9, '앵콜 때 현 울었잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('09347e3e-3efd-4c31-a4c5-e718f8dc606c', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '4af69a6e-ec16-480b-90bf-b0eba4a8981f', 10, '(연주 멈추며) 그건 비밀!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('afb30a6d-b5e0-47c5-9a71-14d49378ee67', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', 11, 'ㅋㅋㅋ 이미 다 봤어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4514a8fd-838d-44a5-8ac2-9aeb99c6a089', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', 12, '(먹으며) 이게 진짜 행복이지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1106e401-1140-4f3d-960f-f8ad0a654403', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '62574b61-8c36-4c96-840a-52edf48e6fec', 13, '콘서트 끝나고 먹는 라면...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('47cd8113-5b27-473b-b33f-9cfc5579e23c', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '911bfe1b-641f-4543-836a-9f7f2f501182', 14, '팬분들 오늘 진짜 대단했어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('80132050-4c1c-4585-af20-55a29ec4efb3', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', 'c0688248-b96a-47fb-8a80-bd090f5f95e7', 15, '맞아, 떼창 소름 돋았어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('454cb020-c76a-4d12-b297-de4b07226b3f', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '4af69a6e-ec16-480b-90bf-b0eba4a8981f', 16, '우리 때문에 그렇게 응원해 주시는 거잖아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cf8c1bd1-26dc-4647-b45e-4e6060314f8d', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '62574b61-8c36-4c96-840a-52edf48e6fec', 17, '우리 더 열심히 해야지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('08cb9735-d62b-4076-87ff-efbf9cee9116', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', 18, '일단 라면 먹고.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5071f1d8-07ad-4c55-bb1b-247bac9826fd', 'ba12732d-0e07-4ba3-9d8d-82c3b4714578', '911bfe1b-641f-4543-836a-9f7f2f501182', 19, 'ㅋㅋㅋ 그래, 먼저 먹자.', NOW(), NOW());

-- HELIX > 요리 대결 (content_id=23)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('16255510-91a8-4c35-a7dc-5a2f8dec5e19', '014c9834-a8ca-4404-9229-294e8053db1d', NULL, 1, '[MC] 오늘의 미션! 제한시간 30분, 주제는 ''집밥''!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8a7b2177-db3b-4585-8a83-06c603f9d21e', '014c9834-a8ca-4404-9229-294e8053db1d', '4af69a6e-ec16-480b-90bf-b0eba4a8981f', 2, '집밥이면 뭐 하지?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('708f4b24-da66-4955-a968-f90417484a04', '014c9834-a8ca-4404-9229-294e8053db1d', '62574b61-8c36-4c96-840a-52edf48e6fec', 3, '나 김치찌개 할래.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3b70d285-6757-4f3e-93aa-214b4cb4ee9f', '014c9834-a8ca-4404-9229-294e8053db1d', '911bfe1b-641f-4543-836a-9f7f2f501182', 4, '저는 계란말이요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f1b00a01-4f7b-464e-803b-6e54df81cfbc', '014c9834-a8ca-4404-9229-294e8053db1d', '9c8a8e2c-d91d-47d6-b631-c8e3a403c32e', 5, '저도 김치찌개 하려고 했는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('59436bac-3a10-4248-aeac-3960051adf04', '014c9834-a8ca-4404-9229-294e8053db1d', '62574b61-8c36-4c96-840a-52edf48e6fec', 6, '안 돼, 내가 먼저 말했어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ed2baa08-9acf-4a5e-b6a6-019732146221', '014c9834-a8ca-4404-9229-294e8053db1d', '4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', 7, '저는 볶음밥이요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c9200b78-508b-449c-a3fc-b73b80dc082c', '014c9834-a8ca-4404-9229-294e8053db1d', '4af69a6e-ec16-480b-90bf-b0eba4a8981f', 8, '그럼 나는 된장찌개.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e3a937fc-30bd-4582-b0a8-95401a891780', '014c9834-a8ca-4404-9229-294e8053db1d', '911bfe1b-641f-4543-836a-9f7f2f501182', 9, '(계란 깨다가) ...껍데기 들어갔다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('69123acb-4414-4cc9-8797-901bf7756bc3', '014c9834-a8ca-4404-9229-294e8053db1d', '9c8a8e2c-d91d-47d6-b631-c8e3a403c32e', 10, 'ㅋㅋㅋ 꺼내요 빨리!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3e1f223e-07cc-482e-bd2f-37e94350834b', '014c9834-a8ca-4404-9229-294e8053db1d', '62574b61-8c36-4c96-840a-52edf48e6fec', 11, '(김치 볶으며) 음, 좋은 냄새.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ed626899-a3a5-474e-87be-c2b0a0cba539', '014c9834-a8ca-4404-9229-294e8053db1d', '4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', 12, '(볶음밥 뒤집기 시도) 하!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('190459f5-42af-4172-80af-cd7720468f15', '014c9834-a8ca-4404-9229-294e8053db1d', NULL, 13, '[연출] (볶음밥이 반만 뒤집어짐)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b350d6de-a2fc-475f-9ae5-e7f9cca62a62', '014c9834-a8ca-4404-9229-294e8053db1d', '4af69a6e-ec16-480b-90bf-b0eba4a8981f', 14, '아까워!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('616c6f74-423c-4680-8d20-24c96fa265fe', '014c9834-a8ca-4404-9229-294e8053db1d', '4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', 15, '반이라도 성공이죠?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('377a97e4-fd25-41df-a9be-f187db188623', '014c9834-a8ca-4404-9229-294e8053db1d', '9c8a8e2c-d91d-47d6-b631-c8e3a403c32e', 16, '긍정적이다...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6aee324d-a937-478a-9b48-35eab72e953f', '014c9834-a8ca-4404-9229-294e8053db1d', '4af69a6e-ec16-480b-90bf-b0eba4a8981f', 17, '자, 다 완성!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fc2fb1ce-dce6-4e0b-b5ef-960d295c6bfc', '014c9834-a8ca-4404-9229-294e8053db1d', '911bfe1b-641f-4543-836a-9f7f2f501182', 18, '제 계란말이 좀 탔는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('31af7e59-f8cb-42cb-b7b6-d00bd98ef3b3', '014c9834-a8ca-4404-9229-294e8053db1d', '62574b61-8c36-4c96-840a-52edf48e6fec', 19, '맛으로 승부 보자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3e80a499-a482-49bb-951d-1017aad01763', '014c9834-a8ca-4404-9229-294e8053db1d', '9c8a8e2c-d91d-47d6-b631-c8e3a403c32e', 20, '(맛보며) 어, 의외로 다 맛있다?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('425ea1cf-bea2-400b-a965-e2a89ea6ce01', '014c9834-a8ca-4404-9229-294e8053db1d', '4e3df3a6-f12a-4c32-82e6-2f028d8f6bae', 21, '배고팠나 봐.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('eab91a0d-f588-4420-9323-d6f8e2c899d7', '014c9834-a8ca-4404-9229-294e8053db1d', NULL, 22, '[전원] ㅋㅋㅋㅋ', NOW(), NOW());

-- NOVA > 소원 풍선 (content_id=28)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d7206d8d-fce1-4e8e-abb4-0ba6d3666474', '54d06684-5edc-4d0c-8773-8513b072587c', '50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 1, '자, 각자 풍선에 소원 쓰는 거야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('20e4a0d0-a016-4070-b38b-7e119413c184', '54d06684-5edc-4d0c-8773-8513b072587c', '81da7fd2-4731-4329-b248-01c18194a28a', 2, '진지한 소원이어야 해?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ff1d3239-cd42-48a0-8db0-9e4fb659d708', '54d06684-5edc-4d0c-8773-8513b072587c', 'ac54b606-dda4-44e3-a7d2-2aa449a4b04e', 3, '아무거나 괜찮지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4375077e-655a-4a78-b2ab-990ace554229', '54d06684-5edc-4d0c-8773-8513b072587c', 'aaf909f2-f335-4bd3-aa87-196333a06d50', 4, '저 다 썼어요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('86a4092f-b8a6-4519-84b5-e8a7e88d141b', '54d06684-5edc-4d0c-8773-8513b072587c', 'b1a326f9-1a5f-4c86-a3d5-ba531371efb6', 5, '뭐라고 썼어요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('491dbe5b-08b4-4c5b-945f-c5f03e7a3e8e', '54d06684-5edc-4d0c-8773-8513b072587c', 'aaf909f2-f335-4bd3-aa87-196333a06d50', 6, '비밀!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7c4e56cb-5f96-452c-8b0f-f41e1d12361a', '54d06684-5edc-4d0c-8773-8513b072587c', '50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 7, '나도 다 썼다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('72edf683-45f5-4bdb-82a8-48a20a7091cd', '54d06684-5edc-4d0c-8773-8513b072587c', '81da7fd2-4731-4329-b248-01c18194a28a', 8, '저도요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('90847860-db9f-4908-b849-3527e475f230', '54d06684-5edc-4d0c-8773-8513b072587c', 'ac54b606-dda4-44e3-a7d2-2aa449a4b04e', 9, '자, 하나씩 읽어볼까?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a0d2f626-31d0-470f-91fd-8a4b061e4498', '54d06684-5edc-4d0c-8773-8513b072587c', 'b1a326f9-1a5f-4c86-a3d5-ba531371efb6', 10, '부끄러운데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('89654c18-ad3d-4f04-9671-c35338d384d6', '54d06684-5edc-4d0c-8773-8513b072587c', '50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 11, '(읽음) "1위 하고 싶다."', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('00d9376b-98cf-44aa-a2da-fb023814bc9a', '54d06684-5edc-4d0c-8773-8513b072587c', '81da7fd2-4731-4329-b248-01c18194a28a', 12, '직접적이네요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('da2ffed5-7275-4b1d-94d0-110850e1b8a0', '54d06684-5edc-4d0c-8773-8513b072587c', 'ac54b606-dda4-44e3-a7d2-2aa449a4b04e', 13, '(읽음) "다 같이 건강하자."', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('aa31e124-4a07-42d2-bd04-89f2483faa0b', '54d06684-5edc-4d0c-8773-8513b072587c', 'aaf909f2-f335-4bd3-aa87-196333a06d50', 14, '멋있어요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8ace9a71-02c3-4a78-bcaf-8738e615b10a', '54d06684-5edc-4d0c-8773-8513b072587c', 'b1a326f9-1a5f-4c86-a3d5-ba531371efb6', 15, '(읽음) "10년 후에도 같이 무대 서고 싶어요."', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('17dbb57b-ea9c-40b9-a88f-a74e02ffd190', '54d06684-5edc-4d0c-8773-8513b072587c', '50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 16, '...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('66b06b6c-063e-4dbf-82d4-124191277776', '54d06684-5edc-4d0c-8773-8513b072587c', '81da7fd2-4731-4329-b248-01c18194a28a', 17, '갑자기 눈물 나려고 하네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f4402dfa-6742-4515-994a-49e12a0dea12', '54d06684-5edc-4d0c-8773-8513b072587c', 'aaf909f2-f335-4bd3-aa87-196333a06d50', 18, '(읽음) "맛있는 거 많이 먹기."', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('67cb4ad4-1f9f-4b74-b095-79fb6473cfe3', '54d06684-5edc-4d0c-8773-8513b072587c', 'ac54b606-dda4-44e3-a7d2-2aa449a4b04e', 19, 'ㅋㅋㅋㅋ', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9974054d-c520-4f47-b4de-42d496a7f08b', '54d06684-5edc-4d0c-8773-8513b072587c', '81da7fd2-4731-4329-b248-01c18194a28a', 20, '(읽음) "후회 없는 활동 하기."', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ba3612c9-0461-4d56-aefa-bf43803b2399', '54d06684-5edc-4d0c-8773-8513b072587c', 'b1a326f9-1a5f-4c86-a3d5-ba531371efb6', 21, '다 좋은 소원이다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1168f7bd-2b33-492f-b342-9185e93b32a8', '54d06684-5edc-4d0c-8773-8513b072587c', '50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 22, '자, 날리자!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1de4a129-3073-41d6-acde-63fd5d5dd2f9', '54d06684-5edc-4d0c-8773-8513b072587c', NULL, 23, '[전원] (풍선 날림) 이루어져라!', NOW(), NOW());

-- NOVA > 어디까지 가봤니 (content_id=7)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f07e345e-e888-4cd0-af8c-02df6179fe31', '952cda0a-d535-4785-9d36-e430e0d41695', 'fefaa05d-e002-490f-8ffc-3de6350873e0', 1, '자, 부산까지 가는 교통수단 뽑자!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('80937c35-173f-4b73-9c0f-68574011528f', '952cda0a-d535-4785-9d36-e430e0d41695', 'ac54b606-dda4-44e3-a7d2-2aa449a4b04e', 2, '제발 KTX...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('54a3567e-eb73-4c95-ad96-184a70d73fdb', '952cda0a-d535-4785-9d36-e430e0d41695', '50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 3, '(돌림판 돌림) 빙글빙글...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8faf8525-bf48-4f36-86e7-958287ec75c2', '952cda0a-d535-4785-9d36-e430e0d41695', '81da7fd2-4731-4329-b248-01c18194a28a', 4, '버스! 버스!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('10fe41c3-5cb3-4063-b039-1b7889b5b8f0', '952cda0a-d535-4785-9d36-e430e0d41695', '6ac82333-27dc-4643-ba9b-f058358b825a', 5, '나는 비행기!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d96ec9f0-a03d-4b7d-bc35-c6f4cfa630f5', '952cda0a-d535-4785-9d36-e430e0d41695', NULL, 6, '[(결과] 자전거)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2cec49f8-8638-4fd2-8366-aa428572a2a7', '952cda0a-d535-4785-9d36-e430e0d41695', NULL, 7, '[전원] ............', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('989883e1-a36d-4294-a5f3-bdcd7d73526f', '952cda0a-d535-4785-9d36-e430e0d41695', 'fefaa05d-e002-490f-8ffc-3de6350873e0', 8, '자전거?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('52fcd21f-e4d2-44d8-8de5-67709d537f7c', '952cda0a-d535-4785-9d36-e430e0d41695', '50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 9, '서울에서 부산을?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('38b773f0-1995-41da-a8e5-97a09d459f4e', '952cda0a-d535-4785-9d36-e430e0d41695', 'ac54b606-dda4-44e3-a7d2-2aa449a4b04e', 10, '이거 며칠 걸려?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6bb4d1f6-8d24-44f5-849d-3a6f73ce94b4', '952cda0a-d535-4785-9d36-e430e0d41695', '6ac82333-27dc-4643-ba9b-f058358b825a', 11, '죽는다 우리...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e2dc9e6e-dd64-4349-a347-5cb3478f8d3d', '952cda0a-d535-4785-9d36-e430e0d41695', '81da7fd2-4731-4329-b248-01c18194a28a', 12, '아 잠깐, 다시 뽑으면 안 돼요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('da548f59-4003-4800-9022-0c60b51a5e98', '952cda0a-d535-4785-9d36-e430e0d41695', 'fefaa05d-e002-490f-8ffc-3de6350873e0', 13, '안 된대.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5e43d4dc-b76d-4d9d-95b2-16ef92844d4e', '952cda0a-d535-4785-9d36-e430e0d41695', '81da7fd2-4731-4329-b248-01c18194a28a', 14, '...ㅠㅠ', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f9e593bb-2dfa-412d-a69b-de16a48cb7e5', '952cda0a-d535-4785-9d36-e430e0d41695', '50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 15, '미션 성공! 교통수단 업그레이드래!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9d820dca-63db-45f5-8271-06bd5b7d9fa7', '952cda0a-d535-4785-9d36-e430e0d41695', 'ac54b606-dda4-44e3-a7d2-2aa449a4b04e', 16, '뭐로?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6caf58f5-6f7f-4d05-a5bb-10dabc9e4e6b', '952cda0a-d535-4785-9d36-e430e0d41695', NULL, 17, '[MC] 오토바이로 업그레이드!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b12b8c5e-0bc6-4dc0-bc27-ef2007d4ee24', '952cda0a-d535-4785-9d36-e430e0d41695', '6ac82333-27dc-4643-ba9b-f058358b825a', 18, '...그게 업그레이드야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('df1d995d-547d-4ca1-a386-f443ed9371f0', '952cda0a-d535-4785-9d36-e430e0d41695', 'fefaa05d-e002-490f-8ffc-3de6350873e0', 19, '자전거보단 낫지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('76a0d7a1-4e14-4575-a4b5-8bfef4d83142', '952cda0a-d535-4785-9d36-e430e0d41695', '81da7fd2-4731-4329-b248-01c18194a28a', 20, '타본 적도 없는데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('faa22434-bf39-4e78-8d5d-49e1220f6a1f', '952cda0a-d535-4785-9d36-e430e0d41695', '50de05e3-f5ef-4c4c-84d2-5fb42c59955a', 21, '야, 뒤에 타면 되잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('71ade951-6961-4f63-a904-96857f632b6b', '952cda0a-d535-4785-9d36-e430e0d41695', '81da7fd2-4731-4329-b248-01c18194a28a', 22, '(안도) 아, 그렇구나.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4790da9e-16cf-4900-97db-04221cb4a5c6', '952cda0a-d535-4785-9d36-e430e0d41695', 'ac54b606-dda4-44e3-a7d2-2aa449a4b04e', 23, '근데 오토바이 두 대야. 세 명은 여전히 자전거.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a3709232-0eff-4101-9d31-f0263300ad58', '952cda0a-d535-4785-9d36-e430e0d41695', '6ac82333-27dc-4643-ba9b-f058358b825a', 24, '누가 자전거야?!', NOW(), NOW());

-- FLORA > 올인원 (content_id=2)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('aae5c32a-fa9e-4736-9858-59af11753ed2', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'a95ac776-bfde-4a74-8db1-b179df1fc9da', 1, '100인분?! 100인분이요?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('55699598-9057-4704-9047-0abcb0b8bc32', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'f7673619-0504-4bdd-afb8-1cf0d018f472', 2, '우리 다섯이서?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('553f857d-fac0-47be-a08d-166e8e756aa5', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', '8db8a2dd-b36a-43f4-83d6-3ad2da013efc', 3, '일단 역할 분담하자. 누가 뭐 잘해?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4955c748-cad4-47b8-8c6b-91f00a1a5925', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', 4, '저 밥 잘 먹어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('99f0b255-aba1-4434-a8f5-7939d3a8c7aa', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', '820f22eb-8996-484e-a5bd-1d008e123bb7', 5, '그건 도움이 안 돼...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('03cf06fd-88f9-4bd7-a7df-2b9b89f3cbcc', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'a95ac776-bfde-4a74-8db1-b179df1fc9da', 6, '나 야채 썰기 할게.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('70be4707-63be-4bf9-8433-d08ba0c3814b', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'f7673619-0504-4bdd-afb8-1cf0d018f472', 7, '칼 잡을 줄 알아?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a5f50fb2-bb3f-4f46-9d36-e61b01db6d5d', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'a95ac776-bfde-4a74-8db1-b179df1fc9da', 8, '...유튜브 보면서 하면 되지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('547c8e30-4ce8-43d4-b99f-43d8d8bd2406', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', '820f22eb-8996-484e-a5bd-1d008e123bb7', 9, '야, 야, 야! 고추장이 없어!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('033def16-c1e8-4cda-b3de-dddcda69eb37', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', '8db8a2dd-b36a-43f4-83d6-3ad2da013efc', 10, '뭐?! 비빔밥인데 고추장이 없어?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('794ede7d-2fca-4179-b32b-98f8bbc64443', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', 11, '제가 달려갈게요! 슈퍼 어디예요?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cac3ad83-83c2-4c57-b4b0-f2db565efd10', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'a95ac776-bfde-4a74-8db1-b179df1fc9da', 12, '거기 10분 거리인데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('429c89a5-db17-4285-aacc-358b5197284c', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', 13, '5분 컷 가능! (뛰어나감)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ace472b8-534d-49ae-85af-06c8415574b2', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'f7673619-0504-4bdd-afb8-1cf0d018f472', 14, '와... 진짜 뛰네.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8b43586e-9f9f-4fa1-b661-d1cf0c25eb21', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', '820f22eb-8996-484e-a5bd-1d008e123bb7', 15, '잘 다녀와!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('7e6390ae-1186-4bb6-bf51-0281a22671bb', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', '8db8a2dd-b36a-43f4-83d6-3ad2da013efc', 16, '자, 이제 다 담았어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('06bcf95b-d8b0-4d11-8e96-ad1db5b73745', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'a95ac776-bfde-4a74-8db1-b179df1fc9da', 17, '네, 99번째 그릇 완료!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6f203d26-7666-49fd-8fcd-548c50613afb', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'f7673619-0504-4bdd-afb8-1cf0d018f472', 18, '100번째 누가 담아?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c645e4a2-2b09-46af-b983-26d63287ed5e', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', '820f22eb-8996-484e-a5bd-1d008e123bb7', 19, '다 같이 담자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8e00c620-546d-4d4e-84ca-2c2b77fef1bd', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', 20, '(숟가락 들고) 하나, 둘, 셋!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d97ce565-c118-4ced-ad11-087df4773d3d', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', NULL, 21, '[전원] 비빔밥 완성!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6e1d97a5-e613-4dba-a1d2-db145334bb2e', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'a95ac776-bfde-4a74-8db1-b179df1fc9da', 22, '(눈물) 우리가 해냈어...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('55f80977-26d6-4df2-8642-4cf09a95b32e', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'f7673619-0504-4bdd-afb8-1cf0d018f472', 23, '아직 먹어야 해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1441316d-1e9b-4197-bf28-237e3fa55331', 'df4542a0-cb4a-4b1f-8cda-ac08ad8b0b93', 'a95ac776-bfde-4a74-8db1-b179df1fc9da', 24, '...100인분을?', NOW(), NOW());

-- FLORA > 본격 수다타임 (content_id=6)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6169de47-c886-47a2-9146-cfd28e251e53', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', 'da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', 1, '자, 오늘의 주제. 10년 친구가 내 전 연인과 사귀겠대. 용서한다 vs 절교한다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('567e89e8-8f13-4b22-90dd-aae76a309c05', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '8db8a2dd-b36a-43f4-83d6-3ad2da013efc', 2, '당연히 절교지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0dab2e89-8e70-420f-93a9-7b73f32359cd', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '820f22eb-8996-484e-a5bd-1d008e123bb7', 3, '어? 저는 용서인데요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('93e9d4e4-c81c-449e-9fda-9547bfeda134', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '976c96da-fa3c-4e06-b6d5-f9cacfbd6ba6', 4, '진심이에요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('56c6d186-34c1-4b9b-8c3c-1441d983744a', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '820f22eb-8996-484e-a5bd-1d008e123bb7', 5, '이미 헤어진 사이잖아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('dcad97c0-62b3-4ca7-b16f-9c34c2b4e5bf', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', 'f7673619-0504-4bdd-afb8-1cf0d018f472', 6, '근데 10년 친구면... 음...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b3440877-0356-47a6-a35c-ae21a9cc2476', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', 'da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', 7, '아영는 뭐야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b8157dd5-3486-476a-8a15-3dcf3dcfaf09', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', 'f7673619-0504-4bdd-afb8-1cf0d018f472', 8, '저도 절교요. 친구가 먼저 말했어야죠.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('14995016-4991-4a16-8872-68ac85bc5c67', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '8db8a2dd-b36a-43f4-83d6-3ad2da013efc', 9, '맞아!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e4291856-a10d-43f9-a7a3-184ea9642bbc', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '820f22eb-8996-484e-a5bd-1d008e123bb7', 10, '아니, 헤어진 사람한테 허락을 왜 받아?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('29f98394-7fff-47e0-ba01-16aa9f185e2c', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '976c96da-fa3c-4e06-b6d5-f9cacfbd6ba6', 11, '그건 예의지!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('56f1479c-8410-45b7-a29f-8c0a6692469a', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '820f22eb-8996-484e-a5bd-1d008e123bb7', 12, '어휴, 답답해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('87feac25-ff99-4df3-a507-aa3d764bae1b', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', 'da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', 13, 'ㅋㅋㅋ 우리 팀 싸움 났다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b0d6ab46-3d62-405d-a3f7-c4c8fa1b65aa', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', 'da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', 14, '자, 오늘 고백 타임 주자는... 예린!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('aafc41c0-614c-48f0-a3ff-e74dbe8ffc74', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '976c96da-fa3c-4e06-b6d5-f9cacfbd6ba6', 15, '아... 저요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e2036aa7-d614-4ff6-81b5-7a74ffa52a9c', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '8db8a2dd-b36a-43f4-83d6-3ad2da013efc', 16, '숨긴 거 있어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ac7aa5c3-1b9e-432d-9a25-63e66f8bfab6', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '976c96da-fa3c-4e06-b6d5-f9cacfbd6ba6', 17, '사실... 저 아영 옷 몰래 입은 적 있어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e8507088-ee33-43ec-8efd-e421657a49f0', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', 'f7673619-0504-4bdd-afb8-1cf0d018f472', 18, '?!?!?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9ab3f64e-e8da-4a8a-831f-600cc4b9f381', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '820f22eb-8996-484e-a5bd-1d008e123bb7', 19, '뭐?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('df0e640e-04e1-4a24-8104-3f7bd24f49a8', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '976c96da-fa3c-4e06-b6d5-f9cacfbd6ba6', 20, '그... 그 후드티 너무 예뻐서...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('623dddda-c08d-4861-87e8-04de24fe4085', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', 'f7673619-0504-4bdd-afb8-1cf0d018f472', 21, '그래서 늘어났구나?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fc64fa18-1713-43cf-8d1b-b6451ef13ca7', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', '976c96da-fa3c-4e06-b6d5-f9cacfbd6ba6', 22, '미안...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('827248dc-7a35-4bff-aeca-401191b1ecfd', '9a3c6343-c41c-41cd-9cbd-725d8a0e0609', 'da25e4e9-85ff-4c6c-a7d7-9f84e8e69081', 23, 'ㅋㅋㅋㅋ 대참사.', NOW(), NOW());

-- TRACE > 하루만에 마스터 (content_id=14)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2a972bd8-9d8d-453f-b671-c809daa07434', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '80cd4bfd-c1b3-4977-91a2-783f1594123f', 1, '24시간 안에 저글링 5개 성공이래.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4c77a4c1-ed58-4dd2-b0de-a4beacb5df70', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '541836cc-5408-444d-9938-dea9f5f6e1ff', 2, '3개도 못 하는데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d4a17b24-73f8-461a-930f-0da4d0d604e4', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '99229657-c64d-4593-abf4-46fb7643617f', 3, '저 공 하나도 못 받아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('131fdb9e-2ae7-4beb-b452-903f64878c46', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '088654d7-907d-43c8-852f-45f319506ecb', 4, '일단 2개부터 시작하자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f49ae908-569f-45b6-810f-9dce26b37f8a', '86d800e9-b466-4f5b-825f-dd5728ed22b1', 'e5604d61-5512-4078-9ab0-3d57e3fac965', 5, '(2개 성공) 어, 되네?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e80a2e72-f1ba-451e-93c9-23f44a66335e', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '80cd4bfd-c1b3-4977-91a2-783f1594123f', 6, '오!!! 천재?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6eb4f2f8-5a58-407d-9e88-365542589e70', '86d800e9-b466-4f5b-825f-dd5728ed22b1', 'e5604d61-5512-4078-9ab0-3d57e3fac965', 7, '(3개 도전) ...아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('44478191-ff25-4714-9108-d70710f0d2a4', '86d800e9-b466-4f5b-825f-dd5728ed22b1', NULL, 8, '[연출] (공 다 떨어뜨림)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4a7ab4ca-5a91-471d-bc65-c2eac9676534', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '541836cc-5408-444d-9938-dea9f5f6e1ff', 9, '그렇지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4462fb27-56c5-44d8-861a-41417ae62f81', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '088654d7-907d-43c8-852f-45f319506ecb', 10, '(3개 성공) 야, 드디어 됐어!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9d10bb9e-1ccd-4158-89fa-e4abb49d7d03', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '99229657-c64d-4593-abf4-46fb7643617f', 11, '우와!!! 멋있어요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1f263f95-d065-42c7-abdc-3455dbf5748f', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '80cd4bfd-c1b3-4977-91a2-783f1594123f', 12, '나도 3개 됐어!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8a78d0d7-50d4-43cb-b8cd-aa1eda537b29', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '541836cc-5408-444d-9938-dea9f5f6e1ff', 13, '저도요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('dfa86d25-fc98-48b1-9205-4f6d5140de00', '86d800e9-b466-4f5b-825f-dd5728ed22b1', 'e5604d61-5512-4078-9ab0-3d57e3fac965', 14, '...나만 안 돼.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('13dd44db-3f08-4b45-ac33-a6b707a7cb0e', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '99229657-c64d-4593-abf4-46fb7643617f', 15, '화이팅!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3046cbf6-37b1-4409-a5bc-738ccf0cc3ad', '86d800e9-b466-4f5b-825f-dd5728ed22b1', 'e5604d61-5512-4078-9ab0-3d57e3fac965', 16, '(계속 연습) 제발...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5080b96b-1ee3-4195-b191-ff609dfd07c0', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '088654d7-907d-43c8-852f-45f319506ecb', 17, '12시간 남았어, 할 수 있어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3cc089f4-75bf-4309-b3c7-04220ffd54ba', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '80cd4bfd-c1b3-4977-91a2-783f1594123f', 18, '자, 5개 간다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d832e64c-0ed7-44bd-90a6-10f1ece173a6', '86d800e9-b466-4f5b-825f-dd5728ed22b1', NULL, 19, '[전원] (집중)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('55cf4d0a-1f0f-4f97-8234-c8c67e5bdc27', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '80cd4bfd-c1b3-4977-91a2-783f1594123f', 20, '(성공) 우와!!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('976e8ab5-6441-42a2-aea7-708e703f7f68', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '541836cc-5408-444d-9938-dea9f5f6e1ff', 21, '합격!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2ea382a8-e3dd-4756-baf4-9d766d06a064', '86d800e9-b466-4f5b-825f-dd5728ed22b1', 'e5604d61-5512-4078-9ab0-3d57e3fac965', 22, '(도전) ...!!!! (성공)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('49cf18a4-4609-4601-ac51-f22c850a30f2', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '99229657-c64d-4593-abf4-46fb7643617f', 23, '해냈어요!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ac0b1ecf-dbce-4557-ad32-d1dec4d52ea7', '86d800e9-b466-4f5b-825f-dd5728ed22b1', 'e5604d61-5512-4078-9ab0-3d57e3fac965', 24, '(눈물) 24시간 동안 공만 봤더니...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b1825a25-ea68-467c-ab8a-b483a7669387', '86d800e9-b466-4f5b-825f-dd5728ed22b1', '088654d7-907d-43c8-852f-45f319506ecb', 25, '수고했어!', NOW(), NOW());

-- TRACE > 레벨업 챌린지 (content_id=13)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('32b74098-7a1e-452e-a877-ac091b18a17f', '152bcfb6-b58b-4b32-a74c-f10562daf12c', NULL, 1, '[강사] 먼저 에스프레소 추출해 보세요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('39d1e459-3ca7-4a0d-aa28-74944081de1d', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '088654d7-907d-43c8-852f-45f319506ecb', 2, '(도전) 이렇게요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4764379b-e5bf-46cb-8fcc-af9b0e765c39', '152bcfb6-b58b-4b32-a74c-f10562daf12c', NULL, 3, '[강사] 네, 좋아요. 합격!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f761dba0-e495-45d7-8174-fdbf31fc5c06', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '088654d7-907d-43c8-852f-45f319506ecb', 4, '오!!! 초급 뱃지!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('398b6188-92a2-487c-8166-84bcad72fdf3', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '21a07886-51d5-4d28-b542-eb8682480ffa', 5, '나도! (시도)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fc3d1bba-c480-4668-ac42-c0157db0c4ab', '152bcfb6-b58b-4b32-a74c-f10562daf12c', NULL, 6, '[연출] (물이 사방으로 튐)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a9dca211-970e-4d35-9d42-0b2ca9174739', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '36889030-51b5-4a4b-87e4-86bb833571a9', 7, 'ㅋㅋㅋㅋㅋ!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e039f5b4-5cf2-4585-9d34-19d3ed20538d', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '21a07886-51d5-4d28-b542-eb8682480ffa', 8, '왜 이래?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3f267eb9-b733-48cb-aef7-ef35b46feb40', '152bcfb6-b58b-4b32-a74c-f10562daf12c', NULL, 9, '[강사] 탬핑을 너무 세게 하셨어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('844be3f6-0309-469b-b3ce-dc7b9ffd5a09', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '80cd4bfd-c1b3-4977-91a2-783f1594123f', 10, '탬핑이 뭐예요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9afd62b1-e43f-4eab-9560-dc030487c8ba', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '6c4c2d98-3f94-4fd0-8d92-911db7c8999a', 11, '저도 몰라요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a39370c0-a7a8-40f5-9805-6d248dbbc593', '152bcfb6-b58b-4b32-a74c-f10562daf12c', NULL, 12, '[강사] 다시 설명해 드릴게요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('075c2e26-87bf-4e91-b680-9f409c635ca1', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '21a07886-51d5-4d28-b542-eb8682480ffa', 13, '(좌절) 난 커피 마시기만 할래...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5f676f7d-6f84-4ad2-ac5c-fc98ff380760', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '36889030-51b5-4a4b-87e4-86bb833571a9', 14, '와, 라떼 아트 어렵다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3a26ac27-e777-4db9-b509-490d43c1d323', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '088654d7-907d-43c8-852f-45f319506ecb', 15, '하트 아니고 콩나물 같아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('00eee1b9-3f25-4a54-bd63-7f78a6d4c9fc', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '36889030-51b5-4a4b-87e4-86bb833571a9', 16, '야!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5d87aa00-9c64-4aba-9520-84ad8b013eee', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '80cd4bfd-c1b3-4977-91a2-783f1594123f', 17, '저는 해봤어요! (보여줌)', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c6a5e2b0-265e-42bb-b469-a3504c8fb8be', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '6c4c2d98-3f94-4fd0-8d92-911db7c8999a', 18, '...이게 뭐예요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('b0371f08-4bb6-4394-9c34-f13371efb441', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '80cd4bfd-c1b3-4977-91a2-783f1594123f', 19, '나뭇잎이야!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('afbb2ac5-4f4c-4f10-9113-d76b8b691167', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '21a07886-51d5-4d28-b542-eb8682480ffa', 20, '어디가...?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5d4e9d92-95a4-4108-bbc3-6c7094a9e653', '152bcfb6-b58b-4b32-a74c-f10562daf12c', NULL, 21, '[강사] (웃으며) 열정이 좋으시네요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6cf36918-117d-49b8-af12-c054a22d9751', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '80cd4bfd-c1b3-4977-91a2-783f1594123f', 22, '...칭찬이죠?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('01bb6c9a-eaf2-4a8a-88ea-aa2bde90b84b', '152bcfb6-b58b-4b32-a74c-f10562daf12c', '088654d7-907d-43c8-852f-45f319506ecb', 23, '아닌 것 같은데.', NOW(), NOW());

-- CREST > 즉석 노래방 (content_id=19)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('98893299-ad57-4a6a-99b2-39b64d3044bb', '4cef2e29-74b9-406e-8f96-032a055aec18', 'fabd1521-a95d-4b25-9ea9-11a32b52fffc', 1, '자, 오늘 노래방 대결이다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('57150e37-de79-44fd-872c-75595337091a', '4cef2e29-74b9-406e-8f96-032a055aec18', 'db3dfc74-1983-4f9c-a918-dc3683521cfd', 2, '랜덤 뽑기래. 뭐가 나올지 모름.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('545bc8ae-e9f7-46b0-ba2e-b716f175335e', '4cef2e29-74b9-406e-8f96-032a055aec18', '94e86623-eca9-4ba8-aa48-a3cddac44478', 3, '(뽑음) ...트로트?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6694b133-4d45-446e-8a89-3870ede64a3b', '4cef2e29-74b9-406e-8f96-032a055aec18', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 4, 'ㅋㅋㅋㅋ 대박.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a85cc59e-f2e8-40dd-987e-bf749124c6d9', '4cef2e29-74b9-406e-8f96-032a055aec18', '94e86623-eca9-4ba8-aa48-a3cddac44478', 5, '아니 왜 하필 트로트야!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('abb2dc8f-8d01-4235-8c1d-53796be91557', '4cef2e29-74b9-406e-8f96-032a055aec18', '17c36b49-29ec-4d69-b1d4-a1cb793371b3', 6, '괜찮아요, 감정 실어서 부르면 돼요!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e091e22a-d8be-48bc-9019-ae5b670a9f19', '4cef2e29-74b9-406e-8f96-032a055aec18', '94e86623-eca9-4ba8-aa48-a3cddac44478', 7, '(부르기 시작) ♪ 돌아와요 부산항에~ ♪', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('bc2e6f09-b9ba-426a-ab1a-c28889e64c32', '4cef2e29-74b9-406e-8f96-032a055aec18', 'fabd1521-a95d-4b25-9ea9-11a32b52fffc', 8, '...의외로 잘하는데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('87961849-2470-4d6a-8923-8affd1f15c4e', '4cef2e29-74b9-406e-8f96-032a055aec18', 'db3dfc74-1983-4f9c-a918-dc3683521cfd', 9, '소름 돋았어 진짜.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1d154445-fb56-4351-9053-e1de51afb8e8', '4cef2e29-74b9-406e-8f96-032a055aec18', '17c36b49-29ec-4d69-b1d4-a1cb793371b3', 10, '(뽑음) 랩이요?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ab7998f6-c12d-41bb-9cc5-6df059b9cafc', '4cef2e29-74b9-406e-8f96-032a055aec18', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 11, '랩 할 줄 알아?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0f8a2a6b-64cd-4313-8c18-eda2f4bc2f18', '4cef2e29-74b9-406e-8f96-032a055aec18', '17c36b49-29ec-4d69-b1d4-a1cb793371b3', 12, '평소에 좀 연습했어요...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('774f7eee-c9e2-45b6-afe2-1c86ec11ac02', '4cef2e29-74b9-406e-8f96-032a055aec18', 'fabd1521-a95d-4b25-9ea9-11a32b52fffc', 13, '오, 진짜?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fc9b1823-38a6-4e58-853c-3ac4d1d43599', '4cef2e29-74b9-406e-8f96-032a055aec18', '17c36b49-29ec-4d69-b1d4-a1cb793371b3', 14, '(랩 시작) ♪ yeah, yeah~ ♪', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('82f8c083-e354-421f-8d8b-6333527bbd7c', '4cef2e29-74b9-406e-8f96-032a055aec18', 'db3dfc74-1983-4f9c-a918-dc3683521cfd', 15, '와!!!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('60e0daea-95de-48ea-8e04-b32e2551f626', '4cef2e29-74b9-406e-8f96-032a055aec18', '94e86623-eca9-4ba8-aa48-a3cddac44478', 16, '숨겨진 재능 발견!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('81238779-84b9-4aa3-b676-f05db2b8aaa8', '4cef2e29-74b9-406e-8f96-032a055aec18', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 17, '우리 팀 에이스가 바뀌었다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a128a0db-6c6f-4101-8eb1-cf4776517ab9', '4cef2e29-74b9-406e-8f96-032a055aec18', 'fabd1521-a95d-4b25-9ea9-11a32b52fffc', 18, '야, 나도 잘한다고!', NOW(), NOW());

-- CREST > 탈출하라 24시 (content_id=12)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('14753a8c-affe-4fcf-b79b-83559d4aeb33', '89295d95-636a-4c89-b9e6-433d6c240067', 'fabd1521-a95d-4b25-9ea9-11a32b52fffc', 1, '자, 이 숫자가 뭔지 알아내야 해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e402cb8d-0582-4a27-a739-71af6897da77', '89295d95-636a-4c89-b9e6-433d6c240067', 'db3dfc74-1983-4f9c-a918-dc3683521cfd', 2, '3, 7, 15, 31... 규칙이 뭐지?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('94c18d4a-3663-4cee-ba93-e3303bc61f7b', '89295d95-636a-4c89-b9e6-433d6c240067', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 3, '2배 하고 1 더하는 거 아니에요?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('60eecd92-d3d7-42ef-8c63-6aca3b53b8f8', '89295d95-636a-4c89-b9e6-433d6c240067', '94e86623-eca9-4ba8-aa48-a3cddac44478', 4, '오, 그러네! 그럼 다음은 63?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('f8500619-833f-48e1-abd2-f2b8e68671e7', '89295d95-636a-4c89-b9e6-433d6c240067', '17c36b49-29ec-4d69-b1d4-a1cb793371b3', 5, '(자물쇠에 입력) 안 열려요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9167e765-41e3-449d-b02e-e0b2c1992942', '89295d95-636a-4c89-b9e6-433d6c240067', 'fabd1521-a95d-4b25-9ea9-11a32b52fffc', 6, '뭐?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2a062858-ab72-4154-8144-404b8736c626', '89295d95-636a-4c89-b9e6-433d6c240067', 'db3dfc74-1983-4f9c-a918-dc3683521cfd', 7, '잠깐, 다시 보자...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('4887671f-bd7b-41a2-8162-e211b483ce55', '89295d95-636a-4c89-b9e6-433d6c240067', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 8, '아, 2배가 아니라 2를 더하고 곱하기 2인가?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9ded04d6-17b2-4968-862e-eb1835f2fd3f', '89295d95-636a-4c89-b9e6-433d6c240067', '94e86623-eca9-4ba8-aa48-a3cddac44478', 9, '그게 뭐가 달라?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('67316861-bb3a-4aa7-8a3e-67b8b36d2cec', '89295d95-636a-4c89-b9e6-433d6c240067', '17c36b49-29ec-4d69-b1d4-a1cb793371b3', 10, '(다시 시도) ...열렸다!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fe16ed5b-c4ff-4e27-93e0-7d262484d687', '89295d95-636a-4c89-b9e6-433d6c240067', 'fabd1521-a95d-4b25-9ea9-11a32b52fffc', 11, '우와!!! 유찬 천재!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c2779ef7-b42c-4b89-850b-9fa76182e532', '89295d95-636a-4c89-b9e6-433d6c240067', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 12, '(뿌듯) 수학 1등급의 힘.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('40a678f0-18d1-424a-b40c-cf22d8e2fad1', '89295d95-636a-4c89-b9e6-433d6c240067', 'db3dfc74-1983-4f9c-a918-dc3683521cfd', 13, '수능 3등급이었잖아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6f268994-e19f-4962-8270-5c0d929cc630', '89295d95-636a-4c89-b9e6-433d6c240067', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 14, '...조용히 해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ad57e5d8-153c-4536-b9c7-628a3e8fea43', '89295d95-636a-4c89-b9e6-433d6c240067', '94e86623-eca9-4ba8-aa48-a3cddac44478', 15, '이거 진짜 모르겠는데, 힌트 쓸까?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fa09839a-27e7-4ddd-bfb3-273d475ec36e', '89295d95-636a-4c89-b9e6-433d6c240067', '17c36b49-29ec-4d69-b1d4-a1cb793371b3', 16, '아직 2개 남았잖아요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2683456d-2838-4681-b23b-310020566ff2', '89295d95-636a-4c89-b9e6-433d6c240067', 'fabd1521-a95d-4b25-9ea9-11a32b52fffc', 17, '근데 시간이 10분밖에 안 남았어.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('fe0bf85f-79b9-421e-837c-a3efb58ae589', '89295d95-636a-4c89-b9e6-433d6c240067', 'db3dfc74-1983-4f9c-a918-dc3683521cfd', 18, '쓰자!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2adb85eb-3bf8-4c02-9cce-4be0b2df2485', '89295d95-636a-4c89-b9e6-433d6c240067', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 19, '잠깐, 내가 한 번만 더 생각해 볼게.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d31d6436-0c21-47d6-80c6-855adab141ea', '89295d95-636a-4c89-b9e6-433d6c240067', '94e86623-eca9-4ba8-aa48-a3cddac44478', 20, '아까도 그러더니 5분 날렸잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ead2d700-8ed6-43ad-9cd6-182940f00abe', '89295d95-636a-4c89-b9e6-433d6c240067', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 21, '이번엔 진짜!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('648a5d83-7a5d-4c64-97dc-f5d1dcdd9686', '89295d95-636a-4c89-b9e6-433d6c240067', 'fabd1521-a95d-4b25-9ea9-11a32b52fffc', 22, '...30초 준다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d0c84681-3bcd-42d3-ba10-8f35c082b138', '89295d95-636a-4c89-b9e6-433d6c240067', '8e40a83a-8141-4d10-aa18-5250f34e53e0', 23, '(열심히 보다가) ...쓰자.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('79bc5366-096d-43f7-bb1c-e51094cf475d', '89295d95-636a-4c89-b9e6-433d6c240067', NULL, 24, '[전원] ㅋㅋㅋㅋㅋ', NOW(), NOW());

-- FLEUR > 런앤헌트 (content_id=3)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('659d5788-47ca-45f1-bac9-2123dfa93847', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', NULL, 1, '[MC] 오늘의 헌터는... 보미!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('9d2422dc-af70-4d25-96ec-e26d1c67e525', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '3ee04abf-027c-40b6-8c4a-7a9e3631f466', 2, '(선글라스 쓰며) 다 잡는다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('57430317-acd0-4737-946a-4f17528f1e99', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', 'a44b190d-3eb8-4f1b-b24f-cbcbd71c0484', 3, '하필 제일 빠른 사람이...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('27e93856-8713-4177-9ada-89fb5803605b', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '2a0d700c-d059-444e-8eab-af907260226d', 4, '도망쳐!!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5ad20736-442a-4942-99ed-60d4129ec80c', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '9a1b46ed-4a66-499a-9eb0-f09fc5a8502e', 5, '작전! 일단 흩어져!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('e6614446-d43c-4797-bff5-2a5bcf1f66c9', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '73710e56-1da0-43e8-bda1-e65841c76412', 6, '어디로?!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('55abe454-9f5e-4ddd-ba5c-bcdd26ebd5ca', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '9a1b46ed-4a66-499a-9eb0-f09fc5a8502e', 7, '아무 데나!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('a92bab04-5ea2-43e0-b0d7-2e529d435739', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '2a0d700c-d059-444e-8eab-af907260226d', 8, '(속삭임) 야, 세은야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('83280457-8754-4e08-92c0-5adb71618471', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', 'a44b190d-3eb8-4f1b-b24f-cbcbd71c0484', 9, '(속삭임) 왜?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('cfb106ba-bd0f-44f8-b4fd-840c6a11872e', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '2a0d700c-d059-444e-8eab-af907260226d', 10, '여기 창고 안전한 것 같아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('8edd1c9d-b988-450b-a69b-c135dd5100c5', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', 'a44b190d-3eb8-4f1b-b24f-cbcbd71c0484', 11, '근데 아까 보미가 이쪽으로 온 것 같은데...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('eb2c13ff-cb11-4773-8575-652dc04b2a44', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '2a0d700c-d059-444e-8eab-af907260226d', 12, '...뭐?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2f3f86ad-85b7-4d95-b054-68fb61f707fb', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '3ee04abf-027c-40b6-8c4a-7a9e3631f466', 13, '(문 열며) 찾았다.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6f3d4cea-68cd-4e44-aa7b-8eda9875e3dd', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '2a0d700c-d059-444e-8eab-af907260226d', 14, '으아아아악!!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('841cb198-a29d-4200-bd8a-735f68ccd805', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', 'a44b190d-3eb8-4f1b-b24f-cbcbd71c0484', 15, '(혼자 탈출) 살았다...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('2b86ee30-73d9-4f95-9c81-18bdba4bef73', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '9a1b46ed-4a66-499a-9eb0-f09fc5a8502e', 16, '미션 카드 뭐야?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('3e77bfac-5e95-4405-bc45-cb4d9a0c03e2', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '73710e56-1da0-43e8-bda1-e65841c76412', 17, '''교실에서 교과서 3권 찾기''래요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6398c23d-b8a0-4059-a9f4-69014ee30605', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '9a1b46ed-4a66-499a-9eb0-f09fc5a8502e', 18, '여기 교실이 열 개는 되는데?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1ab4b396-96ce-48c7-a797-f810bc10af68', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '73710e56-1da0-43e8-bda1-e65841c76412', 19, '빨리 찾아요, 보미 온다!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('ef730b51-b94a-48ac-9dba-727e543ee7de', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '9a1b46ed-4a66-499a-9eb0-f09fc5a8502e', 20, '(책상 뒤지며) 국어, 수학... 하나 더!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('0cd09ddd-0791-4ad7-ad0f-572a57ea4bd8', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '3ee04abf-027c-40b6-8c4a-7a9e3631f466', 21, '(복도에서) 누구 있어~?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d7f7c7ba-58f4-4715-bdb0-178ced400fe6', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '73710e56-1da0-43e8-bda1-e65841c76412', 22, '(책 집어들며) 과학! 도망쳐요!!', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6a983f5f-f726-4d81-8ce1-cbd67e5c24aa', '434bd47b-15e1-434a-a995-efd3fd5ad6b6', '9a1b46ed-4a66-499a-9eb0-f09fc5a8502e', 23, '보호막 획득! 살았어!!', NOW(), NOW());

-- FLEUR > 멤버네컷 (content_id=16)
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d4698bc7-73eb-4989-8030-54ff422beee9', '6c5aea92-1b61-4592-a283-67336a593296', '34a73008-2c42-4c87-b9d6-131241bb2d7d', 1, '과거요... 연습생 시절이 생각나요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1370bc84-fe67-4e5d-af1e-2668640e8bc2', '6c5aea92-1b61-4592-a283-67336a593296', '349474c7-540c-4030-b45b-98591ca6816c', 2, '(인터뷰어) 그때 어땠어?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('06a25097-7997-4988-bd8a-0966f204ee33', '6c5aea92-1b61-4592-a283-67336a593296', '34a73008-2c42-4c87-b9d6-131241bb2d7d', 3, '진짜 힘들었죠. 다들 없었으면 못 버텼을 거예요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5e323449-d9cf-40a3-be8e-b3419c7f3a2b', '6c5aea92-1b61-4592-a283-67336a593296', 'a44b190d-3eb8-4f1b-b24f-cbcbd71c0484', 4, '(영상 메시지) 단비야, 너 연습생 때 맨날 울었잖아.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('5b6c8d6e-4ec2-4e58-a0cb-24ec69e0d25c', '6c5aea92-1b61-4592-a283-67336a593296', '34a73008-2c42-4c87-b9d6-131241bb2d7d', 5, 'ㅋㅋㅋ...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('120ceca0-a4b3-4d6c-9dd8-d3c7ad300a16', '6c5aea92-1b61-4592-a283-67336a593296', 'a44b190d-3eb8-4f1b-b24f-cbcbd71c0484', 6, '근데 지금은 진짜 많이 컸어. 자랑스러워.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('55854777-491c-4451-8313-5588fce34d53', '6c5aea92-1b61-4592-a283-67336a593296', '34a73008-2c42-4c87-b9d6-131241bb2d7d', 7, '(눈물) 아 왜 울려...', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('384ab6e3-787c-4b96-9ea6-65ef88f5225b', '6c5aea92-1b61-4592-a283-67336a593296', '349474c7-540c-4030-b45b-98591ca6816c', 8, '자, 비밀 하나 공개해.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('6e8ea7bb-e0de-47b6-a11d-3731c7fe075a', '6c5aea92-1b61-4592-a283-67336a593296', '34a73008-2c42-4c87-b9d6-131241bb2d7d', 9, '음... 사실 데뷔 전에 포기하려고 했어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('d3d98190-adbe-4fc5-a94c-42af65af4f14', '6c5aea92-1b61-4592-a283-67336a593296', '349474c7-540c-4030-b45b-98591ca6816c', 10, '진짜?', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('34720d7f-d4b2-4e66-83b4-9a401c3986c3', '6c5aea92-1b61-4592-a283-67336a593296', '34a73008-2c42-4c87-b9d6-131241bb2d7d', 11, '네, 근데 미소가 밤새 얘기해 줬거든요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('c42dcd42-75d0-4cd9-8f8e-cf3cdf7dcc28', '6c5aea92-1b61-4592-a283-67336a593296', 'ed7a8fed-1ba2-45bb-b879-6c85c9a91987', 12, '(영상 메시지) 그때 네가 그만두면 나도 그만둔다고 했지.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('32538148-fae2-44c2-ad54-f8994a04dd80', '6c5aea92-1b61-4592-a283-67336a593296', '34a73008-2c42-4c87-b9d6-131241bb2d7d', 13, '그 말 듣고 다시 마음 잡았어요.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('1f041b06-f478-493f-9795-b7fb7bb83e70', '6c5aea92-1b61-4592-a283-67336a593296', '44848f30-4589-4b1c-b2f8-e527f716a9a1', 14, '(영상 메시지) 우리 단비 안 그만둬서 다행이야.', NOW(), NOW());
INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)
  VALUES ('85c7a8b9-3e92-4a9a-9011-aa495f6a7414', '6c5aea92-1b61-4592-a283-67336a593296', '34a73008-2c42-4c87-b9d6-131241bb2d7d', 15, '(눈물) 너무해, 왜 다 울려...', NOW(), NOW());

COMMIT;

-- 총 aidols: 20개
-- 총 companions: 132개
-- 총 aidol_highlights: 40개
-- 총 highlight_messages: ~867개

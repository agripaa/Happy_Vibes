CREATE TABLE `users_data` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255),
  `username` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `followerCount` int,
  `followingCount` int,
  `verify` bool,
  `image_profile` int,
  `verify_id` int,
  `followerId` int,
  `followingId` int,
  `backgroundId` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `image_profile` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `url` varchar(255),
  `name_image` varchar(255),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `posting_data` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `name_img` varchar(255),
  `image_posting_id` int,
  `userId` int,
  `like` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `comments_data` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `comment` varchar(255),
  `userId` int,
  `postId` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `like_data` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `userId` int,
  `postId` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `follows` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `userId` int,
  `followerId` int,
  `followingId` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `backgrounds` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `url_bg` varchar(255),
  `name_bg` varchar(255),
  `userId` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `bug_report` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `title` varchar(255),
  `type_bug_id` varchar(255),
  `report` varchar(255),
  `userId` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `code_otps` (
  `id` int PRIMARY KEY,
  `userId` int NOT NULL,
  `otp` varchar(255),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `notifs` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `content_notif` varchar(255),
  `type_notif` varchar(255),
  `userId` int,
  `commentId` int,
  `followsId` int,
  `postId` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `random_photos` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `url` varchar(255),
  `name_img` varchar(255),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `type_bug` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `bug` varchar(80),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `sessions` (
  `sid` varchar(36),
  `expires` datetime,
  `data` text,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `tokens` (
  `id` int PRIMARY KEY,
  `userId` int,
  `token` varchar(255),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `stories` (
  `id` int PRIMARY KEY,
  `uuid` varchar(225) NOT NULL,
  `category_stories_id` int,
  `userId` int,
  `viewers_count` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `category_stories` (
  `id` int PRIMARY KEY,
  `uuid` varchar(225) NOT NULL,
  `catergory_story` varchar(255) NOT NULL,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `image_stories` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `url_stories` varchar(255),
  `name_image` varchar(255),
  `text_stories` varchar(255),
  `stories_id` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `text_stories` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `text_stories` varchar(255),
  `background_id` int,
  `font_id` int,
  `stories_id` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `background_stories` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `color_code` varchar(60),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `font_stories` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `type_font` varchar(255),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `report_account` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `category_report_acc_id` int,
  `userId` int,
  `user_reported` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `category_report_acc` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `category_report` varchar(255),
  `desc_category_report` text,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `bookmark_collection` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `name_collection` varchar(125) NOT NULL,
  `user_uuid` varchar(255),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `bookmark_posting` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `post_uuid` varchar(255),
  `bookmark_coll_id` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `image_posting` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `name_img` varchar(255),
  `url` varchar(255),
  `ratio_id` int,
  `postId` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `ratio_img_posting` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `ratio` varchar(50),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `chat_history` (
  `id` int PRIMARY KEY,
  `uuid` varchar(255) NOT NULL,
  `sender` int,
  `receiver` int,
  `message` text,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

ALTER TABLE `users_data` ADD FOREIGN KEY (`id`) REFERENCES `chat_history` (`receiver`);

ALTER TABLE `users_data` ADD FOREIGN KEY (`id`) REFERENCES `chat_history` (`sender`);

ALTER TABLE `bug_report` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `like_data` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `posting_data` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `like_data` ADD FOREIGN KEY (`postId`) REFERENCES `posting_data` (`id`);

ALTER TABLE `comments_data` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `comments_data` ADD FOREIGN KEY (`postId`) REFERENCES `posting_data` (`id`);

ALTER TABLE `backgrounds` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `follows` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `users_data` ADD FOREIGN KEY (`followerId`) REFERENCES `follows` (`followerId`);

ALTER TABLE `users_data` ADD FOREIGN KEY (`followingId`) REFERENCES `follows` (`followingId`);

ALTER TABLE `users_data` ADD FOREIGN KEY (`backgroundId`) REFERENCES `backgrounds` (`id`);

ALTER TABLE `code_otps` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `notifs` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `notifs` ADD FOREIGN KEY (`postId`) REFERENCES `posting_data` (`id`);

ALTER TABLE `notifs` ADD FOREIGN KEY (`commentId`) REFERENCES `comments_data` (`id`);

ALTER TABLE `notifs` ADD FOREIGN KEY (`followsId`) REFERENCES `follows` (`id`);

ALTER TABLE `users_data` ADD FOREIGN KEY (`verify_id`) REFERENCES `code_otps` (`id`);

ALTER TABLE `bug_report` ADD FOREIGN KEY (`type_bug_id`) REFERENCES `type_bug` (`id`);

ALTER TABLE `users_data` ADD FOREIGN KEY (`image_profile`) REFERENCES `image_profile` (`id`);

ALTER TABLE `text_stories` ADD FOREIGN KEY (`background_id`) REFERENCES `background_stories` (`id`);

ALTER TABLE `report_account` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `report_account` ADD FOREIGN KEY (`user_reported`) REFERENCES `users_data` (`id`);

ALTER TABLE `report_account` ADD FOREIGN KEY (`category_report_acc_id`) REFERENCES `category_report_acc` (`id`);

ALTER TABLE `text_stories` ADD FOREIGN KEY (`font_id`) REFERENCES `font_stories` (`id`);

ALTER TABLE `bookmark_collection` ADD FOREIGN KEY (`user_uuid`) REFERENCES `users_data` (`uuid`);

ALTER TABLE `bookmark_posting` ADD FOREIGN KEY (`bookmark_coll_id`) REFERENCES `bookmark_collection` (`id`);

ALTER TABLE `bookmark_posting` ADD FOREIGN KEY (`post_uuid`) REFERENCES `posting_data` (`uuid`);

ALTER TABLE `image_posting` ADD FOREIGN KEY (`ratio_id`) REFERENCES `ratio_img_posting` (`id`);

ALTER TABLE `posting_data` ADD FOREIGN KEY (`image_posting_id`) REFERENCES `image_posting` (`id`);

ALTER TABLE `tokens` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `stories` ADD FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`);

ALTER TABLE `stories` ADD FOREIGN KEY (`category_stories_id`) REFERENCES `category_stories` (`id`);

ALTER TABLE `text_stories` ADD FOREIGN KEY (`stories_id`) REFERENCES `stories` (`id`);

ALTER TABLE `image_stories` ADD FOREIGN KEY (`stories_id`) REFERENCES `stories` (`id`);

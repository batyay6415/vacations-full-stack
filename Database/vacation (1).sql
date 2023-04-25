-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2023 at 08:31 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation`
--
CREATE DATABASE IF NOT EXISTS `vacation` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(4, 'batya', 'yerushalmi', 'batya6415@gmail.com', 'by3698', 1),
(5, 'shira', 'levi', 'shiral1478@gmail.com', 'shirle25', 2),
(6, 'noa', 'cohen', 'noacho25@gmail.com', 'noa58', 2),
(7, 'Hila', 'Nave', 'Hila254@gmail.com', '12345', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(1500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Rome', '\r\nOne of the best things about Rome is that many of its sites are small and easily walkable.\r\nOn a two-hour guided walking tour in small groups, you will see the city\'s attractions and learn about interesting architectural buildings. From the famous Spanish Steps to Piazza Navona, you should brag about visiting all the famous places in Rome.\r\nExplore Rome\'s baroque fountains and piazzas and admire architecture dating from the Roman Empire, through the Renaissance and beyond. Don\'t forget to throw a coin in the Trevi Fountain - according to legend, this will ensure you visit Rome again.', '2023-06-01', '2023-06-06', 1931, '7120c2a4-74c7-43d3-9526-4a0ab7035e09.jpg'),
(2, 'Dubai', '\r\nDubai and Las Vegas have a lot in common. Both cities share a love for the fantastical, with skylines that shine like beacons against barren desert backdrops. People from all over the world flock to these shimmering oases with the same goal: to play hard. But as a vacation spot, Dubai easily trumps ol\' Sin City thanks to its gorgeous cream-colored Persian Gulf shoreline, international culinary scene and larger-than-life attractions. And the city\'s still growing; plans are underway for something bigger and better. At one point, it was estimated that a quarter of the world\'s construction cranes could be found here. If that\'s any sign, even the sky may not be able to limit Dubai\'s growth.\r\n\r\nDubai is a city of superlatives, home to the world\'s tallest tower, one of the world\'s largest shopping malls, and one of the world\'s largest man-made marinas… but on a smaller scale, this emirate is still tied to its days as a modest port town. Traditional wooden abras (boats) float past motorboats on Dubai Creek, the natural sands of Jumeirah Public Beach fringe the carefully sculpted Palm Islands, and the bustling Gold and Spice Souks (marketplaces) thrive amid the larger-than-life Dubai Mall. Despite constantly looking to the future, this city isn\'t quick to let go of its past. It\'s this dynamic that not only put Dubai on the tourist map but will also keep it there.', '2023-06-04', '2023-06-13', 2580, '303b03c5-88ce-4d04-a573-299d55ea0324.jpg'),
(3, 'Barcelona', 'Barcelona contains both the authentically historic and the wildly bizarre. From the scenic trails of the colorful Park Güell to the romantic narrow alleys of Barri Gòtic; from the beachside nightclubs to the city\'s dozens of sacred churches and architectural marvels, this city by the sea seems to attract all types: the adventurer, the couple, the partier, the culture lover – and more – with an almost overwhelming variety of things to do. You could stay for a few days, but chances are you\'ll need a whole week to explore.\r\n\r\nIn Barcelona, even the beach is bustling, but it\'s really the cosmopolitan city that gets all the attention. Much of the activity revolves around Las Ramblas, a series of narrow streets and alleys packed with restaurants, nightclubs and a vibrant pedestrian market. But you should also take a tour of Antoni Gaudí\'s masterpieces; Gaudí is responsible for sites like Casa Milà, Casa Batlló and La Sagrada Familia. You also shouldn\'t miss out on the eclectic shopping scene and the region\'s exquisite food and wine. You see why we suggest a week vacation? To get a lay of the land, consider signing up for one of the city\'s best guided tours.', '2023-06-12', '2023-06-16', 962, '6886dc32-9bb6-4d54-9e89-500b74dbd304.jpg'),
(4, 'Maldives', 'you\'ve seen photos of the Maldives before: picture-perfect private villas suspended over striking blue waters, alabaster white sand beaches and spectacular sunsets dipping into the horizon. The scenic beauty of the Maldives is something to behold, something you can\'t quite understand until you\'re there in person.\r\n\r\nThe island nation of the Maldives is popular with honeymooners looking for seclusion and adventurers looking to explore the depths of the sea on a scuba diving and snorkeling excursion. Travelers seeking relaxation can unwind at one of the island spas and all visitors should certainly spend a day exploring the Maldivian capital of Malé. The hotels in this region are also spectacular, ranging from underwater hotels to overwater bungalows to incredibly beautiful resorts. However, getting to and staying in this tropical paradise requires patience (there are no direct flights from the United States) and plentiful cash. Located between the Arabian and Laccadive seas, roughly 500 miles southwest of Sri Lanka, the Maldives is about as isolated as you can get – and that\'s just another one of its many allures.\r\n', '2023-06-18', '2023-06-23', 1870, 'a3b3ee2c-5d07-4272-be32-ec7d125aa1f8.jpg'),
(5, 'Paruge', 'A prosperous and bustling city, Prague now attracts more tourists than ever. But its picturesque downtown veils both a dark legacy and a resilient past. Dating back to about A.D. 870, Prague has withstood numerous overthrows, invasions, fires and floods. It\'s this reputation for survival and perseverance that has made the Czech capital so fascinating. Today, its storied churches, narrow streets, daunting hilltop castle and statue-lined bridges create the scene of an urban fairy tale. Even the most jaded traveler would have trouble resisting this city\'s charms.\r\n\r\nPrague was once a hidden gem, overshadowed by its flashier neighbors to the west. But the city couldn\'t keep its marvels a secret for too long – now, it\'s a haven for travelers seeking awe-inspiring experiences at affordable prices. Even today, top attractions – including the famous Charles Bridge and the historic Prague Castle – offer free admission and many hotels offer rooms at a fraction of the cost of other European cities. But this bargain-hunting legacy has a ticking clock on it, so if you\'re hoping to find a fire-sale price, now\'s the time to do so.', '2023-06-14', '2023-06-19', 2030, '499cc4c9-78c1-44e0-9afb-bd610067be2b.jpg'),
(6, 'Marocco', 'Ozud Falls\r\nNorth of the city of Marrakesh, somewhere in the Middle Atlas Mountains, is a real natural gem that is considered a must-see attraction for all nature lovers visiting Morocco. Ozud Falls are spectacular waterfalls that are about 600 meters high. There you can find many olive trees that complete the pastoral look. The water pours into the El Abid River Canyon and at the bottom of the falls there are stalls where you can buy souvenirs as well as food and drinks.', '2023-06-19', '2023-06-29', 2700, '28d3560c-9c8f-46d0-ac6e-eb7847fd66ee.jpg'),
(7, 'Victoria Falls', 'Considered to be the largest waterfall on earth, Victoria Falls in southern Africa is one of the Seven Natural Wonders of the World. Straddling the border between Zambia and Zimbabwe, this powerful waterfall is best viewed from Knife Edge Bridge or Livingstone Island. However, adventurous travelers can also see these magnificent falls from above on a helicopter tour, or from below while whitewater rafting on the Zambezi River. If you\'re feeling particularly brave, don your swimsuit for a soak in Devil\'s Pool, a natural infinity pool located on the edge of the falls.', '2023-06-25', '2023-06-30', 1560, '70634c83-3821-4da1-a8f4-003c2b56acea.jpg'),
(8, 'Thailand', 'SEA LIFE BANGKOK - OCEAN LIFE\" is a huge site located on the lower floors of the SIAM PARAGON shopping center in Bangkok and is considered one of the largest and most beautiful aquariums in Southeast Asia\r\nThe aquarium houses about 30,000 marine animals of different types as well as hundreds of different varieties of colorful fish, fearsome sharks, octopuses, seahorses, crabs and even penguins and seals and unique vegetation that grows mainly in the depths of the oceans.\r\n\r\n\"Sea World\" was carefully designed for the animals in the complex - the artificial environment was designed as the familiar natural environment of the animals, including rocks, vegetation and a variety of details that were restored to produce a natural feeling. Although the complex is entirely designed with transparent glass tunnels that separate you and the animals, you can get an impression and get to know the underwater life up close accompanied by a team that will take you on a tour of the depths.\r\nThe aquarium complex is divided according to the living areas of the animals. You will be able to admire the \"Rain Forest\", \"Coral Reef\", \"Rock Beach\" and the \"Wild Animals\" complex.\r\n\r\nThe animals were grouped and divided into their appropriate areas where you can watch them live their lives in peace simulating the way of life in the wild.', '2023-06-25', '2023-07-02', 2800, 'a7d648ec-80ac-4ebf-a9a0-af1c87cae840.jpg'),
(9, 'Holand', 'Only an hour\'s drive from Amsterdam you will find a magical and ancient town called Gouda (or Haude, as it is called by the Dutch and we will flow with them). You probably know this name as cheese, but many do not know that it originates in the Netherlands.\r\n\r\nChauda is a perfect combination of a culinary and historical experience in one place. The town has buildings from the 15th to the 19th century, the most impressive of which are worth noting are:The Gothic town hall from the 17th century, which was used in the past not only as a town hall but also as a place for weighing the Gouda cheese. Today it is used as a residential building, the cheese museum and an information center for tourists.\r\nThe church of St. Jans from the beginning of the 18th century, which in addition to being one of the largest churches in the Netherlands (123 meters long!), is also famous for its beautiful stained glass windows built in the Middle Ages and the Renaissance.\r\nThe flour mill De Rod Lo from the beginning of the 18th century, which is among the oldest in the Netherlands and still works today.', '2023-07-02', '2023-07-04', 980, '2a0b55c8-2c2d-45fa-953a-39daafbf980a.jpg'),
(10, 'Belgium', '\r\nRailbikes\r\nSpecial bicycles (which look more like an open wagon), designed for 4 passengers, who ride them on top of railroad tracks on a route of four kilometers in each direction. The two passengers sitting in front pedal while the passengers in the back sit comfortably and watch the pastoral landscape of the Limburg region. When Arrive at the final destination \"Albert Canal\", take a short break to rest and return the same route to the starting point. The duration of the ride (including a break of about half an hour) is about an hour and a half.', '2023-07-03', '2023-07-07', 1200, 'f0024e83-15aa-4029-807b-49f15b65b936.jpg'),
(11, 'Switzerland', 'Switzerland, one of the most beautiful countries in the world, is known for its amazing landscapes with mountain peaks, green spaces, beautiful lakes and picturesque towns. Switzerland is a relatively small country in Europe, it has rich nature, a variety of accommodation options in the heart of a breathtaking pastoral landscape, delicious food and kind locals.\r\n\r\nSwitzerland is considered a popular tourist destination among tourists from all over the world, including many Israelis who visit it, as it contains many attractions and interesting sites, even for families with children. However, it is important to remember that in winter the weather there is cold and snowy, so you should be equipped accordingly.', '2023-07-16', '2023-07-23', 1870, 'ba4c531f-92f7-4a1a-88ba-21be50733864.jpg'),
(12, 'London, England', 'London is a world unto itself. The eclectic neighborhoods, which are home to a blend of historical landmarks and modern-day attractions, can keep you occupied for days. If it\'s your first time in London, plan to see the top spots, such as the Tower of London, the Tate Modern art institution, Buckingham Palace, Borough Market and the British Museum, before sitting down to a classic afternoon tea or checking out a local pub. The best time to travel to London is during the warmer months, but be warned that this is also the busiest and most expensive time of year', '2023-07-23', '2023-07-31', 2100, '6f67fa6f-7c3d-4604-98c3-86cd81841f7b.jpg'),
(14, 'panama', 'A land radiating with life, perfectly imperfect, and full of authenticity. Where Northern and Southern worlds connect, old and new worlds coexist, and cosmopolitan landscapes live in harmony with wild, untamed rainforests.', '2023-07-07', '2023-07-17', 4590, 'a8ab3fc8-5f8f-4031-a0c4-4a0a4bc949c7.jpg'),
(17, 'Iran', 'iran, a mountainous, arid, and ethnically diverse country of southwestern Asia. The country maintains a rich and distinctive cultural and social continuity dating back to the Achaemenian period, which began in 550 bce. In recent decades it has become known for its unique brand of Islamic republic.', '2023-06-03', '2023-06-12', 2410, '8971ce01-b3c9-400b-8dad-b0e3fcff21cf.jpg'),
(18, 'Russia', 'The largest country in the world, Russia offers a broad array of travel experiences, from treks up the slopes of glacier-capped mountains to strolls along the shoreline of Earth’s oldest lake. Historical sites and cultural activities in the country’s great cities abound as well. Whether you’re exploring the grounds of Moscow’s Kremlin or wandering through the steppes of Mongolia, a visit to Russia is an adventure not soon forgotten. These top tourists attractions in Russia can inspire a great Russian itinerary for a memorable trip.', '2023-04-19', '2023-06-05', 4500, '6408cbf2-f82a-4103-b03f-6d2163b09fd9.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

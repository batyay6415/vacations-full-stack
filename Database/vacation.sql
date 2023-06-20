-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2023 at 11:11 PM
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

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`userId`, `vacationId`) VALUES
(12, 3),
(12, 26),
(12, 20),
(12, 22),
(13, 14),
(12, 28),
(14, 8),
(15, 18),
(15, 25),
(15, 31),
(15, 24),
(15, 21),
(15, 12),
(12, 21),
(14, 31),
(14, 18),
(14, 14),
(14, 10);

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
  `password` varchar(500) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(11, 'Batya', 'Yerushalmi', 'batya6415@gmail.com', 'a2bb2b040b8386c81005877e4cdd759a73483457152c0ab413df25d9c338c2c23cc291093958ced8d6a10d081d22f5152e12ef8721426426c50131653c1742dc', 1),
(12, 'Noa', 'Cohen ', 'noa215@gmail.com', 'ebabba249926443050714240e37b74d65145b3d21621615ac73badadea12d41eaf935f739c0f8fa04eef700c5faa372d8318a8479582563bd49cf775625c88bf', 2),
(13, 'Hila', 'Levi', 'Hila254@gmail.com', 'ed744f2efbfbc02767728153d2abf89f4a8ba78447b4597307f6d5d27bc12cca570f4ba3f673eb0ba2ad6caa4aff0f0dc5ee5fe2d66bafcc2db7e802b307a83b', 2),
(14, 'test1', 'test2', 'test25@gmail.com', '94483dd66eefbe1dc22e047f1041c5f008ed8d53346f3489e4dcd7af8c107bc6d8484c6703b59e213b87a8dea578316c240a84c500e5b792a5d87341864b7d00', 2),
(15, 'Assaf', 'Fink', 'assaf@gmail.com', '73983548d0936ebd0e6186ec09c7c5ae302a237a9b59103581e0cb0cb761ad1bebb5eae3bcb188dfb6589c7af72b2f3f7361f0d6b0a9100f13eae4693bde0b1e', 2);

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
(2, 'Dubai', 'Dubai and Las Vegas have a lot in common. Both cities share a love for the fantastical, with skylines that shine like beacons against barren desert backdrops. People from all over the world flock to these shimmering oases with the same goal: to play hard. But as a vacation spot, Dubai easily trumps ol\' Sin City thanks to its gorgeous cream-colored Persian Gulf shoreline, international culinary scene and larger-than-life attractions. And the city\'s still growing; plans are underway for something bigger and better. At one point, it was estimated that a quarter of the world\'s construction cranes could be found here. If that\'s any sign, even the sky may not be able to limit Dubai\'s growth.\r\n\r\nDubai is a city of superlatives, home to the world\'s tallest tower, one of the world\'s largest shopping malls, and one of the world\'s largest man-made marinas… but on a smaller scale, this emirate is still tied to its days as a modest port town. Traditional wooden abras (boats) float past motorboats on Dubai Creek, the natural sands of Jumeirah Public Beach fringe the carefully sculpted Palm Islands, and the bustling Gold and Spice Souks (marketplaces) thrive amid the larger-than-life Dubai Mall. Despite constantly looking to the future, this city isn\'t quick to let go of its past. It\'s this dynamic that not only put Dubai on the tourist map but will also keep it there.', '2023-06-04', '2023-06-13', 2580, '303b03c5-88ce-4d04-a573-299d55ea0324.jpg'),
(3, 'Barcelona', 'Barcelona contains both the authentically historic and the wildly bizarre. From the scenic trails of the colorful Park Güell to the romantic narrow alleys of Barri Gòtic; from the beachside nightclubs to the city\'s dozens of sacred churches and architectural marvels, this city by the sea seems to attract all types: the adventurer, the couple, the partier, the culture lover – and more – with an almost overwhelming variety of things to do. You could stay for a few days, but chances are you\'ll need a whole week to explore.\r\n\r\nIn Barcelona, even the beach is bustling, but it\'s really the cosmopolitan city that gets all the attention. Much of the activity revolves around Las Ramblas, a series of narrow streets and alleys packed with restaurants, nightclubs and a vibrant pedestrian market. But you should also take a tour of Antoni Gaudí\'s masterpieces; Gaudí is responsible for sites like Casa Milà, Casa Batlló and La Sagrada Familia. You also shouldn\'t miss out on the eclectic shopping scene and the region\'s exquisite food and wine. You see why we suggest a week vacation? To get a lay of the land, consider signing up for one of the city\'s best guided tours.', '2023-06-12', '2023-06-16', 962, '6886dc32-9bb6-4d54-9e89-500b74dbd304.jpg'),
(4, 'Maldives', 'you\'ve seen photos of the Maldives before: picture-perfect private villas suspended over striking blue waters, alabaster white sand beaches and spectacular sunsets dipping into the horizon. The scenic beauty of the Maldives is something to behold, something you can\'t quite understand until you\'re there in person.\r\n\r\nThe island nation of the Maldives is popular with honeymooners looking for seclusion and adventurers looking to explore the depths of the sea on a scuba diving and snorkeling excursion. Travelers seeking relaxation can unwind at one of the island spas and all visitors should certainly spend a day exploring the Maldivian capital of Malé. The hotels in this region are also spectacular, ranging from underwater hotels to overwater bungalows to incredibly beautiful resorts. However, getting to and staying in this tropical paradise requires patience (there are no direct flights from the United States) and plentiful cash. Located between the Arabian and Laccadive seas, roughly 500 miles southwest of Sri Lanka, the Maldives is about as isolated as you can get – and that\'s just another one of its many allures.\r\n', '2023-06-18', '2023-06-23', 1870, 'a3b3ee2c-5d07-4272-be32-ec7d125aa1f8.jpg'),
(5, 'Paruge', 'A prosperous and bustling city, Prague now attracts more tourists than ever. But its picturesque downtown veils both a dark legacy and a resilient past. Dating back to about A.D. 870, Prague has withstood numerous overthrows, invasions, fires and floods. It\'s this reputation for survival and perseverance that has made the Czech capital so fascinating. Today, its storied churches, narrow streets, daunting hilltop castle and statue-lined bridges create the scene of an urban fairy tale. Even the most jaded traveler would have trouble resisting this city\'s charms.\r\n\r\nPrague was once a hidden gem, overshadowed by its flashier neighbors to the west. But the city couldn\'t keep its marvels a secret for too long – now, it\'s a haven for travelers seeking awe-inspiring experiences at affordable prices. Even today, top attractions – including the famous Charles Bridge and the historic Prague Castle – offer free admission and many hotels offer rooms at a fraction of the cost of other European cities. But this bargain-hunting legacy has a ticking clock on it, so if you\'re hoping to find a fire-sale price, now\'s the time to do so.', '2023-06-14', '2023-06-19', 2030, '499cc4c9-78c1-44e0-9afb-bd610067be2b.jpg'),
(6, 'Marocco', 'Ozud Falls\r\nNorth of the city of Marrakesh, somewhere in the Middle Atlas Mountains, is a real natural gem that is considered a must-see attraction for all nature lovers visiting Morocco. Ozud Falls are spectacular waterfalls that are about 600 meters high. There you can find many olive trees that complete the pastoral look. The water pours into the El Abid River Canyon and at the bottom of the falls there are stalls where you can buy souvenirs as well as food and drinks.', '2023-06-17', '2023-06-27', 2700, 'b6e5110d-6768-4d9f-8114-9763454c8eb7.jpg'),
(7, 'Victoria Falls', 'Considered to be the largest waterfall on earth, Victoria Falls in southern Africa is one of the Seven Natural Wonders of the World. Straddling the border between Zambia and Zimbabwe, this powerful waterfall is best viewed from Knife Edge Bridge or Livingstone Island. However, adventurous travelers can also see these magnificent falls from above on a helicopter tour, or from below while whitewater rafting on the Zambezi River. If you\'re feeling particularly brave, don your swimsuit for a soak in Devil\'s Pool, a natural infinity pool located on the edge of the falls.', '2023-06-25', '2023-06-30', 1560, '70634c83-3821-4da1-a8f4-003c2b56acea.jpg'),
(8, 'Thailand', 'SEA LIFE BANGKOK - OCEAN LIFE\" is a huge site located on the lower floors of the SIAM PARAGON shopping center in Bangkok and is considered one of the largest and most beautiful aquariums in Southeast Asia\r\nThe aquarium houses about 30,000 marine animals of different types as well as hundreds of different varieties of colorful fish, fearsome sharks, octopuses, seahorses, crabs and even penguins and seals and unique vegetation that grows mainly in the depths of the oceans.\r\n\r\n\"Sea World\" was carefully designed for the animals in the complex - the artificial environment was designed as the familiar natural environment of the animals, including rocks, vegetation and a variety of details that were restored to produce a natural feeling. Although the complex is entirely designed with transparent glass tunnels that separate you and the animals, you can get an impression and get to know the underwater life up close accompanied by a team that will take you on a tour of the depths.\r\nThe aquarium complex is divided according to the living areas of the animals. You will be able to admire the \"Rain Forest\", \"Coral Reef\", \"Rock Beach\" and the \"Wild Animals\" complex.\r\n\r\nThe animals were grouped and divided into their appropriate areas where you can watch them live their lives in peace simulating the way of life in the wild.', '2023-06-25', '2023-07-02', 2800, 'a7d648ec-80ac-4ebf-a9a0-af1c87cae840.jpg'),
(9, 'Holand', 'Only an hour\'s drive from Amsterdam you will find a magical and ancient town called Gouda (or Haude, as it is called by the Dutch and we will flow with them). You probably know this name as cheese, but many do not know that it originates in the Netherlands.\r\n\r\nChauda is a perfect combination of a culinary and historical experience in one place. The town has buildings from the 15th to the 19th century, the most impressive of which are worth noting are:The Gothic town hall from the 17th century, which was used in the past not only as a town hall but also as a place for weighing the Gouda cheese. Today it is used as a residential building, the cheese museum and an information center for tourists.\r\nThe church of St. Jans from the beginning of the 18th century, which in addition to being one of the largest churches in the Netherlands (123 meters long!), is also famous for its beautiful stained glass windows built in the Middle Ages and the Renaissance.\r\nThe flour mill De Rod Lo from the beginning of the 18th century, which is among the oldest in the Netherlands and still works today.', '2023-07-02', '2023-07-04', 980, '2a0b55c8-2c2d-45fa-953a-39daafbf980a.jpg'),
(10, 'Belgium', 'Railbikes\r\nSpecial bicycles (which look more like an open wagon), designed for 4 passengers, who ride them on top of railroad tracks on a route of four kilometers in each direction. The two passengers sitting in front pedal while the passengers in the back sit comfortably and watch the pastoral landscape of the Limburg region. When Arrive at the final destination \"Albert Canal\", take a short break to rest and return the same route to the starting point. The duration of the ride (including a break of about half an hour) is about an hour and a half.', '2023-07-03', '2023-07-07', 1200, 'f0024e83-15aa-4029-807b-49f15b65b936.jpg'),
(11, 'Switzerland', 'Switzerland, one of the most beautiful countries in the world, is known for its amazing landscapes with mountain peaks, green spaces, beautiful lakes and picturesque towns. Switzerland is a relatively small country in Europe, it has rich nature, a variety of accommodation options in the heart of a breathtaking pastoral landscape, delicious food and kind locals.\r\n\r\nSwitzerland is considered a popular tourist destination among tourists from all over the world, including many Israelis who visit it, as it contains many attractions and interesting sites, even for families with children. However, it is important to remember that in winter the weather there is cold and snowy, so you should be equipped accordingly.', '2023-07-14', '2023-07-17', 1670, 'ba4c531f-92f7-4a1a-88ba-21be50733864.jpg'),
(12, 'London, England', 'London is a world unto itself. The eclectic neighborhoods, which are home to a blend of historical landmarks and modern-day attractions, can keep you occupied for days. If it\'s your first time in London, plan to see the top spots, such as the Tower of London, the Tate Modern art institution, Buckingham Palace, Borough Market and the British Museum, before sitting down to a classic afternoon tea or checking out a local pub. The best time to travel to London is during the warmer months, but be warned that this is also the busiest and most expensive time of year', '2023-07-19', '2023-07-29', 6870, '6f67fa6f-7c3d-4604-98c3-86cd81841f7b.jpg'),
(14, 'panama', 'A land radiating with life, perfectly imperfect, and full of authenticity. Where Northern and Southern worlds connect, old and new worlds coexist, and cosmopolitan landscapes live in harmony with wild, untamed rainforests.', '2023-07-05', '2023-07-15', 4666, 'a8ab3fc8-5f8f-4031-a0c4-4a0a4bc949c7.jpg'),
(18, 'Russia', 'The largest country in the world, Russia offers a broad array of travel experiences, from treks up the slopes of glacier-capped mountains to strolls along the shoreline of Earth’s oldest lake. Historical sites and cultural activities in the country’s great cities abound as well. Whether you’re exploring the grounds of Moscow’s Kremlin or wandering through the steppes of Mongolia, a visit to Russia is an adventure not soon forgotten. These top tourists attractions in Russia can inspire a great Russian itinerary for a memorable trip.', '2023-05-01', '2023-06-01', 9510, 'f211e79a-92d0-41f7-9317-56e1c978bf1a.jpg'),
(20, 'Paris', 'The magnetic City of Light draws visitors from around the globe who come to see iconic attractions like the Eiffel Tower, the Louvre and the Arc de Triomphe. But what travelers really fall in love with are the city\'s quaint cafes, vibrant markets, trendy shopping districts and unmistakable je ne sais quoi. Get lost wandering along the charming cobblestone streets, or grab a croissant and relax on the banks of the Seine for hours. If you\'re up for a quick daytrip, head about 15 miles southwest of the city center to the Palace of Versailles, which offers guided and self-guided tours of the estate', '2023-05-24', '2023-05-31', 6540, 'a0e3bc49-21df-4133-82cf-406e21eba4c2.jpg'),
(21, 'Tasmania', 'If you\'re dreaming of a remote destination filled with historical charm, pristine beaches, unique wildlife and jaw-dropping mountains, then consider vacationing in Tasmania (or Tassie, as the locals call it). Situated about 150 miles south of Australia\'s mainland, this island appeals to anyone looking for an adventure. Families will enjoy walking across the suspension bridge at the Launceston Cataract Gorge & First Basin, while adrenaline junkies can hike Wellington Park\'s Organ Pipes or embark on a multiday trek along Cradle Mountain\'s Overland Track. Freycinet National Park is an ideal spot for water sports like snorkeling and kayaking, and once the sun goes down, you can get your heart pounding during an evening ghost tour of the Port Arthur Historic Site. In between sightseeing and exploring your surroundings, you\'ll find a variety of shops and art galleries, as well as eateries that serve fresh seafood and produce alongside locally made wines, beers, ciders and spirits', '2023-05-17', '2023-06-04', 7360, 'ca835bfc-a2c4-409d-9754-3ff122eb96db.jpg'),
(22, 'Hungaria', 'Hungary is also the birthplace of many famous people. Erno Rubik, a sculptor and professor, invented the Rubik\'s Cube in 1974. Hungary boasts 13 Nobel Prize winners, and magician Harry Houdini was also born in the country\'s capital, Budapest. The Eastern European country\'s cuisine primarily consists of meat dishes.', '2023-05-20', '2023-06-18', 6980, '14351b75-fbd6-4786-a5e7-f8e0599e098d.jpg'),
(23, 'Maxico', 'Mexico is one of the world’s most popular vacation destinations with over 20 million foreign visitors a year. Famous for its tequila, the Aztecs and the Mayas, Salma Hayek, Day of the Dead, drug wars, Lucha libre, Corona beer and the beach resorts on the Pacific and Caribbean side, Mexico can offer something for every sort of traveler.  From Pre-Columbian ruins and historic colonial towns to white powdery beaches and huge canyons, this country offers visitors a wide range of things to do. For ideas on the best places to visit check out our list of the top tourist attractions in Mexico.', '2023-05-21', '2023-05-31', 5600, 'ef25a29a-473c-463f-8dc7-402b7b98a616.jpg'),
(24, 'Georgia ', 'this is the amazing county', '2023-05-05', '2023-05-26', 8200, '83d1021c-05fb-4b64-8b61-d052fb8cbe71.jfif'),
(25, 'Polin', 'housed in one of Warsaw\'s best examples of contemporary architecture, this award-winning museum documents 1000 years of Jewish history in Poland. The multimedia permanent exhibition includes accounts of the earliest Jewish traders in the region through waves of mass migration, progress and pogroms, all the way to WWII, the destruction of Europe\'s largest Jewish community and the present-day situation.  A highlight is a reconstruction of the polychromatic painted ceiling and bimah (raised central platform for reading the Torah) of the synagogue that once stood in Gwoździec (now part of Ukraine). Hire an audio guide (10zł) to get the most out of the many rooms of displays, interactive maps, photos and videos.', '2023-05-15', '2023-05-31', 6220, '3a775567-86fe-4482-9237-6b044fbef4fe.jpg'),
(26, 'los angeles', 'very amazing ', '2023-06-01', '2023-06-05', 5600, '396e90a6-180d-491c-83d2-7653c613c0bb.jpg'),
(28, 'Austria', 'Austria, one of Europe\'s most popular holiday destinations, attracts tourists year-round with places to visit in both summer and winter. In fact, with some of Europe\'s finest skiing, winter is almost as busy as summer in the country\'s spectacular mountain regions.\n\nVisitors are drawn as much for the', '2023-05-24', '2023-06-02', 9821, '8e75a39a-4a52-456e-8e16-aa56584cf301.jpg'),
(31, 'test 1', 'very cool to trip there', '2023-05-29', '2023-05-31', 6500, '6cc03c3e-2e5e-440f-a126-b0852d6ec2fc.jpg');

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

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

const destinations = {
    'kuantan 188': {
        category: "destination",
        link_name: "kuantan 188",
        name: "Kuantan 188",
        image: "/kuantan.jpg",
        idea: "Family Travel",
        duration: "3 Days",
        rating: "4.9", 
        short_location: "Pahang",
        location: "Jalan Besar, 25000 Kuantan, Pahang",
        location_link: "https://www.google.com/maps/place/kuantan+188+location/data=!4m2!3m1!1s0x31c8ba9c53ade317:0x85959d620830f43d?sa=X&ved=1t:155783&ictx=111",
        price: 100,
        favourite: false,
        description: "Kuantan 188, which stands proud on the banks of Kuantan River here, is not only the latest iconic landmark of Pahang’s first city, but also sets the night and weekend moods of Kuantan, the capital city of Pahang situated on the East Coast of Malaysia.",
        operating_hour: "10:00 AM - 10:00 PM"
    },

    'batu caves': {
        category: "destination",
        link_name: "batu caves",
        name: "Batu Caves",
        image: "/batu-caves.jpg",
        idea: "History Buffs",
        duration: "1 Days",
        rating: "4.7",
        short_location: "Selangor",
        location: "Gombak, 68100 Batu Caves, Selangor",
        location_link: "https://www.google.com/maps/place/Batu+Caves/@3.2374545,101.6839234,17z/data=!3m1!4b1!4m6!3m5!1s0x31cc470c8949a805:0xf2bfebb2b36f9ef9!8m2!3d3.2378844!4d101.6840385!16zL20vMHN5cDk?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D",
        price: 90,
        favourite: false,
        description: "Batu Caves is a famous Hindu temple complex located just north of Kuala Lumpur, Malaysia. Set within a series of limestone caves, it is best known for its towering golden statue of Lord Murugan and the 272 colorful steps leading up to the main Temple Cave. The site attracts pilgrims and tourists alike, especially during the Thaipusam festival. Visitors can explore the impressive caves, admire Hindu shrines, spot monkeys, and enjoy scenic views from the top. It's a unique cultural and natural landmark that offers both spiritual insight and adventure.",
        operating_hour: "10:00 AM - 9:00 PM"
    },

    'pulau tioman': {
        category: "destination",
        link_name: "pulau tioman",
        name: "Pulau Tioman",
        image: "/pulau-tioman.jpg",
        idea: "Natural Photography",
        duration: "5 Days",
        rating: "5.0",
        short_location: "Johor",
        location: "Pulau Tioman, Mersing, Johor",
        location_link: "https://www.google.com/maps/place/pulau+tioman+address/data=!4m2!3m1!1s0x31c51b92f94cd239:0xb7b7e438fc01e28e?sa=X&ved=1t:155783&ictx=111",
        price: 290,
        favourite: false,
        description: "Tioman Island lies off the east coast of Peninsular Malaysia, in the South China Sea. It's a nature reserve, ringed by beaches. The area is known for its dive sites, which have corals, sea fans and sea sponges, as well as shipwrecks. The island is covered in tropical rainforests, home to butterflies, lizards and monkeys. On the east coast, the Juara Turtle Project is a hatchery that protects and studies sea turtles",
        operating_hour: "10:00 AM - 10:00 PM"
    },

    'legoland malaysia resort': {
        category: "destination",
        link_name: "legoland malaysia resort",
        name: "Legoland Malaysia Resort",
        image: "/legoland-malaysia-resort.jpg",
        idea: "Family Travel",
        duration: "4 Days",
        rating: "5.0",
        short_location: "Johor",
        location: "7 Jalan Legoland, Johor Bahru 79250 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g298278-d3491018-Reviews-Legoland_Malaysia-Johor_Bahru_Johor_Bahru_District_Johor.html#:~:text=7%20Jalan%20Legoland%2C%20Johor%20Bahru%2079250%20Malaysia",
        price: 130,
        favourite: false,
        description: "LEGOLAND Malaysia Resort in Iskandar Puteri, Johor, is a family-friendly destination with over 80 rides, shows, and attractions. It's the first LEGOLAND theme park in Asia and the sixth in the world, offering a unique blend of amusement park fun with LEGO theming. ",
        operating_hour: "10:00 AM - 6:00 PM"
    },

    'kek lok si temple': {
        category: "destination",
        link_name: "kek lok si temple",
        name: "Kek Lok Si Temple",
        image: "/Kek-Lok-Si-Temple-Penang.jpg",
        idea: "Cultural Lover",
        duration: "1 Days",
        rating: "4.6",
        short_location: "Penang",
        location: "Jln Balik Pulau, 11500 Ayer Itam, Pulau Pinang",
        location_link: "https://www.google.com/maps/place/kek+lok+si+temple/data=!4m2!3m1!1s0x304ac2185dfc8665:0x2c9084ea7f433ec4?sa=X&ved=1t:155783&ictx=111",
        price: 40,
        favourite: false,
        description: "The Kek Lok Si Temple is a Buddhist temple in George Town in the Malaysian state of Penang. Located at Ayer Itam, it is the largest Buddhist temple in Malaysia and an important pilgrimage centre for Buddhists from Hong Kong, the Philippines, Singapore and other parts of Southeast Asia.",
        operating_hour: "8.30 AM - 5.30 PM"
    },

    'aquaria klcc': {
        category: "destination",
        link_name: "aquaria klcc",
        name: "Aquaria KLCC",
        image: "/aquaria_klcc.jpg",
        idea: "Curious learners",
        duration: "1 Days",
        rating: "4.9",
        short_location: "Kuala Lumpur",
        location: "Kuala Lumpur City Centre, 50088 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
        location_link: "https://www.google.com/maps/place/aquaria+klcc/data=!4m2!3m1!1s0x31cc37d39d319733:0x68a27ec3fd8f6bed?sa=X&ved=1t:155783&ictx=111",
        price: 229,
        favourite: false,
        description: "The Aquaria KLCC is an oceanarium located beneath Kuala Lumpur Convention Centre within Kuala Lumpur City Centre in Kuala Lumpur, Malaysia.",
        operating_hour: "10:00 AM - 10:00 PM"
    },

    'pulau langkawi': {
        category: "destination",
        link_name: "pulau langkawi",
        name: "Pulau Langkawi",
        image: "/langkawi.png",
        idea: "Curious learners",
        duration: "5 Days",
        rating: "4.6",
        short_location: "Kedah",
        location: "07000 Langkawi",
        location_link: "https://www.google.com/maps/place/pulau+langkawi+location/data=!4m2!3m1!1s0x304c78da69c4755d:0xe43971dbd7bd6dfe?sa=X&ved=1t:155783&ictx=111",
        price: 119,
        favourite: false,
        description: "Langkawi, officially known as Langkawi, the Jewel of Kedah, is a duty-free island and an archipelago of 99 islands located some 30 km off the coast of northwestern Malaysia and a few kilometres south of Ko Tarutao.",
        operating_hour: "11:00 AM - 10:30 PM"
    },

    'island of tioman': {
        category: "destination",
        link_name: "island of tioman",
        name: "Island of Tioman",
        image: "/island-of-tioman.png",
        idea: "Curious learners",
        duration: "2 Days",
        rating: "4.3",
        short_location: "Pahang",
        location: "Mersing, Pahang",
        location_link: "https://www.google.com/maps/place/Tioman+Island/@2.8064825,104.1703345,12z/data=!3m1!4b1!4m6!3m5!1s0x31c51b92f94cd239:0xb7b7e438fc01e28e!8m2!3d2.7902494!4d104.1698463!16zL20vMDFubWIx?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D",
        price: 150,
        favourite: false,
        description: "Tioman Island lies off the east coast of Peninsular Malaysia, in the South China Sea. It's a nature reserve, ringed by beaches. The area is known for its dive sites, which have corals, sea fans and sea sponges, as well as shipwrecks. The island is covered in tropical rainforests, home to butterflies, lizards and monkeys. On the east coast, the Juara Turtle Project is a hatchery that protects and studies sea turtles. ",
        operating_hour: "11:00 AM - 10:30 PM"
    },

    'genting highland': {
        category: "destination",
        link_name: "genting highland",
        name: "Genting Highland",
        image: "/genting_highland.jpg",
        idea: "Family Travel",
        duration: "2 Days",
        rating: "4.9", 
        short_location: "Pahang",
        location: "Genting Highlands, 69000 Genting Highlands, Pahang",
        location_link: "https://www.google.com/maps/place/Genting+Highlands,+Pahang/@3.3981172,101.7832129,13z/data=!3m1!4b1!4m6!3m5!1s0x31cc14067e9a39c3:0x1b8edcdc4d5bf56!8m2!3d3.423978!4d101.7932011!16s%2Fg%2F11bc5hs7tr?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D",
        price: 200,
        favourite: false,
        description: "Genting Highlands is a hill station located on the peak of Mount Ulu Kali in the Titiwangsa Mountains, central Peninsular Malaysia, at 1800 metres elevation. Located in the state of Pahang, it was established in 1965 by the late Malaysian businessman Lim Goh Tong. The primary tourist attraction is Resorts World Genting, a hill resort where casinos and theme parks are situated and where gambling is permitted. Many of Pahang's skyscrapers can be found here.",
        operating_hour: "10:00 AM - 10:00 PM"
    },

    'kuala gandah elephant': {
        category: "destination",
        link_name: "kuala gandah elephant",
        name: "Kuala Gandah Elephant",
        image: "/kuala-gandah-elephant.jpg",
        idea: "Green Lifestyle Enthusiasts",
        duration: "1 Days",
        rating: "4.5", 
        short_location: "Pahang",
        location: "Jln Bolok - Mempaga, 28500 Malaysia",
        location_link: "https://www.google.com/maps/search/kuala+gandah+elephant+location/@3.5914733,102.1435189,17z?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D",
        price: 80,
        favourite: false,
        description: "You'll never forget the day you helped give an elephant a bath (additional request with the help of a guide). Currently elephant riding has been temporary stopped until further notice. Get up close and personal with the amazing semi-wild elephants at Kuala Gandah Elephant Sanctuary. Be sure to book in advance because the center has strict daily visitor quotas",
        operating_hour: "10:30 AM - 6:30 PM"
    },

    'cameron highland': {
        category: "destination",
        link_name: "cameron highland",
        name: "Cameron Highland",
        image: "/cameron-highland.jpg",
        idea: "Green Lifestyle Enthusiasts",
        duration: "3 Days",
        rating: "4.6", 
        short_location: "Pahang",
        location: "Brinchang, 39100 Brinchang, Pahang",
        location_link: "https://www.google.com/maps/place/cameron+highland+location/data=!4m2!3m1!1s0x31ca5082fa7f0d47:0x655625f6e1faf2f4?sa=X&ved=1t:155783&ictx=111",
        price: 280,
        favourite: false,
        description: "The Cameron Highlands are a popular hill station and tourist destination in Peninsular Malaysia, located within the state of Pahang. It's known for its cool climate, tea plantations, strawberry farms, and other agricultural activities. The area is also known for its natural beauty and is a popular destination for those seeking a relaxing getaway. ",
        operating_hour: "10:30 AM - 6:30 PM"
    },

    'teluk chempedak': {
        category: "destination",
        link_name: "teluk chempedak",
        name: "Teluk Chempedak",
        image: "/teluk-chempedak.jpeg",
        idea: "Green Lifestyle Enthusiasts",
        duration: "1 Days",
        rating: "4.3", 
        short_location: "Pahang",
        location: "25050, Pahang",
        location_link: "https://www.google.com/maps/place/Teluk+Cempedak/@3.8097741,103.3728364,16z/data=!3m1!4b1!4m6!3m5!1s0x31c8a5450ef61e89:0x8465bfd2f01c4578!8m2!3d3.8119576!4d103.3725871!16s%2Fm%2F02pz68k?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D",
        price: 120,
        favourite: false,
        description: "Teluk Cempedak or Teluk Chempedak also known as Palm Beach is a beach in Kuantan, Pahang, Malaysia. It is located 5 kilometres east from the town centre in Kuantan. The white sandy beach and casuarinas and pine trees line the coast, with some rocky promontories facing the South China Sea.",
        operating_hour: "5:30 AM - 10:30 PM"
    },

    'sunway lagoon': {
        category: "destination",
        link_name: "sunway lagoon",
        name: "Sunway Lagoon",
        image: "/sunway-lagoon.jpg",
        idea: "Family Travel",
        duration: "4 Days",
        rating: "4.8",
        short_location: "Selangor",
        location: "No 3, Jalan PJS 11/11 Bandar Sunway, Petaling Jaya 47500 Malaysia",
        location_link: "https://www.google.com/maps/place/sunway+lagoon+location/data=!4m2!3m1!1s0x31cc4c88dded3125:0xdb654cc77af0cdbc?sa=X&ved=1t:155783&ictx=111",
        price: 390,
        favourite: false,
        description: "Malaysia's premier multi-park destination offers more than 90 attractions across its six parks - Amusement Park, Water Park, Wildlife Park, Extreme Park, Scream Park, and Asia's First Nickelodeon Themed Land, Nickelodeon Lost Lagoon! Once you step in, you can spend the entire day here! Explore the various Dining options available at the theme park. If you need some place to sleep, we are just next door to the Sunway Resort Hotel & Spa. We also play host to some of the hottest acts and global events so stay tuned for upcoming events and promotion.",
        operating_hour: "10:00 AM - 6:00 PM"
    },

    'thai chetawan temple': {
        category: "destination",
        link_name: "thai chetawan temple",
        name: "Thai Chetawan Temple",
        image: "/thai-chetawan-temple.jpg",
        idea: "History Buffs",
        duration: "1 Days",
        rating: "4.8",
        short_location: "Selangor",
        location: "No.24, Jalan Pantai 9/7 Off Jalan Gasing, Petaling Jaya 46000 Malaysia",
        location_link: "https://www.google.com/maps/place/thai+chetawan+temple/data=!4m2!3m1!1s0x31cc4bcfde68dab3:0x44d3fc65e1c3399e?sa=X&ved=1t:155783&ictx=111",
        price: 89,
        favourite: false,
        description: "A truly remarkable Thai Buddhist Temple in the heart of Petaling Jaya. A wonderful temple that offers a great solace to those seeking some peace and quiet. A good place to offer prayers and mediate.",
        operating_hour: "9:00 AM - 5:30 PM"
    },

    'sultan salahuddin abdul aziz shah mosque': {
        category: "destination",
        link_name: "sultan salahuddin abdul aziz shah mosque",
        name: "Sultan Salahuddin Abdul Aziz Shah Mosque",
        image: "/sultan-salahuddin-abdul-aziz-shah-mosque.jpg",
        idea: "History Buffs",
        duration: "1 Days",
        rating: "5.0",
        short_location: "Selangor",
        location: "Persiaran Masjid St. Sekysen 14, Shah Alam 40000 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g298316-d1632410-Reviews-Sultan_Salahuddin_Abdul_Aziz_Shah_Mosque-Shah_Alam_Petaling_District_Selangor.html#:~:text=Persiaran%20Masjid%20St.%20Sekysen%2014%2C%20Shah%20Alam%2040000%20Malaysia",
        price: 70,
        favourite: false,
        description: "The biggest masjid in Malaysia which is less than 1 hour drive away from KL. It is very clean, stunning, amazing Islamic architecture, beautiful viewpoints, and very big. This is a must visit if you are staying in KL. Personally think this Blue Mosque is better than the one in Istanbul.",
        operating_hour: "9:00 AM - 6:00 PM"
    },

    'farm in the city': {
        category: "destination",
        link_name: "farm in the city",
        name: "Farm In The City",
        image: "/farm-in-the-city.jpg",
        idea: "Birdwatching",
        duration: "1 Days",
        rating: "5.0",
        short_location: "Selangor",
        location: "Persiaran Masjid St. Sekysen 14, Shah Alam 40000 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g298316-d1632410-Reviews-Sultan_Salahuddin_Abdul_Aziz_Shah_Mosque-Shah_Alam_Petaling_District_Selangor.html#:~:text=Persiaran%20Masjid%20St.%20Sekysen%2014%2C%20Shah%20Alam%2040000%20Malaysia",
        price: 179,
        favourite: false,
        description: "Farm in the City (FITC) is an unique concept that combines the elements of wildlife and nature set in a designed environment of a conservation park. resembling a typical Malaysian Village setting, it houses more than 100 species of Farm and Exotic animals and plants in specially built enclosures. One can get close, touch or feed the animals with almost Zero distance.",
        operating_hour: "9:00 AM - 6:00 PM"
    },

    'johor bahru city square': {
        category: "destination",
        link_name: "johor bahru city square",
        name: "Johor Bahru City Square",
        image: "/johor-bahru-city-square.jpg",
        idea: "Eco-conscious Shoppers",
        duration: "1 Days",
        rating: "4.4",
        short_location: "Johor",
        location: "106-108 Jalan Wong Ah Fook, Johor Bahru 80000 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g298278-d457057-Reviews-Johor_Bahru_City_Square-Johor_Bahru_Johor_Bahru_District_Johor.html#:~:text=106%2D108%20Jalan%20Wong%20Ah%20Fook%2C%20Johor%20Bahru%2080000%20Malaysia",
        price: 199,
        favourite: false,
        description: "Strategically located in the heart of the city and only a stone's throw from the customs and immigration checkpoint, Johor Bahru City Square stands out as a central landmark in JB. With its more than 200 retailers, it offers a host of fashion, entertainment and restaurants. All catered to wow the senses and satisfy the needs. Rush in when the doors open at 10am for breakfast, then head out and start your shopping adventure of clothes, shoes, bags, trinklets, toiletries, electronic toys. Everything the heart desires. Unique to Johor Bahru City Square is the Inner City, an eclectic mix of smallish fashion and accessory shops plus restaurants housed in a tight, quaint setting. Always a firm favorite of the now generation. After many hours of shopping, rest the feet in one of the numerous restaurants and cafes or indulge in a soothing foot massage, then go on to treat the rest of the body at a salon.",
        operating_hour: "10:00 AM - 10:00 PM"
    },

    'pulai waterfall': {
        category: "destination",
        link_name: "pulai waterfall",
        name: "Pulai Waterfall",
        image: "/pulai-waterfall.jpg",
        idea: "Green Lifestyle Enthusiasts",
        duration: "1 Days",
        rating: "4.7",
        short_location: "Johor",
        location: "Gunung Pulai Recreational Forest, Johor Bahru 81000 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g298278-d457113-Reviews-Pulai_Waterfall-Johor_Bahru_Johor_Bahru_District_Johor.html#:~:text=Gunung%20Pulai%20Recreational%20Forest%2C%20Johor%20Bahru%2081000%20Malaysia",
        price: 110,
        favourite: false,
        description: "Pulai Waterfall offers a good experience with available changing and bathing facilities, unlike Kota Tinggi falls. Notably, Pulai Waterfall has no fishes. This suggests it might be a more pleasant swimming experience for those who prefer it. The lack of fish could also indicate differences in the ecosystem or water quality compared to other waterfalls in the area.",
        operating_hour: "8:00 AM - 5:00 PM"
    },

    'the habitat penang hill': {
        category: "destination",
        link_name: "the habitat penang hill",
        name: "The Habitat Penang Hill",
        image: "/the-habitat-penang-hill.jpg",
        idea: "Relaxing Walk",
        duration: "2 Days",
        rating: "4.8",
        short_location: "Penang",
        location: "Bukit Bendera, Penang Island 11300 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g660694-d9785744-Reviews-The_Habitat_Penang_Hill-Penang_Island_Penang.html#:~:text=Bukit%20Bendera%2C%20Penang%20Island%2011300%20Malaysia",
        price: 30,
        favourite: false,
        description: "The Habitat Penang Hill provides the most authentic, diverse and educational Malaysian rainforest experience. Reconnect with nature in its purest form as you immerse yourself in our 130-million year old rainforest. Starting at the forest floor, our Naturalists will take you on a journey along our Nature Trail to explore the myriad of flora and fauna – plants, trees, insects, birds, reptiles, and mammals that call The Habitat home. Explore the biodiversity of the rainforest canopy on our 230m Langur Way Canopy Walk. Visit Curtis Crest Tree Top Walk at the top of Penang Hill, and embrace the 360-degree panoramic views of Penang Island from the highest viewing point of Penang. ",
        operating_hour: "9:00 AM - 7:00 PM"
    },

    'entopia': {
        category: "destination",
        link_name: "entopia",
        name: "Entopia",
        image: "/entopia.jpg",
        idea: "Green Lifestyle Enthusiasts",
        duration: "1 Days",
        rating: "4.8",
        short_location: "Penang",
        location: "830 Jalan Teluk Bahang, Teluk Bahang, Penang Island 11050 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g4975755-d457111-Reviews-Entopia-Teluk_Bahang_Penang_Island_Penang.html#:~:text=830%20Jalan%20Teluk%20Bahang%2C%20Teluk%20Bahang%2C%20Penang%20Island%2011050%20Malaysia",
        price: 72,
        favourite: false,
        description: "Entopia, a tropical sanctuary for our planet's little denizens from those that fly freely in the sky to the ones that creep stealthily beneath the ground. Journey into a magical paradise that honours the unsung heroes of our natural world with plenty to discover from outdoor adventures to cavernous mysteries and a multi-storey Indoor Discovery Centre. Live the moment with exciting interactive workshops and activities.",
        operating_hour: "9:00 AM - 7:00 PM"
    },

    'lost world of tambun': {
        category: "destination",
        link_name: "lost world of tambun",
        name: "Lost World of Tambun",
        image: "/lost-world-of-tambun.jpg",
        idea: "Family Travel",
        duration: "2 Days",
        rating: "4.8",
        short_location: "Perak",
        location: "No. 1 Persiaran Lagun Sunway 1, Ipoh 31150 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g298298-d1488280-Reviews-Lost_World_Of_Tambun-Ipoh_Kinta_District_Perak.html#:~:text=No.%201%20Persiaran%20Lagun%20Sunway%201%2C%20Ipoh%2031150%20Malaysia",
        price: 79,
        favourite: false,
        description: "The little world of big adventures, Sunway Lost World of Tambun is Malaysia’s premiere action and adventure family holiday destination in Ipoh, Malaysia. A theme park located in the historic town of Ipoh, in the middle of the North-South corridor in Perak; and is set in the natural landscapes of Ipoh, surrounded by exquisitely breath-taking limestone features. Whether it’s a weekend of mayhem oozing with family fun or a burst of eco-adventure that you’re seeking, take it all in as you journey through the attractions of the Lost World of Tambun.",
        operating_hour: "9:00 AM - 7:00 PM"
    },

    'pangkor island': {
        category: "destination",
        link_name: "pangkor island",
        name: "Pangkor Island",
        image: "/pangkor-island.jpeg",
        idea: "Family Travel",
        duration: "5 Days",
        rating: "5.0",
        short_location: "Perak",
        location: "Strait of Malacca",
        location_link: "https://www.google.com/maps/place/Pangkor+Island/data=!4m2!3m1!1s0x3034d396cbb7f341:0xc8f2ba9f74ec3895?sa=X&ved=1t:155783&ictx=111",
        price: 72,
        favourite: false,
        description: "Pangkor Island lies just off the west coast of Peninsular Malaysia. It’s known for beaches like Teluk Nipah, Coral Bay and Pasir Giam, which connects to coral-ringed Giam Island at low tide. Dating back to 1670, the ruined Dutch Fort demonstrates the island’s strategic colonial importance. Nearby, the Sacred Rock is inscribed with the Dutch East India Company symbol and a picture of a tiger carrying away a child",
        operating_hour: "9:00 AM - 7:00 PM"
    },

    'kellie castle': {
        category: "destination",
        link_name: "kellie castle",
        name: "Kellie Castle",
        image: "/kellie-castle.jpg",
        idea: "Educational Outings",
        duration: "5 Days",
        rating: "5.0",
        short_location: "Perak",
        location: "Lot 48436, Kompleks Pelancongan Kellie's Castle,, Batu Gajah 31000 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g1450229-d1421132-Reviews-Kellie_s_Castle-Batu_Gajah_Kinta_District_Perak.html#:~:text=Lot%2048436%2C%20Kompleks%20Pelancongan%20Kellie%27s%20Castle%2C%2C%20Batu%20Gajah%2031000%20Malaysia",
        price: 60,
        favourite: false,
        description: "Kellie’s Castle: A historic gem in Perak, showcasing unique Moorish, Indian, and Romanesque architecture.",
        operating_hour: "9:30 AM - 6:00 PM"
    },

    'petronas twin tower': {
        category: "destination",
        link_name: "petronas twin tower",
        name: "Petronas Twin Tower",
        image: "/show-case-1.jpeg",
        idea: "Family Travel",
        duration: "7 Days",
        rating: "4.8",
        short_location: "Kuala Lumpur",
        location: "Concourse Level, Lower Ground Kuala Lumpur City Centre, Kuala Lumpur 50088 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g298570-d317521-Reviews-Petronas_Twin_Towers-Kuala_Lumpur_Wilayah_Persekutuan.html#:~:text=Concourse%20Level%2C%20Lower%20Ground%20Kuala%20Lumpur%20City%20Centre%2C%20Kuala%20Lumpur%2050088%20Malaysia",
        price: 360,
        favourite: false,
        description: "No trip to KL would be complete without a visit to the world's tallest twin towers. The skyscrapers are utterly stunning, particularly when illuminated at night. The Twin Towers Visit Operations is open Tuesday through Sunday and tickets are released at 8:30 a.m. on a first-come, first-served basis. To avoid disappointment, you can purchase your ticket in advance via online ticketing or at the Ticketing Counter, Concourse Level.",
        operating_hour: "9:30 AM - 6:00 PM"
    },

    'pavilion kuala lumpur': {
        category: "destination",
        link_name: "pavilion kuala lumpur",
        name: "Pavilion Kuala Lumpur",
        image: "/pavilion-kl.jpg",
        idea: "Eco-conscious Shoppers",
        duration: "7 Days",
        rating: "4.8",
        short_location: "Kuala Lumpur",
        location: "168 Jalan Bukit Bintang, Kuala Lumpur 55100 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g298570-d317521-Reviews-Petronas_Twin_Towers-Kuala_Lumpur_Wilayah_Persekutuan.html#:~:text=Concourse%20Level%2C%20Lower%20Ground%20Kuala%20Lumpur%20City%20Centre%2C%20Kuala%20Lumpur%2050088%20Malaysia",
        price: 120,
        favourite: false,
        description: "Pavilion Kuala Lumpur is an award-winning shopping mall located in the heart of Bukit Bintang, Malaysia’s shopping paradise. Pavilion Kuala Lumpur brings the best of retail with a nett lettable area of over 1.7 million square feet, 700 stores and 8 themed precincts. The Pavilion Crystal Fountain, a symbol of Malaysia’s diverse culture welcomes visitors to this tourist-friendly destination, surrounded by upmarket hotels and a 10-minute walk from KLCC. Enjoy tourist-centric services such as money changers, ATM machines, currency exchange kiosks, as well as specially curated tours for large groups.",
        operating_hour: "10:00 AM - 10:00 PM"
    },

    'zoo negara kl': {
        category: "destination",
        link_name: "zoo negara kl",
        name: "Zoo Negara KL",
        image: "/Zoo-Negara-KL.jpeg",
        idea: "Curious learners",
        duration: "1 Days",
        rating: "4.9",
        short_location: "Kuala Lumpur",
        location: "Jalan Taman Zooview, Taman Zooview, 68000 Ampang, Selangor",
        location_link: "https://www.google.com/maps/place/zoo+negara+kl/data=!4m2!3m1!1s0x31cc39b60a831fe1:0xf2c800c702db7b2f?sa=X&ved=1t:155783&ictx=111",
        price: 89,
        favourite: false,
        description: "The National Zoo is a Malaysian zoo located on 110 acres of land in Ulu Klang, Gombak District, Selangor, Malaysia. It was officially opened on November 14, 1963, by the country's first prime minister, Tunku Abdul Rahman.",
        operating_hour: "10:00 AM - 10:00 PM"
    },

    'bukit tabur': {
        category: "destination",
        link_name: "bukit tabur",
        name: "Bukit Tabur",
        image: "/bukit-tabur.jpg",
        idea: "Green Lifestyle Enthusiasts",
        duration: "1 Days",
        rating: "4.9",
        short_location: "Kuala Lumpur",
        location: "53100, Selangor",
        location_link: "https://www.google.com/maps/place/Bukit+Tabur/@3.2347219,101.747778,15z/data=!3m1!4b1!4m6!3m5!1s0x31cc38fc1e795d7d:0x330ab557cd2fc26c!8m2!3d3.234722!4d101.747778!16s%2Fg%2F11bc5tgndv?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D",
        price: 30,
        favourite: false,
        description: "Bukit Tabur, meaning Spread Rock Hill in Malay, is a prominent geological formation in Malaysia, specifically a quartz ridge, known for its challenging but rewarding hikes and stunning views. It's a popular destination for both local and international hikers, offering a mix of difficult terrain and panoramic vistas.",
        operating_hour: "10:00 AM - 10:00 PM"
    },

    'thean hou temple': {
        category: "destination",
        link_name: "thean hou temple",
        name: "Thean Hou Temple",
        image: "/thean-hou-temple.jpg",
        idea: "Cultural Lover",
        duration: "1 Days",
        rating: "4.9",
        short_location: "Kuala Lumpur",
        location: "65 Persiaran Endah Off Jalan Syed Putra, Kuala Lumpur 50460 Malaysia",
        location_link: "https://www.tripadvisor.com.my/Attraction_Review-g298570-d457134-Reviews-Thean_Hou_Temple-Kuala_Lumpur_Wilayah_Persekutuan.html#:~:text=65%20Persiaran%20Endah%20Off%20Jalan%20Syed%20Putra%2C%20Kuala%20Lumpur%2050460%20Malaysia",
        price: 39,
        favourite: false,
        description: "This ornate Chinese temple dedicated to the Queen of Heaven, Thean Hou, protectorate of people who make their living from the sea. The temple borrows from Buddhist, Taoist and Confucian traditions. Some visitors believe the panoramic views of KL alone make the trip up the hill worthwhile.",
        operating_hour: "10:00 AM - 5:30 PM"
    },

    'red square': {
        category: "destination",
        link_name: "red square",
        name: "Red Square",
        image: "/show-case-2.png",
        idea: "History Buffs",
        duration: "2 Days",
        rating: "4.9",
        short_location: "Melaka",
        location: "Bandar Hilir, 75200 Malacca",
        location_link: "https://www.google.com/maps/place/melaka+red+square/data=!4m2!3m1!1s0x31d1f1ddd411e8fb:0x564481a2e0e143f5?sa=X&ved=1t:155783&ictx=111",
        price: 159,
        favourite: false,
        description: "Historic square featuring maroon-colored structures in the Dutch colonial style.",
        operating_hour: "10:00 AM - 9:30 PM"
    },

    'encore melaka': {
        category: "destination",
        link_name: "encore melaka",
        name: "Encore Melaka",
        image: "/encore-melaka.jpg",
        idea: "Curious learners",
        duration: "2 Days",
        rating: "4.9",
        short_location: "Melaka",
        location: "No. 3 Jalan KSB Impression 8, Impression City at Kota Syahbandar, Melaka 75200 Malaysia",
        location_link: "https://www.google.com/maps/place/encore+melaka+location/data=!4m2!3m1!1s0x31d1f197bc36a73f:0x7cff815fe2da766c?sa=X&ved=1t:242&ictx=111",
        price: 159,
        favourite: false,
        description: "A cultural performance not to be missed ENCORE MELAKA is an immersive performance with a series of untold stories of Melaka, which reflects a society that embraces diversity and inclusiveness. This 70-minutes long mega show reminiscing life stories of the locals with state-of-the-art production sets. The audience will experience 360-degree rotating audience platform fronting a 240-meter long stage, multi-lifting platforms, sound & light and a 3D mapping projection that creates virtual reality that travels through time.",
        operating_hour: "11:00 AM - 10:30 PM"
    },

    'melaka straits mosque': {
        category: "destination",
        link_name: "melaka straits mosque",
        name: "Melaka Straits Mosque",
        image: "/straits-of-malacca-mosque.jpg",
        idea: "Cultural Lover",
        duration: "1 Days",
        rating: "4.9",
        short_location: "Melaka",
        location: "Masjid Selat, 75000, Melaka",
        location_link: "https://www.google.com/maps/dir//Masjid+Selat,+75000,+Melaka/@2.1790775,102.1667329,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31d1f1db5a5920d9:0xd9cf83e66b327038!2m2!1d102.2491797!2d2.1791849?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D",
        price: 59,
        favourite: false,
        description: "The Malacca Straits Mosque is a mosque located on the artificial Malacca Island in Malacca City, Malaysia. Constructed at a cost of about MYR10 million, it was inaugurated on 24 November 2006 by the King of Malaysia, Tuanku Syed Sirajuddin ibni Almarhum Tuanku Syed Putra Jamalullail.",
        operating_hour: "9:00 AM - 8:00 PM"
    },

    'baba house melaka': {
        category: "destination",
        link_name: "baba house melaka",
        name: "Baba House Melaka",
        image: "/baba-house-melaka.jpg",
        idea: "Cultural Lover",
        duration: "1 Days",
        rating: "4.2",
        short_location: "Melaka",
        location: "Taman Kota Laksamana, 75200 Melaka",
        location_link: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqEggAEAAYFBiHAhjjAhixAxiABDISCAAQABgUGIcCGOMCGLEDGIAEMhsIARAuGBQYrwEYxwEYhwIYsQMYgAQYmAUYmQUyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEAAYgAQyBggHEEUYPKgCALACAA&um=1&ie=UTF-8&fb=1&gl=my&sa=X&geocode=KX9XuJfc8dExMevkcnyFe38w&daddr=121-127,+Jalan+Tun+Tan+Cheng+Lock,+Taman+Kota+Laksamana,+75200+Melaka",
        price: 40,
        favourite: false,
        description: "Baba House Melaka is celebrated for combining traditional Peranakan charm with modern comforts, creating an inviting atmosphere that resonates with travelers. While guests commend the cleanliness and the service for enhancing their stay, some highlight concerns with room soundproofing and inconsistent housekeeping.",
        operating_hour: "9:00 AM - 8:00 PM"
    },

    // --- NEW DESTINATIONS ADDED BELOW ---

    'taman negara': {
        category: "destination",
        link_name: "taman negara",
        name: "Taman Negara",
        image: "/taman-negara.jpg",
        idea: "Adventure Seekers",
        duration: "3 Days",
        rating: "4.7",
        short_location: "Pahang",
        location: "Kuala Tahan, 27000 Jerantut, Pahang",
        location_link: "https://www.google.com/maps/place/Taman+Negara/@4.3411039,102.4042852,17z/data=!3m1!4b1!4m6!3m5!1s0x31c9447d483424ff:0x708a3f8115682245!8m2!3d4.3411039!4d102.4042852!16s%2Fg%2F11b6m70n0f?entry=ttu",
        price: 250, // Estimate for activities and basic entry, not including accommodation
        favourite: false,
        description: "Taman Negara is Malaysia's premier national park, boasting one of the world's oldest rainforests, estimated to be 130 million years old. It offers a wide range of activities including canopy walks, jungle trekking, river cruises, cave exploration, and visiting indigenous villages. It's a haven for wildlife enthusiasts and adventure seekers.",
        operating_hour: "8:00 AM - 5:00 PM (Visitor Centre), activities vary"
    },

    'perhentian islands': {
        category: "destination",
        link_name: "perhentian islands",
        name: "Perhentian Islands",
        image: "/perhentian-islands.jpg",
        idea: "Relaxation",
        duration: "4 Days",
        rating: "4.8",
        short_location: "Terengganu",
        location: "Pulau Perhentian Kecil, Kuala Besut, Terengganu",
        location_link: "https://www.google.com/maps/place/Perhentian+Kecil+Island/@5.9189675,102.730303,15z/data=!3m1!4b1!4m6!3m5!1s0x31b6e4e5e786b1c1:0x39df5c808f9ed08b!8m2!3d5.9189675!4d102.730303!16s%2Fg%2F11fn77h89j?entry=ttu",
        price: 350, // Estimate for boat transfer and basic activities
        favourite: false,
        description: "The Perhentian Islands (Pulau Perhentian) are a tropical paradise off the coast of Terengganu, renowned for their crystal-clear turquoise waters, pristine white-sand beaches, and vibrant coral reefs. They are a popular destination for snorkeling, diving, and simply relaxing amidst breathtaking natural beauty.",
        operating_hour: "Generally accessible (ferry schedules vary)"
    },

    'mount kinabalu': {
        category: "destination",
        link_name: "mount kinabalu",
        name: "Mount Kinabalu",
        image: "/mount-kinabalu.jpg",
        idea: "Adventure Seekers",
        duration: "3 Days",
        rating: "4.9",
        short_location: "Sabah",
        location: "Kinabalu Park, 89300 Ranau, Sabah",
        location_link: "https://www.google.com/maps/place/Mount+Kinabalu/@6.0754897,116.5562729,15z/data=!3m1!4b1!4m6!3m5!1s0x323b7e77b4202359:0x87d6fc71317e0892!8m2!3d6.0754897!4d116.5562729!16s%2Fg%2F11g_8w7y1m?entry=ttu",
        price: 800, // Estimate for permits, guide, and basic accommodation for climb
        favourite: false,
        description: "Standing at 4,095 meters, Mount Kinabalu is the highest peak in Southeast Asia and a UNESCO World Heritage Site. It's a challenging but rewarding climb, offering stunning panoramic views and showcasing incredible biodiversity, from unique flora like pitcher plants to various bird species.",
        operating_hour: "Kinabalu Park: 7:00 AM - 5:00 PM (climbing requires permits)"
    },

    'petaling street': {
        category: "destination",
        link_name: "petaling street",
        name: "Petaling Street (Chinatown KL)",
        image: "/petaling-street.jpg",
        idea: "Eco-conscious Shoppers",
        duration: "1 Days",
        rating: "4.5",
        short_location: "Kuala Lumpur",
        location: "Jalan Petaling, City Centre, 50000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
        location_link: "https://www.google.com/maps/place/Petaling+Street/@3.1444158,101.6978434,17z/data=!3m1!4b1!4m6!3m5!1s0x31cc49f2b87f4749:0x4d3755b72221b2d0!8m2!3d3.1444158!4d101.6978434!16s%2Fg%2F12239m2d?entry=ttu",
        price: 50, // Estimate for some shopping/food
        favourite: false,
        description: "Petaling Street, the heart of Kuala Lumpur's Chinatown, is a bustling market renowned for its vibrant atmosphere, street food, and wide array of goods, from clothing and souvenirs to electronics. It's a cultural hub that comes alive, especially in the evenings, offering a sensory explosion of sights, sounds, and smells.",
        operating_hour: "10:00 AM - 10:00 PM (some stalls open later)"
    },

    'sarawak cultural village': {
        category: "destination",
        link_name: "sarawak cultural village",
        name: "Sarawak Cultural Village",
        image: "/sarawak-cultural-village.jpg",
        idea: "Cultural Lover",
        duration: "1 Days",
        rating: "4.6",
        short_location: "Sarawak",
        location: "Pantai Damai, Santubong, 93756 Kuching, Sarawak",
        location_link: "https://www.google.com/maps/place/Sarawak+Cultural+Village/@1.7583685,110.3129528,17z/data=!3m1!4b1!4m6!3m5!1s0x31cba3e479c3f0b3:0x1b7024e073c6838a!8m2!3d1.7583685!4d110.3129528!16s%2Fm%2F03f0b0g?entry=ttu",
        price: 60,
        favourite: false,
        description: "Nestled at the foot of Mount Santubong, the Sarawak Cultural Village is a 'living museum' showcasing the diverse cultures and lifestyles of Sarawak's numerous ethnic groups. Visitors can explore traditional houses, observe craft demonstrations, and enjoy vibrant cultural performances, gaining insight into the rich heritage of Borneo.",
        operating_hour: "9:00 AM - 5:00 PM"
    },

    'putrajaya': {
        category: "destination",
        link_name: "putrajaya",
        name: "Putrajaya",
        image: "/putrajaya.jpg",
        idea: "Architectural Enthusiasts",
        duration: "1 Days",
        rating: "4.7",
        short_location: "Putrajaya",
        location: "62000 Putrajaya, Wilayah Persekutuan Putrajaya",
        location_link: "https://www.google.com/maps/place/Putrajaya/@2.9174549,101.6247963,12z/data=!3m1!4b1!4m6!3m5!1s0x31cdb6d5b0028e3b:0x5109675276635205!8m2!3d2.9238356!4d101.691746!16s%2Fg%2F11b6hs47f8?entry=ttu",
        price: 50, // Estimate for potential activities like lake cruise
        favourite: false,
        description: "Putrajaya, Malaysia's federal administrative capital, is a master-planned city known for its stunning modern Islamic architecture, expansive green spaces, and a large artificial lake. Key attractions include the Putra Mosque, Perdana Putra (Prime Minister's Office), and various bridges and gardens, making it ideal for sightseeing and leisurely strolls.",
        operating_hour: "Generally accessible, landmark hours vary"
    },

    'port dickson': {
        category: "destination",
        link_name: "port dickson",
        name: "Port Dickson",
        image: "/port-dickson.jpg",
        idea: "Family Travel",
        duration: "2 Days",
        rating: "4.2",
        short_location: "Negeri Sembilan",
        location: "71000 Port Dickson, Negeri Sembilan",
        location_link: "https://www.google.com/maps/place/Port+Dickson/@2.5204128,101.7610492,12z/data=!3m1!4b1!4m6!3m5!1s0x31cb92c287a950ed:0x2213e8b0934ef03f!8m2!3d2.5204128!4d101.7610492!16zL20vMDM1cW4w?entry=ttu",
        price: 150, // Estimate for some activities/basic resort stay
        favourite: false,
        description: "Port Dickson is a popular coastal town in Negeri Sembilan, well-known for its sandy beaches, resorts, and various recreational activities. It's a favored weekend getaway destination for families and city dwellers looking for sun, sand, and sea, offering opportunities for water sports, beach activities, and relaxing by the coast.",
        operating_hour: "Generally accessible"
    },
     'taman negara': {
        category: "destination",
        link_name: "taman negara",
        name: "Taman Negara",
        image: "/taman-negara.jpg",
        idea: "Adventure Seekers",
        duration: "3 Days",
        rating: "4.7",
        short_location: "Pahang",
        location: "Kuala Tahan, 27000 Jerantut, Pahang",
        location_link: "https://www.google.com/maps/place/Taman+Negara/@4.3411039,102.4042852,17z/data=!3m1!4b1!4m6!3m5!1s0x31c9447d483424ff:0x708a3f8115682245!8m2!3d4.3411039!4d102.4042852!16s%2Fg%2F11b6m70n0f?entry=ttu",
        price: 250, // Estimate for activities and basic entry, not including accommodation
        favourite: false,
        description: "Taman Negara is Malaysia's premier national park, boasting one of the world's oldest rainforests, estimated to be 130 million years old. It offers a wide range of activities including canopy walks, jungle trekking, river cruises, cave exploration, and visiting indigenous villages. It's a haven for wildlife enthusiasts and adventure seekers.",
        operating_hour: "8:00 AM - 5:00 PM (Visitor Centre), activities vary"
    },

    'perhentian islands': {
        category: "destination",
        link_name: "perhentian islands",
        name: "Perhentian Islands",
        image: "/perhentian-islands.jpg",
        idea: "Relaxation",
        duration: "4 Days",
        rating: "4.8",
        short_location: "Terengganu",
        location: "Pulau Perhentian Kecil, Kuala Besut, Terengganu",
        location_link: "https://www.google.com/maps/place/Perhentian+Kecil+Island/@5.9189675,102.730303,15z/data=!3m1!4b1!4m6!3m5!1s0x31b6e4e5e786b1c1:0x39df5c808f9ed08b!8m2!3d5.9189675!4d102.730303!16s%2Fg%2F11fn77h89j?entry=ttu",
        price: 350, // Estimate for boat transfer and basic activities
        favourite: false,
        description: "The Perhentian Islands (Pulau Perhentian) are a tropical paradise off the coast of Terengganu, renowned for their crystal-clear turquoise waters, pristine white-sand beaches, and vibrant coral reefs. They are a popular destination for snorkeling, diving, and simply relaxing amidst breathtaking natural beauty.",
        operating_hour: "Generally accessible (ferry schedules vary)"
    },

    'mount kinabalu': {
        category: "destination",
        link_name: "mount kinabalu",
        name: "Mount Kinabalu",
        image: "/mount-kinabalu.jpg",
        idea: "Adventure Seekers",
        duration: "3 Days",
        rating: "4.9",
        short_location: "Sabah",
        location: "Kinabalu Park, 89300 Ranau, Sabah",
        location_link: "https://www.google.com/maps/place/Mount+Kinabalu/@6.0754897,116.5562729,15z/data=!3m1!4b1!4m6!3m5!1s0x323b7e77b4202359:0x87d6fc71317e0892!8m2!3d6.0754897!4d116.5562729!16s%2Fg%2F11g_8w7y1m?entry=ttu",
        price: 800, // Estimate for permits, guide, and basic accommodation for climb
        favourite: false,
        description: "Standing at 4,095 meters, Mount Kinabalu is the highest peak in Southeast Asia and a UNESCO World Heritage Site. It's a challenging but rewarding climb, offering stunning panoramic views and showcasing incredible biodiversity, from unique flora like pitcher plants to various bird species.",
        operating_hour: "Kinabalu Park: 7:00 AM - 5:00 PM (climbing requires permits)"
    },

    'petaling street': {
        category: "destination",
        link_name: "petaling street",
        name: "Petaling Street (Chinatown KL)",
        image: "/petaling-street.jpg",
        idea: "Eco-conscious Shoppers", // Changed from "Eco-conscious Shoppers" as it's more about street shopping/culture
        duration: "1 Days",
        rating: "4.5",
        short_location: "Kuala Lumpur",
        location: "Jalan Petaling, City Centre, 50000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
        location_link: "https://www.google.com/maps/place/Petaling+Street/@3.1444158,101.6978434,17z/data=!3m1!4b1!4m6!3m5!1s0x31cc49f2b87f4749:0x4d3755b72221b2d0!8m2!3d3.1444158!4d101.6978434!16s%2Fg%2F12239m2d?entry=ttu",
        price: 50, // Estimate for some shopping/food
        favourite: false,
        description: "Petaling Street, the heart of Kuala Lumpur's Chinatown, is a bustling market renowned for its vibrant atmosphere, street food, and wide array of goods, from clothing and souvenirs to electronics. It's a cultural hub that comes alive, especially in the evenings, offering a sensory explosion of sights, sounds, and smells.",
        operating_hour: "10:00 AM - 10:00 PM (some stalls open later)"
    },

    'sarawak cultural village': {
        category: "destination",
        link_name: "sarawak cultural village",
        name: "Sarawak Cultural Village",
        image: "/sarawak-cultural-village.jpg",
        idea: "Cultural Lover",
        duration: "1 Days",
        rating: "4.6",
        short_location: "Sarawak",
        location: "Pantai Damai, Santubong, 93756 Kuching, Sarawak",
        location_link: "https://www.google.com/maps/place/Sarawak+Cultural+Village/@1.7583685,110.3129528,17z/data=!3m1!4b1!4m6!3m5!1s0x31cba3e479c3f0b3:0x1b7024e073c6838a!8m2!3d1.7583685!4d110.3129528!16s%2Fg%2F11b6m70n0f?entry=ttu",
        price: 60,
        favourite: false,
        description: "Nestled at the foot of Mount Santubong, the Sarawak Cultural Village is a 'living museum' showcasing the diverse cultures and lifestyles of Sarawak's numerous ethnic groups. Visitors can explore traditional houses, observe craft demonstrations, and enjoy vibrant cultural performances, gaining insight into the rich heritage of Borneo.",
        operating_hour: "9:00 AM - 5:00 PM"
    },

    'putrajaya': {
        category: "destination",
        link_name: "putrajaya",
        name: "Putrajaya",
        image: "/putrajaya.jpg",
        idea: "Architectural Enthusiasts",
        duration: "1 Days",
        rating: "4.7",
        short_location: "Putrajaya",
        location: "62000 Putrajaya, Wilayah Persekutuan Putrajaya",
        location_link: "https://www.google.com/maps/place/Putrajaya/@2.9174549,101.6247963,12z/data=!3m1!4b1!4m6!3m5!1s0x31cdb6d5b0028e3b:0x5109675276635205!8m2!3d2.9238356!4d101.691746!16s%2Fg%2F11b6hs47f8?entry=ttu",
        price: 50, // Estimate for potential activities like lake cruise
        favourite: false,
        description: "Putrajaya, Malaysia's federal administrative capital, is a master-planned city known for its stunning modern Islamic architecture, expansive green spaces, and a large artificial lake. Key attractions include the Putra Mosque, Perdana Putra (Prime Minister's Office), and various bridges and gardens, making it ideal for sightseeing and leisurely strolls.",
        operating_hour: "Generally accessible, landmark hours vary"
    },

    'port dickson': {
        category: "destination",
        link_name: "port dickson",
        name: "Port Dickson",
        image: "/port-dickson.jpg",
        idea: "Family Travel",
        duration: "2 Days",
        rating: "4.2",
        short_location: "Negeri Sembilan",
        location: "71000 Port Dickson, Negeri Sembilan",
        location_link: "https://www.google.com/maps/place/Port+Dickson/@2.5204128,101.7610492,12z/data=!3m1!4b1!4m6!3m5!1s0x31cb92c287a950ed:0x2213e8b0934ef03f!8m2!3d2.5204128!4d101.7610492!16zL2m/MDM1cW4w?entry=ttu",
        price: 150, // Estimate for some activities/basic resort stay
        favourite: false,
        description: "Port Dickson is a popular coastal town in Negeri Sembilan, well-known for its sandy beaches, resorts, and various recreational activities. It's a favored weekend getaway destination for families and city dwellers looking for sun, sand, and sea, offering opportunities for water sports, beach activities, and relaxing by the coast.",
        operating_hour: "Generally accessible"
    },

    'ipoh old town': {
        category: "destination",
        link_name: "ipoh old town",
        name: "Ipoh Old Town",
        image: "/ipoh-old-town.jpg",
        idea: "Foodie Adventures",
        duration: "2 Days",
        rating: "4.7",
        short_location: "Perak",
        location: "Jalan Bandar Timah, 30000 Ipoh, Perak",
        location_link: "https://www.google.com/maps/place/Ipoh+Old+Town/@4.5973273,101.077271,17z/data=!3m1!4b1!4m6!3m5!1s0x31cd330f6a27e71f:0x79469796e952671e!8m2!3d4.5973273!4d101.077271!16s%2Fg%2F11c341q3d8?entry=ttu",
        price: 90,
        favourite: false,
        description: "Ipoh Old Town is famed for its colonial architecture, vibrant street art, and most notably, its incredible culinary scene. Visitors flock here to sample local delicacies like Ipoh white coffee, bean sprout chicken, and dim sum, while exploring charming heritage buildings and quirky cafes. It's a perfect blend of history, art, and delicious food.",
        operating_hour: "Generally accessible, shops/eateries vary (typically 8:00 AM - 6:00 PM for most)"
    },

    'redang island': {
        category: "destination",
        link_name: "redang island",
        name: "Redang Island",
        image: "/redang-island.jpg",
        idea: "Snorkeling & Diving",
        duration: "4 Days",
        rating: "4.9",
        short_location: "Terengganu",
        location: "Pulau Redang, 21090 Kuala Terengganu, Terengganu",
        location_link: "https://www.google.com/maps/place/Redang+Island/@5.7797746,102.9972323,13z/data=!3m1!4b1!4m6!3m5!1s0x31b5c468e826b0a9:0xc8e932b712b7a07a!8m2!3d5.7797746!4d102.9972323!16s%2Fg%2F1227092z?entry=ttu",
        price: 450, // Estimate for boat transfer and basic activities
        favourite: false,
        description: "Redang Island (Pulau Redang) is one of Malaysia's largest and most stunning islands off the coast of Terengganu, forming part of a marine park. It is celebrated for its pristine white sands, crystal-clear waters, and rich marine biodiversity, making it a prime destination for snorkeling, diving, and beach relaxation. Many resorts line its beautiful shores.",
        operating_hour: "Generally accessible (ferry schedules vary, seasonal closures)"
    },

    'gurney drive': {
        category: "destination",
        link_name: "gurney drive",
        name: "Gurney Drive Hawker Centre",
        image: "/gurney-drive.jpg",
        idea: "Foodie Adventures",
        duration: "1 Days",
        rating: "4.4",
        short_location: "Penang",
        location: "172 Solok Gurney 1, George Town, 10250 George Town, Pulau Pinang",
        location_link: "https://www.google.com/maps/place/Gurney+Drive+Hawker+Centre/@5.437346,100.310185,17z/data=!3m1!4b1!4m6!3m5!1s0x304ac2465e900c43:0x1b43a5710dd9f67a!8m2!3d5.437346!4d100.310185!16s%2Fg%2F12h4m2q0t?entry=ttu",
        price: 60, // Estimate for food
        favourite: false,
        description: "Gurney Drive Hawker Centre in Penang is an iconic open-air food paradise, famous for its vast selection of local Malaysian street food. It's a must-visit for food lovers, offering everything from char kway teow and asam laksa to satay and fresh seafood. The bustling atmosphere and delicious aromas make for an unforgettable culinary experience, especially in the evening.",
        operating_hour: "Typically 4:30 PM - 12:00 AM"
    },

    'desaru coast': {
        category: "destination",
        link_name: "desaru coast",
        name: "Desaru Coast",
        image: "/desaru-coast.jpg",
        idea: "Family Travel",
        duration: "3 Days",
        rating: "4.5",
        short_location: "Johor",
        location: "Bandar Penawar, 81930 Desaru, Johor",
        location_link: "https://www.google.com/maps/place/Desaru+Coast/@1.4921606,104.227494,14z/data=!3m1!4b1!4m6!3m5!1s0x31da3b392e20563b:0x5e2c53f80c65532d!8m2!3d1.4921606!4d104.227494!16s%2Fg%2F11fnl5p7f3?entry=ttu",
        price: 300, // Estimate for general activities/entry to waterpark
        favourite: false,
        description: "Desaru Coast is a rapidly developing coastal resort area in Johor, featuring world-class hotels, a large water park (Desaru Coast Adventure Waterpark), and a championship golf course. It offers a luxurious and family-friendly beach escape with pristine shores, diverse dining options, and recreational activities perfect for a relaxing holiday.",
        operating_hour: "Waterpark: 10:00 AM - 6:00 PM (daily except Tuesdays, subject to change)"
    },

    'frasers hill': {
        category: "destination",
        link_name: "frasers hill",
        name: "Fraser's Hill",
        image: "/frasers-hill.jpg",
        idea: "Nature Retreat",
        duration: "2 Days",
        rating: "4.3",
        short_location: "Pahang",
        location: "49000 Fraser's Hill, Pahang",
        location_link: "https://www.google.com/maps/place/Fraser's+Hill/@3.704253,101.7397787,14z/data=!3m1!4b1!4m6!3m5!1s0x31cc04c000000001:0x1b8f17e33a1e944b!8m2!3d3.704253!4d101.7397787!16s%2Fg%2F11b6m286s2?entry=ttu",
        price: 180, // Estimate for accommodation and some activities
        favourite: false,
        description: "Fraser's Hill is a tranquil colonial-era hill station in Pahang, known for its cool climate, lush greenery, and charming old-world appeal. It's a haven for birdwatchers, nature lovers, and those seeking a peaceful escape from city life. Activities include jungle trekking, golfing, boating, and enjoying the serene environment.",
        operating_hour: "Generally accessible, attractions vary (e.g., Jeriau Waterfall)"
    }
};


module.exports = destinations;
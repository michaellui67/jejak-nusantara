import { Location, Badge } from './types';

// Helper to generate slight coordinate variations around a base point
const genCoord = (baseLat: number, baseLng: number, index: number) => {
    const offset = (index % 10) * 0.05;
    return { lat: baseLat + offset, lng: baseLng + offset };
};

export const LOCATIONS: Location[] = [
    // Java
    { id: 1, name: 'Borobudur Temple', province: 'Central Java', island: 'Java', category: 'Heritage', ...genCoord(-7.607, 110.203, 1), descriptionEn: 'The world\'s largest Buddhist temple, built in the 9th century.', descriptionId: 'Candi Buddha terbesar di dunia, dibangun pada abad ke-9.', tipsEn: 'Visit at sunrise for a magical experience.', tipsId: 'Kunjungi saat matahari terbit untuk pengalaman magis.' },
    { id: 2, name: 'Prambanan Temple', province: 'Yogyakarta', island: 'Java', category: 'Heritage', ...genCoord(-7.752, 110.491, 2), descriptionEn: 'A magnificent 9th-century Hindu temple complex.', descriptionId: 'Kompleks candi Hindu abad ke-9 yang megah.', tipsEn: 'Watch the Ramayana Ballet in the evening.', tipsId: 'Tonton Sendratari Ramayana di malam hari.' },
    { id: 3, name: 'Mount Bromo', province: 'East Java', island: 'Java', category: 'Nature', ...genCoord(-7.942, 112.953, 3), descriptionEn: 'An active volcano known for its otherworldly landscape.', descriptionId: 'Gunung berapi aktif yang dikenal dengan pemandangannya yang menakjubkan.', tipsEn: 'Bring warm clothes, it gets very cold at night.', tipsId: 'Bawa pakaian hangat, sangat dingin di malam hari.' },
    { id: 4, name: 'Kawah Ijen', province: 'East Java', island: 'Java', category: 'Nature', ...genCoord(-8.058, 114.242, 4), descriptionEn: 'Famous for its blue fire and acidic crater lake.', descriptionId: 'Terkenal dengan api biru dan danau kawah asamnya.', tipsEn: 'Requires a midnight hike. Gas mask recommended.', tipsId: 'Membutuhkan pendakian tengah malam. Disarankan memakai masker gas.' },
    { id: 5, name: 'Keraton Yogyakarta', province: 'Yogyakarta', island: 'Java', category: 'Heritage', ...genCoord(-7.805, 110.364, 5), descriptionEn: 'The grand palace of the Yogyakarta Sultanate.', descriptionId: 'Istana megah Kesultanan Yogyakarta.', tipsEn: 'Dress modestly. Guided tours are highly recommended.', tipsId: 'Berpakaian sopan. Tur berpemandu sangat disarankan.' },
    { id: 6, name: 'Keraton Surakarta', province: 'Central Java', island: 'Java', category: 'Heritage', ...genCoord(-7.577, 110.828, 6), descriptionEn: 'The royal palace of the Surakarta Sunanate.', descriptionId: 'Istana kerajaan Kasunanan Surakarta.', tipsEn: 'Explore the museum inside the palace grounds.', tipsId: 'Jelajahi museum di dalam area istana.' },
    { id: 7, name: 'Trowulan (Majapahit)', province: 'East Java', island: 'Java', category: 'Heritage', ...genCoord(-7.556, 112.383, 7), descriptionEn: 'Archaeological site of the capital city of the Majapahit Empire.', descriptionId: 'Situs arkeologi ibu kota Kerajaan Majapahit.', tipsEn: 'Rent a bicycle to explore the widespread ruins.', tipsId: 'Sewa sepeda untuk menjelajahi reruntuhan yang tersebar.' },
    { id: 8, name: 'Sangiran', province: 'Central Java', island: 'Java', category: 'Heritage', ...genCoord(-7.450, 110.833, 8), descriptionEn: 'An important site for studying human evolution (Java Man).', descriptionId: 'Situs penting untuk mempelajari evolusi manusia (Manusia Jawa).', tipsEn: 'Visit the museum to see the fossil replicas.', tipsId: 'Kunjungi museum untuk melihat replika fosil.' },
    { id: 9, name: 'Mount Merapi', province: 'Yogyakarta', island: 'Java', category: 'Nature', ...genCoord(-7.540, 110.446, 9), descriptionEn: 'One of Indonesia\'s most active volcanoes.', descriptionId: 'Salah satu gunung berapi paling aktif di Indonesia.', tipsEn: 'Take a lava tour by jeep.', tipsId: 'Ikuti tur lava dengan jip.' },
    { id: 10, name: 'Kota Tua Jakarta', province: 'DKI Jakarta', island: 'Java', category: 'Urban', ...genCoord(-6.137, 106.814, 10), descriptionEn: 'The old town of Jakarta, featuring Dutch colonial architecture.', descriptionId: 'Kota tua Jakarta, menampilkan arsitektur kolonial Belanda.', tipsEn: 'Rent a colorful bicycle in Fatahillah Square.', tipsId: 'Sewa sepeda warna-warni di Taman Fatahillah.' },
    { id: 11, name: 'Semarang Old Town', province: 'Central Java', island: 'Java', category: 'Urban', ...genCoord(-6.968, 110.427, 11), descriptionEn: 'Known as "Outstadt", featuring well-preserved colonial buildings.', descriptionId: 'Dikenal sebagai "Outstadt", menampilkan bangunan kolonial yang terawat baik.', tipsEn: 'Visit the iconic Blenduk Church.', tipsId: 'Kunjungi Gereja Blenduk yang ikonik.' },
    { id: 12, name: 'Surabaya Old Town', province: 'East Java', island: 'Java', category: 'Urban', ...genCoord(-7.233, 112.738, 12), descriptionEn: 'Historic area reflecting Surabaya\'s past as a major trading port.', descriptionId: 'Kawasan bersejarah yang mencerminkan masa lalu Surabaya sebagai pelabuhan perdagangan utama.', tipsEn: 'Explore the Arab Quarter and House of Sampoerna.', tipsId: 'Jelajahi Kampung Arab dan House of Sampoerna.' },
    { id: 13, name: 'Kampung Naga', province: 'West Java', island: 'Java', category: 'Hidden Gem', ...genCoord(-7.361, 107.995, 13), descriptionEn: 'A traditional Sundanese village that preserves its ancestral way of life.', descriptionId: 'Desa tradisional Sunda yang melestarikan cara hidup leluhurnya.', tipsEn: 'Be prepared to walk down hundreds of steps to reach the village.', tipsId: 'Bersiaplah untuk menuruni ratusan anak tangga untuk mencapai desa.' },
    { id: 14, name: 'Dieng Plateau', province: 'Central Java', island: 'Java', category: 'Sacred', ...genCoord(-7.204, 109.905, 14), descriptionEn: 'A volcanic complex with ancient Hindu temples and colored lakes.', descriptionId: 'Kompleks vulkanik dengan candi Hindu kuno dan danau berwarna.', tipsEn: 'Try the local specialty, Mie Ongklok.', tipsId: 'Cobalah makanan khas setempat, Mie Ongklok.' },
    { id: 15, name: 'Kawah Putih', province: 'West Java', island: 'Java', category: 'Nature', ...genCoord(-7.166, 107.402, 15), descriptionEn: 'A striking crater lake known for its pale, turquoise waters.', descriptionId: 'Danau kawah mencolok yang dikenal dengan perairannya yang pucat dan biru kehijauan.', tipsEn: 'The sulfur smell can be strong; bring a mask.', tipsId: 'Bau belerang bisa menyengat; bawa masker.' },
    
    // Bali
    { id: 16, name: 'Tanah Lot', province: 'Bali', island: 'Bali', category: 'Sacred', ...genCoord(-8.621, 115.087, 16), descriptionEn: 'An iconic sea temple perched on a rock formation.', descriptionId: 'Pura laut ikonik yang bertengger di atas formasi batu karang.', tipsEn: 'Best visited at sunset, but expect crowds.', tipsId: 'Paling baik dikunjungi saat matahari terbenam, tetapi bersiaplah untuk keramaian.' },
    { id: 17, name: 'Uluwatu Temple', province: 'Bali', island: 'Bali', category: 'Sacred', ...genCoord(-8.829, 115.084, 17), descriptionEn: 'A spectacular cliff-top temple overlooking the Indian Ocean.', descriptionId: 'Pura tebing yang spektakuler menghadap ke Samudra Hindia.', tipsEn: 'Watch out for the mischievous monkeys!', tipsId: 'Hati-hati dengan monyet yang nakal!' },
    { id: 18, name: 'Besakih Temple', province: 'Bali', island: 'Bali', category: 'Sacred', ...genCoord(-8.374, 115.450, 18), descriptionEn: 'Known as the "Mother Temple" of Bali, located on Mount Agung.', descriptionId: 'Dikenal sebagai "Pura Besakih" di Bali, terletak di Gunung Agung.', tipsEn: 'Hire a local guide to understand the complex layout.', tipsId: 'Sewa pemandu lokal untuk memahami tata letak yang kompleks.' },
    { id: 19, name: 'Tirta Empul', province: 'Bali', island: 'Bali', category: 'Sacred', ...genCoord(-8.414, 115.315, 19), descriptionEn: 'A Hindu Balinese water temple famous for its holy spring water.', descriptionId: 'Pura air Hindu Bali yang terkenal dengan mata air sucinya.', tipsEn: 'You can participate in the purification ritual (melukat).', tipsId: 'Anda dapat berpartisipasi dalam ritual penyucian (melukat).' },
    { id: 20, name: 'Goa Lawah', province: 'Bali', island: 'Bali', category: 'Sacred', ...genCoord(-8.551, 115.468, 20), descriptionEn: 'The "Bat Cave" temple, one of Bali\'s key directional temples.', descriptionId: 'Pura "Goa Lawah", salah satu pura arah utama di Bali.', tipsEn: 'Observe the thousands of bats hanging in the cave.', tipsId: 'Amati ribuan kelelawar yang bergelantungan di dalam gua.' },
    { id: 21, name: 'Pura Luhur Batukaru', province: 'Bali', island: 'Bali', category: 'Sacred', ...genCoord(-8.372, 115.103, 21), descriptionEn: 'A serene temple located on the slopes of Mount Batukaru.', descriptionId: 'Pura yang tenang terletak di lereng Gunung Batukaru.', tipsEn: 'Enjoy the peaceful, misty atmosphere away from the crowds.', tipsId: 'Nikmati suasana damai dan berkabut jauh dari keramaian.' },
    { id: 22, name: 'Pura Ulun Danu Bratan', province: 'Bali', island: 'Bali', category: 'Sacred', ...genCoord(-8.275, 115.166, 22), descriptionEn: 'A picturesque water temple on the shores of Lake Bratan.', descriptionId: 'Pura air yang indah di tepi Danau Bratan.', tipsEn: 'Rent a boat to see the temple from the water.', tipsId: 'Sewa perahu untuk melihat pura dari air.' },
    { id: 23, name: 'Tegalalang Rice Terrace', province: 'Bali', island: 'Bali', category: 'Nature', ...genCoord(-8.433, 115.279, 23), descriptionEn: 'Stunning terraced rice paddies offering beautiful landscapes.', descriptionId: 'Sawah terasering menakjubkan yang menawarkan pemandangan indah.', tipsEn: 'Arrive early morning for the best light and fewer tourists.', tipsId: 'Tiba pagi hari untuk cahaya terbaik dan lebih sedikit turis.' },
    { id: 24, name: 'Ubud', province: 'Bali', island: 'Bali', category: 'Urban', ...genCoord(-8.506, 115.262, 24), descriptionEn: 'The cultural heart of Bali, known for arts, crafts, and dance.', descriptionId: 'Pusat budaya Bali, yang dikenal dengan seni, kerajinan, dan tarian.', tipsEn: 'Visit the Monkey Forest and local art markets.', tipsId: 'Kunjungi Hutan Monyet dan pasar seni lokal.' },
    { id: 25, name: 'Nusa Penida', province: 'Bali', island: 'Bali', category: 'Nature', ...genCoord(-8.727, 115.544, 25), descriptionEn: 'An island southeast of Bali known for dramatic cliffs and clear waters.', descriptionId: 'Pulau di tenggara Bali yang dikenal dengan tebing dramatis dan perairan jernih.', tipsEn: 'Don\'t miss Kelingking Beach and Broken Beach.', tipsId: 'Jangan lewatkan Pantai Kelingking dan Broken Beach.' },

    // Lombok & Flores (Nusa Tenggara)
    { id: 26, name: 'Mount Rinjani', province: 'West Nusa Tenggara', island: 'Lombok', category: 'Nature', ...genCoord(-8.411, 116.457, 26), descriptionEn: 'A massive active volcano dominating the landscape of Lombok.', descriptionId: 'Gunung berapi aktif besar yang mendominasi lanskap Lombok.', tipsEn: 'Trekking requires a guide and good physical fitness.', tipsId: 'Pendakian membutuhkan pemandu dan kebugaran fisik yang baik.' },
    { id: 27, name: 'Sendang Gile Waterfall', province: 'West Nusa Tenggara', island: 'Lombok', category: 'Nature', ...genCoord(-8.300, 116.399, 27), descriptionEn: 'A beautiful waterfall located at the foot of Mount Rinjani.', descriptionId: 'Air terjun indah yang terletak di kaki Gunung Rinjani.', tipsEn: 'Combine with a visit to Tiu Kelep waterfall nearby.', tipsId: 'Gabungkan dengan kunjungan ke air terjun Tiu Kelep di dekatnya.' },
    { id: 28, name: 'Gili Trawangan', province: 'West Nusa Tenggara', island: 'Lombok', category: 'Nature', ...genCoord(-8.350, 116.038, 28), descriptionEn: 'The largest and most popular of the Gili Islands.', descriptionId: 'Yang terbesar dan paling populer dari Kepulauan Gili.', tipsEn: 'No motorized vehicles allowed; rent a bike or walk.', tipsId: 'Tidak ada kendaraan bermotor yang diizinkan; sewa sepeda atau jalan kaki.' },
    { id: 29, name: 'Sade Sasak Village', province: 'West Nusa Tenggara', island: 'Lombok', category: 'Heritage', ...genCoord(-8.838, 116.291, 29), descriptionEn: 'A traditional village showcasing the culture of the indigenous Sasak people.', descriptionId: 'Desa tradisional yang menampilkan budaya masyarakat adat Sasak.', tipsEn: 'Buy traditional hand-woven textiles directly from the makers.', tipsId: 'Beli tekstil tenun tangan tradisional langsung dari pembuatnya.' },
    { id: 30, name: 'Gili Meno', province: 'West Nusa Tenggara', island: 'Lombok', category: 'Hidden Gem', ...genCoord(-8.350, 116.058, 30), descriptionEn: 'The quietest of the Gili Islands, perfect for a peaceful retreat.', descriptionId: 'Yang paling tenang dari Kepulauan Gili, cocok untuk liburan yang damai.', tipsEn: 'Snorkel to see the underwater statues and sea turtles.', tipsId: 'Snorkeling untuk melihat patung bawah laut dan penyu.' },
    { id: 31, name: 'Pura Meru Mataram', province: 'West Nusa Tenggara', island: 'Lombok', category: 'Sacred', ...genCoord(-8.588, 116.116, 31), descriptionEn: 'The largest Hindu temple in Lombok, built in 1720.', descriptionId: 'Pura Hindu terbesar di Lombok, dibangun pada tahun 1720.', tipsEn: 'Observe the three multi-tiered shrines representing the Hindu trinity.', tipsId: 'Amati tiga tempat suci bertingkat yang mewakili trinitas Hindu.' },
    { id: 32, name: 'Komodo National Park', province: 'East Nusa Tenggara', island: 'Flores', category: 'Nature', ...genCoord(-8.591, 119.430, 32), descriptionEn: 'Home to the famous Komodo dragons and stunning marine life.', descriptionId: 'Rumah bagi komodo yang terkenal dan kehidupan laut yang menakjubkan.', tipsEn: 'Always stay with your ranger when trekking.', tipsId: 'Selalu bersama ranger Anda saat trekking.' },
    { id: 33, name: 'Kelimutu', province: 'East Nusa Tenggara', island: 'Flores', category: 'Nature', ...genCoord(-8.765, 121.820, 33), descriptionEn: 'A volcano famous for its three striking crater lakes of varying colors.', descriptionId: 'Gunung berapi yang terkenal dengan tiga danau kawahnya yang mencolok dengan warna yang bervariasi.', tipsEn: 'Sunrise is the best time to view the lakes.', tipsId: 'Matahari terbit adalah waktu terbaik untuk melihat danau.' },
    { id: 34, name: 'Pink Beach', province: 'East Nusa Tenggara', island: 'Flores', category: 'Hidden Gem', ...genCoord(-8.600, 119.516, 34), descriptionEn: 'A unique beach with pink sand, caused by microscopic organisms.', descriptionId: 'Pantai unik dengan pasir merah muda, disebabkan oleh organisme mikroskopis.', tipsEn: 'Great spot for snorkeling and photography.', tipsId: 'Tempat yang bagus untuk snorkeling dan fotografi.' },
    { id: 35, name: 'Labuan Bajo', province: 'East Nusa Tenggara', island: 'Flores', category: 'Urban', ...genCoord(-8.496, 119.887, 35), descriptionEn: 'A bustling port town and the gateway to Komodo National Park.', descriptionId: 'Kota pelabuhan yang ramai dan pintu gerbang ke Taman Nasional Komodo.', tipsEn: 'Enjoy fresh seafood at the night market.', tipsId: 'Nikmati makanan laut segar di pasar malam.' },
    { id: 36, name: 'Wae Rebo', province: 'East Nusa Tenggara', island: 'Flores', category: 'Hidden Gem', ...genCoord(-8.768, 120.285, 36), descriptionEn: 'An isolated traditional Manggarai village with iconic cone-shaped houses.', descriptionId: 'Desa tradisional Manggarai yang terisolasi dengan rumah berbentuk kerucut yang ikonik.', tipsEn: 'Requires a challenging hike; stay overnight for the full experience.', tipsId: 'Membutuhkan pendakian yang menantang; menginap semalam untuk pengalaman penuh.' },
    { id: 37, name: 'Bena Village', province: 'East Nusa Tenggara', island: 'Flores', category: 'Heritage', ...genCoord(-8.833, 120.983, 37), descriptionEn: 'A megalithic village known for its traditional houses and stone formations.', descriptionId: 'Desa megalitik yang dikenal dengan rumah tradisional dan formasi batunya.', tipsEn: 'Buy locally woven ikat fabrics.', tipsId: 'Beli kain tenun ikat lokal.' },

    // Sulawesi
    { id: 38, name: 'Tana Toraja', province: 'South Sulawesi', island: 'Sulawesi', category: 'Heritage', ...genCoord(-2.983, 119.897, 38), descriptionEn: 'Highland region known for its elaborate funeral rites and traditional houses.', descriptionId: 'Daerah dataran tinggi yang dikenal dengan upacara pemakaman yang rumit dan rumah tradisional.', tipsEn: 'Respect local customs during ceremonies.', tipsId: 'Hormati adat istiadat setempat selama upacara.' },
    { id: 39, name: 'Bunaken', province: 'North Sulawesi', island: 'Sulawesi', category: 'Nature', ...genCoord(1.623, 124.761, 39), descriptionEn: 'A marine park offering some of the best scuba diving in the world.', descriptionId: 'Taman laut yang menawarkan beberapa scuba diving terbaik di dunia.', tipsEn: 'Look out for the steep coral drop-offs.', tipsId: 'Perhatikan tebing karang yang curam.' },
    { id: 40, name: 'Togean Islands', province: 'Central Sulawesi', island: 'Sulawesi', category: 'Hidden Gem', ...genCoord(-0.366, 121.983, 40), descriptionEn: 'An archipelago with pristine beaches and a unique jellyfish lake.', descriptionId: 'Kepulauan dengan pantai murni dan danau ubur-ubur yang unik.', tipsEn: 'Swim with stingless jellyfish in Lake Mariona.', tipsId: 'Berenang bersama ubur-ubur tak menyengat di Danau Mariona.' },
    { id: 41, name: 'Fort Rotterdam Makassar', province: 'South Sulawesi', island: 'Sulawesi', category: 'Urban', ...genCoord(-5.133, 119.405, 41), descriptionEn: 'A 17th-century fort built by the Dutch East India Company.', descriptionId: 'Benteng abad ke-17 yang dibangun oleh Perusahaan Hindia Timur Belanda.', tipsEn: 'Visit the La Galigo Museum inside the fort.', tipsId: 'Kunjungi Museum La Galigo di dalam benteng.' },
    { id: 42, name: 'Lake Tondano', province: 'North Sulawesi', island: 'Sulawesi', category: 'Nature', ...genCoord(1.250, 124.900, 42), descriptionEn: 'A large crater lake surrounded by mountains.', descriptionId: 'Danau kawah besar yang dikelilingi pegunungan.', tipsEn: 'Try the local freshwater fish dishes.', tipsId: 'Cobalah hidangan ikan air tawar setempat.' },
    { id: 43, name: 'Lake Poso', province: 'Central Sulawesi', island: 'Sulawesi', category: 'Nature', ...genCoord(-1.916, 120.600, 43), descriptionEn: 'Indonesia\'s third deepest lake, known for its clear water and white sand beaches.', descriptionId: 'Danau terdalam ketiga di Indonesia, dikenal dengan air jernih dan pantai pasir putihnya.', tipsEn: 'Visit the Saluopa Waterfall nearby.', tipsId: 'Kunjungi Air Terjun Saluopa di dekatnya.' },
    { id: 44, name: 'Wakatobi', province: 'Southeast Sulawesi', island: 'Sulawesi', category: 'Nature', ...genCoord(-5.316, 123.583, 44), descriptionEn: 'A premier diving destination with incredibly diverse coral reefs.', descriptionId: 'Tujuan menyelam utama dengan terumbu karang yang sangat beragam.', tipsEn: 'Best visited between March and December for diving.', tipsId: 'Paling baik dikunjungi antara Maret dan Desember untuk menyelam.' },

    // Sumatra
    { id: 45, name: 'Lake Toba', province: 'North Sumatra', island: 'Sumatra', category: 'Nature', ...genCoord(-2.600, 98.833, 45), descriptionEn: 'The largest volcanic lake in the world, with Samosir Island in its center.', descriptionId: 'Danau vulkanik terbesar di dunia, dengan Pulau Samosir di tengahnya.', tipsEn: 'Explore Batak culture on Samosir Island.', tipsId: 'Jelajahi budaya Batak di Pulau Samosir.' },
    { id: 46, name: 'Bukit Lawang', province: 'North Sumatra', island: 'Sumatra', category: 'Nature', ...genCoord(3.550, 98.116, 46), descriptionEn: 'A gateway to Gunung Leuser National Park, famous for orangutan rehabilitation.', descriptionId: 'Pintu gerbang ke Taman Nasional Gunung Leuser, terkenal dengan rehabilitasi orangutan.', tipsEn: 'Go jungle trekking to see semi-wild orangutans.', tipsId: 'Pergi trekking hutan untuk melihat orangutan semi-liar.' },
    { id: 47, name: 'Mount Sinabung', province: 'North Sumatra', island: 'Sumatra', category: 'Nature', ...genCoord(3.170, 98.392, 47), descriptionEn: 'A highly active stratovolcano.', descriptionId: 'Gunung berapi stratovulkanik yang sangat aktif.', tipsEn: 'Check local safety advisories before visiting the area.', tipsId: 'Periksa saran keselamatan setempat sebelum mengunjungi daerah tersebut.' },
    { id: 48, name: 'Lake Maninjau', province: 'West Sumatra', island: 'Sumatra', category: 'Nature', ...genCoord(-0.333, 100.200, 48), descriptionEn: 'A serene caldera lake accessed via a road with 44 hairpin turns.', descriptionId: 'Danau kaldera yang tenang diakses melalui jalan dengan 44 tikungan tajam.', tipsEn: 'Enjoy the view from the top before descending the Kelok 44.', tipsId: 'Nikmati pemandangan dari atas sebelum menuruni Kelok 44.' },
    { id: 49, name: 'Lake Singkarak', province: 'West Sumatra', island: 'Sumatra', category: 'Nature', ...genCoord(-0.616, 100.533, 49), descriptionEn: 'The largest lake in West Sumatra, famous for the endemic Bilih fish.', descriptionId: 'Danau terbesar di Sumatera Barat, terkenal dengan ikan Bilih endemik.', tipsEn: 'Try the crispy fried Bilih fish.', tipsId: 'Cobalah ikan Bilih goreng renyah.' },
    { id: 50, name: 'Padang Old Town', province: 'West Sumatra', island: 'Sumatra', category: 'Urban', ...genCoord(-0.950, 100.366, 50), descriptionEn: 'Historic area along the Muaro river with colonial architecture.', descriptionId: 'Kawasan bersejarah di sepanjang sungai Muaro dengan arsitektur kolonial.', tipsEn: 'Stroll along the riverfront at sunset.', tipsId: 'Berjalan-jalan di sepanjang tepi sungai saat matahari terbenam.' },
    { id: 51, name: 'Bukittinggi & Fort de Kock', province: 'West Sumatra', island: 'Sumatra', category: 'Heritage', ...genCoord(-0.300, 100.366, 51), descriptionEn: 'A charming highland city featuring a Dutch fort and the Jam Gadang clock tower.', descriptionId: 'Kota dataran tinggi yang menawan menampilkan benteng Belanda dan menara jam Jam Gadang.', tipsEn: 'Visit the bustling Pasar Atas market.', tipsId: 'Kunjungi pasar Pasar Atas yang ramai.' },

    // Kalimantan
    { id: 52, name: 'Derawan Islands', province: 'East Kalimantan', island: 'Kalimantan', category: 'Hidden Gem', ...genCoord(2.283, 118.250, 52), descriptionEn: 'A tropical paradise known for stingless jellyfish and sea turtles.', descriptionId: 'Surga tropis yang dikenal dengan ubur-ubur tak menyengat dan penyu.', tipsEn: 'Swim in Kakaban Lake with the jellyfish.', tipsId: 'Berenang di Danau Kakaban bersama ubur-ubur.' },
    { id: 53, name: 'Tanjung Puting NP', province: 'Central Kalimantan', island: 'Kalimantan', category: 'Nature', ...genCoord(-2.983, 111.950, 53), descriptionEn: 'Famous for its orangutan conservation and klotok (riverboat) tours.', descriptionId: 'Terkenal dengan konservasi orangutan dan tur klotok (perahu sungai).', tipsEn: 'Sleep on a klotok for a true jungle experience.', tipsId: 'Tidur di klotok untuk pengalaman hutan yang sesungguhnya.' },
    { id: 54, name: 'Sebangau NP', province: 'Central Kalimantan', island: 'Kalimantan', category: 'Nature', ...genCoord(-2.333, 113.900, 54), descriptionEn: 'A peat swamp forest home to a large population of wild orangutans.', descriptionId: 'Hutan rawa gambut rumah bagi populasi besar orangutan liar.', tipsEn: 'Take a guided canoe tour through the black water rivers.', tipsId: 'Ikuti tur kano berpemandu melalui sungai air hitam.' },

    // Papua
    { id: 55, name: 'Raja Ampat', province: 'West Papua', island: 'Papua', category: 'Nature', ...genCoord(-0.233, 130.516, 55), descriptionEn: 'An archipelago offering arguably the most biodiverse marine life on Earth.', descriptionId: 'Kepulauan yang menawarkan kehidupan laut paling beragam di Bumi.', tipsEn: 'Hike to the Piaynemo viewpoint for iconic scenery.', tipsId: 'Mendaki ke sudut pandang Piaynemo untuk pemandangan ikonik.' },
    { id: 56, name: 'Lorentz National Park', province: 'Papua', island: 'Papua', category: 'Nature', ...genCoord(-4.750, 137.833, 56), descriptionEn: 'The largest national park in Southeast Asia, featuring equatorial glaciers.', descriptionId: 'Taman nasional terbesar di Asia Tenggara, menampilkan gletser khatulistiwa.', tipsEn: 'Extremely remote; requires careful expedition planning.', tipsId: 'Sangat terpencil; membutuhkan perencanaan ekspedisi yang cermat.' },
    { id: 57, name: 'Lake Sentani', province: 'Papua', island: 'Papua', category: 'Nature', ...genCoord(-2.600, 140.500, 57), descriptionEn: 'A large, tranquil lake dotted with islands near Jayapura.', descriptionId: 'Danau besar dan tenang yang dihiasi pulau-pulau dekat Jayapura.', tipsEn: 'Visit during the Lake Sentani Festival in June.', tipsId: 'Kunjungi selama Festival Danau Sentani pada bulan Juni.' },
    { id: 58, name: 'Baliem Valley', province: 'Papua', island: 'Papua', category: 'Hidden Gem', ...genCoord(-4.016, 138.950, 58), descriptionEn: 'A stunning highland valley home to the Dani people.', descriptionId: 'Lembah dataran tinggi yang menakjubkan rumah bagi suku Dani.', tipsEn: 'Attend the Baliem Valley Cultural Festival in August.', tipsId: 'Hadiri Festival Budaya Lembah Baliem pada bulan Agustus.' },
];

export const BADGES: Badge[] = [
    { id: 'b1', name: 'Penjelajah Jawa', descriptionEn: 'Collect all 15 stamps in Java.', descriptionId: 'Kumpulkan semua 15 stempel di Jawa.', requiredIds: Array.from({length: 15}, (_, i) => i + 1) },
    { id: 'b2', name: 'Jiwa Bali', descriptionEn: 'Collect all 10 stamps in Bali.', descriptionId: 'Kumpulkan semua 10 stempel di Bali.', requiredIds: Array.from({length: 10}, (_, i) => i + 16) },
    { id: 'b3', name: 'Anak Lombok', descriptionEn: 'Collect all 6 stamps in Lombok.', descriptionId: 'Kumpulkan semua 6 stempel di Lombok.', requiredIds: Array.from({length: 6}, (_, i) => i + 26) },
    { id: 'b4', name: 'Roh Flores', descriptionEn: 'Collect all 6 stamps in Flores.', descriptionId: 'Kumpulkan semua 6 stempel di Flores.', requiredIds: Array.from({length: 6}, (_, i) => i + 32) },
    { id: 'b5', name: 'Putra Sulawesi', descriptionEn: 'Collect all 7 stamps in Sulawesi.', descriptionId: 'Kumpulkan semua 7 stempel di Sulawesi.', requiredIds: Array.from({length: 7}, (_, i) => i + 38) },
    { id: 'b6', name: 'Napak Sumatra', descriptionEn: 'Collect all 7 stamps in Sumatra.', descriptionId: 'Kumpulkan semua 7 stempel di Sumatra.', requiredIds: Array.from({length: 7}, (_, i) => i + 45) },
    { id: 'b7', name: 'Dayak Trail', descriptionEn: 'Collect all 3 stamps in Kalimantan.', descriptionId: 'Kumpulkan semua 3 stempel di Kalimantan.', requiredIds: [52, 53, 54] },
    { id: 'b8', name: 'Timur Jauh', descriptionEn: 'Collect all 4 stamps in Papua.', descriptionId: 'Kumpulkan semua 4 stempel di Papua.', requiredIds: [55, 56, 57, 58] },
    { id: 'b9', name: 'Nusa Tenggara Explorer', descriptionEn: 'Collect all stamps in Lombok and Flores.', descriptionId: 'Kumpulkan semua stempel di Lombok dan Flores.', requiredIds: Array.from({length: 12}, (_, i) => i + 26) },
    { id: 'b10', name: 'Archipelago Master', descriptionEn: 'Collect all 58 stamps across Indonesia.', descriptionId: 'Kumpulkan semua 58 stempel di seluruh Indonesia.', requiredIds: Array.from({length: 58}, (_, i) => i + 1) },
    { id: 'b11', name: 'Warisan Dunia', descriptionEn: 'Visit 5 UNESCO World Heritage sites.', descriptionId: 'Kunjungi 5 situs Warisan Dunia UNESCO.', requiredIds: [1, 2, 8, 32, 56] },
    { id: 'b12', name: 'Bali Sacred Circuit', descriptionEn: 'Visit 7 sacred temples in Bali.', descriptionId: 'Kunjungi 7 pura suci di Bali.', requiredIds: [16, 17, 18, 19, 20, 21, 22] },
    { id: 'b13', name: 'Java Trail', descriptionEn: 'Complete the curated Java historical trail.', descriptionId: 'Selesaikan jalur sejarah Jawa yang dikurasi.', requiredIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { id: 'b14', name: 'Ring of Fire', descriptionEn: 'Visit 6 iconic volcanoes.', descriptionId: 'Kunjungi 6 gunung berapi ikonik.', requiredIds: [3, 4, 9, 26, 33, 47] },
    { id: 'b15', name: 'Underwater Indonesia', descriptionEn: 'Explore 6 premier diving destinations.', descriptionId: 'Jelajahi 6 tujuan menyelam utama.', requiredIds: [39, 55, 28, 40, 52, 32] },
    { id: 'b16', name: 'Kerajaan Kuno', descriptionEn: 'Visit 5 ancient royal sites.', descriptionId: 'Kunjungi 5 situs kerajaan kuno.', requiredIds: [1, 2, 5, 6, 7] },
    { id: 'b17', name: 'Kota Tua Circuit', descriptionEn: 'Explore 5 historic old towns.', descriptionId: 'Jelajahi 5 kota tua bersejarah.', requiredIds: [10, 11, 12, 41, 50] },
    { id: 'b18', name: 'Danau Nusantara', descriptionEn: 'Visit 6 magnificent lakes.', descriptionId: 'Kunjungi 6 danau yang megah.', requiredIds: [45, 48, 49, 42, 43, 57] },
    { id: 'b19', name: 'Orangutan Trail', descriptionEn: 'Visit 3 orangutan habitats.', descriptionId: 'Kunjungi 3 habitat orangutan.', requiredIds: [46, 53, 54] },
    { id: 'b20', name: 'Rumah Adat', descriptionEn: 'Visit 5 traditional villages.', descriptionId: 'Kunjungi 5 desa tradisional.', requiredIds: [13, 29, 36, 37, 38] },
    { id: 'b21', name: 'Penjaga Warisan', descriptionEn: 'Collect all 10 Heritage stamps.', descriptionId: 'Kumpulkan semua 10 stempel Warisan.', requiredIds: [1, 2, 5, 6, 7, 8, 29, 37, 38, 51] },
    { id: 'b22', name: 'Anak Alam', descriptionEn: 'Collect all 26 Nature stamps.', descriptionId: 'Kumpulkan semua 26 stempel Alam.', requiredIds: [3, 4, 9, 15, 23, 25, 26, 27, 28, 32, 33, 39, 42, 43, 44, 45, 46, 47, 48, 49, 53, 54, 55, 56, 57] },
    { id: 'b23', name: 'Hamba Semesta', descriptionEn: 'Collect all 9 Sacred stamps.', descriptionId: 'Kumpulkan semua 9 stempel Suci.', requiredIds: [14, 16, 17, 18, 19, 20, 21, 22, 31] },
    { id: 'b24', name: 'Urban Legend', descriptionEn: 'Collect all 7 Urban stamps.', descriptionId: 'Kumpulkan semua 7 stempel Perkotaan.', requiredIds: [10, 11, 12, 24, 35, 41, 50] },
    { id: 'b25', name: 'Pencari Tersembunyi', descriptionEn: 'Collect all 7 Hidden Gem stamps.', descriptionId: 'Kumpulkan semua 7 stempel Permata Tersembunyi.', requiredIds: [13, 30, 34, 36, 40, 52, 58] },
];

export const TRANSLATIONS = {
    en: {
        login: 'Welcome to Jejak Nusantara',
        loginGoogle: 'Sign in with Google',
        loginGuest: 'Continue as Guest',
        logout: 'Log Out',
        guest: 'Guest',
        changeProfilePic: 'Change Profile Picture',
        passport: 'Passport',
        discovery: 'Discovery',
        collections: 'Collections',
        profile: 'Profile',
        unlock: 'Unlock Stamp',
        distance: 'Distance',
        category: 'Category',
        tips: 'Travel Tips',
        unlockedOn: 'Unlocked on',
        nearby: 'Nearby Locations',
        rank: 'Explorer Rank',
        stampsCollected: 'Stamps Collected',
        badgesEarned: 'Badges Earned',
        share: 'Share Passport',
        close: 'Close',
        uploadPhoto: 'Upload Photo',
        changePhoto: 'Change Photo',
        download: 'Download',
        shareToApps: 'Share',
        generating: 'Wait...',
        km: 'km',
        m: 'm',
        ranks: {
            pelancong: 'Pelancong (Traveler)',
            penjelajah: 'Penjelajah (Explorer)',
            petualang: 'Petualang (Adventurer)',
            penjaga: 'Penjaga Nusantara (Guardian)'
        }
    },
    id: {
        login: 'Selamat Datang di Jejak Nusantara',
        loginGoogle: 'Masuk dengan Google',
        loginGuest: 'Lanjutkan sebagai Tamu',
        logout: 'Keluar',
        guest: 'Tamu',
        changeProfilePic: 'Ganti Foto Profil',
        passport: 'Paspor',
        discovery: 'Eksplorasi',
        collections: 'Koleksi',
        profile: 'Profil',
        unlock: 'Buka Stempel',
        distance: 'Jarak',
        category: 'Kategori',
        tips: 'Tips Perjalanan',
        unlockedOn: 'Dibuka pada',
        nearby: 'Lokasi Terdekat',
        rank: 'Peringkat Penjelajah',
        stampsCollected: 'Stempel Terkumpul',
        badgesEarned: 'Lencana Diperoleh',
        share: 'Bagikan Paspor',
        close: 'Tutup',
        uploadPhoto: 'Unggah Foto',
        changePhoto: 'Ganti Foto',
        download: 'Unduh',
        shareToApps: 'Bagikan',
        generating: 'Tunggu...',
        km: 'km',
        m: 'm',
        ranks: {
            pelancong: 'Pelancong',
            penjelajah: 'Penjelajah',
            petualang: 'Petualang',
            penjaga: 'Penjaga Nusantara'
        }
    }
};

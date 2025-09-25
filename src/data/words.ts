import type { Word, Achievement, GameChallenge } from '../types';

export const mockWords: Word[] = [
  // Easy words (60 words)
  {
    id: '1',
    word: 'hello',
    phonetic: '/həˈloʊ/',
    definition: '用于问候或引起注意的感叹词',
    example: 'Hello, how are you today?',
    difficulty: 'easy',
    category: 'greetings'
  },
  {
    id: '2',
    word: 'computer',
    phonetic: '/kəmˈpjuːtə/',
    definition: '计算机，电脑',
    example: 'I use my computer for work every day.',
    difficulty: 'easy',
    category: 'technology'
  },
  {
    id: '3',
    word: 'book',
    phonetic: '/bʊk/',
    definition: '书籍',
    example: 'I love reading a good book.',
    difficulty: 'easy',
    category: 'objects'
  },
  {
    id: '4',
    word: 'water',
    phonetic: '/ˈwɔːtə/',
    definition: '水',
    example: 'Please drink more water every day.',
    difficulty: 'easy',
    category: 'nature'
  },
  {
    id: '5',
    word: 'house',
    phonetic: '/haʊs/',
    definition: '房子，住宅',
    example: 'They bought a new house last year.',
    difficulty: 'easy',
    category: 'places'
  },
  {
    id: '6',
    word: 'friend',
    phonetic: '/frend/',
    definition: '朋友',
    example: 'She is my best friend.',
    difficulty: 'easy',
    category: 'people'
  },
  {
    id: '7',
    word: 'time',
    phonetic: '/taɪm/',
    definition: '时间',
    example: 'What time is it now?',
    difficulty: 'easy',
    category: 'abstract'
  },
  {
    id: '8',
    word: 'good',
    phonetic: '/ɡʊd/',
    definition: '好的，良好的',
    example: 'That was a good movie.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '9',
    word: 'work',
    phonetic: '/wɜːk/',
    definition: '工作',
    example: 'I have to work tomorrow.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '10',
    word: 'school',
    phonetic: '/skuːl/',
    definition: '学校',
    example: 'The children go to school every day.',
    difficulty: 'easy',
    category: 'places'
  },
  {
    id: '11',
    word: 'family',
    phonetic: '/ˈfæməli/',
    definition: '家庭，家人',
    example: 'I spend time with my family on weekends.',
    difficulty: 'easy',
    category: 'people'
  },
  {
    id: '12',
    word: 'love',
    phonetic: '/lʌv/',
    definition: '爱，喜欢',
    example: 'I love chocolate ice cream.',
    difficulty: 'easy',
    category: 'emotions'
  },
  {
    id: '13',
    word: 'happy',
    phonetic: '/ˈhæpi/',
    definition: '快乐的，高兴的',
    example: 'She looks very happy today.',
    difficulty: 'easy',
    category: 'emotions'
  },
  {
    id: '14',
    word: 'food',
    phonetic: '/fuːd/',
    definition: '食物',
    example: 'The food at this restaurant is delicious.',
    difficulty: 'easy',
    category: 'objects'
  },
  {
    id: '15',
    word: 'money',
    phonetic: '/ˈmʌni/',
    definition: '钱，金钱',
    example: 'I need to save more money.',
    difficulty: 'easy',
    category: 'objects'
  },
  {
    id: '16',
    word: 'car',
    phonetic: '/kɑː/',
    definition: '汽车',
    example: 'My car is parked outside.',
    difficulty: 'easy',
    category: 'transportation'
  },
  {
    id: '17',
    word: 'phone',
    phonetic: '/foʊn/',
    definition: '电话',
    example: 'Can you answer the phone?',
    difficulty: 'easy',
    category: 'technology'
  },
  {
    id: '18',
    word: 'music',
    phonetic: '/ˈmjuːzɪk/',
    definition: '音乐',
    example: 'I enjoy listening to music.',
    difficulty: 'easy',
    category: 'arts'
  },
  {
    id: '19',
    word: 'game',
    phonetic: '/ɡeɪm/',
    definition: '游戏',
    example: 'Let\'s play a game together.',
    difficulty: 'easy',
    category: 'entertainment'
  },
  {
    id: '20',
    word: 'student',
    phonetic: '/ˈstuːdənt/',
    definition: '学生',
    example: 'She is a university student.',
    difficulty: 'easy',
    category: 'people'
  },
  {
    id: '21',
    word: 'teacher',
    phonetic: '/ˈtiːtʃə/',
    definition: '老师',
    example: 'Our teacher is very kind.',
    difficulty: 'easy',
    category: 'people'
  },
  {
    id: '22',
    word: 'city',
    phonetic: '/ˈsɪti/',
    definition: '城市',
    example: 'New York is a big city.',
    difficulty: 'easy',
    category: 'places'
  },
  {
    id: '23',
    word: 'country',
    phonetic: '/ˈkʌntri/',
    definition: '国家，乡村',
    example: 'Which country are you from?',
    difficulty: 'easy',
    category: 'places'
  },
  {
    id: '24',
    word: 'world',
    phonetic: '/wɜːld/',
    definition: '世界',
    example: 'Travel around the world is my dream.',
    difficulty: 'easy',
    category: 'places'
  },
  {
    id: '25',
    word: 'night',
    phonetic: '/naɪt/',
    definition: '夜晚',
    example: 'Good night, sleep well.',
    difficulty: 'easy',
    category: 'time'
  },
  {
    id: '26',
    word: 'day',
    phonetic: '/deɪ/',
    definition: '白天，日子',
    example: 'Have a nice day!',
    difficulty: 'easy',
    category: 'time'
  },
  {
    id: '27',
    word: 'year',
    phonetic: '/jɪə/',
    definition: '年',
    example: 'This year went by so fast.',
    difficulty: 'easy',
    category: 'time'
  },
  {
    id: '28',
    word: 'month',
    phonetic: '/mʌnθ/',
    definition: '月份',
    example: 'My birthday is next month.',
    difficulty: 'easy',
    category: 'time'
  },
  {
    id: '29',
    word: 'week',
    phonetic: '/wiːk/',
    definition: '星期，周',
    example: 'I work five days a week.',
    difficulty: 'easy',
    category: 'time'
  },
  {
    id: '30',
    word: 'morning',
    phonetic: '/ˈmɔːnɪŋ/',
    definition: '早晨',
    example: 'Good morning, everyone!',
    difficulty: 'easy',
    category: 'time'
  },
  {
    id: '31',
    word: 'dog',
    phonetic: '/dɔːɡ/',
    definition: '狗',
    example: 'My dog loves to play fetch.',
    difficulty: 'easy',
    category: 'animals'
  },
  {
    id: '32',
    word: 'cat',
    phonetic: '/kæt/',
    definition: '猫',
    example: 'The cat is sleeping on the sofa.',
    difficulty: 'easy',
    category: 'animals'
  },
  {
    id: '33',
    word: 'big',
    phonetic: '/bɪɡ/',
    definition: '大的',
    example: 'That\'s a big house.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '34',
    word: 'small',
    phonetic: '/smɔːl/',
    definition: '小的',
    example: 'She lives in a small apartment.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '35',
    word: 'new',
    phonetic: '/njuː/',
    definition: '新的',
    example: 'I bought a new shirt yesterday.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '36',
    word: 'old',
    phonetic: '/oʊld/',
    definition: '老的，旧的',
    example: 'This is my old phone.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '37',
    word: 'hot',
    phonetic: '/hɑːt/',
    definition: '热的',
    example: 'The weather is very hot today.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '38',
    word: 'cold',
    phonetic: '/koʊld/',
    definition: '冷的',
    example: 'It\'s cold outside, wear a jacket.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '39',
    word: 'easy',
    phonetic: '/ˈiːzi/',
    definition: '容易的',
    example: 'This test is very easy.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '40',
    word: 'hard',
    phonetic: '/hɑːd/',
    definition: '困难的，硬的',
    example: 'Math is hard for some students.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '41',
    word: 'fast',
    phonetic: '/fæst/',
    definition: '快的',
    example: 'He runs very fast.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '42',
    word: 'slow',
    phonetic: '/sloʊ/',
    definition: '慢的',
    example: 'The traffic is slow today.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '43',
    word: 'long',
    phonetic: '/lɔːŋ/',
    definition: '长的',
    example: 'It\'s a long way to the airport.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '44',
    word: 'short',
    phonetic: '/ʃɔːt/',
    definition: '短的',
    example: 'She has short hair.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '45',
    word: 'high',
    phonetic: '/haɪ/',
    definition: '高的',
    example: 'The mountain is very high.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '46',
    word: 'low',
    phonetic: '/loʊ/',
    definition: '低的',
    example: 'Please speak in a low voice.',
    difficulty: 'easy',
    category: 'adjectives'
  },
  {
    id: '47',
    word: 'run',
    phonetic: '/rʌn/',
    definition: '跑',
    example: 'I run every morning.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '48',
    word: 'walk',
    phonetic: '/wɔːk/',
    definition: '走路',
    example: 'Let\'s walk to the park.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '49',
    word: 'eat',
    phonetic: '/iːt/',
    definition: '吃',
    example: 'What do you want to eat?',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '50',
    word: 'drink',
    phonetic: '/drɪŋk/',
    definition: '喝',
    example: 'I drink coffee every morning.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '51',
    word: 'sleep',
    phonetic: '/sliːp/',
    definition: '睡觉',
    example: 'I need to sleep early tonight.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '52',
    word: 'read',
    phonetic: '/riːd/',
    definition: '读，阅读',
    example: 'I like to read before bedtime.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '53',
    word: 'write',
    phonetic: '/raɪt/',
    definition: '写',
    example: 'Please write your name here.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '54',
    word: 'speak',
    phonetic: '/spiːk/',
    definition: '说话',
    example: 'Do you speak English?',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '55',
    word: 'listen',
    phonetic: '/ˈlɪsən/',
    definition: '听',
    example: 'Please listen carefully.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '56',
    word: 'watch',
    phonetic: '/wɑːtʃ/',
    definition: '看，观看',
    example: 'Let\'s watch a movie tonight.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '57',
    word: 'buy',
    phonetic: '/baɪ/',
    definition: '买',
    example: 'I want to buy a new car.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '58',
    word: 'sell',
    phonetic: '/sel/',
    definition: '卖',
    example: 'They sell fresh vegetables.',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '59',
    word: 'help',
    phonetic: '/help/',
    definition: '帮助',
    example: 'Can you help me with this?',
    difficulty: 'easy',
    category: 'verbs'
  },
  {
    id: '60',
    word: 'learn',
    phonetic: '/lɜːn/',
    definition: '学习',
    example: 'I want to learn Spanish.',
    difficulty: 'easy',
    category: 'verbs'
  },

  // Medium words (90 words)
  {
    id: '61',
    word: 'beautiful',
    phonetic: '/ˈbjuːtɪfəl/',
    definition: '美丽的，漂亮的',
    example: 'The sunset was beautiful tonight.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '62',
    word: 'knowledge',
    phonetic: '/ˈnɒlɪdʒ/',
    definition: '知识，学问',
    example: 'Knowledge is power in the modern world.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '63',
    word: 'understand',
    phonetic: '/ˌʌndəˈstænd/',
    definition: '理解，明白',
    example: 'I understand your concerns about the project.',
    difficulty: 'medium',
    category: 'verbs'
  },
  {
    id: '64',
    word: 'important',
    phonetic: '/ɪmˈpɔːtənt/',
    definition: '重要的，重大的',
    example: 'It is important to arrive on time.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '65',
    word: 'different',
    phonetic: '/ˈdɪfərənt/',
    definition: '不同的，各异的',
    example: 'We have different opinions on this matter.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '66',
    word: 'together',
    phonetic: '/təˈɡeðə/',
    definition: '一起，共同',
    example: 'Let\'s work together on this project.',
    difficulty: 'medium',
    category: 'adverbs'
  },
  {
    id: '67',
    word: 'problem',
    phonetic: '/ˈprɑːbləm/',
    definition: '问题，难题',
    example: 'We need to solve this problem quickly.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '68',
    word: 'answer',
    phonetic: '/ˈænsə/',
    definition: '答案，回答',
    example: 'Do you know the answer to this question?',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '69',
    word: 'question',
    phonetic: '/ˈkwestʃən/',
    definition: '问题，疑问',
    example: 'I have a question about the homework.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '70',
    word: 'language',
    phonetic: '/ˈlæŋɡwɪdʒ/',
    definition: '语言',
    example: 'English is a global language.',
    difficulty: 'medium',
    category: 'communication'
  },
  {
    id: '71',
    word: 'business',
    phonetic: '/ˈbɪznəs/',
    definition: '商业，生意',
    example: 'She owns a successful business.',
    difficulty: 'medium',
    category: 'economics'
  },
  {
    id: '72',
    word: 'company',
    phonetic: '/ˈkʌmpəni/',
    definition: '公司',
    example: 'I work for a technology company.',
    difficulty: 'medium',
    category: 'economics'
  },
  {
    id: '73',
    word: 'service',
    phonetic: '/ˈsɜːvɪs/',
    definition: '服务',
    example: 'The customer service was excellent.',
    difficulty: 'medium',
    category: 'economics'
  },
  {
    id: '74',
    word: 'system',
    phonetic: '/ˈsɪstəm/',
    definition: '系统',
    example: 'The computer system needs an update.',
    difficulty: 'medium',
    category: 'technology'
  },
  {
    id: '75',
    word: 'program',
    phonetic: '/ˈproʊɡræm/',
    definition: '程序，项目',
    example: 'I\'m learning a new computer program.',
    difficulty: 'medium',
    category: 'technology'
  },
  {
    id: '76',
    word: 'development',
    phonetic: '/dɪˈveləpmənt/',
    definition: '发展，开发',
    example: 'The development of this app took two years.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '77',
    word: 'government',
    phonetic: '/ˈɡʌvərnmənt/',
    definition: '政府',
    example: 'The government announced new policies.',
    difficulty: 'medium',
    category: 'politics'
  },
  {
    id: '78',
    word: 'community',
    phonetic: '/kəˈmjuːnəti/',
    definition: '社区，团体',
    example: 'Our community organized a charity event.',
    difficulty: 'medium',
    category: 'society'
  },
  {
    id: '79',
    word: 'society',
    phonetic: '/səˈsaɪəti/',
    definition: '社会',
    example: 'Technology has changed our society.',
    difficulty: 'medium',
    category: 'society'
  },
  {
    id: '80',
    word: 'culture',
    phonetic: '/ˈkʌltʃə/',
    definition: '文化',
    example: 'I\'m interested in learning about other cultures.',
    difficulty: 'medium',
    category: 'society'
  },
  {
    id: '81',
    word: 'history',
    phonetic: '/ˈhɪstəri/',
    definition: '历史',
    example: 'I love studying ancient history.',
    difficulty: 'medium',
    category: 'academic'
  },
  {
    id: '82',
    word: 'science',
    phonetic: '/ˈsaɪəns/',
    definition: '科学',
    example: 'Science helps us understand the world.',
    difficulty: 'medium',
    category: 'academic'
  },
  {
    id: '83',
    word: 'technology',
    phonetic: '/tekˈnɑːlədʒi/',
    definition: '技术，科技',
    example: 'Technology makes our lives easier.',
    difficulty: 'medium',
    category: 'technology'
  },
  {
    id: '84',
    word: 'medicine',
    phonetic: '/ˈmedəsən/',
    definition: '医学，药物',
    example: 'Modern medicine has saved many lives.',
    difficulty: 'medium',
    category: 'healthcare'
  },
  {
    id: '85',
    word: 'hospital',
    phonetic: '/ˈhɑːspɪtl/',
    definition: '医院',
    example: 'The hospital has excellent doctors.',
    difficulty: 'medium',
    category: 'healthcare'
  },
  {
    id: '86',
    word: 'doctor',
    phonetic: '/ˈdɑːktə/',
    definition: '医生',
    example: 'The doctor said I need more rest.',
    difficulty: 'medium',
    category: 'people'
  },
  {
    id: '87',
    word: 'health',
    phonetic: '/helθ/',
    definition: '健康',
    example: 'Exercise is good for your health.',
    difficulty: 'medium',
    category: 'healthcare'
  },
  {
    id: '88',
    word: 'experience',
    phonetic: '/ɪkˈspɪriəns/',
    definition: '经验，体验',
    example: 'This job requires five years of experience.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '89',
    word: 'project',
    phonetic: '/ˈprɑːdʒekt/',
    definition: '项目，工程',
    example: 'We\'re working on a new project.',
    difficulty: 'medium',
    category: 'work'
  },
  {
    id: '90',
    word: 'meeting',
    phonetic: '/ˈmiːtɪŋ/',
    definition: '会议',
    example: 'The meeting is scheduled for 2 PM.',
    difficulty: 'medium',
    category: 'work'
  },
  {
    id: '91',
    word: 'decision',
    phonetic: '/dɪˈsɪʒən/',
    definition: '决定，决策',
    example: 'It was a difficult decision to make.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '92',
    word: 'situation',
    phonetic: '/ˌsɪtʃuˈeɪʃən/',
    definition: '情况，处境',
    example: 'The situation is getting better.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '93',
    word: 'information',
    phonetic: '/ˌɪnfəˈmeɪʃən/',
    definition: '信息，资料',
    example: 'I need more information about this topic.',
    difficulty: 'medium',
    category: 'communication'
  },
  {
    id: '94',
    word: 'communication',
    phonetic: '/kəˌmjuːnɪˈkeɪʃən/',
    definition: '交流，通信',
    example: 'Good communication is essential in business.',
    difficulty: 'medium',
    category: 'communication'
  },
  {
    id: '95',
    word: 'relationship',
    phonetic: '/rɪˈleɪʃənʃɪp/',
    definition: '关系',
    example: 'They have a good relationship.',
    difficulty: 'medium',
    category: 'social'
  },
  {
    id: '96',
    word: 'organization',
    phonetic: '/ˌɔːɡənəˈzeɪʃən/',
    definition: '组织，机构',
    example: 'She works for a non-profit organization.',
    difficulty: 'medium',
    category: 'society'
  },
  {
    id: '97',
    word: 'management',
    phonetic: '/ˈmænɪdʒmənt/',
    definition: '管理',
    example: 'Good management is key to success.',
    difficulty: 'medium',
    category: 'work'
  },
  {
    id: '98',
    word: 'performance',
    phonetic: '/pəˈfɔːməns/',
    definition: '表现，性能',
    example: 'Her performance in the exam was excellent.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '99',
    word: 'quality',
    phonetic: '/ˈkwɑːləti/',
    definition: '质量，品质',
    example: 'The quality of this product is very high.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '100',
    word: 'standard',
    phonetic: '/ˈstændərd/',
    definition: '标准',
    example: 'This meets international standards.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '101',
    word: 'material',
    phonetic: '/məˈtɪriəl/',
    definition: '材料，物质',
    example: 'What material is this shirt made of?',
    difficulty: 'medium',
    category: 'objects'
  },
  {
    id: '102',
    word: 'equipment',
    phonetic: '/ɪˈkwɪpmənt/',
    definition: '设备，装备',
    example: 'The gym has modern equipment.',
    difficulty: 'medium',
    category: 'objects'
  },
  {
    id: '103',
    word: 'environment',
    phonetic: '/ɪnˈvaɪrənmənt/',
    definition: '环境',
    example: 'We must protect our environment.',
    difficulty: 'medium',
    category: 'nature'
  },
  {
    id: '104',
    word: 'climate',
    phonetic: '/ˈklaɪmət/',
    definition: '气候',
    example: 'The climate here is very pleasant.',
    difficulty: 'medium',
    category: 'nature'
  },
  {
    id: '105',
    word: 'weather',
    phonetic: '/ˈweðə/',
    definition: '天气',
    example: 'The weather forecast says it will rain.',
    difficulty: 'medium',
    category: 'nature'
  },
  {
    id: '106',
    word: 'season',
    phonetic: '/ˈsiːzən/',
    definition: '季节',
    example: 'Spring is my favorite season.',
    difficulty: 'medium',
    category: 'nature'
  },
  {
    id: '107',
    word: 'natural',
    phonetic: '/ˈnætʃərəl/',
    definition: '自然的，天然的',
    example: 'I prefer natural products.',
    difficulty: 'medium',
    category: 'nature'
  },
  {
    id: '108',
    word: 'energy',
    phonetic: '/ˈenədʒi/',
    definition: '能量，精力',
    example: 'Solar energy is renewable.',
    difficulty: 'medium',
    category: 'science'
  },
  {
    id: '109',
    word: 'resource',
    phonetic: '/ˈriːsɔːs/',
    definition: '资源',
    example: 'Water is a precious resource.',
    difficulty: 'medium',
    category: 'nature'
  },
  {
    id: '110',
    word: 'activity',
    phonetic: '/ækˈtɪvəti/',
    definition: '活动',
    example: 'Swimming is my favorite activity.',
    difficulty: 'medium',
    category: 'actions'
  },
  {
    id: '111',
    word: 'interest',
    phonetic: '/ˈɪntrəst/',
    definition: '兴趣，利益',
    example: 'I have an interest in photography.',
    difficulty: 'medium',
    category: 'emotions'
  },
  {
    id: '112',
    word: 'hobby',
    phonetic: '/ˈhɑːbi/',
    definition: '爱好',
    example: 'Reading is my favorite hobby.',
    difficulty: 'medium',
    category: 'activities'
  },
  {
    id: '113',
    word: 'talent',
    phonetic: '/ˈtælənt/',
    definition: '天赋，才能',
    example: 'She has a talent for music.',
    difficulty: 'medium',
    category: 'abilities'
  },
  {
    id: '114',
    word: 'skill',
    phonetic: '/skɪl/',
    definition: '技能，技巧',
    example: 'Learning new skills is important.',
    difficulty: 'medium',
    category: 'abilities'
  },
  {
    id: '115',
    word: 'ability',
    phonetic: '/əˈbɪləti/',
    definition: '能力',
    example: 'He has the ability to solve problems.',
    difficulty: 'medium',
    category: 'abilities'
  },
  {
    id: '116',
    word: 'success',
    phonetic: '/səkˈses/',
    definition: '成功',
    example: 'Hard work leads to success.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '117',
    word: 'failure',
    phonetic: '/ˈfeɪljə/',
    definition: '失败',
    example: 'Failure is a part of learning.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '118',
    word: 'opportunity',
    phonetic: '/ˌɑːpərˈtuːnəti/',
    definition: '机会，机遇',
    example: 'This is a great opportunity for you.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '119',
    word: 'challenge',
    phonetic: '/ˈtʃælɪndʒ/',
    definition: '挑战',
    example: 'This project is a real challenge.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '120',
    word: 'progress',
    phonetic: '/ˈprɑːɡres/',
    definition: '进步，进展',
    example: 'We\'re making good progress.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '121',
    word: 'achievement',
    phonetic: '/əˈtʃiːvmənt/',
    definition: '成就，成绩',
    example: 'Graduating was a great achievement.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '122',
    word: 'improvement',
    phonetic: '/ɪmˈpruːvmənt/',
    definition: '改进，改善',
    example: 'There\'s room for improvement.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '123',
    word: 'advantage',
    phonetic: '/ədˈvæntɪdʒ/',
    definition: '优势，好处',
    example: 'Speaking two languages is an advantage.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '124',
    word: 'benefit',
    phonetic: '/ˈbenəfɪt/',
    definition: '好处，利益',
    example: 'Exercise has many health benefits.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '125',
    word: 'purpose',
    phonetic: '/ˈpɜːpəs/',
    definition: '目的，用途',
    example: 'What\'s the purpose of this meeting?',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '126',
    word: 'reason',
    phonetic: '/ˈriːzən/',
    definition: '原因，理由',
    example: 'What\'s the reason for the delay?',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '127',
    word: 'result',
    phonetic: '/rɪˈzʌlt/',
    definition: '结果',
    example: 'The result of the test was positive.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '128',
    word: 'method',
    phonetic: '/ˈmeθəd/',
    definition: '方法',
    example: 'This method is very effective.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '129',
    word: 'process',
    phonetic: '/ˈprɑːses/',
    definition: '过程，程序',
    example: 'The application process takes two weeks.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '130',
    word: 'approach',
    phonetic: '/əˈproʊtʃ/',
    definition: '方法，途径',
    example: 'We need a different approach.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '131',
    word: 'solution',
    phonetic: '/səˈluːʃən/',
    definition: '解决方案',
    example: 'We found a solution to the problem.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '132',
    word: 'strategy',
    phonetic: '/ˈstrætədʒi/',
    definition: '策略',
    example: 'Our marketing strategy is working well.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '133',
    word: 'concept',
    phonetic: '/ˈkɑːnsept/',
    definition: '概念',
    example: 'This is a difficult concept to understand.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '134',
    word: 'theory',
    phonetic: '/ˈθɪri/',
    definition: '理论',
    example: 'Einstein\'s theory changed physics.',
    difficulty: 'medium',
    category: 'academic'
  },
  {
    id: '135',
    word: 'practice',
    phonetic: '/ˈpræktɪs/',
    definition: '练习，实践',
    example: 'Practice makes perfect.',
    difficulty: 'medium',
    category: 'actions'
  },
  {
    id: '136',
    word: 'research',
    phonetic: '/rɪˈsɜːtʃ/',
    definition: '研究',
    example: 'Medical research saves lives.',
    difficulty: 'medium',
    category: 'academic'
  },
  {
    id: '137',
    word: 'study',
    phonetic: '/ˈstʌdi/',
    definition: '学习，研究',
    example: 'I need to study for the exam.',
    difficulty: 'medium',
    category: 'academic'
  },
  {
    id: '138',
    word: 'wisdom',
    phonetic: '/ˈwɪzdəm/',
    definition: '智慧',
    example: 'With age comes wisdom.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '139',
    word: 'intelligence',
    phonetic: '/ɪnˈtelɪdʒəns/',
    definition: '智力，智慧',
    example: 'Artificial intelligence is advancing rapidly.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '140',
    word: 'creative',
    phonetic: '/kriˈeɪtɪv/',
    definition: '创造性的',
    example: 'She has a very creative mind.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '141',
    word: 'original',
    phonetic: '/əˈrɪdʒənəl/',
    definition: '原创的，最初的',
    example: 'This is an original painting.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '142',
    word: 'unique',
    phonetic: '/juˈniːk/',
    definition: '独特的，唯一的',
    example: 'Everyone has a unique personality.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '143',
    word: 'special',
    phonetic: '/ˈspeʃəl/',
    definition: '特别的',
    example: 'Today is a special day.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '144',
    word: 'common',
    phonetic: '/ˈkɑːmən/',
    definition: '常见的，共同的',
    example: 'This is a common problem.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '145',
    word: 'general',
    phonetic: '/ˈdʒenərəl/',
    definition: '一般的，总的',
    example: 'In general, I agree with you.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '146',
    word: 'specific',
    phonetic: '/spɪˈsɪfɪk/',
    definition: '具体的，特定的',
    example: 'I need specific instructions.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '147',
    word: 'particular',
    phonetic: '/pərˈtɪkjələr/',
    definition: '特别的，特定的',
    example: 'Is there a particular reason?',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '148',
    word: 'complete',
    phonetic: '/kəmˈpliːt/',
    definition: '完整的，完成',
    example: 'Please complete this form.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '149',
    word: 'perfect',
    phonetic: '/ˈpɜːfɪkt/',
    definition: '完美的',
    example: 'Nobody is perfect.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '150',
    word: 'excellent',
    phonetic: '/ˈeksələnt/',
    definition: '优秀的，杰出的',
    example: 'Your work is excellent.',
    difficulty: 'medium',
    category: 'adjectives'
  },

  // Hard words (50 words)
  {
    id: '151',
    word: 'education',
    phonetic: '/ˌedʒuˈkeɪʃən/',
    definition: '教育，培养',
    example: 'Education is the key to success.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '152',
    word: 'responsibility',
    phonetic: '/rɪˌspɑːnsəˈbɪləti/',
    definition: '责任',
    example: 'With great power comes great responsibility.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '153',
    word: 'independence',
    phonetic: '/ˌɪndɪˈpendəns/',
    definition: '独立',
    example: 'The country gained independence in 1776.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '154',
    word: 'significance',
    phonetic: '/sɪɡˈnɪfɪkəns/',
    definition: '重要性，意义',
    example: 'The significance of this discovery is huge.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '155',
    word: 'consequences',
    phonetic: '/ˈkɑːnsəkwənsəz/',
    definition: '后果',
    example: 'Actions have consequences.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '156',
    word: 'circumstances',
    phonetic: '/ˈsɜːkəmstənsəz/',
    definition: '情况，环境',
    example: 'Under these circumstances, we must be careful.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '157',
    word: 'characteristics',
    phonetic: '/ˌkɛrəktəˈrɪstɪks/',
    definition: '特征，特点',
    example: 'What are the characteristics of this material?',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '158',
    word: 'representative',
    phonetic: '/ˌrɛprɪˈzɛntətɪv/',
    definition: '代表，典型的',
    example: 'She is our representative in the meeting.',
    difficulty: 'hard',
    category: 'people'
  },
  {
    id: '159',
    word: 'appreciation',
    phonetic: '/əˌpriːʃiˈeɪʃən/',
    definition: '欣赏，感激',
    example: 'I want to express my appreciation.',
    difficulty: 'hard',
    category: 'emotions'
  },
  {
    id: '160',
    word: 'interpretation',
    phonetic: '/ɪnˌtɜːprɪˈteɪʃən/',
    definition: '解释，理解',
    example: 'There are different interpretations of this poem.',
    difficulty: 'hard',
    category: 'communication'
  },
  {
    id: '161',
    word: 'implementation',
    phonetic: '/ˌɪmplɪmənˈteɪʃən/',
    definition: '实施，执行',
    example: 'The implementation of the plan was successful.',
    difficulty: 'hard',
    category: 'actions'
  },
  {
    id: '162',
    word: 'demonstration',
    phonetic: '/ˌdemənˈstreɪʃən/',
    definition: '演示，证明',
    example: 'The demonstration was very convincing.',
    difficulty: 'hard',
    category: 'actions'
  },
  {
    id: '163',
    word: 'collaboration',
    phonetic: '/kəˌlæbəˈreɪʃən/',
    definition: '合作',
    example: 'International collaboration is essential.',
    difficulty: 'hard',
    category: 'social'
  },
  {
    id: '164',
    word: 'consideration',
    phonetic: '/kənˌsɪdəˈreɪʃən/',
    definition: '考虑，体贴',
    example: 'Thank you for your consideration.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '165',
    word: 'investigation',
    phonetic: '/ɪnˌvestɪˈɡeɪʃən/',
    definition: '调查',
    example: 'The police started an investigation.',
    difficulty: 'hard',
    category: 'actions'
  },
  {
    id: '166',
    word: 'transformation',
    phonetic: '/ˌtrænsfərˈmeɪʃən/',
    definition: '转变，改革',
    example: 'The transformation was remarkable.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '167',
    word: 'establishment',
    phonetic: '/ɪˈstæblɪʃmənt/',
    definition: '建立，机构',
    example: 'The establishment of the company took years.',
    difficulty: 'hard',
    category: 'organizations'
  },
  {
    id: '168',
    word: 'accommodation',
    phonetic: '/əˌkɑːməˈdeɪʃən/',
    definition: '住宿，适应',
    example: 'The hotel provides excellent accommodation.',
    difficulty: 'hard',
    category: 'services'
  },
  {
    id: '169',
    word: 'recommendation',
    phonetic: '/ˌrekəmənˈdeɪʃən/',
    definition: '推荐，建议',
    example: 'I need a letter of recommendation.',
    difficulty: 'hard',
    category: 'communication'
  },
  {
    id: '170',
    word: 'entertainment',
    phonetic: '/ˌentərˈteɪnmənt/',
    definition: '娱乐',
    example: 'The city offers many entertainment options.',
    difficulty: 'hard',
    category: 'activities'
  },
  {
    id: '171',
    word: 'contribution',
    phonetic: '/ˌkɑːntrɪˈbjuːʃən/',
    definition: '贡献',
    example: 'His contribution to science was significant.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '172',
    word: 'concentration',
    phonetic: '/ˌkɑːnsənˈtreɪʃən/',
    definition: '集中，浓度',
    example: 'This task requires full concentration.',
    difficulty: 'hard',
    category: 'mental'
  },
  {
    id: '173',
    word: 'determination',
    phonetic: '/dɪˌtɜːrmɪˈneɪʃən/',
    definition: '决心，决定',
    example: 'Her determination helped her succeed.',
    difficulty: 'hard',
    category: 'mental'
  },
  {
    id: '174',
    word: 'preparation',
    phonetic: '/ˌprepəˈreɪʃən/',
    definition: '准备',
    example: 'Good preparation is essential for success.',
    difficulty: 'hard',
    category: 'actions'
  },
  {
    id: '175',
    word: 'expectations',
    phonetic: '/ˌekspekˈteɪʃənz/',
    definition: '期望',
    example: 'The results exceeded our expectations.',
    difficulty: 'hard',
    category: 'mental'
  },
  {
    id: '176',
    word: 'applications',
    phonetic: '/ˌæplɪˈkeɪʃənz/',
    definition: '应用，申请',
    example: 'This technology has many applications.',
    difficulty: 'hard',
    category: 'technology'
  },
  {
    id: '177',
    word: 'specifications',
    phonetic: '/ˌspesəfəˈkeɪʃənz/',
    definition: '规格，说明书',
    example: 'Please check the technical specifications.',
    difficulty: 'hard',
    category: 'technical'
  },
  {
    id: '178',
    word: 'optimization',
    phonetic: '/ˌɑːptəməˈzeɪʃən/',
    definition: '优化',
    example: 'We need optimization of our processes.',
    difficulty: 'hard',
    category: 'technical'
  },
  {
    id: '179',
    word: 'administration',
    phonetic: '/ədˌmɪnəˈstreɪʃən/',
    definition: '管理，行政',
    example: 'The administration announced new policies.',
    difficulty: 'hard',
    category: 'management'
  },
  {
    id: '180',
    word: 'sophisticated',
    phonetic: '/səˈfɪstɪkeɪtɪd/',
    definition: '复杂的，精密的',
    example: 'This is a sophisticated system.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '181',
    word: 'comprehensive',
    phonetic: '/ˌkɑːmprɪˈhensɪv/',
    definition: '全面的，综合的',
    example: 'We need a comprehensive solution.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '182',
    word: 'fundamental',
    phonetic: '/ˌfʌndəˈmentəl/',
    definition: '基本的，根本的',
    example: 'This is a fundamental principle.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '183',
    word: 'substantial',
    phonetic: '/səbˈstænʃəl/',
    definition: '大量的，实质的',
    example: 'There was substantial progress.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '184',
    word: 'significant',
    phonetic: '/sɪɡˈnɪfɪkənt/',
    definition: '重要的，显著的',
    example: 'This is a significant achievement.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '185',
    word: 'extraordinary',
    phonetic: '/ɪkˈstrɔːrdəneri/',
    definition: '非凡的，特别的',
    example: 'She has extraordinary talent.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '186',
    word: 'magnificent',
    phonetic: '/mæɡˈnɪfəsənt/',
    definition: '壮丽的，宏伟的',
    example: 'The view from here is magnificent.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '187',
    word: 'tremendous',
    phonetic: '/trəˈmendəs/',
    definition: '巨大的，极大的',
    example: 'There was tremendous support.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '188',
    word: 'exceptional',
    phonetic: '/ɪkˈsepʃənəl/',
    definition: '杰出的，异常的',
    example: 'Her performance was exceptional.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '189',
    word: 'overwhelming',
    phonetic: '/ˌoʊvərˈwelmɪŋ/',
    definition: '压倒性的，巨大的',
    example: 'The response was overwhelming.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '190',
    word: 'revolutionary',
    phonetic: '/ˌrevəˈluːʃəneri/',
    definition: '革命性的',
    example: 'This is a revolutionary invention.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '191',
    word: 'controversial',
    phonetic: '/ˌkɑːntrəˈvɜːrʃəl/',
    definition: '有争议的',
    example: 'This is a controversial topic.',
    difficulty: 'hard',
    category: 'adjectives'
  },
  {
    id: '192',
    word: 'intellectual',
    phonetic: '/ˌɪntəˈlektʃuəl/',
    definition: '智力的，知识分子',
    example: 'She enjoys intellectual conversations.',
    difficulty: 'hard',
    category: 'mental'
  },
  {
    id: '193',
    word: 'psychological',
    phonetic: '/ˌsaɪkəˈlɑːdʒɪkəl/',
    definition: '心理的',
    example: 'There are psychological factors involved.',
    difficulty: 'hard',
    category: 'mental'
  },
  {
    id: '194',
    word: 'philosophical',
    phonetic: '/ˌfɪləˈsɑːfɪkəl/',
    definition: '哲学的',
    example: 'This raises philosophical questions.',
    difficulty: 'hard',
    category: 'academic'
  },
  {
    id: '195',
    word: 'technological',
    phonetic: '/ˌteknəˈlɑːdʒɪkəl/',
    definition: '技术的',
    example: 'Technological advances are rapid.',
    difficulty: 'hard',
    category: 'technology'
  },
  {
    id: '196',
    word: 'environmental',
    phonetic: '/ɪnˌvaɪrənˈmentəl/',
    definition: '环境的',
    example: 'Environmental protection is important.',
    difficulty: 'hard',
    category: 'nature'
  },
  {
    id: '197',
    word: 'international',
    phonetic: '/ˌɪntərˈnæʃənəl/',
    definition: '国际的',
    example: 'This is an international conference.',
    difficulty: 'hard',
    category: 'politics'
  },
  {
    id: '198',
    word: 'professional',
    phonetic: '/prəˈfeʃənəl/',
    definition: '专业的，职业的',
    example: 'She has a professional attitude.',
    difficulty: 'hard',
    category: 'work'
  },
  {
    id: '199',
    word: 'traditional',
    phonetic: '/trəˈdɪʃənəl/',
    definition: '传统的',
    example: 'This is a traditional recipe.',
    difficulty: 'hard',
    category: 'culture'
  },
  {
    id: '200',
    word: 'constitutional',
    phonetic: '/ˌkɑːnstəˈtuːʃənəl/',
    definition: '宪法的，体质的',
    example: 'This is a constitutional right.',
    difficulty: 'hard',
    category: 'politics'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'first_word',
    title: '初学者',
    description: '完成第一个单词练习',
    icon: '🌟',
  },
  {
    id: 'speed_demon',
    title: '打字高手',
    description: '达到50WPM的打字速度',
    icon: '⚡',
    progress: 32,
    maxProgress: 50
  },
  {
    id: 'perfect_game',
    title: '完美主义者',
    description: '完成一次100%准确率的游戏',
    icon: '🎯',
  },
  {
    id: 'streak_master',
    title: '坚持达人',
    description: '连续学习7天',
    icon: '🔥',
    progress: 3,
    maxProgress: 7
  },
  {
    id: 'vocabulary_master',
    title: '词汇大师',
    description: '学习200个单词',
    icon: '📚',
    progress: 45,
    maxProgress: 200
  }
];

export const mockChallenges: GameChallenge[] = [
  {
    id: 'beginner',
    title: '新手挑战',
    description: '适合初学者的简单单词练习',
    words: mockWords.filter(w => w.difficulty === 'easy'),
    timeLimit: 60,
    targetWpm: 20,
    difficulty: 'easy'
  },
  {
    id: 'intermediate',
    title: '进阶挑战',
    description: '中等难度的词汇练习',
    words: mockWords.filter(w => w.difficulty === 'medium'),
    timeLimit: 90,
    targetWpm: 35,
    difficulty: 'medium'
  },
  {
    id: 'expert',
    title: '专家挑战',
    description: '高难度词汇的终极考验',
    words: mockWords.filter(w => w.difficulty === 'hard'),
    timeLimit: 120,
    targetWpm: 50,
    difficulty: 'hard'
  }
];
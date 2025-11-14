/**
 * 题库数据文件
 * 包含所有题目分类和题目数据
 */

import { Question, Category } from '../types/game.types';

/**
 * 题库分类
 */
export const categories: Category[] = [
  {
    id: 'all-stars',
    name: '全明星题库',
    icon: '🌟',
    color: 'from-purple-500 to-pink-500',
    questionCount: 40
  },
  {
    id: 'movies',
    name: '影视明星',
    icon: '🎬',
    color: 'from-blue-500 to-cyan-500',
    questionCount: 12
  },
  {
    id: 'music',
    name: '音乐天王',
    icon: '🎵',
    color: 'from-green-500 to-emerald-500',
    questionCount: 12
  },
  {
    id: 'jay-chou',
    name: '周杰伦专题',
    icon: '🎤',
    color: 'from-yellow-500 to-orange-500',
    questionCount: 12
  },
  {
    id: 'sports',
    name: '体育明星',
    icon: '⚽',
    color: 'from-red-500 to-rose-500',
    questionCount: 12
  }
];

/**
 * 题库数据
 */
export const questions: Question[] = [
  // ==================== 周杰伦专题 ====================
  {
    id: 'jay_001',
    category: 'jay-chou',
    difficulty: 'easy',
    question: '周杰伦的首张专辑名称是？',
    options: ['Jay', '范特西', '八度空间', '叶惠美'],
    correctAnswer: 0,
    explanation: '《Jay》于2000年11月发行，是周杰伦的首张个人专辑，包含《可爱女人》《星晴》等经典歌曲。'
  },
  {
    id: 'jay_002',
    category: 'jay-chou',
    difficulty: 'medium',
    question: '《青花瓷》这首歌出自哪张专辑？',
    options: ['我很忙', '依然范特西', '十一月的萧邦', '魔杰座'],
    correctAnswer: 0,
    explanation: '《青花瓷》收录于2007年发行的专辑《我很忙》，是方文山作词的中国风代表作之一。'
  },
  {
    id: 'jay_003',
    category: 'jay-chou',
    difficulty: 'hard',
    question: '周杰伦在哪一年的金曲奖首次获得"最佳国语男歌手"？',
    options: ['2001年', '2002年', '2003年', '2004年'],
    correctAnswer: 2,
    explanation: '周杰伦在2003年（第14届金曲奖）凭借专辑《八度空间》首次获得最佳国语男歌手奖。'
  },
  {
    id: 'jay_004',
    category: 'jay-chou',
    difficulty: 'easy',
    question: '《说好不哭》是周杰伦与哪位歌手合唱的？',
    options: ['蔡依林', '林俊杰', '五月天阿信', '张学友'],
    correctAnswer: 2,
    explanation: '《说好不哭》是周杰伦与五月天主唱阿信在2019年合唱的数字单曲，上线即刷新多项记录。'
  },
  {
    id: 'jay_005',
    category: 'jay-chou',
    difficulty: 'medium',
    question: '电影《不能说的秘密》中，周杰伦饰演的角色名字是？',
    options: ['叶湘伦', '李小龙', '周小刚', '方文山'],
    correctAnswer: 0,
    explanation: '在这部周杰伦自导自演的电影中，他饰演的角色是叶湘伦，与桂纶镁饰演的路小雨上演跨越时空的爱情。'
  },
  {
    id: 'jay_006',
    category: 'jay-chou',
    difficulty: 'hard',
    question: '周杰伦的歌曲《菊花台》是哪部电影的主题曲？',
    options: ['满城尽带黄金甲', '夜宴', '十面埋伏', '英雄'],
    correctAnswer: 0,
    explanation: '《菊花台》是张艺谋执导的电影《满城尽带黄金甲》的主题曲，于2006年发行。'
  },
  {
    id: 'jay_007',
    category: 'jay-chou',
    difficulty: 'easy',
    question: '"最美的不是下雨天，是曾与你躲过雨的屋檐"出自哪首歌？',
    options: ['不能说的秘密', '晴天', '彩虹', '七里香'],
    correctAnswer: 2,
    explanation: '这句经典歌词出自《彩虹》，收录于2007年专辑《我很忙》。'
  },
  {
    id: 'jay_008',
    category: 'jay-chou',
    difficulty: 'medium',
    question: '周杰伦的哪首歌曲MV在巴黎铁塔下拍摄？',
    options: ['告白气球', '明明就', '算什么男人', '跨时代'],
    correctAnswer: 0,
    explanation: '《告白气球》的MV在法国巴黎拍摄，包含埃菲尔铁塔等标志性场景，是一首浪漫的告白情歌。'
  },
  {
    id: 'jay_009',
    category: 'jay-chou',
    difficulty: 'hard',
    question: '周杰伦的哪张专辑首次尝试电子舞曲风格？',
    options: ['12新作', '哎呦，不错哦', '周杰伦的床边故事', '惊叹号'],
    correctAnswer: 3,
    explanation: '《惊叹号》专辑在2011年发行，其中收录了《惊叹号》等电子舞曲风格的歌曲。'
  },
  {
    id: 'jay_010',
    category: 'jay-chou',
    difficulty: 'easy',
    question: '周杰伦的妻子是谁？',
    options: ['昆凌', '蔡依林', '侯佩岑', '江语晨'],
    correctAnswer: 0,
    explanation: '周杰伦于2015年与昆凌在英国举行婚礼，两人育有一女一子。'
  },
  {
    id: 'jay_011',
    category: 'jay-chou',
    difficulty: 'medium',
    question: '下列哪首歌不是中国风？',
    options: ['东风破', '发如雪', '夜曲', '以父之名'],
    correctAnswer: 3,
    explanation: '《以父之名》是一首融合了说唱和宗教音乐元素的歌曲，不属于中国风作品。'
  },
  {
    id: 'jay_012',
    category: 'jay-chou',
    difficulty: 'hard',
    question: '周杰伦在哪一年担任金曲奖评审团主席？',
    options: ['2015年', '2016年', '2017年', '2018年'],
    correctAnswer: 1,
    explanation: '周杰伦在2016年（第27届金曲奖）担任评审团主席，这是他首次担任此职位。'
  },

  // ==================== 影视明星 ====================
  {
    id: 'movie_001',
    category: 'movies',
    difficulty: 'easy',
    question: '成龙主演的《醉拳》系列中，他饰演的角色是？',
    options: ['黄飞鸿', '霍元甲', '叶问', '陈真'],
    correctAnswer: 0,
    explanation: '在《醉拳》系列中，成龙饰演的是年轻时期的黄飞鸿，展现了独特的醉拳功夫。'
  },
  {
    id: 'movie_002',
    category: 'movies',
    difficulty: 'medium',
    question: '章子怡凭借哪部电影获得金像奖最佳女主角？',
    options: ['一代宗师', '卧虎藏龙', '十面埋伏', '2046'],
    correctAnswer: 0,
    explanation: '章子怡凭借在《一代宗师》中饰演宫二一角，于2014年获得香港电影金像奖最佳女主角。'
  },
  {
    id: 'movie_003',
    category: 'movies',
    difficulty: 'hard',
    question: '周星驰执导的第一部电影是？',
    options: ['大话西游', '食神', '喜剧之王', '少林足球'],
    correctAnswer: 1,
    explanation: '《食神》（1996年）是周星驰首次担任导演的电影，与李力持联合执导。'
  },
  {
    id: 'movie_004',
    category: 'movies',
    difficulty: 'easy',
    question: '"我养你啊"这句经典台词出自周星驰的哪部电影？',
    options: ['喜剧之王', '大话西游', '少林足球', '功夫'],
    correctAnswer: 0,
    explanation: '这句经典台词出自《喜剧之王》，是张柏芝饰演的柳飘飘对周星驰说的。'
  },
  {
    id: 'movie_005',
    category: 'movies',
    difficulty: 'medium',
    question: '梁朝伟共获得几次金像奖最佳男主角？',
    options: ['3次', '4次', '5次', '6次'],
    correctAnswer: 2,
    explanation: '梁朝伟共5次获得香港电影金像奖最佳男主角，是获奖次数最多的男演员之一。'
  },
  {
    id: 'movie_006',
    category: 'movies',
    difficulty: 'hard',
    question: '刘德华主演的《无间道》中，他饰演的角色最后的结局是？',
    options: ['被枪杀', '跳楼自杀', '被电梯门夹死', '成功洗白'],
    correctAnswer: 2,
    explanation: '在《无间道》中，刘德华饰演的刘建明在电梯里被陈永仁的卧底同伴枪杀。'
  },
  {
    id: 'movie_007',
    category: 'movies',
    difficulty: 'easy',
    question: '电影《唐伯虎点秋香》中，唐伯虎的扮演者是？',
    options: ['周星驰', '周润发', '刘德华', '张国荣'],
    correctAnswer: 0,
    explanation: '《唐伯虎点秋香》是周星驰的经典喜剧电影之一，于1993年上映。'
  },
  {
    id: 'movie_008',
    category: 'movies',
    difficulty: 'medium',
    question: '吴京执导并主演的《战狼2》票房突破多少亿人民币？',
    options: ['36亿', '46亿', '56亿', '66亿'],
    correctAnswer: 2,
    explanation: '《战狼2》于2017年上映，最终票房达到56.8亿人民币，创下中国电影票房纪录。'
  },
  {
    id: 'movie_009',
    category: 'movies',
    difficulty: 'hard',
    question: '张曼玉凭借哪部电影首次获得戛纳电影节最佳女演员奖？',
    options: ['花样年华', '清洁', '阮玲玉', '甜蜜蜜'],
    correctAnswer: 1,
    explanation: '张曼玉在2004年凭借法国电影《清洁》获得第57届戛纳电影节最佳女演员奖。'
  },
  {
    id: 'movie_010',
    category: 'movies',
    difficulty: 'easy',
    question: '葛优在《让子弹飞》中饰演什么角色？',
    options: ['张麻子', '马邦德', '黄四郎', '汤师爷'],
    correctAnswer: 1,
    explanation: '葛优在《让子弹飞》中饰演县长马邦德（师爷），与姜文、周润发搭档演出。'
  },
  {
    id: 'movie_011',
    category: 'movies',
    difficulty: 'medium',
    question: '下列哪位演员没有出演过《流浪地球》？',
    options: ['吴京', '李光洁', '吴孟达', '黄渤'],
    correctAnswer: 3,
    explanation: '《流浪地球》的主演包括吴京、李光洁、吴孟达等，黄渤并未参演此片。'
  },
  {
    id: 'movie_012',
    category: 'movies',
    difficulty: 'hard',
    question: '巩俐主演的《秋菊打官司》导演是谁？',
    options: ['张艺谋', '陈凯歌', '冯小刚', '姜文'],
    correctAnswer: 0,
    explanation: '《秋菊打官司》是张艺谋在1992年执导的电影，巩俐凭此片获得威尼斯电影节最佳女演员奖。'
  },

  // ==================== 音乐天王 ====================
  {
    id: 'music_001',
    category: 'music',
    difficulty: 'easy',
    question: '五月天乐队的主唱是谁？',
    options: ['阿信', '怪兽', '石头', 'Masa'],
    correctAnswer: 0,
    explanation: '陈信宏（阿信）是五月天乐队的主唱，也是乐队的词曲创作主力之一。'
  },
  {
    id: 'music_002',
    category: 'music',
    difficulty: 'medium',
    question: '林俊杰的成名曲《江南》发行于哪一年？',
    options: ['2002年', '2004年', '2006年', '2008年'],
    correctAnswer: 1,
    explanation: '《江南》收录在林俊杰2004年发行的专辑《第二天堂》中，是他的代表作之一。'
  },
  {
    id: 'music_003',
    category: 'music',
    difficulty: 'hard',
    question: '陈奕迅的哪首粤语歌曲被翻唱成国语版《十年》？',
    options: ['明年今日', 'K歌之王', '富士山下', '最佳损友'],
    correctAnswer: 0,
    explanation: '《明年今日》是粤语版，后被陈奕迅自己翻唱成国语版《十年》，两首都是经典之作。'
  },
  {
    id: 'music_004',
    category: 'music',
    difficulty: 'easy',
    question: '王力宏的代表作《龙的传人》最初是谁演唱的？',
    options: ['李建复', '罗大佑', '费翔', '齐秦'],
    correctAnswer: 0,
    explanation: '《龙的传人》最早由李建复在1978年演唱，后被王力宏、张明敏等多位歌手翻唱。'
  },
  {
    id: 'music_005',
    category: 'music',
    difficulty: 'medium',
    question: '邓紫棋在《我是歌手》第二季演唱的哪首歌引发全网热议？',
    options: ['泡沫', '喜欢你', '来自天堂的魔鬼', 'A.I.N.Y'],
    correctAnswer: 1,
    explanation: '邓紫棋在节目中演唱的Beyond乐队经典《喜欢你》以独特方式重新演绎，引发巨大反响。'
  },
  {
    id: 'music_006',
    category: 'music',
    difficulty: 'hard',
    question: '张学友获得过几次"十大劲歌金曲颁奖典礼"最受欢迎男歌星？',
    options: ['6次', '8次', '10次', '12次'],
    correctAnswer: 2,
    explanation: '张学友共10次获得该奖项，被誉为"歌神"，是香港乐坛的传奇人物。'
  },
  {
    id: 'music_007',
    category: 'music',
    difficulty: 'easy',
    question: 'SHE组合中谁的本名是陈嘉桦？',
    options: ['Selina', 'Hebe', 'Ella', '都不是'],
    correctAnswer: 2,
    explanation: 'Ella的本名是陈嘉桦，与Selina（任家萱）、Hebe（田馥甄）组成SHE组合。'
  },
  {
    id: 'music_008',
    category: 'music',
    difficulty: 'medium',
    question: '薛之谦的哪首歌曲被称为"网络神曲"并爆红网络？',
    options: ['演员', '丑八怪', '认真的雪', '刚刚好'],
    correctAnswer: 0,
    explanation: '《演员》在2015年重新走红网络，成为KTV必点歌曲之一，也让薛之谦再次翻红。'
  },
  {
    id: 'music_009',
    category: 'music',
    difficulty: 'hard',
    question: '王菲和那英首次合唱《相约98》是在哪个晚会？',
    options: ['1998年春晚', '1997年春晚', '1998年中秋晚会', '1997年中秋晚会'],
    correctAnswer: 0,
    explanation: '王菲和那英在1998年央视春节联欢晚会上合唱《相约98》，成为经典瞬间。'
  },
  {
    id: 'music_010',
    category: 'music',
    difficulty: 'easy',
    question: '华晨宇在《天籁之战》中翻唱的哪首歌被称为"神仙打架"？',
    options: ['我管你', '齐天大圣', '斗牛', '我的滑板鞋'],
    correctAnswer: 1,
    explanation: '华晨宇在节目中演唱的《齐天大圣》以极具张力的表演获得高度评价。'
  },
  {
    id: 'music_011',
    category: 'music',
    difficulty: 'medium',
    question: '毛不易凭借哪首歌曲获得《明日之子》总冠军？',
    options: ['消愁', '像我这样的人', '平凡的一天', '借'],
    correctAnswer: 0,
    explanation: '毛不易凭借原创歌曲《消愁》等作品获得《明日之子》第一季总冠军，并迅速走红。'
  },
  {
    id: 'music_012',
    category: 'music',
    difficulty: 'hard',
    question: '李荣浩在哪一年发行首张专辑《模特》？',
    options: ['2011年', '2012年', '2013年', '2014年'],
    correctAnswer: 2,
    explanation: '李荣浩的首张专辑《模特》于2013年发行，一经推出即获得多项音乐奖项提名。'
  },

  // ==================== 体育明星 ====================
  {
    id: 'sports_001',
    category: 'sports',
    difficulty: 'easy',
    question: '姚明在NBA效力的球队是？',
    options: ['休斯顿火箭', '洛杉矶湖人', '芝加哥公牛', '波士顿凯尔特人'],
    correctAnswer: 0,
    explanation: '姚明在2002年NBA选秀中被休斯顿火箭队选中，并效力至2011年退役。'
  },
  {
    id: 'sports_002',
    category: 'sports',
    difficulty: 'medium',
    question: '刘翔在2004年雅典奥运会110米栏项目中的夺冠成绩是？',
    options: ['12.88秒', '12.91秒', '12.95秒', '13.00秒'],
    correctAnswer: 1,
    explanation: '刘翔在2004年雅典奥运会上以12.91秒的成绩夺冠，平了世界纪录。'
  },
  {
    id: 'sports_003',
    category: 'sports',
    difficulty: 'hard',
    question: '李娜在哪一年获得法国网球公开赛女单冠军？',
    options: ['2010年', '2011年', '2012年', '2013年'],
    correctAnswer: 1,
    explanation: '李娜在2011年法国网球公开赛中夺冠，成为首位获得大满贯单打冠军的亚洲球员。'
  },
  {
    id: 'sports_004',
    category: 'sports',
    difficulty: 'easy',
    question: '苏炳添的主项是？',
    options: ['100米短跑', '200米短跑', '跳远', '110米栏'],
    correctAnswer: 0,
    explanation: '苏炳添是中国男子短跑运动员，主攻100米项目，被誉为"亚洲飞人"。'
  },
  {
    id: 'sports_005',
    category: 'sports',
    difficulty: 'medium',
    question: '武磊效力的西甲球队是？',
    options: ['西班牙人', '巴塞罗那', '皇家马德里', '马德里竞技'],
    correctAnswer: 0,
    explanation: '武磊于2019年加盟西甲西班牙人队，成为首位在西甲联赛进球的中国球员。'
  },
  {
    id: 'sports_006',
    category: 'sports',
    difficulty: 'hard',
    question: '孙杨在2012年伦敦奥运会上夺得几枚金牌？',
    options: ['1枚', '2枚', '3枚', '4枚'],
    correctAnswer: 1,
    explanation: '孙杨在2012年伦敦奥运会上夺得400米和1500米自由泳两枚金牌。'
  },
  {
    id: 'sports_007',
    category: 'sports',
    difficulty: 'easy',
    question: '中国女排主教练郎平的绰号是？',
    options: ['铁榔头', '铁娘子', '女排教母', '排球女神'],
    correctAnswer: 0,
    explanation: '郎平在运动员时期因扣球凶猛有力被称为"铁榔头"，后成为著名女排教练。'
  },
  {
    id: 'sports_008',
    category: 'sports',
    difficulty: 'medium',
    question: '谷爱凌在2022北京冬奥会上获得几枚金牌？',
    options: ['1枚', '2枚', '3枚', '4枚'],
    correctAnswer: 1,
    explanation: '谷爱凌在2022年北京冬奥会上获得自由式滑雪大跳台和U型场地两枚金牌。'
  },
  {
    id: 'sports_009',
    category: 'sports',
    difficulty: 'hard',
    question: '丁俊晖首次夺得世界斯诺克锦标赛冠军是在哪一年？',
    options: ['他尚未夺冠', '2013年', '2015年', '2016年'],
    correctAnswer: 0,
    explanation: '截至目前，丁俊晖尚未夺得世界斯诺克锦标赛冠军，但多次进入决赛圈。'
  },
  {
    id: 'sports_010',
    category: 'sports',
    difficulty: 'easy',
    question: '易建联在NBA选秀中是第几顺位被选中？',
    options: ['第4顺位', '第6顺位', '第8顺位', '第10顺位'],
    correctAnswer: 1,
    explanation: '易建联在2007年NBA选秀中被密尔沃基雄鹿队以第6顺位选中。'
  },
  {
    id: 'sports_011',
    category: 'sports',
    difficulty: 'medium',
    question: '林丹共获得几次奥运会羽毛球男单金牌？',
    options: ['1次', '2次', '3次', '4次'],
    correctAnswer: 1,
    explanation: '林丹在2008年北京奥运会和2012年伦敦奥运会上两次夺得男单金牌。'
  },
  {
    id: 'sports_012',
    category: 'sports',
    difficulty: 'hard',
    question: '中国首位F1正式车手是谁？',
    options: ['马青骅', '周冠宇', '董荷斌', '程丛夫'],
    correctAnswer: 1,
    explanation: '周冠宇在2022年加入阿尔法·罗密欧车队，成为中国首位F1正式车手。'
  }
];

/**
 * 根据分类ID获取题目
 */
export const getQuestionsByCategory = (categoryId: string): Question[] => {
  if (categoryId === 'all-stars') {
    return [...questions].sort(() => Math.random() - 0.5); // 随机排序
  }
  return questions.filter(q => q.category === categoryId);
};

/**
 * 获取随机题目
 */
export const getRandomQuestions = (count: number, categoryId?: string): Question[] => {
  const pool = categoryId ? getQuestionsByCategory(categoryId) : questions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * 随机昵称生成器
 * 用于生成有趣的玩家昵称
 */

const ADJECTIVES = [
  '快乐的',
  '勇敢的',
  '聪明的',
  '可爱的',
  '神秘的',
  '闪亮的',
  '酷炫的',
  '幸运的',
  '无敌的',
  '传奇的',
  '超级的',
  '梦幻的',
  '魔法的',
  '星际的',
  '银河的',
  '彩虹的',
  '钻石的',
  '黄金的',
  '紫色的',
  '蓝色的'
];

const NOUNS = [
  '明星',
  '粉丝',
  '达人',
  '高手',
  '大师',
  '王者',
  '战士',
  '骑士',
  '猎人',
  '法师',
  '忍者',
  '海盗',
  '英雄',
  '冠军',
  '天才',
  '学霸',
  '玩家',
  '追梦人',
  '探险家',
  '舞者'
];

/**
 * 生成随机昵称
 * @returns 随机昵称
 */
export const generateRandomNickname = (): string => {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const number = Math.floor(Math.random() * 9000) + 1000;

  return `${adjective}${noun}${number}`;
};

/**
 * 生成多个随机昵称供选择
 * @param count 生成数量
 * @returns 昵称数组
 */
export const generateNicknameOptions = (count: number = 3): string[] => {
  const options = new Set<string>();

  while (options.size < count) {
    options.add(generateRandomNickname());
  }

  return Array.from(options);
};

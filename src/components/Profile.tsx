import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const Profile = () => {
  const userLevel = 12;
  const userXP = 7500;
  const nextLevelXP = 10000;
  const progressPercent = (userXP / nextLevelXP) * 100;

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Первая сделка',
      description: 'Совершите первую покупку или продажу',
      icon: 'Star',
      unlocked: true,
      rarity: 'common',
    },
    {
      id: '2',
      name: 'Опытный трейдер',
      description: 'Совершите 10 успешных сделок',
      icon: 'Zap',
      unlocked: true,
      rarity: 'rare',
    },
    {
      id: '3',
      name: 'Прибыльный день',
      description: 'Заработайте $1000 за один день',
      icon: 'TrendingUp',
      unlocked: true,
      rarity: 'epic',
    },
    {
      id: '4',
      name: 'Холдер',
      description: 'Храните криптовалюту 30 дней',
      icon: 'Shield',
      unlocked: true,
      rarity: 'rare',
    },
    {
      id: '5',
      name: 'Диверсификация',
      description: 'Инвестируйте в 5 разных активов',
      icon: 'Target',
      unlocked: true,
      rarity: 'rare',
    },
    {
      id: '6',
      name: 'Криптомагнат',
      description: 'Достигните баланса $100,000',
      icon: 'Crown',
      unlocked: false,
      rarity: 'legendary',
    },
    {
      id: '7',
      name: 'Быстрая прибыль',
      description: 'Заработайте 20% за одну сделку',
      icon: 'Rocket',
      unlocked: false,
      rarity: 'epic',
    },
    {
      id: '8',
      name: 'Марафонец',
      description: 'Торгуйте 100 дней подряд',
      icon: 'Award',
      unlocked: false,
      rarity: 'legendary',
    },
  ];

  const stats = [
    { label: 'Всего сделок', value: '127', icon: 'Activity', color: 'text-primary' },
    { label: 'Прибыль', value: '$12,450', icon: 'TrendingUp', color: 'text-success' },
    { label: 'Точность', value: '78%', icon: 'Target', color: 'text-secondary' },
    { label: 'Стрик', value: '15 дней', icon: 'Flame', color: 'text-accent' },
  ];

  const leaderboard = [
    { rank: 1, name: 'CryptoKing', profit: '$125,400', level: 25 },
    { rank: 2, name: 'TradeWizard', profit: '$98,200', level: 22 },
    { rank: 3, name: 'BitMaster', profit: '$87,500', level: 21 },
    { rank: 4, name: 'ProTrader', profit: '$76,300', level: 20 },
    { rank: 5, name: 'Вы', profit: '$12,450', level: 12 },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-500 to-gray-600';
      case 'rare':
        return 'from-blue-500 to-blue-600';
      case 'epic':
        return 'from-purple-500 to-purple-600';
      case 'legendary':
        return 'from-yellow-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'Обычное';
      case 'rare':
        return 'Редкое';
      case 'epic':
        return 'Эпическое';
      case 'legendary':
        return 'Легендарное';
      default:
        return rarity;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-gradient border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-3xl font-bold text-white">
                PT
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">ProTrader</h2>
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 w-fit mx-auto md:mx-0">
                  <Icon name="Award" size={14} className="mr-1" />
                  Уровень {userLevel}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">Опытный криптотрейдер</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Прогресс до уровня {userLevel + 1}</span>
                  <span className="font-semibold">
                    {userXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
                  </span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-gradient border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Icon name={stat.icon as any} className={stat.color} size={24} />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="card-gradient border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Trophy" className="text-accent" />
            Достижения
          </CardTitle>
          <CardDescription>Ваши трофеи и награды</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} border-transparent`
                    : 'bg-muted/30 border-border opacity-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      achievement.unlocked
                        ? 'bg-white/20'
                        : 'bg-muted'
                    }`}
                  >
                    <Icon
                      name={achievement.icon as any}
                      className={achievement.unlocked ? 'text-white' : 'text-muted-foreground'}
                      size={24}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-bold ${achievement.unlocked ? 'text-white' : ''}`}>
                        {achievement.name}
                      </h3>
                      {achievement.unlocked && (
                        <Icon name="Check" className="text-white flex-shrink-0" size={20} />
                      )}
                    </div>
                    <p
                      className={`text-sm mb-2 ${
                        achievement.unlocked ? 'text-white/90' : 'text-muted-foreground'
                      }`}
                    >
                      {achievement.description}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        achievement.unlocked
                          ? 'bg-white/20 text-white border-white/30'
                          : 'bg-muted/50 text-muted-foreground border-border'
                      }`}
                    >
                      {getRarityBadge(achievement.rarity)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart" className="text-primary" />
            Таблица лидеров
          </CardTitle>
          <CardDescription>Топ трейдеров за месяц</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div
                key={player.rank}
                className={`p-4 rounded-lg flex items-center justify-between transition-all ${
                  player.name === 'Вы'
                    ? 'bg-primary/20 border border-primary/50'
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      player.rank === 1
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white'
                        : player.rank === 2
                        ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800'
                        : player.rank === 3
                        ? 'bg-gradient-to-br from-orange-500 to-orange-700 text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {player.rank}
                  </div>
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Award" size={14} />
                      <span>Уровень {player.level}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-success">{player.profit}</p>
                  <p className="text-xs text-muted-foreground">за месяц</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

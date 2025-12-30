import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume: string;
  trend: 'up' | 'down';
}

const cryptoData: CryptoData[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 43250.00, change24h: 2.5, volume: '$28.5B', trend: 'up' },
  { id: '2', name: 'Tether', symbol: 'USDT', price: 1.00, change24h: 0.01, volume: '$45.2B', trend: 'up' },
  { id: '3', name: 'TCoin', symbol: 'TCOIN', price: 156.80, change24h: -1.2, volume: '$3.4B', trend: 'down' },
  { id: '4', name: 'FPICoin', symbol: 'FPICOIN', price: 89.45, change24h: 5.8, volume: '$1.8B', trend: 'up' },
];

const fiatData = [
  { name: 'US Dollar', symbol: 'USD', rate: 1.00, change: 0 },
  { name: 'Russian Ruble', symbol: 'RUB', rate: 92.50, change: 0.3 },
  { name: 'Euro', symbol: 'EUR', rate: 0.92, change: -0.15 },
  { name: 'British Pound', symbol: 'GBP', rate: 0.79, change: 0.08 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-gradient border-primary/20 animate-scale-in">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">Общий баланс</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gradient">$12,450</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Icon name="TrendingUp" size={12} className="mr-1" />
                +5.2%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-secondary/20 animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">Криптовалюты</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">$8,230</span>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                4 активa
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-accent/20 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">Фиат</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">$4,220</span>
              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                5 валют
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-success/20 animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">Уровень</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">12</span>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                <Icon name="Award" size={12} className="mr-1" />
                Pro Trader
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-gradient border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Coins" className="text-primary" />
              Криптовалюты
            </CardTitle>
            <CardDescription>Live котировки криптовалют</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cryptoData.map((crypto) => (
                <div
                  key={crypto.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      crypto.trend === 'up' ? 'bg-success/20' : 'bg-destructive/20'
                    }`}>
                      <span className="font-bold text-sm">{crypto.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{crypto.name}</p>
                      <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${crypto.price.toLocaleString()}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <Icon
                        name={crypto.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                        size={14}
                        className={crypto.trend === 'up' ? 'text-success' : 'text-destructive'}
                      />
                      <span className={`text-sm ${crypto.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                        {crypto.change24h > 0 ? '+' : ''}{crypto.change24h}%
                      </span>
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
              <Icon name="DollarSign" className="text-secondary" />
              Фиатные валюты
            </CardTitle>
            <CardDescription>Курсы обмена валют</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fiatData.map((fiat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <span className="font-bold text-sm">{fiat.symbol}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{fiat.name}</p>
                      <p className="text-sm text-muted-foreground">{fiat.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{fiat.rate.toFixed(2)}</p>
                    <div className="flex items-center gap-1 justify-end">
                      {fiat.change !== 0 && (
                        <>
                          <Icon
                            name={fiat.change > 0 ? 'TrendingUp' : 'TrendingDown'}
                            size={14}
                            className={fiat.change > 0 ? 'text-success' : 'text-destructive'}
                          />
                          <span className={`text-sm ${fiat.change > 0 ? 'text-success' : 'text-destructive'}`}>
                            {fiat.change > 0 ? '+' : ''}{fiat.change}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-gradient border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Trophy" className="text-accent" />
            Последние достижения
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Первая сделка', icon: 'Star', color: 'text-primary' },
              { name: '10 сделок', icon: 'Zap', color: 'text-secondary' },
              { name: 'Прибыль $1000', icon: 'TrendingUp', color: 'text-success' },
              { name: 'Холдер', icon: 'Shield', color: 'text-accent' },
            ].map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Icon name={achievement.icon as any} className={achievement.color} size={24} />
                </div>
                <p className="text-sm font-medium text-center">{achievement.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

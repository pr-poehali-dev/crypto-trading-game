import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Balance {
  [key: string]: number;
}

const Trading = () => {
  const { toast } = useToast();
  const [tradeType, setTradeType] = useState<'crypto' | 'fiat'>('crypto');
  const [fromAsset, setFromAsset] = useState('BTC');
  const [toAsset, setToAsset] = useState('USDT');
  const [amount, setAmount] = useState('');
  
  const [balances] = useState<Balance>({
    BTC: 0.5,
    USDT: 5000,
    TCOIN: 100,
    FPICOIN: 250,
    USD: 2000,
    RUB: 150000,
    EUR: 1500,
    GBP: 1200,
  });

  const cryptoAssets = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250 },
    { symbol: 'USDT', name: 'Tether', price: 1 },
    { symbol: 'TCOIN', name: 'TCoin', price: 156.8 },
    { symbol: 'FPICOIN', name: 'FPICoin', price: 89.45 },
  ];

  const fiatAssets = [
    { symbol: 'USD', name: 'US Dollar', rate: 1 },
    { symbol: 'RUB', name: 'Russian Ruble', rate: 92.5 },
    { symbol: 'EUR', name: 'Euro', rate: 0.92 },
    { symbol: 'GBP', name: 'British Pound', rate: 0.79 },
  ];

  const currentAssets = tradeType === 'crypto' ? cryptoAssets : fiatAssets;
  const fromBalance = balances[fromAsset] || 0;

  const handleTrade = (type: 'buy' | 'sell') => {
    const amountNum = parseFloat(amount);
    
    if (!amount || amountNum <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректную сумму',
        variant: 'destructive',
      });
      return;
    }

    if (type === 'sell' && amountNum > fromBalance) {
      toast({
        title: 'Недостаточно средств',
        description: `У вас только ${fromBalance} ${fromAsset}`,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: type === 'buy' ? 'Покупка выполнена' : 'Продажа выполнена',
      description: `${amountNum} ${fromAsset} → ${toAsset}`,
    });
    
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <Card className="card-gradient border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" className="text-primary" />
            Торговля
          </CardTitle>
          <CardDescription>Покупка и продажа криптовалют и фиатных валют</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as 'crypto' | 'fiat')} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger value="crypto" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Coins" size={16} className="mr-2" />
                Криптовалюты
              </TabsTrigger>
              <TabsTrigger value="fiat" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                <Icon name="DollarSign" size={16} className="mr-2" />
                Фиатные валюты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crypto" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Из</Label>
                  <Select value={fromAsset} onValueChange={setFromAsset}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptoAssets.map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          <div className="flex items-center justify-between w-full">
                            <span>{asset.name} ({asset.symbol})</span>
                            <span className="text-muted-foreground ml-4">${asset.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Доступно:</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {fromBalance} {fromAsset}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>В</Label>
                  <Select value={toAsset} onValueChange={setToAsset}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptoAssets.map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          <div className="flex items-center justify-between w-full">
                            <span>{asset.name} ({asset.symbol})</span>
                            <span className="text-muted-foreground ml-4">${asset.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Сумма</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-muted border-border text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleTrade('buy')}
                  className="bg-success hover:bg-success/90 text-white h-12 font-semibold"
                >
                  <Icon name="TrendingUp" className="mr-2" />
                  Купить
                </Button>
                <Button
                  onClick={() => handleTrade('sell')}
                  className="bg-destructive hover:bg-destructive/90 text-white h-12 font-semibold"
                >
                  <Icon name="TrendingDown" className="mr-2" />
                  Продать
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="fiat" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Из</Label>
                  <Select value={fromAsset} onValueChange={setFromAsset}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fiatAssets.map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          {asset.name} ({asset.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Доступно:</span>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                      {fromBalance} {fromAsset}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>В</Label>
                  <Select value={toAsset} onValueChange={setToAsset}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fiatAssets.map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          {asset.name} ({asset.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Сумма</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-muted border-border text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleTrade('buy')}
                  className="bg-success hover:bg-success/90 text-white h-12 font-semibold"
                >
                  <Icon name="TrendingUp" className="mr-2" />
                  Купить
                </Button>
                <Button
                  onClick={() => handleTrade('sell')}
                  className="bg-destructive hover:bg-destructive/90 text-white h-12 font-semibold"
                >
                  <Icon name="TrendingDown" className="mr-2" />
                  Продать
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-gradient border-border">
          <CardHeader>
            <CardTitle className="text-lg">Популярные пары</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['BTC/USDT', 'TCOIN/USD', 'FPICOIN/EUR', 'BTC/RUB'].map((pair, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-primary/10 transition-all text-left"
                  onClick={() => {
                    const [from, to] = pair.split('/');
                    setFromAsset(from);
                    setToAsset(to);
                  }}
                >
                  <span className="font-medium">{pair}</span>
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border">
          <CardHeader>
            <CardTitle className="text-lg">Лимиты торговли</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Мин. сумма сделки</span>
                <span className="font-semibold">$10</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Макс. сумма сделки</span>
                <span className="font-semibold">$50,000</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">Комиссия</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  0.1%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Trading;

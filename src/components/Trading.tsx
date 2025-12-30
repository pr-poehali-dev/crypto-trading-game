import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/lib/store';

const Trading = () => {
  const { toast } = useToast();
  const { balances, updateBalance, addTransaction, addXP, unlockAchievement } = useUserStore();
  const [tradeType, setTradeType] = useState<'crypto' | 'fiat'>('crypto');
  const [fromAsset, setFromAsset] = useState('BTC');
  const [toAsset, setToAsset] = useState('USDT');
  const [amount, setAmount] = useState('');

  const [cryptoPrices, setCryptoPrices] = useState({
    BTC: 43250,
    USDT: 1,
    TCOIN: 156.8,
    FPICOIN: 89.45,
  });

  const [fiatRates, setFiatRates] = useState({
    USD: 1,
    RUB: 92.5,
    EUR: 0.92,
    GBP: 0.79,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          if (key !== 'USDT') {
            const change = (Math.random() - 0.5) * 2;
            updated[key as keyof typeof prev] = updated[key as keyof typeof prev] * (1 + change / 100);
          }
        });
        return updated;
      });

      setFiatRates((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          if (key !== 'USD') {
            const change = (Math.random() - 0.5) * 0.5;
            updated[key as keyof typeof prev] = updated[key as keyof typeof prev] * (1 + change / 100);
          }
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tradeType === 'crypto') {
      setFromAsset('BTC');
      setToAsset('USDT');
    } else {
      setFromAsset('USD');
      setToAsset('RUB');
    }
  }, [tradeType]);

  const cryptoAssets = [
    { symbol: 'BTC', name: 'Bitcoin', price: cryptoPrices.BTC },
    { symbol: 'USDT', name: 'Tether', price: cryptoPrices.USDT },
    { symbol: 'TCOIN', name: 'TCoin', price: cryptoPrices.TCOIN },
    { symbol: 'FPICOIN', name: 'FPICoin', price: cryptoPrices.FPICOIN },
  ];

  const fiatAssets = [
    { symbol: 'USD', name: 'US Dollar', rate: fiatRates.USD },
    { symbol: 'RUB', name: 'Russian Ruble', rate: fiatRates.RUB },
    { symbol: 'EUR', name: 'Euro', rate: fiatRates.EUR },
    { symbol: 'GBP', name: 'British Pound', rate: fiatRates.GBP },
  ];

  const currentAssets = tradeType === 'crypto' ? cryptoAssets : fiatAssets;
  const fromBalance = balances[fromAsset] || 0;

  const getPrice = (asset: string) => {
    if (tradeType === 'crypto') {
      return cryptoPrices[asset as keyof typeof cryptoPrices] || 1;
    } else {
      return fiatRates[asset as keyof typeof fiatRates] || 1;
    }
  };

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
        description: `У вас только ${fromBalance.toFixed(2)} ${fromAsset}`,
        variant: 'destructive',
      });
      return;
    }

    const fromPrice = getPrice(fromAsset);
    const toPrice = getPrice(toAsset);
    const convertedAmount = (amountNum * fromPrice) / toPrice;

    if (type === 'buy') {
      updateBalance(toAsset, -amountNum);
      updateBalance(fromAsset, convertedAmount);
      addTransaction({
        type: 'buy',
        asset: fromAsset,
        amount: convertedAmount,
        price: fromPrice,
        total: amountNum,
      });
    } else {
      updateBalance(fromAsset, -amountNum);
      updateBalance(toAsset, convertedAmount);
      addTransaction({
        type: 'sell',
        asset: fromAsset,
        amount: amountNum,
        price: fromPrice,
        total: convertedAmount,
      });
    }

    addXP(50);
    unlockAchievement('1');

    toast({
      title: type === 'buy' ? 'Покупка выполнена' : 'Продажа выполнена',
      description: `${amountNum} ${fromAsset} → ${convertedAmount.toFixed(2)} ${toAsset}`,
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
                            <span className="text-muted-foreground ml-4">${asset.price.toFixed(2)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Доступно:</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {fromBalance.toFixed(4)} {fromAsset}
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
                            <span className="text-muted-foreground ml-4">${asset.price.toFixed(2)}</span>
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
                          <div className="flex items-center justify-between w-full">
                            <span>{asset.name} ({asset.symbol})</span>
                            <span className="text-muted-foreground ml-4">{asset.rate.toFixed(2)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Доступно:</span>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                      {fromBalance.toFixed(2)} {fromAsset}
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
                          <div className="flex items-center justify-between w-full">
                            <span>{asset.name} ({asset.symbol})</span>
                            <span className="text-muted-foreground ml-4">{asset.rate.toFixed(2)}</span>
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
                    setTradeType(['BTC', 'TCOIN', 'FPICOIN', 'USDT'].includes(from) ? 'crypto' : 'fiat');
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

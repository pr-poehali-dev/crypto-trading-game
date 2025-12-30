import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/lib/store';

interface Wallet {
  id: string;
  type: 'crypto' | 'fiat';
  asset: string;
  balance: number;
  address?: string;
}

const Wallets = () => {
  const { toast } = useToast();
  const { balances, updateBalance, addTransaction } = useUserStore();
  const wallets: Wallet[] = [
    { id: '1', type: 'crypto', asset: 'BTC', balance: balances.BTC || 0, address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    { id: '2', type: 'crypto', asset: 'USDT', balance: balances.USDT || 0, address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' },
    { id: '3', type: 'crypto', asset: 'TCOIN', balance: balances.TCOIN || 0, address: 'TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9' },
    { id: '4', type: 'crypto', asset: 'FPICOIN', balance: balances.FPICOIN || 0, address: 'FP8kZT3eLJvTnM2x5bN9KoP7qW4vRn1Xa' },
    { id: '5', type: 'fiat', asset: 'USD', balance: balances.USD || 0 },
    { id: '6', type: 'fiat', asset: 'RUB', balance: balances.RUB || 0 },
    { id: '7', type: 'fiat', asset: 'EUR', balance: balances.EUR || 0 },
    { id: '8', type: 'fiat', asset: 'GBP', balance: balances.GBP || 0 },
  ];

  const [depositAmount, setDepositAmount] = useState('');
  const [depositAddress, setDepositAddress] = useState('');

  const handleDeposit = (wallet: Wallet) => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректную сумму',
        variant: 'destructive',
      });
      return;
    }

    if (wallet.type === 'crypto' && !depositAddress) {
      toast({
        title: 'Ошибка',
        description: 'Введите адрес отправителя',
        variant: 'destructive',
      });
      return;
    }

    const amount = parseFloat(depositAmount);
    updateBalance(wallet.asset, amount);
    addTransaction({
      type: 'deposit',
      asset: wallet.asset,
      amount,
      total: amount,
    });

    toast({
      title: 'Пополнение успешно',
      description: `+${amount} ${wallet.asset}`,
    });

    setDepositAmount('');
    setDepositAddress('');
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: 'Скопировано',
      description: 'Адрес кошелька скопирован в буфер обмена',
    });
  };

  const cryptoWallets = wallets.filter((w) => w.type === 'crypto');
  const fiatWallets = wallets.filter((w) => w.type === 'fiat');

  return (
    <div className="space-y-6">
      <Card className="card-gradient border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Coins" className="text-primary" />
            Криптовалютные кошельки
          </CardTitle>
          <CardDescription>Управление криптовалютными активами</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cryptoWallets.map((wallet) => (
              <div
                key={wallet.id}
                className="p-4 rounded-lg bg-gradient-to-br from-card to-muted border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="Wallet" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{wallet.asset}</h3>
                      <p className="text-sm text-muted-foreground">Кошелек</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    Активен
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{wallet.balance}</span>
                    <span className="text-muted-foreground">{wallet.asset}</span>
                  </div>

                  {wallet.address && (
                    <div className="p-2 rounded bg-muted/50 flex items-center justify-between">
                      <code className="text-xs text-muted-foreground truncate flex-1">
                        {wallet.address.slice(0, 12)}...{wallet.address.slice(-8)}
                      </code>
                      <button
                        onClick={() => copyAddress(wallet.address!)}
                        className="ml-2 hover:text-primary transition-colors"
                      >
                        <Icon name="Copy" size={14} />
                      </button>
                    </div>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Icon name="Plus" className="mr-2" size={16} />
                        Пополнить
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle>Пополнить {wallet.asset}</DialogTitle>
                        <DialogDescription>
                          Укажите сумму и адрес отправителя для пополнения кошелька
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Адрес вашего кошелька</Label>
                          <div className="p-3 rounded-lg bg-muted flex items-center justify-between">
                            <code className="text-sm">{wallet.address}</code>
                            <button
                              onClick={() => copyAddress(wallet.address!)}
                              className="ml-2 hover:text-primary transition-colors"
                            >
                              <Icon name="Copy" size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Адрес отправителя</Label>
                          <Input
                            placeholder="Введите адрес отправителя"
                            value={depositAddress}
                            onChange={(e) => setDepositAddress(e.target.value)}
                            className="bg-muted border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Сумма</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="bg-muted border-border"
                          />
                        </div>
                        <Button
                          onClick={() => handleDeposit(wallet)}
                          className="w-full bg-success hover:bg-success/90"
                        >
                          Подтвердить пополнение
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="DollarSign" className="text-secondary" />
            Фиатные кошельки
          </CardTitle>
          <CardDescription>Управление фиатными валютами</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fiatWallets.map((wallet) => (
              <div
                key={wallet.id}
                className="p-4 rounded-lg bg-gradient-to-br from-card to-muted border border-border hover:border-secondary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Icon name="CreditCard" className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{wallet.asset}</h3>
                      <p className="text-sm text-muted-foreground">Счет</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    Активен
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{wallet.balance.toLocaleString()}</span>
                    <span className="text-muted-foreground">{wallet.asset}</span>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-secondary hover:bg-secondary/90">
                        <Icon name="Plus" className="mr-2" size={16} />
                        Пополнить
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle>Пополнить {wallet.asset}</DialogTitle>
                        <DialogDescription>
                          Укажите сумму для пополнения счета
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Сумма</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="bg-muted border-border"
                          />
                        </div>
                        <Button
                          onClick={() => handleDeposit(wallet)}
                          className="w-full bg-success hover:bg-success/90"
                        >
                          Подтвердить пополнение
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" className="text-accent" />
            Информация
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Icon name="Shield" className="text-primary mt-0.5" size={20} />
              <div>
                <p className="font-semibold">Безопасность</p>
                <p className="text-sm text-muted-foreground">
                  Все кошельки защищены современным шифрованием
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Icon name="Clock" className="text-secondary mt-0.5" size={20} />
              <div>
                <p className="font-semibold">Время обработки</p>
                <p className="text-sm text-muted-foreground">
                  Пополнения обрабатываются в течение 10-30 минут
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Icon name="Percent" className="text-success mt-0.5" size={20} />
              <div>
                <p className="font-semibold">Комиссия</p>
                <p className="text-sm text-muted-foreground">
                  Пополнение без комиссии, вывод — 0.5%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallets;
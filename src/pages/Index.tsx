import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useUserStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import Dashboard from '@/components/Dashboard';
import Trading from '@/components/Trading';
import Wallets from '@/components/Wallets';
import Profile from '@/components/Profile';
import History from '@/components/History';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { totalBalance, depositToMain } = useUserStore();
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gradient">CryptoTrade</h1>
          </div>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="hidden md:flex items-center gap-2 bg-success/10 border border-success/30 px-4 py-2 rounded-lg hover:bg-success/20 transition-colors">
                  <Icon name="Wallet" size={18} className="text-success" />
                  <span className="font-semibold text-success">${totalBalance.toFixed(2)}</span>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Пополнить основной кошелек</DialogTitle>
                  <DialogDescription>
                    Добавьте средства на ваш основной баланс
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Текущий баланс</p>
                    <p className="text-2xl font-bold text-success">${totalBalance.toFixed(2)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Сумма пополнения (USD)</Label>
                    <Input
                      type="number"
                      placeholder="Введите сумму"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="bg-muted border-border"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      const amount = parseFloat(depositAmount);
                      if (!amount || amount <= 0) {
                        toast({
                          title: 'Ошибка',
                          description: 'Введите корректную сумму',
                          variant: 'destructive',
                        });
                        return;
                      }
                      depositToMain(amount);
                      toast({
                        title: 'Успешно!',
                        description: `Баланс пополнен на $${amount.toFixed(2)}`,
                      });
                      setDepositAmount('');
                    }}
                    className="w-full bg-success hover:bg-success/90"
                  >
                    <Icon name="Plus" className="mr-2" size={16} />
                    Пополнить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <button className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors">
              <Icon name="Bell" size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-card p-1.5 h-auto gap-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="LayoutDashboard" size={18} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="TrendingUp" size={18} />
              <span className="hidden sm:inline">Трейдинг</span>
            </TabsTrigger>
            <TabsTrigger value="wallets" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Wallet" size={18} />
              <span className="hidden sm:inline">Кошельки</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="History" size={18} />
              <span className="hidden sm:inline">История</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="User" size={18} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="animate-fade-in">
            <Dashboard />
          </TabsContent>

          <TabsContent value="trading" className="animate-fade-in">
            <Trading />
          </TabsContent>

          <TabsContent value="wallets" className="animate-fade-in">
            <Wallets />
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <History />
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Profile />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
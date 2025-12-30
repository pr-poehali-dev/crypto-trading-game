import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Dashboard from '@/components/Dashboard';
import Trading from '@/components/Trading';
import Wallets from '@/components/Wallets';
import Profile from '@/components/Profile';
import History from '@/components/History';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
            <div className="hidden md:flex items-center gap-2 bg-success/10 border border-success/30 px-4 py-2 rounded-lg">
              <Icon name="Wallet" size={18} className="text-success" />
              <span className="font-semibold text-success">$12,450.00</span>
            </div>
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

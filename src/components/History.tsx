import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal';
  asset: string;
  amount: number;
  price?: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const History = () => {
  const [filter, setFilter] = useState('all');

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'buy',
      asset: 'BTC',
      amount: 0.05,
      price: 43250,
      total: 2162.5,
      date: '2024-01-15 14:32',
      status: 'completed',
    },
    {
      id: '2',
      type: 'deposit',
      asset: 'USDT',
      amount: 5000,
      total: 5000,
      date: '2024-01-15 12:15',
      status: 'completed',
    },
    {
      id: '3',
      type: 'sell',
      asset: 'TCOIN',
      amount: 50,
      price: 156.8,
      total: 7840,
      date: '2024-01-14 18:45',
      status: 'completed',
    },
    {
      id: '4',
      type: 'buy',
      asset: 'FPICOIN',
      amount: 100,
      price: 89.45,
      total: 8945,
      date: '2024-01-14 16:20',
      status: 'completed',
    },
    {
      id: '5',
      type: 'deposit',
      asset: 'USD',
      amount: 2000,
      total: 2000,
      date: '2024-01-14 10:00',
      status: 'completed',
    },
    {
      id: '6',
      type: 'withdrawal',
      asset: 'RUB',
      amount: 50000,
      total: 50000,
      date: '2024-01-13 15:30',
      status: 'pending',
    },
    {
      id: '7',
      type: 'buy',
      asset: 'BTC',
      amount: 0.02,
      price: 43100,
      total: 862,
      date: '2024-01-13 11:22',
      status: 'completed',
    },
    {
      id: '8',
      type: 'sell',
      asset: 'EUR',
      amount: 500,
      price: 0.92,
      total: 543.48,
      date: '2024-01-12 14:10',
      status: 'completed',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return 'TrendingUp';
      case 'sell':
        return 'TrendingDown';
      case 'deposit':
        return 'ArrowDownCircle';
      case 'withdrawal':
        return 'ArrowUpCircle';
      default:
        return 'Circle';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'text-success';
      case 'sell':
        return 'text-destructive';
      case 'deposit':
        return 'text-primary';
      case 'withdrawal':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'buy':
        return 'Покупка';
      case 'sell':
        return 'Продажа';
      case 'deposit':
        return 'Пополнение';
      case 'withdrawal':
        return 'Вывод';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
            Завершено
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
            В обработке
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            Отклонено
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredTransactions =
    filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  return (
    <div className="space-y-6">
      <Card className="card-gradient border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="History" className="text-primary" />
                История транзакций
              </CardTitle>
              <CardDescription>Все операции с вашими активами</CardDescription>
            </div>
            <div className="w-full sm:w-48">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все операции</SelectItem>
                  <SelectItem value="buy">Покупки</SelectItem>
                  <SelectItem value="sell">Продажи</SelectItem>
                  <SelectItem value="deposit">Пополнения</SelectItem>
                  <SelectItem value="withdrawal">Выводы</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 rounded-lg bg-gradient-to-r from-card to-muted border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        transaction.type === 'buy'
                          ? 'bg-success/20'
                          : transaction.type === 'sell'
                          ? 'bg-destructive/20'
                          : transaction.type === 'deposit'
                          ? 'bg-primary/20'
                          : 'bg-secondary/20'
                      } flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon
                        name={getTypeIcon(transaction.type) as any}
                        className={getTypeColor(transaction.type)}
                        size={20}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{getTypeName(transaction.type)}</h3>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-primary font-medium">{transaction.asset}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 flex-wrap">
                        <Icon name="Clock" size={14} />
                        <span>{transaction.date}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 flex-wrap">
                        <div>
                          <p className="text-xs text-muted-foreground">Количество</p>
                          <p className="font-semibold">
                            {transaction.amount} {transaction.asset}
                          </p>
                        </div>
                        {transaction.price && (
                          <div>
                            <p className="text-xs text-muted-foreground">Цена</p>
                            <p className="font-semibold">${transaction.price.toLocaleString()}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-muted-foreground">Сумма</p>
                          <p className="font-semibold text-lg">
                            ${transaction.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Inbox" className="mx-auto text-muted-foreground mb-3" size={48} />
              <p className="text-muted-foreground">Нет транзакций по выбранному фильтру</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-gradient border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="TrendingUp" className="text-success" size={18} />
              Всего покупок
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {transactions.filter((t) => t.type === 'buy').length}
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="TrendingDown" className="text-destructive" size={18} />
              Всего продаж
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {transactions.filter((t) => t.type === 'sell').length}
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="Activity" className="text-primary" size={18} />
              Всего операций
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{transactions.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;

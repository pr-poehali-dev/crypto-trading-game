import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Balance {
  [key: string]: number;
}

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

interface UserState {
  totalBalance: number;
  balances: Balance;
  level: number;
  xp: number;
  transactions: Transaction[];
  unlockedAchievements: string[];
  
  setTotalBalance: (balance: number) => void;
  updateBalance: (asset: string, amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => void;
  addXP: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  depositToMain: (amount: number) => void;
  resetProgress: () => void;
}

const INITIAL_STATE = {
  totalBalance: 0,
  balances: {
    BTC: 0,
    USDT: 0,
    TCOIN: 0,
    FPICOIN: 0,
    USD: 0,
    RUB: 0,
    EUR: 0,
    GBP: 0,
  },
  level: 1,
  xp: 0,
  transactions: [],
  unlockedAchievements: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setTotalBalance: (balance) => set({ totalBalance: balance }),

      updateBalance: (asset, amount) =>
        set((state) => ({
          balances: {
            ...state.balances,
            [asset]: Math.max(0, (state.balances[asset] || 0) + amount),
          },
        })),

      addTransaction: (transaction) =>
        set((state) => {
          const newTransaction: Transaction = {
            ...transaction,
            id: Date.now().toString(),
            date: new Date().toLocaleString('ru-RU'),
            status: 'completed',
          };

          return {
            transactions: [newTransaction, ...state.transactions],
          };
        }),

      addXP: (amount) =>
        set((state) => {
          const newXP = state.xp + amount;
          const xpPerLevel = 1000;
          const newLevel = Math.floor(newXP / xpPerLevel) + 1;

          return {
            xp: newXP,
            level: newLevel,
          };
        }),

      unlockAchievement: (id) =>
        set((state) => {
          if (state.unlockedAchievements.includes(id)) return state;

          return {
            unlockedAchievements: [...state.unlockedAchievements, id],
          };
        }),

      depositToMain: (amount) =>
        set((state) => {
          const newBalance = state.totalBalance + amount;
          
          const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: 'deposit',
            asset: 'USD',
            amount,
            total: amount,
            date: new Date().toLocaleString('ru-RU'),
            status: 'completed',
          };

          return {
            totalBalance: newBalance,
            balances: {
              ...state.balances,
              USD: (state.balances.USD || 0) + amount,
            },
            transactions: [newTransaction, ...state.transactions],
          };
        }),

      resetProgress: () => set(INITIAL_STATE),
    }),
    {
      name: 'crypto-trade-storage',
    }
  )
);

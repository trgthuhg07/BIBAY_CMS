export const DUMMY_WALLETS = [
  {
    id: "260421182131",
    ownerName: "Truong Van N",
    type: "PERSONAL",
    category: "Main Wallet",
    status: "ACTIVE",
    balance: "2,337.58",
    currency: "S/",
    contact: "+51 1 9876543",
    dni: "84920123",
    createdAt: "21/04/2026 15:58:35"
  },
  {
    id: "260421408595",
    ownerName: "Nguyen Van A",
    type: "MERCHANT",
    category: "Merchant / Partner Wallet",
    status: "TEMPORARY BLOCKED",
    balance: "3,255.71",
    currency: "S/",
    contact: "+51 1 8491888",
    dni: "84958842",
    createdAt: "19/04/2026 00:53:46"
  },
  {
    id: "260421352365",
    ownerName: "Bui Thi H",
    type: "PERSONAL",
    category: "Promotion Wallet",
    status: "ACTIVE",
    balance: "214.64",
    currency: "S/",
    contact: "+51 1 4214770",
    dni: "84976063",
    createdAt: "17/04/2026 13:30:39"
  },
  {
    id: "260421524343",
    ownerName: "Do Van L",
    type: "AGENT",
    category: "Main Wallet",
    status: "PENDING",
    balance: "0.00",
    currency: "S/",
    contact: "+51 1 5461234",
    dni: "84936129",
    createdAt: "15/04/2026 20:38:04"
  },
  {
    id: "260421797005",
    ownerName: "Ngo Thi K",
    type: "PERSONAL",
    category: "Main Wallet",
    status: "BLACKLISTED",
    balance: "783.03",
    currency: "S/",
    contact: "+51 1 9546711",
    dni: "84966684",
    createdAt: "15/04/2026 17:48:35"
  },
  {
    id: "260421758043",
    ownerName: "System Master",
    type: "SYSTEM",
    category: "Master Settlement Wallet",
    status: "ACTIVE",
    balance: "999,999.00",
    currency: "S/",
    contact: "--",
    dni: "--",
    createdAt: "01/01/2025 00:00:00"
  },
  {
    id: "260421112979",
    ownerName: "Ly Thi M",
    type: "PERSONAL",
    category: "Main Wallet",
    status: "ACTIVE",
    balance: "4,787.78",
    currency: "S/",
    contact: "+51 1 2012330",
    dni: "84922012",
    createdAt: "14/04/2026 11:43:50"
  },
  {
    id: "260421299801",
    ownerName: "Hoang Van E",
    type: "PERSONAL",
    category: "Main Wallet",
    status: "ACTIVE",
    balance: "3,563.23",
    currency: "S/",
    contact: "+51 1 2264069",
    dni: "84922640",
    createdAt: "14/04/2026 10:29:33"
  },
  {
    id: "260421221717",
    ownerName: "Duong Van L",
    type: "AGENT",
    category: "Main Wallet",
    status: "ACTIVE",
    balance: "4,196.16",
    currency: "S/",
    contact: "+51 1 6612077",
    dni: "84966120",
    createdAt: "12/04/2026 10:45:07"
  },
  {
    id: "260421608310",
    ownerName: "System Fee",
    type: "SYSTEM",
    category: "Fee Wallet",
    status: "ACTIVE",
    balance: "15,245.50",
    currency: "S/",
    contact: "--",
    dni: "--",
    createdAt: "10/01/2026 09:00:00"
  },
  {
    id: "260421608311",
    ownerName: "Tran Van T",
    type: "PERSONAL",
    category: "Promotion Wallet",
    status: "ACTIVE",
    balance: "50.00",
    currency: "S/",
    contact: "+51 1 5478901",
    dni: "84758901",
    createdAt: "11/04/2026 14:20:10"
  },
  {
    id: "260421608312",
    ownerName: "Le Thi B",
    type: "PERSONAL",
    category: "Main Wallet",
    status: "PENDING",
    balance: "0.00",
    currency: "S/",
    contact: "+51 1 1234567",
    dni: "84123456",
    createdAt: "10/04/2026 08:30:15"
  },
  {
    id: "260421608313",
    ownerName: "KFC Lima",
    type: "MERCHANT",
    category: "Merchant / Partner Wallet",
    status: "ACTIVE",
    balance: "12,450.75",
    currency: "S/",
    contact: "+51 1 9998887",
    dni: "20123456789",
    createdAt: "05/04/2026 11:15:00"
  },
  {
    id: "260421608314",
    ownerName: "System Promo",
    type: "SYSTEM",
    category: "Promotion Wallet",
    status: "ACTIVE",
    balance: "500,000.00",
    currency: "S/",
    contact: "--",
    dni: "--",
    createdAt: "01/01/2026 00:00:00"
  },
  {
    id: "260421608315",
    ownerName: "Vu Van Q",
    type: "AGENT",
    category: "Main Wallet",
    status: "TEMPORARY BLOCKED",
    balance: "1,200.00",
    currency: "S/",
    contact: "+51 1 4455667",
    dni: "84455667",
    createdAt: "02/04/2026 09:45:22"
  }
];

export const getStatusClass = (status) => {
  switch (status) {
    case 'ACTIVE': return 'status-success';
    case 'PENDING':
    case 'TEMPORARY BLOCKED': return 'status-processing';
    case 'BLACKLISTED': return 'status-failed';
    default: return '';
  }
};

export const MathSign = {
  PLUS: '+',
  MINUS: '-',
};

export const DUMMY_TRANSACTIONS = [
  {
    id: "260421182131",
    walletId: "260421182131",
    type: "Cash-in (Agent)",
    amount: "500.00",
    currency: "S/",
    sign: MathSign.PLUS,
    status: "SUCCESS",
    date: "21/04/2026 15:58:00"
  },
  {
    id: "260421182010",
    walletId: "260421182131",
    type: "Transfer P2P",
    amount: "150.00",
    currency: "S/",
    sign: MathSign.MINUS,
    status: "SUCCESS",
    date: "20/04/2026 09:12:35"
  },
  {
    id: "260421181955",
    walletId: "260421182131",
    type: "Payment of Service",
    amount: "80.50",
    currency: "S/",
    sign: MathSign.MINUS,
    status: "FAILED",
    date: "19/04/2026 14:22:10"
  },
  {
    id: "260421181820",
    walletId: "260421182131",
    type: "Transfer P2P",
    amount: "200.00",
    currency: "S/",
    sign: MathSign.PLUS,
    status: "SUCCESS",
    date: "18/04/2026 11:05:00"
  },
  {
    id: "260421181745",
    walletId: "260421182131",
    type: "Cash-in (Agent)",
    amount: "1000.00",
    currency: "S/",
    sign: MathSign.PLUS,
    status: "SUCCESS",
    date: "10/04/2026 16:30:20"
  },
  {
    id: "260421181612",
    walletId: "260421182131",
    type: "Cash-out",
    amount: "100.00",
    currency: "S/",
    sign: MathSign.MINUS,
    status: "PENDING",
    date: "05/04/2026 08:15:45"
  },
  {
    id: "260421181501",
    walletId: "260421182131",
    type: "Payment of Service",
    amount: "45.00",
    currency: "S/",
    sign: MathSign.MINUS,
    status: "SUCCESS",
    date: "01/04/2026 19:40:11"
  }
];


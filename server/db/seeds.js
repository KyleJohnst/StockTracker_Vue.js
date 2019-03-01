use shares;
db.dropDatabase();

db.stocks.insertMany([
  {
    stockName: 'GOOG',
    closingPrice: 1124,
    quantity: 5
  },
  {
    stockName: 'AAPL',
    closingPrice: 174,
    quantity: 2
  },
  {
    stockName: 'MSFT',
    closingPrice: 113,
    quantity: 89
  },
  {
    stockName: 'AMZN',
    closingPrice: 1646,
    quantity: 5
  }
])

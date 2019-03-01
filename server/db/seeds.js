use shares;
db.dropDatabase();

db.stocks.insertMany([
  {
    stockName: 'GOOG',
    closingPrice: 1124.43,
    quantity: 200
  },
  {
    stockName: 'AAPL',
    closingPrice: 174.54,
    quantity: 456
  },
  {
    stockName: 'MSFT',
    closingPrice: 113.45,
    quantity: 652
  },
  {
    stockName: 'AMZN',
    closingPrice: 1646.23,
    quantity: 98
  }
])

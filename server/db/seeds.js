use shares;
db.dropDatabase();

db.stocks.insertMany([
  {
    stockName: 'GOOG',
    closingPrice: 10,
    quantity: 15
  },
  {
    stockName: 'GOOG',
    closingPrice: 15,
    quantity: 20
  },
  {
    stockName: 'AAPL',
    closingPrice: 15,
    quantity: 10
  },
  {
    stockName: 'MSFT',
    closingPrice: 5,
    quantity: 10
  }
])

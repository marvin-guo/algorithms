function maxProfit(prices) {
  let l = 0
  let r = 1
  let maxP = 0

  while (r < prices.length) {
    if (prices[l] < prices[r]) {
      const profit = prices[r] - prices[l]
      maxP = Math.max(maxP, profit)
    } else {
      l = r
    }
    r++
  }

  return maxP
}

function maxProfitDy(prices) {
  let maxP = 0
  let minBuy = prices[0]

  for (let sell of prices) {
    maxP = Math.max(maxP, sell - minBuy)
    minBuy = Math.min(minBuy, sell)
  }

  return maxP
}

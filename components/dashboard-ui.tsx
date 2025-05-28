"use client"
import { LineChart, BarChart, Activity, ArrowUp, ArrowDown, DollarSign, Bitcoin, Wallet } from "lucide-react"

export function DashboardUI() {
  return (
    <div className="h-full w-full bg-[#1a1a1a] text-white overflow-hidden">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#333333]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-purple-600 rounded-md flex items-center justify-center">
            <span className="font-bold text-white">KV</span>
          </div>
          <h2 className="text-lg font-semibold">Key Vault Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1 bg-[#333333] rounded-md text-sm">Settings</button>
          <div className="w-8 h-8 bg-[#333333] rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100%-64px)] overflow-auto">
        {/* Left Sidebar */}
        <div className="col-span-2 frosted-glass-dark rounded-xl p-4 flex flex-col space-y-4">
          <div className="flex items-center space-x-2 p-2 bg-[#333333] rounded-md">
            <Activity size={16} className="text-purple-500" />
            <span className="text-sm">Overview</span>
          </div>
          <div className="flex items-center space-x-2 p-2 hover:bg-[#333333] rounded-md cursor-pointer">
            <Wallet size={16} className="text-orange-500" />
            <span className="text-sm">Portfolio</span>
          </div>
          <div className="flex items-center space-x-2 p-2 hover:bg-[#333333] rounded-md cursor-pointer">
            <LineChart size={16} className="text-purple-500" />
            <span className="text-sm">Performance</span>
          </div>
          <div className="flex items-center space-x-2 p-2 hover:bg-[#333333] rounded-md cursor-pointer">
            <BarChart size={16} className="text-orange-500" />
            <span className="text-sm">Analytics</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-10 space-y-4">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="frosted-glass-light rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Total Balance</span>
                <DollarSign size={16} className="text-orange-500" />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">$124,350.75</span>
                <span className="ml-2 text-xs text-green-500 flex items-center">
                  <ArrowUp size={12} />
                  2.5%
                </span>
              </div>
            </div>
            <div className="frosted-glass-light rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Monthly Yield</span>
                <Activity size={16} className="text-purple-500" />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">$2,145.32</span>
                <span className="ml-2 text-xs text-green-500 flex items-center">
                  <ArrowUp size={12} />
                  1.8%
                </span>
              </div>
            </div>
            <div className="frosted-glass-light rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Annual Returns</span>
                <LineChart size={16} className="text-orange-500" />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">19.5%</span>
                <span className="ml-2 text-xs text-green-500 flex items-center">
                  <ArrowUp size={12} />
                  3.2%
                </span>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="frosted-glass-light rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Portfolio Performance</h3>
              <div className="flex space-x-2">
                <button className="px-2 py-1 bg-[#333333] rounded-md text-xs">1D</button>
                <button className="px-2 py-1 bg-[#333333] rounded-md text-xs">1W</button>
                <button className="px-2 py-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-md text-xs">
                  1M
                </button>
                <button className="px-2 py-1 bg-[#333333] rounded-md text-xs">1Y</button>
                <button className="px-2 py-1 bg-[#333333] rounded-md text-xs">All</button>
              </div>
            </div>
            <div className="h-48 w-full relative">
              {/* Simulated chart */}
              <div className="absolute bottom-0 left-0 right-0 h-full">
                <div className="h-full w-full flex items-end">
                  <div className="relative w-full h-[85%]">
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
                    <svg viewBox="0 0 100 20" className="absolute inset-0 h-full w-full">
                      <path
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="0.5"
                        d="M0,10 Q10,8 20,12 T40,15 T60,10 T80,5 T100,10"
                        vectorEffect="non-scaling-stroke"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="grid grid-cols-2 gap-4">
            <div className="frosted-glass-light rounded-xl p-4">
              <h3 className="font-medium mb-4">Asset Allocation</h3>
              <div className="flex justify-between items-center">
                <div className="space-y-2 w-1/2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Bitcoin</span>
                    <span className="text-sm">45%</span>
                  </div>
                  <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[45%]"></div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Ethereum</span>
                    <span className="text-sm">30%</span>
                  </div>
                  <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[30%]"></div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Solana</span>
                    <span className="text-sm">15%</span>
                  </div>
                  <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[15%]"></div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">USDC</span>
                    <span className="text-sm">10%</span>
                  </div>
                  <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[10%]"></div>
                  </div>
                </div>

                <div className="w-32 h-32 relative">
                  <div className="absolute inset-0 rounded-full border-8 border-orange-500 opacity-25"></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-orange-500 border-r-orange-500"
                    style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-500"
                    style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-l-blue-500"
                    style={{ clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-transparent border-r-green-500 border-b-green-500"
                    style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="frosted-glass-light rounded-xl p-4">
              <h3 className="font-medium mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 hover:bg-[#333333] rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Bitcoin size={16} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Bitcoin Purchase</p>
                      <p className="text-xs text-gray-400">May 15, 2023</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">+0.05 BTC</span>
                </div>

                <div className="flex justify-between items-center p-2 hover:bg-[#333333] rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <DollarSign size={16} className="text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Yield Payment</p>
                      <p className="text-xs text-gray-400">May 10, 2023</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-500">+$245.50</span>
                </div>

                <div className="flex justify-between items-center p-2 hover:bg-[#333333] rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <ArrowDown size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Deposit</p>
                      <p className="text-xs text-gray-400">May 5, 2023</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">+$5,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

const BalanceItem = ({ imageSrc, name, amount }) => {
  return (
    <div className="flex justify-center items-center border border-darkGreen bg-black rounded-lg w-full py-4 px-6">
      <div className="flex w-full justify-between">
        <div className="flex justify-center items-center space-x-2">
          <img src={imageSrc} alt="" className="w-10 h-10" />
          <div className="flex flex-col">
            <div className="text-xl">{name}</div>
            <div className="text-sm">{name}</div>
          </div>
        </div>
        <div className="text-xl">{amount}</div>
      </div>
    </div>
  );
};

export function AccountSidebar() {
  return (
    <div className="flex h-full p-6 items-center justify-center rounded-xl border border-lightGreen w-[22%]">
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex flex-col w-full items-start justify-center space-y-5">
          {/* My Account section */}
          <div className="text-xl">My Account</div>
          <div className="flex justify-center items-center border border-darkGreen bg-black rounded-lg w-full py-4 px-2">
            <span>0xb3B18f...D770D1</span>
          </div>
          <div className="p-3"></div>
          {/* My Balances section */}
          <div className="text-xl">My Balances</div>
          <BalanceItem imageSrc="/vara.png" name="Vara" amount="0.00" />
        </div>
        {/* Logout button */}
        <div className="flex bg-black rounded-xl w-[90%] py-2 px-2">Logout</div>
      </div>
    </div>
  );
};


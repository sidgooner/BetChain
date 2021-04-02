pragma solidity ^0.5.0;

contract Betting{
    
    uint256 public team1bet=0;
    uint256 public team2bet=0;
    address payable[] public players;
    address payable public owner;
    uint256 winner;
    uint256 cnt=0;
    
    
    
    function() external payable {}
    
    constructor() public {
      owner = msg.sender;
      
    }
    
    
    function hasbet(address payable player) public view returns(bool)
    {
        if(players.length > 1) return false;

        for(uint256 i=0;i<players.length;i++)
        {
            if(players[i]==player) return true;
        }
        return false;
    }
    
    function doBet() public payable{
        
        require(!hasbet(msg.sender));
        
       players.push(msg.sender);
        
    }
    
    
    
    function distribute(address payable win) public payable{
        
        if(win == players[0])
        {
            players[0].transfer(10*1000000000000000000);
        }
        else
        {
            players[1].transfer(10*1000000000000000000);
        }
    }
      
    function AmountOne() public view returns(uint256){
       return team1bet;
    }
    function AmountTwo() public view returns(uint256){
       return team2bet;
    }

    
    
}
pragma solidity ^0.5.0;

contract Betting{
    
    uint256 public team1bet=0;
    uint256 public team2bet=0;
    address payable[] public players;
    address payable public owner;
    uint256 winner;
    
    struct Player {
      uint256 amountBet;
      uint256 teamSelected;
    }
    
    mapping(address => Player) public playerInfo;
    
    function() external payable {}
    
    constructor() public {
      owner = msg.sender;
      
    }
    
    
    function hasbet(address payable player) public view returns(bool)
    {
        for(uint256 i=0;i<players.length;i++)
        {
            if(players[i]==player) return true;
        }
        return false;
    }
    
    function doBet(uint256 team) public payable{
        
        require(!hasbet(msg.sender));
        
        playerInfo[msg.sender].amountBet=msg.value;
        playerInfo[msg.sender].teamSelected=team;
        
        players.push(msg.sender);
        
        if(team==1)
        {
            team1bet+=msg.value;
        }
        
        else
        {
            team2bet+=msg.value;
        }
        
    }
    
    
    
    function distribute(uint256 win) public payable{
        
        if(win==1)
        {
            winner=1;
        }
        else
        {
            winner=2;
        }

        address payable[10] memory winners;
        
        uint256 count = 0; 
        uint256 LoserBet = 0; 
        uint256 WinnerBet = 0;
        address add;
        uint256 bet;
        address payable playerAddress;

      for(uint256 i = 0; i < players.length; i++){
         playerAddress = players[i];

         if(playerInfo[playerAddress].teamSelected == winner){
            winners[count] = playerAddress;
            count++;
         }
      }
    
        if ( winner == 1){
         LoserBet = team2bet;
         WinnerBet = team1bet;
      }
      else{
          LoserBet = team1bet;
          WinnerBet = team2bet;
      }
      

      for(uint256 j = 0; j < count; j++){

         if(winners[j] != address(0))
            add = winners[j];
            bet = playerInfo[add].amountBet;

            winners[j].transfer((bet*(10000+(LoserBet*10000/WinnerBet)))/10000 );
      }
    }
      
    function AmountOne() public view returns(uint256){
       return team1bet;
    }
    function AmountTwo() public view returns(uint256){
       return team2bet;
    }

    
    
}
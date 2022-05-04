 pragma solidity ^0.5.0;
     pragma experimental ABIEncoderV2;
contract Database_Search{
    
     struct user{
        string username;
        string password;
        
    }
        user[] public users;
       mapping(string => mapping(string => Index_details)) details;
       
    struct Index_details{
     uint flag;
     string key;
     string[] Index;
    }
    uint flag=0;
    string[]  dummy;
    
    function Register(string memory username,string memory password) public{
           uint i=findd_id(username);
           if(i==0){
               users.push(user(username,password));
           }
           else{
               revert('The username already exists! ');
           }
                  
    }

    function Insert_Dummy(string [] memory input) public{
        if(flag==0){
        dummy=input;
        flag=1;
        }
         else{
               revert('Dummy has already updated! ');
          }
    }
    
    function Insert(string memory username,string memory password,string memory tablename,string memory Key,string [] memory input) public{
        uint i=find_id(username);
         if(keccak256(abi.encodePacked(users[i].password))== keccak256(abi.encodePacked(password)))
         {
          if(details[username][tablename].flag==0){
              if(input.length%2!=0)
              {
                  revert('The index table is wrong/Incomplete ! ');
              }
              Index_details memory p;
              p.flag=1;
              p.key=Key;

            p.Index=input;
              details[username][tablename]=p;
          }   
          else{
               revert('The tablename for username already exists! ');
          }
         }
         else{
             revert(' Wrong Password for username !');
         }
         
    }
    
    function Search_Keyword(string memory username, string memory tablename,string memory Enc_keyword,uint [] memory input)view public returns(string memory,string [3] memory){
         uint i=find_id(username);
          if(details[username][tablename].flag!=0){
             uint j=find_id_in_index(substring(Enc_keyword,5),details[username][tablename].Index);
             if(j==details[username][tablename].Index.length-1){
                  revert('The Enc_Keyword does not exist in username->tablename ! ');
             }
             uint dummy_length=input.length;
             string[3] memory result;
             result[0]=details[username][tablename].Index[j+1];
             for(uint k=0;k<dummy_length;k++)
             {
                 result[k+1]=dummy[input[k]];
             }
             return (details[username][tablename].Index[j],result);
              
          }   
          else{
               revert('The tablename for username does not exists! ');
          }
         
    }
    
    
     function find_id(string memory username)view internal returns(uint){
            for(uint i=0;i<users.length;i++){
                if(keccak256(abi.encodePacked(users[i].username))== keccak256(abi.encodePacked(username)))
                {
                    return i;
                }
            }
            revert('This username does not exist !');
        }
        
    function find_id_in_index(string memory Enc_Keyword,string [] memory str)view internal returns(uint){
            for(uint i=0;i<str.length;i++){
                if(keccak256(abi.encodePacked(str[i]))== keccak256(abi.encodePacked(Enc_Keyword)))
                {
                    return i;
                }
            }
             revert('The Enc_Keyword does not exist in username->tablename ! ');
        }
    
    function findd_id(string memory username)view internal returns(uint){
             uint k=0;
            for(uint i=0;i<users.length;i++){
                if(keccak256(abi.encodePacked(users[i].username))== keccak256(abi.encodePacked(username)))
                {
                     k=1;
                }
            }
            return k;
           
        }

       function substring(string memory str,uint end_pad_length)view internal returns(string memory) {
    bytes memory strBytes = bytes(str);
    if(strBytes.length>5){
    bytes memory result = new bytes(strBytes.length-end_pad_length);
    for(uint i = 0; i <strBytes.length-end_pad_length; i++) {
        result[i] = strBytes[i];
    }
    return string(result);
       }
       else{
             revert('The Enc_Keyword does not exist in username->tablename ! ');
       }
       }

}
    
    
    
    
    
import Web3 from 'web3';
import Database_Search from '../build/contracts/Database_Search.json';

let web3;
let crud;


const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
    const deploymentKey = Object.keys(Database_Search.networks)[0];
  return new web3.eth.Contract(
    Database_Search.abi, 
    Database_Search
      .networks[deploymentKey]
      .address
  );
};



const initApp = () => {

    const $Register = document.getElementById('Register');
    const $RegisterResult = document.getElementById('Register-result');
    const $Insert_Dummy = document.getElementById('Insert_Dummy');
    const $Insert_DummyResult = document.getElementById('Insert_Dummy-result');
    const $Insert_Index_Table = document.getElementById('Insert_Index_Table');
    const $Insert_Index_TableResult = document.getElementById('Insert_Index_Table-result');
    const $Search_Keyword = document.getElementById('Search_Keyword');
    const $Search_KeywordResult = document.getElementById('Search_Keyword-result');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

    $Register.addEventListener('submit', (e) => {
    e.preventDefault();
        const username = e.target.elements[0].value;
        const password = e.target.elements[1].value;



        web3.eth.sign(web3.utils.sha3('Hello world'), accounts[0]).then(result => {
         
})
        .catch(_e => {
          
            $RegisterResult.innerHTML = `Ooops... there was an error while trying to sign transaction for  registering user ${username}`;

        });

        crud.methods.Register(username,password).send({from: accounts[0]})
    .then(result => {
      $RegisterResult.innerHTML = `New user ${username} registered successfully `;
    })
    .catch(_e => {
      $RegisterResult.innerHTML = `Ooops... their was an error while trying to register username ${username}`;
    });
  });

  $Insert_Dummy.addEventListener('submit', (e) => {
    e.preventDefault();

    const dummy= e.target.elements[0].value;

    const arr=[];
    var j=0;
    var start=0;
   for (var i = 0; i < dummy.length; i++) {
     if(dummy[i]==",")
      {
         arr[j]=dummy.substring(start, i);;
         j++;
        start=i+1;
      }
    }
    if(start< dummy.length)
    arr[j]=dummy.substring(start);



        web3.eth.sign(web3.utils.sha3('Hello world'), accounts[0]).then(result => {
          
})
        .catch(_e => {
          
            $RegisterResult.innerHTML = `Ooops... there was an error while trying to sign transaction for  registering user ${username}`;

        });

        crud.methods.Insert_Dummy(arr).send({from: accounts[0]})
    .then(result => {
      $Insert_DummyResult.innerHTML = `Dummy salts  successfully stored `;
    })
    .catch(_e => {
      $Insert_DummyResult.innerHTML = `Ooops... their was an error while trying to store dummy salts `;
    });
  });


  $Insert_Index_Table.addEventListener('submit', (e) => {
    e.preventDefault();
        const username = e.target.elements[0].value;
        const password = e.target.elements[1].value;
        const tablename= e.target.elements[2].value;
        const key= e.target.elements[3].value;
        const Primary_key= e.target.elements[4].value;

        const arr=[];
        var j=0;
        var start=0;
       for (var i = 0; i < Primary_key.length; i++) {
         if(Primary_key[i]==",")
          {
             arr[j]=Primary_key.substring(start, i);;
             j++;
            start=i+1;
          }
        }
        if(start< Primary_key.length)
        arr[j]=Primary_key.substring(start);



        web3.eth.sign(web3.utils.sha3('Hello world'), accounts[0]).then(result => {
           
})
        .catch(_e => {
            flag=0;
            $Insert_Index_TableResult.innerHTML = `Ooops... there was an error while trying to sign transaction for  Inserting Table details for ${tablename}`;

        });

        crud.methods.Insert(username,password,tablename,key,arr).send({from: accounts[0]})
    .then(result => {
      $Insert_Index_TableResult.innerHTML = `New table ${tablename}  details stored  successfully `;
    })
    .catch(_e => {
      $Insert_Index_TableResult.innerHTML = `Ooops... their was an error while trying to store details for tablename ${username} `;
    });
  });




 

    $Search_Keyword.addEventListener('submit', (e) => {
    e.preventDefault();
        const username = e.target.elements[0].value;
        const tablename = e.target.elements[1].value;
        var keyword = e.target.elements[2].value;
        const x = Math.floor((Math.random() * 3) );
        const arr=[];
        var j=0;
        for(j=0;j<x;j++)
         {
           arr[j]=Math.floor((Math.random() * 2) );
         }

        const str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        j=0;
        for(j=0;j<5;j++)
        {
          keyword+=str[Math.floor((Math.random() * 62) )];
        }

        crud.methods.Search_Keyword(username,tablename,keyword,arr).call()
    .then(result => {
     
     // $Search_KeywordResult.innerHTML = JSON.stringify(result, null, 2);
     $Search_KeywordResult.innerHTML = `The salt for row ${result[0]} are -->${result[1]}`;
    })
    .catch(_e => {
      $Search_KeywordResult.innerHTML = `Ooops... there was an error while trying to fetch Salt for username ${username},tablename ${tablename}, Encrypted_keyword ${keyword}`;
    });
  });

    
};


document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
        .catch(e => console.log(e.message));
   
});
const contract = {
    address: "0x486F0BcB8cE7F4f6440AadFB64a8fcEcb2FaE46F",
    abi: [
        "function getNextTokenID() external view returns (uint256)",
        "function getCurrentTokenID() external view returns (uint256)",
        "function getRemainingTime() external view returns (uint256)",
        "function createBid(uint256 token) external payable override nonReentrant",
        "function auctionStatus() public view returns (bool)",
        "function timeBuffer() public view returns (uint256)",
        "function duration() public view returns (uint256)",
        "function currentToken() public view returns (uint256)",
        "function amount() public view returns (uint256)",
        "function startTime() public view returns (uint256)",
        "function endTime() public view returns (uint256)",
        "function bidder() public view returns (address)",
        "function getWinningBidders(uint256) public view returns (address)",
        "function getWinningAmount(uint256) public view returns (uint256)",
        "function settleCurrentAndCreateNewAuction() external override nonReentrant"
        ]
};

var chain = 1;
var maxMint = 3;
var nftPrice = 5000000000000000000;
var nftPriceEth= 5;
var nextMint = 1.0501;
var nextMintAmount;
var countdown;
    
    function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  function decrementCounter() {
    updateStatus(seconds);
    if (seconds === 0) {
      counterEnd();
      instance.stop();
    }
    seconds--;
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}


getInfo(0);

var rt;
var remainingTime;

async function refresh() {

        document.getElementById("Refresh-Btn").innerHTML = "Refreshing...";
        
        const RPC = "https://mainnet.infura.io/v3/54297732d5e249febec6978df023ee45";
        const provider = new ethers.providers.JsonRpcProvider(RPC);
        // await provider.send("eth_requestAccounts", []);
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);

        var ct = await CONTRACT_ADDRESS.getCurrentTokenID();
        
        var a = await CONTRACT_ADDRESS.amount();
        var currentBidder = await CONTRACT_ADDRESS.bidder();
        
        var currentToken = Number(BigInt(ct)) + 1;
        var currentBid = Number(BigInt(a))/1000000000000000000;
        
        nextMintAmount = (currentBid*nextMint).toFixed(4);

        document.getElementById("Check-Amount").innerHTML = "Ξ " + currentBid;
        document.getElementById("Amount-To-Bid").placeholder = "Ξ " + nextMintAmount + " or more";
        document.getElementById("Check-Bidder").innerHTML = currentBidder.substring(0,4) + "..." + currentBidder.substring(currentBidder.length - 4);
        document.getElementById("Bidder-Link").href = "https://etherscan.io/address/" + currentBidder;
        
        if(currentBid === 0){
            document.getElementById("Check-Bidder").innerHTML = "NONE";
        document.getElementById("Bidder-Link").style.display="none";
        }
        
        await delay(3);
        document.getElementById("Refresh-Btn").innerHTML = "Refreshed!";
        await delay(3);
        document.getElementById("Refresh-Btn").innerHTML = "Refresh Bids";
        
        
     
}

async function getStats(z) {
   
        const RPC = "https://mainnet.infura.io/v3/54297732d5e249febec6978df023ee45";
        const provider = new ethers.providers.JsonRpcProvider(RPC);
        // await provider.send("eth_requestAccounts", []);
        // const signer = provider.getSigner();
        // let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);

        var ct = await CONTRACT_ADDRESS.getCurrentTokenID();
        
        var a = await CONTRACT_ADDRESS.amount();
        var currentBidder = await CONTRACT_ADDRESS.bidder();
        
        var currentToken = Number(BigInt(ct)) + 1;
        var currentBid = Number(BigInt(a))/1000000000000000000;
        
        nextMintAmount = (currentBid*nextMint).toFixed(4);

        document.getElementById("Check-Amount").innerHTML = "Ξ " + currentBid;
        document.getElementById("Amount-To-Bid").placeholder = "Ξ " + nextMintAmount + " or more";
        document.getElementById("Check-Bidder").innerHTML = currentBidder.substring(0,4) + "..." + currentBidder.substring(currentBidder.length - 4);
        document.getElementById("Bidder-Link").href = "https://etherscan.io/address/" + currentBidder;
        
        if(currentBid === 0){
            document.getElementById("Check-Bidder").innerHTML = "NONE";
        document.getElementById("Bidder-Link").style.display="none";
        }
        
 
        
            await delay(25);
    getStats();
    getTimer();
   
}

async function getTimer(){
    
    const RPC = "https://mainnet.infura.io/v3/54297732d5e249febec6978df023ee45";
                const provider = new ethers.providers.JsonRpcProvider(RPC);
        // await provider.send("eth_requestAccounts", []);
        // const signer = provider.getSigner();
        // let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);
    
                    var et = await CONTRACT_ADDRESS.endTime();
        
                    try{
                    rt = await CONTRACT_ADDRESS.getRemainingTime();
                    remainingTime = Number(BigInt(rt));
                    }
                    catch(e){
                    rt = 0  ;
                    remainingTime = 0;
                    }
                    
                    var endTime = Number(BigInt(et));
                    var key = new Date(0); // The 0 there is the key, which sets the date to the epoch
                    countdown = key.setUTCSeconds(endTime);
                    
                    console.log(countdown);
}


async function getInfo(z) {
    
            countdown = 0;
            
        const RPC = "https://mainnet.infura.io/v3/54297732d5e249febec6978df023ee45";
                const provider = new ethers.providers.JsonRpcProvider(RPC);
        // await provider.send("eth_requestAccounts", []);
        // const signer = provider.getSigner();
        // let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);

        var ct = await CONTRACT_ADDRESS.getCurrentTokenID();
        
        var a = await CONTRACT_ADDRESS.amount();
        var currentBidder = await CONTRACT_ADDRESS.bidder();
        
                            var currentToken = Number(BigInt(ct)) + 1;
                    var currentBid = Number(BigInt(a))/1000000000000000000;
        
        nextMintAmount = (currentBid*nextMint).toFixed(4);
        
            if(z === 0){
    document.getElementById("Graphic").style.display="none";
    document.getElementById("Graphic-Video").style.display="flex";
    }
    
                        var et = await CONTRACT_ADDRESS.endTime();
        
                    try{
                    rt = await CONTRACT_ADDRESS.getRemainingTime();
                    remainingTime = Number(BigInt(rt));
                    }
                    catch(e){
                    rt = 0  ;
                    remainingTime = 0;
                    }
                    
                    var endTime = Number(BigInt(et));
                    var key = new Date(0); // The 0 there is the key, which sets the date to the epoch
                    countdown = key.setUTCSeconds(endTime);
            
        
        if(z === 0){
                var timer = setInterval(function () {
                    
                	var n = new Date().getTime();
                	var d = countdown - n;
                	var days = Math.floor(d / (1000 * 60 * 60 * 24));
                	var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                	var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
                	var seconds = Math.floor((d % (1000 * 60)) / 1000);
                	var count = hours + minutes + seconds;
                	document.getElementById("Check-Time").innerHTML = hours + "h " + minutes + "m " +  seconds + "s";
                	if (d < 0 && count < 0) {
                	    
                	    if(isConnected){
                	                        	    
                        document.getElementById("bid-live").style.display = "none";
                        document.getElementById("bid-settled").style.display = "flex";
                	    }
                	    
                        document.getElementById("Connect").innerHTML = "Connect to Settle";	
                        document.getElementById("Check-Time").innerHTML = "Auction Ended!";	
                	document.getElementById("Time-Off").innerHTML = "";	
                	}
                	else{
                	   document.getElementById("bid-live").style.display = "block";
                        document.getElementById("bid-settled").style.display = "none";
                	}
                }, 1000);
        }
        
        if(z === 1){
            document.getElementById("Time-Off").innerHTML = "Timer: ";	
        }
        document.getElementById("Amount-To-Bid").value = "";
        document.getElementById("Bid-Btn").innerHTML = "PLACE BID"
        document.getElementById("Pass-Name").innerHTML = "Founders Pass #" + currentToken;
        document.getElementById("Check-Amount").innerHTML = "Ξ " + currentBid;
        document.getElementById("Amount-To-Bid").placeholder = "Ξ " + nextMintAmount + " or more";
        document.getElementById("Check-Bidder").innerHTML = currentBidder.substring(0,4) + "..." + currentBidder.substring(currentBidder.length - 4);
        document.getElementById("Bidder-Link").href = "https://etherscan.io/address/" + currentBidder;
        
        document.querySelector(`video`).src = "/mp4s/FVCKRENDER_Prism_" + currentToken + ".mp4";
        
        
        if(currentBid === 0){
            document.getElementById("Check-Bidder").innerHTML = "NONE";
        document.getElementById("Bidder-Link").style.display="none";
        }
    
  
}


async function createBid() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
    } catch (err) {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "54297732d5e249febec6978df023ee45"

                }
            }
        };
        const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions
        });
        const providerConnect = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(providerConnect);
        const signer = providerConnect.accounts[0];
    }
}

async function settleCurrentAndCreateNewAuction() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
    } catch (err) {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "54297732d5e249febec6978df023ee45"
                }
            }
        };
        const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions
        });
        const providerConnect = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(providerConnect);
        const signer = providerConnect.accounts[0];
    }
}

async function connect() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());
    } catch (err) {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "54297732d5e249febec6978df023ee45"
                }
            }
        };
        const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions
        });
        const providerConnect = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(providerConnect);
        const signer = providerConnect.accounts[0];
    }
}

function delay(n) {
    return new Promise(function(resolve) {
        setTimeout(resolve, n * 500);
    });
}


function MakeQuerablePromise(promise) {
    if (promise.isFulfilled) return promise;
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;
    var result = promise.then(function(v) {
        isFulfilled = true;
        isPending = false;
        return v;
    }, function(e) {
        v
        isRejected = true;
        isPending = false;
        throw e;
    });
    result.isFulfilled = function() {
        return isFulfilled;
    };
    result.isPending = function() {
        return isPending;
    };
    result.isRejected = function() {
        return isRejected;
    };
    return result;
}

function hasNonDigit(str) {
    return /\D/g.test(str.toString());
}

class sign {
    constructor(contractAddress, chainId, signer) {
        this.contractAddress = contractAddress;
        this.chainId = chainId;
        this.signer = signer;
    }

    
    
    static async settle() {
        
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            let userAddress = await signer.getAddress();
            const web3 = new Web3(provider2);
            const chainIdon2 = await web3.eth.getChainId();

        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);
        
        settleCurrentAndCreateNewAuction()
        
            const hash = new ethers.Contract(contract.address, contract.abi, provider.getSigner());
            const tx = await hash.settleCurrentAndCreateNewAuction();
            document.getElementById("Settle-Btn").removeAttribute("onclick");
            document.getElementById("Settle-Btn").innerHTML = "PENDING..."
            const receipt = await tx.wait();
            document.getElementById("Settle-Btn").innerHTML = "SUCCESS!"
            await delay(4);
            document.getElementById("Settle-Btn").innerHTML = "REFRESHING PAGE.."
            await delay(5);
            location.reload();
        }
     catch (err) {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "54297732d5e249febec6978df023ee45"
                }
            }
        };
        const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions
        });
        const providerConnect = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(providerConnect);
        const signer = providerConnect.accounts[0];
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider.getSigner());
        
            settleCurrentAndCreateNewAuction()
        
            const hash = new ethers.Contract(contract.address, contract.abi, provider.getSigner());
            const tx = await hash.settleCurrentAndCreateNewAuction();
            document.getElementById("Settle-Btn").removeAttribute("onclick");
            document.getElementById("Settle-Btn").innerHTML = "PENDING..."
            const receipt = await tx.wait();
            document.getElementById("Settle-Btn").innerHTML = "SUCCESS!"
            await delay(4);
            document.getElementById("Settle-Btn").innerHTML = "REFRESHING PAGE.."
            await delay(5);
            location.reload();
    
      } 

    }
    
       static async bid() {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            let userAddress = await signer.getAddress();
            const web3 = new Web3(provider2);
            const chainIdon2 = await web3.eth.getChainId();
            
                    
          const ethBal = await provider.getBalance(signer.getAddress());
            let ethbalance = parseInt(ethBal);
            
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);
        
                var ct = await CONTRACT_ADDRESS.getCurrentTokenID();
               var currentToken = Number(BigInt(ct));
                 var numToMint = 1;
                 var p = document.getElementById("Amount-To-Bid").value;
                 var price = document.getElementById("Amount-To-Bid").value*1000000000000000000;
                 console.log(price);
                 
                                  if(ethbalance <= price){
                     document.getElementById("Bid-Btn").innerHTML = "INSUFFICIENT FUNDS"
                     await delay(2);
                     document.getElementById("Bid-Btn").innerHTML = "PLACE BID"
                 }
                 else{
                 
                 
                 if(Number(p) < nextMintAmount || nextMintAmount === undefined){
                     document.getElementById("Bid-Btn").innerHTML = "INVALID AMOUNT"
                     await delay(2);
                     document.getElementById("Bid-Btn").innerHTML = "PLACE BID"
                 }
                 else{
                 
                       let overrides = {
        value: String(numToMint * price)
      };

        
        createBid(currentToken,overrides);
        
            const hash = new ethers.Contract(contract.address, contract.abi, provider.getSigner());
            const tx = await hash.createBid(currentToken,overrides);
            document.getElementById("Bid-Btn").removeAttribute("onclick");
            document.getElementById("Bid-Btn").innerHTML = `BIDDING Ξ` + p + `...`
            const receipt = await tx.wait();
            document.getElementById("Bid-Btn").innerHTML = "BID PLACED!"
            document.getElementById("Bid-Btn").setAttribute("onclick","sign.bid()");
                 await delay(2);
            document.getElementById("Amount-To-Bid").value = "";
            document.getElementById("Bid-Btn").innerHTML = "PLACE BID";
            getStats(1);
                 }
            }
        }
        catch (err) {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "54297732d5e249febec6978df023ee45"
                }
            }
        };
        const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions
        });
        const providerConnect = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(providerConnect);
        const signer = providerConnect.accounts[0];
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider.getSigner());
        
                
          const ethBal = await provider.getBalance(providerConnect.accounts[0]);
            let ethbalance = parseInt(ethBal);
        
                        var ct = await CONTRACT_ADDRESS.getCurrentTokenID();
               var currentToken = Number(BigInt(ct));
                 var numToMint = 1;
                 var p = document.getElementById("Amount-To-Bid").value;
                 var price = document.getElementById("Amount-To-Bid").value*1000000000000000000;
                 console.log(price);
                 
                 
                 if(ethbalance <= price){
                     document.getElementById("Bid-Btn").innerHTML = "INSUFFICIENT FUNDS"
                     await delay(2);
                     document.getElementById("Bid-Btn").innerHTML = "PLACE BID"
                 }
                 else{
                 
                 if(Number(p) < nextMintAmount || nextMintAmount === undefined){
                     document.getElementById("Bid-Btn").innerHTML = "INVALID AMOUNT"
                     await delay(2);
                     document.getElementById("Bid-Btn").innerHTML = "PLACE BID"
                 }
                 else{
                 
                       let overrides = {
        value: String(numToMint * price)
      };

        
        createBid(currentToken,overrides);
        
            const hash = new ethers.Contract(contract.address, contract.abi, provider.getSigner());
            const tx = await hash.createBid(currentToken,overrides);
            document.getElementById("Bid-Btn").removeAttribute("onclick");
            document.getElementById("Bid-Btn").innerHTML = `BIDDING Ξ` + p + `...`
            const receipt = await tx.wait();
            document.getElementById("Bid-Btn").innerHTML = "BID PLACED!"
            document.getElementById("Bid-Btn").setAttribute("onclick","sign.bid()");
            await delay(2);
            document.getElementById("Amount-To-Bid").value = "";
            document.getElementById("Bid-Btn").innerHTML = "PLACE BID";
        getStats(1);
                }
                 }
            }
       }
    
    
  
    async _signingDomain() {
        if (this._domain != null) {
            return this._domain;
        }
        const chainId = await this.chainId;
        this._domain = {
            name: SIGNING_DOMAIN_NAME,
            version: SIGNING_DOMAIN_VERSION,
            verifyingContract: this.contractAddress,
            chainId
        };
        return this._domain;
    }
}

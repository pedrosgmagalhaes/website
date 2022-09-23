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

const fp = {
    address: "0x923E100F9aaB212c5e4A328c263809031C92Df04",
    abi: [
        "function ownerOf(uint256 tokenId) external view returns (address owner)",
        "function totalSupply() external view returns (uint256)"
        ]
};

var chain = 4;
var maxMint = 3;
var nftPrice = 5000000000000000000;
var nftPriceEth= 5;
var nextMint = 1.011;
var nextMintAmount;
var countdown;

    // async function goToMint(){
            
    //         var amountToMint = document.getElementById("Amount-To-Mint").value;
            
    //         var eth = amountToMint * nftPriceEth;
            
    //         if(amountToMint === undefined || amountToMint < minMint){
    //             document.getElementById("Next-Btn").innerHTML = "Invalid";
    //             await delay(3);
    //             document.getElementById("Next-Btn").innerHTML = "Next";
    //         }
    //         else{
    //         if(amountToMint > maxMint){
    //             document.getElementById("Next-Btn").innerHTML = "Max " + maxMint;
    //             await delay(3);
    //             document.getElementById("Next-Btn").innerHTML = "Next";
    //         }
    //         else{
    //                             document.getElementById("Amount-To-Mint").style.display = "none";
    //         document.getElementById("Next-Btn").style.display = "none";
    //         document.getElementById("Token-Minted-Amount").style.display = "none";
    //         document.getElementById("Mint-Btn").innerHTML = "MINT " + amountToMint + " (" + eth + "Ξ)";
    //         document.getElementById("Mint-Btn").style.display = "inline";
    //         document.getElementById("Mint-Amount").style.display = "inline";
    //         }
    //         }
    // }
    
    // function mintagain(){
    //         document.getElementById("Mint-Btn").style.display = "none";
    //         document.getElementById("Mint-Amount").style.display = "none";  
    //         document.getElementById("Welcome").style.display = "none";
    //         document.getElementById("View").style.display = "none";
    //                             document.getElementById("Amount-To-Mint").style.display = "inline";
    //         document.getElementById("Next-Btn").style.display = "inline";
    //         document.getElementById("Token-Minted-Amount").style.display = "inline"; 
    //         document.getElementById("Mint-Btn").setAttribute("onclick","sign.mint()");
    // }
    
    
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

var rt;
var remainingTime;

async function getInfoFP() {


const RPC = "https://mainnet.infura.io/v3/54297732d5e249febec6978df023ee45";
        const provider = new ethers.providers.JsonRpcProvider(RPC);
        
        const CONTRACT_ADDRESS = new ethers.Contract(fp.address, fp.abi, provider);
        const CONTRACT_ADDRESS_AUCTION = new ethers.Contract(contract.address, contract.abi, provider);

        var ts = await CONTRACT_ADDRESS.totalSupply();
        
        var loop = ts - 1;
        
        console.log(loop);
        
        for(var i=0; i<loop; i++){
            var owner = await CONTRACT_ADDRESS.ownerOf(i);
            var idmatch = i+1;
            var getdiv = "id" + idmatch;
            var getid = "Current-Owner-" + idmatch;
            document.getElementById(getdiv).style.display="block";
            document.getElementById(getid).innerHTML = owner.substring(0,4) + "..." + owner.substring(owner.length - 4);
        }

        for(var i=50; i<loop; i++){
            var amount = await CONTRACT_ADDRESS_AUCTION.getWinningAmount(i);
            var amount2 = Number(amount/1000000000000000000);
            var finalAmount = Math.round(amount2 * 100) / 100;
            var idmatch = i+1;
            var getid = "Bid-" + idmatch;
            document.getElementById(getid).innerHTML = "Ξ " + finalAmount;
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
    
       static async bid() {
        
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            let userAddress = await signer.getAddress();
            const web3 = new Web3(provider2);
            const chainIdon2 = await web3.eth.getChainId();
            
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);
        
                var ct = await CONTRACT_ADDRESS.getCurrentTokenID();
               var currentToken = Number(BigInt(ct));
                 var numToMint = 1;
                 var p = document.getElementById("Amount-To-Bid").value;
                 var price = document.getElementById("Amount-To-Bid").value*1000000000000000000;
                 console.log(price);
                 
                 
                 if(Number(p) <= nextMintAmount || nextMintAmount === undefined){
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
            document.getElementById("Bid-Btn").innerHTML = "BIDDING..."
            const receipt = await tx.wait();
            document.getElementById("Bid-Btn").innerHTML = "BID PLACED!"
            getInfo(0);
            await delay(2);
            document.getElementById("Amount-To-Bid").value = "";
            document.getElementById("Bid-Btn").innerHTML = "PLACE BID"
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
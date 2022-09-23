const contract = {
    address: "0x60E303739CEF9E86682b048C59473c8e122F245f",
    abi: [
        "function mintAllowlist() external nonReentrant",
        "function mintPublic(uint256 _tokenAmount) external payable nonReentrant",
        "function totalSupply() external view returns (uint256)",
        "function balanceOf(address) external view returns (uint256)",
        "function isPublicActive() public view returns (bool)",
        "function numMintedPerPersonPublic(address) public view returns (uint256)",
        ]
};

const cb = {
    address: "0x892848074ddeA461A15f337250Da3ce55580CA85",
    abi: [
        "function balanceOf(address owner) public view virtual override returns (uint256)"
        ]
};

var chain = 1;
var maxMint = 5;
var nftPrice = 20000000000000000;
var nftPriceEth= 0.02;
var minMint = 1;
    
    function mintagain(){
            document.getElementById("Mint-Btn").style.display = "none";
            document.getElementById("Mint-Amount").style.display = "none";  
            document.getElementById("Welcome").style.display = "none";
            document.getElementById("View").style.display = "none";
                                document.getElementById("Amount-To-Mint").style.display = "inline";
            document.getElementById("Next-Btn").style.display = "inline";
            document.getElementById("Token-Minted-Amount").style.display = "inline"; 
            document.getElementById("Mint-Btn").setAttribute("onclick","sign.mint()");
    }
    
async function getMinted() {
         try{
        const RPC = "https://mainnet.infura.io/v3/54297732d5e249febec6978df023ee45";
        const provider = new ethers.providers.JsonRpcProvider(RPC);
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);

        var supply = await CONTRACT_ADDRESS.totalSupply();
        
        document.getElementById("Token-Minted").innerHTML = supply + "/2000";
         }
         catch(e){
          const RPC = "https://rinkeby.infura.io/v3/54297732d5e249febec6978df023ee45";
        const provider = new ethers.providers.JsonRpcProvider(RPC);
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);

        var supply = await CONTRACT_ADDRESS.totalSupply();
        
        document.getElementById("Token-Minted").innerHTML = supply + "/2000";   
         }
}

async function getInfo(x) {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);

        var minted = await CONTRACT_ADDRESS.numMintedPerPersonPublic(userAddress);
        
        var isPub = await CONTRACT_ADDRESS.isPublicActive();
        
        var mintedTotal = Number(BigInt(minted));
        
        document.getElementById("Token-Balance").innerHTML = mintedTotal;
        
        document.getElementById("Token-Balance-Eligible").innerHTML = 5 - mintedTotal;
        
        if(!isPub){
            document.getElementById("Amount-To-Mint").style.display="none";
            document.getElementById("Mint-Btn").removeAttribute("onclick");
            document.getElementById("Mint-Btn").innerHTML= "NOT LIVE";
        }
      
        
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
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider.getSigner());

        var minted2 = await CONTRACT_ADDRESS.numMintedPerPersonPublic(providerConnect.accounts[0]);
        
        var isPub = await CONTRACT_ADDRESS.isPublicActive();
        
        var mintedTotal2 = Number(BigInt(minted2));
        
        document.getElementById("Token-Balance").innerHTML = mintedTotal2;
        
        document.getElementById("Token-Balance-Eligible").innerHTML = 5 - mintedTotal2;
        
                
        if(!isPub){
            document.getElementById("Amount-To-Mint").style.display="none";
            document.getElementById("Mint-Btn").removeAttribute("onclick");
            document.getElementById("Mint-Btn").innerHTML= "NOT LIVE"
        }


    }
}

async function mintAllowlist() {
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

async function mintPublic() {
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
  

  static async mintPublic() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            let userAddress = await signer.getAddress();
            const web3 = new Web3(provider2);
            const chainIdon2 = await web3.eth.getChainId();

        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);
        
        var soldOut = 2000;

        var minted = await CONTRACT_ADDRESS.numMintedPerPersonPublic(userAddress);
        var supply = await CONTRACT_ADDRESS.totalSupply();

        const eth = await provider.getBalance(userAddress);

        let ethbalance = parseInt(eth)/1000000000000000000;
        
        var amountToMint = document.getElementById("Amount-To-Mint").value;
        
        var mintedTotal = Number(Number(BigInt(minted)) + Number(BigInt(amountToMint)));
        
        if(chainIdon2 != chain){
            document.getElementById('Mint-Btn').innerHTML = "WRONG NETWORK";
        }
        else{
        if(supply >= soldOut){
           document.getElementById('Mint-Btn').innerHTML = "SOLD OUT";
        }
        else{

            
                 if(ethbalance<(nftPriceEth*amountToMint)){
        document.getElementById("Mint-Btn").innerHTML = "INVALID FUNDS";
        }
        else{
            
                        
            if(mintedTotal > maxMint){
                document.getElementById("Mint-Btn").innerHTML = "MAX " + maxMint;
                await delay(3);
                document.getElementById("Mint-Btn").innerHTML = "MINT";
            }
            else{

                    let overrides = {
                        value: String(amountToMint * nftPrice)
                    };

                        mintPublic(amountToMint,overrides);
                        const hash = new ethers.Contract(contract.address, contract.abi, signer);
                        const tx = await hash.mintPublic(amountToMint,overrides);
                        document.getElementById("Mint-Btn").removeAttribute("onclick");
                        document.getElementById("Amount-To-Mint").style.display="none";
                        document.getElementById("Mint-Btn").style.width = "315px"
                        document.getElementById("Mint-Btn").innerHTML = "MINTING..."
                        const receipt = await tx.wait();
                        document.getElementById("Mint-Btn").innerHTML = "SUCCESS!"
                        document.getElementById("View").style.display="inline";
                        document.getElementById("Again").style.display="inline";
                        getInfo(1);
                        await delay(3);
                        document.getElementById("Mint-Btn").innerHTML = "WELCOME TO PLAYERZERO!"
                      }
            }
                        
            
        }

                        
        
        }
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
            const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider.getSigner());
            
            
              var soldOut = 2000;

        var minted = await CONTRACT_ADDRESS.numMintedPerPersonPublic(providerConnect.accounts[0]);
        var supply = await CONTRACT_ADDRESS.totalSupply();

        const eth = await provider.getBalance(providerConnect.accounts[0]);

        let ethbalance = parseInt(eth)/1000000000000000000;
        
        var amountToMint = document.getElementById("Amount-To-Mint").value;
        
        var mintedTotal = Number(Number(BigInt(minted)) + Number(BigInt(amountToMint)));


        if(supply >= soldOut){
          document.getElementById('Mint-Btn').innerHTML = "SOLD OUT";
        }
        else{
            
                 if(ethbalance<(nftPriceEth*amountToMint)){
        document.getElementById("Mint-Btn").innerHTML = "INVALID FUNDS";
        }
        else{
            
            if(mintedTotal > maxMint){
                document.getElementById("Mint-Btn").innerHTML = "MAX " + maxMint;
                                await delay(3);
                document.getElementById("Mint-Btn").innerHTML = "MINT";
            }
            else{

                    let overrides = {
                        value: String(amountToMint * nftPrice)
                    };
            
                        mintPublic(amountToMint,overrides);
                        const hash = new ethers.Contract(contract.address, contract.abi, provider.getSigner());
                        const tx = await hash.mintPublic(amountToMint,overrides);
                        document.getElementById("Mint-Btn").removeAttribute("onclick");
                        document.getElementById("Amount-To-Mint").style.display="none";
                        document.getElementById("Mint-Btn").style.width = "315px"
                        document.getElementById("Mint-Btn").innerHTML = "MINTING..."
                        const receipt = await tx.wait();
                        document.getElementById("Mint-Btn").innerHTML = "SUCCESS!"
                        document.getElementById("View").style.display="inline";
                        document.getElementById("Again").style.display="inline";
                        getInfo(1);
                        await delay(3);
                        document.getElementById("Mint-Btn").innerHTML = "WELCOME TO PLAYERZERO!"

                }
                        
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
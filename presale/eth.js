const contract = {
    address: "0x923E100F9aaB212c5e4A328c263809031C92Df04",
    abi: [
        "function mintPresale(uint256 _tokenAmount) external payable nonReentrant",
        "function totalSupply() external view returns (uint256)",
        "function balanceOf(address) external view returns (uint256)",
        "function isAllowedToMint(address) public view returns (bool)",
        "function numMintedPerPerson(address) public view returns (uint256)",
        ]
};

var chain = 1;
var maxMint = 3;
var nftPrice = 5000000000000000000;
var nftPriceEth= 5;
var minMint = 1;

    async function goToMint(){
            
            var amountToMint = document.getElementById("Amount-To-Mint").value;
            
            var eth = amountToMint * nftPriceEth;
            
            if(amountToMint === undefined || amountToMint < minMint){
                document.getElementById("Next-Btn").innerHTML = "Invalid";
                await delay(3);
                document.getElementById("Next-Btn").innerHTML = "Next";
            }
            else{
            if(amountToMint > maxMint){
                document.getElementById("Next-Btn").innerHTML = "Max " + maxMint;
                await delay(3);
                document.getElementById("Next-Btn").innerHTML = "Next";
            }
            else{
                                document.getElementById("Amount-To-Mint").style.display = "none";
            document.getElementById("Next-Btn").style.display = "none";
            document.getElementById("Token-Minted-Amount").style.display = "none";
            document.getElementById("Mint-Btn").innerHTML = "MINT " + amountToMint + " (" + eth + "Ξ)";
            document.getElementById("Mint-Btn").style.display = "inline";
            document.getElementById("Mint-Amount").style.display = "inline";
            }
            }
    }
    
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

async function getInfo() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);

        var bal = await CONTRACT_ADDRESS.balanceOf(userAddress);
        var supply = await CONTRACT_ADDRESS.totalSupply();
        var allowed = await CONTRACT_ADDRESS.isAllowedToMint(userAddress);
        
        document.getElementById("Token-Balance").innerHTML = bal;
        document.getElementById("Mint-Amount").innerHTML = supply + "/100";
        document.getElementById("Token-Minted").innerHTML = supply + "/100";
        
        if(allowed === true){
            document.getElementById("Check-Allowlist").innerHTML = "YES";
        }
        else{
            document.getElementById("Check-Allowlist").innerHTML = "NO";  
        }
       
        
    } catch (err) {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "944aeb0b43d54d28a7768d5df3dc7320"
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
        
        var bal2 = await CONTRACT_ADDRESS.balanceOf(providerConnect.accounts[0]);
        var supply2 = await CONTRACT_ADDRESS.totalSupply();
        var allowed2 = await CONTRACT_ADDRESS.isAllowedToMint(providerConnect.accounts[0]);
        
        document.getElementById("Token-Balance").innerHTML = bal2;
        document.getElementById("Mint-Amount").innerHTML = supply2 + "/100";
        document.getElementById("Token-Minted").innerHTML = supply2 + "/100";
        
        if(allowed2 === true){
            document.getElementById("Check-Allowlist").innerHTML = "YES";
        }
        else{
            document.getElementById("Check-Allowlist").innerHTML = "NO";  
        }

    }
}

async function mintPresale() {
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
                    infuraId: "944aeb0b43d54d28a7768d5df3dc7320"
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
                    infuraId: "944aeb0b43d54d28a7768d5df3dc7320"
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
    static async mint() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            let userAddress = await signer.getAddress();
            const web3 = new Web3(provider2);
            const chainIdon2 = await web3.eth.getChainId();

        const CONTRACT_ADDRESS = new ethers.Contract(contract.address, contract.abi, provider);
        
        var soldOut = 100;

        var minted = await CONTRACT_ADDRESS.numMintedPerPerson(userAddress);
        var supply = await CONTRACT_ADDRESS.totalSupply();
        var allowed = await CONTRACT_ADDRESS.isAllowedToMint(userAddress);
        
        const eth = await provider.getBalance(userAddress);

        let ethbalance = parseInt(eth)/1000000000000000000;
        
        var amountToMint = document.getElementById("Amount-To-Mint").value;

        
        var mintedTotal = Number(Number(BigInt(minted)) + Number(BigInt(amountToMint)));
        console.log(mintedTotal);
        
        
        if(chainIdon2 != chain){
            document.getElementById('Mint-Btn').innerHTML = "WRONG NETWORK";
        }
        else{
        if(supply >= soldOut){
           document.getElementById('Mint-Btn').innerHTML = "SOLD OUT";
        }
        else{
        if(allowed){
            
                 if(ethbalance<(nftPriceEth*amountToMint)){
        document.getElementById("Mint-Btn").innerHTML = "INVALID FUNDS";
        }
        else{
            
            if(mintedTotal > maxMint){
                document.getElementById("Mint-Btn").innerHTML = "MAX " + maxMint;
            }
            else{
            
                  let overrides = {
                value: String(amountToMint * nftPrice)
              };
            
              mintPresale(amountToMint, overrides);
                        const hash = new ethers.Contract(contract.address, contract.abi, signer);
                        const tx = await hash.mintPresale(amountToMint, overrides);
                        document.getElementById("Mint-Btn").removeAttribute("onclick");
                        document.getElementById("Mint-Btn").innerHTML = "MINTING..."
                        const receipt = await tx.wait();
                        document.getElementById("Mint-Btn").innerHTML = "SUCCESS!"
                        document.getElementById("Welcome").style.display="inline";
                        document.getElementById("View").style.display="inline";
                        getInfo();
                        await delay(5);
                        document.getElementById("Amount-To-Mint").value = "";
                        document.getElementById("Mint-Btn").setAttribute("onclick","mintagain()");
                        document.getElementById("Mint-Btn").innerHTML = "MINT AGAIN"
                }
                        
            }
        }
        else{
            document.getElementById('Mint-Btn').innerHTML = "ACCESS DENIED";
        }
                        
        
        }
        }
            
        } catch (err) {
            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        infuraId: "944aeb0b43d54d28a7768d5df3dc7320"
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
            
            
              var soldOut = 100;

        var minted = await CONTRACT_ADDRESS.numMintedPerPerson(providerConnect.accounts[0]);
        var supply = await CONTRACT_ADDRESS.totalSupply();
        var allowed = await CONTRACT_ADDRESS.isAllowedToMint(providerConnect.accounts[0]);
        
        const eth = await provider.getBalance(providerConnect.accounts[0]);

        let ethbalance = parseInt(eth)/1000000000000000000;
        
        var amountToMint = document.getElementById("Amount-To-Mint").value;
        
        var mintedTotal = Number(Number(BigInt(minted)) + Number(BigInt(amountToMint)));
        console.log(mintedTotal);
        

        if(supply >= soldOut){
           document.getElementById('Mint-Btn').innerHTML = "SOLD OUT";
        }
        else{
        if(allowed){
            
                 if(ethbalance<(nftPriceEth*amountToMint)){
        document.getElementById("Mint-Btn").innerHTML = "INVALID FUNDS";
        }
        else{
            
            if(mintedTotal > maxMint){
                document.getElementById("Mint-Btn").innerHTML = "MAX " + maxMint;
            }
            else{
            
                  let overrides = {
                value: String(amountToMint * nftPrice)
              };
            
              mintPresale(amountToMint, overrides);
                        const hash = new ethers.Contract(contract.address, contract.abi, provider.getSigner());
                        const tx = await hash.mintPresale(amountToMint, overrides);
                        document.getElementById("Mint-Btn").removeAttribute("onclick");
                        document.getElementById("Mint-Btn").innerHTML = "MINTING..."
                        const receipt = await tx.wait();
                        document.getElementById("Mint-Btn").innerHTML = "SUCCESS!"
                        document.getElementById("Welcome").style.display="inline";
                        document.getElementById("View").style.display="inline";
                        getInfo();
                        await delay(5);
                        document.getElementById("Amount-To-Mint").value = "";
                        document.getElementById("Mint-Btn").setAttribute("onclick","mintagain()");
                        document.getElementById("Mint-Btn").innerHTML = "MINT AGAIN"
                }
                        
            }
        }
        else{
            document.getElementById('Mint-Btn').innerHTML = "ACCESS DENIED";
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
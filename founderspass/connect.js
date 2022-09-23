
 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

var isConnected = false;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider2;


// Address of the selected account
let selectedAccount;

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*500);
    });
}

/**
 * Setup the orchestra
 */
function init() {
  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);


  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "54297732d5e249febec6978df023ee45",
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    theme: "dark",
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider2);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];
  
  if(chainId != 1){
     document.getElementById("Connect").innerHTML = "Wrong Network"; 
  }
  else{

    document.getElementById("Connected-Address").style.display = "inline";
  document.querySelector("#Connected-Address").innerHTML = "Connected | " + selectedAccount.substring(0,4) + "..." + selectedAccount.substring(selectedAccount.length - 4);
            isConnected = true;
            
            document.getElementById("Refresh-Btn").innerHTML = "Retrieving.."
            document.getElementById("pass-show").style.opacity = "0";
            await getInfo(0);
            document.getElementById("Pass-Name").style.display = "inline";
            document.getElementById("Connect").style.display = "none";
            document.getElementById("Bid").style.display = "inline";
            document.getElementById("Time").style.display = "inline";
            document.getElementById("Bidder").style.display = "inline";
            document.getElementById("Refresh-Btn").style.display = "inline";
            document.getElementById("Amount-To-Bid").style.display = "inline";
            document.getElementById("Bid-Btn").style.display = "inline";
            getStats(1);
            await delay(3);
            document.getElementById("Refresh-Btn").innerHTML = "Refresh Bids"
            document.getElementById("pass-show").style.opacity = "1";
            
  }
        
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  await fetchAccountData(provider2);
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {
  init();
  console.log("Opening a dialog", web3Modal);
  try {
    provider2 = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider2.on("accountsChanged", (accounts) => {
           window.location.reload(); 
    fetchAccountData();
    location.reload()
  });

  // Subscribe to chainId change
  provider2.on("chainChanged", (chainId) => {
     
          window.location.reload(); 
    fetchAccountData();
    location.reload()
  });

  // Subscribe to networkId change
  provider2.on("networkChanged", (networkId) => {
           window.location.reload(); 
    fetchAccountData();
    location.reload()
  });

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider2);

  // TODO: Which providers have close method?
  if(provider2.close) {
    await provider2.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider2 = null;
    selectedAccount = null;
  }
  
  selectedAccount = null;

}


window.addEventListener('load', async () => {
  document.querySelector("#Connect").addEventListener("click", onConnect);
});
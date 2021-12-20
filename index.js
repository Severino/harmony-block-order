
const { ethers } = require("ethers")

async function main() {

    const HARMONY_MAINNET = 1666600000
    const HARMONY_TESTNET = 1666700000

    const RPC = {}
    RPC[HARMONY_MAINNET] = "https://harmony-0-rpc.gateway.pokt.network"
    RPC[HARMONY_TESTNET] = "https://api.s0.b.hmny.io"

    const NETWORK = HARMONY_MAINNET

    const provider = new ethers.providers.JsonRpcProvider(
        RPC[NETWORK], {
        name: "Harmony",
        chainId: NETWORK,
    })

    const response = await provider.send("hmyv2_getBlockByHash", ["0xb2bb50c1e3c41c6f40bcdb0d3d99fce957350deb55be933cda95f77d6b3100d8", {
        "fullTx": true,
        "inclTx": true,
        "InclStaking": true
    }])


    let txs = response.transactions

    for (let i in txs) {
        try {
            const receipt = await provider.send("hmyv2_getTransactionReceipt", [txs[i].hash])
            console.log(`${txs[i].gasPrice}        | ${txs[i].gas}`)
        } catch (e) {
            console.error("Could not get receipt: " + e)
        }
    }
}

main()
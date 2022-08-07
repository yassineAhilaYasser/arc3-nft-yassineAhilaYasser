const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");

async function run(runtimeEnv, deployer) {
    //write your code here

    const master = deployer.accountsByName.get("master");
    const receiver = deployer.accountsByName.get("buyer");

    await executeTransaction(deployer, {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.SecretKey,
        fromAccount: master, 
        toAccountAddr: receiver.addr,
        amountMicroAlgos: 300000,  
        payFlags: { totalFee: 1000 },
    });

    await executeTransaction(deployer, {
        type: types.TransactionType.OptInASA,
        sign: types.SignType.SecretKey,
        fromAccount: receiver,
        assetID: deployer.asa.get('acsCoinASA').assetIndex,
        payFlags: { totalFee: 1000 }
    })
    
    await executeTransaction(deployer, {
        type: types.TransactionType.TransferAsset,
        // eslint-disable-next-line no-undef
        sign: types.SignType.SecretKey,
        fromAccount: master,
        toAccountAddr: receiver.addr,
        amount: 100,
        assetID: deployer.asa.get('acsCoinASA').assetIndex,
        payFlags: { totalFee: 1000 }
    })

}

module.exports = { default: run };

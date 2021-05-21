const fs = require('fs');
const IPFS = require('ipfs');

// Sube el archivo del PATH local a IPFS
module.exports = async function uploadIPFS(PATH) {
    try {
        var node = await IPFS.create();
        for await (const file of await node.add({
            path: PATH,
            content: fs.readFileSync(PATH)
        })) {

            return file.cid.toString();
        }
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}

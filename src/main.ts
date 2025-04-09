import * as age from "age-encryption";

async function init() {
    await age.webauthn.createCredential({ keyName: "age encryption key 🦈" })
    
    const e = new age.Encrypter()
    e.addRecipient(new age.webauthn.WebAuthnRecipient())
    const ciphertext = await e.encrypt("Hello, age!")
    const armored = age.armor.encode(ciphertext)
    console.log(armored)
    
    const d = new age.Decrypter()
    d.addIdentity(new age.webauthn.WebAuthnIdentity())
    const decoded = age.armor.decode(armored)
    const out = await d.decrypt(decoded, "text")
    console.log(out)
}

init()

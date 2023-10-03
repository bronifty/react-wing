const { Ulid } = await import("https://esm.sh/id128@1.6.6");

let keyObj = Ulid.generate();
let key = keyObj.toRaw();

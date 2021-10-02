const Hastebin = require("../index.js");
const hastebin = new Hastebin();

// Create/write a new haste and read it
test("Create haste and read it", () => {
    return hastebin.write("Lorem ipsum dolor sit amet.").then((key) => {
        hastebin.read(key).then((data) => {
            expect(data).toBe("Lorem ipsum dolor sit amet.");
        });
    });
});

// Read existing haste (uses a non-expiring haste to avoid the test failing due to the haste being deleted)
test("Read existing haste", () => {
    return hastebin.read("about").then((data) => {
        expect(data).toContain("Sharing code is a good thing, and it should be _really_ easy to do it.");
    });
});

// Create/write a new haste and read it on different server (md_5 paste)
test("Create haste and read it on a different server", () => {
    const md5paste = new Hastebin({
        "server": "https://paste.md-5.net"
    });

    return md5paste.write("Lorem ipsum dolor sit amet.").then((key) => {
        md5paste.read(key).then((data) => {
            expect(data).toBe("Lorem ipsum dolor sit amet.");
        });
    });
});
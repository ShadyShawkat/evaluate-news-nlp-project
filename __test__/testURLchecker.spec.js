import { urlChecker } from "../src/client/js/URLchecker"


describe("Testing Url Checker", () => {
    test("Should return false", () => {
        expect(urlChecker('google.asdbskhd')).toEqual(false);
    })
});
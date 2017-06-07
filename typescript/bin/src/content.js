"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
function getLookupData() {
    var images = [];
    var urls = [];
    var gifs = [];
    $("a.title").each(function (index, obj) {
        var href = $(obj).attr("href");
        // @todo this is a shitty hack until we have better detection
        if (/^https?:/.test(href)) {
            if (/\.(png|jpeg|jpg)$/.test(href)) {
                images.push(href);
            }
            else if (/\.(gif|gifv)$/.test(href)) {
                gifs.push(href);
            }
            else {
                urls.push(href);
            }
        }
    });
    return {
        images: images,
        urls: urls,
        gifs: gifs
    };
}
// check if any has been submitted to reddit before (reguardless if image or not)
// check image with reverse image lookup service (google or tineye?)
// no idea on gifs / videos
// potentially - record all urls on reddit, potentially record file hashes to start own reverse image service
console.log(getLookupData());
//# sourceMappingURL=content.js.map
fetch("https://api.waqi.info/feed/bangalore/?token=fe97b410940d30e3b873d6f3a802bc48f31d2f50", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "sec-gpc": "1",
        "Referer": "https://air-quality-index-meter.web.app/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
}).then(res => res.json())
    .then(res => console.log(res))
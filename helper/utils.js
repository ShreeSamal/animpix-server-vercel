import axios from 'axios';
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { headers: { "User-Agent": USER_AGENT } };

export const decodeString = (string) => {
    return Buffer.from(string, 'base64').toString();
}

export const encodeString = (string) => {
    return Buffer.from(string).toString('base64');
};

export const decodeStreamingLinkAnimix = async (animixLiveApiLink) => {
    let plyrLink;

    const animixLiveApiRegex = new RegExp(/(aHR0[^#]+)/)
    if (animixLiveApiLink.includes("player.html")) {
        plyrLink = animixLiveApiLink
    } else {
        const res = await axios.get(animixLiveApiLink, headerOption);

        plyrLink = await res.request.res.responseUrl;
    }

    const sourceLink = decodeString(animixLiveApiRegex.exec(plyrLink)[0]);

    return sourceLink;
};

export const firstLetterToUpperCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
};
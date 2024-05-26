export function extract(videoInfo, useInfo) {
    var startIndex = videoInfo.indexOf(`"${useInfo}":"`) + `"${useInfo}":"`.length;
    var endIndex = videoInfo.indexOf('"', startIndex);
    var description = videoInfo.substring(startIndex, endIndex);
    return description;
}
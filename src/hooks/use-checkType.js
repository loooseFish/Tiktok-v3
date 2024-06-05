// 文件类型检测
var type;
var flag;
// 创建 FileReader 对象
var reader = new FileReader();

export function checkType(file, callback) {

    return new Promise((resolve) => {
        // 读取文件
        reader.readAsArrayBuffer(file);

        // 文件读取完成时触发
        reader.onloadend = function () {
            // 获取文件的类型
            type = getFileType(new Uint8Array(reader.result));

            // 判断文件类型
            if (type !== "mp4") {
                flag = false;
            } else {
                flag = true;
            }

            resolve(flag);
            
        };
        
    });

}

// 根据文件头判断文件类型
function getFileType(bytes) {
    if (
        bytes[0] === 0x00 &&
        bytes[1] === 0x00 &&
        bytes[2] === 0x00 &&
        bytes[3] === 0x20 &&
        bytes[4] === 0x66
    ) {
        return "mp4";
    } else {
        return "unknown";
    }
}
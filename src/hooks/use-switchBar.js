export function switchBar(arr, index, newName, oldName, fn) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].className = oldName;
    }
    arr[index].className = newName;
    fn && fn()
}
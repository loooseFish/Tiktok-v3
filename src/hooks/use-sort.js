export function uploadOrder(arr) {
    return arr.sort((a, b) => {
        return a.createdAt - b.createdAt;
    })
}
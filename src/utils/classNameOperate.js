/*
 * @Descripttion: 
 * @version: 
 * @Author: ahao
 * @Date: 2022-03-11 17:38:37
 * @LastEditors: ahao
 * @LastEditTime: 2022-04-12 10:17:05
 */
export function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
//    /**
//     * 为元素添加class
//     * @private
//     */
export function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
}
//    /**
//     * 删除元素中的class
//     * @private
//     */
export function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}

// 处理错误的函数
let handleError = function(err) {
    console.log("Error: ", err);
};
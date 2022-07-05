/*
 * @Descripttion: 
 * @version: 
 * @Author: ahao
 * @Date: 2022-04-16 12:00:41
 * @LastEditors: ahao
 * @LastEditTime: 2022-04-17 11:41:51
 */
// import defaultSettings from '@/settings'
import i18n from '@/common/index'
const title = i18n.t('lang.publive')
export default function getPageTitle(key) {

    const hasKey = title + i18n.tc(`router.${key}`)
    if (hasKey) {
        const pageName = i18n.tc(`router.${key}`)
        return `${pageName} - ${title}`
    }
    return `${title}`
}
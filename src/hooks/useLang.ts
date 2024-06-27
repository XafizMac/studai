"use client"

import { useUnit } from "effector-react"
import { $lang } from "@/context/lang"
import translationJson from "../../public/translations/translation.json"

export const useLang = () => {
    const lang = useUnit($lang)
    const translations = translationJson

    return { lang, translations }
}
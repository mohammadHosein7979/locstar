import localFont from "next/font/local";

const iranSans = localFont({
    src: [
        {
            path: '../../public/fonts/iran-sans/IRANSansWeb(FaNum)_UltraLight.woff',
            weight: '300'
        },
        {
            path: '../../public/fonts/iran-sans/IRANSansWeb(FaNum)_Light.woff',
            weight: '400'
        },
        {
            path: '../../public/fonts/iran-sans/IRANSansWeb(FaNum).woff',
            weight: '500'
        },
        {
            path: '../../public/fonts/iran-sans/IRANSansWeb(FaNum)_Medium.woff',
            weight: '600'
        },
        {
            path: '../../public/fonts/iran-sans/IRANSansWeb(FaNum)_Bold.woff',
            weight: '700'
        }
    ],
    variable: "--font-iransans"
    
});

export const fonts = {
    iranSans
}
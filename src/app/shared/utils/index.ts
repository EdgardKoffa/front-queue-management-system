export const lang=document.documentElement.lang;
export const isLangFr=lang==="fr";

export const isDarkMode= document.documentElement.classList.contains('my-app-dark');

export const setTheme=()=>{
    localStorage.setItem("theme","dark")
}

export const getTheme=localStorage.getItem("dark")
(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function f(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=f(t);fetch(t.href,r)}})();const p=`${new URL(location.href).origin}/?tab=`,u=document.querySelector("#tabs-container"),o=u.querySelectorAll(".p-tab"),i=u.querySelectorAll(".p-panel"),d=["research","graph","playground"];if(o.length!==i.length||o.length!==d.length)throw new Error("Number of tabs doesn't match number of panels.");for(let e=0;e<o.length;e++)o[e].addEventListener("click",()=>{c(e),history.pushState({tab:e},null,p+d[e])});const a=e=>{o[e].classList.add("p-is-active"),i[e].classList.add("p-is-active")},h=e=>{o[e].classList.remove("p-is-active"),i[e].classList.remove("p-is-active")};function c(e){for(let s=0;s<o.length;s++)h(s);a(e)}const b=new URL(location.href).searchParams.get("tab");switch(b){case"graph":a(1);break;case"playground":a(2);break;case"research":default:a(0);break}window.addEventListener("popstate",e=>{e.state?c(e.state.tab):c(0)});
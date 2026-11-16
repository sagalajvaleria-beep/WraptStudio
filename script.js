
const translations = {
  en: {
    navHome:"Home",navAbout:"About us",navServices:"Services",navProducts:"Products",navMaterials:"Materials",navPortfolio:"Portfolio",navProcess:"Process",navContact:"Contact",
    quote:"Request a quote", footerTag:"Packaging ideas, thoughtfully made.", footerExplore:"EXPLORE",footerInfo:"INFORMATION",footerContact:"CONTACT",
    rights:"All rights reserved.",author:"Website designed and developed by Valeriia Sagalay",
    formDemo:"This is a demo form. Your details are not sent or stored. Please contact us directly to discuss a project.",
    sent:"Demo submission completed. No data was sent."
  }
};
let currentLang = localStorage.getItem("wraptLang") || "ua";
function setLanguage(lang){
  currentLang=lang;localStorage.setItem("wraptLang",lang);
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-ua][data-en]").forEach(el=>{el.textContent=lang==="en"?el.dataset.en:el.dataset.ua});
  document.querySelectorAll("[data-placeholder-ua]").forEach(el=>{el.placeholder=lang==="en"?(el.dataset.placeholderEn||""):el.dataset.placeholderUa});
  document.querySelectorAll("[data-lang-toggle]").forEach(el=>el.textContent=lang==="en"?"UA":"EN");
  document.querySelectorAll("[data-lang-label]").forEach(el=>el.textContent=lang==="en"?"EN":"UA");
  document.querySelectorAll("[data-lang-title]").forEach(el=>el.textContent=lang==="en"?"Switch to Ukrainian":"Switch to English");
}
document.addEventListener("DOMContentLoaded",()=>{
  setLanguage(currentLang);
  document.querySelectorAll("[data-lang-toggle]").forEach(btn=>btn.addEventListener("click",()=>setLanguage(currentLang==="ua"?"en":"ua")));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
  document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    const f=btn.dataset.filter;
    document.querySelectorAll(".project").forEach(card=>card.style.display=(f==="all"||card.dataset.category===f)?"":"none");
  }));
  const form=document.querySelector("#quote-form");
  if(form)form.addEventListener("submit",e=>{e.preventDefault();const n=document.querySelector("#form-notice");n.textContent=currentLang==="en"?translations.en.sent:"Демо-заявку сформовано. Дані нікуди не надсилалися.";n.classList.add("show");form.reset()});
  const selector=document.querySelector("#material-selector");
  if(selector)selector.addEventListener("change",updateSelector);
  const product=document.querySelector("#product-selector");
  if(product)product.addEventListener("change",updateSelector);
  updateSelector();
});
function updateSelector(){
 const m=document.querySelector("#material-selector"),p=document.querySelector("#product-selector"),out=document.querySelector("#selector-result");
 if(!m||!p||!out)return;
 const ua=`Для категорії «${p.options[p.selectedIndex].text}» матеріал «${m.options[m.selectedIndex].text}» може стати відправною точкою для індивідуального рішення. Остаточний вибір залежить від характеристик товару, конструкції, бюджету та задуму бренду.`;
 const en=`For ${p.options[p.selectedIndex].text.toLowerCase()}, ${m.options[m.selectedIndex].text.toLowerCase()} can be a starting point for a custom solution. The final choice depends on the product, construction, budget and brand concept.`;
 out.textContent=currentLang==="en"?en:ua;
}

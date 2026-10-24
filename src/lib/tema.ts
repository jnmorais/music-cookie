// Roda no <head>, antes da primeira pintura: aplica o tema salvo ou o do sistema.
export const scriptTema = `(function(){try{var t=localStorage.getItem("tema");if(t!=="claro"&&t!=="escuro")t=matchMedia("(prefers-color-scheme: dark)").matches?"escuro":"claro";document.documentElement.dataset.tema=t}catch(e){}})()`;

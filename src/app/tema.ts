// La preferencia de localStorage tiene prioridad sobre la cookie.
export function leerCookie(nombre: string) {
  let cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    let partes = cookie.split('=');
    if (partes[0] === nombre) {
      return decodeURIComponent(partes.slice(1).join('='));
    }
  }
  return '';
}

export function guardarCookie(nombre: string, valor: string) {
  document.cookie = nombre + '=' + encodeURIComponent(valor) + '; max-age=86400; path=/; SameSite=Lax';
}

export function borrarCookie(nombre: string) {
  document.cookie = nombre + '=; max-age=0; path=/; SameSite=Lax';
}

export function aplicarTema() {
  let tema = localStorage.getItem('tema') || leerCookie('tema');
  document.body.classList.toggle('oscuro', tema === 'oscuro');
}

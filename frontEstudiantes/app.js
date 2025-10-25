document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');

  if (loginBtn && loginModal && closeModal) {
    loginBtn.onclick = function() { loginModal.style.display = 'block'; };
    closeModal.onclick = function() { loginModal.style.display = 'none'; };
    window.onclick = function(event) {
      if (event.target === loginModal) loginModal.style.display = 'none';
    };
  }
});

const form = document.getElementById("formLogin");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = document.getElementById("login").value;
    const contrasena = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cuenta: login, contrasena })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Acceso permitido",
          text: `Bienvenido ${data.usuario.cuenta}`,
          showConfirmButton: false,
          timer: 1800
        });

        const userNameSpan = document.getElementById("userName");
        if (userNameSpan) userNameSpan.textContent = data.usuario.cuenta;

        const loginModal = document.getElementById("loginModal");
        if (loginModal) loginModal.style.display = "none";
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data?.error ?? `Error ${res.status}: ${res.statusText}`
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "warning",
        title: "Sin conexión",
        text: "No se pudo conectar con el servidor"
      });
    }
  });
}

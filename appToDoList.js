window.addEventListener("load", cargarTareas);

      function cargarTareas() {
        const tareasGuardadas =
          JSON.parse(localStorage.getItem("tareas")) || [];
        const lista = document.getElementById("tareas");

        if (tareasGuardadas.length > 0) {
          lista.innerHTML = "";
          tareasGuardadas.forEach((tareaHTML) => {
            const li = document.createElement("li");
            li.innerHTML = tareaHTML;

            // Asignar evento al botón eliminar si existe
            const btn = li.querySelector(".btnEliminar");
            if (btn) {
              btn.onclick = () => {
                li.remove();
                guardarTareas();
                if (lista.children.length === 0) {
                  lista.innerHTML = "<li>Sin tareas</li>";
                }
              };
            }

            // Asignar evento al botón completar si existe
            const btn2 = li.querySelector(".btnCompletar");
            if (btn2) {
              btn2.onclick = () => {
                mostrarToast("<ion-icon name='happy'></ion-icon> Tarea completada");
                li.remove();
                guardarTareas();
                if (lista.children.length === 0) {
                  lista.innerHTML = "<li>Sin tareas</li>";
                }
              };
            }
            // Toast estético
            function mostrarToast(mensaje) {
              const toast = document.getElementById("toast-container");
              toast.innerHTML = mensaje;
              toast.classList.add("show");
              setTimeout(() => {
                toast.classList.remove("show");
                toast.innerHTML = "";
              }, 2000);
            }

            /* const btn3 = li.querySelector(".btnCompletar");
            if(btn3){
              btn3.onclick = () =>{
                alert("tarea completada");
              }
            }
            */

            lista.appendChild(li);
          });
        }
      }

      function AgregarTarea() {
        let tarea = document.getElementById("crear").value.trim();
        let fecha = document.getElementById("fecha").value;

        if (tarea === "") return;

        let diasTexto = "";
        let claseColor = "";

        if (fecha) {
          const hoy = new Date();
          hoy.setHours(0,0,0,0);
          const objetivo = new Date(fecha);
          objetivo.setHours(0,0,0,0);
          const unDia = 1000 * 60 * 60 * 24;
          const diferencia = objetivo - hoy;
          const dias = Math.ceil(diferencia / unDia);

          console.log("Hoy:", hoy, "Objetivo:", objetivo, "Días:", dias);

          if (dias > 0 && dias >= 4) {
            diasTexto = ` (Faltan ${dias} día${dias !== 1 ? "s" : ""})`;
            claseColor = "dias-faltantes";
          } else if (dias > 0 && dias < 4) {
            diasTexto = ` (Faltan ${dias} día${dias !== 1 ? "s" : ""})`;
            claseColor = "dias-restantes";
          } else if (dias === 0) {
            diasTexto = " (¡Es hoy!)";
          } else {
            alert("Fecha incorrecta");
            document.getElementById("diasRestantes").innerHTML =
              "Fecha incorrecta";
            return;
          }
        }

        let lista = document.getElementById("tareas");

        if (lista.textContent.includes("Sin tareas")) {
          lista.innerHTML = "";
        }

        let li = document.createElement("li");
        li.innerHTML = `
      <span style="color:black;font-size:0.6em;">${tarea}</span>
      <span style="color:black;font-size:0.5em;">${
        fecha ? " | " + fecha : ""
      }</span>
      <span class="${claseColor}" style="font-size:0.5em;">${diasTexto}</span>
      <button class="btnEliminar"><ion-icon name="close-circle"></ion-icon></button>
      <button class="btnCompletar"><ion-icon name="checkmark-circle-outline"></ion-icon></button>
    `;
        function mostrarToast(mensaje) {
          const toast = document.getElementById("toast-container");
          toast.innerHTML = mensaje;
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
            toast.innerHTML = "";
          }, 2000);
        }

        const btn = li.querySelector(".btnEliminar");
        btn.onclick = () => {
          li.remove();
          guardarTareas();
          if (lista.children.length === 0) {
            lista.innerHTML = "<li>Sin tareas</li>";
          }
        };
        lista.appendChild(li);
        guardarTareas();
        const btn2 = li.querySelector(".btnCompletar");
        btn2.onclick = () => {
          mostrarToast("<ion-icon name='happy'></ion-icon> Tarea completada");
          li.remove();
          guardarTareas();
          if (lista.children.length === 0) {
            lista.innerHTML = "<li>Sin tareas</li>";
          }
        };
        lista.appendChild(li);
        guardarTareas();

        document.getElementById("crear").value = "";
        document.getElementById("fecha").value = "";
        document.getElementById("diasRestantes").textContent = "";
      }

      function EliminarTarea() {
        let lista = document.getElementById("tareas");
        lista.innerHTML = "<li>Sin tareas</li>";
        localStorage.removeItem("tareas");
      }

      function guardarTareas() {
        const lista = document.getElementById("tareas");
        const elementos = Array.from(lista.children);
        const tareasHTML = elementos.map((li) => li.innerHTML);
        localStorage.setItem("tareas", JSON.stringify(tareasHTML));
      }

      // Efecto visual en inputs
      document.getElementById("crear").addEventListener("focus", (e) => {
        e.target.style.background = "rgba(40, 167, 69, 0.1)";
      });
      document.getElementById("crear").addEventListener("blur", (e) => {
        e.target.style.background = "rgba(255, 255, 255, 0.5)";
      });
      document.getElementById("fecha").addEventListener("focus", (e) => {
        e.target.style.background = "rgba(40, 167, 69, 0.1)";
      });
      document.getElementById("fecha").addEventListener("blur", (e) => {
        e.target.style.background = "rgba(255, 255, 255, 0.5)";
      });
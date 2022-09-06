import Swal from 'sweetalert2';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => { //eslint-disable-line
  const reserveList = document.querySelector('.reserve-list'); //eslint-disable-line
  if (reserveList) {
    reserveList.addEventListener('click', listAccions);
  }
});

//Sweetalert
const listAccions = async (e) => {
  if (e.target.dataset.reserve) {
    e.preventDefault();
    //obteniendo el li html
    const rowReserve = e.target.parentElement.parentElement;
    //Eliminar por axios
    const result = await Swal.fire({
      title: '¿Confirmar Eliminación?',
      text: '¡Una vez eliminada, no se puede recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, Eliminar!',
      cancelButtonText: 'No, Cancelar',
    });
    if (result.isConfirmed) {
      //Enviar la peticion axios
      const url = `${location.origin}/dashboard/reserves/delete/${e.target.dataset.reserve}`; //eslint-disable-line
      //Axios para eliminar el registro
      try {
        const response = await axios.delete(url, { params: { url } });
        if (rowReserve.parentElement.children.length === 1) {
          const tableReserve = rowReserve.parentElement;
          const tr = document.createElement('tr'); //eslint-disable-line
          const th = document.createElement('th'); //eslint-disable-line
          th.classList = 'text-center';
          th.textContent = 'No hay reservas';
          th.colSpan = 7;
          tr.appendChild(th);
          tableReserve.appendChild(tr);
        }
        if (response.status === 200) {
          rowReserve.parentElement.removeChild(rowReserve);
          Swal.fire('Eliminado!', response.data, 'success');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error.',
          text: 'No se pudo eliminar',
        });
      }
    }
  } else if (e.target.tagName === 'A') {
    window.location.href = e.target.href; //eslint-disable-line
  }
};

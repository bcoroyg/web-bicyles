import Swal from 'sweetalert2';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {//eslint-disable-line
  const bicycleList = document.querySelector('.bicycle-list'); //eslint-disable-line
  if (bicycleList) {
    bicycleList.addEventListener('click', listAccions);
  }
});

//Sweetalert
const listAccions = (e) => {
  if (e.target.dataset.bicycle) {
    e.preventDefault();
    //obteniendo el li html
    const rowBicycle = e.target.parentElement.parentElement;
    //Eliminar por axios
    Swal.fire({
      title: '¿Confirmar Eliminación?',
      text: '¡Una vez eliminada, no se puede recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, Eliminar!',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        //Enviar la peticion axios
        const url = `${location.origin}/dashboard/bicycles/delete/${e.target.dataset.bicycle}`; //eslint-disable-line
        //Axios para eliminar el registro
        try {
          const response = await axios.delete(url, { params: { url } });
          if(rowBicycle.parentElement.children.length === 1){
            const tableBicycle = rowBicycle.parentElement;
            const tr = document.createElement('tr'); //eslint-disable-line
            const th = document.createElement('th'); //eslint-disable-line
            th.classList = 'text-center';
            th.textContent = 'No hay bicicletas';
            th.colSpan = 6;
            tr.appendChild(th)
            tableBicycle.appendChild(tr);
          }
          if (response.status === 200) {
            rowBicycle.parentElement.removeChild(rowBicycle);
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
    });
  } else if (e.target.tagName === 'A') {
    window.location.href = e.target.href; //eslint-disable-line
  }
};

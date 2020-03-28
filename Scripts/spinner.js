class Spinner {
   
   showSpinner = (show, hide) => {
      hide.setAttribute('hidden', '');
      show.removeAttribute('hidden');
   }

   hideSpinner = (show, hide) => {
      hide.setAttribute('hidden', '');
      show.removeAttribute('hidden');
      // show.setAttribute('class', 'col-md-8 mx-auto text-center bg-primary mt-3 p-5-rounded');
   }
}
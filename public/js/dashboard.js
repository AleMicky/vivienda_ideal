/**
 * Sidebar toggle
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //   document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener('click', event => {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    });
  }

  // Activate tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Activate popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Activate Toasts
  const toastElList = [].slice.call(document.querySelectorAll('.toast'));
  const toastList = toastElList.map(function(toastEl) {
    return new bootstrap.Toast(toastEl, { autohide: true, delay: 5000 });
  });
  toastList.forEach(toast => toast.show());

  // Auto-hide alerts after 5 seconds
  const alertList = document.querySelectorAll('.alert');
  alertList.forEach(function(alert) {
    setTimeout(function() {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }, 5000);
  });
});

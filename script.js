$(document).ready(function() {
    // Function to show error tooltip
    function showErrorTooltip(inputField, message) {
      var errorTooltip = inputField.next('.error-tooltip');
      errorTooltip.text(message);
      errorTooltip.show();
    }
  
    // Function to hide error tooltip
    function hideErrorTooltip(inputField) {
      var errorTooltip = inputField.next('.error-tooltip');
      errorTooltip.hide();
    }
  
    // Function to show error icon
    function showErrorIcon(inputField) {
      var errorIcon = inputField.next('.error-icon');
      errorIcon.show();
    }
  
    // Function to hide error icon
    function hideErrorIcon(inputField) {
      var errorIcon = inputField.next('.error-icon');
      errorIcon.hide();
    }
  
    // Form submission event
    $('#taxForm').submit(function(event) {
      event.preventDefault();
  
      // Retrieve user inputs
      var grossIncome = $('#grossIncome').val();
      var extraIncome = $('#extraIncome').val();
      var deductions = $('#deductions').val();
      var age = $('#age').val();
  
      // Validate mandatory fields
      if (!grossIncome) {
        showErrorTooltip($('#grossIncome'), 'Please enter gross annual income');
        showErrorIcon($('#grossIncome'));
        return;
      } else {
        hideErrorTooltip($('#grossIncome'));
        hideErrorIcon($('#grossIncome'));
      }
  
      if (!age) {
        showErrorTooltip($('#age'), 'Please select age group');
        showErrorIcon($('#age'));
        return;
      } else {
        hideErrorTooltip($('#age'));
        hideErrorIcon($('#age'));
      }
  
      // Validate numeric inputs
      if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
        showErrorTooltip($('#grossIncome'), 'Please enter valid numbers');
        showErrorIcon($('#grossIncome'));
        showErrorIcon($('#extraIncome'));
        showErrorIcon($('#deductions'));
        return;
      } else {
        hideErrorTooltip($('#grossIncome'));
        hideErrorTooltip($('#extraIncome'));
        hideErrorTooltip($('#deductions'));
        hideErrorIcon($('#grossIncome'));
        hideErrorIcon($('#extraIncome'));
        hideErrorIcon($('#deductions'));
      }
  
      // Calculate taxable income
      var taxableIncome = parseFloat(grossIncome) + parseFloat(extraIncome) - parseFloat(deductions);
      var taxAmount = 0;
  
      // Apply tax rate based on age group
      if (taxableIncome > 800000) { // considering input in rupees instead of lakhs
        if (age === '<40') {
          taxAmount = 0.3 * (taxableIncome - 800000);
        } else if (age === '>=40&<60') {
          taxAmount = 0.4 * (taxableIncome - 800000);
        } else if (age === '>=60') {
          taxAmount = 0.1 * (taxableIncome - 800000);
        }
      }
  
      // Display tax calculation result in modal
      $('#modalBody').html('<p>Taxable Income: ' + taxableIncome.toFixed(2) + '</p>' +
                          '<p>Tax Amount: ' + taxAmount.toFixed(2) + '</p>');
      $('#resultModal').modal('show');
    });
  
    // Handle input field changes
    $('input[type="number"]').on('input', function() {
      hideErrorTooltip($(this));
      hideErrorIcon($(this));
    });
  });
  
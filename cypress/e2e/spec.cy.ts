describe('Drop tests', () => {
  it('Checks everything has been correctly fetched', () => {
    cy.visit('http://localhost:3000/dashboard')

    cy.contains('Collected')
    cy.contains('Pending')
    cy.contains('Total Invoices')
    cy.contains('Total Customers')
    cy.contains('Last 12 months')
  })

  it('Create a new invoice', function() {
    cy.visit('http://localhost:3000/dashboard/invoices/create');

    // Assume 'Select a customer' is a dropdown that can be typed into.
    cy.get('select[name="customerId"]').select('Amy Burns');
    cy.get('input[name="amount"]').type('100');
    cy.get('input[name="status"][value="paid"]').check();

    // Clicking the create button
    cy.get('button').contains('Create Invoice').click();

    // Verify redirection and new invoice
    cy.url().should('include', '/dashboard/invoices');
    cy.contains('$200');
    cy.contains('Amy Burns');
    cy.contains('Paid'); // Assuming the status shows up as 'Paid' in the list
  });

  it('Edit an existing invoice', function() {
    cy.visit('http://localhost:3000/dashboard/invoices');

    // Assuming you want to edit the first invoice in the list
    cy.get('table tbody tr').first().within(() => {
        cy.get('a[href*="/edit"]').click(); // Click on the edit link
    });

    // Now you should be on the edit page for the invoice
    // You'd continue by entering new values and submitting the form
    cy.get('input[name="amount"]').clear().type('200');
    cy.get('input[name="status"][value="paid"]').check();
    cy.get('button').contains('Edit Invoice').click(); // Assuming the button text

    // Verify redirection and invoice update
    cy.url().should('include', '/dashboard/invoices');
    cy.contains('$200'); // Check for the new amount
  });

  it('Search for an invoice', function() {
    cy.visit('http://localhost:3000/dashboard/invoices');
    
    // Assume there's an input field for searching invoices, represented by an input with a placeholder 'Search invoices...'
    cy.get('input[placeholder="Search invoices..."]').type('Amy Burns');

    // Submit the search by either pressing enter or triggering a search button, depending on how your app works
    // Example if there is a button to click: cy.get('button').contains('Search').click();

    // After the search, the result should return invoices for 'Amy Burns' only. Adjust this according to actual application behavior
    cy.contains('Amy Burns');
  });

  it('Cannot create invoice with invalid data', function() {
    cy.visit('http://localhost:3000/dashboard/invoices/create');
    
    // Attempt to submit the form with invalid or empty fields
    // Assuming the 'Create Invoice' button has text content that uniquely identifies it
    cy.get('button').contains('Create Invoice').click();

    // Verify that validation errors are displayed for the customer field
    cy.get('#customer-error').should('contain', 'Please select a customer.');

    // Verify that validation errors are displayed for the amount field
    cy.get('#amount-error').should('contain', 'Please enter an amount greater than $0.');

    // Verify that validation errors are displayed for the status field
    cy.get('#status-error').should('contain', 'Please select an invoice status.');

    // Additionally, you can check for a global error message if it is presented in your UI
    cy.get('#invoice-error').should('contain', 'Missing Fields. Failed to Create Invoice.');
});
})


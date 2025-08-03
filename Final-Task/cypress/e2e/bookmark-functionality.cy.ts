describe('Bookmark Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show sign in/sign up buttons for unauthenticated users', () => {
    cy.get('[data-id="signin-btn"]').should('be.visible');
    cy.get('[data-id="signup-btn"]').should('be.visible');
    cy.get('[data-id="get-started-btn"]').should('be.visible');
  });

  it('should navigate to opportunities page when clicking get started', () => {
    cy.get('[data-id="get-started-btn"]').click();
    cy.url().should('include', '/opportunities');
  });

  it('should show bookmark buttons on job cards', () => {
    cy.visit('/opportunities');
    cy.get('[data-id="bookmark-btn"]').should('exist');
  });

  it('should show alert when trying to bookmark without authentication', () => {
    cy.visit('/opportunities');
    cy.get('[data-id="bookmark-btn"]').first().click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Please sign in to bookmark opportunities');
    });
  });

  it('should allow bookmarking when authenticated', () => {
    // Mock authentication
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        data: {
          user: { name: 'Test User' },
          accessToken: 'mock-token'
        },
        status: 'authenticated'
      }
    }).as('getSession');

    // Mock bookmark API
    cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/*', {
      statusCode: 200,
      body: { success: true, message: 'Bookmarked successfully' }
    }).as('bookmarkJob');

    cy.visit('/opportunities');
    cy.wait('@getSession');
    
    cy.get('[data-id="bookmark-btn"]').first().click();
    cy.wait('@bookmarkJob');
    
    // Verify bookmark state changed
    cy.get('[data-id="bookmark-btn"]').first().should('have.attr', 'data-bookmarked', 'true');
  });

  it('should allow unbookmarking when authenticated', () => {
    // Mock authentication
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        data: {
          user: { name: 'Test User' },
          accessToken: 'mock-token'
        },
        status: 'authenticated'
      }
    }).as('getSession');

    // Mock unbookmark API
    cy.intercept('DELETE', 'https://akil-backend.onrender.com/bookmarks/*', {
      statusCode: 200,
      body: { success: true, message: 'Unbookmarked successfully' }
    }).as('unbookmarkJob');

    cy.visit('/opportunities');
    cy.wait('@getSession');
    
    // First bookmark the job
    cy.get('[data-id="bookmark-btn"]').first().click();
    
    // Then unbookmark it
    cy.get('[data-id="bookmark-btn"]').first().click();
    cy.wait('@unbookmarkJob');
    
    // Verify bookmark state changed back
    cy.get('[data-id="bookmark-btn"]').first().should('have.attr', 'data-bookmarked', 'false');
  });

  it('should show bookmarks page for authenticated users', () => {
    // Mock authentication
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        data: {
          user: { name: 'Test User' },
          accessToken: 'mock-token'
        },
        status: 'authenticated'
      }
    }).as('getSession');

    // Mock bookmarks API
    cy.intercept('GET', '/api/bookmarks', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            id: 'bookmark-1',
            title: 'Software Developer',
            location: 'Addis Ababa',
            description: 'Test description'
          }
        ]
      }
    }).as('getBookmarks');

    cy.visit('/bookmarks');
    cy.wait('@getSession');
    cy.wait('@getBookmarks');
    
    cy.get('h1').should('contain', 'My Bookmarked Opportunities');
    cy.get('p').should('contain', 'You have 1 bookmarked job');
  });

  it('should show no bookmarks message when user has no bookmarks', () => {
    // Mock authentication
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        data: {
          user: { name: 'Test User' },
          accessToken: 'mock-token'
        },
        status: 'authenticated'
      }
    }).as('getSession');

    // Mock empty bookmarks API
    cy.intercept('GET', '/api/bookmarks', {
      statusCode: 200,
      body: {
        success: true,
        data: []
      }
    }).as('getBookmarks');

    cy.visit('/bookmarks');
    cy.wait('@getSession');
    cy.wait('@getBookmarks');
    
    cy.get('p').should('contain', 'No bookmarks found');
    cy.get('a').should('contain', 'Browse Opportunities');
  });

  it('should show sign in message for unauthenticated users on bookmarks page', () => {
    cy.visit('/bookmarks');
    cy.get('p').should('contain', 'Please sign in to view bookmarks');
    cy.get('a').should('contain', 'Sign In');
  });

  it('should navigate back to home from bookmarks page', () => {
    cy.visit('/bookmarks');
    cy.get('a').contains('Back to Home').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should handle API errors gracefully', () => {
    // Mock authentication
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        data: {
          user: { name: 'Test User' },
          accessToken: 'mock-token'
        },
        status: 'authenticated'
      }
    }).as('getSession');

    // Mock failed bookmark API
    cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/*', {
      statusCode: 500,
      body: { message: 'Internal server error' }
    }).as('bookmarkJob');

    cy.visit('/opportunities');
    cy.wait('@getSession');
    
    cy.get('[data-id="bookmark-btn"]').first().click();
    cy.wait('@bookmarkJob');
    
    // Should show error alert
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Failed to update bookmark. Please try again.');
    });
  });

  it('should maintain bookmark state after page refresh', () => {
    // Mock authentication
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        data: {
          user: { name: 'Test User' },
          accessToken: 'mock-token'
        },
        status: 'authenticated'
      }
    }).as('getSession');

    // Mock successful bookmark API
    cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/*', {
      statusCode: 200,
      body: { success: true, message: 'Bookmarked successfully' }
    }).as('bookmarkJob');

    cy.visit('/opportunities');
    cy.wait('@getSession');
    
    cy.get('[data-id="bookmark-btn"]').first().click();
    cy.wait('@bookmarkJob');
    
    // Verify bookmark state
    cy.get('[data-id="bookmark-btn"]').first().should('have.attr', 'data-bookmarked', 'true');
    
    // Refresh page
    cy.reload();
    cy.wait('@getSession');
    
    // Verify bookmark state is maintained
    cy.get('[data-id="bookmark-btn"]').first().should('have.attr', 'data-bookmarked', 'true');
  });
}); 
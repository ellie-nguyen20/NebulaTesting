class ReservedInstancesPage {
    visit() {
      cy.get('.el-menu-item').contains('Reserved Instances').click({ force: true });
    }
  
    checkUI() {
      cy.contains('Reserved Instances').should('be.visible');
      cy.contains('Reserve Your AI Compute. Save More. Perform Better').should('be.visible');
      cy.contains('40% savings').should('be.visible');
      cy.contains('bare metal performance').should('be.visible');
      cy.contains('30+ global locations').should('be.visible');
      cy.contains('guaranteed availability').should('be.visible');
      cy.contains('Contact Us').should('be.visible');
    }
  
    checkInstanceListUI() {
      cy.get('tbody').should('exist');
      cy.get('tbody tr').should('have.length.at.least', 1);
    }
  
    checkStatus(status) {
      cy.get('tbody tr').contains('td', status).should('be.visible');
    }
  
    checkInstanceName(name) {
      cy.get('tbody').contains(name).should('be.visible');
    }
  
    scrollToInstance(name) {
      cy.contains('td', name).scrollIntoView();
    }
  
    getViewButtonByInstanceName(name) {
      return cy.contains('tr', name).contains('View');
    }
  
    checkInstanceDetailStatus(expectedStatus) {
      cy.contains('Instance Details').should('be.visible');
      cy.contains('Status:').next().should('have.text', expectedStatus);
    }

    checkInstanceDetailUI() {
      cy.contains('Instance Details').should('be.visible');
      cy.contains('Status:').next().should('have.text', expectedStatus);
    }
  
    checkTableColumns() {
      const columns = [
        'Name',
        'GPU',
        'Location',
        'CPU',
        'Memory',
        'Storage',
        'Price',
        'Expires',
        'Status'
      ];
      columns.forEach(col => {
        cy.contains('th', col).should('be.visible');
      });
    }

    checkInstanceDefaultFields() {
      cy.contains('Instance Details').should('be.visible');
      cy.contains('Status:').next().should('be.visible');
      cy.contains('Location:').next().should('be.visible');
      cy.contains('Expires:').should('be.visible');
      cy.contains('Total Cost:').next().should('be.visible');
      cy.contains('Instance Started:').next().should('be.visible');
      cy.contains('OS/Image:').next().should('be.visible');
      cy.contains('Public IP Address:').next().should('be.visible');
      cy.contains('GPU:').next().should('be.visible');
      cy.contains('CPU:').next().should('be.visible');
      cy.contains('Memory:').next().should('be.visible');
      cy.contains('Disk:').next().should('be.visible');
      cy.contains('Bandwidth:').next().should('be.visible');
      cy.contains('Username:').next().should('be.visible');
      cy.contains('Password:').next().should('be.visible');
     
    }

    checkInstanceDetailFields(detail) {
      cy.contains('Instance Details').should('be.visible');
      cy.contains('Status:').next().should('have.text', detail.status);
      cy.contains('Location:').next().should('have.text', detail.region);
      cy.contains('GPU:').next().should('contain', detail.gpu);
      cy.contains('CPU:').next().should('contain', detail.cpu_model);
      cy.contains('Memory:').next().should('contain', '2 TB');
      cy.contains('Disk:').next().should('contain', '14 TB');
      cy.contains('Expires:').should('be.visible');
      cy.contains('Public IP Address:').next().should('contain', detail.public_ipv4);
      cy.contains('Bandwidth:').next().should('contain', detail.bandwidth);
      cy.contains('Username:').next().should('contain', detail.username);
    }

    checkInstanceRowFields(instance) {
      cy.contains('td', instance.name).should('be.visible');
      cy.contains('td', `${instance.gpu_count} * ${instance.gpu}`).should('be.visible');
      cy.contains('td', instance.region).should('be.visible');
      cy.contains('td', `${instance.cpu_count} * ${instance.cpu_model}`).should('be.visible');
      cy.contains('td', `${instance.ram / 1024} TB`).should('be.visible');
      cy.contains('td', `${instance.disk_size / 1024} TB`).should('be.visible');
      cy.contains('td', `$${instance.price_per_hour}/hr`).should('be.visible');
      cy.contains('td', instance.status).should('be.visible');
      cy.contains('tr', instance.name).contains('View').should('be.visible');
    }
  }
  
  export default new ReservedInstancesPage();
  
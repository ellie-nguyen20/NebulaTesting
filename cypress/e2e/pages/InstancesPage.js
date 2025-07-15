const SELECTOR_ACTIVE_CHECKBOX = 'label.el-checkbox';
const SELECTOR_DEPLOY_BUTTON = 'div.refresh.refresh-active.text-center.pointer';
const SELECTOR_INSTANCE_TABLE = '.el-table__body';

class InstancesPage {
  // Navigate to the Instances page
  visit() {
    cy.get('.el-menu-item').contains('Instances').click({force:true});
  }

  // Check UI when there are no instances

  checkUI() {
    cy.contains('Start Using GPU Instances').should('be.visible');
    cy.contains('Launch your first GPU instance for ML, training, or rendering tasks.').should('be.visible');
    cy.contains('Continue').should('be.visible');
  }

  // Check the instance table is present and has at least one row
  checkInstanceTable() {
    cy.get(SELECTOR_INSTANCE_TABLE).should('exist');
    cy.get(SELECTOR_INSTANCE_TABLE + ' tr').should('have.length.greaterThan', 0);
    // Add more checks for columns, status, etc. if needed
  }

  // Click the Deploy button
  clickDeploy() {
    cy.get(SELECTOR_DEPLOY_BUTTON).click();
  }

  checkInstanceListUI() {
    cy.get('tbody').should('exist');
    cy.get('tbody tr').should('have.length.at.least', 1);
  }

  checkTableColumns() {
    const columns = [
      'Instance Name',
      'Team/Personal',
      'Location',
      'Type',
      'vCPU',
      'Memory',
      'Storage',
      'Price',
      'Status'
    ];
    columns.forEach(col => {
      cy.contains('th', col).should('be.visible');
    });
  }

  checkInstanceRowFields(instance) {
    cy.contains('td', instance.name).should('be.visible');
    cy.contains('td', 'Personal').should('be.visible');
    cy.contains('td', instance.region).should('be.visible');
    cy.contains('td', `${instance.gpu}`).should('be.visible');
    cy.contains('td', `${instance.cpu_cores}`).should('be.visible');
    cy.contains('td', `${instance.ram / 1024} TB`).should('be.visible');
    cy.contains('td', `${instance.disk_size / 1024} TB`).should('be.visible');
    cy.contains('td', `$${instance.price_per_hour}/hr`).should('be.visible');
    cy.contains('td', instance.status).should('be.visible');
    cy.contains('tr', instance.name).contains('View').should('be.exist');
  }

  getViewButtonByInstanceName(name) {
    return cy.contains('tr', name).contains('View');
  }

  checkInstanceDefaultFields() {
    cy.contains('Instance Details').should('be.visible');
    cy.contains('Virtual Machine').should('be.visible');
    cy.contains('Personal').should('be.visible');
    cy.contains('Name:').next().should('be.visible');
    cy.contains('Status:').next().should('be.visible');
    cy.contains('Location:').next().should('be.visible');
    cy.contains('Served:').next().should('be.visible');
    cy.contains('Total Cost:').next().should('be.visible');
    cy.contains('Instance Started:').next().should('be.visible');
    cy.contains('OS/Image:').next().should('be.visible');
    cy.contains('LAN IP Address:').next().should('be.visible');
    cy.contains('Public IP Address:').next().should('be.visible');
    cy.contains('GPU:').next().should('be.visible');
    cy.contains('vCPU:').next().should('be.visible');
    cy.contains('Memory:').next().should('be.visible');
    cy.contains('Disk/Ephemeral:').next().should('be.visible');
    cy.contains('Username:').next().should('be.visible');
    cy.contains('Password:').next().should('be.visible');
    // cy.contains('Power off').should('be.visible');
    // cy.contains('Reboot').should('be.visible');
    cy.contains('Terminate').should('be.visible');
    cy.contains('Connect to Your Instance').should('be.visible');
    cy.contains('Instructions').should('be.visible');
    // cy.contains('ssh ubuntu@').should('be.visible');
  }

  checkInstanceDetailFields(detail) {
    cy.contains('Instance Details').should('be.visible');
    cy.contains('Status:').next().should('have.text', detail.status);
    cy.contains('Location:').next().should('have.text', detail.region);
    cy.contains('GPU:').next().should('contain', detail.gpu);
    cy.contains('vCPU:').next().should('contain', detail.cpu_cores);
    cy.contains('Memory:').next().should('contain', `${detail.ram / 1024} TB`);
    cy.contains('Disk/Ephemeral:').next().should('contain', `${detail.disk_size / 1024} TB`);
    cy.contains('Username:').next().should('contain', detail.username);
    cy.contains('Public IP Address:').next().should('contain', detail.public_ipv4);
    // cy.contains('Bandwidth:').next().should('contain', detail.bandwidth);
    cy.contains('Username:').next().should('contain', detail.username);
  }

  checkStatus(status) {
    cy.get('tbody tr').each(($tr) => {
      cy.wrap($tr).find('td').eq(8).should('have.text', status);
    });
  }

  selectGpuOption(gpuText) {
    cy.contains('div', gpuText, { timeout: 10000 }).click({force:true});
  }

  fillInstanceName(name) {
    cy.get('input[placeholder="Name"]').type(name);
  }

  clickDeployConfirm() {
    cy.contains('.anchor-btn', 'Deploy', { timeout: 10000 }).click();
  }

  checkInstanceRowDeploying({ name, region, gpu, price }) {
    cy.contains('Instance created successfully').should('be.visible');
    cy.contains('td', name).should('be.visible');
    cy.get('tbody tr').contains('td', name).parent().within(() => {
      cy.get('td').eq(8).should('have.text', 'Deploying');
      cy.get('td').eq(0).should('have.text', name);
      cy.get('td').eq(2).should('have.text', region);
      cy.get('td').eq(3).should('contain', gpu);
      cy.get('td').eq(7).should('have.text', price);
    });
  }

  terminateInstance() {
    cy.contains('Terminate').click();
    cy.contains('.button', 'Destroy Instance', { timeout: 10000 }).click();
  }

  checkTerminatedStatus() {
    cy.contains('Instance deleted successfully').should('be.visible');
  }

  clickRefresh() {
    cy.contains('Refresh').click();
  }
}

export default new InstancesPage(); 
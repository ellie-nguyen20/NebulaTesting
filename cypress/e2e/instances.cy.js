import InstancesPage from './pages/InstancesPage';
import LoginPage from './pages/LoginPage';
import DeployInstancePage from './pages/DeployInstancePage';
import { ENDPOINTS } from '../support/constants';

describe('Instances Page', () => {
  beforeEach(() => {
    cy.fixture('credential').then((creds) => {
      LoginPage.visit();
      LoginPage.login(creds.valid.email, creds.valid.password);
      LoginPage.isLoggedIn(creds.valid.username);
      cy.url().should('include', ENDPOINTS.SERVERLESS);
    });
    InstancesPage.visit();
    cy.url().should('include', ENDPOINTS.INSTANCES);
  });

  context('Check UI when user have no instance', () => {
    beforeEach(() => {
      mockInstanceList([]);
      InstancesPage.visit();
      cy.wait('@getInstances');
    });

    it('should display empty state UI', () => {
        InstancesPage.checkUI();
    });
    });
  context('Check UI Deploy Instance Page', () => {
    it('should show instance table when there are deployed instances', () => {
      InstancesPage.checkInstanceTable();
    });
  
    it('should show deploy instance page and all required fields after clicking Deploy', () => {
      InstancesPage.clickDeploy();
      DeployInstancePage.checkDeployPageUI();
    });
  
    it('should show out-of-stock status for all hardware', () => {
      InstancesPage.clickDeploy();
      DeployInstancePage.checkAllHardwareOutOfStock();
    });
  });

  context('When user have 4 GPUs with various statuses', () => {
    const statuses = ['Deploying', 'Running', 'Deleted', 'Deleting'];
    
    statuses.forEach((status, index) => {
      it(`should display instance with status "${status}"`, () => {
        const instance = {
          name: `gpu-${status}`,
          id: `mock-id-${index}`,
          dc_id: 3,
          region: 'Montreal',
          product_type: 'Virtual Machine',
          host_name: `gpu-${status}`,
          cpu_cores: 96,
          cpu_model: 'INTEL(R) XEON(R) PLATINUM 8558',
          cpu_count: '2',
          ram: 2048,
          gpu: 'H100-80G-SXM',
          gpu_type: 'H100',
          gpu_count: 8,
          disk_size: 14336,
          ephemeral: 0,
          public_ipv4: '127.0.0.1',
          price_per_hour: 14.4,
          os: '',
          status: status,
          team_id: null,
          created_at: Date.now() / 1000,
          type: 1,
          started_at: Date.now() / 1000 + 600,
          ended_at: Date.now() / 1000 + 3600,
          team: null,
          user: {
            id: 123,
            name: 'Ellie Nguyen',
            email: 'thivunguyen1506@gmail.com'
          }
        };
        mockInstanceList([instance]);
        InstancesPage.visit();
        cy.wait('@getInstances', { timeout: 10000 });
        cy.url().should('include', ENDPOINTS.INSTANCES);
        InstancesPage.checkInstanceListUI();
        InstancesPage.checkStatus(status);
      });
    });

    it('should display all UI fields for instance correctly', () => {
        const instance = {
          name: `gpu-Running`,
          id: `mock-id`,
          dc_id: 3,
          region: 'Montreal',
          product_type: 'Virtual Machine',
          host_name: `gpu-Running`,
          cpu_cores: 96,
          cpu_model: 'INTEL(R) XEON(R) PLATINUM 8558',
          cpu_count: '2',
          ram: 2048,
          gpu: 'H100-80G-SXM',
          gpu_type: 'H100',
          gpu_count: 8,
          disk_size: 14336,
          ephemeral: 0,
          public_ipv4: '127.0.0.1',
          price_per_hour: 14.4,
          os: '',
          status: 'Running',
          team_id: null,
          created_at: Date.now() / 1000,
          type: 1,
          started_at: Date.now() / 1000 + 600,
          ended_at: Date.now() / 1000 + 3600,
          team: null,
          user: {
            id: 123,
            name: 'Ellie Nguyen',
            email: 'thivunguyen1506@gmail.com'
          }
        };
        mockInstanceList([instance]);
        InstancesPage.visit();
        cy.wait('@getInstances');
        cy.url().should('include', ENDPOINTS.INSTANCES);
        InstancesPage.checkTableColumns();
        InstancesPage.checkInstanceRowFields(instance);
        
    });
    it('should display correct instance detail after clicking View', () => {
      const instance = {
        name: `gpu-Running`,
        id: `mock-id`,
        dc_id: 3,
        region: 'Montreal',
        product_type: 'Virtual Machine',
        host_name: `gpu-Running`,
        cpu_cores: 96,
        cpu_model: 'INTEL(R) XEON(R) PLATINUM 8558',
        cpu_count: '2',
        ram: 2048,
        gpu: 'H100-80G-SXM',
        gpu_type: 'H100',
        gpu_count: 8,
        disk_size: 14336,
        ephemeral: 0,
        public_ipv4: '127.0.0.1',
        price_per_hour: 14.4,
        os: '',
        status: 'Running',
        team_id: null,
        created_at: Date.now() / 1000,
        type: 1,
        started_at: Date.now() / 1000 + 600,
        ended_at: Date.now() / 1000 + 3600,
        team: null,
        user: {
          id: 123,
          name: 'Ellie Nguyen',
          email: 'thivunguyen1506@gmail.com'
        }
      };
      mockInstanceList([instance]);
      InstancesPage.visit();
      cy.wait('@getInstances');
      cy.url().should('include', ENDPOINTS.INSTANCES);

      //mock instance detail
        const detailData = {
            id: `mock-id`,
            dc_id: 3,
            region: 'Montreal',
            product_type: 'Virtual Machine',
            host_name: 'testRI04',
            cpu_cores: 96,
            cpu_model: 'INTEL(R) XEON(R) PLATINUM 8558',
            cpu_count: '2',
            ram: 2048,
            gpu: 'H100-80G-SXM',
            gpu_type: 'H100',
            gpu_count: 8,
            disk_size: 14336,
            ephemeral: 0,
            public_ipv4: 't',
            lan_ipv4: null,
            login_method: '',
            os: '',
            exposed_ports: '',
            user_name: 't',
            password: 't',
            status: 'Completed',
            start_time: '2025-07-04 05:13:11 EST',
            running_time: '66.9070 hours',
            total_cost: '$961.5400',
            team_id: null,
            created_at: 1751620391,
            type: 1,
            started_at: 1751623200,
            ended_at: 1751626800,
            username: 't',
            bandwidth: 1024,
            image: null
        };
        cy.intercept(
            'GET',
            `**/api/v1/computing/instance/mock-id`,
            {
                statusCode: 200,
                body: {
                    data: [detailData],
                    message: 'Get instance detail successfully',
                    status: 'success'
                }
            }
        ).as('getInstanceDetail');

        InstancesPage.getViewButtonByInstanceName(instance.name).click();
        cy.wait('@getInstanceDetail', { timeout: 10000 });

        InstancesPage.checkInstanceDefaultFields();
        InstancesPage.checkInstanceDetailFields(detailData);
    });


  });

  context('When user is Engineer Tier 3 or higher, he can deploy instance, power on, power off, delete instance', () => {
    it('should deploy RTX-A6000 instance successfully (UI real data)', () => {
      InstancesPage.clickDeploy();
      InstancesPage.selectGpuOption('$0.433/hr');
      InstancesPage.fillInstanceName('testInstance');
      InstancesPage.clickDeployConfirm();
      InstancesPage.checkInstanceRowDeploying({
        name: 'testInstance',
        region: 'CANADA',
        gpu: 'RTX-A6000',
        price: '$0.433/hr'
      });
    });
  
    it('should terminate instance successfully', () => {
      cy.wait(180000);
      InstancesPage.clickRefresh();
      InstancesPage.getViewButtonByInstanceName('testInstance').click();
      InstancesPage.terminateInstance();
      InstancesPage.checkTerminatedStatus();
    });
  })

  function mockInstanceList(data) {
    cy.intercept(
      'GET',
      '**/api/v1/computing/instances?limit=10&offset=1&type=0',
      {
        statusCode: 200,
        body: {
          data,
          total_instance: data.length,
          message: 'All instances retrieved successfully',
          status: 'success',
        },
      }
    ).as('getInstances');
  }
}); 
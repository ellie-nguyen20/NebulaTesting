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
  context('Check Deploy Instance Page UI', () => {
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

  context.skip('when user have 4 GPUs with various statuses', () => {
    const statuses = ['Deploying', 'Running', 'Deleted', 'Deleting'];
    const instances = statuses.map((status, index) => ({
        name: `GPU-${status}`,
        id: `mock-id-${index}`,
        dc_id: 3,
        region: 'Montreal',
        product_type: 'Baremetal',
        host_name: `gpu-${status.toLowerCase()}`,
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
        user: {
            id: 123,
            name: 'Ellie Nguyen',
            email: 'thivunguyen1506@gmail.com'
        }
    }));

    beforeEach(() => {
        mockInstanceList(instances);
        InstancesPage.visit();
        cy.wait('@getInstances');
        cy.url().should('include', ENDPOINTS.INSTANCES);
    });

    it('should display all UI fields for instance correctly', () => {
        const status = 'Booked';
        InstancesPage.checkTableColumns();
        InstancesPage.checkInstanceRowFields(instances[0]);
        
    });
    it('should display correct instance detail after clicking View', () => {
        const instanceId = instances[0].id;
        const instanceName = instances[0].name;
        const detailData = {
            id: instanceId,
            dc_id: 3,
            region: 'Montreal',
            product_type: 'Baremetal',
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
            `**/api/v1/computing/instance/${instanceId}`,
            {
                statusCode: 200,
                body: {
                    data: [detailData],
                    message: 'Get instance detail successfully',
                    status: 'success'
                }
            }
        ).as('getInstanceDetail');

        InstancesPage.getViewButtonByInstanceName(instanceName).click();
        cy.wait('@getInstanceDetail');

        InstancesPage.checkInstanceDefaultFields();
        InstancesPage.checkInstanceDetailFields(detailData);
    });


        statuses.forEach((status) => {
            it(`should display instance with status "${status}"`, () => {
                InstancesPage.checkInstanceListUI();
                InstancesPage.checkStatus(status);
            });
        });


});

  context.skip('when user is Engineer Tier 3 or higher, he can deploy instance, power on, power off, delete instance', () => {
    it('should start instance', () => {
      InstancesPage.startInstance();
    });
  
    it('should stop instance', () => {
      InstancesPage.stopInstance();
    });
  
    it('should delete instance', () => {
      InstancesPage.deleteInstance();
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
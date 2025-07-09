import { Button, Layout, Card, Typography, Space, Spin, Alert } from "antd";
import { PlusOutlined, CodeOutlined } from "@ant-design/icons";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const layoutStyle = {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
};

const headerStyle = {
    backgroundColor: '#001529',
    color: 'white',
    textAlign: 'center',
    padding: '0 20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const footerStyle = {
    textAlign: 'center',
    backgroundColor: '#001529',
    color: 'white',
    marginTop: 'auto',
};

const contentStyle = {
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
};

const cardStyle = {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e8e8e8',
};

export const CreateProject = () => {
    const { Header, Content, Footer } = Layout;
    
    const { createProjectMutation, isPending, isSuccess, error } = useCreateProject();

    const navigate = useNavigate();

    async function handleCreateProject() {
        console.log('Going to trigger the api');
        try {
            const response = await createProjectMutation();
            console.log('Now we should redirect to the editor page');
            navigate(`/project/${response.projectId}`);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    }

    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <Space align="center">
                    <CodeOutlined style={{ fontSize: '24px' }} />
                    <Title level={3} style={{ color: 'white', margin: 0 }}>
                        Cloud Code Editor
                    </Title>
                </Space>
            </Header>
            
            <Content style={contentStyle}>
                <Card style={cardStyle}>
                    <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
                        <div>
                            <Title level={2} style={{ marginBottom: '8px' }}>
                                Create New Project
                            </Title>
                            <Text type="secondary" style={{ fontSize: '16px' }}>
                                Start building your next amazing project with our cloud-based code editor
                            </Text>
                        </div>

                        {error && (
                            <Alert
                                message="Error"
                                description={error.message || "Failed to create project. Please try again."}
                                type="error"
                                showIcon
                            />
                        )}

                        {isSuccess && (
                            <Alert
                                message="Success"
                                description="Project created successfully!"
                                type="success"
                                showIcon
                            />
                        )}

                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={handleCreateProject}
                            loading={isPending}
                            style={{
                                height: '50px',
                                fontSize: '16px',
                                borderRadius: '8px',
                                minWidth: '200px',
                                background: 'linear-gradient(135deg, #1890ff, #096dd9)',
                                border: 'none',
                                boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)',
                            }}
                        >
                            {isPending ? 'Creating Project...' : 'Create Project'}
                        </Button>

                        <Text type="secondary" style={{ fontSize: '14px' }}>
                            Your project will be ready in seconds
                        </Text>
                    </Space>
                </Card>
            </Content>
            
            <Footer style={footerStyle}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    © 2025 Cloud Code Editor. All rights reserved.
                </Text>
            </Footer>
        </Layout>
    );
}